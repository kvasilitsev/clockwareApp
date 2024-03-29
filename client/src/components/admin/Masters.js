import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
import { Box, Button, IconButton, Tooltip, MenuItem, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { RATING_REGEX, USER_REGEX } from '../../models/regExp';
import getAllMasters from '../../utils/getAllMastersFunction';
import getAllCities from '../../utils/getAllCitiesFunction';
import deleteMaster from '../../utils/deleteMasterFunction';
import updateMaster from '../../utils/updateMasterFunction';
import createNewMaster from '../../utils/createNewMasterFunction';
import CreateNewMasterModal from '../../utils/CreateNewMasterModal';
import AddCityModal from '../../utils/AddCityForMasterModal';
import addCityForMaster from '../../utils/addCityForMasterFunction';
import RemoveCityModal from '../../utils/RemoveCityForMasterModal';
import removeCityForMaster from '../../utils/removeCityForMasterFunction';

const validateRequired = (value) => !!value.length;

const Masters = () => {

  const [componentLoaded, setComponentLoaded] = useState(false);
  const [masterList, setMasterList] = useState([]);
  const [cities, setCities] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [addCityModalOpen, setAddCityModalOpen] = useState(false);
  const [removeCityModalOpen, setRemoveCityModalOpen] = useState(false);
  

  const navigate = useNavigate(); 

  useEffect(() => {    
    getAllMasters()
    .then(data => {
      setMasterList(data);
      getAllCities()
        .then(data =>
          setCities(data)      
        ); 
    }
    );    
   }, [componentLoaded]);

   const handleDeleteRow = async (row) => {    
    if (      
      !window.confirm(`Are you sure you want to delete master ${row.getValue('name')}?`)
    ) {
      return;
    }      
      await deleteMaster(row.getValue('id'));
      setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000);
      navigate('/masters');      
  }

  const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
    if (!Object.keys(validationErrors).length){
      try{
        await updateMaster(values); 
      } catch(err){
          console.log(err)
      }       
      exitEditingMode();
      setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000);
      navigate('/masters');  
    }
  };

  const handleCancelRowEdits = () => {    
    setValidationErrors({});
  };

  const handleCreateMaster = (values) => {    
    createNewMaster(values);
  };

  const handleAddCity = (values) => {    
    addCityForMaster(values);
  };

  const handleRemoveCity = (values) => {    
    removeCityForMaster(values);
  };

  const validate = useCallback(
    (cell) => {      
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'name'
              ? USER_REGEX.test(event.target.value)          
              : cell.column.id === 'rating'
              ? RATING_REGEX.test(event.target.value)
              : validateRequired(event.target.value);    
          if (!isValid) {            
            setValidationErrors({              
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,              
            });
          } else {            
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

   const columns = useMemo(
    () => [
      {
        header: 'Master Id',
        accessorKey: 'id',
        enableEditing: false,
        footer: 'Master Id',
      },
      {
        header: 'Master Name',
        accessorKey: 'name',
        footer: 'Master Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),          
        }),               
      },
      {
        header: 'Rating',
        accessorKey: 'rating',
        footer: 'Rating',        
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),          
        }),        
      },
      {
        header: 'Cities',
        accessorFn: (row) => {          
          return (row.cityList).join(', ')
        },
        id: 'cities',
        footer: 'Cities',
        enableEditing: false,
      }               
    ],
    [validate],
  );
  return (
  <>
    <MaterialReactTable   
    displayColumnDefOptions={{
      'mrt-row-actions': {
        muiTableHeadCellProps: {
          align: 'center',
        },
        size: 120,
      },
    }}
    columns={columns}
    data={masterList}     
    enableEditing  
    editingMode="modal"    
    onEditingRowSave={handleSaveRowEdits}
    onEditingRowCancel={handleCancelRowEdits}   
    renderRowActions={({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="left" title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
             <Edit />
          </IconButton>
        </Tooltip>       
        <Tooltip arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    )}
    renderTopToolbarCustomActions={() => (
      <>
        <Button
        className="m-2"
        color="inherit"
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          Create New Master
        </Button>
        <Button
        className="m-2"
        color="inherit"
          onClick={() => setAddCityModalOpen(true)}
          variant="contained"
        >
          Add city for Master
        </Button>
        <Button
        className="m-2"
        color="inherit"
          onClick={() => setRemoveCityModalOpen(true)}
          variant="contained"
        >
          Remove city for Master
        </Button>
      </>   
    )}
    />
      <CreateNewMasterModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        updateState={() => { setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000)}}
        onSubmit={handleCreateMaster}      
      />
      <AddCityModal        
        open={addCityModalOpen}
        onClose={() => setAddCityModalOpen(false)}
        onSubmit={handleAddCity}
        updateState={() => { setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000)}}
        masters = { masterList }
        cities = { cities }
      />
      <RemoveCityModal        
        open={removeCityModalOpen}
        onClose={() => setRemoveCityModalOpen(false)}
        onSubmit={handleRemoveCity}
        updateState={() => { setTimeout(() => {setComponentLoaded(!componentLoaded)}, 1000)}}
        masters = { masterList }        
      />    
  </>
  ); 
}

export default Masters;


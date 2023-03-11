import React, { useMemo, useEffect, useState, useCallback } from "react";
import MaterialReactTable from 'material-react-table';
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { USER_REGEX } from '../../models/regExp';
import getAllCities from '../../utils/getAllCitiesFunction';
import deleteCity from '../../utils/deleteCityFunction';
import updateCity from '../../utils/updateCityFunction';

const validateRequired = (value) => !!value.length;

const Cities = () => {

  const navigate = useNavigate();
  const [cityList, setCityList] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {    
    getAllCities()
    .then(data =>
      setCityList(data)      
    );    
   }, []);

   const handleDeleteRow = async (row) => {    
    if (      
      !window.confirm(`Are you sure you want to delete city ${row.getValue('name')}?`)
    ) {
      return;
    }      
     await deleteCity(row.getValue('id'));
     window.location.replace('/cities');      
  }

  const handleSaveRowEdits = async ({ exitEditingMode, values }) => {
    try{
      await updateCity(values); 
    } catch(err){
        console.log(err)
    }       
    exitEditingMode();
    window.location.replace('/cities');
  };

  const handleCancelRowEdits = () => {    
    setValidationErrors({});
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
        header: 'City Id',
        accessorKey: 'id',
        enableEditing: false,
        footer: 'City Id',
      },
      {
        header: 'City',
        accessorKey: 'name',
        footer: 'City',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...validate(cell),          
        }),               
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
    data={cityList}     
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
      <Button 
        color="inherit"
        onClick={() => navigate('/createCity')}
        variant="contained"
      >
        Add new city
      </Button>       
    )}    
    />
  </>
  ); 
}

export default Cities;

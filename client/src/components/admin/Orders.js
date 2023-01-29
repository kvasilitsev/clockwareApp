import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialReactTable from 'material-react-table';
import findAllOrders from '../../models/findAllOrdersFunction';
import orderIdToName from '../../models/orderIdToNameFunction';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import deleteOrder from '../../models/deleteOrderFunction'

const Orders = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [nameOrderList, setNameOrderList] = useState([]);  

  useEffect(() => {    
    findAllOrders()
    .then(data =>
      setOrderList(data)
    );
   }, []);
   
   useEffect(() => {    
    orderIdToName(orderList)
    .then(data =>
      setNameOrderList(data)
    );
   }, [orderList]);

  const handleDeleteRow = async (row) => {
    if (
      !window.confirm(`Are you sure you want to delete order ${row.getValue('id')}`)
    ) {
      return;
    }      
     await deleteOrder(row.getValue('id'));
     window.location.replace('/orders');      
  } 

  const columns = useMemo(
    () => [
      {
        header: 'Order id',
        accessorKey: 'id', 
      },
      {
        header: 'Master',
        accessorKey: 'masterId', 
      },
      {
        header: 'City',
        accessorKey: 'cityId', 
      },
      {
        header: 'Clock size',
        accessorKey: 'clockId', 
      },
      {
        header: 'Booking time',
        accessorKey: 'bookingDateTime', 
      },
      {
        header: 'User email',
        accessorKey: 'email', 
      },      
    ],
    [],
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
    data={nameOrderList}
    editingMode="modal" //default
    enableColumnOrdering
    enableEditing   
    renderRowActions={({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>        
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
        onClick={() => navigate('/')}
        variant="contained"
      >
        Create New Order
      </Button>
    )}    
    />
  </>
  );  
};

export default Orders;

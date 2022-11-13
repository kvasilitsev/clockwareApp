import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { Request } from '../api/api.request';
import { useNavigate } from "react-router-dom";

const OrderReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      masterId: state.masterId,
      masterName: state.masterName,
      name: state.name,
      email: state.email,
      cityId: state.cityId,
      clockId: state.clockId,
      bookingTime: state.bookingTime,
      list: state.list,
      city: state.city,
      clockSize: state.clockSize  
    },    
    onSubmit: async (values) => {         
      try {        
        const apiRequest = new Request({name: values.name, clockId: values.clockId, cityId: values.cityId, bookingTime: values.bookingTime, email: values.email, masterId: values.masterId});        
        const res = await apiRequest.createOrder(); 

        if (res.data === true){          
          const apiRequest = new Request({email: values.email})
          await apiRequest.sendEmail();          
          navigate('/success');
        }             
      } catch (e) {
          console.log('error: ', e.response);          
        }   
      },
    onReset: () => navigate('/')
  });
    return (  
    <section className='review'>
      <h2>Please review your order</h2>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div>
            <p>name - {formik.values.name}</p>
            <p>email - {formik.values.email}</p>
            <p>clock size - {formik.values.clockSize}</p>
            <p>city - {formik.values.city}</p> 
            <p>booking date and time - {formik.values.bookingTime.toLocaleString()}</p>
            <p>master - {formik.values.masterName}</p>            
        </div>
        <button type='reset'>Reset</button>          
        <button type="submit">Create order</button>
      </ form>
    </ section>)
 };
 
export default OrderReview;
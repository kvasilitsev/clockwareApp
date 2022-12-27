import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import MasterList from './master-list';
import { useLocation } from 'react-router-dom';

const Masters = () => {
  const { state } = useLocation();  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      // masterName: '',
      // masterId: '',
      // nextState: props.state.nextState,
      // name: props.state.name,
      // email: props.state.email,
      // cityId: props.state.cityId,
      // clockId: props.state.clockId,
      // bookingTime: props.state.bookingTime,
      // list: props.state.list,
      // city: props.state.city,
      // clockSize: props.state.clockSize
      masterName: '',
      masterId: '',
      name: state.name,
      email: state.email,
      cityId: state.cityId,
      clockId: state.clockId,
      bookingTime: state.bookingTime,      
      city: state.city,
      clockSize: state.clockSize  
    }, 
   
    onSubmit:  () => navigate('/orderReview', {state: formik.values})        
    // onSubmit:  () => {      
    //   props.context(formik.values);
    // }
  });
    return (  
    <section>
      <h1>Select master</h1>
      <form onSubmit={formik.handleSubmit}> 
        <div onChange={value => {
                        formik.setFieldValue('masterId', value.target.id);
                        formik.setFieldValue('masterName', value.target.value);
                        formik.setFieldValue('nextState', 'review');                        
                        }}> 
          <MasterList 
            masters = { state.list }
          />
        </div>
        <button type="submit" disabled={  !(formik.isValid && formik.dirty) ? true : false}>Submit</button>
      </ form>
    </ section>)
 };
 
export default Masters;

import { host, authHost } from './axios';
import { REGISTER_URL, ADMIN_REGISTER_URL, GET_FREE_MASTERS_URL, CREATE_ORDER_URL,
       SEND_EMAIL_URL, GET_CITIES_URL, GET_CLOCKS_URL, LOGIN_URL, LOGOUT_URL, 
       GET_USERBY_EMAIL_URL, GET_ALL_ORDERS_URL, DELETE_ORDER_URL, GET_MASTERS_URL,
       UPDATE_ORDER_URL, GET_ALL_USERS_URL, DELETE_USER_URL, UPDATE_USER_URL,
       DELETE_MASTER_URL, UPDATE_MASTER_URL, CREATE_MASTER_URL } from '../models/routes';


class Request {

  constructor({ name, email, password, cityId, bookingTime, clockId, masterId, orderId, userId, rating } = {}){
    this.name = name;
    this.email = email;
    this.password = password;
    this.cityId = cityId;
    this.bookingTime = bookingTime;
    this.clockId = clockId;
    this.masterId = masterId;
    this.orderId = orderId;
    this.userId = userId;
    this.rating = rating;
  }
  
  async createUser() {     
    try {
      await authHost.post(REGISTER_URL, { name: this.name, email: this.email },
        {          
          withCredentials: true
        }      
      ) 
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async registerAdmin() {    
    try {
      await host.post(ADMIN_REGISTER_URL, { name: this.name, email: this.email, password: this.password },
        {          
          withCredentials: true
        }      
      ) 
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async getFreeMasters() { 
    try {      
      const res = await host.get(GET_FREE_MASTERS_URL, {params: {clockId: this.clockId, cityId: this.cityId, bookingTime: this.bookingTime }},
        {      
          withCredentials: true
        }
      )
      return res;
    }
    catch (error) {
      console.log('error: ', error); 
    }    
    
  }

  async getMasters() {
    try {
      const res = await authHost.get(GET_MASTERS_URL,
        {
          withCredentials: true
        }
      )
      return res.data;    
    }
    catch (error) {
      console.log('error: ', error); 
    }    
  }

  async createOrder() {
    try {
      const res = await host.post(CREATE_ORDER_URL, { name: this.name, email: this.email, bookingTime: this.bookingTime, clockId: this.clockId, cityId: this.cityId, masterId: this.masterId },
        {          
          withCredentials: true
        }      
      )
      return res;
    }
    catch (error) {
      console.log('error: ', error); 
    }    
  }

  async updateOrder() {    
    try {                  
      const res = await authHost.put(UPDATE_ORDER_URL, {params: {id: this.orderId, masterId: this.masterId, clockId: this.clockId, cityId: this.cityId, bookingTime: this.bookingTime, email: this.email }},
        {
          withCredentials: true
        }
      )
      return res.data;                
    }
    catch (error) {      
      console.log('error: ', error); 
    }
  }

  async sendEmail() {
    try {
      await host.post(SEND_EMAIL_URL, {email: this.email});       
    }
    catch (error) {
      console.log('error: ', error); 
    }       
  }

  async getCities() {
    try {
      const res = await host.get(GET_CITIES_URL,
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }    
  }

  async getClocks() {
    try {
      const res = await host.get(GET_CLOCKS_URL,
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }   
  }

  async login() {    
    try {
      const res = await host.post(LOGIN_URL, { email: this.email, password: this.password },
        {          
          withCredentials: true
        }          
      )      
      return res.data.accessToken;
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async logout() {
    console.log(localStorage.userId) 
    try {
      const res = await host.post(LOGOUT_URL, { id: localStorage.userId },
        {          
          withCredentials: true
        }              
      )      
      console.log('api response', res);   
      return res;
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async getUserByEmail() {
    try {
      const res = await host.get(GET_USERBY_EMAIL_URL, {params: {email: this.email }},
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }   
  }

  async getAllOrders() {
    try {
      const res = await authHost.get(GET_ALL_ORDERS_URL,
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }   
  }  

  async deleteOrder() {           
    try {                  
      await authHost.put(DELETE_ORDER_URL, {params: {id: this.orderId }},
        {
          withCredentials: true
        }
      )                
    }
    catch (error) {      
      console.log('error: ', error); 
    }   
  }

  async getAllUsers() {
    try {
      const res = await authHost.get(GET_ALL_USERS_URL,
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }   
  }
  
  async updateUser() {    
    try {                  
      const res = await authHost.put(UPDATE_USER_URL, {params: {id: this.userId, email: this.email, name: this.name }},
        {
          withCredentials: true
        }
      )
      return res.data;                
    }
    catch (error) {      
      console.log('error: ', error); 
    }
  }
  
  async deleteUser() {           
    try {                 
      await authHost.delete(DELETE_USER_URL, {params: {email: this.email }},
        {
          withCredentials: true
        }
      )                
    }
    catch (error) {      
      console.log('error: ', error); 
    }   
  }

  async createMaster() {     
    try {
      await authHost.post(CREATE_MASTER_URL, { name: this.name, rating: this.rating },
        {          
          withCredentials: true
        }      
      ) 
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async updateMaster() {     
    try {                  
      const res = await authHost.put(UPDATE_MASTER_URL, {params: {id: this.masterId, name: this.name, rating: this.rating }},
        {
          withCredentials: true
        }
      )
      return res.data;                
    }
    catch (error) {      
      console.log('error: ', error); 
    }
  }

  async deleteMaster() {            
    try {                 
      await authHost.delete(DELETE_MASTER_URL, {params: {id: this.masterId }},
        {
          withCredentials: true
        }
      )                
    }
    catch (error) {      
      console.log('error: ', error); 
    }   
  }
}

export { Request };

const Order = require ('../dto/orders.dto.js');
const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");


/**
 * Class consists of variety of data base queries to the table orders
 */

class OrderData {
  
    /**
     * Method creates new order
     * @param {integer} userId  data base attribute for orders table
     * @param {integer} masterId data base attribute for orders table
     * @param {integer} cityId data base attribute for orders table
     * @param {integer} clockId data base attribute for orders table
     * @param {time} bookingTime  data base attribute for orders table
     * @param {varchar} email data base attribute for orders table
     * @param {varchar} name data base attribute for orders table     
     * @param {*} repairDuration data base attribute for orders table 
     */
  async createOrder(masterId, cityId, clockId, bookingTime, email, name, repairDuration, userId) {
    try {      
      await db.query('INSERT INTO orders (master_id, city_id, clock_id, booking_date_time, email, user_name, repair_duration, user_id, is_deleted) values ($1, $2, $3, $4, $5, $6, $7, $8, false) RETURNING *', [masterId, cityId, clockId, bookingTime, email, name, repairDuration, userId]);      
    } catch (err) {
      logger.error('can not create order', err);     
      throw err;
    }
  };

  /**
   * Method returns all orders
   * @returns an array of orders objects
   */
  async getOrders() {
    let orderList = [];    
    const ordersResultSet = await db.query('SELECT id, user_name, master_id, city_id, clock_id, booking_date_time, repair_duration, email FROM orders WHERE is_deleted = false');    
    if(ordersResultSet.rowCount > 0) { 
      ordersResultSet.rows.forEach(element => {                 
        let order = new Order();
        order.userId = element.user_id;
        order.masterId = element.master_id;
        order.cityId = element.city_id;
        order.clockId = element.clock_id;
        order.bookingDateTime = element.booking_date_time;
        order.id = element.id;
        order.repairDuration = element.repair_duration;
        order.email = element.email;
        orderList.push(order);               
      });   
    }
    return orderList;
  };

  /**
   * Method selects order by its id
   * @param {integer} id  data base primary key for orders table
   * @returns userId, masterId, cityId, clockId, bookingDateTime, repairDuration of selected order
   */
  async getOrderById(id) {    
    let order = null;
    const orderResultSet = await db.query('SELECT id, user_id, master_id, city_id, clock_id, booking_date_time, repair_duration FROM orders where id = $1', [id]);    
    if(orderResultSet.rowCount === 1){      
      order = new Order();
      order.userId = orderResultSet.rows[0].user_id;
      order.masterId = orderResultSet.rows[0].master_id;
      order.cityId = orderResultSet.rows[0].city_id;      
      order.clockId = orderResultSet.rows[0].clock_id;
      order.bookingDateTime = orderResultSet.rows[0].booking_date_time;
      order.repairDuration = orderResultSet.rows[0].repairDuration; 
      order.id = orderResultSet.rows[0].id;
    }    
    return order;
  };

  /**
   * Method selects order by master Id
   * @param {integer} id data base primary key for orders table
   * @returns 
   */
  async getOrdersByMasterId(id) {
    let orderList = [];    
    const ordersResultSet = await db.query('SELECT id, email, master_id, city_id, clock_id, booking_date_time, repair_duration FROM orders WHERE master_id = $1 AND is_deleted = false', [id]);    
    if(ordersResultSet.rowCount > 0) { 
      ordersResultSet.rows.forEach(element => {                 
        let order = new Order();
        order.email = element.email;
        order.masterId = element.master_id;
        order.cityId = element.city_id;
        order.clockId = element.clock_id;
        order.bookingDateTime = element.booking_date_time;
        order.repairDuration = element.repair_duration;
        order.id = element.id;       
        orderList.push(order);       
      });   
    }    
    return orderList;    
  };

  /**
   * Method selects order by user email
   * @param {varchar} email  data base attribute for orders table
   * @returns 
   */
  async getOrdersByUser(email) {
    let orderList = [];    
    const ordersResultSet = await db.query('SELECT id, email, master_id, city_id, clock_id, booking_date_time, repair_duration FROM orders WHERE email = $1 AND is_deleted = false', [email]);    
    if(ordersResultSet.rowCount > 0) {
      ordersResultSet.rows.forEach(element => {                 
        let order = new Order();
        order.email = element.email;
        order.masterId = element.master_id;
        order.cityId = element.city_id;
        order.clockId = element.clock_id;
        order.bookingDateTime = element.booking_date_time;
        order.repairDuration = element.repair_duration;
        order.id = element.id;       
        orderList.push(order);       
      });   
    }    
    return orderList;    
  };
  
  /**
   * Method selects order by user email
   * @param {varchar} email  data base attribute for orders table
   * @returns 
   */
  async getOrdersByClockId(id) {
    let orderList = [];      
    const ordersResultSet = await db.query('SELECT id, booking_date_time FROM orders WHERE clock_id = $1 AND is_deleted = false', [id]);    
    if(ordersResultSet.rowCount > 0) {
      ordersResultSet.rows.forEach(element => {                 
        let order = new Order();
        order.bookingDateTime = element.booking_date_time;       
        order.id = element.id;
        orderList.push(order);       
      });   
    }    
    return orderList;    
  };
  
  /**
   * Method updates order by their id
   * @param {integer} id data base primary key for orders table
   * @param {varchar} email data base attribute for orders table
   * @param {integer} masterId data base attribute for orders table
   * @param {integer} cityId data base attribute for orders table
   * @param {integer} clockId data base attribute for orders table
   * @param {timestamp} bookingDateTime data base attribute for orders table
   */
  async updateOrder(id, email, masterId, cityId, clockId, bookingTime, repairDuration, userId) {    
    try {
      await db.query('UPDATE orders SET email = $1, master_id = $2, city_id = $3, clock_id = $4, booking_date_time = $5, repair_duration = $6, user_id = $7 WHERE id = $8 RETURNING *', [email, masterId, cityId, clockId, bookingTime, repairDuration, userId, id]);
    } catch (err) {
      logger.error(`updateOrder failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method updates order by their id   
   * @param {varchar} email   
   */
  async updateOrderEmail(email, id) {    
    try {
      await db.query('UPDATE orders SET email = $1 where email = (SELECT email FROM users WHERE id = $2) RETURNING *', [email, id]);
    } catch (err) {
      logger.error(`updateOrder failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method performs soft delete of order by its id
   * @param {integer} id data base primary key for orders table
   */
  async deleteOrder(id) {
    try {
      await db.query('UPDATE orders SET is_deleted = true WHERE id = $1', [id]); 
    } catch (err) {
      logger.error(`deleteOrder failed with reason: ${err.detail}`);
      throw err;
    }
  };
  
  /**
   * Method performs soft delete of order by user email
   * @param {varchar} email data base attribute for orders table
   */
  async deleteOrderByEmail(email) {    
    try { 
      await db.query('UPDATE orders SET is_deleted = true WHERE email = $1', [email]);      
    } catch (err) {
      logger.error(`deleteOrder failed with reason: ${err}`);
      throw err;
    }
  };

  /**
   * Method performs soft delete of order by master id
   * @param {*} id data base primary key for orders table
   */
  async deleteOrderByMasterId(id) {    
    try { 
      await db.query('UPDATE orders SET is_deleted = true WHERE master_id = $1', [id]);      
    } catch (err) {
      logger.error(`deleteOrder failed with reason: ${err}`);
      throw err;
    }
  };

  /**
   * Method performs soft delete of order by city id
   * @param {*} id data base primary key for orders table
   */
  async deleteOrderByCityId(id) {    
    try { 
      await db.query('UPDATE orders SET is_deleted = true WHERE city_id = $1', [id]);      
    } catch (err) {
      logger.error(`deleteOrder failed with reason: ${err}`);
      throw err;
    }
  };

  /**
   * Method performs soft delete of order by clock id
   * @param {*} id data base primary key for orders table
   */
  async deleteOrderByClockId(id) {    
    try { 
      await db.query('UPDATE orders SET is_deleted = true WHERE clock_id = $1', [id]);      
    } catch (err) {
      logger.error(`deleteOrder failed with reason: ${err}`);
      throw err;
    }
  };

}
  
module.exports = new OrderData();

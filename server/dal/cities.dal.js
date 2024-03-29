const City = require ('../dto/cities.dto.js');
const db = require('../db');
const log4js = require('../logger');
const { Pool } = require('pg');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of data base queries to table cities
 */
class CityData {
  
   /**
  * Method creates new city
  * @param {text} name data base attribute for city table
  */
  async createCity(name) {
    try {
      await db.query(`INSERT INTO cities (name) values ($1) RETURNING *`, [name]);           
    } catch (err) {
      logger.error(`createCity failed with reason: ${err.detail}`);
      throw err;
    }
  };
    
  /**
   * Method selects all cities
   * @returns id, name of all cities
   */
  async getCities() {    
    let cityList = [];
    let citiesResultSet;     
    try {
      citiesResultSet = await db.query('SELECT id, name FROM cities WHERE is_deleted = false');
    }
    catch(err) {
      logger.error(err);      
      throw(err);    
    }
    if(citiesResultSet.rowCount > 0){ 
      citiesResultSet.rows.forEach(element => {
        let city = new City();
        city.id = element.id;
        city.name = element.name;
        cityList.push(city);       
      });   
    }
    return cityList;    
  };

  /**
   * Method selects city by its id
   * @param {integer} id data base primary key for city table
   * @returns id, name of selected city
   */
  async getCityById(id) {
    let city = new City();
    const cityResultSet = await db.query('SELECT id, name FROM cities where id = $1', [id]);
    if(cityResultSet.rowCount === 1){      
      city.id = cityResultSet.rows[0].id;
      city.name = cityResultSet.rows[0].name;      
    } else return false;
    return city;
    
  };

   /**
   * Method selects city by its name
   * @param {text} name data base attribute for city table
   * @returns id, name of selected city
   */
   async getCityByName(name) {
    let city = new City();
    const cityResultSet = await db.query('SELECT id, name, is_deleted FROM cities where name = $1', [name]);    
    if(cityResultSet.rowCount === 1){      
      city.id = cityResultSet.rows[0].id;
      city.name = cityResultSet.rows[0].name;
      city.isDeleted = cityResultSet.rows[0].is_deleted;   
    } else return false;
    return city;    
  };

  /**
  * Method update city by its id
  * @param {integer} id data base primary key for city table
  * @param {text} name data base attribute for city table
  */
  async updateCity(id, name) {
    try {
      await db.query('UPDATE cities SET name = $1 WHERE id = $2 RETURNING *', [name, id]);  
    } catch (err) {
      logger.error(`updateCity failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method performs soft-delete city by its name
   * @param {integer} id data base primary key for city table
   */
  async deleteCity(id) {
    try {
      await db.query('UPDATE cities SET is_deleted = true where id = $1', [id]);  
    } catch (err) {
      logger.error(`deleteCity failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method performs undelet city by its id (set is_deleted = false) 
   * @param {integer} id data base primary key for city table
   */
  async unDeleteCity(id) {
    try {
      await db.query('UPDATE cities SET is_deleted = false where id = $1', [id]);  
    } catch (err) {
      logger.error(`unDeleteCity failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method select cities by master id
   * @param {integer} id data base primary key for city table
   * @returns an array of cities
   */
  async getCitiesByMasterId(id) {
    const cities = await db.query('select cities.name from cities, masters_cities  WHERE masters_cities.master_id = $1 AND masters_cities.city_id = cities.id AND cities.is_deleted = false', [id]);    
    return cities.rows;
  };  
}
  
  module.exports = new CityData();

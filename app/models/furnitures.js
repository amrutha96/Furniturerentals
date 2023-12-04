// Get the functions in the db.js file to use
const db = require('./../services/db');

class Furnitures {
    // furniture ID
    furniture_id;
    // furniture name
    furniture_name;


    constructor(furniture_id) {
        this.furniture_id = furniture_id;
    }
    
    // Gets the programme of this student
    async getFurnitureList()  {
            var sql = "SELECT furniture_id, furniture_name from furnitures WHERE is_delete = 0"
            const results = await db.query(sql);        
       
    }
}

module.exports = {
    Furnitures
}
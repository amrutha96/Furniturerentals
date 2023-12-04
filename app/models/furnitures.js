// Get the functions in the db.js file to use
const db = require('./../services/db');

class Furnitures {
    // furniture ID
    furniture_id;
    // furniture name
    furniture_name;

    furniture_desc;


    constructor(furniture_id) {
        this.furniture_id = furniture_id;
    }
    
    // Gets the programme of this student
    async getFurnitureList()  {
            var sql = "SELECT * from furnitures"
            const results = await db.query(sql);        
       
    }
    async getFurnitureDetails() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT * from furnitures where furniture_id = ?"
            const results = await db.query(sql, [this.id]);
            this.name = results[0].furniture_name;
            this.description = results[0].furniture_desc;
        }

    }
}

module.exports = {
    Furnitures
}
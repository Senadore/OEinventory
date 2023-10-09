const mongoose = require("mongoose"); 

const PendingShowSchema = new mongoose.Schema(
    {
        showname: {
            type: String
        },

        customerName: {
            type: String
        },

        customerOrder: {
            type: String
        },

        address: {
            type: String
        },
        ship: {
            type: String
        },
      
        items:{
            type: Array
        },

        file: {
            type: Buffer
        }
    }
); 

module.exports = mongoose.model("PendingShow", PendingShowSchema)
const mongoose = require("mongoose"); 

const BclSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        manufacture: {
            type: String
        },
        serial: {
            type: String
        },
        model: {
            type: String
        },
        status: {
            type: String
        },
    }
); 

module.exports = mongoose.model("Brother Color Laser", BclSchema)
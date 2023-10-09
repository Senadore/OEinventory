const mongoose = require("mongoose"); 

const HpclSchema = new mongoose.Schema(
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

module.exports = mongoose.model("HP Color Laser", HpclSchema)
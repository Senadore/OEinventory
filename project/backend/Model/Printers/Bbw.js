const mongoose = require("mongoose"); 

const BbwSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Brother BW Printer", BbwSchema)
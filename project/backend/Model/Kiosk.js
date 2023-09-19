const mongoose = require("mongoose"); 

const KioskSchema = new mongoose.Schema(
    {
        id: {
            type: String
        },
        manufacture: {
            type: String
        },
        type: {
            type: String
        },
        serial: {
            type: String
        },
        model: {
            type: String
        },
        processor: {
            type: String
        },
        ram: {
            type: String
        },
        hd: {
            type: String
        },
        os: {
            type: String
        },
        status: {
            type: String
        },
    }
); 

module.exports = mongoose.model("Kiosk", KioskSchema)
const mongoose = require("mongoose"); 

const ShowSchema = new mongoose.Schema(
    {
        showname: {
            type: String
        },
        address: {
            type: String
        },
        ship: {
            type: String
        },
        order: {
            type: String
        },
        laptop: {
            type: Object
        },
        kiosk: {
            type: Object
        },
        printer: {
            type: Object
        },
        scanner: {
            type: Object
        },
        toner: {
            type: Object
        },
        extra: {
            type: Object
        },

        file: {
            type: Buffer
        }
    }
); 

module.exports = mongoose.model("Shows", ShowSchema)
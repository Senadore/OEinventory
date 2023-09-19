const mongoose = require("mongoose"); 

const CalenderSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        start: {
            type: String
        },
        end: {
            type: String
        },
        id: {
            type: String
        },
        allDay: {
            type: String
        }
    }
); 

module.exports = mongoose.model("Calender", CalenderSchema)
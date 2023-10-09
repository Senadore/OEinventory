const mongoose = require("mongoose"); 

const InvoiceDetails = new mongoose.Schema(
    {
        id: {
            type: String
        },
        
        type: {
            type: String
        },
        name: {
            type: String
        },
        invoiceNo: {
            type: String
        },
        customerNo: {
            type: String
        },
        soldTo: {
            type: Object
        },
        shipTo: {
            type: Object
        },
        invoiceDate: {
            type: Object
        },
        orderNo: {
            type: Object
        },
        orderDate: {
            type: Object
        },
        dateCreated: {
            type: Object
        },

        validEmails: {
            type: []
        },

        sent: {
            type: Boolean,
            default: false
        },

        file: {
            type: Buffer
        }
    }
); 

module.exports = mongoose.model("InvoiceDetails", InvoiceDetails)
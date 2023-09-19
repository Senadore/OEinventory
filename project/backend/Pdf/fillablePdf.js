var pdfFiller = require('pdffiller');

var sourcePDF = "packingListFillable.pdf";
 
var destinationPDF =  "test_complete.pdf";


var fields = {
    'SHOW NAMERow2': '',
    'ORDER NUMBERRow2': '',
    LOCATIONRow2: '',
    DESCRIPTIONRow1: '',
    DESCRIPTIONRow2: '',
    DESCRIPTIONRow3: '',
    DESCRIPTIONRow4: '',
    DESCRIPTIONRow5: '',
    DESCRIPTIONRow6: '',
    DESCRIPTIONRow7: '',
    DESCRIPTIONRow8: '',
    DESCRIPTIONRow9: '',
    DESCRIPTIONRow10: '',
    DESCRIPTIONRow11: '',
    DESCRIPTIONRow12: '',
    showname: '',
    ordernumber: '',
    location: '',
    qty: '',
    qty1: '',
    qty2: '',
    qty3: '',
    qty4: '',
    qty5: '',
    qty6: '',
    qty7: '',
    qty8: '',
    qty9: '',
    qty10: '',
    qty11: ''
  }



function fillPackingList(data) {


    const laptop = data.laptop; 
    const kiosk = data.kiosk; 
    const printer = data.printer; 
    const scanner = data.scanner; 
    const extra = data.extra; 


    fields.showname = data.showname
    fields.location = data.ship
    fields.ordernumber = data.order

    if(laptop.length != 0){
        fields.qty = laptop.length.toString(); 
        fields.DESCRIPTIONRow1 = 'Laptop: ' + laptop.map(obj => obj.name).join(', '); 
    }

    if(kiosk.length != 0){
        fields.qty1 = kiosk.length.toString(); 
        fields.DESCRIPTIONRow2 = 'Kiosk: ' +kiosk.map(obj => obj.name).join(', '); 
    }

    if(printer.length != 0){
        fields.qty2 = printer.length.toString(); 
        fields.DESCRIPTIONRow3 = 'Printer: ' +printer.map(obj => obj.name).join(', '); 
    }

    if(scanner.length != 0){
        fields.qty3 = scanner.length.toString(); 
        fields.DESCRIPTIONRow4 = 'Scanner: '+scanner.map(obj => obj.name).join(', '); 
    }

    if(extra.length != 0){
        fields.qty4 = extra.length.toString(); 
        fields.DESCRIPTIONRow5 =  extra.map(obj => obj.name).join(', '); 
    }



  

    pdfFiller.fillForm( sourcePDF, destinationPDF, fields, function(err) {
        if (err) throw err;
        console.log("In callback (we're done).");
    });



}


 
module.exports = { fillPackingList }







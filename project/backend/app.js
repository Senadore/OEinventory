var express = require('express');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path'); 
const mongoose = require('mongoose')
const laptopRoute = require("./Routes/laptop");
const kioskRoute = require("./Routes/kiosk"); 
const printerRoute = require("./Routes/printer"); 
const scannerRoute = require("./Routes/scanner"); 
const calenderRoute = require("./Routes/calender")
const extraRoute = require("./Routes/extra"); 
const showRoute = require("./Routes/shows"); 
const InvoiceRoute = require("./Routes/invoice"); 
const showPendingRoute = require("./Routes/pendingshow"); 
const bbwRoute = require("./Routes/Printers/bbw")
const bclRoute = require("./Routes/Printers/bcl")
const hpclRoute = require("./Routes/Printers/hpcl")
const epsonRoute = require("./Routes/Printers/epson")

var bodyParser = require('body-parser');
const extractShow = require('./ImportShow');

var app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors());

//connecting mongodb
const uri =
  "mongodb+srv://aaront:Suckme13292985@cluster0.c2synsg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },

);

const  data = [
    {
        id: 1,
        manufacture: "Dell",
        serial: 'H2SHVF2',
        model: "Latitude E7470",
        processor: "i5 6300u 2.4 gh ",
        ram: '8GB',
        hd: '256 SSD',
        os: 'WINDOWS 10',
        status: 'Available',
      },
      
]

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });




// app.post('/upload', upload.single('myFile'), (req, res) => {
//   //Access the uploaded file from req.file
//   const fileBuffer = req.file.buffer; 

//   //pass buffer to parser 
// extractShow(fileBuffer).then(result => {
//   console.log("Extracted: ", result); 
// }).catch(err => {console.error("Error: ",err)});


//   res.json({message: "File received successfully"}); 
// })




app.get('/', function (req, res) {
   res.send(data);
}); 

app.post('/addLaptop', function (req, res) {

    console.log(req.body)
    if(req.body != null){
        res.send({status: 'good'})
    }

})


app.use("/oe/api/laptop", laptopRoute ); 
app.use("/oe/api/printer", printerRoute); 
app.use("/oe/api/kiosk", kioskRoute); 
// app.use("/api/extra", extraRoute); 
app.use("/oe/api/scanner", scannerRoute)
app.use("/oe/api/shows", showRoute); 
app.use("/oe/api/pendingshow", showPendingRoute)
app.use("/oe/api/calender", calenderRoute)
app.use("/oe/api/printer/bbw", bbwRoute);
app.use("/oe/api/printer/bcl", bclRoute)
app.use("/oe/api/printer/hpcl", hpclRoute)
app.use("/oe/api/printer/epson", epsonRoute)


app.use("/api/invoice", InvoiceRoute)

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port); 
   console.log(data[0])
})
var express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const laptopRoute = require("./Routes/laptop");
const kioskRoute = require("./Routes/kiosk"); 
const printerRoute = require("./Routes/printer"); 
const scannerRoute = require("./Routes/scanner"); 
const calenderRoute = require("./Routes/calender")
const extraRoute = require("./Routes/extra"); 
const showRoute = require("./Routes/shows"); 
var bodyParser = require('body-parser')

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




app.get('/', function (req, res) {
   res.send(data);
}); 

app.post('/addLaptop', function (req, res) {

    console.log(req.body)
    if(req.body != null){
        res.send({status: 'good'})
    }

})


app.use("/api/laptop", laptopRoute ); 
app.use("/api/printer", printerRoute); 
app.use("/api/kiosk", kioskRoute); 
// app.use("/api/extra", extraRoute); 
app.use("/api/scanner", scannerRoute)
app.use("/api/shows", showRoute); 
app.use("/api/calender", calenderRoute)

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port); 
   console.log(data[0])
})
const router = require("express").Router(); 
const Shows = require("../Model/Shows"); 
const Archive = require("../Model/Archive")
const Laptop = require('../Model/Laptop');
const Kiosk = require('../Model/Kiosk'); 
const Printer = require('../Model/Printer'); 
const Scanner = require('../Model/Scanner');
const { fillPackingList } = require("../Pdf/fillablePdf");
const fs = require('fs');


router.post("/update", async (req, res) => {




  const archiveData = new Archive(req.body);

  req.body.laptop.forEach(element => {

    Laptop.findOneAndUpdate({id: element.name}, {status: 'IN'})
    .then(updateLaptop => {
        if (updateLaptop) {
            console.log('Laptop updated:', updateLaptop);
          } else {
            console.log('Laptop not found');
          }

    }); 
    
});

req.body.kiosk.forEach(element => {

  Kiosk.findOneAndUpdate({id: element.name}, {status: 'IN'})
  .then(updateLaptop => {
      if (updateLaptop) {
          console.log('kiosk updated:', updateLaptop);
        } else {
          console.log('kiosk not found');
        }

  }); 
  
});


req.body.printer.forEach(element => {

  Printer.findOneAndUpdate({id: element.name}, {status: 'IN'})
  .then(updateLaptop => {
      if (updateLaptop) {
          console.log('printer updated:', updateLaptop);
        } else {
          console.log('printer not found');
        }

  }); 
  
});



req.body.scanner.forEach(element => {

  Scanner.findOneAndUpdate({id: element.name}, {status: 'IN'})
  .then(updateLaptop => {
      if (updateLaptop) {
          console.log('scanner updated:', updateLaptop);
        } else {
          console.log('scanner not found');
        }

  }); 
  
});

const removal = await Shows.findOneAndRemove({showname:req.body.showname}, {'_id' :0})



const savedArchive   =  archiveData.save(); 



  res.status(200).json("good")




})

//add laptop to db 
router.post("/add", async (req, res) => {



    



    //creating  packing list from data 

    fillPackingList(req.body)

    setTimeout(() => {
        
    

    // storing data 
    const data = req.body; 
    data.file = fs.readFileSync('C:\\Users\\aaront\\Desktop\\react-admin-dashboard-master\\backend\\test_complete.pdf'); 
    const newShow = new Shows(data);


    //updating  status
    const idLaptop = req.body.laptop; 
    const idKiosk = req.body.kiosk; 
    const idPrinter = req.body.printer; 
    const idScanner= req.body.scanner; 


    idLaptop.forEach(element => {

        Laptop.findOneAndUpdate({id: element.name}, {status: 'OUT'})
        .then(updateLaptop => {
            if (updateLaptop) {
                console.log('Laptop updated:', updateLaptop);
              } else {
                console.log('Laptop not found');
              }
    
        })
        
    });

    idKiosk.forEach(element => {

        Kiosk.findOneAndUpdate({id: element.name}, {status: 'OUT'})
        .then(updateKiosk => {
            if (updateKiosk) {
                console.log('kiosk updated:', updateKiosk);
              } else {
                console.log('kiosk not found');
              }
    
        })
        
    });


    idPrinter.forEach(element => {

        Printer.findOneAndUpdate({id: element.name}, {status: 'OUT'})
        .then(updatePrinter => {
            if (updatePrinter) {
                console.log('printer updated:', updatePrinter);
              } else {
                console.log('pritner not found');
              }
    
        })
        
    });


    idScanner.forEach(element => {

        Laptop.findOneAndUpdate({id: element.name}, {status: 'OUT'})
        .then(updateScanner => {
            if (updateScanner) {
                console.log('scanner updated:', updateScanner);
              } else {
                console.log('scanner not found');
              }
    
        })
        
    });

    try {

        const savedShow =  newShow.save(); 
        res.status(200).json(savedShow); 
    } 

    catch (err) {

        res.status(500).json(err); 
    }


}, 5000);


   


}); 

// retrive list of laptops
router.get('/retrive', async (req, res) => {

const filter = {};
const all = await Shows.find(filter);

res.send(all)
}); 

router.get('/findshow:stringValue', async (req, res) => {

  const stringValue = req.params.stringValue.replace(":", ''); 
  const all = await Shows.find({showname:stringValue}, {'_id':0}); 

  res.send(all); 
})

router.get('/packinglist:stringValue', async (req, res) => {


    const stringValue = req.params.stringValue.replace(':', '');

    const all = await Shows.find({showname: stringValue}, {'file':1, '_id':0}); 


    // Do something with the stringValue.
    res.send(all[0].file);
}); 


//get an array of laptops ids for selection
router.get('/id', async (req, res) => {

   const all = await Laptop.find({}, {'id':1, '_id':0}); 
//    let result = all.map(a => a.id);
   res.send(all)

})



module.exports = router;
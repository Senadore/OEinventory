const router = require("express").Router(); 
const Laptop = require("../Model/Laptop"); 

//add laptop to db 
router.post("/add", async (req, res) => {

    const newLaptop = new Laptop(req.body); 

    try {

        const savedLaptop = await newLaptop.save(); 
        res.status(200).json(savedLaptop); 
    } 

    catch (err) {

        res.status(500).json(err); 
    }


}); 

// retrive list of laptops
router.get('/retrive', async (req, res) => {

    const filter = {};
const all = await Laptop.find(filter);
res.send(all)
}); 


//get an array of laptops ids for selection
router.get('/id', async (req, res) => {

   const all = await Laptop.find({status: 'IN'}, {'id':1, '_id':0}); 
//    let result = all.map(a => a.id);
   res.send(all)

})



module.exports = router;
const router = require("express").Router();
const Calender = require("../Model/Calender");

//add laptop to db
router.post("/add", async (req, res) => {

const doesExist = await Calender.exists({id: req.body.id})

console.log(req.body.id)

if(doesExist != null) {

    console.log("record already exists");

} else {

    const newItem = new Calender(req.body);

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }

}

  
});


router.get("/retrive", async (req, res) => {
    const filter = {};
    const all = await Calender.find(filter);
    res.send(all);
  });


  router.post("/delete", async (req, res) => {

    console.log(req.body)
    
    const deleteEvent = await Calender.findOneAndDelete({id: req.body.id}); 

    console.log(deleteEvent)

    res.status(200); 

  })


module.exports = router; 
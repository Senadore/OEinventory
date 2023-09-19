const router = require("express").Router();
const Kiosk = require("../Model/Kiosk");

//add laptop to db
router.post("/add", async (req, res) => {
  const newKiosk = new Kiosk(req.body);

  try {
    const savedKiosk = await newKiosk.save();
    res.status(200).json(savedKiosk);
  } catch (err) {
    res.status(500).json(err);
  }
});

// retrive list of laptops
router.get("/retrive", async (req, res) => {
  const filter = {};
  const all = await Kiosk.find(filter);
  res.send(all);
});

//get an array of laptops ids for selection
router.get("/id", async (req, res) => {
  const all = await Kiosk.find({ status: "IN" }, { id: 1, _id: 0 });
  //    let result = all.map(a => a.id);
  res.send(all);
});


//get a full count of how many is in inventory 

router.get("/all", async(req, res) => {
  const filter = {}
  const db = await Kiosk.find(filter)
  res.send(db); 
})

module.exports = router;

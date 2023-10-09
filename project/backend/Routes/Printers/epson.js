const router = require("express").Router();
const Printer = require("../../Model/Printers/Epson");

//add laptop to db
router.post("/add", async (req, res) => {
  const newPrinter = new Printer(req.body);

  try {
    const savedPrinter = await newPrinter.save();
    res.status(200).json(savedPrinter);
  } catch (err) {
    res.status(500).json(err);
  }
});

// retrive list of laptops
router.get("/retrive", async (req, res) => {
  const filter = {};
  const all = await Printer.find(filter);
  res.send(all);
});

//get an array of laptops ids for selection
router.get("/id", async (req, res) => {
  const all = await Printer.find({ status: "IN" }, { id: 1, _id: 0 });
  //    let result = all.map(a => a.id);
  res.send(all);
});

module.exports = router;

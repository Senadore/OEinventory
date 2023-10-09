const router = require("express").Router();
const Shows = require("../Model/Shows");
const Archive = require("../Model/Archive");
const Laptop = require("../Model/Laptop");
const Kiosk = require("../Model/Kiosk");
const Printer = require("../Model/Printer");
const Scanner = require("../Model/Scanner");
const multer = require("multer");
const path = require("path");
const extractShow = require("../ImportShow");
const pendingShow = require("../Model/PendingShow");

//use memory storage to keep file data in a buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.originalname);
    if (path.extname(file.originalname) !== ".pdf") {
      return cb(new Error("Only PDFs are allowed"));
    }
    cb(null, true);
  },
});

router.post("/upload", upload.single("myFile"), async (req, res) => {
  //Access the uploaded file from req.file
  const fileBuffer = req.file.buffer;

  //pass buffer to parser
  extractShow(fileBuffer)
    .then((result) => {
      console.log("Extracted: ", result);
      //Add imported/pending show to db
      saveDb(result);
    })
    .catch((err) => {
      console.error("Error: ", err);
    });

  async function saveDb(data) {
    const newPendingShow = new pendingShow(data);
    try {
      const savedPendingShow = await newPendingShow.save();
      res.write.json(savedPendingShow);
    } catch (err) {
      res.json(err);
    }
  }
});


router.get('/retrive', async (req, res) => {

const filter = {};
const all = await pendingShow.find(filter);
res.send(all)
}); 

module.exports = router;

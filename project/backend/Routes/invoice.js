const router = require("express").Router();
const InvoiceDetails = require("../Model/InvoiceDetails");
const Invoice = require("../Model/InvoiceDetails");
const sendEmail = require("../SendEmail");

// retrieve list of Invoices with pagination
router.get("/retrieve", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
    
    // Log to debug
    console.log(`Page: ${page}, Limit: ${limit}, SkipIndex: ${skipIndex}`);

    // Fetch and sort by ID (assuming ID is the field)
    const all = await Invoice.find()
      .sort({ "id": -1 })
      .skip(skipIndex)
      .limit(limit)
      .allowDiskUse(true)  // Opt-in to use disk for sort
      .select(['-__v', '-_id']);

    const total = await Invoice.countDocuments();

    // Log to debug
    console.log(`Total: ${total}, Total Pages: ${Math.ceil(total / limit)}`);
    
    res.json({ data: all, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//send invoice via email 

router.post("/send", async (req,res) => {

  try {
    await sendEmail(req.body);
    res.json({ message: 'Email sent successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }



  InvoiceDetails.findOneAndUpdate({name: req.body.attachment.name}, {sent: true})
  .then(updatedInvoice => {
      if (updatedInvoice) {
          console.log('printer updated:');
        } else {
          console.log('pritner not found');
        }

  })

})
  module.exports = router;

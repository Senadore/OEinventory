const getInvoiceById = require("./invoiceHandler");
const grabInvoiceDetails = require("./detailedInvoices");
const router = require("express").Router();
const fs = require("fs");
const path = require("path")

router.get("/grab/:invoice", async (req, res) => {
  const invoiceId = req.params.invoice;

  const filePath = path.join(
    "C:/Users/aaront/Desktop/react-admin-dashboard-master/backend/Routes/InoiceGen/Invoice-Pdf",
    `Invoice-${invoiceId}.pdf`
  );

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    // If file doesn't exist, generate it using getInvoiceById
    // await getInvoiceById(invoiceId);
  }
  await getInvoiceById(invoiceId);

  // Try sending the file
  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${invoiceId}.pdf`);

    const pdfStream = fs.createReadStream(filePath);
    pdfStream.pipe(res);
  } catch (error) {
    console.error("Error sending the PDF:", error);
    res.status(500).send("Internal Server Error. Unable to send the PDF.");
  }
});

router.get("/details", async (req, res) => {
  console.log("details");
  const data = await grabInvoiceDetails();
  res.send(data);
});

module.exports = router;

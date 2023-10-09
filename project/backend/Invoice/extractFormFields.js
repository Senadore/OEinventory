const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const readPdfForm = async (filePath) => {
  // Load the existing PDF file
  const existingPdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the form from the PDF
  const form = pdfDoc.getForm();

  // Get all fields from the form
  const fields = form.getFields();

  console.log(form.getFields())

  const fieldData = {};

  // Loop through each field to get their names and values
  fields.forEach((field) => {
    const name = field.getName();
    let value;

    switch (field.constructor.name) {

      default:
        value = field.getText();
    }

    fieldData[name] = value;
  });

  return fieldData;
};

// Test the function
(async () => {
  const filePath = 'C:\\Users\\aaront\\Desktop\\react-admin-dashboard-master\\backend\\Invoice-pdf\\Invoice-127816.pdf';  // Replace with the path to your PDF file
  const fieldData = await readPdfForm(filePath);
  console.log('Extracted Form Fields:', fieldData);
})();

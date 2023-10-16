const sql = require("mssql");
const  createInvoiceObject  = require("./createInvoiceObject");
const  mapValues  = require("./mapValues");
const { fieldData } = require("./fieldData");
const dbConnection = require('./dbConnection');
const dbConfig = require('./dbConfig');
const pdffiller = require('pdffiller')

const sourcePDF = "C:\\Users\\aaront\\Desktop\\react-admin-dashboard-master\\backend\\Routes\\InoiceGen\\Invoice-Template.pdf";

async function getInvoiceById(invoiceId) {
  const pool = await dbConnection.getPool();
  
    const invoiceResult = await findInvoiceById(invoiceId, pool);

    if (invoiceResult.recordset.length > 0) {
        // console.log(invoiceResult)
      await processInvoice(invoiceResult.recordset[0], pool, sql);
    } else {
      console.log(`No invoice found with the given ID: ${invoiceId}`);
    }
 
}

async function findInvoiceById(invoiceId, pool) {
  return await pool
    .request()
    .input("invoiceId", sql.VarChar, invoiceId)
    .query("SELECT * FROM dbo.OEHDRHST_SQL WHERE inv_no = @invoiceId");
}

async function processInvoice(invoiceData, pool, sql) {

  const clonedInvoiceObject =   createInvoiceObject(invoiceData);
  await mapValues(invoiceData.job_no, invoiceData.billed_dt, invoiceData.hist_dt, pool, sql, clonedInvoiceObject);
  const cleanInvoice = cleanObject(clonedInvoiceObject); 
    await  generatePDF(cleanInvoice);

}


function cleanObject(clonedInvoice){

    const cleanedObject = Object.entries(clonedInvoice).reduce(
        (acc, [key, value]) => {
          // If the value is a string, remove extra spaces
          if (typeof value === 'string') {
            acc[key] = value.trim();
          } 
          // If the value is null or undefined, don't add it to the new object
          else if (value === null || value === undefined) {
            // Do nothing
          } 
          // Otherwise, keep the value as it is
          else {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      return cleanedObject
}

function generatePDF(invoiceData) {
  return new Promise((resolve, reject) => {
      pdffiller.fillForm(
          sourcePDF,
          `C:/Users/aaront/Desktop/react-admin-dashboard-master/backend/Routes/InoiceGen/Invoice-pdf/Invoice-${invoiceData.InvoiceNo}.pdf`,
          invoiceData,
          (err) => {
              if (err) {
                  console.error("Error generating PDF:", err);
                  reject(err);
              } else {
                  console.log('Invoice created');
                  resolve();
              }
          }
      );
  });
}




 

// Start the process by calling the function and providing an invoice ID.
// Replace 'INV123' with the invoice ID you want to process.
module.exports = getInvoiceById
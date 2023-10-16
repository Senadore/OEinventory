const dbConnection = require('./dbConnection');
const sql = require("mssql");

const item = {

    OrderNumber: null 
} 



async function grabInvoiceDetails() {
    try {
      const pool = await dbConnection.getPool();
      const endDate = 20231231;  // Consider passing these as arguments or environment variables
      const startDate = 20230101;
    
      const set = await getDataFor2023(pool, startDate, endDate);
      const rows = [];
  
      for (const record of set.recordset) {
        const transformedRecord = {};
        transformedRecord.id = `Invoice-${record.inv_no}`; 
        transformedRecord.invoiceNo = record.inv_no;
        transformedRecord.orderNo = record.ord_no;
        transformedRecord.customerNo = record.cus_no;
        transformedRecord.shipTo = record.ship_to_name;
        transformedRecord.soldTo = record.bill_to_name;
        transformedRecord.invoiceDate = convertDateFormat(record.inv_dt);
        transformedRecord.orderDate = convertDateFormat(record.ord_dt);
        transformedRecord.email = '';
        transformedRecord.file = record.inv_no;

        rows.push(transformedRecord);
      }
  
      return rows; 
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  

  function convertDateFormat(date) {
    const dateStr = date.toString(); // Convert the date to a string if it's not already
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${month}/${day}/${year}`;
  }
  
  
  


  
  
  async function getDataFor2023(pool, startDate, endDate) {
    // Log types and values
    console.log('Start:', typeof startDate, startDate);
    console.log('End:', typeof endDate, endDate);
  
    // Ensure they are integers
    startDate = parseInt(startDate, 10);
    endDate = parseInt(endDate, 10);
  
    // Log types and values again
    console.log('Parsed Start:', typeof startDate, startDate);
    console.log('Parsed End:', typeof endDate, endDate);
  
    try {
      return await pool
        .request()
        .input('start', sql.Int, startDate)
        .input('end', sql.Int, endDate)
        .query(`SELECT * FROM dbo.OEHDRHST_SQL WHERE billed_dt >= @start AND billed_dt <= @end ORDER BY inv_no DESC`);
    } catch (err) {
      console.error('SQL Error:', err);
      throw err;
    }
  }


  module.exports = grabInvoiceDetails
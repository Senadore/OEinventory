
async function mapValues(ordNo, billDt, histDt, pool, sql, clonedInvoiceObject) {
  let lineItems = await pool.request()
  .input('ordNo', sql.VarChar, ordNo)
  .input('billedDate', sql.VarChar, billDt.toString()) // Add the target date here
  .query('SELECT * FROM dbo.OELINAUD_SQL WHERE ord_no = @ordNo AND billed_dt = @billedDate');

  // If no line items are found for billed_dt, try hist_dt
  if (lineItems.recordset.length === 0) {
      lineItems = await pool.request()
      .input('ordNo', sql.VarChar, ordNo)
      .input('histDate', sql.VarChar, histDt.toString())
      .query('SELECT * FROM dbo.OELINAUD_SQL WHERE ord_no = @ordNo AND billed_dt = @histDate');
  }

  let highestLineSeqNo = 0;
  if (lineItems.recordset.length > 0) {
      highestLineSeqNo = Math.max(...lineItems.recordset.map(item => item.line_seq_no));
  }

  console.log(`The highest line sequence number is: ${highestLineSeqNo}`);

  if (highestLineSeqNo > 0) {
      await mapLineItems(ordNo, histDt, pool, sql, highestLineSeqNo, clonedInvoiceObject);
  } else {
      console.log("No line items found for this order number and billed date or history date.");
  }
}

  

  async function mapLineItems(ordNo, billDt, pool, sql, lines, clonedInvoiceObject) {
    // Separate index for description fields
  let descriptionIndex = 1;
  let rowIndex = 1; // Initialize rowIndex to 1
  clonedInvoiceObject.SubTotal = 0; // Initialize SubTotal to 0
  
    for (let i = 1; i <= lines; i++) {
      const additionalResult = await pool.request()
        .input('ordNo', sql.VarChar, ordNo)
        .input('billedDate', sql.VarChar, billDt.toString())
        .input('lineNo', sql.VarChar, i.toString())
        .query('SELECT * FROM dbo.OELINAUD_SQL WHERE ord_no = @ordNo AND billed_dt = @billedDate AND line_seq_no = @lineNo');

  
        // Map fields if there's only one record for the line item
        // Sort items by aud_tm in descending order to get the latest one first.
        const sortedItems = additionalResult.recordset.sort((a, b) => b.aud_tm - a.aud_tm);
        
        // Initialize a variable to store the selected item
        let selectedItem = null;
        // Loop through sortedItems to find the first item with the same aud_tm as the latest
        for (const item of sortedItems) {
          if (item.aud_tm === sortedItems[0].aud_tm) {
            if (item.qty_to_ship > 0) {
              selectedItem = item;
              break;
            } else if (item.qty_bkord > 0 && selectedItem === null) {
              selectedItem = item;
              // Don't break, continue searching for an item with qty_to_ship
            }
          }
        }
    
        // Log the selected item for this line
        if (selectedItem !== null) {
          // Use rowIndex instead of i for the field names
          clonedInvoiceObject[`QtyOrdered_${rowIndex}`] = selectedItem.qty_ordered;
          clonedInvoiceObject[`QtyBackOrdered_${rowIndex}`] = selectedItem.qty_bkord;
          clonedInvoiceObject[`QtyShipped_${rowIndex}`] = selectedItem.qty_to_ship; 
          clonedInvoiceObject[`ItemNumber_${rowIndex}`] = selectedItem.item_no; 
          clonedInvoiceObject[`ItemDescription_${descriptionIndex}`] = selectedItem.item_desc_1; 
          clonedInvoiceObject[`ItemDescription_${descriptionIndex+1}`] = selectedItem.item_desc_2; 
          clonedInvoiceObject[`UnitPrice_${rowIndex}`] = selectedItem.unit_price.toFixed(5);
          clonedInvoiceObject[`UnitOfMeasure_${rowIndex}`] = selectedItem.uom; 
  
           // Calculate extended price and add it to SubTotal
        const extendedPrice = selectedItem.unit_price * selectedItem.qty_to_ship;
        const formatExt = extendedPrice.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      });
      
        clonedInvoiceObject[`ExtendedPrice_${rowIndex}`] = formatExt;
  
        // Add the extended price to the SubTotal field
        const subtotalFormat =  parseFloat((clonedInvoiceObject.SubTotal + extendedPrice).toFixed(2));
        const parseNum = subtotalFormat.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      });
      
        clonedInvoiceObject.SubTotal = parseNum
          rowIndex += 2; // Increment by 2 for each line item
          descriptionIndex += 2;
        }  else {
          console.log(`No item meets the criteria for line ${i}.`);
        }
      
    }

}

  
  module.exports = mapValues;
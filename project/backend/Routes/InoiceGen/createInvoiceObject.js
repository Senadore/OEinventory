// createInvoiceObject.js
const invoiceTemplate = require('./invoiceTemplate');

function createInvoiceObject(invoice) {
  let newInvoice = { ...invoiceTemplate };  // Start with a clone of the template
//header
newInvoice.InvoiceNo = invoice.inv_no;
newInvoice.InvoiceDate = formatDate(invoice.inv_dt.toString()); 
//sold to or bill to 
newInvoice.SoldToName = invoice.bill_to_name; 
newInvoice.SoldToAddress1 = invoice.bill_to_addr_1; 
newInvoice.SoldToAddress2 = invoice.bill_to_addr_2; 
newInvoice.SoldToAddress3 = invoice.bill_to_addr_3; 
newInvoice.SoldToCountry = invoice.bill_to_country; 
//ship to 
newInvoice.ShipToName = invoice.ship_to_name
newInvoice.ShipToAddress1 = invoice.ship_to_addr_1; 
newInvoice.ShipToAddress2 = invoice.ship_to_addr_2; 
newInvoice.ShipToAddress3 = invoice.ship_to_addr_3; 
newInvoice.ShipToCountry = invoice.ship_to_country; 
//sales
newInvoice.OrderNumber = invoice.job_no; 
newInvoice.OrderDate = formatDate(invoice.ord_dt.toString()); 
newInvoice.CustomerNo = invoice.cus_no; 
newInvoice.PONumber = invoice.oe_po_no; 
newInvoice.ShipVia = invoice.ship_via_cd; 
newInvoice.Terms = invoice.ar_terms_cd; 
newInvoice.DocumentType = invoice.ar_terms_cd.match('CC') ? 'Paid Invoice' : 'Invoice'
newInvoice.SalesPerson = invoice.slspsn_no;
//footer 
newInvoice.Comment = invoice.cmt_1; 
newInvoice.Comment2 = invoice.cmt_2; 
newInvoice.Comment3 = invoice.cmt_3; 

newInvoice.Freight = invoice.frt_amt.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}); 
newInvoice.SalesTax = invoice.accum_sls_tax_amt; 
newInvoice.Total = '$'+invoice.tot_dollars.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});; 
newInvoice.Net30Msg = invoice.ar_terms_cd.match('CC') ? 'This invoice was paid via credit card. DO NOT PAY.' : 'Invoices not paid within terms are subject to a 3% service charge'; 
  return newInvoice;
}



function formatDate(dateString) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${month}/${day}/${year}`;
}

module.exports = createInvoiceObject;

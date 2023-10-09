const { PDFExtract } = require('pdf.js-extract')



const pdfExtract = new PDFExtract(); 

const options = {normalizeWhitespace: false}

// List of known Item Numbers with Description
const knownItemNumbers = [

    {
        itemNumber: '75-460-4004-000',
        description: 'Epson Color Ink Jet Printer'
    },
    {
        itemNumber: '75-461-3000-000',
        description: 'Black Self-Check Computer'
    },
    {
        itemNumber: '75-462-0000-000',
        description: 'Help Desk Laptop Check-in'
    },
    {
        itemNumber: '75-451-ZDS9-208',
        description: 'Zebra Barcode Scan-Self Check'
    },
    {
        itemNumber: '75-621-0000-000',
        description: 'P1102, Copy Paper, Tools,PwrSp'
    },
    {
        itemNumber: '75-441-0000-000',
        description: 'Wifi Router'
    },

    {
      itemNumber: '75-461-2000-000',
      description: 'White Self-Check Computer'
  },
  {
      itemNumber: '75-455-4000-000',
      description: 'Toner Brother HL-l2370DW'
  },
  {
      itemNumber: '75-621-1100-000',
      description: 'Shrnk,Rtn BOL,Rtn Labels,Tape'
  },
  {
    itemNumber: '75-460-4003-000',
    description: 'Brother Black&White Laser Prnt'
},
{
  itemNumber: '75-460-4001-000',
  description: 'Hp Color Laser Printer'
},
{
  itemNumber: '75-460-4003-000',
  description: 'Brother Black&White Laser Prnt'
},


 
    
];


const constants = ['CUSTOMER ORDER','Job #/Show Name', 'Accounting Notes:']

const dateRegex = /\b\d{2}\/\d{2}\/\d{4}\b/g;  // Regular expression to find dates in mm/dd/yyyy format

const findMostFrequentDate = (content) => {
  const dateMap = {};
  let mostFrequentDate = null;
  let maxCount = 0;

  for (const element of content) {
    const matches = element.str.match(dateRegex);
    if (matches) {
      for (const date of matches) {
        dateMap[date] = (dateMap[date] || 0) + 1;
        if (dateMap[date] > maxCount) {
          maxCount = dateMap[date];
          mostFrequentDate = date;
        }
      }
    }
  }

  return mostFrequentDate;
};



// NAME 9TH ELEMENT
// show name should be the 6th element after Job #/Show Name
// address is after Accounting Notes. 1st element is street name than every other element is makes up the rest of the object 3 to be exact
// ship date is 3 elements after the qty ordered.

const extractShow = (buffer) => {
  return new Promise((resolve, reject) => {



    let result = {
        customerOrder: '',
        customerName: '',
        showName: '',
        address: '',
        ship: null,
        items: [],
        file: buffer
      };
      
pdfExtract.extractBuffer(buffer, options, (err, data) => {   
   if (err) return console.error(err);


  const pages = data.pages;
console.log(pages[0].content)
 

  for (const page of pages) {
    const content = page.content;

    
     
      if(content[10].str != ' ' || content[10].str != constants[1]){
        result.customerName = content[8].str+' '+content[10].str
      } else {
        result.customerName = content[8].str

      }

    

    for (let i = 0; i < content.length; i++) {
      const element = content[i].str;

      if (constants.includes(element)) {
        switch (element) {
          case 'CUSTOMER ORDER':
            result.customerOrder = content[i + 2]?.str;
            break;
          case 'Job #/Show Name':
            result.showName = content[i + 2]?.str;
            break;
          case 'Accounting Notes:':
            result.address = [
              content[i + 1]?.str,
              content[i + 3]?.str,
              content[i + 5]?.str,
              content[i + 7]?.str
            ].join(' ');
            break;
          default:
            break;
        }
      }

      const knownItem = knownItemNumbers.find(item => item.itemNumber === element);
      
      if (knownItem) {
        const qtyOrdered = content[i + 6]?.str;  // Change the index based on the actual layout
        const shipDate = content[i+11];
        if (qtyOrdered && !isNaN(qtyOrdered)) {  // Check if it's a valid number
          result.items.push({
            itemNumber: knownItem.itemNumber,
            description: knownItem.description,
            qtyOrdered: qtyOrdered
          });
        }
      }

    }

    result.ship = findMostFrequentDate(content);
    if (result.ship) break;
  }
  resolve(result)
})

  })
}


module.exports = extractShow
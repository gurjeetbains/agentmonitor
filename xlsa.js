const XLSX = require('xlsx');
const workbook = XLSX.readFile(__dirname + '/sheet.xlsx');
const sheet_name_list = workbook.SheetNames;
let agentdetails = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
let transactiondetails = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);
module.exports = {
  transactiondetails: transactiondetails,
  agentdetails: agentdetails
}

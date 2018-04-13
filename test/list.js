var excelUtil = require('../function/airdropList');
var errorAirdropListPath = '../excel/error.xlsx';
var totalAirdropListPath = '../excel/airdrop.xlsx';
var data = excelUtil.parseTotalAirdropList(totalAirdropListPath,errorAirdropListPath,30,0);
console.log(data);

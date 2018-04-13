/**
 * Created by sunnyfrank on 2018/4/10.
 */
var excelManager = require('./excelHandleManager');
var totalAirdropListPath = '../excel/airdrop0409.xlsx';
var validAirdropListPath = '../excel/valid.xlsx';
var invalidAirdropListPath = '../excel/invalid.xlsx';
var Web3 = require('web3');
if (typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/IPrKQYlzC420gBJRr1Ol"));
}

function isRealNum(val){
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}

//read xlsx data
var data = excelManager.readExcelContent(totalAirdropListPath);
var validList = [];
var invalidList = [];
for (var i = 0; i < data.length; i++){
  if(web3.utils.isAddress(data[i][0]) && isRealNum(data[i][1])){
    validList.push(data[i]);
  }else{
    invalidList.push(data[i]);
  }
}
excelManager.writeDataToExcel(validList,validAirdropListPath);
excelManager.writeDataToExcel(invalidList,invalidAirdropListPath);

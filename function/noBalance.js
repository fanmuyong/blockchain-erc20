var excelManager = require('./excelHandleManager');
var balanceAndValidAirdropListPath = '../excel/balanceAndValid.xlsx';
var validAirdropListPath = '../excel/valid.xlsx';
var noBalanceAirdropListPath = '../excel/noBalance.xlsx';
var Web3 = require('web3');
if (typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/IPrKQYlzC420gBJRr1Ol"));
}

var GetNoBalanceAddress = async function(){
  //read xlsx data
  var data = excelManager.readExcelContent(validAirdropListPath);
  var List = [];
  var validList = [];
  var invalidList = [];
  for (var i = 0; i < data.length; i++){
      if(i == 0){
        continue;
       }
       var balance = await web3.eth.getBalance(data[i][0]);
       console.log(balance);
      if(balance != 0){
        validList.push(data[i]);
       }else{
         invalidList.push(data[i]);
      }
  }
  List.push(validList);
  List.push(invalidList);
  return List;
}

GetNoBalanceAddress().then(function(List){
  excelManager.writeDataToExcel(List[0],balanceAndValidAirdropListPath);
  excelManager.writeDataToExcel(List[1],noBalanceAirdropListPath);
}).catch(console.log);

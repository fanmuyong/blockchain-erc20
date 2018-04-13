/**
 * Created by sunnyfrank on 2018/4/10.
 */
var excelManager = require('../function/excelHandleManager');
var totalAirdropListPath = '../excel/airdrop.xlsx';
var Random = require('../function/random');
var Web3 = require('web3');
if (typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var asyncGetNewAddress = async function(){
  var data = [];
  var headLine = [];
  headLine.push("收币地址")
  headLine.push("币量");
  data.push(headLine);
  for (var i = 0; i < 1000; i++) {
    var addresses = [];
    //var address =  await web3.eth.personal.newAccount("sunnyfrank");
    var address = "0x30C56062ee8171C0b01988f7A449668586D941B2";
    addresses.push(address);
    addresses.push(0.01);
    data.push(addresses);
  }
  return data;
}

asyncGetNewAddress().then(res => excelManager.writeDataToExcel(res,totalAirdropListPath))
                    .catch(err => console.log(err));

/**
 * Created by sunnyfrank on 2018/4/10.
 */
 var Web3 = require('web3');
 var Tx = require('ethereumjs-tx');
 var ethjsaccount = require('ethjs-account');
 var config = require('config');
 var excelUtil = require('./function/airdropList');
 var errorAirdropListPath = './excel/error.xlsx';
 var totalAirdropListPath = './excel/airdrop.xlsx';

 if (typeof web3 !== 'undefined'){
   web3 = new Web3(web3.currentProvider);
 } else {
   //web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/IPrKQYlzC420gBJRr1Ol"));
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 }

 //------------------------------ init property ----------------------------
 //airdrop contract abi
 var airdropAbiArray  = config.get("airdropModule.airdropAbiArray");
 //airdrop contract address
 var airdropContractAddress = config.get("airdropModule.airdropContractAddress");
 //airdrop contract instance
 var AirdropContract = new web3.eth.Contract(airdropAbiArray,airdropContractAddress);
//token contract abi
var tokenAbiArray = config.get("tokenModule.tokenAbiArray");
//token contract address
var tokenContractAddress = config.get("tokenModule.tokenContractAddress");
//airdrop contract instance
var TokenContract = new web3.eth.Contract(tokenAbiArray,tokenContractAddress);
//user private key
var userPrivateKey = config.get("userModule.userPrivateKey");
//transferFrom address
var transferFromAddress = config.get("userModule.transferFromAddress");
//gasprice
var gasPrice = config.get('transaction.gasPrice');
//gasLimit
var gasLimit = config.get('transaction.gasLimit');
//transfer address amount
var addressAmount = config.get('transaction.addressAmount');
//transfer start index
var startIndex = config.get('transaction.startIndex');
//token contract decimals
var decimals = config.get('transaction.decimals');
//get address from privateKey
var privateKeyToAddress = function(privateKey) {
    var address = ethjsaccount.privateToAccount(privateKey).address;
    return address;
};

//-------------------------------- function --------------------------------
var transfer = function(erc20TokenContractAddress , airDropOriginalAddress ,airdropDestinationAddresses, airdropAmounts,userPrivateKey,decimals,hashIdCallBack) {
    let fromAddress = privateKeyToAddress(userPrivateKey);
    // using the event emitter
    AirdropContract.methods.airDrop(erc20TokenContractAddress,
        airDropOriginalAddress,
        airdropDestinationAddresses,
        airdropAmounts,decimals).send({from:fromAddress})
    .on('transactionHash', function(hash){
        hashIdCallBack(hash);
    })
    .on('confirmation', function(confirmationNumber, receipt){
      console.log(confirmationNumber,receipt);
    })
    .on('receipt', function(receipt){
        console.log(receipt);
    })
    .on('error', console.error);
};

var transferWithAddressAndAmounts = function(){
  let airdropList =  excelUtil.parseTotalAirdropList(totalAirdropListPath,errorAirdropListPath,addressAmount,startIndex);
  transfer(tokenContractAddress,transferFromAddress,airdropList[0],airdropList[1],userPrivateKey,decimals,function (hashId) {
    console.log("hashID: " + hashId);
  });
};

transferWithAddressAndAmounts();

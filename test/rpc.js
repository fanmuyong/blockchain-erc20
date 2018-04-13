/**
 * Created by sunnyfrank on 2018/4/10.
 */
var Web3 = require('web3');
process.env["NODE_CONFIG_DIR"] = "../config/";
var config = require('config');
if (typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/IPrKQYlzC420gBJRr1Ol"));
}

var abiArray  = config.get("abiArray");
var address = config.get("contractAddress");
var MyContract = new web3.eth.Contract(abiArray,address);
MyContract.methods.totalSupply().call().then(result => console.log(result));


web3.eth.getGasPrice().then(function(p) {
    var gasPrice = web3.utils.toHex(p);
    console.log(gasPrice);
});

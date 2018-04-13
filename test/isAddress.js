var Web3 = require('web3');
if (typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/IPrKQYlzC420gBJRr1Ol"));
}
var isAddess = web3.utils.isAddress("0xE3be6b7575D6F823Da1d69ffA863057Ca19efd09");
console.log(isAddess);

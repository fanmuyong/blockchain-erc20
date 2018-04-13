var keythereum = require("keythereum");
var password = "sunny";
var keyObject =
{"address":"6cb914b62dc848825f432a46895f2da881bbfd09","crypto":{"cipher":"aes-128-ctr","ciphertext":"fd3ef11e25f01aecca252fc1e6195bc1beb282e735dd70d5634d1018857a742a","cipherparams":{"iv":"b24822abd995a34c70d2358fc1e09ee8"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"e3a0d930c058a7a95d3b9b404eeaafb0a76f240193074de9d7a1ddfe2942f536"},"mac":"fb2a1a6d2d23e6230b2dea06bde0ba1e0309f8a1611bbe24106ded404c6a7f5d"},"id":"5a4f7ea4-7b34-41b8-8050-ffc0f7817872","version":3};

var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));

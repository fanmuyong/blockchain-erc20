var ethjsaccount = require('ethjs-account');
var privateKey = "b3e37dccabed0a6ddd393c1b152a081647d4c0ea24cbfe34b177fb1b78ce21c7";

var privateKeyToAddress = function(privateKey) {
    var address = ethjsaccount.privateToAccount(privateKey).address;
    return address;
};

console.log(privateKeyToAddress(privateKey));

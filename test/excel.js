/**
 * Created by sunnyfrank on 2018/4/10.
 */
var excelManager = require('../function/excelHandleManager');
var errorAirdropListPath = '../excel/error.xlsx;';
var totalAirdropListPath = '../excel/airdrop.xlsx';
var parseTotalAirdropList = function(totalAirdropListPath, errorAirdropListPath,maxLength, destinationStartIndex){
    //read xlsx data
    data = excelManager.readExcelContent(totalAirdropListPath);

    var airdropList = [];
    var invalidAirdropList = [];
    var addresses = [];
    var amounts = [];

    for (var i in data){

        if(i == 0){
            continue;
        }

        if(i < destinationStartIndex){
            continue;
        }

        if(i == destinationStartIndex + maxLength){
            break;
        }

        if(data[i][0].length == 42){
          addresses.push(data[i][0]);
          amounts.push(data[i][1]);
        }else{
          addresses.push(data[i][0]);
          amounts.push(data[i][1]);
          invalidAirdropList.push(data[i]);
        }
    }
    airdropList.push(addresses,amounts);
    console.log('airdropListAccount:'+ airdropList[0].length);
    console.log('invalidAirdropList:'+ invalidAirdropList.length);
    excelManager.writeDataNoOverriden(invalidAirdropList,errorAirdropListPath);
    return airdropList;
};
var list = parseTotalAirdropList(totalAirdropListPath,errorAirdropListPath,30,0);
console.log(list);

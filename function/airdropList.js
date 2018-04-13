/**
 * Created by sunnyfrank on 2018/4/10.
 */
var excelManager = require('./excelHandleManager');
var parseTotalAirdropList = function(totalAirdropListPath,errorAirdropListPath,maxLength,destinationStartIndex){
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

        if(i == destinationStartIndex + maxLength + 1){
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
    excelManager.writeDataToExcel(invalidAirdropList,errorAirdropListPath);
    console.log(airdropList);
    return airdropList;
};

module.exports = {
    parseTotalAirdropList:parseTotalAirdropList
};

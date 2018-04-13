/**
 * Created by sunnyfrank on 2018/4/10.
 */
var xlsx = require('node-xlsx');
var fs = require('fs');

function readFile(path){

    //only parse the first sheet
    var obj = xlsx.parse(path);
    var excelObj=obj[0].data;

    var data = [];
    for(var i in excelObj){
        var arr=[];
        var value=excelObj[i];
        for(var j in value){
            arr.push(value[j]);
        }
        data.push(arr);
    }
    return data;
}

function writeData(data,path){
    var buffer = xlsx.build([
        {
            name:'sheet1',
            data:data
        }
    ]);
    fs.writeFileSync(path,buffer,{'flag':'w'});
}

module.exports = {
    readExcelContent:readFile,
    writeDataToExcel:writeData
};

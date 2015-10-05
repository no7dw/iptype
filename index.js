var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./ip4');
var request = require('request');
lr.on('error', function (err) {
    console.log('error', err);
    // 'err' contains error object
});
var progress =0;
var getIpInfo= function(ip, cb){

    request('http://ip.taobao.com/service/getIpInfo.php?ip='+ip, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        console.log( ip, result.data.isp) // Show the HTML for the Google homepage.         
        cb(null);     
      }
      else{
        console.log('err', error);
        cb(error);
      }
        
      
    })
};
lr.on('line', function (line) {
    setTimeout(
    getIpInfo(line,function(){
        progress++
        console.log("progress",progress);
    }),200);
    // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function () {
    // All lines are read, file is closed now.
    console.log('end');
});
/**
 * Module dependencies.
 */
var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config.js')[env];

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "h+": this.getHours(), 
        "m+": this.getMinutes(), 
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds() 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

exports.configitem = function(req, res){ 
	console.log("configitem visited");
	if(req.query.ItemID == undefined)
	{
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.write('ItemID undefined');
            res.end();
            console.log('configitem.js: ItemID undefined!');
            return;
	}

        var configInfo;
        var options = {
                host : config.BusinessServer.host,
                port : config.BusinessServer.port,
                path : "/configitem?ItemID=" + req.query.ItemID,
                //headers : {"Content-type":"application/json"},
                method : "GET"
        };
        var wcfreq  = http.request(options, function(wcfresponse)
        {
            var Content = "" ; 
            //get response data from Webservice
            wcfresponse.on('data',function(chunk){
                    Content = Content + chunk ;
            });

            wcfresponse.on('end',function(){
                configInfo = JSON.parse(Content);
                console.log(Content);
                if((configInfo.status > 0))
                {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write(JSON.stringify(configInfo.content));
                    res.end();
                    console.log("Get config item information");
                }
                else
                {
                    console.log("configitem.js: Cannot get config item info: " + configInfo.errorMsg);
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write({errorMSG:configInfo.errorMsg});
                    res.end();
                    return;
                }

            });
        });

        wcfreq.on('error',function(e){
                console.log(e.message);
        });
        wcfreq.end();


};

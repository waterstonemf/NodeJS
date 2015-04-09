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

exports.credithistory = function(req, res){ 
	console.log("credit history visited");
	if(req.query.flag == undefined || req.query.ctaInternalID == undefined)
	{
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write('flag or ctaInternalID undefined');
		res.end();
		console.log('credithistory.js: playerID or playerName or ctaInternalID undefined!');
		return;
	}
	
	if(req.query.flag == 0)//Credit
	{
		var creditInfo;
		var options = {
                        host : config.BusinessServer.host,
                        port : config.BusinessServer.port,
                        path : "/credithistory/" + req.query.ctaInternalID,
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
                            creditInfo = JSON.parse(Content);
                            console.log(Content);
                            if((creditInfo.status >= 0))
                            {
                                for(count in creditInfo.content)
                                {
                                    var depositdate;
                                    if(creditInfo.content[count].date != "")
                                    {
                                            depositdate = new Date(creditInfo.content[count].date);
                                            creditInfo.content[count].date = depositdate.format("MM-dd-yyyy");
                                    }
                                    if(creditInfo.content[count].expires != "")
                                    {
                                            var expiresdate = new Date(creditInfo.content[count].expires);
                                            creditInfo.content[count].expires = expiresdate.format("MM-dd-yyyy");
                                    }
                                }
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write(JSON.stringify(creditInfo.content));
                                res.end();
                                console.log("Get credit info correctly");
                            }
                            else
                            {
                                console.log("credithistory.js: Cannot get credit history info: " + creditInfo.errorMsg);
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write({errorMSG:creditInfo.errorMsg});
                                res.end();
                                return;
                            }
				
			});
		});
		
		wcfreq.on('error',function(e){
			console.log(e.message);
		});
		wcfreq.end();
	}
        else if(req.query.flag == 1)//TTO limit
	{
		var ttoInfo;
		var options = {
                        host : config.BusinessServer.host,
                        port : config.BusinessServer.port,
                        path : "/ttohistory/" + req.query.ctaInternalID,
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
                            ttoInfo = JSON.parse(Content);
                            console.log(Content);
                            if((ttoInfo.status >= 0))
                            {
                                for(count in ttoInfo.content)
                                {
                                    if(ttoInfo.content[count].date != "")
                                    {
                                            var depositdate = new Date(ttoInfo.content[count].date);
                                            ttoInfo.content[count].date = depositdate.format("MM-dd-yyyy");
                                    }
                                    if(ttoInfo.content[count].expires != "")
                                    {
                                            var expiresdate = new Date(ttoInfo.content[count].expires);
                                            ttoInfo.content[count].expires = expiresdate.format("MM-dd-yyyy");
                                    }
                                }
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write(JSON.stringify(ttoInfo.content));
                                res.end();
                                console.log("Get tto limit history correctly");
                            }
                            else
                            {
                                console.log("credithistory.js: Cannot get tto limit history info: " + ttoInfo.errorMsg);
                                return;
                            }
				
			});
		});
		
		wcfreq.on('error',function(e){
			console.log(e.message);
		});
		wcfreq.end();
	}
	

};

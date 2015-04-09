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

exports.fmskhistory = function(req, res){ 
	console.log("fmsk history visited");
	if(req.query.flag == undefined || req.query.ctaInternalID == undefined)
	{
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write('flag or ctaInternalID undefined');
		res.end();
		console.log('credithistory.js: playerID or playerName or ctaInternalID undefined!');
		return;
	}
	
	if(req.query.flag == 0)//Front Money
	{
		var fmInfo;
		var options = {
                        host : config.BusinessServer.host,
                        port : config.BusinessServer.port,
                        path : "/fmhistory/" + req.query.ctaInternalID,
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
                            fmInfo = JSON.parse(Content);
                            console.log(Content);
                            if((fmInfo.status >= 0))
                            {
                                for(count in fmInfo.content)
                                {
                                    var depositdate;
                                    if(fmInfo.content[count].depositDate != "")
                                    {
                                            depositdate = new Date(fmInfo.content[count].depositDate);
                                            fmInfo.content[count].depositDate = depositdate.format("MM-dd-yyyy");
                                    }
                                }
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write(JSON.stringify(fmInfo.content));
                                res.end();
                                console.log("Get front money info correctly");
                            }
                            else
                            {
                                console.log("fmskhistory.js: Cannot get front money history info: " + fmInfo.errorMsg);
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write({errorMSG:fmInfo.errorMsg});
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
        else if(req.query.flag == 1)//Safe keeping
	{
		var skInfo;
		var options = {
                        host : config.BusinessServer.host,
                        port : config.BusinessServer.port,
                        path : "/skhistory/" + req.query.ctaInternalID,
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
                            skInfo = JSON.parse(Content);
                            console.log(Content);
                            if((skInfo.status >= 0))
                            {
                                for(count in skInfo.content)
                                {
                                    if(skInfo.content[count].depositDate != "")
                                    {
                                            var depositdate = new Date(skInfo.content[count].depositDate);
                                            skInfo.content[count].depositDate = depositdate.format("MM-dd-yyyy");
                                    }
                                }
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write(JSON.stringify(skInfo.content));
                                res.end();
                                console.log("Get safe keeping info correctly");
                            }
                            else
                            {
                                console.log("fmskhistory.js: Cannot get safe keeping history info: " + skInfo.errorMsg);
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

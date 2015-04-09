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

exports.markerhistory = function(req, res){ 
	console.log("marker history visited");
	if(req.query.flag == undefined || req.query.ctaInternalID == undefined)
	{
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write('flag or ctaInternalID undefined');
		res.end();
		console.log('markerhistory.js: playerID or playerName or ctaInternalID undefined!');
		return;
	}
	
	if(req.query.flag == 0)//pit marker
	{
		var pmInfo;
		var options = {
                        host : config.BusinessServer.host,
                        port : config.BusinessServer.port,
                        path : "/pmhistory/" + req.query.ctaInternalID,
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
                            pmInfo = JSON.parse(Content);
                            console.log(Content);
                            if((pmInfo.status >= 0))
                            {
                                for(count in pmInfo.content)
                                {
                                    var issuedate;
                                    if(pmInfo.content[count].issueDate != "")
                                    {
                                            issuedate = new Date(pmInfo.content[count].issueDate);
                                            pmInfo.content[count].issueDate = issuedate.format("MM-dd-yyyy");
                                    }
                                }
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write(JSON.stringify(pmInfo.content));
                                res.end();
                                console.log("Get front money info correctly");
                            }
                            else
                            {
                                console.log("markerhistory.js: Cannot get front money history info: " + pmInfo.errorMsg);
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write({errorMSG:pmInfo.errorMsg});
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
        else if(req.query.flag == 1)//cage marker
	{
		var cmInfo;
		var options = {
                        host : config.BusinessServer.host,
                        port : config.BusinessServer.port,
                        path : "/cmhistory/" + req.query.ctaInternalID,
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
                            cmInfo = JSON.parse(Content);
                            console.log(Content);
                            if((cmInfo.status >= 0))
                            {
                                for(count in cmInfo.content)
                                {
                                    if(cmInfo.content[count].issueDate != "")
                                    {
                                            var issuedate = new Date(cmInfo.content[count].issueDate);
                                            cmInfo.content[count].issueDate = issuedate.format("MM-dd-yyyy");
                                    }
                                }
                                res.writeHead(200, { 'Content-Type': 'text/plain' });
                                res.write(JSON.stringify(cmInfo.content));
                                res.end();
                                console.log("Get safe keeping info correctly");
                            }
                            else
                            {
                                console.log("markerhistory.js: Cannot get safe keeping history info: " + cmInfo.errorMsg);
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

/**
 * Module dependencies.
 */
var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config.js')[env];

exports.fundinfo = function(req, res){ 
	console.log("player fund infomation visited");
	if(req.query.ctaInternalID == undefined)
	{
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.write('ctaInternalID undefined');
            res.end();
            console.log('fundinfo.js: ctaInternalID undefined!');
            return;
	}
	
        var fundInfo;
        var options = {
                host : config.BusinessServer.host,
                port : config.BusinessServer.port,
                path : "/fundinfo/" + req.query.ctaInternalID,
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
                fundInfo = JSON.parse(Content);
                console.log(Content);
                if((fundInfo.status > 0))
                {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write(JSON.stringify(fundInfo.content));
                    res.end();
                    console.log("Get credit info correctly");
                }
                else
                {
                    console.log("fundinfo.js: Cannot get player fund info: " + fundInfo.errorMsg);
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write({errorMSG:fundInfo.errorMsg});
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

/**
 * Module dependencies.
 */
var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config.js')[env];
var Response = require('../models/response').Response;

exports.playersearch = function(req, res){ 
    var playerID = req.body.playerID;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
	if( playerID == "" && firstName == "" && lastName == "" && phone == "")
	{
		res.send(new Response(-2,"no search condition provided"));
		return;
	}

	var body_data = {"playerID":playerID,"firstName":firstName,"lastName":lastName,"phone":phone};
	var body = JSON.stringify(body_data);
	var options = {
				host : config.BusinessServer.host,
				port : config.BusinessServer.port,
				path : "/playersearch",
				headers : {"Content-type" :"application/json",
							"Content-Length":body.length },
				method : "POST"
			 };

	var wcfreq  = http.request(options, function(wcfresponse)
	{
		var loginContent = "" ; 
		
		//get response data from WCF
		wcfresponse.on('data',function(chunk){
			loginContent = loginContent + chunk ;
		});
		
		wcfresponse.on('end',function(){
			var jsonObj = JSON.parse(loginContent);
			console.log(loginContent);
			if(jsonObj.status == 1)
			{
                 res.send(new Response(1,"",jsonObj.content));
			} 
			else
			{
                res.send(new Response(0,"no search result found!"));
			}
			
		});
	});
	
	wcfreq.on('error',function(e){
		res.send(new Response(-1,"Error Occured during player finding: " + e.message));
	});

	wcfreq.write(body);
	wcfreq.end();
	

};
/**
 * Module dependencies.
 */
var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config.js')[env];

exports.sendModifyRequest = function (req, res) {
	var creditlineman = {};
	creditlineman.msg = "OK";

    res.send(creditlineman);
/*	var username = req.param('username', null);
	var password = req.param('password', null);
        console.log(username);
        console.log(password);

	if(username == null || username.length < 1)
	{
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.write('usernameempty');
            res.end();
            console.log('Empty User name inputed!');
            return;
	}
	else if(password == "" || password.length < 1)
	{
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.write('passwordempty');
            res.end();
            console.log('Empty Password inputed!');
            return;
	}
        
        var options = {
            host:config.BusinessServer.host,
            port:config.BusinessServer.port,
            path:"/user/userauthentication?" + "loginName=" + username + "&password=" + password,
            method: "GET"
        };
        
        var wcfreq  = http.request(options, function(wcfresponse)
	{
            var loginContent = "" ; 

            //get response data from BusinessServer
            wcfresponse.on('data',function(chunk){
                    loginContent = loginContent + chunk ;
            });

            wcfresponse.on('end',function(){
                var jsonObj = JSON.parse(loginContent);
                res.send(jsonObj);

            });
	});
	
	wcfreq.on('error',function(e){
		console.info(e.message);
	});
	
	wcfreq.end(); */

};

exports.getCLTTODetail = function(req, res){
	var cltto = {};
	cltto.creditlinelimit = 100;
	cltto.creditlineLimitcomment = "this is the comment for creditline";
	cltto.ttolimit = 200;
	cltto.ttolimitcomment = "this is the comment for tto";
	cltto.creditinactivity = 30;
	cltto.ttoexpires = 'bydate';
	cltto.ttoexpiresDate = '2008-02-10';

    res.send(cltto);
};
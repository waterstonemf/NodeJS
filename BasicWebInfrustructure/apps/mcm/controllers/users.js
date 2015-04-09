/**
 * Module dependencies.
 */
var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config.js')[env];

exports.login = function (req, res) {
	console.log('login requested');
	var username = req.param('username', null);
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
        
//        var options = {
//            host:config.BusinessServer.host,
//            port:config.BusinessServer.port,
//            path:"/user/userauthentication?" + "loginName=" + username + "&password=" + password,
//            method: "GET"
//        };
//        
//        var wcfreq  = http.request(options, function(wcfresponse)
//	{
//            var loginContent = "" ; 
//
//            //get response data from BusinessServer
//            wcfresponse.on('data',function(chunk){
//                    loginContent = loginContent + chunk ;
//            });
//
//            wcfresponse.on('end',function(){
//                var jsonObj = JSON.parse(loginContent);
//                res.send(jsonObj);
//
//            });
//	});
	
		var resData = {UserID:1,FirstName:'Demo',LastName:'ABC',Description:'Credit Manager',RoleID:2};
        res.send(new Response(1,'',resData));
        
//	wcfreq.on('error',function(e){
//		console.info(e.message);
//	});
//	
//	wcfreq.end();

};

exports.logout = function (req, res) {}

exports.authenticated = function (req, res) {
	console.log("MCM user authenticated visited");
	if ( req.session.loggedIn) {
	res.send(200);
	} else {
	res.send(401);//Unauthorized
	}
};

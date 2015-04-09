/**
 * Module dependencies.
 */
var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config.js')[env];

exports.issuemarker = function (req, res) {
	console.log('issue marker requested');
        var playerID = req.param('playerID', null);
        var fundID = req.param('fundID', null);
        var amount =  req.param('amount', null);
        var exchangeCurrencyID =req.param('exchangeCurrencyID', null);
        var exchangeRate = req.param('exchangeRate', null);
        var paidCurrencyID = req.param('paidCurrencyID', null);
        var paidRate = req.param('paidRate', null);
        var chips = req.param('chips', null);
        var cash =req.param('cash', null);
        var tokens = req.param('tokens', null);
        var stationID = req.param('stationID', null);
        var userID = req.param('userID', null);
        
        var options = {
            host:config.BusinessServer.host,
            port:config.BusinessServer.port,
            path:"/issuemarker?" + "playerID=" + playerID + "&fundID=" + fundID + "&amount=" + amount + "&exchangeCurrencyID=" + exchangeCurrencyID
                    + "&exchangeRate=" + exchangeRate + "&paidCurrencyID=" + paidCurrencyID + "&paidRate=" + paidRate + "&chips=" + chips
                    + "&cash=" + cash + "&tokens=" + tokens + "&stationID=" + stationID + "&userID=" + userID,
            method: "POST"
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
                console.log(loginContent);

                if(jsonObj.status == 1)
                {
                    res.writeHead(200, {'Content-Type':'text/plain'});
                    console.log(jsonObj.content.New_DocumentID);
                    res.write(jsonObj.content.New_DocumentID.toString());
                    res.end();
                    console.log('Issue Marker success!');
                }
                else
                {
                    res.writeHead(200, {'Content-Type':'text/plain'});
                    res.write("0");
                    res.end();
                    console.log('Unexpected error happend when issue marker!');
                }

            });
	});
	
	wcfreq.on('error',function(e){
		console.log("Error happens in issuemarker.js: " + e.message);
	});
	
	wcfreq.end();

};

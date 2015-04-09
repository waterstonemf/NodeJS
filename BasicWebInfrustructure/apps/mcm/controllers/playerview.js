/**
 * Module dependencies.
 */
var http = require('http');
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config.js')[env];

//Get player Basical Info and High Action Info and Credit Info from business server
//Logic combine should be in business server
exports.playerview = function(req, res) {
    console.log("player view visited");
    if (req.query.playerID == undefined) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('playerID undefined');
        res.end();
        console.log('playerID undefined!');
        return;
    }

    if (req.query.userID == undefined) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('userID undefined');
        res.end();
        console.log('userID undefined!');
        return;
    }

    var options = {
        host: config.BusinessServer.host,
        port: config.BusinessServer.port,
        path: "/playerview?playerID=" + req.query.playerID,
        method: "GET"
    };

    var wcfreq = http.request(options, function(wcfresponse) {
        var Content = "";

        //get response data from WCF
        wcfresponse.on('data', function(chunk) {
            Content = Content + chunk;
        });

        wcfresponse.on('end', function() {
            var jsonObj = JSON.parse(Content);
            if (jsonObj.status == 1) {
                getUserName(req, res, jsonObj, req.query.userID);

            }
            else {
                console.log("Cannot view player: " + jsonObj.errorMsg);
            }

        });
    });

    wcfreq.on('error', function(e) {
        console.log(e.message);
    });
    wcfreq.end();


};

function getUserName(req, res, playerObj, userID) {

    var options = {
        host: config.BusinessServer.host,
        port: config.BusinessServer.port,
        path: "/user/" + userID,
        method: "GET"
    };

    var wcfreq = http.request(options, function(wcfresponse) {
        var Content = "";

        //get response data from WCF
        wcfresponse.on('data', function(chunk) {
            Content = Content + chunk;
        });

        wcfresponse.on('end', function() {
            var jsonObj = JSON.parse(Content);
            if (jsonObj.status == 1) {
                //var image = new Buffer(playerObj.content.playerImage).toString('base64');
                //var image = playerObj.content.playerImage;
                var playerinfo =
					{
					    userid: userID,
					    username: jsonObj.content.loginName,
					    firstName: playerObj.content.firstName,
					    lastName: playerObj.content.lastName,
					    playerImage: playerObj.content.playerImage,

					    playerID: playerObj.content.playerID,
					    ctaInternalID: playerObj.content.ctaInternalID,
					    playerStatus: playerObj.content.playerStatus,
					    creditStatus: playerObj.content.creditStatus,
					    playerName: playerObj.content.fullName,

					    lastActionAmount: playerObj.content.lastActionAmount,
					    lastActionDate: playerObj.content.lastActionDate,
					    highActionAmount: playerObj.content.highAmount,
					    highActionDate: playerObj.content.highActionDate,

					    AvailableLimit: playerObj.content.availableLimit,
					    CreditLine: playerObj.content.creditLine,
					    TTOLimit: playerObj.content.ttoLimit,
					    TotalLimit: playerObj.content.totalLimit,
					    FrontMoney: playerObj.content.frontMoney,
					    SafeKeeping: playerObj.content.safeKeeping,
					    PitMarkers: playerObj.content.pitMarkers,
					    CageMarkers: playerObj.content.cageMarkers,
					    Checks: playerObj.content.checks,
					    ReturnedItems: playerObj.content.returnedItem,
					    WriteOffs: playerObj.content.writeOffs,
					    Outstanding: playerObj.content.outstanding
					};
					res.writeHead(200, { 'Content-Type': 'text/plain' });
					res.write(JSON.stringify(playerinfo));
					res.end();
                                        console.log(JSON.stringify(playerinfo));
                                        
            }
            else {
                console.log("Cannot get username: " + jsonObj.errorMsg);
            }

        });
    });

    wcfreq.on('error', function(e) {
        console.log(e.message);
    });
    wcfreq.end();


};

module.exports = function (app) {
    // home route
    var home = require('./controllers/index');
    app.get('/mcm/',home.index);
    
    // user routes
    var users = require('./controllers/users');
    app.get('/mcm/user/authenticated', users.authenticated);
    app.post('/mcm/login', users.login);
    app.get('/mcm/logout', users.logout);
    
    // player search
    var playersearch = require('./controllers/playersearch');
    
    app.post('/mcm/playersearch',playersearch.playersearch);

    // playerview routes
    var playerview = require('./controllers/playerview');
    app.get('/mcm/playerview', playerview.playerview);
    
    //fmsk history routes
    var fmskhistory = require('./controllers/fmskhistory');
    app.get('/mcm/fmskhistory',fmskhistory.fmskhistory);
    
    //marker history routes
    var markerhistory = require('./controllers/markerhistory');
    app.get('/mcm/markerhistory',markerhistory.markerhistory);
    
    //credit history routes
    var credithistory = require('./controllers/credithistory');
    app.get('/mcm/credithistory',credithistory.credithistory);

    var currencyconfig = require('./controllers/currencyconfig');
    app.get('/mcm/currencyconfig',currencyconfig.currencyconfig);
    
    var configitem = require('./controllers/configitem');
    app.get('/mcm/configitem',configitem.configitem);
    
    var fundinfo = require('./controllers/fundinfo');
    app.get('/mcm/fundinfo',fundinfo.fundinfo);
    
    var issuemarker = require('./controllers/issuemarker');
    app.post('/mcm/issuemarker', issuemarker.issuemarker);
    
    var creditLineMan = require('./controllers/creditlinemanagement');
    app.post('/mcm/cladjustrequest',creditLineMan.sendModifyRequest);
    app.get('/mcm/clttodetail/:ctainternalid',creditLineMan.getCLTTODetail);

};
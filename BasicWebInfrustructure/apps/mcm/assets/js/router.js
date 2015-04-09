// MCM App Router

// Includes file dependencies
define(['views/LoginView','views/IndexView','views/PlayerView','models/PlayerInfoModel','views/FMSKHistoryView','models/FMSKHistoryCollection' ,'views/MarkerHistoryView','models/MarkerHistoryCollection','views/CreditHistoryView','models/CreditHistoryCollection'], 
   function(LoginView,IndexView,PlayerView,PlayerInfoModel,FMSKHistoryView,FMSKHistoryCollection, MarkerHistoryView, MarkerHistoryCollection, CreditHistoryView, CreditHistoryCollection) {

    // Extends Backbone.Router
    var MCMAppRouter = Backbone.Router.extend({

        initialize: function() {
            this.routesHit = 0;
            //keep count of number of routes handled by your application
            Backbone.history.on('route', function() { this.routesHit++; }, this);
        },

        back: function() {
          if(this.routesHit > 1) {
            //more than one route hit -> user did not land to current page directly
            window.history.back();
          } else {
            //otherwise go to the home page. Use replaceState if available so
            //the navigation doesn't create an extra history entry
            this.navigate('mcm/', {trigger:true, replace:true});
          }
        },
 
        routes: {
            "login":                        "login",
            "main":                         "main",
            "playermain/:playerID":         "playerMain",
            "playercreditadjust":           "playerCreditAdjust",
            "playercredithistory":          "playerCreditHistory",
            "playerenqueryinfo":            "playerEnqueryInfo",
            "playercomments":               "playerComments",
            "junketcredit":                 "junketCredit",
            "junketcompany/:companyID":     "junketCompany",
            "me":                           "me",
            "index":                        "index",
            "playersearch":                 "playerSearch",
            "playersearchresult/:playerID/:firstName/:lastName/:phone":           "playerSearchResult",
            "playerview/:playerID/:userID/:flag": "playerView",
            "fmskhistory/:playerID/:ctaInternalID/:playerName/:userName/:flag": "fmskHistory",
            "markerhistory/:playerID/:ctaInternalID/:playerName/:userName/:flag/:availablelimit": "markerHistory",
            "credithistory/:playerID/:ctaInternalID/:playerName/:userName/:flag": "creditHistory",
            "issuemarker/:playerID/:ctaInternalID/:playerName/:userName/:availablelimit":                  "issuemarker",
            "creditlineman/:playerID/:ctaInternalID/:playerName/:userName": "creditlinemangement",
            "ttoadjusthistory": "ttoAdjustHistory",
            "requestforapproval":"requestForApproval"
        },

        changePage:function (view) {
            view.$el.attr('data-role', 'page');   
            $('body').append(view.$el); 
            $.mobile.changePage($(view.el), {changeHash:false,transition:'slide'});         
        },

        login: function() {
//            this.playerCreditHistory();
//            return;
            var loginview = new LoginView();
            loginview.$el.attr('id','backbonediv');
            loginview.$el.attr('data-role', 'page');
            $('body').append(loginview.$el);
            $.mobile.changePage($(loginview.el), {changeHash:false,transition:'slide'});	
        },
        
        main:function(){
            var self = this;
            require(['views/MainView'],function(MainView){
                var psView = new MainView();
                psView.playerIDName = 0;
                psView.render();
                self.changePage(psView);
            }); 
        },
        
        playerMain:function(playerID){
             var self = this;
            require(['views/MainView'],function(MainView){
                var psView = new MainView();
                psView.playerIDName = 1;
                psView.render();                
                self.changePage(psView);
                psView.resetContent(1);
            });            
        },
        
        playerCreditAdjust:function(){
            var self = this;
            require(['views/PlayerCreditAdjustView'],function(PlayerCreditAdjustView){
                var psView = new PlayerCreditAdjustView();
                self.changePage(psView);
            });            
        },
        
        playerCreditHistory:function(){
            var self = this;
            require(['views/PlayerCreditHistoryView'],function(PlayerCreditHistoryView){
                var psView = new PlayerCreditHistoryView();
                self.changePage(psView);
            });             
        },
        
        playerEnqueryInfo:function(){
            var self = this;
            require(['views/PlayerEnqueryInfoView'],function(PlayerEnqueryInfoView){
                var psView = new PlayerEnqueryInfoView();
                self.changePage(psView);
            });             
        },
        
        playerComments:function(){
            var self = this;
            require(['views/PlayerCommentsView'],function(PlayerCommentsView){
                var psView = new PlayerCommentsView();
                self.changePage(psView);
            });              
        },
        
        junketCredit:function(){
            var self = this;
            require(['views/JunketCreditView'],function(JunketCreditView){
                var psView = new JunketCreditView();
                self.changePage(psView);
            });             
        },
        
        junketCompany:function(companyID){
            var self = this;
            require(['views/JunketCompanyView'],function(JunketCompanyView){
                var psView = new JunketCompanyView();
                self.changePage(psView);
            });            
        },
        
        me:function(){
            var self = this;
            require(['views/MeView'],function(MeView){
                var psView = new MeView();
                self.changePage(psView);
            });             
        },
        
        ttoAdjustHistory:function(){
            var self = this;
            require(['views/TTOAdjustHistory'],function(TTOAdjustHistory){
                var psView = new TTOAdjustHistory();
                self.changePage(psView);
            });            
        },
        
        requestForApproval:function(){
            var self = this;
            require(['views/RequestForApproval'],function(RequestForApproval){
                var psView = new RequestForApproval();
                self.changePage(psView);
            });              
        },
		
        playerSearch: function() {
            var self = this;
            
            require(['views/PlayerSearchView'],function(PlayerSearchView){
                var psView = new PlayerSearchView();
                self.changePage(psView);
            });
        },
                
        playerSearchResult: function(playerID,firstName,lastName,phone) {
            var self = this;
            
            require(['views/PlayerSearchResultView','models/PlayerSearchResultCollection'],
            function(PlayerSearchResultView,PlayerSearchResultCollection){
                var psResultCollection = new PlayerSearchResultCollection();
                psResultCollection.url = 'playersearch';

                var psResultView = new PlayerSearchResultView({
                    collection:psResultCollection
                });
                
                var fetchBody = {};
                fetchBody.playerID = (playerID == "NULL"?"":playerID);
                fetchBody.firstName = (firstName == "NULL"?"":firstName);
                fetchBody.lastName = (lastName == "NULL"?"":lastName);
                fetchBody.phone = (phone == "NULL"?"":phone);
                
                psResultCollection.fetch({
                    data:JSON.stringify(fetchBody),
                    type:"POST",
                    contentType:"application/json",
                    success:function(collection){
                        var singleCountFlag = '0'
                        if(collection.models.length == 1 ){
                            singleCountFlag = '1';
                            window.location.hash ='playerview/' + collection.models[0].get("playerID") + '/' + psResultView.getCookie('userID') + '/'+singleCountFlag;
                        }else{
                            self.changePage(psResultView);
                        }
                    }
                });
            });
        },                
        
        index: function(){
            alert("index");
        },
        
        playerView: function(playerID,userID,flag){
            var CPlayerInfoModel = new PlayerInfoModel();
            CPlayerInfoModel.url = '/mcm/playerview?playerID='+String(playerID)+'&userID='+String(userID);
            var CPlayerView = new PlayerView({
                model:CPlayerInfoModel,flag:flag
            });
            var self = this;
            CPlayerView.model.fetch().done(function(){
                //CPlayerView.render();
                self.changePage(CPlayerView);
            });
        },
        
        fmskHistory: function(playerID, ctaInternalID, playerName, userName, flag){
            var CFMSKHistoryCollection = new FMSKHistoryCollection();
            CFMSKHistoryCollection.url = '/mcm/fmskhistory?ctaInternalID='+String(ctaInternalID)+'&flag='+String(flag);
            var CFMSKHistoryView = new FMSKHistoryView({
                collection : CFMSKHistoryCollection
            });
            CFMSKHistoryView.playerID = playerID;
            CFMSKHistoryView.playerName = playerName;
            CFMSKHistoryView.userName = userName;
            CFMSKHistoryView.flag = flag;
            
            var self = this;
            CFMSKHistoryView.collection.fetch().done(function(){
                self.changePage(CFMSKHistoryView);
            });
        },
        
        markerHistory: function(playerID, ctaInternalID, playerName, userName, flag, availablelimit){
            var CMarkerHistoryCollection = new MarkerHistoryCollection();
            CMarkerHistoryCollection.url = '/mcm/markerhistory?ctaInternalID='+String(ctaInternalID)+'&flag='+String(flag);
            var CMarkerHistoryView = new MarkerHistoryView({
                collection : CMarkerHistoryCollection
            });
            CMarkerHistoryView.playerID = playerID;
            CMarkerHistoryView.ctaInternalID = ctaInternalID;
            CMarkerHistoryView.playerName = playerName;
            CMarkerHistoryView.userName = userName;
            CMarkerHistoryView.flag = flag;
            CMarkerHistoryView.availablelimit = availablelimit;
            
            var self = this;
            CMarkerHistoryView.collection.fetch().done(function(){
                self.changePage(CMarkerHistoryView);
            });
        },
                
        creditHistory: function(playerID, ctaInternalID, playerName, userName, flag){
            var CCreditHistoryCollection = new CreditHistoryCollection();
            CCreditHistoryCollection.url = '/mcm/credithistory?ctaInternalID='+String(ctaInternalID)+'&flag='+String(flag);
            var CCreditHistoryView = new CreditHistoryView({
                collection : CCreditHistoryCollection
            });
            CCreditHistoryView.playerID = playerID;
            CCreditHistoryView.playerName = playerName;
            CCreditHistoryView.userName = userName;
            CCreditHistoryView.flag = flag;
            
            var self = this;
            CCreditHistoryView.collection.fetch().done(function(){
                self.changePage(CCreditHistoryView);
            });
        },
        
        issuemarker: function(playerID, ctaInternalID, playerName, userName, availablelimit) {
            var self = this;
            require(['views/IssueMarkerView','models/CurrencyCollection','models/FundInfoCollection'],function(IssueMarkerView,CurrencyCollection,FundInfoCollection){
                var CCurrencyCollection = new CurrencyCollection();
                CCurrencyCollection.url = '/mcm/currencyconfig';
                
                var CFundInfoCollection = new FundInfoCollection();
                CFundInfoCollection.url = '/mcm/fundinfo?ctaInternalID='+String(ctaInternalID);
                
                var ConfigitemModel = Backbone.Model.extend({});
                var CAllowSCModel = new ConfigitemModel();
                var CAllowSC =0;
                CAllowSCModel.url = '/mcm/configitem?ItemID=1202';
                
                CCurrencyCollection.fetch().done(function(){
                    CFundInfoCollection.fetch().done(function(){
                        CAllowSCModel.fetch().done(function(){
                            var CCurrencyCollectionPaidto = new CurrencyCollection(CCurrencyCollection.toJSON());
                            CAllowSC = parseInt(CAllowSCModel.get('configvalue'));
                            var CIssueMarkerView = new IssueMarkerView({playerID:playerID,ctaInternalID:ctaInternalID,playerName:playerName,userName:userName,AllowSC:CAllowSC,currencyconfig:CCurrencyCollection,currencyconfigpaidto:CCurrencyCollectionPaidto,fundinfo:CFundInfoCollection,availableLimit:availablelimit});
                            CIssueMarkerView.render();
                            self.changePage(CIssueMarkerView);
                        });
                    });
                });
            });
        },
        
        creditlinemangement: function(playerID, ctaInternalID, playerName, userName){
            var self = this;
            require(['views/creditlinemanagementview','models/creditlinemanagementmodel'],function(CreditLineManView,CreditLineManModel){
                var creditLineManModel = new CreditLineManModel();
                creditLineManModel.url = '/mcm/clttodetail/' + String(ctaInternalID);
                
                var creditLineManView = new CreditLineManView({
                    model : creditLineManModel
                });
                
                creditLineManView.model.fetch().done(function(){
                        self.changePage(creditLineManView);
                });
            });
        }
    });
    // Returns the Router class
    return new MCMAppRouter;
} );

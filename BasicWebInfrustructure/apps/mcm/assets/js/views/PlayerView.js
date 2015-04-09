define(['MCMView', 'text!templates/playerview.html', 'models/PlayerInfoModel', 'iscroll', 'MCMi18n','accounting'],
  function(MCMView, playerTemplate, PlayerInfoModel, isroll, MCMi18n,accounting) {
      var playerView = MCMView.extend({
          requireLogin: false,

          initialize: function(options) {
            this.model.bind("change", this.jqmcreate, this);
            this.flag = options.flag;
          },

          events: {
            "click #refresh-icon":"Refresh",
            "click #logout-icon": "logout",
            "click #creditline": "GetCreditLineHistory",
            "click #ttolimit": "GetTTOHistory",
            "click #fm": "GetFMHistory",
            "click #sk": "GetSKHistory",
            "click #pitmarker": "GetPMHistory",
            "click #cagemarker": "GetCMHistory",
            "click #creditline": "GetCreditLineHistory",
            "click #ttolimit": "GetTTOHistory",
            "click #findplayer": "FindPlayer",
            "click #history": "History",
            "click #creditlineman": "CreditLineMangement",
            "click #about": "About",
    
          },
          FindPlayer: function(){
            window.location.hash = "playersearch";
          },
                  
          CreditLineMangement: function(){
            window.location.hash = "creditlineman/"+ this.model.get("playerID")+"/"+this.model.get("ctaInternalID")+"/"+this.model.get("playerName")+"/"+this.model.get("username");
          },
                  
          History: function(){
            
          },
          
          About:function(){
            
          },
          
          GetCreditLineHistory: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = "credithistory/"+this.model.get("playerID")+"/"+this.model.get("ctaInternalID")+"/"+this.model.get("playerName")+"/"+this.model.get("username")+"/0";
          },

          GetTTOHistory: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = "credithistory/"+this.model.get("playerID")+"/"+this.model.get("ctaInternalID")+"/"+this.model.get("playerName")+"/"+this.model.get("username")+"/1";
          },                 
          
          GetFMHistory: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = "fmskhistory/"+this.model.get("playerID")+"/"+this.model.get("ctaInternalID")+"/"+this.model.get("playerName")+"/"+this.model.get("username")+"/0";
          },          
          
          GetSKHistory: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = "fmskhistory/"+this.model.get("playerID")+"/"+this.model.get("ctaInternalID")+"/"+this.model.get("playerName")+"/"+this.model.get("username")+"/1";
          },          
          
          GetPMHistory: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = "markerhistory/"+this.model.get("playerID")+"/"+this.model.get("ctaInternalID")+"/"+this.model.get("playerName")+"/"+this.model.get("username")+"/0"+"/"+this.model.get("AvailableLimit");
      
          },          
          
          GetCMHistory: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = "markerhistory/"+this.model.get("playerID")+"/"+this.model.get("ctaInternalID")+"/"+this.model.get("playerName")+"/"+this.model.get("username")+"/1"+"/"+this.model.get("AvailableLimit");
          },         

          Refresh: function(){
            $.mobile.showPageLoadingMsg();
            this.model.fetch().done(function(){
                $.mobile.hidePageLoadingMsg();
            });
          },
          
          jqmcreate: function(){
            this.render();
            $('#divplayerview').trigger("create");
          },
          
          logout: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = 'login';
          },
          
          removeel: function(){
            this.remove();
          },

          render: function() {
             this.template = _.template(playerTemplate, { "username": this.model.get("username"),
                "playerImage": this.model.get("playerImage"),
                "firstName": this.model.get("firstName"), 
                "lastName": this.model.get("lastName"),
                "playerID": this.model.get("playerID"),
                "ctaInternalID": this.model.get("ctaInternalID"),
                "playerStatus": this.model.get("playerStatus"),
                "creditStatus": this.model.get("creditStatus"),
                "lastActionAmount": this.model.get("lastActionAmount"),
                "lastActionDate": this.model.get("lastActionDate"),
                "highActionAmount": this.model.get("highActionAmount"),
                "highActionDate": this.model.get("highActionDate"),
                "AvailableLimit": accounting.formatMoney(this.model.get("AvailableLimit"),{symbol:'HKD',format:"%v %s"}),
                "playerName": this.model.get("playerName"),
                "CreditLine": accounting.formatMoney(this.model.get("CreditLine"),{symbol:'HKD',format:"%v %s"}),
                "TTOLimit": accounting.formatMoney(this.model.get("TTOLimit"),{symbol:'HKD',format:"%v %s"}),
                "TotalLimit": accounting.formatMoney(this.model.get("TotalLimit"),{symbol:'HKD',format:"%v %s"}),
                "FrontMoney": accounting.formatMoney(this.model.get("FrontMoney"),{symbol:'HKD',format:"%v %s"}),
                "SafeKeeping": accounting.formatMoney(this.model.get("SafeKeeping"),{symbol:'HKD',format:"%v %s"}),
                "PitMarkers": accounting.formatMoney(this.model.get("PitMarkers"),{symbol:'HKD',format:"%v %s"}),
                "CageMarkers": accounting.formatMoney(this.model.get("CageMarkers"),{symbol:'HKD',format:"%v %s"}),
                "Checks": accounting.formatMoney(this.model.get("Checks"),{symbol:'HKD',format:"%v %s"}),
                "ReturnedItems": accounting.formatMoney(this.model.get("ReturnedItems"),{symbol:'HKD',format:"%v %s"}),
                "WriteOffs": accounting.formatMoney(this.model.get("WriteOffs"),{symbol:'HKD',format:"%v %s"}),
                "Outstanding": accounting.formatMoney(this.model.get("Outstanding"),{symbol:'HKD',format:"%v %s"}),
                "refresh": $.i18n.prop('ui_refresh'),
                "ui_findplayer": $.i18n.prop('ui_findplayer'),
                "ui_browinghistory": $.i18n.prop('ui_browinghistory'),
                "ui_about": $.i18n.prop('ui_about'),
                "ui_creditlineman" : $.i18n.prop('ui_creditlineman')
                });
              this.$el.html(this.template);
              this.$el.attr('id', 'divplayerview');
              
              return this;
          }
          
          
      });

      return playerView;
  });
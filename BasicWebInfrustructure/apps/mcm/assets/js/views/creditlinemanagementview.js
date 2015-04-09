define(['MCMView', 'text!templates/creditlinemanagement.html', 'iscroll', 'MCMi18n','accounting'],
  function(MCMView, creditLineManagementTemplate, isroll, MCMi18n,accounting) {
      var creditLineManagementView = MCMView.extend({
          requireLogin: false,

          initialize: function() {
               
               this.render();
          },

          events: {
            "click #refresh-icon":"Refresh",
            "click #logout-icon": "logout",
            "click #findplayer": "FindPlayer",
            "click #history": "History",
            "click #about": "About",
            "change input[type=radio]": "onRadioButtonClicked",
            "click #cl-tto_submit":"submit",
            "click #cl-tto-cancel":"cancel"
          },
          FindPlayer: function(){
            window.location.hash = "playersearch";
          },
                  
          History: function(){
            
          },
          
          About:function(){
            
          },
         

          Refresh: function(){
            $.mobile.showPageLoadingMsg();
            this.model.fetch().done(function(){
                $.mobile.hidePageLoadingMsg();
            });
          },
          
          logout: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = 'login';
          },

          submit:function(){
            $.mobile.showPageLoadingMsg();
            //$('#submitconfirm').popup('open');
            window.location.hash = "playerview/10752158/1/0";
          },
                  
          submitConfirm:function(){
            window.location.hash = "playerview/10752158/1/0";
          },
                  
          cancel:function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = "playerview/10752158/1/0";
          },
                  
          getISODate:function(date){
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return year + '-' + month + '-' + day;
          },
         
          render: function() {
             var today = new Date();
             var currentDate = this.getISODate(today);
             
              //this.$el.find('#tto-expires-date').val(currentDate);
             this.template = _.template(creditLineManagementTemplate, { "username": this.model.get("username"),
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
                "ui_creditlineman" : $.i18n.prop('ui_creditlineman'),
                "currentDate" : currentDate
                });
              this.$el.html(this.template);
              this.$el.attr('id', 'credit-line-man');
              return this;
          },
                  
          onRadioButtonClicked: function(e){
            var self = this;
            if(e.currentTarget.id === "tto-expires-choice-1"){ // by date
                $("#tto-expires-date").css('display','block');
                $("#tto-expires-trip").css('display','none');    
            }else if (e.currentTarget.id === "tto-expires-choice-2"){ // end of trip
                $("#tto-expires-date").css('display','none');
                $("#tto-expires-trip").css('display','block');          
            }
          }
          
          
      });

      return creditLineManagementView;
  });
define(['MCMView', 'text!templates/credithistory.html', 'models/CreditHistoryModel', 'iscroll', 'MCMi18n'],
  function(MCMView, creditHistoryTemplate, CreditHistoryModel, isroll, MCMi18n) {
      var creditHistoryView = MCMView.extend({
          requireLogin: false,
          
          initialize: function() {
            //this.model.bind("change", this.jqmcreate, this);
            this.collection.on( "added", this.render, this );
            this.collection.bind("reset", this.render, this);
          },

          events: {
            "click #back":"Back",
            "click #logout-icon": "logout",
            "click #refresh-icon":"Refresh",
            "click #findplayer": "FindPlayer",
            "click #history": "History",
            "click #about": "About"
          },
                  
          FindPlayer: function(){
            window.location.hash = "playersearch";
          },
                  
          History: function(){
            
          },
          
          About:function(){
            
          },
          
          Back: function(){
            $.mobile.showPageLoadingMsg();
            this.$el.attr('id', 'divcreditold');
            window.history.back();
          },
          
          logout: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = 'login';
          },
          
          Refresh: function(){
            $.mobile.showPageLoadingMsg();
            this.collection.fetch().done(function(){
                $.mobile.hidePageLoadingMsg();
            });
          },        

          render: function() {
             this.template = _.template(creditHistoryTemplate, { 
                "username": this.userName,
                "cot": (this.flag==0?"Credit Limit ":"TTO Limit "),
                "player":(this.playerName+"("+this.playerID+")"),
                "collection": this.collection,
                "ui_back": $.i18n.prop("ui_back"),
                "ui_history": $.i18n.prop("ui_history"),
                "ui_refresh": $.i18n.prop('ui_refresh'),
                "ui_findplayer": $.i18n.prop('ui_findplayer'),
                "ui_browinghistory": $.i18n.prop('ui_browinghistory'),
                "ui_about": $.i18n.prop('ui_about')
                });
              this.$el.html(this.template);
              this.$el.attr('id', 'divcredit');
              $('#divcredit').trigger("create");
              return this;
          }
          
      });

      return creditHistoryView;
  });
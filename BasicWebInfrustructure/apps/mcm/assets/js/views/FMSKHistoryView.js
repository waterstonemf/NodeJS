define(['MCMView', 'text!templates/fmskhistory.html', 'models/FMSKHistoryModel', 'iscroll', 'MCMi18n'],
  function(MCMView, fmskHistoryTemplate, FMSKHistoryModel, isroll, MCMi18n) {
      var fmskHistoryView = MCMView.extend({
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
            this.$el.attr('id', 'divmarkerhistoryold');
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
             this.template = _.template(fmskHistoryTemplate, { 
                "username": this.userName,
                "fmsk": (this.flag==0?"Front Money ":"Safe Keeping "),
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
              this.$el.attr('id', 'divfmsk');
              $('#divfmsk').trigger("create");
              return this;
          }
          
      });

      return fmskHistoryView;
  });
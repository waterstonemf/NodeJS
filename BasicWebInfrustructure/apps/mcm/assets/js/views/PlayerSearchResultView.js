define(['MCMView', 'text!templates/playersearchresult.html', 'iscroll', 'MCMi18n'],
  function(MCMView, psresultTemplate, isroll, MCMi18n) {
      var psResultView = MCMView.extend({
        requireLogin: false,

        initialize: function() {
          //this.model.bind("change", this.jqmcreate, this);
          this.collection.on( "added", this.render, this );
          this.collection.bind("reset", this.render, this);
        },

        events: {
          "click #back":"back",
          "click #logout-icon": "logout",
          "click #refresh-icon":"refresh",
          "click #findplayer": "findPlayer",
          "click #history": "history",
          "click #about": "about"
        },

        back: function(){
          $.mobile.showPageLoadingMsg();
          window.history.back();
        },

        logout: function(){
          $.mobile.showPageLoadingMsg();
          window.location.hash = 'login';
        },

        refresh: function(){
          $.mobile.showPageLoadingMsg();
          this.collection.fetch().done(function(){
              $.mobile.hidePageLoadingMsg();
          });
        },
                  
        findPlayer: function(){
          window.location.hash = "playersearch";
        },

        history: function(){

        },

        about:function(){

        },

        getCookie:function(cookieName){
            if (document.cookie.length > 0) {
                    begin = document.cookie.indexOf(cookieName + "=");
                    if (begin != -1) {
                        begin += cookieName.length + 1; 
                        end = document.cookie.indexOf(";", begin); 
                        if (end == -1) end = document.cookie.length;
                        return unescape(document.cookie.substring(begin, end));
                    }
            }
            return null;    
        },        

        render: function() {
         this.template = _.template(psresultTemplate, { 
            "resultCollection": this.collection,
            "username": this.getCookie("userName"),
            "ui_findresult":$.i18n.prop('ui_findresult'),
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

        return psResultView;
  });
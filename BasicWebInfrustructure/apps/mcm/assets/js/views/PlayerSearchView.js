define(['MCMView', 'text!templates/playersearch.html','iscroll','screen','repoint','MCMi18n'], 
  function(MCMView, playersearchTemplate,isroll,screen,repoint,MCMi18n) {
  var PlayerSearchView = MCMView.extend({
    requireLogin: false,
    
    initialize: function() {
        this.render();
    },

    events: {
      "click #logout-icon": "logout",
      "submit form": "search",
      "click #findplayer": "findPlayer",
      "click #history": "history",
      "click #about": "about"
    },

    logout: function() {
        $.mobile.showPageLoadingMsg();
        window.location.hash = 'login';
    },
	
    search: function() {
        $.mobile.showPageLoadingMsg();
        
        var playerID = $('#playerid').val() ;
        var firstName = $('#firstname').val();
        var lastName = $('#lastname').val();
        var phone = $('#phone').val();
        
        playerID = (playerID == ""?"NULL":playerID);
        firstName =  (firstName == ""?"NULL":firstName);
        lastName =  (lastName == ""?"NULL":lastName);
        phone =  (phone == ""?"NULL":phone);

        window.location.hash = 'playersearchresult/' + playerID + '/' + firstName + "/" + lastName + "/" + phone;
        return false;
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
             this.template = _.template(playersearchTemplate,
                    {"ui_findplayer": $.i18n.prop('ui_findplayer'),
                        "ui_browinghistory": $.i18n.prop('ui_browinghistory'),
                        "ui_about": $.i18n.prop('ui_about'),
                        "username": this.getCookie("userName"),
                        "userid": this.getCookie("userID")
                    }); 
            this.$el.append(this.template);
            return this;
    }
    
  });

  return PlayerSearchView;
});
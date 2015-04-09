define(['MCMView', 'text!templates/login.html','aes','iscroll','screen','repoint'], 
  function(MCMView, loginTemplate,aes,isroll,screen,repoint) {
  var loginView = MCMView.extend({
    requireLogin: false,

    events: {
      "submit form": "login",
      "click #btn_retry":"retry"
    },

    login: function() {
      $.post('/mcm/login', {
        username: $('input[name=username]').val(),
        password: $('input[name=password]').val()
      }, 
      function(data) {
        window.location.hash = 'index';
      }).error(function(){
        $.mobile.changePage("#popup",{transition:"pop"});
      });
      return false;
    },
    
    retry:function(){
      $("#popup").dialog('close');
      $.mobile.changePage("#mainpage");
    },

    render: function() {
      this.$el.append(loginTemplate);
      $("#error").hide();
      $("input[name=username]").focus();
    }
  });

  return loginView;
});
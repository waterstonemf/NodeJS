define(['MCMView', 'text!templates/login.html', 'aes', 'iscroll', 'screen', 'repoint', 'MCMi18n'],
  function(MCMView, loginTemplate, aes, isroll, screen, repoint, MCMi18n) {
      var loginView = MCMView.extend({
          requireLogin: false,

          initialize: function() {
              this.render();
          },

          events: {
              "submit form": "login",
              "click #btn_retry": "retry"
          },

          login: function(form) {
              $.post('/mcm/login', {
                  username: $('input[name=username]').val(),
                  password: $('input[name=password]').val()
              },
      function(loginInfo) {
          
          if (loginInfo.status == 1){
              document.cookie = "userID=" + loginInfo.content.userID;
              document.cookie = "userName=" + loginInfo.content.loginName;
              
              if(loginInfo.content.roleID == 2){
                  window.alert('Welcome, Administrator');
              }else{
                $.mobile.showPageLoadingMsg();
                window.location.hash = 'main';  
              }         
          }else if(loginInfo.status == 0){
              $('#diaHeader').html($.i18n.prop('msg_error'));
              $('#errHeader').html($.i18n.prop('msg_nomatchuser'));
              $('#errMessage').html($.i18n.prop('msg_invaildusername'));
              alert($.i18n.prop('msg_nomatchuser'));              
          }else if(loginInfo.status == -1){
              $('#diaHeader').html($.i18n.prop('msg_error'));
              $('#errHeader').html($.i18n.prop('msg_incorrectpsd'));
              $('#errMessage').html($.i18n.prop('msg_invaildpassword'));
              alert($.i18n.prop('msg_incorrectpsd'));              
          }else if(loginInfo.status == -2){
              $('#diaHeader').html($.i18n.prop('msg_error'));
              $('#errHeader').html($.i18n.prop('msg_emptyusername'));
              $('#errMessage').html($.i18n.prop('msg_emptyusername'));
              alert($.i18n.prop('msg_emptyusername'));              
          }else if (loginInfo.status == -3){
              $('#diaHeader').html($.i18n.prop('msg_error'));
              $('#errHeader').html($.i18n.prop('msg_emptypassword'));
              $('#errMessage').html($.i18n.prop('msg_invaildpassword'));
              alert($.i18n.prop('msg_emptypassword'));              
          }
          else{
              $('#diaHeader').html($.i18n.prop('msg_error'));
              $('#errHeader').html($.i18n.prop('msg_unexpectederror'));
              $('#errMessage').html($.i18n.prop('msg_unexpectederror'));
              alert($.i18n.prop('msg_unexpectederror'));                  
          }          
      }).error(function() {
          $('#diaHeader').html($.i18n.prop('msg_error'));
          $('#errHeader').html($.i18n.prop('msg_unexpectederror'));
          $('#errMessage').html($.i18n.prop('msg_unexpectederror'));
          alert($.i18n.prop('msg_unexpectederror'));
      });
              return false;
          },

          retry: function() {
              $("#popup").dialog('close');
              $.mobile.changePage("#mainpage");
          },

          render: function() {
              this.template = _.template(loginTemplate, { "msglogin": $.i18n.prop('msg_login'), "msguser": $.i18n.prop('msg_user'), "msgpassword": $.i18n.prop('msg_password'), "tryagain": $.i18n.prop('msg_tryagain') });
              this.$el.append(this.template);

              $("#error").hide();
              $("input[name=username]").focus();
          }
      });

      return loginView;
  });
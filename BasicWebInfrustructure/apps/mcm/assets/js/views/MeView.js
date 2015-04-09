define(['MCMView', 'text!templates/me.html'],
        function(MCMView, meTemplate) {
            var meView = MCMView.extend({
                requireLogin: false,
                initialize: function() {
                    this.render();
                },
                
                events: {
                    "click #junket-credit": "viewJunketCredit",
                    "click #player-credit": "viewPlayerCredit",
                    "click #me": "viewMe",
                    "click #back": "back",
                    "click #my-tto-history":"viewTTOHistory",
                    "click #my-received-approval-requests":"viewApprovalRequests"
                },
                
                render: function() {
                    this.template = _.template(meTemplate, {"ui_junketcredit": $.i18n.prop('ui_junketcredit'), "ui_playercredit": $.i18n.prop('ui_playercredit'), "ui_me": $.i18n.prop('ui_me')});
                    this.$el.append(this.template);
                }, 
                
                viewJunketCredit:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'junketcredit';          
                },
                
                viewPlayerCredit:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'main';          
                },
                
                //already in me page
                viewMe:function(){
//                    $.mobile.showPageLoadingMsg();
//                    window.location.hash = 'me';          
                },
                
                back:function(){
                    $.mobile.showPageLoadingMsg();
                    alert("back");
                    //window.location.hash = 'main';                     
                },
                
                viewTTOHistory:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'ttoadjusthistory'; 
                },
                
                viewApprovalRequests:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'requestforapproval'; 
                }                
            });

            return meView;
        });
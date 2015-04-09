define(['MCMView', 'text!templates/requestforapproval.html'],
        function(MCMView, requestForApproval) {
            var requestForApprovalView = MCMView.extend({
                requireLogin: false,
                initialize: function() {
                    this.render();
                },
                
                events: {
                    "click #junket-credit": "viewJunketCredit",
                    "click #player-credit": "viewPlayerCredit",
                    "click #me": "viewMe",
                    "click #back": "back"
                },
                
                render: function() {
                    this.template = _.template(requestForApproval, {"ui_junketcredit": $.i18n.prop('ui_junketcredit'), "ui_playercredit": $.i18n.prop('ui_playercredit'), "ui_me": $.i18n.prop('ui_me')});
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
                
                viewMe:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'me';          
                },
                
                back:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'me';                     
                }
            });

            return requestForApprovalView;
        });
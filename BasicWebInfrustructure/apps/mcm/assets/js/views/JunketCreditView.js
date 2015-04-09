define(['MCMView', 'text!templates/junketcredit.html'],
        function(MCMView, junketCreditTemplate) {
            var junketCreditView = MCMView.extend({
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
                    this.template = _.template(junketCreditTemplate, {"ui_junketcredit": $.i18n.prop('ui_junketcredit'), "ui_playercredit": $.i18n.prop('ui_playercredit'), "ui_me": $.i18n.prop('ui_me')});
                    this.$el.append(this.template);
                }, 
                
                //already in junket credit view
                viewJunketCredit:function(){
//                    $.mobile.showPageLoadingMsg();
//                    window.location.hash = 'junketcredit';          
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
                    alert("back");
                    //window.location.hash = 'main';                     
                }
            });

            return junketCreditView;
        });
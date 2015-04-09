define(['MCMView', 'text!templates/main.html'],
        function(MCMView, mainTemplate) {
            var mainView = MCMView.extend({
                requireLogin: false,
                playerIDName: "",
                initialize: function() {
                    //this.render();
                },
                events: {
                    "click #adjust": "adjustCredit",
                    "click #history": "viewHistory",
                    "click #player-search": "playerSearch",
                    "change #player-search-input": "playerSearchByIdName",
                    "click #enquery": "viewEnquery",
                    "click #comments": "viewComments",
                    "click #junket-credit": "viewJunketCredit",
                    "click #player-credit": "viewPlayerCredit",
                    "click #me": "viewMe"                    
                },
                
                render: function() {
                    this.template = _.template(mainTemplate, {"ui_junketcredit": $.i18n.prop('ui_junketcredit'), "ui_playercredit": $.i18n.prop('ui_playercredit'), "ui_me": $.i18n.prop('ui_me')});
                    this.$el.append(this.template);
                    
                    //set the disabled attribute initially, will check whether allowed navigation later when click the links
//                     $("#adjust").attr("disabled","disabled");
//                     $("#history").attr("disabled","disabled");
//                     $("#enquery").attr("disabled","disabled");
//                     $("#comments").attr("disabled","disabled");
                     //$("#adjust").removeAttr('disabled');
                     
                     //this.resetContent(this.playerIDName);
                },
                
                adjustCredit: function(e) {                    
                    if ($("#adjust").attr('disabled') == 'disabled'){
                        e.preventDefault();
                        return;
                    }
                    
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'playercreditadjust'; 
                },
                
                viewHistory: function(e) {
                   if ($("#history").attr('disabled') == 'disabled'){
                        e.preventDefault();
                        return;
                    }
                    
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'playercredithistory'; 
                },
                
                playerSearch: function() {
                    $("#player-search-panel").css("display","block");
                    $("#player-search-input").focus();

                },
                
                playerSearchByIdName:function(){                   
                    this.playerIDName = $("#player-search-input").val();
                    this.resetContent(this.playerIDName);
                     $("#player-search-panel").css("display","none");
                },
                
                resetContent:function(pID){
                    var cssValue = {"border":"#696969 4px solid","color":"black"};
                    var imageSrc = "./assets/images/choose_player.png";
                    
                    //reset main page
                    if(pID >= 1)
                    {
                        cssValue = {"border":"orange 4px solid","color":"orange"};
                         imageSrc = "./assets/images/player_image_name.png";
                        
                        //enable the links now
                        $("#adjust").removeAttr('disabled');
                        $("#history").removeAttr('disabled');
                        $("#enquery").removeAttr('disabled');
                        $("#comments").removeAttr('disabled');
                    }else
                    {
                     $("#adjust").attr("disabled","disabled");
                     $("#history").attr("disabled","disabled");
                     $("#enquery").attr("disabled","disabled");
                     $("#comments").attr("disabled","disabled");                        
                    }
                    
                    $("#adjust").css(cssValue);
                    $("#history").css(cssValue);
                    $("#enquery").css(cssValue);
                    $("#comments").css(cssValue);

                    $("#player-search img").attr("src",imageSrc);
                },
                
                viewEnquery: function(e) {
                   if ($("#enquery").attr('disabled') == 'disabled'){
                        e.preventDefault();
                        return;
                    }    
                    
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'playerenqueryinfo'; 
                },
                
                viewComments:function(e){
                   if ($("#comments").attr('disabled') == 'disabled'){
                        e.preventDefault();
                        return;
                    }
                    
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'playercomments'; 
                },

                viewJunketCredit:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'junketcredit';          
                },
                
                //already in main page
                viewPlayerCredit:function(){
//                    $.mobile.showPageLoadingMsg();
//                    window.location.hash = 'main';          
                },
                
                viewMe:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'me';          
                } 
            });

            return mainView;
        });
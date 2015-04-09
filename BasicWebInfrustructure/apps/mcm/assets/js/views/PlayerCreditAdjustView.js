define(['MCMView', 'text!templates/playercreditadjust.html'],
        function(MCMView, playerCreditAdjustTemplate) {
            var creditAdjustView = MCMView.extend({
                requireLogin: false,
                initialize: function() {
                    this.render();
                },
                
                events: {
                    "click #junket-credit": "viewJunketCredit",
                    "click #player-credit": "viewPlayerCredit",
                    "click #me": "viewMe",
                    "click #back": "back",
                    "click #tto-save": "saveTTO",
                    "click #request-approval": "requestApproval",
                    "click #limit-detail": "viewLimitDetail"
                },
                
                render: function() {
                    this.template = _.template(playerCreditAdjustTemplate, {"ui_junketcredit": $.i18n.prop('ui_junketcredit'), "ui_playercredit": $.i18n.prop('ui_playercredit'), "ui_me": $.i18n.prop('ui_me')});
                    this.$el.append(this.template);
                }, 
                
                viewJunketCredit:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'junketcredit';          
                },
                
                viewPlayerCredit:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'playermain/1';          
                },
                
                viewMe:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'me';          
                },
                
                back:function(){
                    $.mobile.showPageLoadingMsg();
                    window.location.hash = 'playermain/1';                     
                },
                
                saveTTO:function()
                {
                    var s = $("#new-tto").val();
                    if(!s)
                    {
                        return;
                    }
                    s=parseFloat(s);
                    if (s <= 5000000)
                    {
                        this.displayNewTTO(0,s);
                    }else
                    {
                        $("#request-amount")[0].innerHTML = this.formatCurrencyValue(s);
                        $("#popup-request-approval").popup("open");
                    }
                },
                
                displayNewTTO:function(flag,val)
                {
                    var s = this.formatCurrencyValue(val);
                    
                    var originalValue = $("#player-available-limit").val();
                    
                    if(flag == 1)
                    {
                        s = originalValue + "(" + s + " Pending)";   
                    }else
                    {
                        $("#player-available-limit").val(s);
                    }
                                      
                     
                     $("#player-tto").val(s);
                     
                       $("#new-tto").val("");
                       $("#new-tto-comment").val("");                     
                },
                
                formatCurrencyValue:function(c){
                    var s= c.toString();  
                    s = s.replace(/^(\d*)$/, "$1.");  
                    //s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");  
                    s = s.replace(".", ",");  
                    var re = /(\d)(\d{3},)/;  
                    while (re.test(s))  
                        s = s.replace(re, "$1,$2");  
                    s = s.replace(/,(\d\d)$/, ".$1");  
                    s = s.replace(/^\./, "0.");

                    
                    s = "$" + s.substr(0,s.length - 1);
                    
                    return s;
                },
                
                requestApproval:function()
                {
                    $("#popup-request-approval").popup("close");
                    var s = $("#new-tto").val();
                       s=parseFloat(s);
                     this.displayNewTTO(1,s);
                },
                viewLimitDetail:function(){
                    var src = $("#limit-detail img").attr("src");
                    var display="none";
                    if(src =="./assets/images/plus.png")
                    {
                        src = "./assets/images/minus.png";
                        display= "block";
                    }else
                    {
                        src = "./assets/images/plus.png";
                        display= "none";
                    }
                    
                    $("#limit-detail img").attr("src",src);
                    $("#limit-detail-info").css("display",display);
                    
                    
                }
                
            });

            return creditAdjustView;
        });
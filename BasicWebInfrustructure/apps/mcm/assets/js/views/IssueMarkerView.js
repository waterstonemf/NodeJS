define(['MCMView', 'text!templates/issuemarker.html', 'iscroll', 'MCMi18n','accounting','simpledialog'],
  function(MCMView, issueMarkerTemplate, isroll, MCMi18n, accounting, simpledialog2) {
      var issueMarkerView = MCMView.extend({
          requireLogin: false,
          
          initialize: function(options) {
              
              this.playerID = options.playerID;
              this.ctaInternalID = options.ctaInternalID;
              this.userName = options.userName;
              this.playerName = options.playerName;
              this.currencyConfig = options.currencyconfig;
              this.currencyConfigPaidto = options.currencyconfigpaidto;
              this.allowSC = options.AllowSC;
              this.fundInfo = options.fundinfo;
              
              //initilize the available limit
              var primarycurrency = this.currencyConfigPaidto.where({Description:"Primary"});
              this.Symbol = primarycurrency[0].get("ISOCode");
              this.availablelimit = options.availableLimit;
              this.availablelimitformat = accounting.formatMoney(this.availablelimit,{symbol:this.Symbol,format:"%v %s"});
              
              //initilize the convert amount
              this.convertsymbol = this.Symbol;
              this.convertamount = this.availablelimit;
              this.convertamountformat = this.availablelimitformat;
              
              //initilize the curency id and rate 
              this.CurrencyID = primarycurrency[0].get("CurrencyID");
              this.CurrencyIDPaid = this.CurrencyID;
              this.Rate = primarycurrency[0].get("FE_Rate");
              this.RatePaid = this.Rate;

              if(this.allowSC==0)
              {
                  var m = this.currencyConfigPaidto.where({Description:"Secondary"});
                  this.currencyConfigPaidto.remove(m);
              }
              
          },

          events: {
            "click #back":"Back",
            "click #logout-icon": "logout",
            "change #currency": "changeCurrency",
            "change #currency_paid": "changeCurrencyPaid",
            "keyup #amount": "changeAmount",
            "click #btn-login": "OnOK",
            "keypress #amount": "validateAmount",
            "keypress #chips": "validateChips",
            "keypress #cash": "validateCash",
            "keypress #tokens": "validateTokens",
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
            this.$el.attr('id', 'divissuemarkerold');
            window.history.back();
          },
          
          logout: function(){
            $.mobile.showPageLoadingMsg();
            window.location.hash = 'login';
          },    
          
          validateAmount: function(event){
            // Backspace, tab, enter, end, home, left, right
            // We don't support the del key in Opera because del == . == 46.
            var controlKeys = [8, 9, 13, 35, 36, 37, 39];
            // IE doesn't support indexOf
            var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
            // Some browsers just don't raise events for control keys. Easy.
            // e.g. Safari backspace.
            var currencyvalue = $("#amount").val();
            var dotlocation=currencyvalue.indexOf(".");
            var currentlength = currencyvalue.length;
            if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
                (49 <= event.which && event.which <= 57) || // Always 1 through 9
                (48 == event.which && currentlength>0) || // No 0 first digit
                (isControlKey) || (46 == event.which && dotlocation == -1)) { // Opera assigns values for control keys.
              return;
            } else {
              event.preventDefault();
            }
          },
          
          validateChips: function(event){
            // Backspace, tab, enter, end, home, left, right
            // We don't support the del key in Opera because del == . == 46.
            var controlKeys = [8, 9, 13, 35, 36, 37, 39];
            // IE doesn't support indexOf
            var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
            // Some browsers just don't raise events for control keys. Easy.
            // e.g. Safari backspace.
            var currencyvalue = $("#chips").val();
            var dotlocation=currencyvalue.indexOf(".");
            var currentlength = currencyvalue.length;
            if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
                (49 <= event.which && event.which <= 57) || // Always 1 through 9
                (48 == event.which && currentlength>0) || // No 0 first digit
                (isControlKey) || (46 == event.which && dotlocation == -1)) { // Opera assigns values for control keys.
              return;
            } else {
              event.preventDefault();
            }
          },
          
          validateCash: function(event){
            // Backspace, tab, enter, end, home, left, right
            // We don't support the del key in Opera because del == . == 46.
            var controlKeys = [8, 9, 13, 35, 36, 37, 39];
            // IE doesn't support indexOf
            var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
            // Some browsers just don't raise events for control keys. Easy.
            // e.g. Safari backspace.
            var currencyvalue = $("#cash").val();
            var dotlocation=currencyvalue.indexOf(".");
            var currentlength = currencyvalue.length;
            if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
                (49 <= event.which && event.which <= 57) || // Always 1 through 9
                (48 == event.which && currentlength>0) || // No 0 first digit
                (isControlKey) || (46 == event.which && dotlocation == -1)) { // Opera assigns values for control keys.
              return;
            } else {
              event.preventDefault();
            }
          },
          
          validateTokens: function(event){
            // Backspace, tab, enter, end, home, left, right
            // We don't support the del key in Opera because del == . == 46.
            var controlKeys = [8, 9, 13, 35, 36, 37, 39];
            // IE doesn't support indexOf
            var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
            // Some browsers just don't raise events for control keys. Easy.
            // e.g. Safari backspace.
            var currencyvalue = $("#tokens").val();
            var dotlocation=currencyvalue.indexOf(".");
            var currentlength = currencyvalue.length;
            if (!event.which || // Control keys in most browsers. e.g. Firefox tab is 0
                (49 <= event.which && event.which <= 57) || // Always 1 through 9
                (48 == event.which && currentlength>0) || // No 0 first digit
                (isControlKey) || (46 == event.which && dotlocation == -1)) { // Opera assigns values for control keys.
              return;
            } else {
              event.preventDefault();
            }
          },        
          
          changeAmount: function(){
            if(this.CurrencyID != this.CurrencyIDPaid && $("#amount").val() != "")
            {
                var amount = parseFloat($("#amount").val());
                //very important calculation!!!
                this.convertamount = amount*this.Rate/this.RatePaid;
                this.convertsymbol = this.currencyConfigPaidto.where({CurrencyID:this.CurrencyIDPaid})[0].get("ISOCode");
                this.convertamountformat = accounting.formatMoney(this.convertamount,{symbol:this.convertsymbol,format:"%v %s"});
                $("#convertamount").val(this.convertamountformat);
                
                $("#lblconvertamount").show();
                $("#convertamount").show();
            }
          },
          
          changeCurrency: function(){
            //change available amount
            this.CurrencyID = parseInt($("#currency").val());
            var selected = this.currencyConfig.where({CurrencyID:this.CurrencyID});
            this.Rate = selected[0].get("FE_Rate");
            this.Symbol = selected[0].get("ISOCode");
            var limitchanged = parseFloat(this.availablelimit)/parseFloat(this.Rate);
            this.availablelimitformat = accounting.formatMoney(limitchanged,{symbol:this.Symbol,format:"%v %s"});
            $("#availablelimit").val(this.availablelimitformat);
            
            //decide to show or hide convert amount
            if(this.CurrencyID != this.CurrencyIDPaid && $("#amount").val() != "")
            {
                var amount = parseFloat($("#amount").val());
                //very important calculation!!!
                this.convertamount = amount*this.Rate/this.RatePaid;
                this.convertsymbol = this.currencyConfigPaidto.where({CurrencyID:this.CurrencyIDPaid})[0].get("ISOCode");
                this.convertamountformat = accounting.formatMoney(this.convertamount,{symbol:this.convertsymbol,format:"%v %s"});
                $("#convertamount").val(this.convertamountformat);
                
                $("#lblconvertamount").show();
                $("#convertamount").show();
            }
            
            if(this.CurrencyID == this.CurrencyIDPaid)
            {
                $("#lblconvertamount").hide();
                $("#convertamount").hide();
            }
            
          },
          
          changeCurrencyPaid: function(){
            this.CurrencyIDPaid = parseInt($("#currency_paid").val());
            this.RatePaid = this.currencyConfigPaidto.where({CurrencyID:this.CurrencyIDPaid})[0].get("FE_Rate");
            if(this.CurrencyID != this.CurrencyIDPaid && $("#amount").val() != "")
            {
                var amount = parseFloat($("#amount").val());
                //very important calculation!!!
                this.convertamount = amount*this.Rate/this.RatePaid;
                this.convertsymbol = this.currencyConfigPaidto.where({CurrencyID:this.CurrencyIDPaid})[0].get("ISOCode");
                this.convertamountformat = accounting.formatMoney(this.convertamount,{symbol:this.convertsymbol,format:"%v %s"});
                $("#convertamount").val(this.convertamountformat);
                
                $("#lblconvertamount").show();
                $("#convertamount").show();
            }
            
            if(this.CurrencyID == this.CurrencyIDPaid)
            {
                $("#lblconvertamount").hide();
                $("#convertamount").hide();
            }
            
          },
          
          OnOK: function(){
            var playerID = this.ctaInternalID;
            var fundID = ($("#bank").val()=="")?0:parseInt($("#bank").val());

            var availablelimit = this.availablelimit;
            var amount = ($("#amount").val()=="")?0:parseFloat($("#amount").val());

            var exchangeCurrencyID = this.CurrencyID;
            var exchangeRate = this.Rate;

            var paidCurrencyID = this.CurrencyIDPaid;
            var paidRate = this.RatePaid;

            var chips = ($("#chips").val()=="")?0:parseFloat($("#chips").val());
            var cash = ($("#cash").val()=="")?0:parseFloat($("#cash").val());
            var tokens = ($("#tokens").val()=="")?0:parseFloat($("#tokens").val());
            
            //hard code for stationID and advantage UserID
            var stationID = 30026
            var userID = 1
            
            
            

            if(amount<=0)
            {
                $(this).simpledialog2({
                mode: 'button',
                headerText: 'Error',
                headerClose: true,
                showModal: false,
                buttonPrompt: 'Please input correct Marker Amount!',
                buttons : {
                  'OK': {
                    click: function () {$('#buttonoutput').text('OK');}
                  }
                }
                });
                return;
            }
            
            var convertAmount = parseFloat(amount)*parseFloat(this.Rate)/parseFloat(this.RatePaid);
            var paidAmount = chips+cash+tokens;
            if(accounting.formatMoney(convertAmount,{symbol:"$",format:"%v %s"}) != accounting.formatMoney(paidAmount,{symbol:"$",format:"%v %s"}))
            {
                $(this).simpledialog2({
                mode: 'button',
                headerText: 'Error',
                headerClose: true,
                showModal: false,
                buttonPrompt: 'Paid to player amount shoule equal to Marker amount!',
                buttons : {
                  'OK': {
                    click: function () {$('#buttonoutput').text('OK');}
                  }
                }
                });
                return;  
            }
            
            if( this.availablelimit<(amount*parseFloat(this.Rate)) )
            {
                $(this).simpledialog2({
                mode: 'button',
                headerText: 'Error',
                headerClose: true,
                showModal: false,
                buttonPrompt: 'The amount requested exceeds the player available limit of '+this.availablelimitformat,
                buttons : {
                  'OK': {
                    click: function () {$('#buttonoutput').text('OK');}
                  }
                }
                });
                return; 
            }
            
            //should check mask limit, no useriD, just ignore now.
            //should check player fund limit, just ignore now.
            
            $.post('/mcm/issuemarker', {
                  playerID: playerID,
                  fundID: fundID,
                  amount: amount,
                  exchangeCurrencyID:exchangeCurrencyID,
                  exchangeRate:exchangeRate,
                  paidCurrencyID:paidCurrencyID,
                  paidRate:paidRate,
                  chips:chips,
                  cash:cash,
                  tokens:tokens,
                  stationID:stationID,
                  userID:userID
              },
            function(data) {
                if (data==="0") {
                    $(this).simpledialog2({
                    mode: 'button',
                    headerText: 'Error',
                    headerClose: true,
                    showModal: false,
                    buttonPrompt: 'Unexpected error happened!',
                    buttons : {
                      'OK': {
                        click: function () {$('#buttonoutput').text('OK');}
                      }
                    }
                    });
                    return;
                }
                else{
                    $(this).simpledialog2({
                    mode: 'button',
                    headerText: 'Successful',
                    headerClose: true,
                    showModal: false,
                    buttonPrompt: 'Marker transaction successful!\nDocumentID:' + data,
                    buttons : {
                      'OK': {
                        click: function () {$('#buttonoutput').text('OK');}
                      }
                    }
                    });
                    return;
                }
            }).error(function() {
                $(this).simpledialog2({
                mode: 'button',
                headerText: 'Error',
                headerClose: true,
                showModal: false,
                buttonPrompt: 'Unexpected error happened!',
                buttons : {
                  'OK': {
                    click: function () {$('#buttonoutput').text('OK');}
                  }
                }
                });
                return;
            });
            

          },

          render: function() {
             this.template = _.template(issueMarkerTemplate, { 
                "username": this.userName,
                "player":(this.playerName+"("+this.playerID+")"),
                "currencyconfig":this.currencyConfig,
                "fundinfo":this.fundInfo,
                "currencyconfigpaidto":this.currencyConfigPaidto,
                "availablelimit":this.availablelimitformat,
                "convertamount":this.availablelimitformat,
                "ui_back": $.i18n.prop("ui_back"),
                "ui_history": $.i18n.prop("ui_history"),
                "ui_issuemarker": $.i18n.prop('ui_issuemarker'),
                "ui_findplayer": $.i18n.prop('ui_findplayer'),
                "ui_browinghistory": $.i18n.prop('ui_browinghistory'),
                "ui_about": $.i18n.prop('ui_about')
                });
              this.$el.html(this.template);
              this.$el.attr('id', 'divissuemarker');
              $('#divissuemarker').trigger("create");
              $("#lblconvertamount").hide();
              $("#convertamount").hide();
              return this;
          }
          
      });

      return issueMarkerView;
  });
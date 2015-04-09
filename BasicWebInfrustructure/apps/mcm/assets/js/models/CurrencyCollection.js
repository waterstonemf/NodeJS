define(['models/CurrencyModel'], function(CurrencyModel) {
  var CurrencyCollection = Backbone.Collection.extend({
    model: CurrencyModel
  });
  
  return CurrencyCollection;
});
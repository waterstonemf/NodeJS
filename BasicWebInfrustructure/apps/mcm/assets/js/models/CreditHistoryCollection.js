define(['models/CreditHistoryModel'], function(CreditHistoryModel) {
  var CreditHistoryCollection = Backbone.Collection.extend({
    model: CreditHistoryModel
  });
  
  return CreditHistoryCollection;
});
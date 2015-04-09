define(['models/FMSKHistoryModel'], function(FMSKHistoryModel) {
  var FMSKHistoryCollection = Backbone.Collection.extend({
    model: FMSKHistoryModel
  });
  
  return FMSKHistoryCollection;
});
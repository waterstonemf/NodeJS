define(['models/MarkerHistoryModel'], function(MarkerHistoryModel) {
  var MarkerHistoryCollection = Backbone.Collection.extend({
    model: MarkerHistoryModel
  });
  
  return MarkerHistoryCollection;
});
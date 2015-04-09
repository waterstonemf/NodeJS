define(['models/FundInfoModel'], function(FundInfoModel) {
  var FundInfoCollection = Backbone.Collection.extend({
    model: FundInfoModel
  });
  
  return FundInfoCollection;
});
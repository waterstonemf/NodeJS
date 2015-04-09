define(function() {
  var PlayerSearchResultCollection = Backbone.Collection.extend({
    parse: function(res){
                var s = res.status;
                var a = s;
                if(res.status == 1){
                    for(var i = 0; i < res.content.length;i++){
                        var item = res.content[i];
                        this.push(item);
                    }
                }
		return this.models;
	}
  });
  
  return PlayerSearchResultCollection;
});
Response = function(status, msg,content)
{
	var self = this;
	self.status = status;
	self.msg = msg;
	self.content = content;
};

exports.Response = Response;
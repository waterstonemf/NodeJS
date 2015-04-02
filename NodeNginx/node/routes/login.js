

exports.login = function(req, res, next)
{
	res.render('main',{name:req.body.name,password:req.body.password});
}

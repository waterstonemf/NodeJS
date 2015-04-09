var viewpath = 'mcm/views/';

exports.index = function (req, res) {
	console.log("MCM index visit");
	res.render(viewpath + 'index.ejs');
}


exports.uitest = function (req, res) {
	console.log("MCM test");
	res.render(viewpath + 'specrunner.ejs');
}

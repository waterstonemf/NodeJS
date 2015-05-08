exports.loadDemo = function(req,res){
	res.render('demo',{});
	//res.send({title:"none"});
	
}

exports.showMore = function(req,res){
	
	var pageIndex = req.params.pageIndex;
	console.log(pageIndex);
	var content = "";
	switch (parseInt(pageIndex)){
	case 1:
			content = "<div><img src='images/11.png' /></div><div><img src='images/12.png' /></div>";
			console.log("I am in 1");
			break;
	case 2:
			 content = "<div><img src='images/21.png' /></div><div><img src='images/22.png' /></div>";
			break;
	case 3:
			 content = "<div><img src='images/31.png' /></div><div><img src='images/32.png' /></div>";
			break;
	default:
		break;
	}
	
	console.log(content);
	res.send(content);
	//res.send({title:"none"});
	
}
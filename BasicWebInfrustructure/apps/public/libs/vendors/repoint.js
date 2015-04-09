
var marginLeft;
var marginTop;
window.onload = function () 
{
		marginTop = 0;
		marginLeft = 0;
		rePoint();
}

window.onresize = function () 
{
		rePoint();
}

function rePoint() 
{
		var curClientWidth = getPageSize()[2];
		var curClientHeight = getPageSize()[3];

		var marginTopIndex = Math.ceil((curClientHeight - document.getElementById("login-form").clientHeight) / 2);
		var marginLeftIndex = Math.ceil((curClientWidth - document.getElementById("login-form").clientWidth - 18) / 2);

		if (marginLeftIndex < 0) 
		{
				marginLeftIndex = 0;
		}
		if (marginTopIndex < 0) 
		{
				marginTopIndex = 0;
		}
		if (marginLeft == marginLeftIndex && marginTop == marginTopIndex) 
		{
				return;
		}
		marginLeft = marginLeftIndex;
		marginTop = marginTopIndex;
		//document.getElementById("mainDiv").style.marginLeft = marginLeft + "px";
		//document.getElementById("mainDiv").style.marginTop = marginTop + "px";
}

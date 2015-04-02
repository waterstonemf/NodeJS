function init()
{
	$("#login").click(login);
	$("#login_form").attr("action", "loginHandler");
	$("#login_form").attr("method", "post");
	$("#login_form").submit(formSubmit);
}

//submit : Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.
//.on( "submit", handler )  .trigger( "submit" )

function login()
{
	$("#login_form").submit();
}

//this function called prior to the actual submission 
function formSubmit(event)
{
	
	//do some validation here.if validation failed, you could use event.preventDefault() to cancel the submit
	var validationResult= true
	if(!validationResult)
	{
		event.preventDefault();
		return;
	}
	
}

$(document).ready(init);
var w3c=(document.getElementById)? true: false; 
var agt=navigator.userAgent.toLowerCase(); 
var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1) && (agt.indexOf("omniweb") == -1)); 
  
function IeTrueBody(){ 
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body; 
} 
  
function GetScrollTop(){ 
	return ie ? IeTrueBody().scrollTop : window.pageYOffset; 
} 
function getPageScroll(){  
	var yScroll;  
	if (self.pageYOffset) {  
	yScroll = self.pageYOffset;  
	} else if (document.documentElement && document.documentElement.scrollTop){   // Explorer 6 Strict  
		yScroll = document.documentElement.scrollTop;  
	} else if (document.body) {// all other Explorers  
		yScroll = document.body.scrollTop;  
	}  
	arrayPageScroll = new Array('',yScroll)   
	return arrayPageScroll;  
}  
function getPageSize(){    
	var xScroll, yScroll;    
	if (window.innerHeight && window.scrollMaxY) {    
		xScroll = document.body.scrollWidth;  
		yScroll = window.innerHeight + window.scrollMaxY;  
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac  
		xScroll = document.body.scrollWidth;  
		yScroll = document.body.scrollHeight;  
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari  
		xScroll = document.body.offsetWidth;  
		yScroll = document.body.offsetHeight;  
	}  
	var windowWidth, windowHeight;  
	if (self.innerHeight) {  // all except Explorer  
		windowWidth = self.innerWidth;  
		windowHeight = self.innerHeight;  
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode  
		windowWidth = document.documentElement.clientWidth;  
		windowHeight = document.documentElement.clientHeight;  
	} else if (document.body) { // other Explorers  
		windowWidth = document.body.clientWidth;  
		windowHeight = document.body.clientHeight;  
	}    
	// for small pages with total height less then height of the viewport  
	if(yScroll < windowHeight){  
		pageHeight = windowHeight;  
	} else {   
		pageHeight = yScroll;  
	}  
	if(xScroll < windowWidth){    
		pageWidth = windowWidth;  
	} else {  
		pageWidth = xScroll;  
	}  
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)   
	return arrayPageSize;  
	//return pageHeight; 
}
function getElementsByClassName(node,classname) {
  if (node.getElementsByClassName) { // use native implementation if available
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}
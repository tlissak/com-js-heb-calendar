<!--#include file="inc/Header.js" -->
<% 
var c = function(s){Response.Write(s)}
var  xmlHttp = function(_OP){
		oRequestParameters = {}
		oRequestParameters.asyncronous			= (Server) ? false : true 
		oRequestParameters.response_handler 	= _OP.response_handler ? _OP.response_handler : xmlHttp.foo
		oRequestParameters.error_handler 		= _OP.error_handler ? _OP.error_handler : xmlHttp.foo
		oRequestParameters.xml_handler 			= _OP.xml_handler ? _OP.xml_handler : xmlHttp.foo
		oRequestParameters.url 					= _OP.url ? xmlHttp.rnd_url(_OP.url) : "#"
		oRequestParameters.method 				= (String(_OP.method).toLowerCase()=="post") ?  "POST" : "GET"
		oRequestParameters.data					= _OP.data ?  _OP.data	:  null
		oRequestParameters.request_header 		= (oRequestParameters.method=="GET") ? "text/html" : "application/x-www-form-urlencoded"
		
		var oXmlHttp = xmlHttp.createXMLHttp();
		if (!(oXmlHttp)) return
		oXmlHttp.open(oRequestParameters.method, oRequestParameters.url, oRequestParameters.asyncronous);
		oXmlHttp.onreadystatechange = function() {
				
				if (oXmlHttp.readyState == 4 ){
					
						 if (oXmlHttp.status == 200) {
							oRequestParameters.response_handler(oXmlHttp.responseText)
							oRequestParameters.xml_handler(oXmlHttp.responseXML)
						 }else{
							oRequestParameters.error_handler(oXmlHttp.status);
						}
				}
		}
		oXmlHttp.setRequestHeader("Content-Type",oRequestParameters.request_header) 
		//ajax POST ASP.request.form not response without header PHP work with $GLOBALS['HTTP_RAW_POST_DATA'];
		oXmlHttp.send(oRequestParameters.data) // xmlHttp.onreadystatechange has to be before the xmlHttp.send 
	}
	xmlHttp.foo = function(_x_){return}
	xmlHttp.rnd_url = function(_url){
		if (_url.indexOf("?") > -1){		return	_url + "&rnd=" + Math.random()	}
		return _url + "?rnd=" + Math.random()
	}
	xmlHttp.createXMLHttp = function(){
		try {		return new XMLHttpRequest(); }catch(e){}
		try {		return new ActiveXObject('Msxml2.XMLHTTP');	}catch (e) {}
		try {	    return new ActiveXObject('Microsoft.XMLHTTP'); }catch(e){  return null	}
	}
	// asyncronous IMPORTENT IF false window.onload (Server) not return data MOREInfo http://www.webopedia.com/TERM/A/asynchronous.html 
		
	
	
xmlHttp({url:"http://localhost/",response_handler:c,error_handler:c})



%>
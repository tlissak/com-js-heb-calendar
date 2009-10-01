/*THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.*/
// taken from xinha editor optimized by tlissak 
// usage Ev._addEvent(window,"load",myFunction) //:: IMPORTENT the function cennot use litteral or arguments "()"
var Ev = new Object()
if(document.addEventListener){
	Ev._addEvent =function(el,_eventType1,func){el.addEventListener(_eventType1,func,true);};
	Ev._removeEvent =function(el,_eventType2,func){el.removeEventListener(_eventType2,func,true);	};
	Ev._stopEvent =function(ev){	ev.preventDefault();	ev.stopPropagation();	};
}else if(document.attachEvent){
	Ev._addEvent =function(el,_eventType3,func){	el.attachEvent("on"+_eventType3,func);};
	Ev._removeEvent =function(el,_eventType4,func){	el.detachEvent("on"+_eventType4,func);	};
	Ev._stopEvent =function(ev){	try{ ev.cancelBubble=true; ev.returnValue=false;}catch(ex){}};
}else{
	Ev._addEvent =function(el,_eventType5,func){alert("_addEvent is not supported");};
	Ev._removeEvent =function(el,_eventType6,func){	alert("_removeEvent is not supported");	};
	Ev._stopEvent =function(ev){	alert("_stopEvent is not supported");};
}
Ev.add = Ev._addEvent
Ev.stop = Ev._stopEvent
function send_email(){
	if ($('contact_data').value.length == 0){alert("Please spacify your request");return}
	this.r = function(_s){if(_s	== "OK"){$("contact").style.display ='none';$("contact_form").reset(); return} ;	alert("Email cennot be sent ,server error");}
	DT = 'email='+$('contact_email').value +'&subject='+$('contact_subject').value+'&data='+$('contact_data').value
	xmlHttp({url:'ajax/contact.php',method:'post',data:DT,response:this.r})	
}
function ajax_load(pfx,callback){xmlHttp({url:"Ajax/"+pfx+".html",response:function(s){$(pfx).innerHTML = s;if(callback){callback()}}})}
function setCitiesList(){
	var OPT = ""
	curr_group = CITY[0].group
	OPT		+= "<optgroup label='"+curr_group+"'>"
	for (var i=0;i<CITY.length;i++){
		oCity = CITY[i]
		if(curr_group == oCity.group){
			OPT	+= '<option value="'+i+'" >'+oCity.place +' (Chabat + '+oCity.chabat+')</option>'
		}else{
			curr_group = oCity.group
			OPT	+= "</optgroup><optgroup label='"+curr_group+"'>"
			OPT	+= '<option value="'+i+'" >'+oCity.place +' (Chabat + '+oCity.chabat+')</option>'
		}
	}
	OPT += "</optgroup>"
	$("sCity").innerHTML = OPT
}
function show_event_index(){
	oPref = Pref()
	var arr = ["flow_s","flow_in","hefsek","seven_nekiaim","mikve","veset_hodesh","veset_haflaga","ona_benonit"]	
	for (var i=0,out = '';i<arr.length;i++){
		arr_ev = LNG[oPref.language][arr[i]]
		out += "<li class='"+arr[i]+"' >"
		out += "<a title=\""+arr_ev[1]+"\" href='../"+arr_ev[2]+"' >"+ arr_ev[0] + "</a></li>"
	}
	$("event-index").innerHTML = out
}
var MIKVE
function search_mikve(){
	if (!(MIKVE)){	MIKVE = $("mikveh-list").getElementsByTagName("h3") }
	if ($("search").value ){
		for (var i=0;i<MIKVE.length;i++){
			if (MIKVE[i].innerHTML.toLowerCase().indexOf($("search").value.toLowerCase()) == 0){
				$("mikveh-list").parentNode.scrollTop = (MIKVE[i].offsetTop - 0) ;	return false 
			}
		}
	}return false
}

function c(){console.log(c.arguments)}
if (!(window.console)){
var console = {
	log:function(){ 
		for (var console_arg=0;console_arg <arguments.length;console_arg++){
			$("log").innerHTML = $("log").innerHTML + arguments[console_arg]
		}}}}
console.print = function(){
	$("log").innerHTML +=  "<br />"
	for (var console_arg=0;console_arg <arguments.length;console_arg++){
			$("log").innerHTML = $("log").innerHTML +","+ arguments[console_arg]
	}	
}
function $(id){return document.getElementById(id)}
function cursorPosition(ev){ev = ev || window.event;	
	if(ev.pageX || ev.pageY){return {x:ev.pageX, y:ev.pageY};}
	return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop};
}
var Cookie = {
  build: function() {
	 arr_b = new Array();for (var i=0;i<arguments.length;i++){arr_b.push(arguments[i])} return arr_b.join("; ");
  },daysFromNow: function(days) {
    var d = new Date(); d.setTime(d.getTime() +(days * 24 * 60 * 60 * 1000)); return d.toGMTString();
  },set: function(name,value,day){
    var expiry = day ? 'expires=' + Cookie.daysFromNow(day) : null;
    document.cookie = Cookie.build(name + "=" + value, expiry, "path=/");
  },get: function(name){
    var valueMatch = new RegExp(name + "=([^;]+)").exec(document.cookie); return valueMatch ? valueMatch[1] : "";
  },del: function(name){
    Cookie.set(name,'',-1);
  }
};
function Move(e,elm){//Move by tlissak v 0.7 
	var elm = elm
	elm.style.position = "absolute"
	var process 	= true
	var cursorPosition = function (ev){
		ev = ev || window.event;
		if(ev.pageX || ev.pageY){			return {x:ev.pageX, y:ev.pageY};		}
		return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
				y:ev.clientY + document.body.scrollTop  - document.body.clientTop}
	}
	var findObjPos = function (obj) {
		if (obj){var curleft = 0 ;var curtop = 0;
			if (obj.offsetParent) {
				curleft = obj.offsetLeft ; curtop = obj.offsetTop
				while (obj = obj.offsetParent) {curleft += obj.offsetLeft ; curtop += obj.offsetTop	}}
			return {x:curleft,y:curtop};
		}
	}	
	var old_y_pos  = parseInt(elm.style.top) ? parseInt(elm.style.top) : findObjPos(elm).y
	var old_x_pos	= parseInt(elm.style.left) ? parseInt(elm.style.left) : findObjPos(elm).x
	var old_csr_x  = cursorPosition(e).x - old_x_pos
	var old_csr_y	= cursorPosition(e).y - old_y_pos
	
	document.onmousemove= mousemove
	document.body.onselectstart=function(){return false}//ie
	document.body.onmousedown=function(){return false}//mozilla}
	function mouseup(){
		process=false
		document.onmouseup = null
		document.onmousemove = null
		document.body.onselectstart=function(){return true}//ie
		document.body.onmousedown=function(){return true}//mozilla
	}
	function mousemove(e){
		elm.onmouseup = mouseup
		document.onmouseup = mouseup
		if(process){
			elm.style.left = cursorPosition(e).x - old_csr_x +"px"
			elm.style.top  = cursorPosition(e).y - old_csr_y +"px"
			document.onmouseup = this.mouseup
		}
	}
}
function xmlHttp(o){
	var foo = function(_x_){	return	}
	var createXMLHttp = function() {
		try {		return new XMLHttpRequest(); }catch(e){}
		try {		return new ActiveXObject('Msxml2.XMLHTTP');	}catch (e) {}
		try {	    return new ActiveXObject('Microsoft.XMLHTTP'); }catch(e){  return null	}
	}
	var rnd_url = function(_url){rnd=Math.random(); return (_url.indexOf("?") > -1) ? _url+"&rnd="+rnd : _url+"?rnd="+rnd}
	var asyncronous		= typeof(Server)=="object" ? false : true //IMPORTENT window.onload not return data on false
	var url 			= o.url ? rnd_url(o.url) : "#"
	var method 			= (String(o.method).toLowerCase()=="post") ?  "POST" : "GET"	
	var data 			= o.data ?  o.data	:  null	
	var response_handler = typeof o.response_handler == "function" ? o.response_handler : foo
	var response_handler = typeof o.response == "function" ? o.response : response_handler // shortcut for response
	var error_handler 	 = typeof o.error_handler  == "function" ? o.error_handler : foo
	var error_handler 	 = typeof o.error  == "function" ? o.error : error_handler
	var xml_handler 	 = typeof o.xml_handler  == "function" ? o.xml_handler : foo // shortcut for xml
	var xml_handler 	 = typeof o.xml == "function" ? o.xml : xml_handler
	var request_header 	 = (method=="GET") ? "text/html" : "application/x-www-form-urlencoded"	// Charset=iso-8859-1"
	var request = createXMLHttp();	//if (!(request)) return
	request.open(method, url, asyncronous);
	request.onreadystatechange = function() {
		if (request.readyState == 4 ){
			xmlHttp.mask.hide()
			if (request.status == 200) {
				ctype = request.getResponseHeader("Content-Type")
				if (ctype.indexOf('text/xml') > -1) {
					xml_handler(request.responseXML)
				} else if (ctype.indexOf('text/plain') > -1 || ctype.indexOf('text/html' ) > -1 ) {
					response_handler(request.responseText)
				} 				
			}else{	error_handler(request.status);	}
		}
	}		
	request.setRequestHeader("Content-Type",request_header) // IMPORTANT for ASP Request.Form (php use $GLOBALS['HTTP_RAW_POST_DATA'];)
	xmlHttp.mask.show()
	request.send(data)
}
xmlHttp.mask = {
		show:function (opacity ){
			opacity = opacity ? opacity : 0.5
			if(!(document.getElementById("mask"))){
			 var mask=document.createElement('div');
			 mask.style.display = "block"
			 mask.setAttribute("id","mask");
			 mask.style.position = "absolute"
			 mask.style.top = "0px"
			 mask.style.left = "0px"
			 var h = document.all ? document.body.offsetHeight  : document.body.offsetHeight
			 if (h==0){ h = document.all ? document.body.clientHeight : window.innerHeight }
			 mask.style.zIndex = "500"
			 mask.style.height = "100%"		// mask.style.height =  h  +"px"
			 mask.style.width = document.all ? document.body.clientWidth : window.innerWidth +"px"
			 mask.style.background = "#000"
			 
			 mask.style.opacity = (opacity / 10);
			 mask.style.MozOpacity = (opacity / 10);
			 mask.style.KhtmlOpacity = (opacity / 10);
			 mask.style.filter = "alpha(opacity=" + opacity*10 + ")";
			 
			 document.body.appendChild(mask);
			}else{	document.getElementById("mask").style.display = 'block'	}
		},hide:function(){
			if (document.getElementById('mask')){document.getElementById('mask').style.display='none';}
		}	
}

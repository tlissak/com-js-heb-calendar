// JavaScript Document
function Pref(){
	
	var getPrefHandler		= getCookieParam //getURLParam 
	var setPrefHandler		= setCookieParam //setURLParam 
	
	var language = "fr"
	var time_adj = 0
	var cal_start 	= (new Date()).getFullYear()
	var cal_end 	= cal_start
	var max_disp_years = 4
	
	var years 		= getYears(cal_end , cal_start )
	
	var country 	= "europe"
	var	city		= "paris"
	var bIsrael		= false // galut
	_time_adj		= $("time_adj")
	_city 			= $("city")
	_city_opts 		= _city.options
	
	getPref () // 
	
	function getYears(e,s){
		if ((e - s) >= max_disp_years ){
			alert("max disp years riched")
			cal_end = cal_start + max_disp_years -1
			Cookie.set("cal_end",cal_end,365)
			return max_disp_years
		}
		if ((e-s) < 0 ){
			alert("end date cenot be before start date")
			cal_end = cal_start
			Cookie.set("cal_end",cal_end,365)
			return 0
		}
		return (e-s)
	}
	
	$("sCal_start").value 	= cal_start
	$("sCal_end").value 	= cal_end
	
	for (var i=0;i<_city_opts.length;i++){
		if (_city_opts[i].value.toLowerCase() == city.toLowerCase()){
			_city.selectedIndex	= i
			country = _city_opts[i].parentNode.label.toLowerCase()
		}
	}
	if (country == "israel"){bIsrael = true } 
	
	
	if (arguments.length > 0){
		o = arguments[0]
		language 	= o.language ?  o.language : language
		time_adj 	= parseInt(o.time_adj)  >-1 ?  parseInt(o.time_adj) : time_adj
		cal_start	= parseInt(o.cal_start) > 0 ?  parseInt(o.cal_start) : cal_start
		cal_end  	= parseInt(o.cal_end) > 0 ?  parseInt(o.cal_end) : cal_end
		country		= o.country ?  o.country : country
		city		= o.city ?  o.city : city
		bIsrael		= o.bIsrael ?  o.bIsrael : bIsrael
		years 		= getYears(cal_end , cal_start )		
	}	
	out = {
			language:language,time_adj:time_adj
			,cal_start:cal_start,cal_end:cal_end,years:years
			,country:country
			,city:city,bIsrael:bIsrael
	}
	if (arguments.length > 0){
		setPref(out) ;
		show();
		return
	}else { 
		if (time_adj==1){ _time_adj.checked = true} ;
		return out
	}
	function getPref (){
		language	= getPrefHandler("language") ? getPrefHandler("language") : language
		city 		= getPrefHandler("city") ?getPrefHandler("city") : city
		time_adj 	= getPrefHandler("time_adj") ? parseInt(getPrefHandler("time_adj")) : time_adj
		cal_start	= getPrefHandler("cal_start") ? parseInt(getPrefHandler("cal_start")) : cal_start
		cal_end		= getPrefHandler("cal_end")	? parseInt(getPrefHandler("cal_end"))	 : cal_end		
		years 		= getYears(cal_end , cal_start )
	}
	function setPref(oPref){setPrefHandler(oPref)}		
	function getCookieParam(p){	return Cookie.get(p)}
	function setCookieParam(o){	for (var x in o){	Cookie.set(x,o[x],365)}	}	
	function obj2str(o){var out="";for (var x in o){out +="&"+x+"="+o[x]}return out.replace("&","?")}
	function setURLParam(_op){	window.location.href = obj2str(_op)}
	function getURLParam(strParamName){
		var strParamName = strParamName.toLowerCase()
		var strHref = window.location.href;
		if ( strHref.indexOf("?") > -1 ){
			var strQueryString = strHref.substr(strHref.indexOf("?"));
			var aQueryString = strQueryString.split("&");
			for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
				if (aQueryString[iParam].toLowerCase().indexOf(strParamName + "=") > -1 ){
					return aQueryString[iParam].split("=")[1];
				}
			}
		}
		return null;
	}	
		
	
}



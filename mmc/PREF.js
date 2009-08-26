// JavaScript Document
function Pref(){
	
	/***************************************/
	// delPref() // del pref
	/**************************************/
	function delPref(){
		Cookie.del("city")	
		Cookie.del("years")	
		Cookie.del("cal_end")	
		Cookie.del("cal_start")	
		Cookie.del("time_adj")	
		Cookie.del("language")	
		Cookie.del("bIsrael")	
		Cookie.del("country")	
		Cookie.del("minhag")	
	}	
	
	var getPrefHandler		= getCookieParam //getURLParam 
	var setPrefHandler		= setCookieParam //setURLParam 
	var minhag		= "ch"
	var language 	= "fr"
	var time_adj 	= 0
	var cal_start 	= (new Date()).getFullYear()
	var cal_end 	= cal_start
	var MAX_DISP_YEARS = 2
	var	city		= 0
	var _time_adj	= $("time_adj")
	var _city 		= $("sCity")
	var _language	= $("sLanguage")
	var _minhag		= $("sMinhag")
	var years 		= getYears(cal_end , cal_start )	
	
	getPref ()	
	setLanguage()
	
	function setLanguage(){
		$("t_cal_start").innerHTML = LNG[language].t_cal_begin
		$("t_cal_end").innerHTML = LNG[language].t_cal_end
		$("t_dailight_st").innerHTML = LNG[language].t_dst
		$("refresh").innerHTML = LNG[language].refresh
		$("t_setting").innerHTML = LNG[language].setting
		$("t_mikve_france").innerHTML = LNG[language].t_mikveh_france
		$("t_mikve_world").innerHTML = LNG[language].t_mikveh_world
		$("t_warning").innerHTML = LNG[language].warning
		$("t_select_minhag").innerHTML = LNG[language].t_select_minhag
		$("t_today").innerHTML = LNG[language].today
		$("t_user_guide").innerHTML = LNG[language].t_user_guide
		$("t_location").innerHTML   = LNG[language].t_location
		x_s = '<option value="ch">'+LNG[language].minhag_chabad+'</option>'
		x_s += '<option value="sef">'+LNG[language].minhag_sfarad+'</option>'
		$("sMinhag").innerHTML = x_s
	}
	if (arguments.length > 0){
		o = arguments[0]
		language 	= o.language ?  o.language : language
		minhag 		= o.minhag  ? o.minhag : minhag
		time_adj 	= parseInt(o.time_adj)  >-1 ?  parseInt(o.time_adj) : time_adj
		cal_start	= parseInt(o.cal_start) > 0 ?  parseInt(o.cal_start) : cal_start
		cal_end  	= parseInt(o.cal_end) > 0 ?  parseInt(o.cal_end) : cal_end
		city		= (!(isNaN(parseInt(o.city))))   ?  parseInt(o.city) : city
		years 		= getYears(cal_end , cal_start )
	}
	$("sCal_start").value 	= cal_start
	$("sCal_end").value 	= cal_end
	
	for (var i=0;i<_city.options.length;i++){
		if (parseInt(city) == parseInt(_city.options[i].value)){	
			_city.selectedIndex = i ;	
			break ;	
		}
	}
	for (var i=0;i<_language.options.length;i++){
		if (String(language) == String(_language.options[i].value)){	
			_language.selectedIndex = i ;	
			break ;	
		}
	}
	for (var i=0;i<_minhag.options.length;i++){
		if (String(minhag) == String(_minhag.options[i].value)){	
			_minhag.selectedIndex = i ;	
			break ;	
		}
	}
	out = {
			minhag:minhag,language:language,time_adj:time_adj
			,cal_start:cal_start,cal_end:cal_end,years:years
			,city:city
	}
	if (arguments.length > 0){
		setPref(out) ;
		////////////////////
		// show after setting Pref
		////////////////////
		show() ;
		return
	}else { 		
		if (time_adj==1){ _time_adj.checked = true} ;
		out.city = CITY_LOCATION[parseInt(out.city)]
		return out
	}
	function getYears(e,s){
		if ((e - s) >= MAX_DISP_YEARS ){
			//alert("max disp years riched")
			cal_end = cal_start + MAX_DISP_YEARS -1
			Cookie.set("cal_end",cal_end,365)
			return MAX_DISP_YEARS
		}
		if ((e-s) < 0 ){
			//alert("end date cenot be before start date")
			cal_end = cal_start
			Cookie.set("cal_end",cal_end,365)
			return 0
		}
		return (e-s)
	}
	function getPref (){
		minhag		= getPrefHandler("minhag") ? getPrefHandler("minhag") : minhag
		language	= getPrefHandler("language") ? getPrefHandler("language") : language
		city 		= (!(isNaN(parseInt(getPrefHandler("city"))))) ? parseInt(getPrefHandler("city")) : city
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



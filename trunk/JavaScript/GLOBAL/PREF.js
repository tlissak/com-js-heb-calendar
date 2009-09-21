// JavaScript Document
function Pref(){ if (arguments.length == 0){return Pref.get()}}

Pref.load			= function(){
	oPref = Pref.get()
	_city	= $("sCity")
	for (var i=0;i<_city.options.length;i++){
		if (parseInt(oPref.city) == parseInt(_city.options[i].value)){ _city.selectedIndex = i ;	break ;	}
	}
	_language = $("sLanguage")
	for (var i=0;i<_language.options.length;i++){
		if (String(oPref.language) == String(_language.options[i].value)){_language.selectedIndex = i ;	break ;	}
	}
	_minhag = $("sMinhag")
	for (var i=0;i<_minhag.options.length;i++){
		if (String(oPref.minhag) == String(_minhag.options[i].value)){_minhag.selectedIndex = i ;	break ;	}
	}
	Pref.printLanguage(oPref.language)
	Pref.printRange(oPref.cal_end,oPref.cal_start)
}
Pref.MAX_DISP_YEARS = 2
Pref.printLanguage 	= function(language){
	if (language=="he"){document.body.dir = "rtl" ; }else{	document.body.dir = "ltr" ; }		
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
Pref.setLanguage 	= function(lng){
	if (lng != "he" && lng != "en" && lng != "fr"){lng = "fr" }
	Cookie.set("language",lng,365)
	Pref.printLanguage(lng)
	Render("load",RENDER_MONTH)
}
Pref.setManualDST	= function( BT /*0|1*/){
	time_adj 	= parseInt(o.time_adj)  >-1 ?  parseInt(o.time_adj) : time_adj	
	if (time_adj==1){ _time_adj.checked = true} ;	
}
Pref.setMinhag 		= function(minhag){	Cookie.set("minhag",minhag,365) }
Pref.printRange		= function(e,s){
	$("sCal_start").value 	= s
	$("sCal_end").value 	= e
}
Pref.setDateRange 	= function(e,s){
	RG	= Pref.rangeCheck(e,s)
	Cookie.set("cal_start",RG.start,365)
	Cookie.set("cal_end",RG.end,365)
	Pref.printRange(RG.end,RG.start)
	Render("left")
}
Pref.rangeCheck		= function(e,s){
	if ((e - s) >= Pref.MAX_DISP_YEARS ){e = s + Pref.MAX_DISP_YEARS -1 ; return {end:e,start:s,years:Pref.MAX_DISP_YEARS}	}
	if ((e-s) < 0 ){e = s ; return {end:e,start:s,years:0}}
	return {end:e,start:s,years:(e-s)}
}
Pref.setCity		= function(iCity){	//get auto DST
	if (!(CITY[parseInt(iCity)])){alert("Pref.setCity(iCity)city location by id"); return }
	Cookie.set("city",iCity,365)
	Render("times")
}
Pref.get			= function(){
	var cal_start 	= (new Date()).getFullYear()
	var	cal_end		= cal_start
	var	iCity		= 0
	var DST			= $("DST").checked ? 1 : 0 
	var iCity 		= parseInt($("sCity").value)
	var Language	= $("sLanguage").value
	var Minhag		= $("sMinhag")
	var Range		= Pref.rangeCheck(cal_end,cal_start)
	
	Minhag		= Cookie.get("minhag") ? Cookie.get("minhag") : Minhag
	Language	= Cookie.get("language") ? Cookie.get("language") : Language
	iCity 		= (!(isNaN(parseInt(Cookie.get("city"))))) ? parseInt(Cookie.get("city")) : iCity
	DST 		= Cookie.get("dst") ? parseInt(Cookie.get("dst")) : DST
	cal_start	= Cookie.get("cal_start") ? parseInt(Cookie.get("cal_start")) : cal_start
	cal_end		= Cookie.get("cal_end")	? parseInt(Cookie.get("cal_end"))	 : cal_end
	Range		= Pref.rangeCheck(cal_end,cal_start)
	//alert(iCity)
	return {	minhag:Minhag,language:Language,DST:DST,cal_start:Range.start,cal_end:Range.end,years:Range.years,city:iCity }
}
Pref.del		= function(){
	Cookie.del("city");Cookie.del("years");	Cookie.del("cal_end");
	Cookie.del("cal_start");Cookie.del("time_adj");Cookie.del("language")	
	Cookie.del("bIsrael");Cookie.del("country")	;Cookie.del("minhag");
}


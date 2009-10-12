// JavaScript Document
var LNG = {}
function _(str) {
	if (!(str in window.LNG)) { return str; }
	return window.LNG[str];
}
function Pref(){ if (arguments.length == 0){return Pref.get()}}
Pref.language = ""
Pref.load_xml_lng = function(xmlDoc){
	if (xmlDoc) {
			var strings = xmlDoc.getElementsByTagName("string");
			for (var i=0;i<strings.length;i++) {
				var n = strings[i].getAttribute("name");
				var v = strings[i].firstChild.nodeValue.replace(/\*(.*?)\*/g,"<$1>");
				window.LNG[n] = v;
			}
			var arrays = xmlDoc.getElementsByTagName("array");
			for (var i=0;i<arrays.length;i++) {
				var n = arrays[i].getAttribute("name");
				var v = arrays[i].firstChild.nodeValue;
				window.LNG[n] = v.split(",");
				//console.info(n)
			}
			var objects = xmlDoc.getElementsByTagName("object");
			for (var i=0;i<objects.length;i++) {
				var n = objects[i].getAttribute("name");
				var v = objects[i].firstChild.nodeValue;
				window.LNG[n] = {} //v.split(",");
				var items = objects[i].getElementsByTagName("item")
				for (var j=0;j<items.length;j++) {
					var _n = items[j].getAttribute("name");
					var _v = items[j].firstChild.nodeValue;
					window.LNG[n][_n] = _v ;
				}
			}
		}else{
			throw("unable to get language xml data")	
		}
}
Pref.reprintLabel = function(){
	document.body.dir = (Pref.language=="he") ? "rtl" : "ltr" 

	$("t_cal_start").innerHTML = _("cal_begin")
	$("t_cal_end").innerHTML = _("cal_end")
	$("refresh").innerHTML = _("refresh")
	$("t_setting").innerHTML = _("setting")
	$("t_mikve_france").innerHTML = _("list_mikveh_france")
	$("t_mikve_world").innerHTML = _("mikveh_world")
	$("support_us").innerHTML = _("support_us")
	$("t_today").innerHTML = _("today")	
	$("t_user_guide").innerHTML = _("user_guide")	
	$("t_location").innerHTML   = _("location")
	$("t_contact").innerHTML   = _("contact")	
	x_s = '<option value="ch">'+_("chabad")+'</option>'
	x_s += '<option value="sef">'+_("sefarad")+'</option>'
	$("sMinhag").innerHTML = x_s
	
}
Pref.printLanguage = function(_lngg,ondone_fnc){
	this._lngResponse = function(xmlDoc){
		Pref.load_xml_lng(xmlDoc)
		Render("load",RENDER_MONTH)	
		Pref.reprintLabel()			
		if (ondone_fnc){
			ondone_fnc()
		}
	}
	xmlHttp({url:"Local/"+_lngg+".xml",xml:this._lngResponse})
}
Pref.load	= function(ondone_fnc){
	oPref = Pref.get()
	_city	= $("sCity")
	for (var i=0;i<_city.options.length;i++){
		if (parseInt(oPref.city) == parseInt(_city.options[i].value)){ _city.selectedIndex = i ; 	break ;	}
	}
	_language = $("sLanguage")
	for (var i=0;i<_language.options.length;i++){
		if (String(oPref.language) == String(_language.options[i].value)){_language.selectedIndex = i ;	break ;	}
	}
	_minhag = $("sMinhag")
	for (var i=0;i<_minhag.options.length;i++){
		if (String(oPref.minhag) == String(_minhag.options[i].value)){_minhag.selectedIndex = i ;	break ;	}
	}
	Pref.printRange(oPref.cal_end,oPref.cal_start)
	Pref.printLanguage(oPref.language,ondone_fnc)
}
Pref.MAX_DISP_YEARS = 2
Pref.setLanguage 	= function(lng){
	if (lng != "he" && lng != "en" && lng != "fr"){lng = "fr" }
	Cookie.set("language",lng,365)
	Pref.language = lng
	Pref.printLanguage(lng)
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
	//var DST			= $("DST").checked ? 1 : 0 
	var iCity 		= parseInt($("sCity").value)
	var Language	= $("sLanguage").value
	var Minhag		= $("sMinhag")
	var Range		= Pref.rangeCheck(cal_end,cal_start)
	
	Minhag		= Cookie.get("minhag") ? Cookie.get("minhag") : Minhag
	Language	= Cookie.get("language") ? Cookie.get("language") : Language
	iCity 		= (!(isNaN(parseInt(Cookie.get("city"))))) ? parseInt(Cookie.get("city")) : iCity
	//DST 		= Cookie.get("dst") ? parseInt(Cookie.get("dst")) : DST
	cal_start	= Cookie.get("cal_start") ? parseInt(Cookie.get("cal_start")) : cal_start
	cal_end		= Cookie.get("cal_end")	? parseInt(Cookie.get("cal_end"))	 : cal_end
	Range		= Pref.rangeCheck(cal_end,cal_start)
	//DST:DST,
	Pref.language = Language
	return {	minhag:Minhag,language:Language,cal_start:Range.start,cal_end:Range.end,years:Range.years,city:iCity }
}
Pref.del		= function(){
	Cookie.del("city");Cookie.del("years");	Cookie.del("cal_end");
	Cookie.del("cal_start");Cookie.del("time_adj");Cookie.del("language")	
	Cookie.del("bIsrael");Cookie.del("country")	;Cookie.del("minhag");
}


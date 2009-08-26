// JavaScript Document
function _j(e,elm){
	oPref = Pref()
	
	$("btn_delete_event").value 		= LNG[oPref.language].btn_delete_event
	$("btn_create_raia").value			= LNG[oPref.language].btn_create_raia
	$("btn_create_hefsek").value		= LNG[oPref.language].btn_create_hefsek
	
	$("btn_create_raia_in").value			= LNG[oPref.language].btn_create_raia
	$("btn_create_hefsek_in").value			= LNG[oPref.language].btn_create_hefsek
	
	$("t_select_period").innerHTML 		= LNG[oPref.language].t_select_period
	$("t_before").innerHTML				= LNG[oPref.language].t_before
	$("t_early_morning").innerHTML		= LNG[oPref.language].t_early_morning
	$("t_dialogday").innerHTML			= LNG[oPref.language].t_dialogday
	$("t_between").innerHTML			= LNG[oPref.language].t_between
	$("t_morning_and").innerHTML		= LNG[oPref.language].t_morning_and
	$("t_evening").innerHTML			= LNG[oPref.language].t_evening

	$("t_create_event_attention").innerHTML 	= LNG[oPref.language].t_create_event_attention
	
	aDay = parseInt(elm.id.replace("j_","").replace("jm_",""))
	pos = cursorPosition(e)	
	
	GD  = new GDate(aDay)
	HD  = new HDate(GD)	
	cj = GD.getDay()
	cm = GD.getMonth()
	cmn = GD.getMonthName(oPref.language)
	cy = GD.getYear()	
	CURR_HDN = GD.m_hdn
	sGDate 	= cj + "-" + cmn + "-"+ cy
	sHDate	= HD.getDay() +" "+  HD.getMonthName(oPref.language) +" "+ HD.getYear()
	sDate 	= sGDate + " " + sHDate
	_dow 	= GD.getWeekDayName(oPref.language)
	
	jEvent = new JEvent(HOLIDAYS.currentHoliday(HD))
	
	zmanim = HD.getZmanim(oPref.city,oPref.time_adj)	
	parasha = HD.getParashaName(oPref.city.bIsrael,oPref.language=="he")
	
	$("s2").style.display 				= "none"
	$("s1").style.display				= "none"
	$("s3").style.display 				= "none"
	$("s3").innerHTML 					= ""
	$("btn_create_raia").style.display 	= "block"
	$("btn_create_hefsek").style.display = "block"
	$("btn_delete_event").style.display = "none"
	
	$("dialog").style.display 	= "block"
	$("dialog").style.top 		= pos.y+"px"
	$("dialog").style.left 		= pos.x+"px"
	
	$("dialog-date").innerHTML 	= sGDate + " " + sHDate
	$("sDate").innerHTML 		= sGDate + " " + sHDate
	$("sHdn").value				= CURR_HDN
		
	zmanim 	= GD.getZmanim(oPref.city,oPref.time_adj)
	_sr 	= zmanim.alot
	_ss		= zmanim.shkia
	$("s_time_zone").innerHTML = oPref.city.place +" DMC + "+ oPref.time_adj
	$("st1_dow1").innerHTML = _dow
	$("st1_dow2").innerHTML = _dow
	$("st1_d1").innerHTML = sDate
	$("st1_d2").innerHTML = sDate
	$("st1_sr1").innerHTML = _sr
	$("st1_sr2").innerHTML = _sr
	$("st1_ss1").innerHTML = _ss
	
	$("hefsek_date").innerHTML 	= sDate	
	//verify_by_thecurrent event if you can create hefsek or raia()	 then block select
	// consulte event
	if (!(DEVENT)){return}
	for (var i=0;i<DEVENT.length;i++){
		hdn 	= DEVENT[i][0]
		type 	= DEVENT[i][1]
		caller 	= DEVENT[i][2]
		ona 	= DEVENT[i][3]
		
		if (CURR_HDN == hdn){
			if (type==dEvent.FLOW_START_NIGHT || type==dEvent.FLOW_START_DAY || type == dEvent.HEFSEK_THARA){
				if (type==dEvent.FLOW_START_NIGHT){
					s_event = "raia0-"
				}else if(type==dEvent.FLOW_START_DAY){
					s_event =  "raia1-" 
				}else{
					s_event =  "hefsek-"
				}
				$("btn_delete_event").style.display = "block"	
				$("btn_delete_event").onclick = function(){		
					Cookie.set("event",Cookie.get("event").replace(s_event + CURR_HDN+"!",""),365)
					calc_event()
				}
				$("btn_create_raia").style.display = "none"
				$("btn_create_hefsek").style.display = "none"
			}
			if (type == dEvent.SEVEN_NEKIIM ){
				$("btn_create_raia").style.display = "none"
			}
			if (type == dEvent.FLOW_IN ){
				$("btn_create_raia").style.display = "none"
				$("btn_create_hefsek").style.display = "none"
			}
			
			$("s3").innerHTML += "today ona :"+ ona +" type:"+ type + " hdn : " + hdn + " caller :" + caller
			$("s3").style.display = "block"
			
		}		
	}
}
function show_create_event_dialog(step){
	if (step == "1"){
		$("s2").style.display = "none"
		$("s1").style.display = "block"
	}else if(step=="2"){
		$("s1").style.display = "none"
		$("s2").style.display = "block"
	}
}

function create_raia(f){
	oPref = Pref()
	for (var i=0;(elm = f.elements[i]);i++){	if (elm.checked){		Curr = elm.value		}	}
	ona = 0
	if (Curr == "2"){ ona = 1}
	curr_ona 	= "raia"+ona+"-"+$("sHdn").value+"!"
	evts 		= Cookie.get("event").replace(curr_ona,"")
	Cookie.set("event",evts+curr_ona,365)
	
	calc_event()
	
	show_create_event_dialog("2")

	GD = new GDate(parseInt($("sHdn").value)+4)
	HD = new HDate(GD)
	sGDate = GD.getDay() +"-" + GD.getMonthName(oPref.language)+ "-" + GD.getYear()
	sHDate = HD.getDay() +"-" + HD.getMonthName(oPref.language)+ "-" + HD.getYear()
	sDate = sGDate +" " + sHDate
	
	$("hefsek_date").innerHTML 	= sDate
	$("sHdn").value 			= GD.m_hdn
	
	$("dialog-date").innerHTML 	= sDate
	$("sDate").innerHTML 		= sDate
}
function create_hefsek(){
	hfsk = "hefsek-"+$("sHdn").value+"!"
	evts 		= Cookie.get("event").replace(hfsk,"")
	Cookie.set("event",evts+hfsk,365)
	$("dialog").style.display = "none"
	calc_event()
}

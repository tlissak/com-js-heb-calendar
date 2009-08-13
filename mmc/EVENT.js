// JavaScript Document
function _j(e,elm){
	oPref = Pref()
	aDay = parseInt(elm.id.replace("j_","").replace("jm_",""))
	pos = cursorPosition(e)	
	
	GD  = new GDate(aDay)
	HD  = new HDate(GD)	
	cj = GD.getDay()
	cm = GD.getMonth()
	cy = GD.getYear()	
	jEvent = new JEvent(HOLIDAYS.currentHoliday(HD))
	
	zmanim = HD.getZmanim(oPref.city,oPref.time_adj)	
	parasha = HD.getParashaName(oPref.bIsrael,oPref.bIsrael)
		 
	$("j").style.display 	= "block"
	$("j").style.top 		= pos.y+"px"
	$("j").style.left 		= pos.x+"px"
	
	
	$("gd").innerHTML = cj +"."+ cm+"."+cy
	$("cd").innerHTML = cj +" "+  GD.getMonthName() +" "+cy
	$("hd").innerHTML = HD.getDay() +" "+  HD.getMonthName() +" "+ HD.getYear()
	
	if (jEvent.name){
		$("holiday").style.display 	= "block"	
		$("hdd").innerHTML = jEvent.name
	}else{
		$("holiday").style.display 	= "none"		
		$("hdd").innerHTML = ""
	}
	if (GD.getDayOfWeek()==6){
		$("shabat").style.display 	= "block"
		$("pn").innerHTML 	= parasha
	}else{
		$("pn").innerHTML 	= ""
		$("shabat").style.display 	= "none"
	}
	
	$("s_st").innerHTML = zmanim.knissatShabbat
	$("s_en").innerHTML = zmanim.motzeiShabbat
	
	$("sr").innerHTML = zmanim.hanetz
	$("ss").innerHTML = zmanim.shkia
	$("ct").innerHTML = zmanim.city.place
}

function create_ev(step){
	
	oPref = Pref()
	
	$("j").style.display = "none"
	sDate = $("gd").innerHTML
	
	aDate = sDate.split(".")
	
	GD = new GDate(aDate[0],aDate[1],aDate[2])
	_dow 	= GD.getWeekDayName()
	
	zmanim 	= GD.getZmanim(oPref.city,oPref.time_adj)
	_sr 	= zmanim.alot
	_ss		= zmanim.shkia
	
	
	if (step == "1"){
		$("s_time_zone").innerHTML = oPref.city +" (" +oPref.country  + ") DMC + "+ oPref.time_adj
		$("st1_dow1").innerHTML = _dow
		$("st1_dow2").innerHTML = _dow
		$("st1_dow3").innerHTML = _dow
		$("st1_d1").innerHTML = sDate
		$("st1_d2").innerHTML = sDate
		$("st1_d3").innerHTML = sDate
		$("st1_sr1").innerHTML = _sr
		$("st1_sr2").innerHTML = _sr
		$("st1_ss1").innerHTML = _ss
		$("st1_ss2").innerHTML = _ss
		$("step1").style.display = "block"
		$("step2").style.display = "none"
		$("step1").style.top = 200+"px"
		$("step1").style.left = 200+"px"
	}else if(step=="2"){ // hefsek
		$("hefsek_date").innerHTML 	= GD.getDay() +"." + GD.getMonth()+ "." + GD.getYear()
		$("hefsek_d").value 		= GD.m_hdn
		
		$("step1").style.display = "none"
		$("step2").style.display = "block"
		$("step2").style.top = 200+"px"
		$("step2").style.left = 200+"px"
	}else if(step=="9"){ // hefsek a partir de raia
		ht = new GDate(GD.m_hdn+4)
		$("hefsek_date").innerHTML 	= ht.getDay() +"." + ht.getMonth()+ "." + ht.getYear()
		$("hefsek_d").value 	= GD.m_hdn+4
		
		$("step1").style.display = "none"
		$("step2").style.display = "block"
		$("step2").style.top = 200+"px"
		$("step2").style.left = 200+"px"
	}
}
function create_raia(f){
	sDate = $("st1_d1").innerHTML
	aDate = sDate.split(".")
	
	_d = parseInt(aDate[0]) ; _m = parseInt(aDate[1]) ; _y = parseInt(aDate[2] )
	var GD = new GDate(_d,_m,_y)
	for (var i=0;(elm = f.elements[i]);i++){	if (elm.checked){		Curr = elm.value		}	}
	ona = 0
	if (Curr == "2"){ ona = 1}
	if (Curr == "3" ){	GD.add(1)	}
	
	curr_ona 	= "raia"+ona+"-"+GD.m_hdn+"!"
	evts 		= Cookie.get("event").replace(curr_ona,"")
	Cookie.set("event",evts+curr_ona,365)
	create_ev("9")
	calc_event()
}
function create_hefsek(){
	hfsk = "hefsek-"+$("hefsek_d").value+"!"
	evts 		= Cookie.get("event").replace(hfsk,"")
	Cookie.set("event",evts+hfsk,365)
	$("step2").style.display = "none"
	calc_event()
}

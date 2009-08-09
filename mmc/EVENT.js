// JavaScript Document

function create_ev(step){
	$("j").style.display = "none"
	sDate = $("gd").innerHTML
	aDate = sDate.split(".")
	GD = new GDate(aDate[0],aDate[1],aDate[2])
	_dow 	= GD.getWeekDayName()
	
	timezone = getTimeZone()
	
	zmanim 	= GD.getZmanim(timezone.city,timezone.time_dmc)
	_sr 	= zmanim.alot
	_ss		= zmanim.shkia
	
	
	if (step == "1"){
		$("s_time_zone").innerHTML = timezone.city +" (" +timezone.country  + ") DMC + "+ timezone.time_dmc
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
	}
}
var ONA = new Array()
function create_raia(f){
	sDate = $("st1_d1").innerHTML
	aDate = sDate.split(".")
	
	_d = parseInt(aDate[0]) ; _m = parseInt(aDate[1]) ; _y = parseInt(aDate[2] )
	var GD = new GDate(_d,_m,_y)
	for (var i=0;(elm = f.elements[i]);i++){	if (elm.checked){		Curr = elm.value		}	}
	ona = 0
	if (Curr == "2"){ ona = 1}
	if (Curr == "3" ){	GD.add(1)	}
	
	
	c(ona+"-"+GD.m_hdn )
}

function _j(e,i,j){
	pos = cursorPosition(e)
	cm = i+1	
	cj = j+1	
	cy = (new Date()).getFullYear()
	
	GD  = new GDate(cj,cm,cy)
	HD  = new HDate(GD)	
	timezone = getTimeZone()
	
	
	
	jEvent = new JEvent(HOLIDAYS.currentHoliday(HD))
	
	zmanim = HD.getZmanim(timezone.city,timezone.time_dmc)	
	parasha = HD.getParashaName(timezone.is_israel,timezone.is_israel)
		 
	
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
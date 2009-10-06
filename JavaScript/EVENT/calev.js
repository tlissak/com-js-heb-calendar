// JavaScript Document


function _j(e,elm_id){
	oPref = Pref()
	$('dialog').style.top = cursorPosition(e).y + "px"
	$('dialog').style.left = cursorPosition(e).x + "px"
	$('dialog').style.display="block"	
	_hdn = parseInt(elm_id.replace("j_","").replace("jm_",""))
	GD = new GDate(_hdn)
	HD = new HDate(GD)
	$("sHdn").value = _hdn
	ZM = HD.getZmanim(CITY[oPref.city])
	output = " Civil date : "+GD +" <br/> Hebrew date : " + HD + " <br/><br/>" 
	output += " alot posna : " + timeadj1(ZM.alot_posna) + " <br/> alot rav ovadia : " + timeadj1(ZM.alot_ovadia) 
	output += "<br/> sunset :"+  timeadj1(ZM.sunset)
	
	$("sDayMsg").innerHTML = output
	
}
function add_reminder(x){
	console.log("add_rreminder",x)
}

function print_ves(cal){
	for (ves in cal._veses){
		ona		= cal._veses[ves]._onah -1
		raia 	= cal._veses[ves]._reeyah
		hefsek 	= cal._veses[ves]._hefsek
		ht_conf = cal._veses[ves]._hefsek_confirmed
		mikve	= cal._veses[ves]._mikvah
		mk_conf = cal._veses[ves]._mikvah_confirmed
		
		print_to_el(raia.m_hdn,ona,"flow_s")
		DEVENT.push([raia.m_hdn,ona])
		for (var _j=raia.m_hdn+1;_j<=hefsek.m_hdn;_j++){
			print_to_el(_j,0,"flow_in")
			print_to_el(_j,1,"flow_in")
			DEVENT.push([_j,0])
			DEVENT.push([_j,1])
		}
		if (ht_conf){
			print_to_el(hefsek.m_hdn,1,"hefsek")
		}else{
			print_to_el(hefsek.m_hdn,1,"hefsek_un")
		}
		DEVENT.push([hefsek.m_hdn,1])
		for (var _j=hefsek.m_hdn+1;_j<mikve.m_hdn;_j++){
			print_to_el(_j,0,"seven_nekiaim")
			print_to_el(_j,1,"seven_nekiaim")
			DEVENT.push([_j,0])
			DEVENT.push([_j,1])
		}
		if (mk_conf){
			print_to_el(mikve.m_hdn,0,"mikve")
		}else{
			print_to_el(mikve.m_hdn,0,"mikve_un")
		}
		DEVENT.push([mikve.m_hdn,1])
	}
}
function print_evt(cal){
	for (ev in cal._events){
		//ona		= cal._veses[ves]._onah -1
		veses 	= cal._events[ev]._veses
		type 	= cal._events[ev]._type
		date	= cal._events[ev]._date
		ves_o 	= veses._onah -1
		chode_o	= cal._events[ev].chodesh_onah() -1
		if (type==6){
			print_to_el(date.m_hdn,0,"ona_benonit")
			print_to_el(date.m_hdn,1,"ona_benonit")
			DEVENT.push([date.m_hdn,0])
			DEVENT.push([date.m_hdn,1])
			/* print info from veses */
		}else if(type==5){ 
			//console.log(date.m_hdn,chode_o,"veset_hodesh")
			print_to_el(date.m_hdn,chode_o,"veset_hodesh")
			DEVENT.push([date.m_hdn,chode_o])
		}else if(type==7){
			print_to_el(date.m_hdn,ves_o,"veset_haflaga")
			DEVENT.push([date.m_hdn,ves_o])
		}else if(type==8){
			print_to_el(date.m_hdn,ves_o,"kevuah")
			DEVENT.push([date.m_hdn,ves_o])
		}		
	}
}
function delete_ev(){
	if (DEVENT.length == -1){return /* nothing to clean */}
		for (var i=0;i<DEVENT.length;i++){
			if ($("jm_"+ DEVENT[i][0] +"_" +DEVENT[i][1] )){
				$("jm_"+ DEVENT[i][0] +"_" +DEVENT[i][1] ).innerHTML = "" ;	
			}
			if ($("j_"+ DEVENT[i][0] +"_" +DEVENT[i][1] )){
				$("j_"+ DEVENT[i][0] +"_" +DEVENT[i][1] ).innerHTML = "" ;	
			}
		}	
}
function e_add(_hdn,_cause,_h,_m,conf){
	oLocation 	= CITY[$("sCity").value]
	oDate		= new HDate(_hdn)
	oTime		= {hr:parseInt(_h),mn:parseInt(_m)}
	Cause		= parseInt(_cause)
	
	
	
	new_veses(oDate,oTime,Cause,oLocation)
	Cal_Veses._veses[Cal_Veses._veses.length-1].confirm_hefsek(Cal_Veses)
	
	
}
DEVENT = new Array()
function calc_event(){
	oCal = Cal_Veses
	delete_ev()	
	DEVENT = new Array()
	print_ves(oCal)
	print_evt(oCal)	
}
function print_to_el(_hdn,_ona,_class){
	//console.log("priniting",_hdn,_ona,_class)
	if ($("jm_"+_hdn+"_"+_ona)){
		a_gl_ev = "<a href='#' title=\"#\" >&nbsp;</a>"
		$("jm_"+_hdn+"_"+_ona).innerHTML += "<div class='has-cal-event "+_class+"' >"+ a_gl_ev +"</div>"
	}
	if ($("j_"+_hdn+"_"+_ona)){
		$("j_"+_hdn+"_"+_ona).innerHTML += "<span class='"+_class+"' ></div>"
	}
}
var Calev = new Array()
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
	
	output = _("civil_date") +" : "+GD +" <br/> "+ _("hebrew_date") +" : " + HD + " <br/><br/>" 
	output += _("sunrise") +" : " + timeadj1(ZM.sunrise) 
	output += "<br/> "+ _("sunset") +" :"+  timeadj1(ZM.sunset)
	
	$("sDayMsg").innerHTML = output
	
}
function add_reminder(x){
	console.log("add_rreminder",x)
}
function move_ht(ves_id,cnt){
	Cal_Veses._veses[parseInt(ves_id)]._hefsek.add(cnt)
	calc_event()	
}
function print_ves(cal){
	for (ves in cal._veses){
		ves_id = parseInt(ves)
		VESET	= cal._veses[ves]
		ona		= VESET._onah -1
		raia 	= VESET._reeyah
		hefsek 	= VESET._hefsek
		ht_conf = VESET._hefsek_confirmed
		mikve	= VESET._mikvah
		mk_conf = VESET._mikvah_confirmed
		next_ves = cal._veses[ves_id+1] ? cal._veses[ves_id+1] : null
		
		/**************************/
		/*	add bad_mikve 
		/*  print mikveh dow 
		***************************/
		
		/* FERIFY Whay original night only ????*/
		if(VESET._cause==4||VESET._cause==5){
			print_to_el(raia.m_hdn,ona,"flow_s",_("flow_1"))
		}else if(!VESET.goesOnCalendar()){
			print_to_el(raia.m_hdn,ona,"flow_s",_("flow_2"))		
		}else{
			print_to_el(raia.m_hdn,ona,"flow_s",_("flow"))
		}
		
		
		DEVENT.push([raia.m_hdn,ona])
		
		for (var _j=raia.m_hdn+1;_j<=hefsek.m_hdn;_j++){
			print_to_el(_j,0,"flow_in",_("flow"))
			print_to_el(_j,1,"flow_in",_("flow"))
			DEVENT.push([_j,0])
			DEVENT.push([_j,1])
		}
		
		
		
		if (ht_conf){
			if(raia._onah==_DAY_){ /* VERIFY NESSECERY */ 
				if(!raia.goesOnCalendar()){
					print_to_el(hefsek.m_hdn,1,"hefsek",_("ht_1"))
				}else{
					print_to_el(hefsek.m_hdn,1,"hefsek",_("ht_2")) 
				}
			}else{
				print_to_el(hefsek.m_hdn,1,"hefsek",_("ht")) 
			}
		}else{
			same_day = VESET._reeyah.m_hdn == VESET._hefsek.m_hdn
			four_day = VESET._hefsek.m_hdn - VESET._reeyah.m_hdn  == 3
			_html = ""
			if (!(same_day) && !(four_day)){
				_html = "<span onclick='move_ht("+ves_id+",-1)' class='pointer' >&laquo;- </span>"				
			}			
			_html +="<span onclick='confirm_HT_dialog("+ves_id+")' class='pointer' >"+_("ht_0")+"</span>"
			_html +="<span onclick='move_ht("+ves_id+",1)' class='pointer' > -&raquo;</span>"
			print_to_el(hefsek.m_hdn,1,"hefsek",null,_html)
		}
		
		DEVENT.push([hefsek.m_hdn,1])
		
		if (ht_conf){
		
			copy_hefsek = hefsek.clone()
			for (var _j=hefsek.m_hdn+1;_j<mikve.m_hdn;_j++){
				cont = true
				current_day_of_white = copy_hefsek.add(1)
				if (next_ves){
					// if next raia inside 7 nequiim stop
					if (current_day_of_white.gt(next_ves._reeyah)){
						cont = false
					}else if(current_day_of_white.eq(next_ves._reeyah)){
						if (next_ves._reeyah._onah == _NIGHT_){
							cont = false	
						}else{
							print_to_el(_j,0,"seven_nekiaim",_("white_week"))
							DEVENT.push([_j,0])
							cont = false
						}
					}
				}		
				if (cont){
					print_to_el(_j,0,"seven_nekiaim",_("white_week"))
					print_to_el(_j,1,"seven_nekiaim",_("white_week"))
					DEVENT.push([_j,0])
					DEVENT.push([_j,1])
				}
			}
			if (cont){
				mikveh_before = mikve.m_hdn - 1
				print_to_el(mikveh_before,1,"mikve",_("mikve_prep"))
				print_to_el(mikve.m_hdn,0,"mikve",_("mikve"))
				DEVENT.push([mikveh_before,1])
				DEVENT.push([mikve.m_hdn,0])
			}	
		}// if hefesk_confirmed = true
	}//for (ves in veses)
}
function print_evt(cal){
	for (ev in cal._events){
		//ona		= cal._veses[ves]._onah -1
		veses 	= cal._events[ev]._veses
		type 	= cal._events[ev]._type
		date	= cal._events[ev]._date
		misc	= cal._events[ev]._misc
		ves_o 	= veses._onah -1
		chode_o	= cal._events[ev].chodesh_onah() -1
		
		/***************************
		*	TODO : print misc on haflaga
		*   misc < 100 and more then 100
		***************************/
		/* print more info from veses */
		
		if (type==6){
			print_to_el(date.m_hdn,0,"ona_benonit",_("ona_benonit"))
			print_to_el(date.m_hdn,1,"ona_benonit",_("ona_benonit"))
			DEVENT.push([date.m_hdn,0])
			DEVENT.push([date.m_hdn,1])
			
		}else if(type==5){ 
			print_to_el(date.m_hdn,chode_o,"veset_hodesh",_("veset_hodesh"))
			DEVENT.push([date.m_hdn,chode_o])
		}else if(type==7){
			print_to_el(date.m_hdn,ves_o,"veset_haflaga",_("veset_haflaga")+"."+ misc)
			DEVENT.push([date.m_hdn,ves_o])
		}else if(type==8){
			print_to_el(date.m_hdn,ves_o,"kevuah",_("kevuaa"))
			DEVENT.push([date.m_hdn,ves_o])
		}	else{
			throw("unknown event type to print")	
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
function confirm_HT_dialog(ves_id){
	if (confirm(_("confirm_hefsek_sucseed"))){
		confirm_HT(ves_id)
		calc_event()
	}
}
function confirm_HT(ves_id){
	Cal_Veses._veses[ves_id].confirm_hefsek(Cal_Veses)
}
function add_veses(_hdn,_cause,_h,_m,conf){
	oLocation 	= CITY[$("sCity").value]
	oDate		= new HDate(_hdn)
	oTime		= {hr:parseInt(_h),mn:parseInt(_m)}
	iCause		= parseInt(_cause)	
	new_veses(oDate,oTime,iCause,oLocation)
	calc_event()
	$('dialog').style.display="none"
}
function e_add(_hdn,_cause,_h,_m,conf){
	oLocation 	= CITY[$("sCity").value]
	oDate		= new HDate(_hdn)
	oTime		= {hr:parseInt(_h),mn:parseInt(_m)}
	iCause		= parseInt(_cause)
	
	new_veses(oDate,oTime,iCause,oLocation)
	Cal_Veses._veses[Cal_Veses._veses.length-1].confirm_hefsek(Cal_Veses)
	
	
}
DEVENT = new Array()
function calc_event(){
	oCal = Cal_Veses
	delete_ev()
	DEVENT = new Array()
	
	print_evt(oCal)		
	print_ves(oCal)	
}
function print_to_el(_hdn,_ona,_class,tt,xlm){
	xlm = xlm ? xlm : ""
	if ($("jm_"+_hdn+"_"+_ona)){
		$("jm_"+_hdn+"_"+_ona).innerHTML += xlm ? xlm : "<div class='has-cal-event "+_class+"' >"+ tt +"</div>"
	}
	if ($("j_"+_hdn+"_"+_ona)){
		$("j_"+_hdn+"_"+_ona).innerHTML += "<span class='"+_class+"' ></div>"
	}
}
var Calev = new Array()
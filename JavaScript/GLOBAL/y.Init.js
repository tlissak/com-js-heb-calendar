var RENDER_MONTH = {m:(new Date()).getMonth() +1,y:(new Date()).getFullYear()}
var Cal_Veses	= new calender

function popup(			){
	for (var _jx=0,strout ='';_jx<popup.arguments.length;_jx++){
		param = popup.arguments[_jx]
		if (typeof(param) == "string" || typeof(param) == "number"){
			if (BANK[param]){
				strout += " " + BANK[param]
			}else{
				strout += " " + param
			}
		}else{
			strout += " " + param.toString()
		}
	}
	console.log(strout)
}

BANK = new Array()
	BANK["no_future_date"] 	= 'You may not enter future dates, please either enter a valid jewish or secular date'
	BANK["later_raia_ex"] 	= ' can not be added since there is a later flow recorded on the '
	BANK["last_confirm"] 	= "You are attempting to add a New Flow without confirming that a Hefsek Taharah has been done for a flow start on the "
	BANK["please_confirm"] 	= ". Please close this box and confirm the date of your Hefesk Taharah before adding a new flow."
	BANK["onerror_call"] 	= "If this is not  an error and you are doing this on the advice and permission of your Orthodox rabbi, please email us or call our toll free "
							  +" number (1-866-908-2468) for detailed instructions on how to enter this information into the calendar and allow the program "
							  +" to function accordingly."
	BANK["inbetween_another"] = ') can not be recorded for a day inbetween another flow ('
	BANK["read_carefuly"] 	= "<h1 align='center'>Please read the following carefully</h1>"
	BANK["unclean_bedikah"]	= "You have entered an Unclean Bedikah during your Seven "
							  +"Preparatory days (after completing your Hefsek Taharah) on a date that is <b>after</b> seven days from the onset of your period ."
							  +" There is a difference of halachic opionion on how the calendar should be kept.</p><Br><p>Some Rabbanim maintain the opinion that an"
							  +" unclean bedikah occuring at this time is considered a New Flow. New calculations must then be made on the calendar. If you follow this "
							  +"opinion, please select \"Start of menstrual cycle\" from the drop down list of causes and the program will calculate accordingly."
							  +"</p><br><p>Other Rabbanim maintain the opinion that only an actual New Flow during this time requires new calculations."
							  +"  If you follow this opinion, please choose \"Stain found on white garment or body\" from the drop down list of causes and the"
							  +" program will calculate accordingly.</p><br><p align='center'>Please consult your rabbi to determine which opinion he wishes you "
							  +"to follow.</p>"
	// important !!			
	BANK["distance_90"] 	= "<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>New flow after large gap</div><Br>"
							 + "<table  width='98%' style='margin-left: -18px; margin-top: -18px;'><tr><td align='left' style='font-size:12px'>"
							 + "You have entered a New Flow that is 90 days or more from your last flow. If you are in the menopausal "
							 + " years you are not required to keep the Onot Haveset until you have three New Flows. Once you have had three New Flows," 
							 + " the laws of Onot Haveset must again be kept. If you are not in the menopausal years please consult a qualified rabbi "
							 + "to determine how your calendar should be kept.<br><br>Please note that it is recommended that a woman during the menopausal years,"
							 + "who is uncertain when her next New Flow will be, do a bedikah prior to intimacy until six months have passed with no cycle."
							 + "</td></tr></table>";
function Render(type,_oMonth){
	RENDER_MONTH = _oMonth ? _oMonth : RENDER_MONTH
	if(type == "minhag"){
		calc_event()	;return
	}else if(type == "left"){
		render_left_cal() ;	calc_event()	;return
	}else if(type == "times" || type == "dst"  ){
		render_times(RENDER_MONTH);
		return
	}else if(type == "big"){ 
		render_main_cal(RENDER_MONTH) ;
		render_times(RENDER_MONTH) ;
		calc_event() ; 
		return
	}else if(type == "load"){
	render_main_cal(_oMonth)
	render_left_cal()
	calc_event()
	show_event_index()	
	render_times(_oMonth)
	}else{
	alert("unknown type on Render(type,_oMonth) ."+type)	
	}
}
function ondone(){
	//_j({pageX:200,pageY:50},"j_2107067")	
}
Ev.add(window,"load",function(){
		
		
		setCitiesList()	
		
		Pref.load() // to set seleted things		
		
		/*
		ajax_load("change_log")
		ajax_load("contact")
		ajax_load("guide_"+oPref.language)
		ajax_load("mikveh-list")
		ajax_load("glossery")
		*/
		ajax_load("dialog",ondone)
		
		
		
		$("refresh").href = "?rnd="+Math.random()		
		/*
		if (Cookie.get("init") != "true"){
			$("welcome").style.display = "block"
			$("menu").style.display = "block"
		}
		*/
		
		
		
		Ev.add($("t_today"),"click",function(){	Render("big",{m:(new Date()).getMonth()+1,y:(new Date()).getFullYear()})	})
		//*
		e_add((new GDate(28,3,2009)).m_hdn,0,9,30,true)
		e_add((new GDate(24,4,2009)).m_hdn,0,9,30,true)
		e_add((new GDate(21,5,2009)).m_hdn,0,9,30,true)		
		e_add((new GDate(18,6,2009)).m_hdn,0,9,30,true)
		e_add((new GDate(14,7,2009)).m_hdn,0,9,30,true)
		e_add((new GDate(9,8,2009)).m_hdn,0,9,30,true)		
		//console.error("confirmed",print_x())		
		e_add((new GDate(14,8,2009)).m_hdn,3,15,30)
		e_add((new GDate(6,9,2009)).m_hdn,0,8,30)
		e_add((new GDate(11,9,2009)).m_hdn,3,15,30)
		//console.warn("results",print_x())
		/*
		/*
		move_unconfirmed_ht()
		*/
		/*Render("load",RENDER_MONTH)
		
		calc_event()
		
		ev = top.frames[1].cal._events;
			for (d in ev){
				console.log(ev[d]) ;
			}
					/**/
		//*/
		//console.log("results ----------------------- \n",Cal_Veses._events)
})
function get_type(dd){
	if (dd._type == 6){
		xtp =  " BN " 
	}else if(dd._type==5){
		xtp = " CH " 
	}else if(dd._type == 7){
		xtp = " HF "  
	}
	return xtp + dd._date.getDay() + " " + dd._date.getMonthName()	
}
function print_x(psd){
	ev = Cal_Veses._events
	str_o =""
	psd = psd ? " ["+psd+"]" : ""
	for (sd in ev){
		str_o += "(" +get_type(ev[sd]) +" ). "
	}
	return psd +str_o
	
	
}
function move_unconfirmed_ht(){
	cal=oCal;
	if(cal._veses.length>0&&!cal._veses[cal._veses.length-1]._hefsek_confirmed){
		v=cal._veses[cal._veses.length-1];
		var date=v._hefsek.clone();
		date._m=cal._selected_month;
		date._y=cal._selected_year;
		date._d=1;
		earliest_ht_date=v.getEarliestHtDate();
		if(date.is_later_then(v._reeyah)){
			if(earliest_ht_date.gt(date))
				date=earliest_ht_date;
			var mikvah=date.clone().add(8);
			v._hefsek=date;
			v._mikvah=mikvah;
			refresh();
			return true;
		}
		if(date._m==v._reeyah._m&&date._y==v._reeyah._y){
			date=earliest_ht_date;
			var mikvah=date.clone().add(8);
			v._hefsek=date;
			v._mikvah=mikvah;
			refresh();
			return true;
		}
	}
	return false;
};

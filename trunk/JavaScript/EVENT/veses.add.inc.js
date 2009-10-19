Veses.post_add = function(_veses){	
	var Kav	= new Kevua(_veses); //	console.warn(Kav,Kav.establish)
	if (!Kav.establish){
		if(Veses.has_large_distance(_veses)){
			alert( _( "distance_90"	))
		}
	}	
	if(_veses.StartedInWhiteWeek()){
		alert("the raia is inside 7 nequiim !")
	}else if(!Kav.establish){ 
		//alert("new_veses_added")
	}else if(Kav.establish){
		alert(Kav.msg)//,kavuah_text
	}
	return true;	
}
Veses.has_large_distance = function(_veses){
	vCause = _veses._cause
	var last_veses=_veses.get_prev_veses();
	while(last_veses!=null&&!last_veses.goesOnCalendar() ){		last_veses=last_veses.get_prev_veses();	}
	if(   (vCause==Cause.start||vCause==Cause.start_1)  &&last_veses!=undefined&&last_veses!=null){
		var last_r=last_veses._reeyah.clone().add(90);
		last_nidah=_veses.get_prev_veses();
		ln_cause = last_nidah._cause
			if(_veses._reeyah.gt(last_r)&&ln_cause!=Cause.birth_s&&ln_cause!=Cause.birth_d&&ln_cause!=Cause.preglost){
				return true
			}
	}
	return false
}
Veses.conserve_old_events =function(_veses){	// get older events . dispose benonit
	var events=new Array();
	vOna 	= _veses._onah
	vRaia 	= _veses._reeyah	
	for(i in Cal_Veses._events){		
		cEv				= Cal_Veses._events[i]
		cEv_veses		= cEv._vese
		cEv_type 		= cEv._type
		cEv_ona  		= cEv._onah
		cEv_date 		= cEv._date
		cEv_deletable 	= cEv._deletable		
		b_same_day		= ( vRaia.eq(cEv_date) && (vOna==_NIGHT_ || cEv_ona==_DAY_) )		
		if((cEv_type==_HAFLAGAH_)  && 	(! vRaia.gt(cEv_date) || b_same_day )	&& cEv_deletable ){			
		}else if(cEv_type==_BENONIS_&& cEv_veses != _veses	&& ! vRaia.gt(cEv_date)){			
		}else{ 
			events.push(cEv);
		}
	}
	return events
}
Veses.conserve_veses_haflaga = function(_veses){
	a_Haflaga = new Array()
	var last_veses=_veses.get_prev_veses(Cal_Veses);
	while(last_veses!=null&&!last_veses.goesOnCalendar() ){		last_veses=last_veses.get_prev_veses(Cal_Veses);	}
	
	if(last_veses!=undefined
	   &&last_veses!=null
	   &&last_veses._haflagas
	   !=undefined
	   &&_veses.goesOnCalendar() ){
		var xc=-2;
		var xd=last_veses._hefsek.clone();
		while(!xd.eq(_veses._reeyah)){
			xc+=2;
			xd.nextDay();
		}
		if(_veses._onah==_NIGHT_){
			xc+=1;
		}else/* if(veses._onah==_DAY_)*/{
			xc+=2;
		}/*else {	throw('There was an error building your calendar, please report a bug with bug code 832')}*/
		var current_repeats=1;
		var check_for_haflagas_not_passed_clean_due_to_kessem=false;
		var last_veses_from_any_cause=_veses.get_prev_veses();
		for(i in last_veses._haflagas){
			var xx=Number(last_veses._haflagas[i][0]);
			var repeats=Number(last_veses._haflagas[i][1]);
			if(xx>xc){
				new_haflaga = new Array(xx,repeats,last_veses._haflagas[i][2])
				a_Haflaga.push(new_haflaga);
			}else if(xx==xc){
				current_repeats=repeats+1;
			}else if(last_veses_from_any_cause!=last_veses){
				check_for_haflagas_not_passed_clean_due_to_kessem=true;
			}
		}
		xnew_haflaga = new Array(xc,current_repeats,_veses)
		a_Haflaga.push(xnew_haflaga);
	}else if(_veses._cause!=Cause.birth_s
			 &&_veses._cause!=Cause.birth_d
			 &&(_veses._cause!=Cause.preglost||_veses.goesOnCalendar())){
		a_Haflaga = new Array();
	}
	
	last_nidah=_veses.get_prev_veses();
	
	if(last_nidah!=null&&last_nidah._cause>Cause.unclean&&last_nidah._cause<Cause.start_1){	
		a_Haflaga=new Array();	
	}
	return a_Haflaga
}
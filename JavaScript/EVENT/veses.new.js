function time2min(_otime){	hr=parseInt(_otime.hr);	minute=parseInt(_otime.mn);	return parseFloat(hr +"."+ parseInt(	(minute*100	)/60));}
function time2time(_time){_hour=parseInt(_time.hr);_min=parseInt(_time.mn);return parseFloat(_hour + '.' + ((_min < 10) ? '0' : '') + _min)}
function fixzman(_time){
	var _hour = Math.floor(_time);	var _min  = Math.floor((_time - _hour) * 60.0 + 0.5 );
	if(_min >= 60) { _hour += 1;  _min  -= 60;  }	if(_hour < 0){	_hour += 24;}
	return parseFloat(_hour + '.' + ((_min < 10) ? '0' : '') + _min) ;
}
function new_veses(date,time,cause,location,onah){
	msg = "new_veses_added"
	
	var now= new GDate(); //if(date.gt(now)){	popup("no_future_date");	return false;}	
	var veses;
	var t=time2time(time);	
	var end_shkiah		=	fixzman(date.getZmanim(location).sunset)
	var netz			=	fixzman(date.getZmanim(location).sunrise)	
	var onah=_NIGHT_;		//
	if(t>netz&&t<end_shkiah){		
		onah=_DAY_;
	}	//console.log("ona",onah-1,"t>netz && t<end_shkiah","t",t,"netz",netz,"shkia",end_shkiah)	
	veses=new Veses(date,time,onah,cause);	
	for(i in Cal_Veses._veses){
		if(Cal_Veses._veses[i]._reeyah.gt(veses._reeyah)){
			popup("A new flow for",veses._reeyah,"later_raia_ex",Cal_Veses._veses[i]._reeyah);	return false;
		}
	}	
	var last_veses=veses.get_prev_veses(Cal_Veses);
	if(last_veses!=undefined&&last_veses.goesOnCalendar())	{
		if(last_veses._hefsek_confirmed==false)	{	/* adding new flow without confirmation of the last flow hefsek */
			popup("last_confirm" ,last_veses._reeyah ,"please_confirm"  ,"onerror_call");	
			return false;
		}else if(!veses._reeyah.gt(last_veses._hefsek)){
			popup("A new flow ("	,veses._reeyah,"inbetween_another"	,last_veses._reeyah	,') and Hefsek Taharah(',last_veses._hefsek,').');	
			return false;
		}
		iterator=last_veses._reeyah.clone();count=1;max_count = 100 /* 5000 */
		while(count<max_count&&!iterator.eq(veses._reeyah)){	count++;iterator.nextDay();	}
		
		if(cause==Cause.unclean&&last_veses.goesOnCalendar()&&count>7&&!veses._reeyah.gt(last_veses._mikvah)){
			popup("read_carefuly","unclean_bedikah");	
			return false;
		}
	}else if(last_veses!=undefined&&!last_veses.goesOnCalendar()&&!last_veses._hefsek_confirmed){
		veses._leadup_cause=last_veses._cause;
		veses._leadup_onah=last_veses._onah;
		veses._leadup_date=last_veses._reeyah;
		days_already_red=1;
		kessem=last_veses._reeyah.clone();
		while(veses._reeyah.gt(kessem)){
			days_already_red++;
			kessem.nextDay();
		}
		veses._hefsek=veses._reeyah.clone();
		days_till_min_ht=5-days_already_red;
		if(days_till_min_ht>0){
			veses._hefsek.add(days_till_min_ht);
		}
		Cal_Veses.vestos_db.pop();// rebuild_vestos(Cal_Veses);
	}	
	veses._cause=cause;
	var last_veses=veses.get_prev_veses(Cal_Veses);
	//**********************	BUGY	*******************************
	while(last_veses!=null&&!last_veses.goesOnCalendar() ){last_veses=last_veses.get_prev_veses(Cal_Veses);}
	if(last_veses!=undefined&&last_veses!=null&&last_veses._haflagas!=undefined&&veses.goesOnCalendar()){
		veses._haflagas=new Array();
		var c=-2;
		var d=last_veses._hefsek.clone();
		while(!d.eq(veses._reeyah)){
			c+=2;
			d.nextDay();
		}
		if(veses._onah==_NIGHT_){
			c+=1;
		}else/* if(veses._onah==_DAY_)*/{
			c+=2;
		}
		//else {	throw('There was an error building your calendar, please report a bug with bug code 832')}
		var current_repeats=1;
		var check_for_haflagas_not_passed_clean_due_to_kessem=false;
		var last_veses_from_any_cause=veses.get_prev_veses(Cal_Veses);
		for(i in last_veses._haflagas){
			var x=Number(last_veses._haflagas[i][0]);
			var repeats=Number(last_veses._haflagas[i][1]);
			if(x>c){
				new_haflaga = new Array(x,repeats,last_veses._haflagas[i][2])
				veses._haflagas.push(new_haflaga);
			}else if(x==c){
				current_repeats=repeats+1;
			}else if(last_veses_from_any_cause!=last_veses){
				check_for_haflagas_not_passed_clean_due_to_kessem=true;
			}
		}
		xnew_haflaga = new Array(c,current_repeats,veses)
		veses._haflagas.push(xnew_haflaga);
	}else if(veses._cause!=Cause.birth_s&&veses._cause!=Cause.birth_d&&(veses._cause!=Cause.preglost||veses.goesOnCalendar())){
		veses._haflagas=new Array();
	}
	last_nidah=veses.get_prev_veses(Cal_Veses);
	if(last_nidah!=null&&last_nidah._cause>Cause.unclean&&last_nidah._cause<Cause.start_1){	
		veses._haflagas=new Array();	
	}
	Cal_Veses._veses.push(veses);
	//veses_dbx = new Array(veses._id,veses._reeyah,veses._time,veses._onah,veses._hefsek,veses._cause,Cal_Veses,veses._leadup_cause,veses._leadup_date,veses._leadup_onah)
	//Cal_Veses.vestos_db.push(ceses_dbx); get older events but dispose benonit	
	if(veses.goesOnCalendar()){
		var events=new Array();
			for(i in Cal_Veses._events){		
				if((Cal_Veses._events[i]._type==_HAFLAGAH_)
				&&(!veses._reeyah.gt(Cal_Veses._events[i]._date)
				||(veses._reeyah.eq(Cal_Veses._events[i]._date)&&(veses._onah==_NIGHT_||Cal_Veses._events[i]._onah==_DAY_)))
				&&Cal_Veses._events[i]._deletable){;}
				else if(Cal_Veses._events[i]._type==_BENONIS_&&Cal_Veses._events[i]._veses!=veses&&!veses._reeyah.gt(Cal_Veses._events[i]._date));
				else{ 
					events.push(Cal_Veses._events[i]);
				}
			}
		Cal_Veses._events=events;
		var benonis=date.clone().add(29);
		ben_ev = new Event(benonis,_BENONIS_,veses)
		Cal_Veses._events.push(ben_ev);
		var chodesh=date.clone().nextMonth();
		if(date.getDay()==30&&	chodesh.getMonthLength()==29){;
			
		}else{ 
			chodesh_ev = new Event(chodesh,_CHODESH_,veses)
			Cal_Veses._events.push(chodesh_ev);
		}
	}
	// if(!isNew){	veses.confirm_hefsek(Cal_Veses,false);}
	var new_kavuah=find_kavuah(veses,Cal_Veses);
	
	if(!new_kavuah&&
	   (veses._cause==Cause.start||veses._cause==Cause.start_1)
	   &&last_veses!=undefined&&last_veses!=null){
		var last_r=last_veses._reeyah.clone().add(90);
		last_nidah=veses.get_prev_veses(Cal_Veses);
			if(veses._reeyah.gt(last_r)&&last_nidah._cause!=Cause.birth_s&&last_nidah._cause!=Cause.birth_d&&last_nidah._cause!=Cause.preglost){
				msg = "distance_90"
			}
	}	
	if(veses.StartedInWhiteWeek(Cal_Veses)){		//reeyah_in_white_week_popup(veses);
			popup("the raia is inside 7 nequiim !")
	}else if(!new_kavuah){ 
			popup(msg)
	}else if(new_kavuah){
			popup("new_kavua establish",kavuah_text)
	}

	return true;
}
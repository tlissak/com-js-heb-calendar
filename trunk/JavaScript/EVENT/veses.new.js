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
			vmsg.later_raia(veses._reeyah,Cal_Veses._veses[i]._reeyah);	
			return false;
		}
	}	
	var last_veses=veses.get_prev_veses(Cal_Veses);
	
	if(last_veses!=undefined && last_veses.goesOnCalendar())	{
		if(last_veses._hefsek_confirmed==false)	{
			vmsg.hefsek_unconfirm(last_veses._reeyah)
			return false;
		}else if(!veses._reeyah.gt(last_veses._hefsek)){
			vmsg.raia_inbetween_another(veses._reeyah,last_veses._reeyah,last_veses._hefsek);	
			return false;
		}
		iterator=last_veses._reeyah.clone();count=1;max_count = 100 /* 5000 */
		while(count<max_count&&!iterator.eq(veses._reeyah)){	count++;iterator.nextDay();	}
		
		if(cause==Cause.unclean&&last_veses.goesOnCalendar()&&count>7&&!veses._reeyah.gt(last_veses._mikvah)){
			vmsg.bedika_in_whiteweek_greater_then_seven();	
			return false;
		}
	}else if(last_veses!=undefined && !last_veses.goesOnCalendar()&&!last_veses._hefsek_confirmed){
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
	
	
	veses._haflagas = conserve_veses_haflaga(veses)
	
	Cal_Veses._veses.push(veses);
	//veses_dbx = new Array(veses._id,veses._reeyah,veses._time,veses._onah,veses._hefsek
							//,veses._cause,Cal_Veses,veses._leadup_cause,veses._leadup_date,veses._leadup_onah)
	//Cal_Veses.vestos_db.push(veses_dbx);	
	if(veses.goesOnCalendar()){
		
		Cal_Veses._events = get_older_events(veses) ;
		
		var benonis=date.clone().add(29);
		E_benonis = new Event(benonis,_BENONIS_,veses)
		Cal_Veses._events.push(E_benonis);
		
		var chodesh=date.clone().nextMonth();
		if(date.getDay()==30 &&	chodesh.getMonthLength()==29){;
			
		}else{ 
			E_chodesh = new Event(chodesh,_CHODESH_,veses)
			Cal_Veses._events.push(E_chodesh);
		}
	}
	
	var new_kavuah	=	check_kavuah(veses);
	
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
			popup("new_kavua_establish",kavuah_text)
	}

	return true;
}
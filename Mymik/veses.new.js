function load_veses(id,start_date,start_time,onah,hefsek_date,cause,cal,haflagah,chodesh,leadup_cause,leadup_date,leadup_onah){
	var add_chodesh_dates = function(cal,chodesh,reeyah){
		if(chodesh.length<3)return;
		chodesh_array=chodesh.split(',');
		for(i in chodesh_array){
			var temp=chodesh_array[i].split('(');
			temp[0]=temp[0].replace(' ','');
			var day_of_mo=Number(temp[0]);
			temp[1]=temp[1].replace(' ','');
			temp[1]=temp[1].replace(')','');
			var date=reeyah.clone();
			if(day_of_mo<date.getDay()||(day_of_mo==date.getDay()&&temp[1]=='night'))
				date.next_mo();
			date.getDay()=day_of_mo;
			e=new Event(date,_CHODESH_,null);
			e._onah=_NIGHT_;
			if(temp[1]=='day')
				e._onah=_DAY_;
			if(date.getDay()<=lastDayOfHebrewMonth(date._m,date._y))
				cal._events.push(e);
		}
	}
	if(chodesh!=undefined&&chodesh!=null&&chodesh!='')
		add_chodesh_dates(cal,chodesh,start_date);
		time_array=time(start_time,false);
		ampm='pm';
	if(time_array[2])
		ampm='am';
		new_veses(null,null,null,start_date.getDay(),start_date._m,start_date._y,String(time_array[0]),String(time_array[1]),ampm,cause,cal,true,false,null,onah);
		v=cal._veses[cal._veses.length-1];
		v._id=id;
		if(leadup_date!==undefined&&leadup_date!=null&&leadup_date!='null'&&leadup_date!='0'){
			v._leadup_cause=leadup_cause;
			v._leadup_onah=leadup_onah;
			v._leadup_date=leadup_date;
			if(!v._hefsek_confirmed){
				days_already_red=1;
				kessem=leadup_date.clone();
				
				//---------------------------------------------------------
				while(v._reeyah.gt(kessem)){
					days_already_red++;
					kessem.nextDay();
				}
				//--------------------------------------------------------
				
				v._hefsek=v._reeyah.clone();
				days_till_min_ht=5-days_already_red;
				if(days_till_min_ht>0)
					v._hefsek.add(days_till_min_ht);
			}
		}
	v.set_haflagah_list(haflagah);
	if(hefsek_date!=''&&hefsek_date!='null'){
		v._hefsek=hefsek_date;
		v.confirm_hefsek(cal,false);
	}
}
function new_veses(date,time,cause,cal,location,onah){
	// check oDate - oTime
	live_input = true
	var now= new GDate();
	//if(date.gt(now)){popup('You may not enter future dates, please either enter a valid jewish or secular date');return false;}	
	var veses;
	if(location!=undefined&&location!=null){
		var t=time2min(time);
		var end_shkiah=get_zman(date,3,location);
		var netz=get_zman(date,2,location);
		var onah;
		onah=_NIGHT_;
		if(t>netz&&t<end_shkiah){				onah=_DAY_;}
	}
	hr = time.hr
	min = time.min
	veses=new Veses(date,hr,min,onah,cause);
	
	for(i in cal._veses){
		if(cal._veses[i]._reeyah.gt(veses._reeyah)){
			popup('A new flow for '+veses._reeyah+' can not be added since there is a later flow recorded on the '+cal._veses[i]._reeyah);	return false;
		}
	}
	
	var last_veses=veses.get_prev_veses(cal);
	if(last_veses!=undefined)	{
		if(last_veses._hefsek_confirmed==false)	{
			/* adding new flow without confirmation of the last flow hefsek */
			popup("<p>You are attempting to add a New Flow without confirming that a Hefsek Taharah has been done for a flow start on the "
				  ,last_veses._reeyah
				  ,". Please close this box and confirm the date of your Hefesk Taharah before adding a new flow.</p><br><p>If this is not "
				  +" an error and you are doing this on the advice and permission of your Orthodox rabbi, please email us or call our toll free "
				  +" number (1-866-908-2468) for detailed instructions on how to enter this information into the calendar and allow the program "
				  +" to function accordingly.</p>");
			return false;
		}else if(!veses._reeyah.gt(last_veses._hefsek)){
			popup('A new flow ('
				,veses._reeyah
				,') can not be recorded for a day inbetween another flow ('
				,last_veses._reeyah
				,') and Hefsek Taharah('
				,last_veses._hefsek
				,').');
			return false;
		}
		
		iterator=last_veses._reeyah.clone();
		count=1;
		//******************************************************
		while(count<5000&&!iterator.eq(veses._reeyah)){
			count++;
			iterator.nextDay();
		}
		//********************************************************/
		if(live_input&&cause==Cause.unclean&&count>7&&!veses._reeyah.gt(last_veses._mikvah)){
			popup("<h1 align='center'>Please read the following carefully</h1><br><p>You have entered an Unclean Bedikah during your Seven "
			  +"Preparatory days (after completing your Hefsek Taharah) on a date that is <b>after</b> seven days from the onset of your period ."
			  +" There is a difference of halachic opionion on how the calendar should be kept.</p><Br><p>Some Rabbanim maintain the opinion that an"
			  +" unclean bedikah occuring at this time is considered a New Flow. New calculations must then be made on the calendar. If you follow this "
			  +"opinion, please select \"Start of menstrual cycle\" from the drop down list of causes and the program will calculate accordingly."
			  +"</p><br><p>Other Rabbanim maintain the opinion that only an actual New Flow during this time requires new calculations."
			  +"  If you follow this opinion, please choose \"Stain found on white garment or body\" from the drop down list of causes and the"
			  +" program will calculate accordingly.</p><br><p align='center'>Please consult your rabbi to determine which opinion he wishes you "
			  +"to follow.</p>","Important Note");
			return false;
		}
	}else if(last_veses!=undefined&&!last_veses._hefsek_confirmed){
		
		veses._leadup_cause=last_veses._cause;
		veses._leadup_onah=last_veses._onah;
		veses._leadup_date=last_veses._reeyah;
		days_already_red=1;
		kessem=last_veses._reeyah.clone();
		//*******************************************
		while(veses._reeyah.gt(kessem)){
			days_already_red++;
			kessem.nextDay();
		}
		//**********************************************/
		veses._hefsek=veses._reeyah.clone();
		days_till_min_ht=5-days_already_red;
		if(days_till_min_ht>0){
			veses._hefsek.add(days_till_min_ht);
		}
		/*
		$.post("ajax.php",{delVeses:last_veses._id});
		*/
		cal.vestos_db.pop();
		rebuild_vestos(cal);
	}
	
	veses._cause=cause;
	var last_veses=veses.get_prev_veses(cal);
	/******************************************************
	//			BUGY
	/*******************************************************
	while(last_veses!=null /*&&!veses.goesOnCalendar()*//*){
		last_veses=last_veses.get_prev_veses(cal);
	}
	**********************************************************/
	if(last_veses!=undefined&&last_veses!=null&&last_veses._haflagas!=undefined){
		veses._haflagas=new Array();
		var c=-2;
		var d=last_veses._hefsek.clone();
		//*******************************************
		while(!d.eq(veses._reeyah)){
			c+=2;
			d.nextDay();
		}
		//**********************************************/
		if(veses._onah==_NIGHT_){
			c+=1;
		}else if(veses._onah==_DAY_){
			c+=2;
		}else {
			alert('There was an error building your calendar, please report a bug with bug code 832 to My Mikvah Calendar');
		}
		var current_repeats=1;
		var check_for_haflagas_not_passed_clean_due_to_kessem=false;
		var last_veses_from_any_cause=veses.get_prev_veses(cal);
		for(i in last_veses._haflagas){
			var x=Number(last_veses._haflagas[i][0]);
			var repeats=Number(last_veses._haflagas[i][1]);
			if(x>c){
				veses._haflagas.push(new Array(x,repeats,last_veses._haflagas[i][2]));
			}else if(x==c){
				current_repeats=repeats+1;
			}else if(last_veses_from_any_cause!=last_veses){
				check_for_haflagas_not_passed_clean_due_to_kessem=true;
			}
		}
		veses._haflagas.push(new Array(c,current_repeats,veses));
	}else if(veses._cause!=Cause.birth_s&&veses._cause!=Cause.birth_d&&(veses._cause!=Cause.preglost/*||veses.goesOnCalendar()*/)){
		veses._haflagas=new Array();
	}
	
	last_nidah=veses.get_prev_veses(cal);
	if(last_nidah!=null&&last_nidah._cause>Cause.unclean&&last_nidah._cause<Cause.start_1){	
		veses._haflagas=new Array();	
	}
	cal._veses.push(veses);
	if(live_input){
		cal.vestos_db.push(new Array(
					veses._id
					,veses._reeyah
					,veses._time
					,veses._onah
					,veses._hefsek
					,veses._cause
					,cal
					,veses._leadup_cause
					,veses._leadup_date
					,veses._leadup_onah));
	}
	
	var events=new Array();
		for(i in cal._events){		
			if((cal._events[i]._type==_HAFLAGAH_)
			&&(!veses._reeyah.gt(cal._events[i]._date)
			||(veses._reeyah.eq(cal._events[i]._date)&&(veses._onah==_NIGHT_||cal._events[i]._onah==_DAY_)))
			&&cal._events[i]._deletable){;}
			else if(cal._events[i]._type==_BENONIS_&&cal._events[i]._veses!=veses&&!veses._reeyah.gt(cal._events[i]._date));
			else events.push(cal._events[i]);
		}
	cal._events=events;
	var benonis=date.clone().add(29);
	cal._events.push(new Event(benonis,_BENONIS_,veses));
	var chodesh=date.clone().nextMonth();
	if(date.getDay()==30&&	date.getMonthLength()==29){;
	}else{ 
		cal._events.push(new Event(chodesh,_CHODESH_,veses));
	}
		
	//if(live_input)refresh();
	//if(!isNew)	{	veses.confirm_hefsek(cal,false);	}else {
	if(live_input)	{
		var new_kavuah=find_kavuah(veses,cal);
		
		var popup_sent=false;
			if(!new_kavuah&&(veses._cause==Cause.start||veses._cause==Cause.start_1)&&last_veses!=undefined&&last_veses!=null){
				var last_r=last_veses._reeyah.clone();
				last_r.add(90);
				last_nidah=veses.get_prev_veses(cal);
					if(veses._reeyah.gt(last_r)&&last_nidah._cause!=Cause.birth_s&&last_nidah._cause!=Cause.birth_d&&last_nidah._cause!=Cause.preglost){
						popup_sent=true;
						str="<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>New flow after large gap</div><Br>"
						str += "<table  width='98%' style='margin-left: -18px; margin-top: -18px;'><tr><td align='left' style='font-size:12px'>"
						str +="You have entered a New Flow that is 90 days or more from your last flow. If you are in the menopausal "
						str +=" years you are not required to keep the Onot Haveset until you have three New Flows. Once you have had three New Flows," 
						str +=" the laws of Onot Haveset must again be kept. If you are not in the menopausal years please consult a qualified rabbi "
						str +="to determine how your calendar should be kept.<br><br>Please note that it is recommended that a woman during the menopausal years,"
						str +="who is uncertain when her next New Flow will be, do a bedikah prior to intimacy until six months have passed with no cycle.";
						str += "</td></tr></table>";
						//str+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),235);
						//setTimeout("new_popup_win(\""+str.replace(/"/g,"\\\"")+"\",'265','400')",2700);
					}
			}
		if(!popup_sent){
			if(veses.StartedInWhiteWeek(cal)){
				//reeyah_in_white_week_popup(veses);
				consoele.log(reeyah_in_white_week_popup(veses))
			}else if(!new_kavuah){ //Settings.getInstance()._explain&&
				//setTimeout("new_popup_win_explainer('R')",2700);
				// nada happening
				//
			}else if(new_kavuah){
				console.log("new_veses - new_kavua establish : ---",kavuah_text)
				//setTimeout("new_popup_win_explainer('kavuah')",2700);
			}
		}
	}
	return true;
}
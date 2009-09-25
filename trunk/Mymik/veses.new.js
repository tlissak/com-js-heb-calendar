function load_veses(id,start_date,start_time,onah,hefsek_date,cause,cal,haflagah,chodesh,leadup_cause,leadup_date,leadup_onah){
	if(chodesh!=undefined&&chodesh!=null&&chodesh!='')
		add_chodesh_dates(cal,chodesh,start_date);
		time_array=time(start_time,false);
		ampm='pm';
	if(time_array[2])
		ampm='am';
		new_veses(null,null,null,start_date._d,start_date._m,start_date._y,String(time_array[0]),String(time_array[1]),ampm,cause,cal,true,false,null,onah);
		v=cal._veses[cal._veses.length-1];
		v._id=id;
		if(leadup_date!==undefined&&leadup_date!=null&&leadup_date!='null'&&leadup_date!='0'){
			v._leadup_cause=leadup_cause;
			v._leadup_onah=leadup_onah;
			v._leadup_date=leadup_date;
			if(!v._hefsek_confirmed){
				days_already_red=1;
				kessem=leadup_date.clone();
				while(v._reeyah.is_later_then(kessem))
					{days_already_red++;kessem.next();}
				v._hefsek=v._reeyah.clone();
				days_till_min_ht=5-days_already_red;
				if(days_till_min_ht>0)
					v._hefsek.add_days(days_till_min_ht);
			}
		}
	v.set_haflagah_list(haflagah);
	if(hefsek_date!=''&&hefsek_date!='null'){
		v._hefsek=hefsek_date;
		v.confirm_hefsek(cal,false);
	}
}
function new_veses(ed,em,ey,hd,hm,hy,hr,min,ampm,cause,cal,isNew,live_input,location,onah){
	if(hr==''||min==''||ampm=='undefined'){
		popup('Please Select the time of the start of the flow. If you do not know the time, please ask a rabbi what to do');
		return false;
	}
	var date;
	var date_from_eng=false;
	if(hd!=''&&hm!=''&&hy!=''&&(hy%1==0)){
		if(lastDayOfHebrewMonth(hm,hy)<hd){
			popup('This month has only has 29 days, please either enter a valid jewish or secular date');
			return false;
		}else if(hm==13&&!hebrewLeapYear(hy)){
			popup(hy+' does not have a second month of Adar, please either enter a valid jewish or secular date');
			return false;
		}else{
			date=new HDate(hd,hm,hy);
		}
	}else if(ed!=''&&em!=''&&ey!=''&&(ey%1==0)){
		date_from_eng=true;var hours_24=Number(hr);
		if(ampm=='pm')
				hours_24=hr+12;
		if(hr==12)
				hours_24=hours_24-12;
		date=HDate_from_english(Number(ed),Number(em-1),Number(ey),hours_24,Math.round(min),location);
	}else{
		popup('Please either enter a valid jewish or secular date');
		return false;
	}
	if(isNew&&live_input){
		var d=new Date();
		var now=HDate_from_english(d.getDate(),d.getMonth(),d.getFullYear(),d.getHours(),d.getMinutes());
		if(date.is_later_then(now)){
			popup('You may not enter future dates, please either enter a valid jewish or secular date');
			return false;
		}
	}
	var isAM=true;
	if(ampm=='pm'){			isAM=false;}
	var veses;
	if(location!=undefined&&location!=null){
		var t=time2min(hr,min,isAM);
		var end_shkiah=get_zman(new Day(date),3,-1,location);
		var netz=get_zman(new Day(date),2,-1,location);
		var onah;onah=_NIGHT_;
		if(t>netz&&t<end_shkiah){				onah=_DAY_;}
	}
	veses=new Veses(date,hr,min,isAM,onah,cause);
	for(i in cal._veses){
		if(cal._veses[i]._reeyah.is_later_then(veses._reeyah))
			{popup('A new flow for '+veses._reeyah+' can not be added since there is a later flow recorded on the '+cal._veses[i]._reeyah);
			return false;
		}
	}
	var last_veses=veses.get_prev_veses(cal);
	if(last_veses!=undefined&&last_veses.goesOnCalendar())	{
		if(last_veses._hefsek_confirmed==false)	{
			popup("<p>You are attempting to add a New Flow without confirming that a Hefsek Taharah has been done for a flow start on the "+last_veses._reeyah
				  +". Please close this box and confirm the date of your Hefesk Taharah before adding a new flow.</p><br><p>If this is not "
				  +" an error and you are doing this on the advice and permission of your Orthodox rabbi, please email us or call our toll free "
				  +" number (1-866-908-2468) for detailed instructions on how to enter this information into the calendar and allow the program "
				  +" to function accordingly.</p>");
			return false;
		}else if(!veses._reeyah.is_later_then(last_veses._hefsek)){
			popup('A new flow ('+veses._reeyah+') can not be recorded for a day inbetween another flow ('
				+last_veses._reeyah+') and Hefsek Taharah('+last_veses._hefsek+').');
			return false;
		}
		iterator=last_veses._reeyah.clone();
		count=1;
		while(count<5000&&!iterator.equals(veses._reeyah)){
			count++;
			iterator.next();
		}
		if(isNew&&live_input&&cause==3&&last_veses.goesOnCalendar()&&count>7&&!veses._reeyah.is_later_then(last_veses._mikvah)){
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
	}else if(last_veses!=undefined&&!last_veses.goesOnCalendar()&&!last_veses._hefsek_confirmed){
		veses._leadup_cause=last_veses._cause;
		veses._leadup_onah=last_veses._onah;
		veses._leadup_date=last_veses._reeyah;
		days_already_red=1;
		kessem=last_veses._reeyah.clone();
		while(veses._reeyah.is_later_then(kessem)){days_already_red++;kessem.next();}
		veses._hefsek=veses._reeyah.clone();
		days_till_min_ht=5-days_already_red;
		if(days_till_min_ht>0)
			veses._hefsek.add_days(days_till_min_ht);
		$.post("ajax.php",{delVeses:last_veses._id});
		top.frames[1].vestos_db.pop();
		rebuild_vestos(top.frames[1].cal);
	}
	veses._cause=cause;
	var last_veses=veses.get_prev_veses(cal);
	while(last_veses!=null&&!last_veses.goesOnCalendar()){
		last_veses=last_veses.get_prev_veses(cal);
	}
	if(last_veses!=undefined&&last_veses!=null&&last_veses._haflagas!=undefined&&veses.goesOnCalendar()){
		veses._haflagas=new Array();
		var c=-2;
		var d=last_veses._hefsek.clone();
		while(!d.equals(veses._reeyah)){
			c+=2;
			d.next();
		}
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
			if(x>c)
				veses._haflagas.push(new Array(x,repeats,last_veses._haflagas[i][2]));
			else if(x==c)
				current_repeats=repeats+1;
			else if(last_veses_from_any_cause!=last_veses)
				check_for_haflagas_not_passed_clean_due_to_kessem=true;
		}
		veses._haflagas.push(new Array(c,current_repeats,veses));
	}else if(veses._cause!=4&&veses._cause!=5&&(veses._cause!=6||veses.goesOnCalendar())){
		veses._haflagas=new Array();
	}
	last_nidah=veses.get_prev_veses(cal);
	if(last_nidah!=null&&last_nidah._cause>3&&last_nidah._cause<7){	veses._haflagas=new Array();	}
	cal._veses.push(veses);
	if(isNew&&live_input){
		top.frames[1].vestos_db.push(new Array(veses._id,veses._reeyah,veses._time,veses._onah,veses._hefsek,veses._cause,top.frames[1].cal
									,veses._leadup_cause,veses._leadup_date,veses._leadup_onah));
	}
	if(veses.goesOnCalendar()){
		var events=new Array();
			for(i in cal._events){
				if((cal._events[i]._type==_HAFLAGAH_)
				&&(!veses._reeyah.is_later_then(cal._events[i]._date)
				||(veses._reeyah.equals(cal._events[i]._date)&&(veses._onah==_NIGHT_||cal._events[i]._onah==_DAY_)))
				&&cal._events[i]._deletable){;}
				else if(cal._events[i]._type==_BENONIS_&&cal._events[i]._veses!=veses&&!veses._reeyah.is_later_then(cal._events[i]._date));
				else events.push(cal._events[i]);
			}
		cal._events=events;
		var benonis=date.clone();
		benonis.add_days(29);
		cal._events.push(new Event(benonis,_BENONIS_,veses));
		var chodesh=date.clone();
		chodesh.next_mo();
		if(date._d==30&&lastDayOfHebrewMonth(chodesh._m,chodesh._y)==29){;
		}else{ 
			cal._events.push(new Event(chodesh,_CHODESH_,veses));
		}
	}
	if(live_input)
		refresh();
	if(!isNew)	{
		veses.confirm_hefsek(cal,false);
	}else if(live_input)	{
		var new_kavuah=find_kavuah(veses,cal);
		var popup_sent=false;
			if(!new_kavuah&&(veses._cause==0||veses._cause==7)&&last_veses!=undefined&&last_veses!=null){
				var last_r=last_veses._reeyah.clone();
				last_r.add_days(90);
				last_nidah=veses.get_prev_veses(top.frames[1].cal);
					if(veses._reeyah.is_later_then(last_r)&&last_nidah._cause!=4&&last_nidah._cause!=5&&last_nidah._cause!=6){
						popup_sent=true;
						str="<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>New flow after large gap</div><Br>"
						str += "<table  width='98%' style='margin-left: -18px; margin-top: -18px;'><tr><td align='left' style='font-size:12px'>"
						str +="You have entered a New Flow that is 90 days or more from your last flow. If you are in the menopausal "
						str +=" years you are not required to keep the Onot Haveset until you have three New Flows. Once you have had three New Flows," 
						str +=" the laws of Onot Haveset must again be kept. If you are not in the menopausal years please consult a qualified rabbi "
						str +="to determine how your calendar should be kept.<br><br>Please note that it is recommended that a woman during the menopausal years,"
						str +="who is uncertain when her next New Flow will be, do a bedikah prior to intimacy until six months have passed with no cycle.";
						str += "</td></tr></table>";
						str+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),235);
						setTimeout("new_popup_win(\""+str.replace(/"/g,"\\\"")+"\",'265','400')",2700);
					}
			}
		if(!popup_sent){
			if(veses.StartedInWhiteWeek(top.frames[1].cal))
				reeyah_in_white_week_popup(veses);
			else if(Settings.getInstance()._explain&&!new_kavuah)
				setTimeout("new_popup_win_explainer('R')",2700);
			else if(new_kavuah)
				setTimeout("new_popup_win_explainer('kavuah')",2700);
		}
	}
	return true;
}
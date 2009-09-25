Veses.prototype._id;
Veses.prototype._reeyah;
Veses.prototype._time;
Veses.prototype._onah;
Veses.prototype._cause;
Veses.prototype._hefsek;
Veses.prototype._hefsek_confirmed;
Veses.prototype._mikvah;
Veses.prototype._mikvah_confirmed;
Veses.prototype._haflagas;
Veses.prototype._explain_data;
Veses.prototype._goesOnCal;
Veses.prototype._leadup_cause;
Veses.prototype._leadup_date;
Veses.prototype._leadup_onah;
function Veses(reeyah_date,hours,minutes,isAM,onah,cause){
	this._reeyah=reeyah_date;
	this._time=time2min(hours,minutes,isAM);
	if(onah==undefined){
		var reeyah_day=new Day(reeyah_date);
		this._onah=reeyah_day.get_onah(this._time);
	}else{ 
		this._onah=onah;
	}
	this._cause=cause;
	var hefsek=this.getEarliestHtDate();
	this._hefsek=hefsek;
	this._hefsek_confirmed=false;
	var mikvah=hefsek.clone();
	mikvah.add_days(8);
	this._mikvah=mikvah;
	this._mikvah_confirmed=false;
}
Veses.prototype.get_prev_veses=function(cal){
	var last_veses=null;
	for(i in cal._veses)
		if(cal._veses[i]!=this&&!cal._veses[i]._reeyah.is_later_then(this._reeyah))
			if(last_veses==null||cal._veses[i]._reeyah.is_later_then(last_veses._reeyah))
				last_veses=cal._veses[i];
	return last_veses;
}
Veses.prototype.info=function(){
	return"Vesos starting on "+this._reeyah+", ht on "+this._hefsek+", mikvah night iy\"h on "+this._mikvah;}
Veses.prototype.goesOnCalendar=function(){
	if(this._goesOnCal!==undefined){ return this._goesOnCal;}
	if(this._cause==1||this._cause==2||this._cause==4||this._cause==5){
		this._goesOnCal=false;
		return false;
	}
	if(this._cause==3){
		last_v=this.get_prev_veses(top.frames[1].cal);
		if(this.StartedInWhiteWeek(top.frames[1].cal)&&(last_v==null||last_v.goesOnCalendar())){
			this._goesOnCal=false;
			return false;
		}else {
			this._goesOnCal=true;return true;
		}
	}
	last_v=this.get_prev_veses(top.frames[1].cal);
	if(last_v==null){
		this._goesOnCal=true;
		return true;
	}
	while(!last_v.goesOnCalendar()){
		last_v=last_v.get_prev_veses(top.frames[1].cal);
		if(last_v==null){return true;}
	}
	if(last_v==null){ return true};
	if(this._cause==0){
		var last_r=last_v._reeyah.clone();
		last_r.add_days(6);
		var last_ht=last_v._hefsek.clone();
		last_ht.next();
		if(this._reeyah.is_later_then(last_r)){
			this._goesOnCal=true;return true;
		}
		if(this._reeyah.is_later_then(last_ht))	{
			this._goesOnCal=true;return true;
		}
		this._goesOnCal=false;
		return false;
	}
	if(this._cause==6)
		gap=40;
	else if(this._cause==7)
		gap=90;
	var last_r=last_v._reeyah.clone();
	last_r.add_days(gap);
	if(this._reeyah.is_later_then(last_r)){
		this._goesOnCal=false;
		return false;
	}else {
		this._goesOnCal=true;
		return true;
	}
	this._goesOnCal=false;
	return false;
}
Veses.prototype.cause_str=function(leadup){
	if(leadup===undefined) 
		cause=this._cause;	
	else if(leadup)
		cause=this._leadup_cause;
	if(cause==0||cause==7)
		return"Your flow started ";
	if(cause==1)
		return"A stain was discovered ";
	if(cause==2)
		return"A womans medical prodedure was done ";
	if(cause==3)
		return"An unclean bedikah was made ";
	if(cause==4)
		return"You gave birth to a son ";
	if(cause==5)
		return"You gave birth to a daughter ";
	if(cause==6)
		return"A pregnancy was lost ";
	return"You became nidah ";
}
Veses.prototype.StartedInWhiteWeek=function(cal){
	var last_veses=this.get_prev_veses(cal);if(last_veses==null)
	return false;if(last_veses._mikvah.is_later_then(this._reeyah))
	return true;return false;}
Veses.prototype.check_for_bad_mikvah=function(){
	var day;var badMikvah_reason='';var white_date=this._mikvah.clone();for(x=0;x<7;x++)
	{white_date.prev();day=new Day(white_date);if(day._locations.length>1)
	badMikvah_reason=international_dateline_checker(day);}
	var mikvah_day=new Day(this._mikvah);var chag=mikvah_day.chag();
	if(chag=="Yom Kippur")	badMikvah_reason='since relations are prohibited on Yom Kippur,';
	if(chag=="Tisha B'Av") badMikvah_reason='since relations are prohibited on Tisha B\'Av,';
	for(i in cal._events){var e=cal._events[i];if(e._date.equals(mikvah_day._date))
	{if(e._type==_BENONIS_)
	badMikvah_reason+='since you have an onah beinonit that night, ';
	else if(e._type==_CHODESH_&&e.chodesh_onah()==_NIGHT_)
	badMikvah_reason+='since you have a veset hachodesh that night, ';
	else if(e._type==_HAFLAGAH_&&e._onah==_NIGHT_)
	badMikvah_reason+='since you have a veset haflagah that night, ';}}
	if(badMikvah_reason!='')
	return "Your mikvah night may have to be postponed until the following night "+badMikvah_reason+" please ask a rabbi how to proceed.";
	else return'';}
function explain_ht(){
	setTimeout("new_popup_win_explainer('HT')",700);}
Veses.prototype.set_haflagas=function(cal,last_veses){
	for(i in this._haflagas){
		var date=this._hefsek.clone();
		var count=this._haflagas[i][0];
		if(this._haflagas[i][2]!=null){
			var veses=this._haflagas[i][2];
		}else{
			veses=this;
		}
		date.add_days(Math.floor(count/2));
		if(count%2==0){
			var event=new Event(date,_HAFLAGAH_,veses);
			event._misc=count;event._onah=_DAY_;cal._events.push(event);
		}else{
			date.next();
			var event=new Event(date,_HAFLAGAH_,veses);
			event._misc=count;
			event._onah=_NIGHT_;
			cal._events.push(event);
		}
	}
}
Veses.prototype.getEarliestHtNumber=function(){
	var v=this;
	if(v.StartedInWhiteWeek(top.frames[1].cal)||v._cause==4){
		min_ht=0;
	}else if(v._leadup_date!==undefined){
		days_already_red=1;
		kessem=v._leadup_date.clone();
		while(v._reeyah.is_later_then(kessem)){
			days_already_red++;
			kessem.next();
		}
		min_ht=5-days_already_red;
		if(min_ht<0){
			mint_ht=0;
		}
	}else if(v._cause==5){
		min_ht=6;
	}else if(v._cause==6&&!v.goesOnCalendar()){
		min_ht=6;
	}else{
		min_ht=4;
	}
	return min_ht;
}
Veses.prototype.getEarliestHtDate=function(){
	var v=this;
	var earliest_ht_date=v._reeyah.clone();
	min_ht=this.getEarliestHtNumber();
	earliest_ht_date.add_days(min_ht);
	return earliest_ht_date;
}
function move_unconfirmed_ht(){
	cal=top.frames[1].cal;
	if(cal._veses.length>0&&!cal._veses[cal._veses.length-1]._hefsek_confirmed){
		v=cal._veses[cal._veses.length-1];
		var date=v._hefsek.clone();
		date._m=cal._selected_month;
		date._y=cal._selected_year;
		date._d=1;
		earliest_ht_date=v.getEarliestHtDate();
		if(date.is_later_then(v._reeyah)){
			if(earliest_ht_date.is_later_then(date))
				date=earliest_ht_date;
			var mikvah=date.clone();
			mikvah.add_days(8);
			v._hefsek=date;
			v._mikvah=mikvah;
			refresh();
			return true;
		}
		if(date._m==v._reeyah._m&&date._y==v._reeyah._y){
			date=earliest_ht_date;
			var mikvah=date.clone();
			mikvah.add_days(8);
			v._hefsek=date;
			v._mikvah=mikvah;
			refresh();
			return true;
		}
	}
	return false;
};

Veses.prototype.confirm_hefsek=function(cal,isNew){
	if(isNew){
		var d=new Date();
		var now=HDate_from_english(d.getDate(),d.getMonth(),d.getFullYear(),d.getHours(),d.getMinutes());
		if(this._hefsek.is_later_then(now)){
			popup("Please ensure the Hefsek Taharah is not a future date");return false;
		}
	}
	this._hefsek_confirmed=true;
	var mikvah=this._hefsek.clone();
	mikvah.add_days(8);
	this._mikvah=mikvah;
	if(this._cause==5||(this._cause==6&&!this.goesOnCalendar())){
		var earliest_mikvah=this._reeyah.clone();
		earliest_mikvah.add_days(14);
		if(earliest_mikvah.is_later_then(this._mikvah)){
			this._mikvah=earliest_mikvah;
		}
	}
	if(isNew){
		$.post("ajax.php",{confirmHefsek:this._hefsek._d+"-"+this._hefsek._m+"-"+this._hefsek._y,veses_id:this._id});
		if(top.frames[1].vestos_db===undefined){
			alert('no vestos_db');
			top.frames[1].vestos_db=new Array();
		}
	if(top.frames[1].vestos_db.length>0){
		top.frames[1].vestos_db[top.frames[1].vestos_db.length-1][4]=this._hefsek;
	}
	if(Settings.remindWhite()){
		var date=this._hefsek.clone();
		for(white_count=1;white_count<8;white_count++){
			date.next();
			set_reminder(1,this,new Day(date),_DAY_,white_count);
		}
	}
	var bad_mikvah=this.check_for_bad_mikvah();
	if(bad_mikvah!=''){
		return_str="<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>Problematic Mikvah Night</div><Br>"
		return_str+="<table  width='83%' ><tr><td align='left' style='font-size:12px'>"+bad_mikvah+"</td></tr></table>";var tmp='';
		if(top.frames[1].Settings.getInstance()._explain){
			tmp="top.frames[1].explain_ht();"
		};
		return_str+=buttons(new Array('OK')
		,new Array("this.blur();"+tmp+"top.frames[1].Hide_Windows();"),225)+"</div>";
		bad_mikvah=return_str;
	}
	if(bad_mikvah!=''){
		set_reminder(2,this,new Day(this._mikvah),_NIGHT_,this.check_for_bad_mikvah(),null,Settings.remindMikvah());
	}else {
		set_reminder(2,this,new Day(this._mikvah),_NIGHT_,this._hefsek.toString()+" ("+this._hefsek.to_eng()+")",null,Settings.remindMikvah());
	}
	var last_veses=this.get_prev_veses(cal);while(last_veses!=null&&!last_veses.goesOnCalendar())
	last_veses=last_veses.get_prev_veses(cal);this.set_haflagas(cal,last_veses);var chashashot=new Array();if(Settings.getInstance()._carry_chodesh)
	{var date=this._reeyah.clone();if(!date.is_later_then(this._hefsek))
	while(!date.is_later_then(this._hefsek)){
		for(i in cal._events){
		if(cal._events[i]._date.equals(date)&&cal._events[i]._type==_CHODESH_)
		if(!this._reeyah.equals(date)||(this._reeyah.equals(date)&&(cal._events[i]._onah==_DAY_||this._onah==_NIGHT_)))
		chashashot.push(cal._events[i]);}
		date.next();}
		for(i in chashashot){
			var next_month=chashashot[i]._date.clone();next_month.next_mo();
			if(chashashot[i]._date._d==30&&lastDayOfHebrewMonth(next_month._m,next_month._y)==29) continue;
			if(chashashot[i]._veses!=null)
				var event=new Event(next_month,_CHODESH_,this);
			else {
				var event=new Event(next_month,_CHODESH_,null);
				event._onah=chashashot[i]._onah;1
			}
			if(chashashot[i]._misc==null&&chashashot[i]._veses!=null)
				event._misc=chashashot[i]._veses;
			else
				event._misc=chashashot[i]._misc;
				cal._events.push(event);
		}
	}
	if(isNew){
		if(Settings.remindOnah()){
			for(i in cal._events){
				if(((cal._events[i]._veses==this||cal._events[i]._type==_HAFLAGAH_)
				&&(cal._events[i]._date.is_later_then(this._mikvah)||cal._events[i]._date.equals(this._mikvah)))
			   ||(cal._veses.length==1&&(cal._events[i]._date.is_later_then(this._mikvah)
			   ||cal._events[i]._date.equals(this._mikvah)||this._reeyah.is_later_then(cal._events[i]._date)
			   ||this._reeyah.equals(cal._events[i]._date)))||(cal._events[i]._veses==null&&cal._events[i]._type==_CHODESH_
			   &&(cal._events[i]._date.is_later_then(this._mikvah)||cal._events[i]._date.equals(this._mikvah)))){
				var type=_EVENT_NAMES_[cal._events[i]._type];
				var onah=0;
				if(cal._events[i]._type==_BENONIS_)
					onah=_NIGHT_AND_DAY_;
				else if(cal._events[i]._type==_CHODESH_)
					onah=cal._events[i].chodesh_onah();
				else if(cal._events[i]._type==_HAFLAGAH_)
					onah=cal._events[i]._onah;
				var temp_i=i;
				var r_time=cal._events[i].reeyah_time();
				i=temp_i;
				set_reminder(3,this,new Day(cal._events[i]._date),onah,type,r_time);
				}
			}
		}
		if(Settings.getInstance()._explain){
			this._explain_data=new Array();last_nidah=this.get_prev_veses(cal);
			if(last_veses==undefined||last_veses._cause==4||last_veses._cause==5
			   ||(last_veses._cause==6&&!last_veses.goesOnCalendar())||!this.goesOnCalendar()){
				this._explain_data['haflagahs']=false;
			}else if(last_nidah==undefined||last_nidah==null||last_nidah._cause==4||last_nidah._cause==5
						||(last_nidah._cause==6&&!last_nidah.goesOnCalendar())||!this.goesOnCalendar()){
				this._explain_data['haflagahs']='reset';
			}else{
				this._explain_data['haflagahs']=true;
				this._explain_data['lastHT']=last_veses._hefsek.clone();
				var min_i=null;for(i in this._haflagas)
				if(min_i==null||this._haflagas[i][0]<this._haflagas[min_i][0]){
					min_i=i;
				}
				this._explain_data['count']=this._haflagas[min_i][0];
				this._explain_data['old_list']="{";
				for(i in last_veses._haflagas){
					this._explain_data['old_list']+=last_veses._haflagas[i][0]+", ";
				}
				this._explain_data['old_list']=this._explain_data['old_list'].substring(0,this._explain_data['old_list'].length-2);
				this._explain_data['old_list']+="} ";if(last_veses._haflagas.length==0)
				this._explain_data['old_list']='empty. ';
				this._explain_data['new_list']="{";
				for(i in this._haflagas){
					this._explain_data['new_list']+=this._haflagas[i][0]+", ";
				}
				this._explain_data['new_list']=this._explain_data['new_list'].substring(0,this._explain_data['new_list'].length-2);
				this._explain_data['new_list']+="} ";
			}
		}
		if(Settings.getInstance()._carry_chodesh&&chashashot.length>0){
			this._explain_data['dates_to_carry']='the '+chashashot[0]._date;
				for(i=1;i<chashashot.length;i++)
					this._explain_data['dates_to_carry']+=' and the '+chashashot[i]._date;
				}
			if(bad_mikvah==''){
				setTimeout("new_popup_win_explainer('HT')",700);
			}else{
				setTimeout("new_popup_win(\""+bad_mikvah.replace(/"/g,"\\\"")+"\",'265','400')",700);
			}
		}else if(bad_mikvah!=''){
				setTimeout("new_popup_win(\""+bad_mikvah.replace(/"/g,"\\\"")+"\",'265','400')",700);
		}
	}//end if isNew
}
Veses.prototype.set_haflagah_list=function(haflagah){
	if(haflagah!=undefined&&haflagah!=''&&haflagah!=null){
		this._haflagas=new Array();
		var h=haflagah.split(",");
		for(i in h)
			this._haflagas.push(new Array(h[i].replace(" ",""),1,this._reeyah.clone()));
	}
}
function add_chodesh_dates(cal,chodesh,reeyah){
	if(chodesh.length<3)return;
	chodesh_array=chodesh.split(',');
	for(i in chodesh_array){
		var temp=chodesh_array[i].split('(');
		temp[0]=temp[0].replace(' ','');
		var day_of_mo=Number(temp[0]);
		temp[1]=temp[1].replace(' ','');
		temp[1]=temp[1].replace(')','');
		var date=reeyah.clone();
		if(day_of_mo<date._d||(day_of_mo==date._d&&temp[1]=='night'))
			date.next_mo();
		date._d=day_of_mo;
		e=new Event(date,_CHODESH_,null);
		e._onah=_NIGHT_;
		if(temp[1]=='day')
			e._onah=_DAY_;
		if(date._d<=lastDayOfHebrewMonth(date._m,date._y))
			cal._events.push(e);
	}
}
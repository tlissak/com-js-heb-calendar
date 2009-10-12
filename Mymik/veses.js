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
			this._goesOnCal=true;
			return true;
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
		var last_r=last_v._reeyah.clone().add(6);
		var last_ht=last_v._hefsek.clone().next();
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
	var last_r=last_v._reeyah.clone().add(gap);
	if(this._reeyah.lt(last_r)){
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

Veses.prototype.check_for_bad_mikvah=function(){
	var day;var badMikvah_reason='';
	var white_date=this._mikvah.clone();
	for(x=0;x<7;x++){
		white_date.prev();
		day=new Day(white_date);
		if(day._locations.length>1)
			badMikvah_reason=international_dateline_checker(day);
	}
	var mikvah_day=new Day(this._mikvah);
	var chag=mikvah_day.chag();
	if(chag=="Yom Kippur")	badMikvah_reason='since relations are prohibited on Yom Kippur,';
	if(chag=="Tisha B'Av") badMikvah_reason='since relations are prohibited on Tisha B\'Av,';
	for(i in cal._events){
		var e=cal._events[i];
		if(e._date.equals(mikvah_day._date)){
			if(e._type==_BENONIS_) badMikvah_reason+='since you have an onah beinonit that night, ';
			else if(e._type==_CHODESH_&&e.chodesh_onah()==_NIGHT_)	badMikvah_reason+='since you have a veset hachodesh that night, ';
			else if(e._type==_HAFLAGAH_&&e._onah==_NIGHT_)	badMikvah_reason+='since you have a veset haflagah that night, ';}}
	return (badMikvah_reason!='') ? "Your mikvah night may have to be postponed until the following night "+badMikvah_reason+" please ask a rabbi how to proceed." : '';
}

function move_unconfirmed_ht(){
	cal=top.frames[1].cal;
	if(cal._veses.length>0&&!cal._veses[cal._veses.length-1]._hefsek_confirmed){
		v=cal._veses[cal._veses.length-1];
		var date=v._hefsek.clone();
		date._m=cal._selected_month;
		date._y=cal._selected_year;
		date._d=1;
		earliest_ht_date=v.getEarliestHefsekTaharaDate();
		if(date.lt(v._reeyah)){
			if(earliest_ht_date.is_later_then(date))
				date=earliest_ht_date;
			var mikvah=date.clone().add(8);
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

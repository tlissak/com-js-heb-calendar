function calender(){	
	this._events = new Array();
	this._veses = new Array();	
	this.vestos_db = new Array()
}
function get_older_events(_veses){
	// get older events . dispose benonit
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
calender.prototype._events;
calender.prototype._veses;
calender.prototype.vestos_db;
var _EVENT_=0;
var _REEYAH_=1;
var _HEFSEK_=2;
var _CHODESH_=5;
var _BENONIS_=6;
var _HAFLAGAH_=7;
var _KAVUAH_=8;
var _EVENT_NAMES_=new Array('Generic Event','Flow','Hefsek Taharah','-------','---------','Chodesh','Beinonit','Haflagah','Kavuah');
var _NIGHT_=1;
var _DAY_=2;
var _NIGHT_AND_DAY_=3;
var _ONAH_NAMES_=new Array('','night onah','day onah','night and day onahs');
var _ONAH_TYPES_=new Array('','sunrise','sunset','sunset and sunrise');
var kavuah_reeyahs;
var kavuah_text;
var last_veses,before_last_veses;
var Cause ={}
Cause.start   = 0
Cause.start_1 = 7
Cause.stain   = 1
Cause.medical = 2
Cause.unclean = 3
Cause.birth_s = 4
Cause.birth_d = 5
Cause.preglost= 6
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
function Veses(reeyah_date,_time,onah,cause){
	this._reeyah=reeyah_date;
	this._time=time2time(_time);
	if(onah==undefined){
		this._onah=reeyah_date.get_onah(this._time);
	}else{ 
		this._onah=onah;
	}
	this._cause=cause;
	var hefsek=this.getEarliestHefsekTaharaDate();
	this._hefsek=hefsek;
	this._hefsek_confirmed=false;
	this._mikvah=hefsek.clone().add(8);
	this._mikvah_confirmed=false;
	this._id = ""
	this._leadup_cause = ""
	this._leadup_date = ""
	this._leadup_onah = ""
}
Veses.prototype.check_for_bad_mikvah=function(cal){
	var badMikvah_reason='';
	var mikvah_day= new HDate(this._mikvah);
	if(mikvah_day.getDay()==10 && mikvah_day.getMonth() == 7)	
		badMikvah_reason ='bad_mik_kipur';
	if(mikvah_day.getDay()==9 && mikvah_day.getMonth() == 5) 
		badMikvah_reason ='bad_mik_9av';
	for(i in cal._events){
		var e=cal._events[i];
		if(e._date.eq(mikvah_day)){
			if(e._type==_BENONIS_)
				badMikvah_reason ='bad_mik_benonit';
			else if(e._type==_CHODESH_&&e.chodesh_onah()==_NIGHT_)
				badMikvah_reason ='bad_mik_chodesh';
			else if(e._type==_HAFLAGAH_&&e._onah==_NIGHT_)
				badMikvah_reason ='bad_mik_haflaga';
		}
	}
	
	if(badMikvah_reason!='')
		return {b:true,reason:_("bad_mik_start") + _(badMikvah_reason) + _("bad_mik_end")}
	else 
		return {b:false};
}
Veses.prototype.get_prev_veses=function(){
	var last_veses=null;
	for(i in Cal_Veses._veses)
		if(Cal_Veses._veses[i]!=this&&!Cal_Veses._veses[i]._reeyah.gt(this._reeyah))
			if(last_veses==null||Cal_Veses._veses[i]._reeyah.gt(last_veses._reeyah))
				last_veses=Cal_Veses._veses[i];
	return last_veses;
}
Veses.prototype.StartedInWhiteWeek=function(){
	var last_veses=this.get_prev_veses();
	if(last_veses==null){	return false; }
	return (last_veses._mikvah.gt(this._reeyah))
}
//Veses.prototype.info=function(){	return _("veset_info_1")+this._reeyah+_("veset_info_2")+ this._hefsek +_("veset_info_3") +this._mikvah;}
Veses.prototype.set_haflagas=function(cal,last_veses){
	for(i in this._haflagas){
		var _date=this._hefsek.clone();
		var _count=this._haflagas[i][0];
		if(this._haflagas[i][2]!=null)
			var _veses=this._haflagas[i][2];
		else
			_veses=this;
		_date.add(Math.floor(_count/2));
		if(_count%2==0){
			var _event=new Event(_date,_HAFLAGAH_,_veses);
			_event._misc=_count;
			_event._onah=_DAY_;
			cal._events.push(_event);
		}else{
			_date.nextDay();
			var _event=new Event(date,_HAFLAGAH_,_veses);
			_event._misc=_count;
			_event._onah=_NIGHT_;
			cal._events.push(_event);
		}
	}
}
Veses.prototype.getEarliestHefsekTaharaNumber=function(){
	var v=this;
	if(v.StartedInWhiteWeek(Cal_Veses)||v._cause==Cause.birth_s){
		min_ht=0;
	}else if(v._leadup_date!==undefined){
		days_already_red=1;
		kessem=v._leadup_date.clone();
		while(v._reeyah.gt(kessem)){
			days_already_red++;
			kessem.nextDay();
		}
		min_ht=5-days_already_red;
		if(min_ht<0){
			mint_ht=0;
		}
	}else if(v._cause==Cause.birth_d){
		min_ht=6;
	}else if(v._cause==Cause.preglost&&!v.goesOnCalendar()){
		min_ht=6;
	}else{
		min_ht=4;
	}
	return min_ht;
}
Veses.prototype.getEarliestHefsekTaharaDate=function(){
	return this._reeyah.clone().add(this.getEarliestHefsekTaharaNumber());
}
Veses.prototype.confirm_hefsek=function(cal){
	// check if hefsek is future date return false 	//store it in vestos_db top.frame[1].vestos_db=new Array();
	//if(this._hefsek.gt(now)){popup("Please ensure the Hefsek Taharah is not a future date");return false;}
	this._hefsek_confirmed=true;
	var mikvah=this._hefsek.clone().add(8);
	this._mikvah=mikvah;
	
	if(this._cause==Cause.birth_d||(this._cause==Cause.preglost&&!this.goesOnCalendar())){
		var earliest_mikvah=this._reeyah.clone().add(14);
		if(earliest_mikvah.gt(this._mikvah)){
			this._mikvah=earliest_mikvah;
		}
	}
	//add_reminder("7 nekiim")	
	var bad_mikvah=this.check_for_bad_mikvah(cal);
	if (bad_mikvah.b){//	add_reminder("Veses.confirm_hefsek ::  BAD MIKVEH reminder-------------------")
		this._mikvah_confirmed=false
	}else{
		this._mikvah_confirmed=true //	add_reminder("Veses.prototype.confirm_hefsek :: add reminder for the mikveh")
	}
	var last_veses=this.get_prev_veses(cal);
	while(last_veses!=null&&!last_veses.goesOnCalendar()){		last_veses=last_veses.get_prev_veses(cal);}
	
	this.set_haflagas(cal,last_veses);//set haflaga for the last veses
	var chashashot=new Array();	
	// find older chashashot inside bleeding days
	var date=this._reeyah.clone();
	// if raia < hefsek == its sure
	if(!date.gt(this._hefsek)){	// loop from reeyah to hefsek (bleeding days)
		while(!date.gt(this._hefsek)){
			for(i in cal._events){	// if one of chashashot inside the bleeding days is yom ha chodesh
				if(cal._events[i]._date.eq(date)&&cal._events[i]._type==_CHODESH_){
					// if current raia is not the bleeding day or current raia is the date and the chashashot can be day or night
					if( ! this._reeyah.eq(date)	||	(this._reeyah.eq(date)&&(cal._events[i]._onah==_DAY_||this._onah==_NIGHT_))		){
							chashashot.push(cal._events[i]);
					}
				}
			}
			date.nextDay();
		}
		//**********************************************
	}
	// loop chashashot inside bleeding days and to next month 
	for(i in chashashot){
		var next_month=chashashot[i]._date.clone().nextMonth(); //if the next month dosent have a 30 days so movenext chashash
		if(chashashot[i]._date.getDay()==30&&next_month.getMonthLength()==29) {
			continue;
		}
		//*********** to better understand
		// if the chashash inside bleeding day has veses caller  so copy the chashash to next month with this caller
		// else copy the chashsh to next month without caller of this bot with the same ona
		if(chashashot[i]._veses!=null){
			var _event=new Event(next_month,_CHODESH_,this);
		}else {
			var _event=new Event(next_month,_CHODESH_,null);
			_event._onah=chashashot[i]._onah;
		}		
		//if the chashsh has caller veses but not misc add misc from veses else the misc is the same misc of chashsh		
		if(chashashot[i]._misc==null&&chashashot[i]._veses!=null){
			_event._misc=chashashot[i]._veses;
		}else{
			_event._misc=chashashot[i]._misc;
		}
		cal._events.push(_event);
	}
}
Veses.prototype.goesOnCalendar=function(){
	if(this._goesOnCal!==undefined){ return this._goesOnCal;}
	if(this._cause==1||this._cause==2||this._cause==4||this._cause==5){
		this._goesOnCal=false;
		return false;
	}
	if(this._cause==3){
		last_v=this.get_prev_veses(Cal_Veses);
		if(this.StartedInWhiteWeek(Cal_Veses)&&(last_v==null||last_v.goesOnCalendar())){
			this._goesOnCal=false;
			return false;
		}else {
			this._goesOnCal=true;
			return true;
		}
	}
	last_v=this.get_prev_veses(Cal_Veses);
	if(last_v==null){
		this._goesOnCal=true;
		return true;
	}
	while(!last_v.goesOnCalendar()){
		last_v=last_v.get_prev_veses(Cal_Veses);
		if(last_v==null){
			return true;
		}
	}
	if(last_v==null){ return true};
	if(this._cause==0){
		var last_r=last_v._reeyah.clone().add(6);
		var last_ht=last_v._hefsek.clone().nextDay();
		if(this._reeyah.gt(last_r)){
			this._goesOnCal=true;
			return true;
		}
		if(this._reeyah.gt(last_ht))	{
			this._goesOnCal=true;
			return true;
		}
		this._goesOnCal=false;
		return false;
	}
	if(this._cause==6)
		gap=40;
	else if(this._cause==7)
		gap=90;
	var last_r=last_v._reeyah.clone().add(gap);
	if(this._reeyah.gt(last_r)){
		this._goesOnCal=false;
		return false;
	}else {
		this._goesOnCal=true;
		return true;
	}
	this._goesOnCal=false;
	return false;
}
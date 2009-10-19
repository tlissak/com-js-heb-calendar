function calender(){	
	this._events = new Array();
	this._veses = new Array();	
	this.vestos_db = new Array()
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
Veses.prototype.goesOnCalendar=function(){
	if(this._goesOnCal!==undefined){ return this._goesOnCal;}
	if(this._cause==1||this._cause==2||this._cause==4||this._cause==5){
		this._goesOnCal=false;
		return false;
	}
	if(this._cause==3){
		last_v=this.get_prev_veses();
		if(this.StartedInWhiteWeek()&&(last_v==null||last_v.goesOnCalendar())){
			this._goesOnCal=false;
			return false;
		}else {
			this._goesOnCal=true;
			return true;
		}
	}
	last_v=this.get_prev_veses();
	if(last_v==null){
		this._goesOnCal=true;
		return true;
	}
	while(!last_v.goesOnCalendar()){
		last_v=last_v.get_prev_veses();
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
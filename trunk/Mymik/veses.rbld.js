function calender(){
	this._events = new Array();
	this._veses = new Array();
	this.vestos_db = new Array()
}
calender.prototype._events;
calender.prototype._veses;
calender.prototype.vestos_db;

var kavuah_reeyahs;
var kavuah_text;
var last_veses,before_last_veses;


var _RED_=0;
var _YELLOW_=1;
var _GREEN_=2;
var _WHITE_=3;
var _BLUE_=4;
var _EVENT_=0;
var _REEYAH_=1;
var _HEFSEK_=2;
var _REPEATING_=3;
var _MEMO_=4;
var _CHODESH_=5;
var _BENONIS_=6;
var _HAFLAGAH_=7;
var _KAVUAH_=8;
var _EVENT_NAMES_=new Array('Generic Event','Flow','Hefsek Taharah','Repeating Memo','Memo','Chodesh','Beinonit','Haflagah','Kavuah');
var _NIGHT_=1;
var _DAY_=2;
var _NIGHT_AND_DAY_=3;
var _ONAH_NAMES_=new Array('','night onah','day onah','night and day onahs');
var _ONAH_TYPES_=new Array('','sunrise','sunset','sunset and sunrise');

cause_start   = 0 // 
cause_start_1 = 7 // 
cause_stain   = 1
cause_medical = 2
cause_unclean = 3
cause_birth_s = 4
cause_birth_d = 5
cause_preglost= 6

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
function Veses(reeyah_date,hours,minutes,onah,cause){
	this._reeyah=reeyah_date;
	this._time=time2min({hr:hours,min:minutes});
	if(onah==undefined){
		var reeyah_day=new Day(reeyah_date);
		this._onah=reeyah_day.get_onah(this._time);
	}else{ 
		this._onah=onah;
	}
	this._cause=cause;
	//c(this)
	var hefsek=this.getEarliestHefsekTaharaDate();
	this._hefsek=hefsek;
	this._hefsek_confirmed=false;
	var mikvah=hefsek.clone().add(8);
	this._mikvah=mikvah;
	this._mikvah_confirmed=false;
	this._id = "new Veses._id"
	this._leadup_cause = "new Veses"
	this._leadup_date = "new Veses"
	this._leadup_onah = "new Veses"
}

Veses.prototype.check_for_bad_mikvah=function(cal){
	var day;
	var badMikvah_reason='';
	//international_dateline_checker(day);
	var mikvah_day= new HDate(this._mikvah);
	if(mikvah_day.getDay()==10 && mikvah_day.getMonth() == 7)	
		badMikvah_reason='since relations are prohibited on Yom Kippur,';
	if(mikvah_day.getDay()==9 && mikvah_day.getMonth() == 5) 
		badMikvah_reason='since relations are prohibited on Tisha B\'Av,';
	for(i in cal._events){
		var e=cal._events[i];
		
		if(e._date.eq(mikvah_day)){
			if(e._type==_BENONIS_)
				badMikvah_reason+='since you have an onah beinonit that night, ';
			else if(e._type==_CHODESH_&&e.chodesh_onah()==_NIGHT_)
				badMikvah_reason+='since you have a veset hachodesh that night, ';
			else if(e._type==_HAFLAGAH_&&e._onah==_NIGHT_)
				badMikvah_reason+='since you have a veset haflagah that night, ';
		}
	}
	if(badMikvah_reason!='')
		return "Your mikvah night may have to be postponed until the following night "+badMikvah_reason+" please ask a rabbi how to proceed.";
	else return'';
}

Veses.prototype.get_prev_veses=function(cal){
	var last_veses=null;
	for(i in cal._veses)
		if(cal._veses[i]!=this&&!cal._veses[i]._reeyah.gt(this._reeyah))
			if(last_veses==null||cal._veses[i]._reeyah.gt(last_veses._reeyah))
				last_veses=cal._veses[i];
	return last_veses;
}
Veses.prototype.StartedInWhiteWeek=function(cal){
	var last_veses=this.get_prev_veses(cal);
	if(last_veses==null){	return false; }
	return (last_veses._mikvah.gt(this._reeyah))
}
Veses.prototype.info=function(){
	return "Vesos starting on "+this._reeyah+", ht on "+this._hefsek+", mikvah night iy\"h on "+this._mikvah;}
Veses.prototype.set_haflagas=function(cal,last_veses){
	for(i in this._haflagas){
		var date=this._hefsek.clone();
		var count=this._haflagas[i][0];
		if(this._haflagas[i][2]!=null){
			var veses=this._haflagas[i][2];
		}else{
			veses=this;
		}
		
		date.add(Math.floor(count/2));
		
		if(count%2==0){
			var event=new Event(date,_HAFLAGAH_,veses);
			event._misc=count;
			event._onah=_DAY_;
			cal._events.push(event);
		}else{
			date.nextDay();
			var event=new Event(date,_HAFLAGAH_,veses);
			event._misc=count;
			event._onah=_NIGHT_;
			cal._events.push(event);
		}
	}
}
Veses.prototype.getEarliestHefsekTaharaNumber=function(){
	var v=this;
	if(v.StartedInWhiteWeek(oCal)||v._cause==cause_birth_s){
		min_ht=0;
	}else if(v._leadup_date!==undefined){
		days_already_red=1;
		kessem=v._leadup_date.clone();
		//**************************************
		while(v._reeyah.gt(kessem)){
			days_already_red++;
			kessem.nextDay();
		}
		//***************************************/
		min_ht=5-days_already_red;
		if(min_ht<0){
			mint_ht=0;
		}
	}else if(v._cause==cause_birth_d){
		min_ht=6;
	}else if(v._cause==cause_preglost/*&&!v.goesOnCalendar()*/){
		min_ht=6;
	}else{
		min_ht=4;
	}
	return min_ht;
}
Veses.prototype.getEarliestHefsekTaharaDate=function(){
	var v=this;
	min_ht=this.getEarliestHefsekTaharaNumber();
	var earliest_ht_date=v._reeyah.clone().add(min_ht);
	return earliest_ht_date;
}
var Cause ={}
Cause.start   = 0
Cause.start_1 = 7
Cause.stain   = 1
Cause.medical = 2
Cause.unclean = 3
Cause.birth_s = 4
Cause.birth_d = 5
Cause.preglost= 6
Veses.prototype.confirm_hefsek=function(cal){
	// check if hefsek is future date return false
	//if(this._hefsek.gt(now)){popup("Please ensure the Hefsek Taharah is not a future date");return false;}
	this._hefsek_confirmed=true;
	var mikvah=this._hefsek.clone().add(8);
	this._mikvah=mikvah;
	
	if(this._cause==Cause.birth_d||(this._cause==Cause.preglost/*&&!this.goesOnCalendar()*/)){
		var earliest_mikvah=this._reeyah.clone().add(14);
		if(earliest_mikvah.gt(this._mikvah)){
			this._mikvah=earliest_mikvah;
		}
	}
	//store it in vestos_db top.frame[1]
	//vestos_db=new Array();
	// add 7 nequiim reminder !	
	//---------------------
	
	//get bad mikve and add reminder
	var bad_mikvah=this.check_for_bad_mikvah(cal);
	if (bad_mikvah != ''){
		// reminder for bad mikveh at this._mikvah,_NIGHT_
		add_reminder("Veses.confirm_hefsek ::  BAD MIKVEH reminder-------------------")
		this._mikvah_confirmed=false
	}else{
		//add good mikveh reminder
		// ------------
		this._mikvah_confirmed=true
		add_reminder("Veses.prototype.confirm_hefsek :: add reminder for the mikveh")
	}
	// get the last veses
	var last_veses=this.get_prev_veses(cal);
	/*******************************************/
	//			BUGY
	/*********************************************/
	//while(last_veses!=null/*&&!last_veses.goesOnCalendar()*/)		last_veses=last_veses.get_prev_veses(cal);
		
	//set haflaga for the last veses
	this.set_haflagas(cal,last_veses);
	var chashashot=new Array();
	
	// find older chashashot inside bleeding days
	
	//allways add chashshot yom hodesh 
	//if(Settings.getInstance()._carry_chodesh){
	var date=this._reeyah.clone();
	// if raia < hefsek == its sure
	if(!date.gt(this._hefsek)){	
		// loop from reeyah to hefsek (bleeding days)
		//**************************************************
		while(!date.gt(this._hefsek)){
			for(i in cal._events){
				// if one of chashashot inside the bleeding days is yom ha chodesh
				if(cal._events[i]._date.eq(date)&&cal._events[i]._type==_CHODESH_){
					// if current raia is not the bleeding day
					// or current raia is the date and the chashashot 
					// can be day or night
					if( ! this._reeyah.eq(date)	||	(this._reeyah.eq(date)&&(cal._events[i]._onah==_DAY_||this._onah==_NIGHT_))		){
							chashashot.push(cal._events[i]);
					}
				}
			}
			date.nextDay();
		}
		//***********************************************/
	}
	// loop chashashot inside bleeding days 
	// and to next month 
	for(i in chashashot){
		var next_month=chashashot[i]._date.clone().nextMonth();
		// if the next month dosent have a 30 days so movenext chashash
		lastDayOfHebrewMonth = next_month.getMonthLength()
		if(chashashot[i]._date.getDay()==30&&lastDayOfHebrewMonth==29) {				
			continue;
		}
		//*********** to better understand
		//
		// if the chashash inside bleeding day has veses caller
		// so copy the chashash to next month with this caller
		// else copy the chashsh to next month without caller of this bot with the same ona
		if(chashashot[i]._veses!=null){
			var event=new Event(next_month,_CHODESH_,this);
		}else {
			var event=new Event(next_month,_CHODESH_,null);
			event._onah=chashashot[i]._onah;
		}
		
		//if the chashsh has caller veses but not misc
		// add misc from veses
		// else the misc is the same misc of chashsh
		
		if(chashashot[i]._misc==null&&chashashot[i]._veses!=null){
			event._misc=chashashot[i]._veses;
		}else{
			event._misc=chashashot[i]._misc;
		}
		cal._events.push(event);
	}
}

Veses.prototype.set_haflagah_list=function(haflagah){
	if(haflagah!=undefined&&haflagah!=''&&haflagah!=null){
		this._haflagas=new Array();
		var h=haflagah.split(",");
		for(i in h){
			this._haflagas.push(new Array(h[i].replace(" ",""),1,this._reeyah.clone()));
		}
	}
}


function Day(hdate){
	this._date=hdate;
	this._night_color=_GREEN_;
	this._day_color=_GREEN_;
	this._chag="unset";
	this._events=new Array();
}
Day.prototype._date;
Day.prototype._night_color;
Day.prototype._day_color;
Day.prototype._reeyah;
Day.prototype._hefsek;
Day.prototype._mikvah;
Day.prototype._events;
Day.prototype._chag;
Day.prototype._leftX;
Day.prototype._topY;
function TO_RECREATE(){	alert("to create")	}
Day.prototype.toString=function(){
	return this._date.toString()+"<br>"+this._date.to_eng();}
Day.prototype.chag=function(){
	if(this._chag=='unset'){var chag_date=new HDate(1,1,5769);
	for(holidayCounter=0;holidayCounter<56;holidayCounter++){
		chag_date=getJewishHolidayDate(holidayCounter,this._date._y);if(chag_date.equals(this._date)){
		this._chag=getJewishHolidayName(holidayCounter);break;}}}
		return this._chag;}
Day.prototype.isDST			= TO_RECREATE // getDST(for this location)
Day.prototype.start_shkiah	= TO_RECREATE////function(){	return get_zman(this,1);}
Day.prototype.netz			= TO_RECREATE//function(){	return get_zman(this,2);}
Day.prototype.end_shkiah	= TO_RECREATE//function(){	return get_zman(this,3);}
Day.prototype.get_onah		= function(time){
	if(time<this.netz()||time>this.start_shkiah())
		return _NIGHT_;
	else if(time>=this.netz()&&time<=this.end_shkiah())
		return _DAY_;
}
function time(time){
	if(time>1439)
		time-=1440;
	else if(time<0)
		time+=1440;
	var hour=Math.floor(time/60);
	var ampm="AM";
	if(hour>11)
		ampm="PM";
	if(hour>12)
		hour=hour-12;
	if(hour==0)
		hour=12;
	var minute=time%60;
	if(minute<10)
		minute="0"+minute;
	return hour+":"+minute+" "+ampm;
}
function time2min(hr,minute,isAM){
	hr=parseInt(hr);
	minute=parseInt(minute);
	var time=minute;
	if(hr==12)
		hr=0;
	if(isAM)
		time+=60*hr;
	if(!isAM)
		time=time+720+(60*hr);
	return time;
}
Day.prototype.format_time=function(minutes){	return time(minutes);}
Day.prototype.bedikah_time=function(e,onah_name,onah_type){
	if(!e.reeyah_time()||e.reeyah_time()<0)
		reeyah_time='';
	else
		reeyah_time='('+this.format_time(e.reeyah_time())+')';
	if(onah_name=='night onah')
		var end_of_onah=this.netz();
	else
		var end_of_onah=this.end_shkiah();
	if((onah_name=='night onah'&&e.reeyah_time()<720&&(end_of_onah-e.reeyah_time())<16)
		||(onah_name=='day onah'&&(end_of_onah-e.reeyah_time())<16)){
		str_out = " Relations are forbidden for the "+onah_name+"  and a "+tooltip('bedikah')+" must be made close to (but before) the end of the "+onah_name
		str_out += onah_type+". If the bedikah is clear or white, intimacy may resume only after the "+tooltip('onah')+" has ended." ;
		return str_out 
	}
	if(e.reeyah_time()>1319||(onah_name=='night onah'&&e.reeyah_time()<540)){
		str_out = " Relations are forbidden for the "+onah_name+"  and a "+tooltip('bedikah')+" must be made just <strong>after</strong> the time of day your flow started "
		str_out += reeyah_time+" or sometime later on, but before the end of the "+onah_name+" - "+onah_type+".  If you will not be awake during this time range, a bedikah may "
		str_out += "be done first thing in the morning. If the bedikah is clear or white, intimacy may resume only after the "
		str_out += tooltip('onah')+" has ended."
		return str_out;
	}
	str_out = " Relations are forbidden for the "+onah_name+"  and a "+tooltip('bedikah')+" must be made just <strong>after</strong> the time of day your flow started "
	str_out += reeyah_time+" or sometime later on, but before the end of the "+onah_name+" - "+onah_type+". If the bedikah is clear or white, intimacy may resume only after the "
	str_out += tooltip('onah')+" has ended."
	return str_out;
}
Day.prototype.show_chashashot=function(onah){
	if(onah==_NIGHT_)if(this._night_color==_GREEN_||this._night_color==_YELLOW_)
		return true;
	else
		return false;
	if(onah==_DAY_)
		if(this._day_color==_GREEN_||this._day_color==_YELLOW_)
			return true;
		else
			return false;
	if(onah==_NIGHT_AND_DAY_)
		if(this._night_color==_GREEN_||this._night_color==_YELLOW_)
			return true;
		else
			return false;
	return true;
}
Day.prototype.contains_pixel=function(x,y){	return x>=this._leftX&&x<=(this._leftX+95)&&y>=this._topY&&y<=(this._topY+90);}
Day.prototype.alefbeis_day=function(){
	var d=Number(this._date._d);
	var char1='';
	var char2='';
	if(d<11)
		char1="&#"+String(1487+d);
	else if(d<20&&d!=15&&d!=16){
		char1="&#"+String(1487+10);
		char2="&#"+String(1487+d-10);
	}else if(d==15||d==16){
		char1="&#"+String(1487+9);
		char2="&#"+String(1487+d-9);
	}else if(d==20)
		char1="&#"+String(1487+12);
	else if(d<30){
		char1="&#"+String(1487+12);
		char2="&#"+String(1487+d-20);
	}else if(d==30)
		char1="&#"+String(1487+13);
	return char1+char2;
}
var _trip_locations=new Array();
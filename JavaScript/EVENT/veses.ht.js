Veses.prototype.confirm_hefsek=function(cal){
	this._hefsek_confirmed=true;
	var mikvah=this._hefsek.clone().add(8);
	this._mikvah=mikvah;	
	if(this._cause==Cause.birth_d||(this._cause==Cause.preglost&&!this.goesOnCalendar())){
		var earliest_mikvah=this._reeyah.clone().add(14);
		if(earliest_mikvah.gt(this._mikvah)){
			this._mikvah=earliest_mikvah;
		}
	}
	var bad_mikvah=this.check_for_bad_mikvah(cal);
	if (bad_mikvah.b){
		this._mikvah_confirmed=false
		
		vmsg.bad_mikveh(this._hefesk,bad_mikvah.reason )
		
		
	}else{
		this._mikvah_confirmed=true 
	}
	var last_veses=this.get_prev_veses();
	
	while(last_veses!=null&&!last_veses.goesOnCalendar()){		last_veses=last_veses.get_prev_veses();}
	
	this.set_haflagas(cal,last_veses);
	var chashashot=new Array();	
	var date=this._reeyah.clone();	// find older chashashot inside bleeding days
	if(!date.gt(this._hefsek)){	// loop from reeyah to hefsek (bleeding days)
		while(!date.gt(this._hefsek)){
			for(i in cal._events){	// if one of chashashot inside the bleeding days is yom ha chodesh
				if(cal._events[i]._date.eq(date)&&cal._events[i]._type==_CHODESH_){
					if( ! this._reeyah.eq(date)	||	(this._reeyah.eq(date)&&(cal._events[i]._onah==_DAY_||this._onah==_NIGHT_))		){
							chashashot.push(cal._events[i]);
					}
				}
			}
			date.nextDay();
		}
	}
	for(i in chashashot){
		var next_month=chashashot[i]._date.clone().nextMonth(); 
		if(chashashot[i]._date.getDay()==30&&next_month.getMonthLength()==29) {
			continue;
		}
		if(chashashot[i]._veses!=null){
			var _event=new Event(next_month,_CHODESH_,this);
		}else {
			var _event=new Event(next_month,_CHODESH_,null);
			_event._onah=chashashot[i]._onah;
		}		
		if(chashashot[i]._misc==null&&chashashot[i]._veses!=null){
			_event._misc=chashashot[i]._veses;
		}else{
			_event._misc=chashashot[i]._misc;
		}
		cal._events.push(_event);
	}
}
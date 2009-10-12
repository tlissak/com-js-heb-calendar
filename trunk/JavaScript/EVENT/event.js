Event.prototype._date;
Event.prototype._onah;
Event.prototype._reeyah;
Event.prototype._deletable;
Event.prototype._type;
Event.prototype._misc;
Event.prototype._veses;
function Event(date,type,vesses){
	this._date=date;
	this._type=type;
	this._deletable=true;
	this._veses=vesses;
	this._misc=null;
}
Event.prototype.toString=function(){
	return" "+_EVENT_NAMES_[this._type]+" event on "+this._date;}
Event.prototype.chodesh_onah=function(){
	if(this._type!=_CHODESH_)
		return-1;
	if(this._misc==null){
		if(this._veses==null){	return this._onah;}
		else{	return this._veses._onah;}
	}else {	return this._misc._onah;}
}
// Event.prototype.reeyah_time=function(){}; 

function conserve_veses_haflaga(_veses){
	a_Haflaga = new Array()
	var last_veses=_veses.get_prev_veses(Cal_Veses);
	//**********************	BUGY	*******************************
	while(last_veses!=null&&!last_veses.goesOnCalendar() ){
		last_veses=last_veses.get_prev_veses(Cal_Veses);
	}
	
	if(last_veses!=undefined
	   &&last_veses!=null
	   &&last_veses._haflagas
	   !=undefined
	   &&_veses.goesOnCalendar() ){
		var xc=-2;
		var xd=last_veses._hefsek.clone();
		while(!xd.eq(_veses._reeyah)){
			xc+=2;
			xd.nextDay();
		}
		if(_veses._onah==_NIGHT_){
			xc+=1;
		}else/* if(veses._onah==_DAY_)*/{
			xc+=2;
		}/*else {	throw('There was an error building your calendar, please report a bug with bug code 832')}*/
		var current_repeats=1;
		var check_for_haflagas_not_passed_clean_due_to_kessem=false;
		var last_veses_from_any_cause=_veses.get_prev_veses();
		for(i in last_veses._haflagas){
			var xx=Number(last_veses._haflagas[i][0]);
			var repeats=Number(last_veses._haflagas[i][1]);
			if(xx>xc){
				new_haflaga = new Array(xx,repeats,last_veses._haflagas[i][2])
				a_Haflaga.push(new_haflaga);
			}else if(xx==xc){
				current_repeats=repeats+1;
			}else if(last_veses_from_any_cause!=last_veses){
				check_for_haflagas_not_passed_clean_due_to_kessem=true;
			}
		}
		xnew_haflaga = new Array(xc,current_repeats,_veses)
		a_Haflaga.push(xnew_haflaga);
	}else if(_veses._cause!=Cause.birth_s
			 &&_veses._cause!=Cause.birth_d
			 &&(_veses._cause!=Cause.preglost||_veses.goesOnCalendar())){
		a_Haflaga = new Array();
	}
	
	last_nidah=_veses.get_prev_veses();
	
	if(last_nidah!=null&&last_nidah._cause>Cause.unclean&&last_nidah._cause<Cause.start_1){	
		a_Haflaga=new Array();	
	}
	return a_Haflaga
}
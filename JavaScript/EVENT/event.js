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
/*
RECREATE
Event.prototype.reeyah_time=function(){
	try{
		found=false;
		if(this._type==_BENONIS_||this._type==_HAFLAGAH_)
			if(this._veses==null)
				return-1;
			else
				found=true;
		if(!found&&this._misc==null){
			if(this._veses==null)
				return-1;
			else
				found=true;
		}
		if(!found){
			d1=new Day(this._misc._reeyah);
			rtime=this._misc._time;
		}else{
			d1=new Day(this._veses._reeyah);
			rtime=this._veses._time;
		}
		if(d1._date===undefined){return-1;}
		d2=new Day(this._date);
		if(d1.isDST()&&!d2.isDST())
			rtime=rtime-60;
		if(!d1.isDST()&&d2.isDST())
			rtime=rtime+60;return rtime;
	}catch(err){return-1;}
};
*/
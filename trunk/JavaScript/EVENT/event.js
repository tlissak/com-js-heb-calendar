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

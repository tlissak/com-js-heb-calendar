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
	this._misc=null;}
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
var _RABBIS_=new Array(new Array('Rabbi Sholom Ber Chaikin','chayamk1@gmail.com','216-381-9178','Ohio'),
					 new Array('Rabbi Chaikin','rabbi@oxfordshul.com','27-83-794-1178','South Africa'),
					 new Array('Rabbi Gluckowsky','bdchabad@012.net.il','972-504-145-770','Israel'),
					 new Array('Rabbi Groner','sbgronersa@gmail.com','27-82-964-8900 (available 24 hrs daily)','South Africa'),
					 new Array('Rabbi Jacobs','RabbiJacobs@FamilyPurity.com','972-3-9607-402','Israel'),
					 new Array('Rabbi Jurkowicz','rabbibb@gmail.com','972-54-797-7042 ','Israel'),
					 new Array('Dayan Raskin','lyraskin@btinternet.com','44-208-802-1606 ','London'),
					 new Array('Rabbi Schmerling','rabbischmerling@gmail.com','917-689-5124','New York'),
					 new Array('Rabbi Shusterman','none','310-271-9063','California'),
					 new Array('Rabbi Ulman','ulman@tpg.com.au','612-9300-6279 or 347-853-8014','Sydney'),
					 new Array('Rabbi Vigler','rabbivigler@gmail.com','718-510-3258','New York'));;
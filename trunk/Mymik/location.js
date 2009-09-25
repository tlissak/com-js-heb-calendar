var _home_locations=new Array();
var home_location='';

function Location(id,name,lat,long,gmt,tz,start,end){
	this._id=id;this._name=name;
	this._lat=Number(lat);
	this._long=Number(long);
	this._gmt_offset=Number(gmt);
	this._timezone=tz;if(typeof start=="undefined")
	this._start_date=null;else
	this._start_date=start;if(typeof end=="undefined")
	this._end_date=null;else
	this._end_date=end;}
Location.prototype._id;
Location.prototype._name;
Location.prototype._lat;
Location.prototype._long;
Location.prototype._gmt_offset;
Location.prototype._timezone;
Location.prototype._start_date
Location.prototype._end_date
Location.prototype.toString=function(){return this._name;}
Location.prototype.info=function(hdate){
	if(getDST(12,0,hdate,this._timezone,this._gmt_offset)>0)
	return this._name+' (Daylight saving time)';else
	return this._name;}
Location.prototype.get_gmt_offset=function(hdate){
	if(this._timezone=='none')
	return this._gmt_offset;var ed=hdate.to_eng_array();
	var D=new fleegix.date.Date(ed[2],ed[1]-1,ed[0],11,30,this._timezone);return-1*D.getTimezoneOffset();}
	
function getHomeLocation(hdate){
	if(hdate==undefined&&home_location==''){
		for(i in _home_locations)
		if(_home_locations[i]._end_date==null)
	{home_location=_home_locations[i];return _home_locations[i];}}
	else if(hdate==undefined)
	return home_location;for(i in _home_locations)
	{var l=_home_locations[i];if((l._start_date==null||!l._start_date.is_later_then(hdate))&&(l._end_date==null||!hdate.is_later_then(l._end_date)))
	return l;}
	alert('error: no home location for date: '+hdate);return null;}
function international_dateline_checker(day){
	for(i in day._locations)for(j in day._locations){if(i==j)
	continue;var l1=Number(day._locations[i]._long);var l2=Number(day._locations[j]._long);if(l1>7000||l1<-16970)
	if(l2<-3500&&l2>-16970)
	return' or you may be able to go to the mikvah a night early if your flight between '
	+day._locations[i]._name.split(",",1)+' and '+day._locations[j]._name.split(",",1)
	+' crossed the International Date Line in the Pacific Ocean, '}
	return'';}
function crosses_date_line(location1,location2){
	if(location1._name==location2._name)
	return false;var l1=Number(location1._long);var l2=Number(location2._long);if(l1>7000||l1<-16970)
	if(l2<-3500&&l2>-16970)
	return true;if(l2>7000||l2<-16970)
	if(l1<-3500&&l1>-16970)
	return true;return false;};
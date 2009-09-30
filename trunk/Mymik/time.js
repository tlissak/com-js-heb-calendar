function time2min(oTime){
		hr=parseInt(oTime.hr);
		minute=parseInt(oTime.min);
		var time=minute;
		if(hr==12)
			hr=0;
		time+=60*hr;
		//if(!isAM)	time=time+720+(60*hr);
		return time;
}
function getDST(h,m,oDate,tz,gmt){
	if(tz=='none')
		return 0;
	var ed= new GDate(oDate)
	var D=new fleegix.date.Date(ed.d,ed.m-1,ed.y,h,m,tz);
	return(-1*(D.getTimezoneOffset()/60))-gmt;
}

function get_zman(oDate,type,loc){
	// index = -1
	var hdate=new HDate(oDate);
	var location;
	if(loc===undefined){
		if(index===undefined)
			index=0;
		location=day._locations[index];
		if(location==null){
			alert(oDate+" does not have a location");
			return-1;
		}
	}else{location=loc;}
	sunsetSunriseHour=sunsetSunriseMin=0;
	var isSunrise=false;
	if(type==2)
		isSunrise=true;
	var english_date;
	
	//if(type==1)
	//	english_date=hdate.to_eng_night_array();
	//else
	//	english_date=hdate.to_eng_array();
	english_date = new GDate(hdate)
	NewSunsetGetSunsetSunrise(english_date.d,english_date.m,english_date.y,isSunrise,location._lat,location._long,location._gmt_offset);
	if(location._timezone=='none')
		return(sunsetSunriseHour*60)+sunsetSunriseMin;
	if(type==1){
		var d=hdate.clone().prev();
		return(sunsetSunriseHour*60)+sunsetSunriseMin+(60*getDST(sunsetSunriseHour,sunsetSunriseMin,d,location._timezone,location._gmt_offset));
	}
	return(sunsetSunriseHour*60)+sunsetSunriseMin+(60*getDST(sunsetSunriseHour,sunsetSunriseMin,hdate,location._timezone,location._gmt_offset));
}
function leap(y){
	if(y%400==0)
		return true;
	if(y%100!=0){
		if(y%4==0)
			return true;
	}
	return false;
}
function doy(d,m,y){
	monCount=Array(0,1,32,60,91,121,152,182,213,244,274,305,335,366);
	if((m>2)&&(leap(y)))
		return monCount[m]+d+1;
	else
		return monCount[m]+d;
}
function todec(deg,min){return(deg+min/60.0);}
function M(x){return(0.9856*x-3.251);}
function L(x){return(x+1.916*Math.sin(0.01745*x)+0.02*Math.sin(2*0.01745*x)+282.565);}
function adj(x){return(-0.06571*x-6.620);}
function float_abs(x){if(x<0.0)return(-x);else return(x);}
function suntime(d,m,y,zendeg,zenmin,londeg,lonmin,ew,latdeg,latmin,ns,tz){
	retval=true;day=doy(d,m,y);cosz=Math.cos(0.01745*todec(zendeg,zenmin));var longitude=todec(londeg,lonmin)*((ew==0)?1:-1);
	lonhr=longitude/15.0;var latitude=todec(latdeg,latmin)*((ns==0)?1:-1);coslat=Math.cos(0.01745*latitude);
	sinlat=Math.sin(0.01745*latitude);t_rise=day+(6.0+lonhr)/24.0;t_set=day+(18.0+lonhr)/24.0;xm_rise=M(t_rise);
	xl_rise=L(xm_rise);xm_set=M(t_set);xl_set=L(xm_set);a_rise=57.29578*Math.atan(0.91746*Math.tan(0.01745*xl_rise));
	a_set=57.29578*Math.atan(0.91746*Math.tan(0.01745*xl_set));
	if(float_abs(a_rise+360.0-xl_rise)>90.0)
a_rise+=180.0;if(a_rise>360.0)
a_rise-=360.0;if(float_abs(a_set+360.0-xl_set)>90.0)
a_set+=180.0;if(a_set>360.0)
a_set-=360.0;ahr_rise=a_rise/15.0;sindec=0.39782*Math.sin(0.01745*xl_rise);cosdec=Math.sqrt(1.0-sindec*sindec);
h_rise=(cosz-sindec*sinlat)/(cosdec*coslat);ahr_set=a_set/15.0;sindec=0.39782*Math.sin(0.01745*xl_set);cosdec=Math.sqrt(1.0-sindec*sindec);
h_set=(cosz-sindec*sinlat)/(cosdec*coslat);if(float_abs(h_rise)<=1.0)
h_rise=57.29578*Math.acos(h_rise);else
retval=false;if(float_abs(h_set)<=1.0)
h_set=57.29578*Math.acos(h_set);else
retval=false;ut_rise=((360.0-h_rise)/15.0)+ahr_rise+adj(t_rise)+lonhr;
ut_set=(h_rise/15.0)+ahr_set+adj(t_set)+lonhr;returnSunrise=ut_rise+tz;
returnSunset=ut_set+tz;return retval;}
function timeadj(t){
	if(t<0)t+=24.0;
	hour=Math.floor(t);
	min=Math.floor((t-hour)*60.0+0.5);
	if(min>=60){hour+=1;min-=60;}
	if(hour>24)hour-=24;returnHour=hour;
	returnMin=min;}
function NewSunsetGetSunsetSunrise(uDay,uMonth,uYear,fSunrise,iLatitude,iLongitude,iTimeZone){
	if(suntime(uDay,uMonth,uYear,90,50
			   ,Math.abs(parseInt(iLongitude/100))
			   ,parseInt(Math.abs(iLongitude%100)),(iLongitude<0)?0:1,Math.abs(parseInt(iLatitude/100))
			   ,parseInt(Math.abs(iLatitude%100)),(iLatitude<0)?1:0,iTimeZone))
{timeadj(returnSunrise);
iSunriseHour=returnHour;
iSunriseMin=returnMin;timeadj(returnSunset);iSunsetHour=returnHour;iSunsetMin=returnMin;while(iSunriseHour>12)
iSunriseHour-=12;while(iSunsetHour<12)
iSunsetHour+=12;if(fSunrise)
{sunsetSunriseHour=iSunriseHour;sunsetSunriseMin=iSunriseMin;}
else
{sunsetSunriseHour=iSunsetHour;sunsetSunriseMin=iSunsetMin;}
if(isDST(uDay,uMonth,uYear)){sunsetSunriseHour++;if(sunsetSunriseHour==24)
sunsetSunriseHour=0;}
return true;}
else
return false;}
function NewSunGetDegreesBelowHorizon(uDay,uMonth,uYear,fDegreesBelowHorizon,iLatitude,iLongitude,iTimeZone)
{if(suntime(uDay,uMonth,uYear,90,50
			,Math.abs(parseInt(iLongitude/100))
			,parseInt(Math.abs(iLongitude%100)),(iLongitude<0)?0:1,Math.abs(parseInt(iLatitude/100))
			,parseInt(Math.abs(iLatitude%100)),(iLatitude<0)?1:0,iTimeZone))
{sunset=returnSunset;db=fDegreesBelowHorizon+90.0;
deghour=Math.floor(db);db=db-deghour;db*=60.0;degmin=Math.floor(db);
if(suntime(uDay,uMonth,uYear,deghour,degmin
		,Math.abs(parseInt(iLongitude/100))
		,parseInt(Math.abs(iLongitude%100))	
		,(iLongitude<0)?0:1,Math.abs(parseInt(iLatitude/100))
		,parseInt(Math.abs(iLatitude%100)),(iLatitude<0)?1:0,iTimeZone))
{sunset2=returnSunset;timeadj(sunset);iSunsetHour=returnHour;iSunsetMin=returnMin;timeadj(sunset2);
iSunset2Hour=returnHour;iSunset2Min=returnMin;while(iSunsetHour<12)
iSunsetHour+=12;while(iSunset2Hour<12)
iSunset2Hour+=12;iS=iSunsetHour*60+iSunsetMin;iS2=iSunset2Hour*60+iSunset2Min;iDiff=iS2-iS;
returnDGHour=Math.floor(iDiff/60);returnDGMin=iDiff%60;return true;}
else
return false;}
else
return false;};
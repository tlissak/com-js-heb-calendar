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
function time(_time){
	if(_time>1439)
		_time-=1440;
	else if(_time<0)
		_time+=1440;
	var hour=Math.floor(_time/60);
	ampm="AM";
	if(hour>11)
		ampm="PM";
	if(hour>12)
		hour=hour-12;
	if(hour==0)
		hour=12;
	var minute=_time%60;
	if(minute<10)
		minute="0"+minute;
	return hour+":"+minute+" "+ampm;
}
function todec(deg,min){return(deg+min/60.0);}
function timeadj(t){
	if(t<0)t+=24.0;
	hour=Math.floor(t);
	min=Math.floor((t-hour)*60.0+0.5);
	if(min>=60){hour+=1;min-=60;}
	if(hour>24)hour-=24;returnHour=hour;
	returnMin=min;
}
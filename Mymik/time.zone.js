// JavaScript Document
fleegixDate=function(){
	var args=Array.prototype.slice.apply(arguments);
	var t=null;var dt=null;var tz=null;var utc=false;
	if(args.length==0){dt=new Date();}
	else if(args.length==1){dt=new Date(args[0]);}
	else{t=args[args.length-1];if(typeof t=='boolean'){utc=args.pop();tz=args.pop();}
	else if(typeof t=='string'&&t!='none'){tz=args.pop();if(tz=='Etc/UTC'||tz=='Etc/GMT'){utc=true;}}
	t=args[args.length-1];if(typeof t=='string'){dt=new Date(args[0]);}
	else{var a=[];for(var i=0;i<8;i++){a[i]=args[i]||0;}
	dt=new Date(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]);}}
	this._useCache=false;this._tzInfo={};this._tzAbbr='';this.year=0;
	this.month=0;this.date=0;this.hours=0;this.minutes=0;this.seconds=0;
	this.milliseconds=0;this.timezone=tz||null;this.utc=utc||false;this.setFromDateObjProxy(dt);}
	
fleegixDate.prototype={getDate:function(){return this.date;}
		,getDay:function(){},getFullYear:function(){return this.year;}
		,getMonth:function(){return this.month;},getYear:function(){return this.year;}
		,getHours:function(){return this.hours;},getMilliseconds:function(){return this.milliseconds;}
		,getMinutes:function(){return this.minutes;},getSeconds:function(){return this.seconds;}
		,getTime:function(){
			var dt=Date.UTC(this.year,this.month,this.date,this.hours,this.minutes,this.seconds,this.milliseconds);
			return dt+(this.getTimezoneOffset()*60*1000);}
		,getTimezone:function(){return this.timezone;}
		,getTimezoneOffset:function(){var info=this.getTimezoneInfo();return info.tzOffset;}
		,getTimezoneAbbreviation:function(){var info=this.getTimezoneInfo();return info.tzAbbr;}
		,getTimezoneInfo:function(){
			var res;if(this.utc){res={tzOffset:0,tzAbbr:'UTC'};}
			else{if(this._useCache){res=this._tzInfo;}
			else{if(this.timezone){
			var dt=new Date(Date.UTC(this.year,this.month,this.date,this.hours,this.minutes,this.seconds,this.milliseconds));
			var tz=this.timezone;res=fleegix.date.timezone.getTzInfo(dt,tz);}
			else{res={tzOffset:this.getLocalOffset(),tzAbbr:null};}
			this._tzInfo=res;this._useCache=true;}}	return res;}
		,getUTCDate:function(){return this.getUTCDateProxy().getUTCDate();},getUTCDay:function(){return this.getUTCDateProxy().getUTCDay();}
		,getUTCFullYear:function(){return this.getUTCDateProxy().getUTCFullYear();}
		,getUTCHours:function(){return this.getUTCDateProxy().getUTCHours();}
		,getUTCMilliseconds:function(){return this.getUTCDateProxy().getUTCMilliseconds();}
		,getUTCMinutes:function(){return this.getUTCDateProxy().getUTCMinutes();}
		,getUTCMonth:function(){return this.getUTCDateProxy().getUTCMonth();}
		,getUTCSeconds:function(){return this.getUTCDateProxy().getUTCSeconds();}
		,setDate:function(n){this.setAttribute('date',n);},setFullYear:function(n){this.setAttribute('year',n);}
		,setMonth:function(n){this.setAttribute('month',n);},setYear:function(n){this.setUTCAttribute('year',n);}
		,setHours:function(n){this.setAttribute('hours',n);},setMilliseconds:function(n){this.setAttribute('milliseconds',n);}
		,setMinutes:function(n){this.setAttribute('minutes',n);},setSeconds:function(n){this.setAttribute('seconds',n);}
		,setTime:function(n){if(isNaN(n)){throw new Error('Units must be a number.');}
		var dt=new Date(0);
		dt.setUTCMilliseconds(n-(this.getTimezoneOffset()*60*1000));this.setFromDateObjProxy(dt,true);}
		,setUTCDate:function(n){this.setUTCAttribute('date',n);}
		,setUTCFullYear:function(n){this.setUTCAttribute('year',n);},setUTCHours:function(n){this.setUTCAttribute('hours',n);}
		,setUTCMilliseconds:function(n){this.setUTCAttribute('milliseconds',n);},setUTCMinutes:function(n){this.setUTCAttribute('minutes',n);}
		,setUTCMonth:function(n){this.setUTCAttribute('month',n);},setUTCSeconds:function(n){this.setUTCAttribute('seconds',n);}
		,toGMTString:function(){},toLocaleString:function(){},toLocaleDateString:function(){},toLocaleTimeString:function(){}
		,toSource:function(){}
		,toString:function(){var str=this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();var hou=this.getHours()||12;hou=String(hou);
			var min=String(this.getMinutes());if(min.length==1){min='0'+min;}
			var sec=String(this.getSeconds());if(sec.length==1){sec='0'+sec;}
			str+=' '+hou;str+=':'+min;str+=':'+sec;return str;}
		,toUTCString:function(){},valueOf:function(){return this.getTime();}
		,clone:function(){
			return new fleegix.date.Date(this.year,this.month,this.date,this.hours,this.minutes,this.seconds,this.milliseconds,this.timezone);}
		,setFromDateObjProxy:function(dt,fromUTC){this.year=fromUTC?dt.getUTCFullYear():dt.getFullYear();
			this.month=fromUTC?dt.getUTCMonth():dt.getMonth();this.date=fromUTC?dt.getUTCDate():dt.getDate();
			this.hours=fromUTC?dt.getUTCHours():dt.getHours();this.minutes=fromUTC?dt.getUTCMinutes():dt.getMinutes();
			this.seconds=fromUTC?dt.getUTCSeconds():dt.getSeconds();
			this.milliseconds=fromUTC?dt.getUTCMilliseconds():dt.getMilliseconds();this._useCache=false;}
		,getUTCDateProxy:function(){var dt=new Date(Date.UTC(this.year,this.month,this.date,this.hours,this.minutes,this.seconds,this.milliseconds));
			dt.setUTCMinutes(dt.getUTCMinutes()+this.getTimezoneOffset());return dt;}
		,setAttribute:function(unit,n){if(isNaN(n)){throw new Error('Units must be a number.');}
			var dt=new Date(this.year,this.month,this.date,this.hours,this.minutes,this.seconds,this.milliseconds);
			var meth=unit=='year'?'FullYear':unit.substr(0,1).toUpperCase()+unit.substr(1);
			dt['set'+meth](n);this.setFromDateObjProxy(dt);}
		,setUTCAttribute:function(unit,n){if(isNaN(n)){throw new Error('Units must be a number.');}
			var meth=unit=='year'?'FullYear':unit.substr(0,1).toUpperCase()+unit.substr(1);var dt=this.getUTCDateProxy();dt['setUTC'+meth](n);
			dt.setUTCMinutes(dt.getUTCMinutes()-this.getTimezoneOffset());this.setFromDateObjProxy(dt,true);}
		,setTimezone:function(tz){if(tz=='Etc/UTC'||tz=='Etc/GMT'){this.utc=true;}
			this.timezone=tz;this._useCache=false;},civilToJulianDayNumber:function(y,m,d){m++;if(m>12){var a=parseInt(m/12);m=m%12;y+=a;}
			if(m<=2){y-=1;m+=12;} var a=Math.floor(y/100);var b=2-a+Math.floor(a/4);
			jDt=Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+b-1524;return jDt;}
		,getLocalOffset:function(){var dt=this;var d=new Date(dt.getYear(),dt.getMonth(),dt.getDate(),dt.getHours(),dt.getMinutes(),dt.getSeconds());
			return d.getTimezoneOffset();}}
			
fleegixDate.timezone=new function(){
	var _this=this;var monthMap={'jan':0,'feb':1,'mar':2,'apr':3,'may':4,'jun':5,'jul':6,'aug':7,'sep':8,'oct':9,'nov':10,'dec':11}
var dayMap={'sun':0,'mon':1,'tue':2,'wed':3,'thu':4,'fri':5,'sat':6}
var regionMap={'EST':'northamerica','MST':'northamerica','HST':'northamerica','EST5EDT':'northamerica','CST6CDT':'northamerica'
			,'MST7MDT':'northamerica','PST8PDT':'northamerica','America':'northamerica','Pacific':'australasia','Atlantic':'europe'
			,'Africa':'africa','Indian':'africa','Antarctica':'antarctica','Asia':'asia','Australia':'australasia','Europe':'europe'
			,'WET':'europe','CET':'europe','MET':'europe','EET':'europe'}
var regionExceptions={'Pacific/Honolulu':'northamerica','Atlantic/Bermuda':'northamerica','Atlantic/Cape_Verde':'africa'
			,'Atlantic/St_Helena':'africa','Indian/Kerguelen':'antarctica','Indian/Chagos':'asia','Indian/Maldives':'asia','Indian/Christmas':'australasia'
			,'Indian/Cocos':'australasia','America/Danmarkshavn':'europe','America/Scoresbysund':'europe','America/Godthab':'europe','America/Thule':'europe'
			,'Asia/Yekaterinburg':'europe','Asia/Omsk':'europe','Asia/Novosibirsk':'europe','Asia/Krasnoyarsk':'europe','Asia/Irkutsk':'europe'
			,'Asia/Yakutsk':'europe','Asia/Vladivostok':'europe','Asia/Sakhalin':'europe','Asia/Magadan':'europe','Asia/Kamchatka':'europe'
			,'Asia/Anadyr':'europe','Africa/Ceuta':'europe','America/Argentina/Buenos_Aires':'southamerica','America/Argentina/Cordoba':'southamerica'
			,'America/Argentina/Tucuman':'southamerica','America/Argentina/La_Rioja':'southamerica','America/Argentina/San_Juan':'southamerica'
			,'America/Argentina/Jujuy':'southamerica','America/Argentina/Catamarca':'southamerica','America/Argentina/Mendoza':'southamerica'
			,'America/Argentina/Rio_Gallegos':'southamerica','America/Argentina/Ushuaia':'southamerica','America/Aruba':'southamerica'
			,'America/La_Paz':'southamerica','America/Noronha':'southamerica','America/Belem':'southamerica','America/Fortaleza':'southamerica'
			,'America/Recife':'southamerica','America/Araguaina':'southamerica','America/Maceio':'southamerica','America/Bahia':'southamerica'
			,'America/Sao_Paulo':'southamerica','America/Campo_Grande':'southamerica','America/Cuiaba':'southamerica','America/Porto_Velho':'southamerica'
			,'America/Boa_Vista':'southamerica','America/Manaus':'southamerica','America/Eirunepe':'southamerica','America/Rio_Branco':'southamerica'
			,'America/Santiago':'southamerica','Pacific/Easter':'southamerica','America/Bogota':'southamerica','America/Curacao':'southamerica'
			,'America/Guayaquil':'southamerica','Pacific/Galapagos':'southamerica','Atlantic/Stanley':'southamerica','America/Cayenne':'southamerica'
			,'America/Guyana':'southamerica','America/Asuncion':'southamerica','America/Lima':'southamerica','Atlantic/South_Georgia':'southamerica'
			,'America/Paramaribo':'southamerica','America/Port_of_Spain':'southamerica','America/Montevideo':'southamerica','America/Caracas':'southamerica'};
function builtInLoadZoneFile(fileName,sync){
	if(typeof fleegix.xhr=='undefined'){throw new Error('Please use the Fleegix.js XHR module, or define your own transport mechanism for downloading zone files.');}
	var url=_this.zoneFileBasePath+'/'+fileName;
	if(sync){return fleegix.xhr.doReq({url:url,async:false});}
	else{return fleegix.xhr.doGet(_this.parseZones,url);}}
function getRegionForTimezone(tz){
	var exc=regionExceptions[tz];if(exc){return exc;}
	else{reg=tz.split('/')[0];return regionMap[reg];}}
function parseTimeString(str){
	var pat=/(\d+)(?::0*(\d*))?(?::0*(\d*))?([wsugz])?$/;
	var hms=str.match(pat);hms[1]=parseInt(hms[1]);hms[2]=hms[2]?parseInt(hms[2]):0;hms[3]=hms[3]?parseInt(hms[3]):0;return hms;}
function getZone(dt,tz){
	var t=tz;var zoneList=_this.zones[t];while(typeof zoneList=="string"){t=zoneList;zoneList=_this.zones[t];}
	if(!zoneList){throw new Error('"'+t+'" is either incorrect, or not loaded in the timezone registry.');}
	for(var i=0;i<zoneList.length;i++){var z=zoneList[i];if(!z[3]){break;}
	var yea=parseInt(z[3]);var mon=11;var dat=31;if(z[4]){mon=monthMap[z[4].substr(0,3).toLowerCase()];dat=parseInt(z[5]);}
	var t=z[6]?z[6]:'23:59:59';t=parseTimeString(t);var d=Date.UTC(yea,mon,dat,t[1],t[2],t[3]);if(dt.getTime()<d){break;}}
	if(i==zoneList.length){throw new Error('No Zone found for "'+timezone+'" on '+dt);}
	return zoneList[i];}
function getBasicOffset(z){
	var off=parseTimeString(z[0]);var adj=z[0].indexOf('-')==0?-1:1
	off=adj*(((off[1]*60+off[2])*60+off[3])*1000);return-off/60/1000;}
function getRule(dt,str){
	var currRule=null;var year=dt.getUTCFullYear();var rules=_this.rules[str];var ruleHits=[];
	var getMonthNumber=function(r){return monthMap[r[3].substr(0,3).toLowerCase()];};
	var checkForHits=function(incr,rule,d,dt){d.setUTCDate(d.getUTCDate()+incr);
	if(dt>=d){ruleHits.push({'rule':rule,'date':d});}
	else if((rule[0]<year)&&(getMonthNumber(r)>8)){d.setUTCFullYear(d.getUTCFullYear()-1);
	if(dt>=d){ruleHits.push({'rule':rule,'date':d});}}};if(!rules||rules=='undefined'){return null;}
	for(var i=0;i<rules.length;i++){r=rules[i];if((r[1]<year)||(r[0]<year&&r[1]=='only')||(r[0]>year)){continue;};
	var mon=getMonthNumber(r);var day=r[4];if(isNaN(day)){if(day.substr(0,4)=='last'){var day=dayMap[day.substr(4,3).toLowerCase()];
	var t=parseTimeString(r[5]);var d=new Date(Date.UTC(dt.getUTCFullYear(),mon+1,1,t[1]-24,t[2],t[3]));var dtDay=d.getUTCDay();
	var incr=(day>dtDay)?(day-dtDay-7):(day-dtDay);checkForHits(incr,r,d,dt);}
	else{day=dayMap[day.substr(0,3).toLowerCase()];if(day!='undefined'){if(r[4].substr(3,2)=='>='){
		var t=parseTimeString(r[5]);
	var d=new Date(Date.UTC(dt.getUTCFullYear(),mon,parseInt(r[4].substr(5)),t[1],t[2],t[3]));
	var dtDay=d.getUTCDay();var incr=(day<dtDay)?(day-dtDay+7):(day-dtDay);checkForHits(incr,r,d,dt);}
	else if(day.substr(3,2)=='<='){var t=parseTimeString(r[5]);
	var d=new Date(Date.UTC(dt.getUTCFullYear(),mon,parseInt(r[4].substr(5)),t[1],t[2],t[3]));
	var dtDay=d.getUTCDay();var incr=(day>dtDay)?(day-dtDay-7):(day-dtDay);checkForHits(incr,r,d,dt);}}}}
	else{var t=parseTimeString(r[5]);
	var d=new Date(Date.UTC(dt.getUTCFullYear(),mon,day,t[1],t[2],t[3]));if(dt<d){continue;}
	else{ruleHits.push({'rule':r,'date':d});}}}
	if(ruleHits.length){f=function(a,b){return(a.date.getTime()>=b.date.getTime())?1:-1;}
	ruleHits.sort(f);currRule=ruleHits.pop().rule;}
	return currRule;}
function getAdjustedOffset(off,rule){
	var save=rule[6];var t=parseTimeString(save);var adj=save.indexOf('-')==0?-1:1;
	var ret=(adj*(((t[1]*60+t[2])*60+t[3])*1000));ret=ret/60/1000;ret-=off
	ret=-Math.ceil(ret);return ret;}
function getAbbreviation(zone,rule){
	var res;var base=zone[2];if(base.indexOf('%s')>-1){var repl;if(rule){repl=rule[7];}
	else{repl='S';}
	res=base.replace('%s',repl);}
	else{res=base;}
	return res;}
	this.zoneFileBasePath;
	this.zoneFiles=['africa','antarctica','asia','australasia','backward','etcetera','europe','northamerica','pacificnew','southamerica'];
	this.loadingSchemes={PRELOAD_ALL:'preloadAll',LAZY_LOAD:'lazyLoad',MANUAL_LOAD:'manualLoad'}
	this.loadingScheme=this.loadingSchemes.LAZY_LOAD;
	this.defaultZoneFile=this.loadingScheme==this.loadingSchemes.PRELOAD_ALL?this.zoneFiles:'northamerica';
	this.loadedZones={};
	this.zones={};this.rules={};
	this.init=function(){var def=this.defaultZoneFile;
		if(typeof def=='string'){this.loadZoneFile(this.defaultZoneFile);}
		else{for(var i=0;i<def.length;i++){this.loadZoneFile(def[i]);}}};
	this.loadZoneFile=function(fileName,sync){if(typeof this.zoneFileBasePath=='undefined'){
		throw new Error('Please define a base path to your zone file directory -- fleegix.date.timezone.zoneFileBasePath.');}
	this.loadedZones[fileName]=true;return builtInLoadZoneFile(fileName,sync);};
	this.loadZoneJSONData=function(url,sync){
		var processData=function(data){data=eval('('+data+')');for(var z in data.zones){_this.zones[z]=data.zones[z];}
		for(var r in data.rules){_this.rules[r]=data.rules[r];}}
		if(sync){var data=fleegix.xhr.doGet(url);processData(data);}
		else{fleegix.xhr.doGet(processData,url);}};
	this.loadZoneDataFromObject=function(data){if(!data){return;}
		for(var z in data.zones){_this.zones[z]=data.zones[z];}
		for(var r in data.rules){_this.rules[r]=data.rules[r];}};
	this.getAllZones=function(){var arr=[];for(z in this.zones){arr.push(z);}	return arr.sort();};
	this.parseZones=function(str){var s='';var lines=str.split('\n');var arr=[];var chunk='';var zone=null;
		var rule=null;for(var i=0;i<lines.length;i++){l=lines[i];if(l.match(/^\s/)){l="Zone "+zone+l;}
		l=l.split("#")[0];if(l.length>3){arr=l.split(/\s+/);chunk=arr.shift();
		switch(chunk){case'Zone':zone=arr.shift();if(!_this.zones[zone]){_this.zones[zone]=[]}
		_this.zones[zone].push(arr);break;case'Rule':rule=arr.shift();if(!_this.rules[rule]){_this.rules[rule]=[]}
		_this.rules[rule].push(arr);break;case'Link':if(_this.zones[arr[1]]){throw new Error('Error with Link '+arr[1]);}
		_this.zones[arr[1]]=arr[0];break;case'Leap':break;default:break;}}}
		return true;};
	this.getTzInfo=function(dt,tz){if(this.loadingScheme==this.loadingSchemes.LAZY_LOAD){var zoneFile=getRegionForTimezone(tz);
		if(!this.loadedZones[zoneFile]){var res=this.loadZoneFile(zoneFile,true);if(res.length){this.parseZones(res);}
		else{throw new Error('Error loading zone file for '+zoneFile);}}}
	var zone=getZone(dt,tz);var off=getBasicOffset(zone);var rule=getRule(dt,zone[1]);if(rule){off=getAdjustedOffset(off,rule);}
	var abbr=getAbbreviation(zone,rule);return{tzOffset:off,tzAbbr:abbr};}}
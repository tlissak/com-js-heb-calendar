/* http://www.calj.net */

function get_city_deg(oCity){
		ew = ((oCity.ew == 0) ? -1 : 1);
		ns = ((oCity.ns == 0) ? 1 : -1);
		var lon = ew * (1 *  oCity.lond +  oCity.lonm/60);
		var lat = ns * (1 *  oCity.latd + oCity.latm/60);
		/*	calculate auto dst		*/
		return {lon:lon,lat:lat,gmt: oCity.gmt,dst:1/****************** get Auto DST **********************/}
}
function timeadj1(_time) {
	var _hour = Math.floor(_time);
			var _min  = Math.floor((_time - _hour) * 60.0 + 0.5 );
			if(_min >= 60) { _hour += 1;  _min  -= 60;  }
			if(_hour < 0){	_hour += 24;}
			//console.log(_time)
			return _hour + ':' + ((_min < 10) ? '0' : '') + _min ;
	
		if (!(parseFloat(_time) )){return "-"}
			function format(_i){	return (_i < 10) ? "0"+ _i : _i	}
			var _hour 	= _time  ;
			var _ihour	= Math.floor(_hour)
			var _min  	= (_time -  _ihour ) * 60.0  ;
			var _imin	= Math.floor(_min)
			var _isec  	= Math.floor((_min - _imin ) * 60.0)  ;	
			/*	var _hour = Math.floor(_time);var _min  = Math.floor((_time - _hour) * 60.0   );var _sec  = Math.floor((_hour - _min) * 60.0   );
			if(_sec >= 60) { _min += 1;  _sec  -= 60;  } ;	if(_min >= 60) { _hour += 1;  _min  -= 60;  } ;	if(_hour < 0){	_hour += 24;}			*/
			return _ihour + ':' + format(_imin) +":"+ format(_isec);
}
JDate.prototype.getZmanim = function(_O){
		if( typeof(_O) != "object" ){ _O = CITY[0] ;c("getZmanim(_O) _O is!object set Jerusalem ")}
		var sunrise,sunset,hanetz,shkia,shaa_zmanit,alot,misheyakir,tzeit,shema,tefillah,chatzot,minchag,minchak,plag,motzeiShabbat,knissatShabbat
		var place = _O.place.toLowerCase()
		var  _D	=  (this.Class == GDate) ? 	this : new GDate(this)//alwayes convert this to gregorien date
		CITY_LL = get_city_deg(_O) 
		place = _O.place
		
		if (place == "jerusalem"){									candle_offset = (40.0/ 60.0) }
		else if(place == "haifa" || place == "be'er Sheva") {		candle_offset = (30.0/ 60.0) }
		else if(place == "karnei Shomron" || place == "tel Aviv") {	candle_offset = (22.0/ 60.0) }
		else{ 														candle_offset = (18.0/ 60.0) }
		
		Time 				= suntime(_D, 90- (/*0.8777*/90 + 50/60 ) ,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);

		sunrise 			= Time.sr
		sunset				= Time.ss
		midday				= sunrise + ((sunset-sunrise)/12) // Time.md		
		shaa_zmanit 		= Time.sz / 6 // (sunset - sunrise) / 12 ;
		korbanot 			= sunrise - (shaa_zmanit/60*90)
		mincha_gedola		= sunrise + (shaa_zmanit*6.5)
		mincha_ketana		= sunrise + (shaa_zmanit*9.5)
		plag_gra			= sunrise + (shaa_zmanit * 10.75)
		plag_gra			= (sunset - (shaa_zmanit +(shaa_zmanit/ 4))) > 0 ?  +(sunset - (shaa_zmanit +(shaa_zmanit/4))) : plag_gra
		plag_mga			= (sunset + (shaa_zmanit/60*13.5)) -(shaa_zmanit + (shaa_zmanit/4)) //+ (24)
		end_shema_gra		= sunrise + (shaa_zmanit * 3)
		end_bir_shema		= sunrise + (shaa_zmanit * 4)
		alot_ovadia			= sunrise - (shaa_zmanit/60*72)
		night_rat_ovadia	= sunset  + (shaa_zmanit/60*72)
		misheyakir_ovadia	= alot_ovadia + shaa_zmanit / 60 * 6
		end_shema_mga_ovadia= alot_ovadia 	+ 3*((night_rat_ovadia-alot_ovadia)/12)	
		night_geonim13min	= sunset + shaa_zmanit /60 * 13.5
		candlelight 		= sunset  - candle_offset;
		Time 				= suntime(_D, 90 - (/*8.5*/98 + 30/60),CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		shabbat_end			= Time.ss;
		Time				= suntime(_D, 90 - (/*16.1*/106 + 6/60 ) ,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		alot_posna			= Time.sr;
		night_rat_posna		= midday + (midday - alot_posna)
		end_shema_mga_posna	= alot_posna 	+ 3*((night_rat_posna-alot_posna)/12)						
		Time				= suntime(_D, 90 - 101/*1*/,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		misheyakir_posna 	= Time.sr;
		Time 				= suntime(_D, 7.5	 ,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		shema_night			= Time.ss
		Time 				= suntime(_D, 90 - 96/*6*/,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		night_geonim6deg	= Time.ss;//tzeit hakochavim Tania 24 min 6.00° 	
		//18:07  	tzet 26 min 6.30° 	18:08 	tzet
		
		oOut = {city:_O
			,sunrise:sunrise,sunset:sunset,midday:midday
			,korbanot:korbanot,mincha_gedola:mincha_gedola,mincha_ketana:mincha_ketana
			,plag_gra:plag_gra,plag_mga:plag_mga,end_shema_gra:end_shema_gra,end_bir_shema:end_bir_shema
			,alot_ovadia:alot_ovadia,night_rat_ovadia:night_rat_ovadia,misheyakir_ovadia:misheyakir_ovadia,end_shema_mga_ovadia:end_shema_mga_ovadia
			,alot_posna:alot_posna,night_rat_posna:night_rat_posna,	misheyakir_posna:misheyakir_posna, end_shema_mga_posna:end_shema_mga_posna
			,shema_night:shema_night,night_geonim6deg:night_geonim6deg,night_geonim13min:night_geonim13min
			,candlelight:candlelight,shabbat_end:shabbat_end
			,shaa_zmanit:shaa_zmanit
		}
		
		return oOut
	function timeadj(_time) {
			var _hour = Math.floor(_time);
			var _min  = Math.floor((_time - _hour) * 60.0 + 0.4 );
			if(_min >= 60) { _hour += 1;  _min  -= 60;  }
			if(_hour < 0){	_hour += 24;}
			//console.log(_time)
			return _hour + ':' + ((_min < 10) ? '0' : '') + _min ;
	}
	function suntime( oDate , h, longitude,latitude ,gmt,dst ){
			//console.log(arguments)
			var D = oDate.getDay()
			var _m = oDate.getMonth()
			var _y = oDate.getYear()			
			function cos(x) { return Math.cos(x); }
			function sin(x) { return Math.sin(x); }
			function sqrt(x) { return Math.sqrt(x); }
			function atan2(y, x) { return Math.atan2(y, x); }
			function acos(x) { return Math.acos(x); }
			var pi = Math.PI; //3.141592653589793
			var UT = -1 //12.0;
			/********** XSL.math.B2 =MOD(B1*0.985647359584+278.9875998,360) **************/			
			var d = (367*_y) - parseInt(7 * ( _y + parseInt((_m+9)/12) ) / 4) + parseInt(275*_m/9) + D - 730530  + UT/24.0; 	
			//console.info("-2em",d)
			//return
			/* XSL.math.B1 =367*Zemanim!B9-INT(7*(Zemanim!B9+INT((Zemanim!B10+9)/12))/4)+INT(275*Zemanim!B10/9)+Zemanim!B11-730530-(Zemanim!B14/24) */			
			var w = (282.9404 + 4.70935E-5 * d) % 360.0;		//deg 
			var e = 0.016709 - 1.151E-9 * d; /* XSL.math.B5   =MOD(0.0167082208-B1*0.0000000012,360) */		
			var M = (356.0470 + 0.9856002585 * d) % 360.0;if(M < 0){ M += 360;} //deg	/* XSL.math.B3  =MOD(356.0493218+0.985600282903*B1,360)*/				
			var ecl = 23.4393 - 3.563E-7 * d;		//deg	/* XSL.math.B4 =MOD(23.43928324 - 0.00000036 * B1,360)  */
			var E = (M + e*(180/pi) * sin(M/180*pi) * ( 1.0 + e * cos(M/180*pi) )) % 360.0;	//deg	
			var xv = cos(E/180*pi) - e;	//* XSL.math.B6 =360/3.14159265359*B5 */
			var yv = sqrt(1.0 - e*e) * sin(E/180*pi);	//*	XSL.math.B7 = (SIN((B3[M]*2)*PI()/180)*B5[e])+(SIN((B3[M])*PI()/180)*B6[xv])+B2[]	*/
			var v = atan2( yv, xv ) / pi * 180;		//deg
			var r = sqrt( xv*xv + yv*yv );		
			var lonsun = (v + w) % 360;		
			var xs = r * cos(lonsun/180*pi);
			var ys = r * sin(lonsun/180*pi);		
			var xe = xs;
			var ye = ys * cos(ecl/180*pi);
			var ze = ys * sin(ecl/180*pi);		
			var RA  = ( atan2( ye, xe ) / pi*180 ) % 360; if(RA < 0) RA += 360; //deg
			var Decl = ( atan2( ze, sqrt(xe*xe+ye*ye) ) /pi*180 ) % 360; if(Decl < 0) Decl += 360;	//deg		
			//////////////		
			var L = (M + w) % 360.0;
			var GMST0 = (L + 180) % 360.0;
			var UT_Sun_in_south = ( RA - GMST0 - longitude ) / 15.0;		
			var cos_LHA = (sin(h/180*pi) - sin(latitude/180*pi)*sin(Decl/180*pi) ) / (cos(latitude/180*pi) * cos(Decl/180*pi));
			if( (cos_LHA < -1) || (cos_LHA > 1) ){		return "zmanim suntime error";}		
			var LHA = acos(cos_LHA) / pi * 180;	
			shaaZmanit	= LHA / 15.0
			midday 	= UT_Sun_in_south+dst
			var TimeOfSunrise	= midday - shaaZmanit
			var TimeOfSunset 	= shaaZmanit + midday ;			
			oOut =  {ss:TimeOfSunset,sr:TimeOfSunrise,md:midday,sz:shaaZmanit};
			//console.log(oOut)
			return oOut
	}	
	
}
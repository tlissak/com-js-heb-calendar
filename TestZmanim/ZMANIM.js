/* http://www.calj.net */

function get_city_deg(oCity){
		ew = ((oCity.ew == 0) ? -1 : 1);
		ns = ((oCity.ns == 0) ? 1 : -1);
		var lon = ew * (1 *  oCity.lond +  oCity.lonm/60);
		var lat = ns * (1 *  oCity.latd + oCity.latm/60);
		/*
		calculate auto dst
		*/
		return {lon:lon,lat:lat,gmt: oCity.gmt,dst:1/****************** get Auto DST **********************/}
}
JDate.prototype.getZmanim = function(_O,_timedmc){
		if( typeof(_O) != "object" ){ _O = CITY_LOCATION[0] ;c("getZmanim(_O) _O is!object set Jerusalem ")}
		var sunrise,sunset,hanetz,shkia,shaa_zmanit,alot,misheyakir,tzeit,shema,tefillah,chatzot,minchag,minchak,plag,motzeiShabbat,knissatShabbat
		var place = _O.place.toLowerCase()
		var  _D	=  (this.Class == GDate) ? 	this : new GDate(this)//alwayes convert this to gregorien date
			
		/*//SunPos =  //90 - 109//90 - 101  //90 - 90.833 
		# h = 0 ° : 	le centre du disque solaire est sur l'horizon mathématique
		# h = -0.25 ° :	l'extrémité haute du disque solaire est sur l'horizon mathématique
		# h = -0.833 ° : Sunset/sunrise// l'extrémité haute du disque solaire est sur l'horizon visible, en tenant compte de la réfraction de l'atmosphère 
		# h = -6 ° :	coucher de soleil civil (il devient impossible de lire dehors sans lumière artificielle)
		# h = -12 ° :	coucher de soleil nautique (la navigation en utilisant l'horizon marin devient impossible)
		# h = -18 ° :	coucher de soleil astronomique (le ciel est complètement obscur, et les observations astronomiques peuvent commencer)
		# h = - 8.5 : motsaei shabat	*/
		CITY_LL = get_city_deg(_O) 
		Time =  suntime(_D, 90 - 90.833 ,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		sunrise = Time.sr
		sunset	= Time.ss
		hanetz = timeadj(sunrise)
		shkia = timeadj(sunset);
		shaa_zmanit = ((sunset - sunrise) / 12); /// Time.sz //
		chatzot		= timeadj(Time.md)
		place = _O.place
		if (place == "jerusalem")
			xmns = (40.0/ 60.0)
		else if(place == "haifa" || place == "be'er Sheva")
			xmns = (30.0/ 60.0)
		else if(place == "karnei Shomron" || place == "tel Aviv")
			xmns = (22.0/ 60.0)
		else{ 
			xmns = (18.0/ 60.0)
		}
		knissatShabbat = timeadj(sunset  - xmns);
		
		Time =  suntime(_D, 90 - 106.1,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		alot = timeadj(Time.sr);
		Time =  suntime(_D, 90 - 101,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		misheyakir = timeadj(Time.sr);
		Time =  suntime(_D, 90 - 96,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		tzeit = timeadj(Time.ss);
		shema    = timeadj(sunrise + shaa_zmanit * 3);
		tefillah = timeadj(sunrise + shaa_zmanit * 4);
		chatzot  = timeadj(sunrise + shaa_zmanit * 6);
		minchag  = timeadj(sunrise + shaa_zmanit * 6.5);
		minchak  = timeadj(sunrise + shaa_zmanit * 9.5);
		plag     = timeadj(sunrise + shaa_zmanit * 10.75);
		// motsaei shabt  90, 30
		Time =  suntime(_D, 90 - 98.5,CITY_LL.lon,CITY_LL.lat,CITY_LL.gmt,CITY_LL.dst);
		motzeiShabbat = timeadj(Time.ss);
		return {
			city:_O
			,sunrise:sunrise,sunset:sunset
			,hanetz:hanetz,	shkia:shkia ,shaa_zmanit:shaa_zmanit,alot:alot,misheyakir:misheyakir
			,tzeit:tzeit,shema:shema,tefillah:tefillah,chatzot:chatzot,minchag:minchag
			,minchak:minchak,plag:plag
			,motzeiShabbat:motzeiShabbat
			,knissatShabbat:knissatShabbat
		}
	function timeadj(_time) {
			var _hour = Math.floor(_time);
			var _min  = Math.floor((_time - _hour) * 60.0 + 0.5);
			if(_min >= 60) { _hour += 1;  _min  -= 60;  }
			if(_hour < 0){	_hour += 24;}
			return _hour + ':' + ((_min < 10) ? '0' : '') + _min ;
	}
	function suntime( date , h, longitude,latitude ,gmt,dst ){
		///////////////////////////////////////////
		 /* Changed 'long' to 'longitude' for	 */
		 //////////////////////////////////////////
			var D = date.getDay()
			var m = date.getMonth()
			var y = date.getYear()
			
			function cos(x) { return Math.cos(x); }
			function sin(x) { return Math.sin(x); }
			function sqrt(x) { return Math.sqrt(x); }
			function atan2(y, x) { return Math.atan2(y, x); }
			function acos(x) { return Math.acos(x); }
			var pi = Math.PI; //3.141592653589793
			var UT = 12.0;
			/********** XSL.math.B2 =MOD(B1*0.985647359584+278.9875998,360) **************/			
			var d = 367*y - parseInt(7 * ( y + parseInt((m+9)/12) ) / 4) + parseInt(275*m/9) + D - 730530 + UT/24.0; 	
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
			if( (cos_LHA < -1) || (cos_LHA > 1) ){		return null;}		
			var LHA = acos(cos_LHA) / pi * 180;	
			shaaZmanit	= LHA / 15.0
			midday 	= UT_Sun_in_south+dst
			var TimeOfSunrise	= midday - shaaZmanit
			var TimeOfSunset 	= shaaZmanit + midday ;			
			return {ss:TimeOfSunset,sr:TimeOfSunrise,md:midday,sz:shaaZmanit};
	}	
	
}
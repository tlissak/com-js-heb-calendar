/***************************************
 *              zmanim.js              *
 ***************************************
 * Shabbat hours computation           *
 ***************************************
 * History														 *
 *                                     *
 * 04/05/2005: v1.3                    *
 * City object with autoDST            *
 *                                     *
 * 29/12/2004: v1.21                   *
 * Changed 'long' to 'longitude' for	 *
 * Firefox compatibility							 *
 *                                     *
 *  19/01/2002: v1.20									 *
 ***************************************
 *                                     *
 * (c) Gabriel Zerbib,                 *
 *   gabriel@bumpt.net                 *
 *   http://www.bumpt.net              *
 *                                     *
 * It is strictly forbidden to use or  *
 * reproduce all or parts of this      *
 * program without author's explicit   *
 * permission.                         *
 * Commercial use of this program is   *
 * subject to purchase. Please contact *
 * the author.                         *
 ***************************************/

function knissatShabat(date, longitude, lat, timeZone)
{
	var hKnissatShabat = -0.833;
	var minOffset = -18/60;
	date = new GDate(date);
	var t = sunset(date.getDay(), date.getMonth(), date.getYear(), hKnissatShabat, longitude, lat, timeZone);
	if(t == null) return null;
	return minOffset + t;
}
function motzaeiShabat(date, longitude, lat, timeZone)
{
	var hMotzaeiShabat = -8.5;
	var minOffset = 0;
	if(date.constructor != GDate) date = new GDate(date);
	var t = sunset(date.getDay(), date.getMonth(), date.getYear(), hMotzaeiShabat, longitude, lat, timeZone);
	if(t == null) return null;
	return minOffset + t;
}

function formatHour(time)
{
	if(time == null) return null;
	if(time < 0) time += 24;
	var hour = parseInt(time);
	var minute = parseInt( (time - hour) * 60);
	if(hour < 10) hour = "0" + hour;
	if(minute < 10) minute = "0" + minute;
	return hour + ":" + minute;
}

function computeZmanim(date, city)
{
	/*
	 * PARAMETERS:
	 * 	date : JDate
	 * 	city : object City
	 *
	 * RETURN
	 *	object { knissatShabbat, motsaeiShabbat }
	 *  		(times, or null if not available)
	 */
	var ns, latDeg, latMin, ew, lonDeg, lonMin, arr;

	ns = city.getNSsign();
	latDeg = city.getLatitudeDeg();
	latMin = city.getLatitudeMin();

	ew = city.getEWsign();
	lonDeg = city.getLongitudeDeg();
	lonMin = city.getLongitudeMin();

	var t = null;
	var dst = city.isDSTon(date) ? 1 : 0;
	var timeZone = city.getTimeZone();

	var longitude = ew * (1 * lonDeg + lonMin/60);
	var lat = ns * (1 * latDeg + latMin/60);


	var gdate = new GDate(date);
	gdate.add(HDate.SHABBAT - gdate.getDayOfWeek());

	t = motzaeiShabat(gdate, longitude, lat, timeZone);

	var tMotsash = null;
	var sMotsash = null;

	if(t == null)
	{
		sMotsash = "/";
		sKnissa = "/";
	}
	else
	{
		tMotsash = dst + t + 1/60;
		sMotsash = formatHour(tMotsash);

		gdate.sub(1);
		t = knissatShabat(gdate, longitude, lat, timeZone);
		if(t == null)
		{
			sMotsash = "/";
			sKnissa = "/";
		}
		else
		{
			var tKnissa = dst + t;
			var sKnissa = formatHour(tKnissa);
		}

	}

	return {date: gdate.add(1),
					knissatShabbat: tKnissa,
				  motsaeiShabbat: tMotsash};
}


function sunset(D, m, y, h, longitude, lat, timeZone)
{
	function cos(x) { return Math.cos(x); }
	function sin(x) { return Math.sin(x); }
	function sqrt(x) { return Math.sqrt(x); }
	function atan2(y, x) { return Math.atan2(y, x); }
	function acos(x) { return Math.acos(x); }
	var pi = Math.PI;


	var UT = 12.0;


	var d = 367*y - parseInt(7 * ( y + parseInt((m+9)/12) ) / 4) + parseInt(275*m/9) + D - 730530 + UT/24.0;

	var w = (282.9404 + 4.70935E-5 * d) % 360.0;		//deg
	var e = 0.016709 - 1.151E-9 * d;
	var M = (356.0470 + 0.9856002585 * d) % 360.0;	if(M < 0) M += 360; //deg

	var ecl = 23.4393 - 3.563E-7 * d;		//deg



	var E = (M + e*(180/pi) * sin(M/180*pi) * ( 1.0 + e * cos(M/180*pi) )) % 360.0;	//deg


	var xv = cos(E/180*pi) - e;
	var yv = sqrt(1.0 - e*e) * sin(E/180*pi);

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

	var cos_LHA = (sin(h/180*pi) - sin(lat/180*pi)*sin(Decl/180*pi) ) / (cos(lat/180*pi) * cos(Decl/180*pi));
	if( (cos_LHA < -1) || (cos_LHA > 1) )
		return null;

	var LHA = acos(cos_LHA) / pi * 180;
	var TimeOfSunset = LHA / 15.0 + UT_Sun_in_south + timeZone;

	return TimeOfSunset;
}

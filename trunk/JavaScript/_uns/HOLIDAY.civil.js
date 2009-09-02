// JavaScript Document
JDate.prototype.getHoliday = function() {// American civil holidays and some major religious holiday
	g 		= new GDate(this)//alwayes convert this to gregorien date
	cday 	= g.getDay()
	cmonth 	= g.getMonth()
	cyear 	= g.getYear()	
	dow		= g.getDayOfWeek()
	
	function Easter(Y) {// based on the algorithm of Oudin
		var C = Math.floor(Y / 100);
		var N = Y - 19 * Math.floor(Y / 19);
		var K = Math.floor((C - 17) / 25);
		var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
		I = I - 30*Math.floor((I / 30));
		I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
		var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
		J = J - 7 * Math.floor(J / 7);
		var L = I - J;
		var M = 3 + Math.floor((L + 40) / 44);
		var D = L + 28 - 31 * Math.floor(M / 4);
		var ret = new Object();
		ret[1] = M;
		ret[2] = D;
		return ret;
	}
	function DOW(day,month,year) {
		var a = Math.floor((14 - month)/12);
		var y = year - a;
		var m = month + 12*a - 2;
		var d = (day + y + Math.floor(y/4) - Math.floor(y/100) +
				Math.floor(y/400) + Math.floor((31*m)/12)) % 7;
		return d + 1;
	}
	function NthDOW(nth,weekday,month,year) {
		if (nth > 0)
			return (nth - 1) * 7 + 1 + (7 + weekday - DOW((nth - 1) * 7 + 1, month, year)) % 7;
		var days = civMonthLength(month, year);
		return days - (DOW(days, month, year) - weekday + 7) % 7;
	}

	if (cmonth == 1 && cday == 1)
		return "New Year's Day";
	else if (cmonth == 2 && cday == 12)
		return "Lincoln's Birthday";
	else if (cmonth == 2 && cday == 14)
		return "Valentine's Day";
	else if (cmonth == 2 && cday == NthDOW(3, 2, 2, cyear))
		return "President's Day";
	else if (cmonth == 3 && cday == 17)
		return "St. Patrick's Day";
	else if (cmonth == 3 || cmonth == 4) {
		var e = Easter(cyear);
	    if (cmonth == e[1] && cday == e[2])
			return "Easter";
	}
	else if (cmonth == 5 && cday == NthDOW(2, 1, 5, cyear))
		return "Mother's Day";
	else if (cmonth == 5 && cday == NthDOW(3, 7, 5, cyear))
		return "Armed Forces Day";
	else if (cmonth == 5 && cday == NthDOW(0, 2, 5, cyear))
		return "Memorial Day";
	else if (cmonth == 6 && cday == 14)
		return "Flag Day";
	else if (cmonth == 6 && cday == NthDOW(3, 1, 6, cyear))
		return "Father's Day";
	else if (cmonth == 7 && cday == 4)
		return "Independence Day";
	else if (cmonth == 9 && cday == NthDOW(1, 2, 9, cyear))
		return "Labor Day";
	else if (cmonth == 10 && cday == NthDOW(2, 2, 10, cyear))
		return "Columbus Day";
	else if (cmonth == 10 && cday == 31)
		return "Halloween";
	else if (cmonth == 11 && cday == 11)
		return "Veterans' Day";
	else if (cmonth == 11 && cday == NthDOW(4, 5, 11, cyear))
		return "Thanksgiving";
	else if (cmonth == 12 && cday == 25)
		return "Christmas";
		
	return "";
}
JDate.prototype.getMoadim = function() {
	g 	= new GDate(this)// convert this to gregorien date
	h 	= new HDate(g)// convert this to Hebrew date
	
	hday	= h.getDay()
	hmonth	= h.getMonth() -1 /* -1 IMPORTANT */
	hyear	= h.getYear()
	cday 	= g.getDay()
	cmonth 	= g.getMonth()
	cyear 	= g.getYear()	
	dow		= g.getDayOfWeek() +1
		
	if(hmonth == 6) {
		if(hday == 1 || hday == 2){return "rosh_hashana"
		}else if(hday == 3 && dow != 7){return "fast_gedalia" 
		}else if(hday == 4 && dow == 1){return "fast_gedalia"
		}else if(hday == 10){ return "yom_kipur"
		}else if(hday >= 15 && hday <= 22){	return "sukot"
		}else if(hday == 23) {	return "isru_chag" }
	}else if(hmonth == 8) {
		if(hday >= 25){	return "chanuka" }
	}else if(hmonth == 9) {
		if(hday <= 2) { return "chanuka"
		}else if(hday == 3) {// Kislev can be malei or chaser
			if(cday == 1) {	cday = 29;cmonth = 11;
			}else if(cday == 2) {cday = 30;	cmonth = 11;
			}else{	cday -= 3;}
			if(hday == 29){return "chanuka"}
		}else if(hday == 10){return "fast_tevet"}
	}else if(hmonth == 10) {
		if(hday==15){return "tu_bishvat"}
	}else if(hmonth == 11 || hmonth == 13) {
		if(hday == 11 && dow == 5){	return "fast_esther"
		}else if(hday == 13 && dow != 7){	return "fast_esther"
		}else if(hday == 14){	return "purim"
		}else if(hday == 15){	return "shushan_purim"}
	}else if(hmonth == 0) {
		if(hday == 12 && dow == 5){return "fast_bechorot"
		}else if(hday == 14 && dow != 7){return "fast_bechorot"
		}else if(hday >= 15 && hday <= 21){return "pesach"
		}else if(hday == 22){return "isru_chag"}
	}else if(hmonth == 1) {
		if(hday == 3 && dow == 5){return "yom_haatsmaut"
		}else if(hday == 4 && dow == 5){return "yom_haatsmaut"
		}else if(hday == 5 && dow != 6 && dow != 7){return "yom_haatsmaut"}
		if(hday == 14){return "pesach_sheni"
		}else if(hday == 18){return "lag_baomer"}
		if(hday == 28){return "yom_yerushalaim"}
	}else if(hmonth == 2) {
		if(hday == 6){return "shavuot"
		}else if(hday == 7){return "isru_chag"}
	}else if(hmonth == 3) {
		if(hday == 17 && dow != 7){return "fast_tamuz"}
		if(hday == 18 && dow == 1){return "fast_tamuz"}
	}else if(hmonth == 4) {
		if(hday == 9 && dow != 7){return "tisha_beav" }
		if(hday == 10 && dow == 1){return "tisha_beav" }
		if(hday == 15){return "tu_beav" }
	}

	return "";
}
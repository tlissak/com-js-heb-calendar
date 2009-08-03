JDate.prototype.getMonthName = function(){
	g = new GDate(this)
	return ["","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Tishri","Cheshvan","Kislev","Tevet","Shvat","Adar","Adar a","Adar b"]
	[g.getMonth()] ;
}
JDate.prototype.getHoliday = function() {// American civil holidays and some major religious holiday
	g 		= new GDate(this)//alwayes convert this to gregorien date
	cday 	= g.getDay()
	cmonth 	= g.getMonth()
	cyear 	= g.getYear()	
	dow		= g.getDayOfWeek()
	
	function Easter(Y) {
		// based on the algorithm of Oudin
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
	hmonth	= h.getMonth() -1
	/*********************************/
	/*		HEB MONTH - 1 ???
	******************************/
	hyear	= h.getYear()
	cday 	= g.getDay()
	cmonth 	= g.getMonth()
	cyear 	= g.getYear()	
	dow		= g.getDayOfWeek()

	if(hmonth == 6) {
		if(hday == 1 || hday == 2)
			return "Rosh Hashana"
		else if(hday == 3 && dow != 7)
			return "Fast of Gedalia";
		else if(hday == 4 && dow == 1)
			return "Fast of Gedalia";
		else if(hday == 10)
			return "Yom Kippur"
		else if(hday >= 15 && hday <= 22)
			return "Sukkot"
		else if(hday == 23)
			return "Isru Chag"
	}else if(hmonth == 8) {
		if(hday >= 25)
			return "Chanukkah"
	}else if(hmonth == 9) {
		if(hday <= 2) {
			return "Chanukkah"
		}else if(hday == 3) {
			// Kislev can be malei or chaser
			if(cday == 1) {
				cday = 29;
				cmonth = 11;
			}else if(cday == 2) {
				cday = 30;
				cmonth = 11;
			}else
				cday -= 3;
			//var hdate = civ2heb(cday, cmonth, cyear);
			//hd = eval(hdate.substring(0, hdate.indexOf(' ')));
			if(hday == 29)
				return "Chanukkah"
		}else if(hday == 10)
			return "Fast of Tevet"
	}else if(hmonth == 10) {
		if(hday==15)
			return "Tu b'Shvat"
	}else if(hmonth == 11 || hmonth == 13) {
		if(hday == 11 && dow == 5)
			return "Taanit Esther"
		else if(hday == 13 && dow != 7)
			return "Taanit Esther"
		else if(hday == 14)
			return "Purim"
		else if(hday == 15)
			return "Shushan Purim"
	}else if(hmonth == 0) {
		if(hday == 12 && dow == 5)
			return "Taanit Bechorot"
		else if(hday == 14 && dow != 7)
			return "Taanit Bechorot"
		else if(hday >= 15 && hday <= 21)
			return "Pesach"
		else if(hday == 22)
			return "Isru Chag" 
	}else if(hmonth == 1) {
		if(hday == 3 && dow == 5)
			return "Yom Ha'Atzmaut"
		else if(hday == 4 && dow == 5)
			return "Yom Ha'Atzmaut"
		else if(hday == 5 && dow != 6 && dow != 7)
			return "Yom Ha'Atzmaut"
		if(hday == 14)
			return "Pesah sheni"
		else if(hday == 18)
			return "Lag B'Omer"
		if(hday == 28)
			return "Yom Yerushalayim"
	}else if(hmonth == 2) {
		if(hday == 6)
			return "Shavuot"
		else if(hday == 7)
			return "Isru Chag"
	}else if(hmonth == 3) {
		if(hday == 17 && dow != 7)
			return "Fast of Tammuz"
		if(hday == 18 && dow == 1)
			return "Fast of Tammuz"
	}else if(hmonth == 4) {
		if(hday == 9 && dow != 7)
			return "Tisha B'Av"
		if(hday == 10 && dow == 1)
			return "Tisha B'Av"
		if(hday == 15)
			return "Tu B'Av"
	}

	return "";
}
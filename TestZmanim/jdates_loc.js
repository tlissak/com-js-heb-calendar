/***************************************
 *          jdates_loc.js              Hebrew / Gregorian french names     
 * June 19, 2003 - Sivan 19, 5763      v2.0    
 * (c) Gabriel Zerbib,                 gabriel@bumpt.net http://www.bumpt.net           
 *  It is strictly forbidden to use or  reproduce all or parts of this  program without author's explicit
 * permission. Commercial use of this program is subject to purchase. Please contact the author.  
 ***************************************/
/* In JavaScript, the .toString method of any object
 * implements the implicit cast to String.*/
GDate.prototype.toString = function (){
	return this.getDay() + (this.getDay() == 1 ? "<sup>er</sup>" : "") + " " + this.MonthName() + " " + this.getYear();
}
HDate.prototype.toString = function (){
	return this.getDay() + " " + this.MonthName() + " " + this.getYear();
}
GDate.MonthName = function(GM){
	switch(GM){
		case 1: return "janvier";
		case 2: return "février";
		case 3: return "mars";
		case 4: return "avril";
		case 5: return "mai";
		case 6: return "juin";
		case 7: return "juillet";
		case 8: return "août";
		case 9: return "septembre";
		case 10: return "octobre";
		case 11: return "novembre";
		case 12: return "décembre";
	}
}
GDate.MonthNameShort = function(GM){
	switch(GM)	{
		case 1: return "JAN";
		case 2: return "FEV";
		case 3: return "MAR";
		case 4: return "AVR";
		case 5: return "MAI";
		case 6: return "JUIN";
		case 7: return "JUIL";
		case 8: return "AOU";
		case 9: return "SEP";
		case 10: return "OCT";
		case 11: return "NOV";
		case 12: return "DEC";
	}
}
GDate.WeekdayNameShortest = function(d){
	switch(d){
		case 0: return "D";
		case 1: return "L";
		case 2: return "M";
		case 3: return "M";
		case 4: return "J";
		case 5: return "V";
		case 6: return "S";
	}
}
GDate.WeekdayNameShort = function (d){
	switch(d){
		case 0: return "dim";
		case 1: return "lun";
		case 2: return "mar";
		case 3: return "mer";
		case 4: return "jeu";
		case 5: return "ven";
		case 6: return "sam";
	}
}
GDate.WeekdayName = function (d){
	switch(d){
		case 0: return "dimanche";
		case 1: return "lundi";
		case 2: return "mardi";
		case 3: return "mercredi";
		case 4: return "jeudi";
		case 5: return "vendredi";
		case 6: return "samedi";
	}
}
HDate.MonthName = function (hm){
	switch(hm){
		case 1: return "Nissan";
		case 2: return "Iyar";
		case 3: return "Sivan";
		case 4: return "Tamouz";
		case 5: return "Av";
		case 6: return "Eloul";
		case 7: return "Tishri";
		case 8: return "Heshvan";
		case 9: return "Kislev";
		case 10: return "Tevet";
		case 11: return "Shvat";
		case 12: return "Adar";
		case 13: return "Adar II";
	}
}
HDate.MonthNameShort = HDate.MonthName;
HDate.WeekdayNameShortest = function (d){
	switch(d){
		case 0: return "&#1488;";
		case 1: return "&#1489;";
		case 2: return "&#1490;";
		case 3: return "&#1491;";
		case 4: return "&#1492;";
		case 5: return "&#1493;";
		case 6: return "&#1513;";
	}
}
JDate.prototype.MonthName = function(){
	return (this.Class.MonthName)(this.getMonth());
}
JDate.prototype.MonthNameShort = function(){
	return (this.Class.MonthNameShort)(this.getMonth());
}
JDate.prototype.WeekdayNameShortest = function(){
	return (this.Class.WeekdayNameShortest)(this.getDayOfWeek());
}
JDate.prototype.WeekdayNameShort = function(){
	return (this.Class.WeekdayNameShort)(this.getDayOfWeek());
}
JDate.prototype.WeekdayName = function(){
	return (this.Class.WeekdayName)(this.getDayOfWeek());
}
HDate.LeapName = function (bLeap){
	if(bLeap) return "embolismique";
	return "commune";
}
HDate.prototype.LeapName = function(){
	return HDate.LeapName(this.isLeap());
}
HDate.YearTypeName = function (type){
	switch(type){
		case HDate.CHASERA: return "d&eacute;ficiente";
		case HDate.SDURA: return "normale";
		case HDate.SHLEMA: return "compl&egrave;te";
	}
}
HDate.prototype.YearTypeName = function(){
	return HDate.YearTypeName(this.getYearType());
}
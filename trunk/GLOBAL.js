Cal.prototype = new GDate(1,12,(new Date()).getFullYear()); 
function Cal(){
	this.getYearInfo = getYearInfo
	function getYearInfo(){
		year			= this.getYear()
		yearLen 		= this.getYearLength()
		lastMonthLen	= this.getMonthLength()
		return {lastMonthLen:lastMonthLen,year:year,yearLen:yearLen}
	}
}
cal = new Cal
function c(){console.log(c.arguments)}
<!--
//HD.getZmanim() {}
//HD.getParashaName() ""
//HD.getMonthName() ""
//HD.getMoadim() ""
//HD.getHoliday() ""
-->
c(cal.getYearInfo())
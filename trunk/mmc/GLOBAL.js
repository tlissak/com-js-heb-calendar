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
function $(id){return document.getElementById(id)}
<!--
//HD.getZmanim() {}
//HD.getParashaName() ""
//HD.getMonthName() ""
//HD.getMoadim() ""
//HD.getHoliday() ""
-->
//c(cal.getYearInfo())

o = new Array()
for (var i=0;i<12;i++){
	GD = new GDate(1,i+1,(new Date()).getFullYear())
	HD = new HDate(GD)
	//c(GD,HD)
	gsize  = GD.getMonthLength()
	hy = HD.getYear()
	
	hm = HD.getMonth()
	nm = HD.nbMonths()
	hd = HD.getDay() 
	mm = HD.getMonthName()
	hsize  = HD.getMonthLength()
	
	o[i] =  new Array()
	//c("outside","day",hd,"month:",hm,"year",hy)
	for (var j=0;j<gsize ;j++){
		if (hd > hsize){
			//c("inside","day",hd,"month:",hm,"year",hy,"size",hsize)
			hd = 1
			hm++
			if (hm == 7){ // tishrqi
				hy++ ; 
			}
			if (hm > nm){ // hm 
				hm=1 ; 
			}
			//c("qfter","day",hd,"month:",hm,"year",hy)
			
			HD.setDate(1,hm,hy)
			hm 		= HD.getMonth()
			hsize  	= HD.getMonthLength()
			mm 		= HD.getMonthName()
			hy		= HD.getYear()
			//c({d:hd,mi:hm,m:mm,y:hy})
		}
		o[i][j] = {d:hd,m:mm,y:hy} 
		hd++
	}
}
window.onload = function(){
		$("q").href = "?rnd="+Math.random()
}
console.log(o[9])

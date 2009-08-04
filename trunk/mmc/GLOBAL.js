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
function getDo(){
	o = new Array()
	for (var i=0;i<12;i++){
		GD = new GDate(1,i+1,(new Date()).getFullYear())
		HD = new HDate(GD)//c(GD,HD)
		gsize  = GD.getMonthLength()
		dow = GD.getDayOfWeek() +1
		hy = HD.getYear()
		hm = HD.getMonth()
		nm = HD.nbMonths()
		hd = HD.getDay() 
		mm = HD.getMonthName()
		hsize  = HD.getMonthLength()
		o[i] =  new Array()//c("outside","day",hd,"month:",hm,"year",hy)	
		for (var j=0;j<gsize ;j++){
			if (hd > hsize){//c("inside","day",hd,"month:",hm,"year",hy,"size",hsize)			
				hd = 1
				hm++
				if (hm == 7){ /*tishrqi*/	hy++ ; 	}
				if (hm > nm){ /* hm */	hm=1 ; }
				//c("qfter","day",hd,"month:",hm,"year",hy)
				HD.setDate(1,hm,hy)
				hm 		= HD.getMonth()
				hsize  	= HD.getMonthLength()
				mm 		= HD.getMonthName()
				hy		= HD.getYear() 
			}
			if (dow > 7){dow = 1}
			o[i][j] = {dow:dow,d:hd,m:mm,y:hy} //c({d:hd,mi:hm,m:mm,y:hy})
			hd++
			dow++
		}
	}
	return o
}
window.onload = function(){
		$("q").href = "?rnd="+Math.random()
		show()
}
function show(){
	d = getDo()
	td = new Date()
	
	tdy = td.getFullYear()
	tdd = td.getDate()
	tdm = td.getMonth() +1
	
	for (var i=0;i<d.length;i++){
		x = ''
		for (var j=0;j<d[i].length;j++){
			dd = d[i][j]
			cs=(dd.dow==7) ? 's' : ''
			istd = ((i+1)==tdm&&(j+1)==tdd) ? 'tod' : '' 
			x += '<tr class="'+cs+' '+istd+'"><td width="10%">'+dd.dow+'</td><td width="10%">'+(j+1)+'/'+(i+1)+'/'+tdy+'</td>'
			x += '<td width="50%" onmouse="">_</td><td width="12%">Ed</td><td width="12%">En</td><td width="15%">'+dd.d +' ' +dd.m+' '+dd.y+'</td></tr>'
		}	
		$("d").innerHTML += x 
	}		
}
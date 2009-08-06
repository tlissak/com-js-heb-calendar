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
function cursorPosition(ev){ev = ev || window.event;	
	if(ev.pageX || ev.pageY){return {x:ev.pageX, y:ev.pageY};}
	return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop};
}
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
		gm = GD.getMonthName()
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
			o[i][j] = {dow:dow,d:hd,m:hm,hm:mm,gm:gm,y:hy} //c({d:hd,mi:hm,m:mm,y:hy})
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
	pos = 0
	

	for (var i=0;i<d.length;i++){
		x = '<li><table>'		
		x += "<tr class='m'><th colspan='7'>"+d[i][0].gm+"</th></tr>"		
		x += '<tr class="j"><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>'		
		x += '<tr>'		
		for (var of = 1;of < d[i][0].dow;of++){	x += "<th>-</th>"}		
		for (var j=0;j<d[i].length;j++){
			//pos ++ ; 	
			dd = d[i][j]			//if ((i+1)==tdm&&(j+1)==tdd) { xpos = pos -15 ; 	istd = 'tod'	}
			x += '<td id="j_'+i+'_'+j+'" onclick="_j(event,'+i+','+j+')">'+(j+1)+'</td>'
			if (dd.dow==7){	x += '</tr><tr>'} /*Sha.bat*/
		}	
		if (dd.dow < 7){for (var of =dd.dow;of < 7 ; of++){	x += "<th>-</th>"	}}
		x += '</tr></table></li>'
		$("d").innerHTML += x 
	}
}

function _j(e,i,j){
	is_israel = false 
	
	pos = cursorPosition(e)
	cm = i+1	
	cj = j+1	
	cy = (new Date()).getFullYear()
	
	gd  = new GDate(cj,cm,cy)
	hd  = new HDate(gd)	
	
	city = $("city").value 
	country = $("city").options[$("city").selectedIndex].parentNode.label.toLowerCase()
	
	if (country == "israel"){is_israel = true }
	
	jEvent = new JEvent(HOLIDAYS.currentHoliday(hd))
	
	//c(je)
	
	zmanim = hd.getZmanim(city)	
	parasha = hd.getParashaName(is_israel,is_israel)
	

	 
	$("j").style.display 	= "block"
	$("j").style.top 		= pos.y+"px"
	$("j").style.left 		= pos.x+"px"
	
	
	$("gd").innerHTML = cj +"."+ cm+"."+cy
	$("cd").innerHTML = cj +" "+  gd.getMonthName() +" "+cy
	$("hd").innerHTML = hd.getDay() +" "+  hd.getMonthName() +" "+ hd.getYear()
	if (jEvent.name){
		$("holiday").style.display 	= "block"	
		$("hdd").innerHTML = jEvent.name
	}else{
		$("holiday").style.display 	= "none"		
		$("hdd").innerHTML = ""
	}
	if (gd.getDayOfWeek()==6){
		$("shabat").style.display 	= "block"
		$("pn").innerHTML 	= parasha
	}else{
		$("pn").innerHTML 	= ""
		$("shabat").style.display 	= "none"
	}
	
	$("s_st").innerHTML = zmanim.knissatShabbat
	$("s_en").innerHTML = zmanim.motzeiShabbat
	
	$("sr").innerHTML = zmanim.hanetz
	$("ss").innerHTML = zmanim.shkia
	$("ct").innerHTML = zmanim.city.place
}

function Move(e,elm){
	//Move by tlissak v 0.7 
	var elm = elm
	elm.style.position = "absolute"
	
	var process 	= true
	var cursorPosition = function (ev){
		ev = ev || window.event;
		if(ev.pageX || ev.pageY){			return {x:ev.pageX, y:ev.pageY};		}
		return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
				y:ev.clientY + document.body.scrollTop  - document.body.clientTop}
	}
	var findObjPos = function (obj) {
		if (obj){
			var curleft = 0 ;var curtop = 0;
			if (obj.offsetParent) {
				curleft = obj.offsetLeft ; curtop = obj.offsetTop
				while (obj = obj.offsetParent) {
					curleft += obj.offsetLeft ; curtop += obj.offsetTop
				}
			}
			return {x:curleft,y:curtop};
		}
	}	
	var old_y_pos  = parseInt(elm.style.top) ? parseInt(elm.style.top) : findObjPos(elm).y
	var old_x_pos	= parseInt(elm.style.left) ? parseInt(elm.style.left) : findObjPos(elm).x
	var old_csr_x  = cursorPosition(e).x - old_x_pos
	var old_csr_y	= cursorPosition(e).y - old_y_pos
	
	document.onmousemove= mousemove
	document.body.onselectstart=function(){return false}//ie
	document.body.onmousedown=function(){return false}//mozilla}
	function mouseup(){
		process=false
		document.onmouseup = null
		document.onmousemove = null
		document.body.onselectstart=function(){return true}//ie
		document.body.onmousedown=function(){return true}//mozilla
	}
	function mousemove(e){
		elm.onmouseup = mouseup
		document.onmouseup = mouseup
		if(process){
			elm.style.left = cursorPosition(e).x - old_csr_x +"px"
			elm.style.top  = cursorPosition(e).y - old_csr_y +"px"
			document.onmouseup = this.mouseup
		}
	}	
}


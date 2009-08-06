function c(){console.log(c.arguments)}
function $(id){return document.getElementById(id)}
function cursorPosition(ev){ev = ev || window.event;	
	if(ev.pageX || ev.pageY){return {x:ev.pageX, y:ev.pageY};}
	return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop};
}
function getDo(){
	o = new Array()
	for (var i=0;i<12;i++){
		
		
		GD = new GDate(1,i+1,(new Date()).getFullYear())
		HD = new HDate(GD)//c(GD,HD)
		
		_gsize  = GD.getMonthLength()
		_dow = GD.getDayOfWeek() +1
		_gm = GD.getMonthName()
		_hy = HD.getYear()
		_hm = HD.getMonth()
		_hd = HD.getDay()
		_nm = HD.nbMonths()
	
		_mm = HD.getMonthName()
		
		
		
		_hsize  = HD.getMonthLength()
		o[i] =  new Array()
			
		for (var j=0;j<_gsize ;j++){
			if (_hd > _hsize){	
				_hd = 1
				_hm++
				if (_hm == 7){ /*tishrqi*/	_hy++ ; 	}
				if (_hm > _nm){ /* hm */	_hm=1 ; }
				HD.setDate(1,_hm,_hy)
				_hm 	= HD.getMonth()
				_hsize 	= HD.getMonthLength()
				_mm 	= HD.getMonthName()
				_hy		= HD.getYear() 
			}
			if (_dow > 7){_dow = 1}
			o[i][j] = {d:_hd,m:_hm,y:_hy,hm:_mm,gm:_gm,dow:_dow} //c({d:hd,mi:hm,m:mm,y:hy})
			_hd++
			_dow++
		}
	}
	
	return o
}
window.onload = function(){
	$("q").href = "?rnd="+Math.random()
	show()
}
function show(){

	_d = getDo()
	td = new Date()
	tdy = td.getFullYear()
	tdd = td.getDate()
	tdm = td.getMonth() +1	

	for (var i=0;i<_d.length;i++){
		x = '<li><table>'		
		x += "<tr class='m'><th colspan='7'>"+_d[i][0].gm+"</th></tr>"		
		x += '<tr class="j"><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>'		
		x += '<tr>'
		
		for (var of = 1;of < _d[i][0].dow;of++){	x += "<th>-</th>"}		
		for (var j=0;j<_d[i].length;j++){
			dd = _d[i][j]			//if ((i+1)==tdm&&(j+1)==tdd) { xpos = pos -15 ; 	istd = 'tod'	}  ; pos ++ ; 	
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
	
	GD  = new GDate(cj,cm,cy)
	HD  = new HDate(GD)	
	
	six = $("city").selectedIndex
	_city = $("city").options[six].value
	country = $("city").options[six].parentNode.label.toLowerCase()
	
	
	if (country == "israel"){is_israel = true }
	
	
	
	
	jEvent = new JEvent(HOLIDAYS.currentHoliday(HD))
	
	zmanim = HD.getZmanim(_city)	
	parasha = HD.getParashaName(is_israel,is_israel)
		 
	
	$("j").style.display 	= "block"
	$("j").style.top 		= pos.y+"px"
	$("j").style.left 		= pos.x+"px"
	
	
	$("gd").innerHTML = cj +"."+ cm+"."+cy
	$("cd").innerHTML = cj +" "+  GD.getMonthName() +" "+cy
	$("hd").innerHTML = HD.getDay() +" "+  HD.getMonthName() +" "+ HD.getYear()
	
	if (jEvent.name){
		$("holiday").style.display 	= "block"	
		$("hdd").innerHTML = jEvent.name
	}else{
		$("holiday").style.display 	= "none"		
		$("hdd").innerHTML = ""
	}
	if (GD.getDayOfWeek()==6){
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

function Move(e,elm){//Move by tlissak v 0.7 
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
		if (obj){var curleft = 0 ;var curtop = 0;
			if (obj.offsetParent) {
				curleft = obj.offsetLeft ; curtop = obj.offsetTop
				while (obj = obj.offsetParent) {curleft += obj.offsetLeft ; curtop += obj.offsetTop	}}
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

function create_ev(){
	$("j").style.display = "none"
	$("se").style.display = "block"
}
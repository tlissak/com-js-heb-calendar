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

function show(){

	_d = getDo()
	td = new Date()
	tdy = td.getFullYear()
	tdd = td.getDate()
	tdm = td.getMonth() +1	

	for (var i=0;i<_d.length;i++){
		tmcs = (tdm == i+1) ? "class='curr_month'" : ""
		x = '<li '+tmcs+' ><table>'		
		x += "<tr class='m'><th colspan='7'>"+_d[i][0].gm+"</th></tr>"		
		x += '<tr class="j"><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>'		
		x += '<tr>'
		
		for (var of = 1;of < _d[i][0].dow;of++){	x += "<th>-</th>"}		
		for (var j=0;j<_d[i].length;j++){
			dd = _d[i][j]			
			tcs = ((i+1)==tdm&&(j+1)==tdd)  ? " class='today'" : "" 	
			x += '<td id="j_'+i+'_'+j+'" '+tcs+'  onclick="_j(event,'+i+','+j+')">'+(j+1)+'</td>'
			if (dd.dow==7){	x += '</tr><tr>'} /*Sha.bat*/
		}	
		if (dd.dow < 7){for (var of =dd.dow;of < 7 ; of++){	x += "<th>-</th>"	}}
		x += '</tr></table></li>'
		$("d").innerHTML += x 
	}
}


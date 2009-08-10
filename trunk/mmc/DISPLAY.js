function getGCalObj(){
	oPref = Pref()
	oy = new Array()	
	for (var yy = 0;yy <= oPref.years;yy++){
		oy[yy] = new Array()
		for (var mm=0;mm<12;mm++){
			GD = new GDate(1,mm+1,oPref.cal_start+yy)
			_gsize  = GD.getMonthLength()
			_dow 	= GD.getDayOfWeek() +1
			_gm 	= GD.getMonthName()
			_m_hdn	= GD.m_hdn
			oy[yy][mm] =  new Array()			
			for (var j=0;j<_gsize ;j++){
				if (_dow > 7){_dow = 1}
				oy[yy][mm][j] = {m_hdn:_m_hdn,gm:_gm,dow:_dow}
				_dow++
				_m_hdn++
			}
		}
	}
	return oy
}
function getHCalObj(){
	oPref = Pref()
	oy = new Array()	
	for (var yy = 0;yy <= oPref.years;yy++){
		oy[yy] = new Array()
		for (var mm=0;mm<12;mm++){
			GD = new GDate(1,mm+1,oPref.cal_start+yy)
			HD = new HDate(GD)//c(GD,HD)		
			
			_gsize  = GD.getMonthLength()
			_dow 	= GD.getDayOfWeek() +1
			_gm 	= GD.getMonthName()
			_m_hdn	= GD.m_hdn
			
			_hy = HD.getYear()
			_hm = HD.getMonth()
			_hd = HD.getDay()
			_nm = HD.nbMonths()	
			_mm = HD.getMonthName()		
			_hsize  = HD.getMonthLength()
			oy[yy][mm] =  new Array()			
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
				oy[yy][mm][j] = {m_hdn:_m_hdn,d:_hd,m:_hm,y:_hy,hm:_mm,gm:_gm,dow:_dow}
				_hd++
				_dow++
				_m_hdn++
			}
		}
	}
	return oy
}

function show(){
	$("d").innerHTML = ""
	_d = getGCalObj() // getHCalObj
	oPref = Pref()
	td = new Date()
	tdy = td.getFullYear()
	tdd = td.getDate()
	tdm = td.getMonth() +1	
	
	for (var yy = 0 ; yy < _d.length;yy++){
		yyyy = (oPref.cal_start + yy)
		x = '<div>'+yyyy+'</div>'
		for (var mm=0;mm<_d[yy].length;mm++){
			tmcs = (tdm == mm+1 && tdy == (oPref.cal_start + yy)) ? "class='curr_month'" : ""
			x += '<li '+tmcs+' ><table>'		
			x += "<tr class='m'><th colspan='7'>"+_d[yy][mm][0].gm+"</th></tr>"		
			x += '<tr class="j"><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>'		
			x += '<tr>'
			
			for (var of = 1;of < _d[yy][mm][0].dow;of++){	x += "<th>-</th>"}		
			for (var j=0;j<_d[yy][mm].length;j++){
				dd = _d[yy][mm][j]			
				tcs = ((mm+1)==tdm&&(j+1)==tdd&&tdy==(oPref.cal_start + yy))  ? " class='today'" : "" 	
				x += '<td id="j_'+dd.m_hdn+'" '+tcs+'  onclick="_j(event,this)">'+(j+1)+'</td>'
				if (dd.dow==7){	x += '</tr><tr>'} /*Sha.bat*/ //(j+1)+'_'+(mm+1)+'_'+yyyy
			}	
			if (dd.dow < 7){for (var of =dd.dow;of < 7 ; of++){	x += "<th>-</th>"	}}
			x += '</tr></table></li>'
			
		}
		$("d").innerHTML += x 
	}
	calc_event()
}


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
	pos = 0
	calendar_position = 0
	curr_month = {y:oPref.cal_start,m:1}
	for (var yy = 0 ; yy < _d.length;yy++){
		yyyy = (oPref.cal_start + yy)
		
		for (var mm=0;mm<_d[yy].length;mm++){
			x = ''
			_month_name = _d[yy][mm][0].gm
			if (tdm == mm+1 && tdy == yyyy) {
				tmcs = "class='curr_month'" 
				curr_month = {m:mm+1,y:yyyy}
				calendar_position = pos
			}else{
				tmcs = ""
			}
			x += '<li '+tmcs+' ><table align="center">'		
			x += "<tr class='month'><th colspan='7' class='pointer' onclick=\"show_calendar({m:"+(mm+1)+",y:"+yyyy+"})\">"
			x += _month_name + " "+ yyyy +"</th></tr>"
			x += '<tr>'			
			for (var of = 1;of < _d[yy][mm][0].dow;of++){	x += "<th>&nbsp;</th>"}		
			for (var j=0;j<_d[yy][mm].length;j++){
				dd = _d[yy][mm][j]			
				tcs = ((mm+1)==tdm&&(j+1)==tdd&&tdy==yyyy)  ? " class='today'" : "" 	
				x += '<td id="j_'+dd.m_hdn+'" '+tcs+'  onclick="_j(event,this)">'
				x += '<div id="j_'+dd.m_hdn+'_0" class="ona-0" ></div>'
				x += (j+1)
				x += '<div id="j_'+dd.m_hdn+'_1" class="ona-1" ></div>'
				x += '</td>'
				if (dd.dow==7){	x += '</tr><tr>'} /*Sha.bat*/ //(j+1)+'_'+(mm+1)+'_'+yyyy
			}	
			if (dd.dow < 7){for (var of =dd.dow;of < 7 ; of++){	x += "<th>&nbsp;</th>"	}}
			x += '</tr></table></li>'
			$("d").innerHTML += x 
			pos ++
		}		
	}
	$("month-container").scrollTop = (calendar_position * 120)
	show_calendar(curr_month)	
}
function show_calendar(oMonth){
	oM = getHMonthObj(oMonth.m,oMonth.y)	
	_month_name = oM[0].gm	
	td = new Date()
	tdy = td.getFullYear()
	tdd = td.getDate()
	tdm = td.getMonth() +1	
	x = "<tr>"
	for (var of = 1;of < oM[0].dow;of++){	x += "<th>&nbsp;</th>"}	
	for (var j=0;j<oM.length;j++){
		dd = oM[j]			
		tcs = ((oMonth.m)==tdm&&(j+1)==tdd&&tdy==oMonth.y)  ? " class='today'" : "" 	
		x += '<td id="jm_'+dd.m_hdn+'" '+tcs+'  onclick="_j(event,this)">'
		x += '<div class="cal-dt"><span class="cal-dt-hebrew">'
		x += dd.d +' '+dd.hm 
		x += '</span><span class="cal-dt-civil">'
		x += (j+1)
		x += '</span></div>'
  		x += '<div class="cal-ona-0" id="jm_'+dd.m_hdn+'_0"></div>' 
		x += '<div class="cal-ona-1" id="jm_'+dd.m_hdn+'_1"></div>'	
		x += '<div class="times" >'+ dd.zmanim.hanetz+" - "+dd.zmanim.shkia+'</div>'
		if (dd.dow==6){
		x += "<div class='shabat-s'>"+dd.zmanim.knissatShabbat+"</div>"
		}
		if (dd.dow==7){
		x += "<div class='shabat-e'>"+dd.zmanim.motzeiShabbat+"</div>"
		}
		if (dd.holiday){
		x += "<div>" +dd.holiday +"</div>"
		}
		//x += "<div>"+dd.m_hdn+"</div>"
		if (dd.parasha){
		x += "PARASHA :"+ dd.parasha	
		}
		x += '</td>'
		
		if (dd.dow==7){	x += '</tr><tr>'} 
	}	
	
	if (dd.dow < 7){for (var of =dd.dow;of < 7 ; of++){	x += "<th>&nbsp;</th>"	}}
	
	x += "</tr>"
  
  $("cal").innerHTML = x
  $("cal-date").innerHTML = _month_name + " " + oMonth.y
  
  curr_m = oMonth.m
  curr_y = oMonth.y
  next_m = curr_m + 1
  next_y = curr_y
  previews_m = curr_m - 1
  previews_y = curr_y 
  if (next_m == 13){  next_m = 1 ; 	  next_y ++ ; }
  if (previews_m == 0){  previews_m = 12 ; 	  previews_y -- ; }
  
  
  
  $("cal-next").onclick = function(){
		show_calendar({m:next_m,y:next_y})	
	}
	$("cal-previews").onclick = function(){
		show_calendar({m:previews_m,y:previews_y})	
	}
	//////////////////////////////////////
	//
	// 
	calc_event()
	//
	///////////////////////
}
function getHMonthObj(m,y){
	oPref = Pref()	//c("getHMonthObj",oPref)
	GD = new GDate(1,m,y)
	HD = new HDate(GD.m_hdn-1)		
	_gsize  = GD.getMonthLength()
	_gm 	= GD.getMonthName()
	od =  new Array()			
	for (var j=0;j<_gsize ;j++){
		HD.add(1)
		_hy 	= HD.getYear()
		_hm 	= HD.getMonth()
		_hd 	= HD.getDay()
		_m_hdn 	= HD.m_hdn
		_mm 	= HD.getMonthName()	
		_dow	= HD.getDayOfWeek() +1
		_zmanim = HD.getZmanim(oPref.city,oPref.time_adj)
		_parasha = _dow == 7 ? HD.getParashaName(oPref.city.bIsrael,oPref.language == "he") : ""
		_holiday = HD.getMoadim()
		od[j] = {m_hdn:_m_hdn,d:_hd,m:_hm,y:_hy,hm:_mm,gm:_gm,dow:_dow,zmanim:_zmanim,parasha:_parasha,holiday:_holiday}
	}
	return od
}
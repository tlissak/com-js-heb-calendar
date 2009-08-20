function getGCalObj(){
	oPref = Pref()
	oy = new Array()	
	for (var yy = 0;yy <= oPref.years;yy++){
		oy[yy] = new Array()
		for (var mm=0;mm<12;mm++){
			GD = new GDate(1,mm+1,oPref.cal_start+yy)
			_gsize  = GD.getMonthLength()
			_dow 	= GD.getDayOfWeek() +1
			_gm 	= GD.getMonthName(oPref.language)
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
	c(oPref.language)
	oy = new Array()	
	for (var yy = 0;yy <= oPref.years;yy++){
		oy[yy] = new Array()
		for (var mm=0;mm<12;mm++){
			GD = new GDate(1,mm+1,oPref.cal_start+yy)
			HD = new HDate(GD)//c(GD,HD)		
			
			_gsize  = GD.getMonthLength()
			_dow 	= GD.getDayOfWeek() +1
			_gm 	= GD.getMonthName(oPref.language)
			_m_hdn	= GD.m_hdn
			
			_hy = HD.getYear()
			_hm = HD.getMonth()
			_hd = HD.getDay()
			_nm = HD.nbMonths()	
			_mm = HD.getMonthName(oPref.language)		
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
					_mm 	= HD.getMonthName(oPref.language)
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
				if (dd.dow==7){	x += '</tr><tr>'}
			}	
			if (dd.dow < 7){for (var of =dd.dow;of < 7 ; of++){	x += "<th>&nbsp;</th>"	}}
			x += '</tr></table></li>'
			$("d").innerHTML += x 
			pos ++
		}		
	}
	$("month-container").scrollTop = (calendar_position * 120)
	show_calendar(curr_month)	
	show_event_index()
}
function show_event_index(){
	oPref = Pref()
	var arr = ["flow_s","flow_in","hefsek","seven_nekiaim","mikve","veset_hodesh","veset_haflaga","ona_benonit"]	
	for (var i=0,out = '';i<arr.length;i++){
		arr_ev = LNG[oPref.language][arr[i]]
		out += "<li class='"+arr[i]+"' >"
		out += "<a title=\""+arr_ev[1]+"\" href='"+arr_ev[2]+"' >"
		out += arr_ev[0]
		out += "</a></li>"
	}
	$("event-index").innerHTML = out
}
function show_calendar(oMonth){
	h_x = '<table width="100%" border="0" cellspacing="0" cellpadding="0" ><tr>'
	for (var i=0;i<7;i++){
		 h_x += '<td>'+ LNG[oPref.language].dow[i] +'</td>'
	}
	h_x += '</tr></table>'
	$("cal-header").innerHTML = h_x
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
		x += '<td id="jm_'+dd.m_hdn+'" '+tcs+'  ondblclick="_j(event,this)">'
		x += '<div class="cal-dt"><span class="cal-dt-hebrew">'
		x += dd.d +' '+dd.hm 
		x += '</span><span class="cal-dt-civil">'
		x += (j+1)
		x += '</span></div>'
  		x += '<div class="cal-ona-0" id="jm_'+dd.m_hdn+'_0"></div>' 
		x += '<div class="cal-ona-1" id="jm_'+dd.m_hdn+'_1"></div>'	
		x += '<div class="times" > '+LNG[oPref.language].netz +' : '+ dd.zmanim.hanetz+" <br /> "
		x += LNG[oPref.language].shkia + ' : '+dd.zmanim.shkia+' <br />'
		x += LNG[oPref.language].alot +' : '+dd.zmanim.alot+' <br />'
		x += LNG[oPref.language].shaa_zmanit +' : '+dd.zmanim.shaa_zmanit+' <br />'
		x += LNG[oPref.language].misheyakir + ' : '+dd.zmanim.misheyakir+' <br />' // mishayakir ben tchelet le karti
		x += LNG[oPref.language].tzeit + ' : '+dd.zmanim.tzeit+' <br />'
		x += LNG[oPref.language].shema + ' : '+dd.zmanim.shema+' <br />'
		x += LNG[oPref.language].tefillah + ' : '+dd.zmanim.tefillah+' <br />'
		x += LNG[oPref.language].chatzot + ' : '+dd.zmanim.chatzot+' <br />'
		x += LNG[oPref.language].mincha_g + ' : '+dd.zmanim.minchag+' <br />'
		x += LNG[oPref.language].mincha_k + ' : '+dd.zmanim.minchak+' <br />'
		x += LNG[oPref.language].plag + ' : '+dd.zmanim.plag+' <br />'
		x += LNG[oPref.language].three_stars + ' : '+dd.zmanim.motzeiShabbat+' <br />'
		x += '</div>'
		if (dd.dow==6){
		x += "<div class='shabat-s'>"+dd.zmanim.knissatShabbat+"</div>"
		}
		if (dd.dow==7){
		x += "<div class='shabat-e'>"+dd.zmanim.motzeiShabbat+"</div>"
		}
		if (dd.holiday){
		x += "<div class='j-holiday'>" +LNG[oPref.language].moadim[dd.holiday] +"</div>"
		}
		if (dd.rosh_hodesh){
		x += "<div class='rosh-hodesh'>"+LNG[oPref.language].rosh_hodesh+"</div>"
		}
		//x += "<div>"+dd.m_hdn+"</div>"
		if (dd.parasha){
		x += "<div class='parasha'>"+ dd.parasha+"</div>"
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
	
	calc_event()
}
function getHMonthObj(m,y){
	oPref = Pref()	//c("getHMonthObj",oPref)
	GD = new GDate(1,m,y)
	HD = new HDate(GD.m_hdn-1)		
	_gsize  = GD.getMonthLength()
	_gm 	= GD.getMonthName(oPref.language)
	od =  new Array()	
	var _holiday =  null;
	var oLastHoliday = 1;
	var nLastEventType = 0;		
	
	for (var j=0;j<_gsize ;j++){
		HD.add(1)
		_hy 	= HD.getYear()
		_hm 	= HD.getMonth()
		_hd 	= HD.getDay()
		_m_hdn 	= HD.m_hdn
		_mm 	= HD.getMonthName(oPref.language)	
		_dow	= HD.getDayOfWeek() +1
		_zmanim = HD.getZmanim(oPref.city,oPref.time_adj)
		_parasha = _dow == 7 ? HD.getParashaName(oPref.city.bIsrael,oPref.language == "he") : ""
		_rosh_hodesh = (_hd == 30 || _hd == 1) ? true : false
		/*
		bYomTov = false;
		_holiday = "";

		holiday = HOLIDAYS.currentHoliday(HD, nLastEventType);
		
		if(holiday){
			_holiday = new JEvent(holiday.type).name;
			oLastHoliday = holiday;
			nLastEventType = holiday.type;			
			if(holiday.arrYomTov.length > 0)
				bYomTov = holiday.arrYomTov[HD.minus(holiday.hStartDate)];
			else
				bYomTov = false;
		}else if(oLastHoliday){
			++nLastEventType;
			oLastHoliday = null;
		}
		*/
		_holiday = HD.getMoadim()
		od[j] = {m_hdn:_m_hdn,d:_hd,m:_hm,y:_hy,hm:_mm,gm:_gm,dow:_dow,zmanim:_zmanim,parasha:_parasha,holiday:_holiday,rosh_hodesh:_rosh_hodesh}
	}
	return od
}

		
		
		

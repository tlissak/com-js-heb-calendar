function render_load(load_type,_oMonth){
	if(load_type == "minhag"){
		calc_event()	;return
	}else if(load_type == "start_end"){
		render_left_cal() ;	calc_event()	;return
	}else if(load_type == "localisation" ||load_type == "dst"  ){
		render_times();return
	}else if(load_type == "render_big"){ // lng change
		render_main_cal(_oMonth) ;render_times(_oMonth) ;calc_event() ; return
	}else if(load_type == "load"){
	render_main_cal(_oMonth)
	render_left_cal()
	calc_event()
	show_event_index()	
	render_times(_oMonth)
	}else{
	c("unknown type on render load ."+load_type)	
	}
}

function getGCalObj(){
	oPref = Pref() ; oy = new Array()	
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
				_dow++;	_m_hdn++
			}
		}
	}return oy
}
function getHCalObj(){
	oPref = Pref() ;oy = new Array()	
	for (var yy = 0;yy <= oPref.years;yy++){
		oy[yy] = new Array()
		for (var mm=0;mm<12;mm++){
			
			GD = new GDate(1,mm+1,oPref.cal_start+yy);			HD = new HDate(GD) ;
			_gsize  = GD.getMonthLength();						_dow 	= GD.getDayOfWeek() +1 ;
			_gm 	= GD.getMonthName(oPref.language) ;			_m_hdn	= GD.m_hdn	;
			_hy = HD.getYear() ;								_hm = HD.getMonth() ;
			_hd = HD.getDay() ;									_nm = HD.nbMonths()	;		
			_mm = HD.getMonthName(oPref.language);				_hsize  = HD.getMonthLength() ;
			
			oy[yy][mm] =  new Array()			
			for (var j=0;j<_gsize ;j++){
				if (_hd > _hsize){	
					_hd = 1; _hm++
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
				_hd++ ;	_dow++;	_m_hdn++
			}
		}
	}return oy
}
function render_left_cal(){
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
				calendar_position = pos
			}else{
				tmcs = ""
			}
			x += '<li '+tmcs+' ><table align="center">'		
			x += "<tr class='month'><th colspan='7' class='pointer' onclick=\"render_load('render_big',{m:"+(mm+1)+",y:"+yyyy+"})\">"
			x += _month_name + " "+ yyyy +"</th></tr><tr>"
			for (var i_d=0;i_d<7;i_d++){
			x += "<th>"+ LNG[oPref.language].dow_short[i_d] + "</th>"
			}
			x += '</tr><tr>'			
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
}
function render_times(oMonth){
  oM = getHMonthObj(oMonth.m,oMonth.y)	
  x = "" ; z_times = ""
  for (var j=0;j<oM.length;j++){
	dd = oM[j]	
	$("je_"+dd.m_hdn).innerHTML = ""
	if (dd.dow==6){ $("je_"+dd.m_hdn).innerHTML += "<div class='shabat-s'>"+dd.zmanim.knissatShabbat+"</div>"	}
	if (dd.dow==7){	$("je_"+dd.m_hdn).innerHTML += "<div class='parasha'>"+ dd.parasha+"</div>"	+ "<div class='shabat-e'>"+dd.zmanim.motzeiShabbat+"</div>"	}
	if (dd.holiday){$("je_"+dd.m_hdn).innerHTML += "<div class='j-holiday'>" +LNG[oPref.language].moadim[dd.holiday] +"</div>"	}
	if (dd.rosh_hodesh){	$("je_"+dd.m_hdn).innerHTML += "<div class='rosh-hodesh'>"+LNG[oPref.language].rosh_hodesh+"</div>"	}
	
	z_times = '<img src="images/spacer.gif" class="sunrise" />'+ dd.zmanim.hanetz
	z_times += '<img src="images/spacer.gif" class="sunset" />'+dd.zmanim.shkia
	z_times += '<img src="images/spacer.gif" class="threestars" />'+dd.zmanim.motzeiShabbat
	
	$("jt_"+dd.m_hdn).innerHTML = z_times
  } 
	//x += LNG[oPref.language].alot +' : '+dd.zmanim.alot+' <br />'
	//x += LNG[oPref.language].shaa_zmanit +' : '+dd.zmanim.shaa_zmanit+' <br />'
	//x += LNG[oPref.language].misheyakir + ' : '+dd.zmanim.misheyakir+' <br />' // mishayakir ben tchelet le karti
	//x += '<img src="images/spacer.gif" class="stars" />'+dd.zmanim.tzeit
	//x += LNG[oPref.language].shema + ' : '+dd.zmanim.shema+' <br />'
	//x += LNG[oPref.language].tefillah + ' : '+dd.zmanim.tefillah+' <br />'
	//x += LNG[oPref.language].chatzot + ' : '+dd.zmanim.chatzot+' <br />'
	//x += LNG[oPref.language].mincha_g + ' : '+dd.zmanim.minchag+' <br />'
	//x += LNG[oPref.language].mincha_k + ' : '+dd.zmanim.minchak+' <br />'
	//x += LNG[oPref.language].plag + ' : '+dd.zmanim.plag+' <br />'
}
function render_main_cal(oMonth){
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
	x = '<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" class="cal" style="z-index:1; background:#FFF" ><tbody>'
	x += "<tr>"
	for (var of = 1;of < oM[0].dow;of++){	x += "<th>&nbsp;</th>"}	
	for (var j=0;j<oM.length;j++){
		dd = oM[j]			
		tcs = ((oMonth.m)==tdm&&(j+1)==tdd&&tdy==oMonth.y)  ? " class='today'" : "" 	
		x += '<td id="jm_'+dd.m_hdn+'" '+tcs+'  onclick="_j(event,this)">' // ondblclick="_j(event,this)"
		x += '<div class="cal-dt"><span class="cal-dt-hebrew">'
		x += dd.d +' '+dd.hm 
		x += '</span><span class="cal-dt-civil">'
		x += (j+1)
		x += '</span></div>'
  		x += '<div class="cal-ona-0" id="jm_'+dd.m_hdn+'_0"></div>' 
		x += '<div class="cal-ona-1" id="jm_'+dd.m_hdn+'_1"></div>'	
		x += '<div id="je_'+dd.m_hdn+'" ></div>'
		x += '<div class="times" id="jt_'+dd.m_hdn+'" ></div>'
		x += '</td>'		
		if (dd.dow==7){	x += '</tr><tr>'} 
	}	
	
	if (dd.dow < 7){for (var of =dd.dow;of < 7 ; of++){	x += "<th>&nbsp;</th>"	}}
	
	x += "</tr></tbody></table>"
	
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
  oMonthNext = {m:next_m,y:next_y}
  oMonthPreviews = {m:previews_m,y:previews_y}
	$("cal-next").onclick = function(){
		render_load("render_big",oMonthNext)
	}
	$("cal-previews").onclick = function(){
		render_load("render_big",oMonthPreviews)	
	}
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
		/*bYomTov = false;_holiday = "";holiday = HOLIDAYS.currentHoliday(HD, nLastEventType);		
		if(holiday){_holiday = new JEvent(holiday.type).name;oLastHoliday = holiday;	nLastEventType = holiday.type;			
			bYomTov = (holiday.arrYomTov.length > 0)? holiday.arrYomTov[HD.minus(holiday.hStartDate)] : false;
		}else if(oLastHoliday){	++nLastEventType;	oLastHoliday = null;}	*/
		_holiday = HD.getMoadim()
		od[j] = {m_hdn:_m_hdn,d:_hd,m:_hm,y:_hy,hm:_mm,gm:_gm,dow:_dow,zmanim:_zmanim,parasha:_parasha,holiday:_holiday,rosh_hodesh:_rosh_hodesh}
	}
	return od
}

		
		
		

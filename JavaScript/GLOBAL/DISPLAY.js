
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
			x += "<tr class='month'><th colspan='7' class='pointer' onclick=\"Render('big',{m:"+(mm+1)+",y:"+yyyy+"})\">"
			x += _month_name + " "+ yyyy +"</th></tr><tr>"
			for (var i_d=0;i_d<7;i_d++){
			x += "<th>"+ _("dow_s")[i_d] + "</th>"
			}
			x += '</tr><tr>'			
			for (var of = 1;of < _d[yy][mm][0].dow;of++){	x += "<th>&nbsp;</th>"}		
			for (var j=0;j<_d[yy][mm].length;j++){
				dd = _d[yy][mm][j]			
				tcs = ((mm+1)==tdm&&(j+1)==tdd&&tdy==yyyy)  ? " class='today'" : "" 	
				x += '<td id="j_'+dd.m_hdn+'" '+tcs+'  onclick="_j(event,this.id)">'
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
  
  oPref = Pref()
  oCity = CITY[oPref.city]
  bIsrael = oCity.bIsrael
  bDispora = (!(bIsrael))
  
  for (var j=0;j<oM.length;j++){
	dd = oM[j]	
	ZM	= (new GDate(dd.m_hdn)).getZmanim(oCity)
	
	
	$("je_"+dd.m_hdn).innerHTML = ""
	if (dd.dow==6){ $("je_"+dd.m_hdn).innerHTML += "<div class='shabat-s'>"+timeadj1(ZM.candlelight)+"</div>"	}
	if (dd.dow==7){	$("je_"+dd.m_hdn).innerHTML += "<div class='parasha'>"+ dd.parasha+"</div>"	+ "<div class='shabat-e'>"+timeadj1(ZM.shabbat_end)+"</div>"	}
	if (dd.holiday){
		if ((oM[j].m == 7 && oM[j].d ==10)/*kippour*/ 
			|| (oM[j].m == 5 && oM[j].d ==9)/*9av*/){
			
			$("je_"+dd.m_hdn).innerHTML += "<div class='j-holiday j-inter'>" +	_("moadim")[dd.holiday] +"</div>"	
		}else if((oM[j].m == 7 && (oM[j].d ==1 || oM[j].d ==2))/*R"H*/ 
				|| (oM[j].m == 7 && (oM[j].d ==22 || (oM[j].d ==23 && bDispora))) /*shmini atseret simchat tora*/
				|| (oM[j].m == 1 && (oM[j].d ==15 || (oM[j].d ==16 && bDispora))) /* pessah */
				|| (oM[j].m == 3 && (oM[j].d ==6 || (oM[j].d ==7 && bDispora))) /* shavout */
				){
			$("je_"+dd.m_hdn).innerHTML += "<div class='j-holiday j-cons'>" +	_("moadim")[dd.holiday] +"</div>"
		}else{
			$("je_"+dd.m_hdn).innerHTML += "<div class='j-holiday'>" +	_("moadim")[dd.holiday] +"</div>"	
		}
	}
	if (dd.rosh_hodesh){	$("je_"+dd.m_hdn).innerHTML += "<div class='rosh-hodesh'>"+_("rosh_hodesh")+"</div>"	}
	
	$("jt_"+dd.m_hdn+"_0").innerHTML = '<img src="images/spacer.gif" class="sunrise" />'+ timeadj1(ZM.sunrise)
	$("jt_"+dd.m_hdn+"_1").innerHTML = '<img src="images/spacer.gif" class="sunset" />'+timeadj1(ZM.sunset)

  } 
 // alert("render times done")
}
function render_main_cal(oMonth){
	RENDER_MONTH = oMonth
	oPref = Pref()
	h_x = '<table width="100%" border="0" cellspacing="0" cellpadding="0" ><tr>'
	for (var i=0;i<7;i++){
		before = (i==0) ? 6 : i-1
		 h_x += '<td >'+ _("night") +' '+ _("dow_short")[i] +'</td>'
		 h_x += '<td >'+ _("dow_short")[i] +'</td>'
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
		x += '<td '+tcs+'>' // ondblclick="_j(event,this)"
		x += '<table  width="100%" height="100%" border="0" cellspacing="0" cellpadding="0"  >'
		x += '<tr class="cal-dt pointer"  id="jm_'+dd.m_hdn+'"   onclick="_j(event,this.id)" >'
		x += '<th><span class="cal-dt-hebrew">' + dd.d +' '+dd.hm + '</span></th><th><span class="cal-dt-civil">' + (j+1) + '</span></th></tr>'
		
		x += '<tr><th colspan="2"><div class="cal-dt-box" id="je_'+dd.m_hdn+'" ></div></th></tr>'
		
		x += '<tr><th  class="cal-ona-0" valign="bottom"  ><div id="jm_'+dd.m_hdn+'_0"></div><div class="times times-0" id="jt_'+dd.m_hdn+'_0" ></div></th>'
		x += '<th  class="cal-ona-1" valign="bottom"    ><div id="jm_'+dd.m_hdn+'_1" ></div><div class="times" id="jt_'+dd.m_hdn+'_1" ></div></th></tr>'
		x += '</table>'
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
		Render("big",oMonthNext)
	}
	$("cal-previews").onclick = function(){
		Render("big",oMonthPreviews)	
	}
}
function getHMonthObj(m,y){
	oPref = Pref()
	GD = new GDate(1,m,y)
	HD = new HDate(GD.m_hdn-1)		
	_gsize  = GD.getMonthLength()
	_gm 	= GD.getMonthName(oPref.language)
	od =  new Array()	
	var _holiday =  null;
	var oLastHoliday = 1;
	var nLastEventType = 0;		
	oCity = CITY[oPref.city]
	for (var j=0;j<_gsize ;j++){
		HD.add(1)
		_hy 	= HD.getYear()
		_hm 	= HD.getMonth()
		_hd 	= HD.getDay()
		_m_hdn 	= HD.m_hdn
		_mm 	= HD.getMonthName(oPref.language)	
		_dow	= HD.getDayOfWeek() +1
		//_zmanim = HD.getZmanim(oCity,oPref.DST)
		_parasha = _dow == 7 ? HD.getParashaName(oPref.language == "he",oPref.language == "he") : ""
		_rosh_hodesh = (_hd == 30 || _hd == 1) ? true : false
		_holiday = HD.getMoadim()
		od[j] = {m_hdn:_m_hdn,d:_hd,m:_hm,y:_hy,hm:_mm,gm:_gm,dow:_dow,parasha:_parasha,holiday:_holiday,rosh_hodesh:_rosh_hodesh}
	}
	return od
}

esc = 0
outer  = 0	
var as
var mn = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
var	mm = [31,29,31,30,31,30,31,31,30,31,30,31]
var x_try
var x

function rr(s){
	as = s.split("\n")	
	out = "----------"
	OM = new Array()
	for (var i=0;i < mm.length;i++ ){
		OM[i] = new Array()			
		for (var j=0;j	< (mm[i]); j++){			
			OM[i][j] = new Array()			
			if (as[outer]){
				x = (as[outer]).split(" ")
			}else{
				x = ["UNKNOWN"]
			}
			OM[i][j][0] = get_m(4,j)
			OM[i][j][1] = get_m(8,j)			
			if (x[0] == mn[i]){				
				if (parseInt(x[1]) == j+1){
					netz = fixlen(x[4])
					shkia = fixlen(x[8])					
					OM[i][j][0] = netz 
					OM[i][j][1] = shkia
					outer ++
					x_try = 0
				}
				
			}
		}
	}
	out = ""	
	out1 = ""
	
	for (var i=0;i<OM.length;i++){
		for (var j=0;j<OM[i].length;j++){
			out1 	+= "L S:<br />"+ OM[i][j][0] +" <br /><br /> C S :<br />"+ OM[i][j][1] +"<br /><br />"
			out 	+= "<li>"+ mn[i] +" . " +(j+1) +"<br /><br /><br /><br /><br /><br /></li>"
		}
	}
	$("j1").innerHTML = out
	$("j").innerHTML = out1
}
function fixlen(itm){
	a_itm = itm.split(".")
	if ( a_itm[1].length == 1 ){
		return a_itm[0] +".0" + a_itm[1]
	}
	return itm	
}
function get_m(ID,J){
		if (as[outer -1]){
			y  = (as[outer-1]).split(" ")	
		}
		if (as[outer ]){				
			z  = (as[outer]).split(" ")			
		}else{			
			z  = (as[0]).split(" ")	
		}
		if (parseInt(x[1]) != J+1) {
			x_try++
			tryd = 5 			
			aST = y[ID].split(".")
			aED = z[ID].split(".")			
			h_aST = parseInt(aST[0]) 
			m_aST = parseInt(aST[1])					
			h_aED = parseInt(aED[0]) 
			m_aED = parseInt(aED[1])									
			ST_a = ((h_aST * 60) + m_aST) * 60
			ED_a = ((h_aED * 60) + m_aED) * 60					
			DIFF_a = ((ED_a - ST_a)/ tryd) * x_try					
			RES_a = ((ST_a + DIFF_a) / 3600)					
			return timeadj(RES_a)
		}
}
function timeadj(_time) {
	var _hour = Math.floor(_time);
	var _min  = Math.floor((_time - _hour) * 60.0 + 0.5);
	if(_min >= 60) { _hour += 1;  _min  -= 60;  }
	if(_hour < 0){	_hour += 24;}
	return _hour + ':' + ((_min < 10) ? '0' : '') + _min ;
}


Event.add(window,"load",function(){
	xmlHttp({url:"index_files/zm.txt",response:rr})							 
								 
	GD =new GDate(31,12,2008)// new GDate(31,8,2009)//
	oy = new Array()
	_DST = 0// 1
	for (var j=0;j<400 ;j++){
		GD.add(1)
		
		//http://www.developpement-durable.gouv.fr/energie/developp/econo/textes/se_heur.htm
		// 28 apre minuit
		/*if (GD.getYear() == 2009 && GD.getMonth() == 3 	&&  GD.getDay()==29 ){	_DST = 1	}
		if (GD.getYear() == 2009 && GD.getMonth() == 10 &&  GD.getDay()==25 ){	_DST = 0	}
		if (GD.getYear() == 2010 && GD.getMonth() == 3 	&&  GD.getDay()==28 ){	_DST = 1	}
		if (GD.getYear() == 2010 && GD.getMonth() == 10 &&  GD.getDay()==31 ){	_DST = 0	}
		if (GD.getYear() == 2011 && GD.getMonth() == 3 	&&  GD.getDay()==27 ){	_DST = 1	}
		if (GD.getYear() == 2011 && GD.getMonth() == 10 &&  GD.getDay()==30 ){	_DST = 0	}
		*/
		
		zm = GD.getZmanim({id:502,place:"Paris",latd:48,latm:50,ns:0/*N*/,lond:2,lonm:20,ew:1/*E*/,tz:1,chabat:18,bIsrael:false,group:"europe"},_DST)	
		oy[j] = {d:GD.getDay(),m:GD.getMonth(),y:GD.getYear(),zm:zm,dow:GD.getDayOfWeek()+1}
	}
	
	out = ""
	frd = ""
	out1 = ""
	crm = oy[0].m
	for (var i=0;i<oy.length;i++){
		mn = "L S:<br />"+oy[i].zm.hanetz+" <br /><br /> C S :<br />"+ oy[i].zm.shkia +"<br /><br />"
		dt = oy[i].d+ " . " +oy[i].m
		
			
		if (oy[i].dow==6){
			xdt = oy[i].d+ " . " +oy[i].m
			if (crm != oy[i].m	){
				xdt = "<br /><br />"+dt
				crm = 	oy[i].m	
			}
		
		//zmn += "shkia : " +oy[i].zm.shkia
		zmn = " -- "+ oy[i].zm.alot +"  "+oy[i].zm.misheyakir+"  "+oy[i].zm.shema+"  "+ oy[i].zm.chatzot + "  "+ oy[i].zm.plag +"  "+ oy[i].zm.tzeit
		//zmn += " alot :" +
		//zmn += " hanetz : " +oy[i].zm.hanetz
		//zmn += " tzeit :" +oy[i].zm.tzeit
		//zmn += " shema :" +oy[i].zm.shema
		//zmn += " tefillah :" +oy[i].zm.tefillah
		//zmn += " chatzot :" +oy[i].zm.chatzot
		//zmn += " minchag :" +oy[i].zm.minchag
		//zmn += " minchak :" +oy[i].zm.minchak
		//zmn += " plag :" +oy[i].zm.plag
		//zmn += " knissatShabbat :" +oy[i].zm.knissatShabbat
		//zmn += " motzeiShabbat :" +oy[i].zm.motzeiShabbat
		
		frd += "<li>"+ xdt + zmn +"</li>"
		}
		out1 += "<li>"+dt+"<br /><br /><br /><br /><br /><br /></li>"
		
		
		out += "<li>"+ mn +"</li>"
		
	}
	$("j1").innerHTML = out1
	$("j").innerHTML = out
	$("f").innerHTML = frd
})


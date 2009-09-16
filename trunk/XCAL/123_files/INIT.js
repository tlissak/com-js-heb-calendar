Event.add(window,"load",function(){
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


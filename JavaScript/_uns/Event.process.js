function hdn2gd(_hdn){
	_GD = new GDate(_hdn)
	return _GD.getDay() + "/"+ _GD.getMonth() // +"/"+ _GD.getYear()
}
function dEvent(){	
	oPref = Pref()
	this.arr		= new Array()	
	this.events		= events
	this.calculate 	= calculate
	this.add 		= add	
	this.calc_chabad_haflaga 	= calc_chabad_haflaga
	this.calc_haflaga 			= calc_haflaga
	this.length 	= -1
	this.haflaga_length = -1 
	this.NIGHT 	= 0
	this.DAY	= 1
	this.getClass = getClass
	this.getNextRaia = getNextRaia
	this.getNextHefsek	= getNextHefsek
	/* INIT functions */
	this.calculate()
	this.arr.sort()
	if (oPref.minhag == "ch"){
		this.calc_chabad_haflaga()
	}else{
		this.calc_haflaga()
	}
	//this.arr.sort() dont sort for keep index for veset haflaga calculation
	/*calc_veset_hodesh_that_not_canceled()
	calc_veset_haflaga_that_not_canceled()*/
	//this.arr.sort() 
	
	this.arr.sort() // finely sort
	function calc_haflaga(){
		haflaga 	= new Array()
		for (var i=0,x=0;i<this.arr.length;i++){
			if (this.arr[i][1] == dEvent.FLOW_START_NIGHT || this.arr[i][1] == dEvent.FLOW_START_DAY){
				idx_next_raia 	= this.getNextRaia(i+1/* !IMORTANT Starting index +1 */)
				if (idx_next_raia > -1){
					this.haflaga_length ++
					haflaga[this.haflaga_length] = new Array()								
					haflaga[this.haflaga_length][0] = i
					haflaga[this.haflaga_length][1] = idx_next_raia
				}
			}
		}
		
		for (var i=0;i<haflaga.length;i++){
			
			_haflaga_start 	= this.arr[haflaga[i][0]]
			_haflaga_end 	= this.arr[haflaga[i][1]]
			_haflaga_distance_hdn 	= 	_haflaga_end[0] - _haflaga_start[0] // hdn	- hdn			
			TYPE	= (_haflaga_start[1] == dEvent.FLOW_START_NIGHT) ? dEvent.VESET_HAFLAGA_NIGHT : dEvent.VESET_HAFLAGA_DAY
			ONA		= (TYPE == dEvent.VESET_HAFLAGA_NIGHT) ? this.NIGHT : this.DAY
			
			this.add({hdn:_haflaga_end[0]+_haflaga_distance_hdn,type:TYPE
										   ,caller:"<br />" +" raia:"+ hdn2gd(_haflaga_start[0]) + "<br />"
										   +", Raia:"+hdn2gd(_haflaga_end[0]) + "<br />"
										   ,ona:ONA })
		}
	}	
	function getClass(event_type){
		if (event_type == dEvent.FLOW_START_NIGHT || event_type == dEvent.FLOW_START_DAY){ 	return	"flow_s" 
			}else if(event_type == dEvent.FLOW_IN){	return "flow_in"
			}else if(event_type == dEvent.HEFSEK_THARA){ return	"hefsek" ; 
			}else if(event_type == dEvent.SEVEN_NEKIIM){ return "seven_nekiaim"
			}else if(event_type == dEvent.MIKVE){ 	return "mikve" ;
			}else if(event_type == dEvent.ONA_BENONIT){return	"ona_benonit" ;
			}else if(event_type == dEvent.VESET_HODESH_NIGHT || event_type == dEvent.VESET_HODESH_DAY){ return "veset_hodesh" ;
			}else if(event_type == dEvent.VESET_HAFLAGA_NIGHT || event_type == dEvent.VESET_HAFLAGA_DAY){ return "veset_haflaga" ;
			}else{ alert("unknown-event-type-getClass("+event_type+")") ; return ""	}
	}
	function getNextRaia(r_start_index){
		for (var j=r_start_index;j<this.arr.length;j++	){
			/* if there is hafsek thara before next raia ???????????????delete current start hefsek tahara
			if (this.arr[j][1] == dEvent.HEFSEK_THARA ){	break ; }	*/
			if (this.arr[j][1] == dEvent.FLOW_START_NIGHT || this.arr[j][1] == dEvent.FLOW_START_DAY ){	return j }		
		}
		return -1
	}
	function getNextHefsek(h_start_index){
		if (h_start_index == -1){return -1}
		for (var k=h_start_index;k<this.arr.length;k++){
			if (this.arr[k][1] == dEvent.HEFSEK_THARA){	return k }
		}
		return -1
	}
	function calc_chabad_haflaga(){
		haflaga 	= new Array()
		for (var i=0,x=0;i<this.arr.length;i++){
			
			if (this.arr[i][1] == dEvent.HEFSEK_THARA){
				
				idx_next_raia 	= this.getNextRaia(i+1/* !IMORTANT Starting index i+1 */)
				idx_next_hefsek = this.getNextHefsek(idx_next_raia)
				
				if (idx_next_hefsek > -1){
					this.haflaga_length ++
					haflaga[this.haflaga_length] = new Array()								
					haflaga[this.haflaga_length][0] = i
					haflaga[this.haflaga_length][1] = idx_next_raia
					haflaga[this.haflaga_length][2] = idx_next_hefsek
				}
			}
		}
		for (var i=0;i<haflaga.length;i++){
			_haflaga_start 	= this.arr[haflaga[i][0]]
			_haflaga_end 	= this.arr[haflaga[i][1]]
			_haflaga_applied= this.arr[haflaga[i][2]]
			_haflaga_distance_hdn 	= 	_haflaga_end[0] - _haflaga_start[0] // hdn	- hdn			
			TYPE 	= dEvent.VESET_HAFLAGA_DAY // LUBA 
			this.add({hdn:_haflaga_applied[0]+_haflaga_distance_hdn,type:TYPE
										   ,caller:"<br />" +" Hefsek:"+ hdn2gd(_haflaga_start[0]) + "<br />"
										   +", Raia:"+hdn2gd(_haflaga_end[0]) + "<br />"
										   +", Hefsek:"+hdn2gd(_haflaga_applied[0] )
										   ,ona:this.DAY })
		}
	}
	function events(){
		evts 	= Cookie.get("event").split("!")
		//console.log("calculate cookie caled - \n" + Cookie.get("event"))
		var _av = new Array()
			for (var i = 0 ; i < evts.length;i++){
				if (evts[i].indexOf("-")>-1){
					_av[i] = new Array()
					_a_ev = evts[i].split("-")
					_av[i][0] = _a_ev[1] ; 	_av[i][1] = _a_ev[0]
				}
			}
		return _av.sort()
	}	
	function add(obj){ 
		// verify that length is re initialing
		this.length++
		this.arr[ this.length ] = new Array()
		this.arr[this.length][0] = obj.hdn ;	
		this.arr[this.length][1] = obj.type	;
		this.arr[this.length][2] = obj.caller ;
		this.arr[this.length][3] = obj.ona ;
	}
	function calculate(){
		
		_av = this.events()
		for (var i=0;i<_av.length;i++){
			hdn = parseInt(_av[i][0])
			ev_type = _av[i][1]
			HD = new HDate(hdn)
			HD_DAY	= HD.getDay()
			
			if (ev_type.indexOf("raia") > -1){
				TYPE = ev_type == "raia0" ? dEvent.FLOW_START_NIGHT : dEvent.FLOW_START_DAY
				ONA	 = TYPE == dEvent.FLOW_START_NIGHT ? this.NIGHT : this.DAY
				this.add({hdn:hdn,type: TYPE,caller:0,ona:ONA})
				for (var nj=1;nj<5;nj++){ // minimum nida
					this.add({hdn:(hdn +nj),type:dEvent.FLOW_IN,caller:hdn,ona:this.NIGHT})
					this.add({hdn:(hdn +nj),type:dEvent.FLOW_IN,caller:hdn,ona:this.DAY})
				}
				this.add({hdn:(hdn+29),type:dEvent.ONA_BENONIT,caller:hdn,ona:this.NIGHT})
				this.add({hdn:(hdn+29),type:dEvent.ONA_BENONIT,caller:hdn,ona:this.DAY})
				HD.nextMonth()
				
				if (HD_DAY == HD.getDay()){/*the next month day is exist VESET HACHODESH*/ 
					TYPE = ev_type == "raia0" ? dEvent.VESET_HODESH_NIGHT : dEvent.VESET_HODESH_DAY
					ONA  = TYPE ==  dEvent.VESET_HODESH_NIGHT ? this.NIGHT : this.DAY
					this.add({hdn:HD.m_hdn,type:TYPE,caller:hdn,ona:ONA})
				}				
			}else if (ev_type == ("hefsek")){
				caller = 0
				for (var k=i;k > 0 ; k--){
					if (_av[k][1] == "raia0" || _av[k][1] == "raia1" ){
						caller = parseInt(_av[k][0])	
						break ;
					}
				}
				
				this.add({hdn:hdn,type:dEvent.HEFSEK_THARA,caller:caller,ona:this.DAY})
				for (var nj=1;nj<=7;nj++){ // 7 nekiim
					this.add({hdn:(hdn +nj),type:dEvent.SEVEN_NEKIIM,caller:caller,ona:this.DAY})
					this.add({hdn:(hdn +nj),type:dEvent.SEVEN_NEKIIM,caller:caller,ona:this.NIGHT})
				}
				this.add({hdn:(hdn+7),type:dEvent.MIKVE,caller:caller,ona:this.DAY})
				
			}else{ c("UNKOWN event ("+ev_type+") != (raia|hefsek) check cookie")}			
		}
		
	}
	function between(x,y,z){ return (x >= y && x <= z)	}
	
}
dEvent.FLOW_START_NIGHT 		= 1
dEvent.FLOW_START_DAY			= 2
dEvent.FLOW_IN					= 3
dEvent.HEFSEK_THARA				= 4
dEvent.SEVEN_NEKIIM				= 5
dEvent.MIKVE					= 6
dEvent.ONA_BENONIT				= 7
dEvent.VESET_HODESH_NIGHT 		= 8
dEvent.VESET_HODESH_DAY 		= 9
dEvent.VESET_HAFLAGA_NIGHT 		= 10 // not luba
dEvent.VESET_HAFLAGA_DAY 		= 11
dEvent.VESET_HODESH_NIGHT_NOT_CANCELED 	= 12
dEvent.VESET_HODESH_DAY_NOT_CANCELED 	= 13
dEvent.VESET_HAFLAGA_NIGHT_NOT_CANCELED = 14 // not luba
dEvent.VESET_HAFLAGA_DAY_NOT_CANCELED 	= 15
dEvent.VESET_KAVUA_NIGHT		= 16
dEvent.VESET_KAVUA_DAY			= 17

function clear_event(){
	if (!(DEVENT)){return /* nothing to clean */}
	for (var i=0;i<DEVENT.length;i++){
		if ($("jm_"+ DEVENT[i][0] +"_" +DEVENT[i][3] )){
			$("jm_"+ DEVENT[i][0] +"_" +DEVENT[i][3] ).innerHTML = "" ;	
		}
		if ($("j_"+ DEVENT[i][0] +"_" +DEVENT[i][3] )){
			$("j_"+ DEVENT[i][0] +"_" +DEVENT[i][3] ).innerHTML = "" ;	
		}
	}	
	
	return
	/* IMPORTANT */
	// OLD cleaning all 
	dElm = $("d").getElementsByTagName("td")
	j_s = parseInt(dElm[0].id.replace("j_",""))
	j_e = parseInt(dElm[dElm.length-1].id.replace("j_",""))
	calElm = $("cal").getElementsByTagName("td") 
	c_s	= parseInt(calElm[0].id.replace("jm_",""))
	c_e	= parseInt(calElm[calElm.length-1].id.replace("jm_",""))
	if ( c_e > c_s ){
	for (var i=c_s;i < c_e ;i++){if ($("jm_"+ i +"_0")){$("jm_"+ i +"_0").innerHTML = "" ;  }if($("jm_"+ i +"_1")){  $("jm_"+ i +"_1").innerHTML = "" ; }}	
	}
	if (j_e > j_s){for (var i=j_s;i <j_e ;i++){if ($("j_"+ i +"_0") && $("j_"+ i +"_1")){	$("j_"+ i +"_0").innerHTML = "" ; $("j_"+ i +"_1").innerHTML = ""	}}}
}
var DEVENT = null


function calc_event(){
	clear_event()
	oEvt		= new dEvent() 
	DEVENT		= oEvt.arr
	//console.log(DEVENT)
	function print_to_el(_hdn,_ona,_class,_caller){
		if ($("jm_"+_hdn+"_"+_ona)){
			a_ev_dt = LNG[oPref.language][_class]
			a_gl_ev = "<a href='"+a_ev_dt[2]+"' title=\""+a_ev_dt[1]+"\" >"+ a_ev_dt[0] + "</a>"
			$("jm_"+_hdn+"_"+_ona).innerHTML += "<div class='has-cal-event "+_class+"' >"+ a_gl_ev +"</div>"
		}
		if ($("j_"+_hdn+"_"+_ona)){
			$("j_"+_hdn+"_"+_ona).innerHTML += "<span class='"+_class+"' ></div>"
		}
	}
	for (var i=0;i < oEvt.arr.length;i++){
			hdn 	= oEvt.arr[i][0]
			type 	= oEvt.arr[i][1]
			caller 	= oEvt.arr[i][2]
			ona 	= oEvt.arr[i][3]
			_class 	= oEvt.getClass(type)
			print_to_el(hdn,ona,_class,caller)
	}
}
function delete_events(){	Cookie.del("event")}

/*
hefsek-2106903!
raia1-2106922!
hefsek-2106926!
raia1-2106949!
hefsek-2106953!
raia1-2106976!
hefsek-2106980!
raia1-2107004!
hefsek-2107008!
raia1-2107030!
hefsek-2107034!
raia1-2107056!
hefsek-2107060!
*/
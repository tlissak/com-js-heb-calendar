
function dEvent(){	
	this.arr		= new Array()	
	this.events		= events
	this.calculate 	= calculate
	this.add 		= add	
	this.calc_haflaga = calc_haflaga
	this.length 	= -1
	
	this.haflaga_length = -1 
	/* INIT functions */
	this.calculate()
	this.arr.sort()
	this.calc_haflaga()
	//this.arr.sort() dont sort for keep index for veset haflaga calculation
	/*calc_veset_hodesh_that_not_canceled()
	calc_veset_haflaga_that_not_canceled()*/
	this.arr.sort() // finely sort
	
	
	function calc_haflaga(){
		haflaga 	= new Array()
		for (var i=0,x=0;i<this.arr.length;i++){
			if (this.arr[i][1] == dEvent.HEFSEK_THARA){
				//c("hafalaga start found at :",this.arr[i],"from",this.arr)
				haflaga_end = false
				haflaga_applied = false
				for (var j=i;j<this.arr.length;j++	){/* find end haflaga (next start raia) index [starting from this point and next j=i]*/
					/* if there is hafsek thara before next raia ???????????????delete current start hefsek tahara
					if (this.arr[j][1] == HEFSEK_THARA ){	haflaga.splice(1,this.haflaga_length) ; this.haflaga_length-- ; 	break ; }		*/
					if (this.arr[j][1] == dEvent.FLOW_START_NIGHT || this.arr[j][1] == dEvent.FLOW_START_DAY ){
						//c("found the next raia :","start",this.arr[i],"end :",this.arr[j],"now can you find me the next hefsek to applied ?")
						haflaga_end = true						
						for (var k=j;k<this.arr.length;k++){/* find the next hefsek taharh to applay the haflaga [starting from this point and next k=j]*/
							if (this.arr[k][1] == dEvent.HEFSEK_THARA){
								this.haflaga_length ++
								haflaga[this.haflaga_length] = new Array()								
								haflaga[this.haflaga_length][0] = i
								haflaga[this.haflaga_length][1] = j
								haflaga[this.haflaga_length][2] = k								
								haflaga_applied = true
								break ; // break searching applied
								break ; // break searching haflaga end 
						}}
				}}
				
				if (!(haflaga_end) || (!(haflaga_applied))){
					//if (!(haflaga_end)){	c("no hafalaga end found (the next raia) ",this.arr[i])	}
					//if (!(haflaga_applied)){	c(" no next haflaga found to applied the results",this.arr[i])	}
				}
			}
		}
		//c("haflagot length posibles","this.haflaga_length:",this.haflaga_length,"haflaga.length :"
		// ,haflaga.length,"now haflaga contain :",haflaga,"trying haflaga[0]",haflaga[0],"haflaga[1]",haflaga[1])

		for (var i=0;i<haflaga.length;i++){
			_haflaga_start 	= this.arr[haflaga[i][0]]
			_haflaga_end 	= this.arr[haflaga[i][1]]
			_haflaga_applied= this.arr[haflaga[i][2]]
			
			_haflaga_distance_hdn 	= 	_haflaga_end[0] - _haflaga_start[0] // hdn	- hdn
			TYPE	=  _haflaga_start[1] == dEvent.FLOW_START_NIGHT ? dEvent.VESET_HAFLAGA_NIGHT : dEvent.VESET_HAFLAGA_DAY
			this.add({hdn:_haflaga_applied[0]+_haflaga_distance_hdn,type:TYPE})
			//c("adding haflaga sucssefuly")	
		}
	}
	function events(){
		evts 	= Cookie.get("event").split("!")
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
		this.length++
		this.arr[ this.length ] = new Array()
		this.arr[this.length][0] = obj.hdn ;	
		this.arr[this.length][1] = obj.type	
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
				this.add({hdn:hdn,type:TYPE})
				for (var nj=1;nj<5;nj++){ // minimum nida
					this.add({hdn:(hdn +nj),type:dEvent.FLOW_IN})
				}
				this.add({hdn:(hdn+29),type:dEvent.ONA_BENONIT})
				HD.nextMonth()
				
				if (HD_DAY == HD.getDay()){/*the next month day is exist VESET HACHODESH*/ 
					TYPE = ev_type == "raia0" ? dEvent.VESET_HODESH_NIGHT : dEvent.VESET_HODESH_DAY
					this.add({hdn:HD.m_hdn,type:TYPE})
				}				
			}else if (ev_type == ("hefsek")){
				this.add({hdn:hdn,type:dEvent.HEFSEK_THARA})
				for (var nj=1;nj<=7;nj++){ // 7 nekiim
					this.add({hdn:(hdn +nj),type:dEvent.SEVEN_NEKIIM})
				}
				this.add({hdn:(hdn+7),type:dEvent.MIKVE})
			}else{ c("UNKOWN event ("+ev_type+") != (raia|hefsek) check cookie")}			
		}
		
	}
	function between(x,y,z){ return (x >= y && x <= z)	}
	
}
dEvent.FLOW_START_NIGHT 		= 1
dEvent.FLOW_START_DAY			= 2
dEvent.FLOW_IN 					= 3
dEvent.HEFSEK_THARA 			= 4
dEvent.SEVEN_NEKIIM 			= 5
dEvent.MIKVE					= 6
dEvent.ONA_BENONIT 				= 7
dEvent.VESET_HODESH_NIGHT 		= 8
dEvent.VESET_HODESH_DAY 		= 9
dEvent.VESET_HAFLAGA_NIGHT 		= 10
dEvent.VESET_HAFLAGA_DAY 		= 11
dEvent.VESET_HODESH_NIGHT_NOT_CANCELED 	= 12
dEvent.VESET_HODESH_DAY_NOT_CANCELED 	= 13
dEvent.VESET_HAFLAGA_NIGHT_NOT_CANCELED = 14
dEvent.VESET_HAFLAGA_DAY_NOT_CANCELED 	= 15
dEvent.VESET_KAVUA_NIGHT		= 16
dEvent.VESET_KAVUA_DAY			= 17

function print_event(oEvt){	//console.log(oEvt);
	for (var i=0;i < oEvt.arr.length;i++){
		event_hdn = oEvt.arr[i][0] ; 
		event_type = oEvt.arr[i][1] ;/*multi-event*/
		NIGHT 	= 0
		DAY		= 1
		ALLDAY	= 2
		if (event_type == dEvent.FLOW_START_NIGHT || event_type == dEvent.FLOW_START_DAY){ 	
			class =	"flow-s" ; 	ona = (event_type == dEvent.FLOW_START_NIGHT) ? NIGHT : DAY
		}else if(event_type == dEvent.FLOW_IN){	class =	"flow-in" ; ona = ALLDAY;
		}else if(event_type == dEvent.HEFSEK_THARA){ class =	"hefsek" ; 	ona = DAY ; 
		}else if(event_type == dEvent.SEVEN_NEKIIM){ class =	"seven-nekaim" ;ona = DAY
		}else if(event_type == dEvent.MIKVE){ 	class =	"mikve" ;	ona = DAY 
		}else if(event_type == dEvent.ONA_BENONIT){ class =	"ona-benonit" ;	ona = ALLDAY
		}else if(event_type == dEvent.VESET_HODESH_NIGHT || event_type == dEvent.VESET_HODESH_DAY){ 
			class = "hodesh" ; ona = (event_type == dEvent.VESET_HODESH_NIGHT) ? NIGHT : DAY
		}else if(event_type == dEvent.VESET_HAFLAGA_NIGHT || event_type == dEvent.VESET_HAFLAGA_DAY){
			class = "haflaga" ; ona = (event_type == dEvent.VESET_HAFLAGA_NIGHT) ? NIGHT : DAY
		}else{
			c("unknown event type : " +event_type + " for hdn : "+ event_hdn )
			class = "today"	
		}
		
		function print_to_jm(hdn,ona,class){
			if ($("jm_"+hdn+"_"+ona)){
				$("jm_"+hdn+"_"+ona).innerHTML += "<div class='has-cal-event "+class+"' >"+class+"</div>"
			}
		}
		function print_to_j(hdn,ona,class){
			if ($("j_"+hdn)){
				if ($("j_"+hdn+"_"+ona)){
					$("j_"+hdn+"_"+ona).innerHTML += "<span class='"+class+"' ></div>"					
				}else{
					$("j_"+hdn).innerHTML += "<div id='j_"+hdn+"_"+ona+"' class='ona-"+ona+"'><span class='"+class+"'></span></div>"
				}
			}
		}		
		
		if (ona==2){
			print_to_jm(event_hdn,0,class)
			print_to_jm(event_hdn,1,class)
			print_to_j(event_hdn,0,class)
			print_to_j(event_hdn,1,class)
		}else if(ona==0){
			print_to_jm(event_hdn,0,class)
			print_to_j(event_hdn,0,class)
		}else if(ona==1){
			print_to_jm(event_hdn,1,class)
			print_to_j(event_hdn,1,class)
		}
		
		
	}
}
function calc_event(){
	de		= new dEvent()
	print_event(de)
}
function delete_events(){
	Cookie.del("event")
}

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
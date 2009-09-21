var RENDER_MONTH = {m:(new Date()).getMonth()+1,y:(new Date()).getFullYear()}

function Render(type,_oMonth){
	RENDER_MONTH = _oMonth ? _oMonth : RENDER_MONTH
	if(type == "minhag"){
		calc_event()	;return
	}else if(type == "left"){
		render_left_cal() ;	calc_event()	;return
	}else if(type == "times" || type == "dst"  ){
		render_times(RENDER_MONTH);
		return
	}else if(type == "big"){ 
		render_main_cal(RENDER_MONTH) ;
		render_times(RENDER_MONTH) ;
		calc_event() ; 
		return
	}else if(type == "load"){
	render_main_cal(_oMonth)
	render_left_cal()
	calc_event()
	show_event_index()	
	render_times(_oMonth)
	}else{
	alert("unknown type on render load ."+type)	
	}
}
Event.add(window,"load",function(){

		Pref.load() // to set seleted things		
		
		ajax_load("change_log")
		ajax_load("contact")
		ajax_load("guide_"+oPref.language)
		ajax_load("mikveh-list")
		ajax_load("glossery")
		ajax_load("dialog")
		
		setCitiesList()	
		
		$("refresh").href = "?rnd="+Math.random()		
		
		if (Cookie.get("init") != "true"){
			$("welcome").style.display = "block"
			$("menu").style.display = "block"
		}
		
		Render("load",RENDER_MONTH)
		
		Event.add($("t_today"),"click",function(){	Render("big",{m:(new Date()).getMonth()+1,y:(new Date()).getFullYear()})	})
})

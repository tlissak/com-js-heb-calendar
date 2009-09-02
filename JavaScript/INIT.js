Event.add(window,"load",function(){
		oPref = Pref() // to set seleted things		
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
		curr_month = 	{m:(new Date()).getMonth()+1,y:(new Date()).getFullYear()}
		
		render_load("load",curr_month)
		
		Event.add($("t_today"),"click",function(){	render_load("render_big",curr_month)	})

})

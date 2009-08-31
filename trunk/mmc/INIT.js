// JavaScript Document
WINDOW_LOAD = true
Event.add(window,"load",function(){
								 
		ajax_load("welcome",load_next)
		ajax_load("mikveh-list")
		ajax_load("glossery")
		ajax_load("dialog")
		
		setCitiesList()
		Pref() // to set seleted things
		$("refresh").href = "?rnd="+Math.random()
		
		if (Cookie.get("init") != "true"){
			$("welcome").style.display = "block"
			$("menu").style.display = "block"
		}
		show()/* having calc_event*/
		Event.add($("t_today"),"click",function(){show_calendar({y:(new Date()).getFullYear(),m:(new Date()).getMonth()+1})})
		WINDOW_LOAD = false
})
function ajax_load(pfx,callback){xmlHttp({url:"Ajax/"+pfx+".html",response:function(s){$(pfx).innerHTML = s;if(callback){callback()}}})}
function load_next(){
	oPref = Pref()
	xmlHttp({url:"TODO.txt",response:function(s){$("change_log").innerHTML = s.replace(/\n/g,"<br />");}})
	ajax_load("guide_"+oPref.language)
}
function setCitiesList(){
	var OPT = ""
	curr_group = CITY_LOCATION[0].group
	OPT		+= "<optgroup label='"+curr_group+"'>"
	for (var i=0;i<CITY_LOCATION.length;i++){
		oCity = CITY_LOCATION[i]
		if(curr_group == oCity.group){
			OPT	+= '<option value="'+i+'" >'+oCity.place +' (Chabat + '+oCity.chabat+')</option>'
		}else{
			curr_group = oCity.group
			OPT	+= "</optgroup><optgroup label='"+curr_group+"'>"
			OPT	+= '<option value="'+i+'" >'+oCity.place +' (Chabat + '+oCity.chabat+')</option>'
		}
	}
	OPT += "</optgroup>"
	$("sCity").innerHTML = OPT
}
var MIKVE
function search_mikve(){
	if (!(MIKVE)){
		MIKVE = $("mikveh-list").getElementsByTagName("h3")
	}
	if ($("search").value ){
		for (var i=0;i<MIKVE.length;i++){
			if (MIKVE[i].innerHTML.toLowerCase().indexOf($("search").value.toLowerCase()) == 0){
				$("mikveh-list").parentNode.scrollTop = (MIKVE[i].offsetTop - 0)
				return false 
			}
		}
	}
	return false
}
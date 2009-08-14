// JavaScript Document
Event.add(window,"load",function(){
		setCitiesList()
		Pref() // to set seleted things
		$("refresh").href = "?rnd="+Math.random()
		show()/* having calc_event*/
})
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
	$("city").innerHTML = OPT
}
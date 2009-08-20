// JavaScript Document
Event.add(window,"load",function(){
		load_mikveh_list()
		load_dialog()
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

function load_dialog(){xmlHttp({url:"dialog.html",response:function(s){$("dialog").innerHTML = s}})}
function load_mikveh_list(){xmlHttp({url:"mikveh-list.html",response:function(s){$("mikveh-list").innerHTML = s}})}


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
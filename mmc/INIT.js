// JavaScript Document
WINDOW_LOAD = true
function send_email(){
	if ($('contact_data').value.length == 0){alert("Please spacify your request");return}
	this.r = function(_s){if(_s	== "OK"){$("contact").style.display ='none';$("contact_form").reset(); return} ;	alert("Email cennot be sent ,server error");}
	DT = 'email='+$('contact_email').value +'&subject='+$('contact_subject').value+'&data='+$('contact_data').value
	xmlHttp({url:'ajax/contact.php',method:'post',data:DT,response:this.r})	
}
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
		show()/* having calc_event*/
		Event.add($("t_today"),"click",function(){show_calendar({y:(new Date()).getFullYear(),m:(new Date()).getMonth()+1})})
		WINDOW_LOAD = false
})
function ajax_load(pfx,callback){xmlHttp({url:"Ajax/"+pfx+".html",response:function(s){$(pfx).innerHTML = s;if(callback){callback()}}})}
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
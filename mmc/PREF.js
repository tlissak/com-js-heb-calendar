// JavaScript Document
function Pref(){
	var timezone = 0
	var language = "fr"
	var time_adj = 0
	var cal_start 	= (new Date()).getFullYear()
	var cal_end 	= cal_start
	var country 	= "europe"
	var	city		= "paris"
	var bIsrael		= false // galut
	
	_city = $("city")
	_city_opts = _city.options 
	
	function setTimeZone(v){	
		for (var i=0;i<_city_opts;i++){
			if (_city_opts[i].value.toLowerCase() == v.toLowerCase())
				_city.selectedIndex	= i
		}
	}
	function getTimeZone(){
		_six = _city.selectedIndex
		_city = _city_opts[_six].value
		country = _city_opts[_six].parentNode.label.toLowerCase()
		if (country == "israel"){bIsrael = true }
	}
	
	function getQSpref (){
		lng 		= qs("lng")
		city 		= qs("city")
		time_adj 	= qs("time_adj")
		cal_start	= qs("cal_start")
		cal_end		= qs("cal_end")	
		
	}
	function setQSPref(_op){
		
	}
}



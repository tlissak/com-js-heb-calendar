// JavaScript Document
function calc_event(){
	//clear_event()
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
}
var Calev = new Array()
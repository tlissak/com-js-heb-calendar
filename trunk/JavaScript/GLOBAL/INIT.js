var RENDER_MONTH = {m:(new Date()).getMonth() +1,y:(new Date()).getFullYear()}
var Cal_Veses	= new calender
function popup(			){
	for (var _jx=0,strout ='';_jx<popup.arguments.length;_jx++){
		param = popup.arguments[_jx]
		if (typeof(param) == "string" || typeof(param) == "number"){ 	strout += " " + _(param)
		}else{	strout += " " + param.toString()}
	} Msg(strout)
}
function Msg(xx,type){
	type = type ? type : "msg" //error
	$("message").className = type
	$("msg_cont").innerHTML = xx
	$("message").style.display = 	"block"
	
}
Msg.close =function(){	$("message").style.display = 	"none"	}
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
	throw("unknown type on Render(type,_oMonth) ."+type)	
	}
}
Ev.add(window,"load",function(){
		Ev.add($("refresh"),"click",Reload)	
		Ev.add($("t_today"),"click",Today)
		setCitiesList()	
		/*ajax_load("change_log")
		ajax_load("contact")
		ajax_load("guide_"+oPref.language)
		ajax_load("mikveh-list")
		ajax_load("glossery")*/
		ajax_load("dialog")	
		/*if (Cookie.get("init") != "true"){ $("welcome").style.display = "block" ; $("menu").style.display = "block" ;	}*/
		load_mikveh_list()
		//e_add((new GDate(6,8,2008)).m_hdn,0,8,30)
		//e_add((new GDate(8,10,2009)).m_hdn,0,9,30)		
		//add_veses((new GDate(6,10,2008)).m_hdn,0,9,30)	
		/*e_add((new GDate(28,3,2009)).m_hdn,0,8,30);e_add((new GDate(24,4,2009)).m_hdn,0,8,30);e_add((new GDate(21,5,2009)).m_hdn,0,8,30)
		e_add((new GDate(18,6,2009)).m_hdn,0,8,30);e_add((new GDate(14,7,2009)).m_hdn,0,8,30);e_add((new GDate(9,8,2009)).m_hdn,0,8,30)		
		e_add((new GDate(14,8,2009)).m_hdn,3,15,30);e_add((new GDate(6,9,2009)).m_hdn,0,8,30);e_add((new GDate(11,9,2009)).m_hdn,3,15,30)*/
		Pref.load()
})
function Reload(){window.location.href = "?rnd="+Math.random()}
function Today(){_xMonth = {	m:(new Date()).getMonth()+1,y:(new Date()).getFullYear()} ;Render("big",_xMonth)}
function load_mikveh_list(){	loadXMLwXSL("mikveh/mikveh-list.xml","mikveh/des.xsl","mikveh-list")	}


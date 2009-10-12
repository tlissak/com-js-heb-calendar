var vmsg = {}
vmsg.later_raia = function(_a,_b){
	alert(
		  _("later_raia_1")
		  ,	_a
		  ,	_("later_raia_ex")
		  ,	_b
	)
}
vmsg.hefsek_unconfirmed = function(_a){
	alert(_("last_confirm") , _a ,_("please_confirm")  ,_("onerror_call"))
}
vmsg.raia_inbetween_another = function(_a,_b,_c){
	alert( _("inbet_1")	,_a, _("inbet_2")	,_b, _("inbet_3"),_c)
}
vmsg.bedika_in_whiteweek_greater_then_seven = function(){
	alert(	_("read_carefuly_unclean_b")	)
}
var vmsg = {}
vmsg.bad_mikveh = function(_a,_b){	alert(_("There is a bad mikveh at "),_a,_b)}
vmsg.later_raia = function(_a,_b){	alert(  _("later_raia_1")  ,	_a  ,	_("later_raia_ex")  ,	_b)}
vmsg.hefsek_unconfirmed = function(_a){	alert(_("last_confirm") , _a ,_("please_confirm")  ,_("onerror_call"))}
vmsg.raia_inbetween_another = function(_a,_b,_c){	alert( _("inbet_1")	,_a, _("inbet_2")	,_b, _("inbet_3"),_c)}
vmsg.bedika_in_whiteweek_greater_then_seven = function(){	alert(	_("read_carefuly_unclean_b")	)}
vmsg.kevua_chodesh = function(_a,_b){
	return [ _("veses_hodesh_establish_on"), _a," of day ", _b	," for the past three jewish months."].join(" ")
}
vmsg.kevua_haflaga = function(_a){	return [_("k_new_gaps"),_a].join( " " )}
vmsg.kevua_dilug_a = function(_a,_b,_c,_d){
return [_("veses_dilug_asc_establish") , _("pattern_due_gap")	,_a ,_("days_between_flows"),_("separate_and_bedika") ,_("on_the")	,_b ,_("pattern_by_flows_between") ,_c , _("and_the"), _d ].join(" ") 
}
vmsg.kevua_dilug_b = function(_a,_b,_c,_d,_e){
return [_("veses_dilug_asc_establish"), _("pattern_due_gap") ,_a ,_("onah_between_flows"),_("separate_and_bedika") ,_("on_the") , _b , _("of") , _c ,_("pattern_by_flows_between") , _d,_("and_the"), _e ].join( " ")
}
vmsg.kevua_dilug_c = function(_a,_b,_c,_d){
return [_("veses_dilug_desc_establish") , _("pattern_due_gap") ,_a ,_("days_between_flows"),_("separate_and_bedika"),_("on_the") , _b ,_("pattern_by_flows_between") , _c	,_("and_the"), _d ].join( " ")
}
vmsg.kevua_dilug_d = function(_a,_b,_c,_d,_e){
return [_("veses_dilug_desc_establish") , _("pattern_due_gap") ,_a 	,_("days_between_flows"),_("separate_and_bedika"),_("on_the") , _b ,_("of") , _c	,_("pattern_by_flows_between") , _d,_("and_the"), _e ].join( " ")
}
vmsg.kevua_dilug_e = function(_a,_b,_c,_d){
return [_("veses_dilug_asc_span_establish") , _("pattern_due_gap")	,_a	,_("days_between_haflaga"),_("separate_and_bedika")	, _b  ,_("days_from_ht"),_("pattern_by_flows_between"),_c	,_("and_the"),_d ].join(" ")
}
vmsg.kevua_dilug_e = function(_a,_b,_c,_d){
return [_("veses_dilug_asc_span_establish"), _("pattern_due_gap")	,_a	,_("days_between_haflaga")	,_("separate_and_bedika") , _b  ,_("days_from_ht"),_("pattern_by_flows_between"),_c	,_("and_the"),_d ].join(" ")
}
vmsg.kevua_dilug_f = function(_a,_b,_c,_d){
return [_("veses_dilug_asc_span_establish"), _("pattern_due_gap")	,_a	,_("onahs_between_haflaga")	,_("separate_and_bedika")	, _b  ,_("onahs_from_ht"),_("pattern_by_flows_between"),_c	,_("and_the"),_d ].join(" ")
}
vmsg.kevua_dilug_g = function(_a,_b,_c,_d){
return [_("veses_dilug_desc_span_establish"), _("pattern_due_gap")	,_a	,_("days_between_haflaga")	,_("separate_and_bedika")	, _b  	,_("days_from_ht"),_("pattern_by_flows_between")	,_c	,_("and_the"),_d ].join(" ")
}
vmsg.kevua_dilug_h = function(_a,_b,_c,_d){
return [_("veses_dilug_desc_span_establish"), _("pattern_due_gap"),_a	,_("onahs_between_haflaga")	,_("separate_and_bedika"), _b  ,_("onahs_from_ht"),_("pattern_by_flows_between"),_c	,_("and_the"),_d ].join(" ")
}
vmsg.kevua_sirug_a = function(_a,_b,_c,_d){
return [ _("veses_sirug_establish") , _("pattern_due_gap") ,_a 	,_("weeks_between_flows")	,_("separate_and_bedika")	,_("on_the")	,_b	,_("pattern_by_flows_between") ,_c	,_("and_the"),_d].join(" ")
}
vmsg.kevua_sirug_b = function(_a,_b,_c,_d,_e,_f,_g){
return [ _("veses_sirug_alt_establish") , _("pattern_due_gap") ,_a 	,_("weeks_over_last") ,_b,_("flows"),_("separate_and_bedika")	,_("on_the")	,_c	,_("since_will_be"),	_d,_("weeks_from_on_the") ,_e 	,_("pattern_by_flows_between") ,_f," and the ",_g].join(" ")
}
vmsg.kevua_sirug_c = function(_a,_b,_c,_d,_e,_f,_g){ 
return [ _("veses_sirug_establish"),_("pattern_due_gap"), _("excactly") , _a , _("months"),_("between_last_flows"),_("separate_and_bedika"), _("on_the") , _b,_("pattern_by_flows_between") ,_c,_("and_the"),_d].join(" ")	  
}
vmsg.kevua_sirug_d = function(_a,_b,_c,_d,_e,_f,_g){ 
return [  _("veses_sirug_alt_establish") ,_("pattern_flows_on_days") ,_a ,_("has_repeated_over_past"), _b , _("flows"),_("separate_and_bedika"),_("on_the")	,_c	,_("pattern_by_flows_between") ,_d,_("and_the"),_e].join(" ")	   
}
vmsg.kevua_sirug_e = function(_a,_b,_c,_d,_e,_f,_g){ 
return [ _("veses_sirug_alt_establish") ,_("pattern_flows_on_day_of_month") ,_a ,_("has_repeated_over_past"), _b , _("flows"),_("separate_and_bedika"),_("on_the")	,_c,_("pattern_by_flows_between") ,_d,_("and_the"),_e].join(" ")
}
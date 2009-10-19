var vmsg = {}
vmsg.bad_mikveh = function(_a,_b){
	alert(_("There is a bad mikveh at "),_a,_b)
}
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
vmsg.kevua_chodesh = function(_a,_b){
	return [ "A Fixed cycle (veses kavuah) has been established by a flow starting on the "
			, _a," of day ", _b
			," for the past three jewish months."].join(" ")
}
vmsg.kevua_haflaga = function(_a){
	return [_("k_new_gaps"),_a].join( " " )
}
vmsg.kevua_dilug_a = function(_a,_b,_c,_d){
		return ["An incremental fixed cycle (veses hadilug) has been established for stringency. "
		,"This pattern is due to a gap of "	,_a 
		," days between each monthly flow. Aside from keeping your regular onot of separation, "
		,"you should also separate and perform an examination on the "	,_b
		,". This pattern was established by flows occurring between the " ,_c , "and the ", _d ].join(" ") 
}
vmsg.kevua_dilug_b = function(_a,_b,_c,_d,_e){
	 return ["An incremental fixed cycle (veses hadilug) has been established for stringency. "
	,"This pattern is due to a gap of " ,_a 
	," onah between each monthly flow. Aside from keeping your regular onot of separation,"
	," you should also separate and perform an examination on the " , _b , " of " , _c
	,". This pattern was established by flows occurring between the " 	, _d,"and the ", _e ].join( " ")
}

vmsg.kevua_dilug_c = function(_a,_b,_c,_d){
	 return ["A decreasing incremental fixed cycle (veses hadilug) has been established for stringency. "
	,"This pattern is due to a gap of " ,_a 
	," days between each monthly flow. Aside from keeping your regular onot of separation,"
	," you should also separate and perform an examination on the " , _b 
	,". This pattern was established by flows occurring between the " , _c	,"and the ", _d ].join( " ")
}
vmsg.kevua_dilug_d = function(_a,_b,_c,_d,_e){
	 return ["A decreasing incremental fixed cycle (veses hadilug) has been established for stringency. "
	,"This pattern is due to a gap of " ,_a 
	," days between each monthly flow. Aside from keeping your regular onot of separation,"
	," you should also separate and perform an examination on the " , _b , " of " , _c
	,". This pattern was established by flows occurring between the " , _d,"and the ", _e ].join( " ")
}
vmsg.kevua_dilug_e = function(_a,_b,_c,_d){
		return ["An incremental fixed cycle based on span (veses hadilug) has been established for stringency. "
		,"This pattern is due to a gap of "	,_a	," days between haflagah days over the past three flows. "
		,"Aside from keeping your regular onot of separation, you should also separate and perform an examination "
		, _b  ," days from your next hefsek taharah . This pattern was established by flows occurring between the "
		,_c	," and the ",_d ].join(" ")
}
vmsg.kevua_dilug_e = function(_a,_b,_c,_d){
		return ["An incremental fixed cycle based on span (veses hadilug) has been established for stringency. "
		,"This pattern is due to a gap of "	,_a
		," days between haflagah days over the past three flows. "
		,"Aside from keeping your regular onot of separation, you should also separate and perform an examination "
		, _b  ," days from your next hefsek taharah. This pattern was established by flows occurring between the "
		,_c	," and the ",_d ].join(" ")
}
vmsg.kevua_dilug_f = function(_a,_b,_c,_d){
		return ["An incremental fixed cycle based on span (veses hadilug) has been established for stringency. "
		,"This pattern is due to a gap of "	,_a
		," onahs between haflagah numbers over the past three flows. "
		,"Aside from keeping your regular onot of separation, you should also separate and perform an examination "
		, _b  ," onahs from your next hefsek taharah . This pattern was established by flows occurring between the "
		,_c	," and the ",_d ].join(" ")
}
vmsg.kevua_dilug_g = function(_a,_b,_c,_d){
		return ["A decreasing incremental fixed cycle based on span (veses hadilug) has been established for stringency. "
		,"This pattern is due to a gap of "	,_a
		," days between haflagah days over the past three flows. "
		,"Aside from keeping your regular onot of separation, you should also separate and perform an examination "
		, _b  	," days from your next hefsek taharah . This pattern was established by flows occurring between the "
		,_c	," and the ",_d ].join(" ")
}
vmsg.kevua_dilug_h = function(_a,_b,_c,_d){
		return ["A decreasing incremental fixed cycle based on span (veses hadilug) has been established for stringency. "
		,"This pattern is due to a gap of "	,_a
		," onahs between haflagah numbers over the past three flows. "
		,"Aside from keeping your regular onot of separation, you should also separate and perform an examination "
		, _b  ," onahs from your next hefsek taharah . This pattern was established by flows occurring between the "
		,_c	," and the ",_d ].join(" ")
}
//////////////////////////////////////////
vmsg.kevua_sirug_a = function(_a,_b,_c,_d){
	return [ "A regularly spaced cycle (veses hasirug) has been established for stringency. "
	,"This pattern is due to a gap of " ,_a 
	," weeks between each of the past three flows. Aside from keeping your regular onot of separation, "
	," you should also separate and perform an examination on the "	,_b
	," This pattern was established by flows occurring between the " ,_c	," and the ",_d].join(" ")
}
vmsg.kevua_sirug_b = function(_a,_b,_c,_d,_e,_f,_g){
	return [ "An alternating regularly spaced cycle (veses hasirug) has been established for stringency. "
	,"This pattern is due to a gap of " ,_a 
	," weeks  over the last " ,_b," flows"
	," Aside from keeping your regular onot of separation, "
	," you should also separate and perform an examination on the "	,_c
	," (since this will be " ,	_d," weeks from the flow on the" ,_e 
	," This pattern was established by flows occurring between the " ,_f," and the ",_g].join(" ")
}
vmsg.kevua_sirug_c = function(_a,_b,_c,_d,_e,_f,_g){ 
	return [ "An regularly spaced cycle (veses hasirug) has been established for stringency. "
	,"This pattern is due to a gap of excactly " , _a , " months"
	," between each of the past three flows. Aside from keeping your regular onot of separation, "
	, "you should also separate and perform an examination on the " , _b
	,". This pattern was established by flows occurring between the " ,_c," and the ",_d].join(" ")	  
}
vmsg.kevua_sirug_d = function(_a,_b,_c,_d,_e,_f,_g){ 
	return [ "An alternating regularly spaced cycle (veses hasirug) has been established for stringency. "
	,"This pattern of flows on days " ,_a 
	," has repeated itself three times over the past " 	, _b , " flows. "
	," Aside from keeping your regular onot of separation, "
	," you should also separate and perform an examination on the "	,_c
	," This pattern was established by flows occurring between the " ,_d," and the ",_e].join(" ")	   
}
vmsg.kevua_sirug_e = function(_a,_b,_c,_d,_e,_f,_g){ 
	return [ "An alternating regularly spaced cycle (veses hasirug) has been established for stringency. "
	,"This pattern of flows on n the following days of the month: " ,_a 
	," has repeated itself three times over the past " 	, _b , " flows. "
	," Aside from keeping your regular onot of separation, "
	," you should also separate and perform an examination on the "	,_c
	," This pattern was established by flows occurring between the " ,_d," and the ",_e].join(" ")	   
}




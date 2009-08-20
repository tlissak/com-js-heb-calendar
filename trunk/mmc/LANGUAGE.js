// JavaScript Document

var LNG = new Array("he","en","fr")
LNG.en ={}
LNG.fr ={}
LNG.he ={}

LNG["Available"] = ["Hebrew","English","Francais"]
LNG["Available_short"] = []

LNG["en"].dow 		= ["Sunday","Monday","Tuesday","Wendsday","Thursday","Friday","Saterday"]
LNG["fr"].dow 		= ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
LNG["he"].dow 		= ["Rishon","Sheni","Shlishi","Reviai","Chamishi","Shishi","Shabat"]

LNG["en"].dow_short = ["Sun","Mon","Tue","Wen","Thu","Fri","Sat"]
LNG["fr"].dow_short = ["Dim","Lun","Mar","Mer","Jue","Ven","Sam"]
LNG["he"].dow_short = ["Alef","Bet","Gimel","Dalet","Hea","Vav","Shabat"]

LNG["en"].month 	= ["","January","February","March","April","May","June","July","August","September","October","November","December"]
LNG["fr"].month 	= ["","Janvier","F&eacute;vrier","Mars","Avril","Mai","Juin","Juillet","Ao&ucirc;t","Septembre","Octobre","Novembre","D&eacute;cembre"]
LNG["he"].month 	= ["","January","February","March","April","May","June","July","August","September","October","November","December"]

LNG["en"].month_short 	= ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
LNG["fr"].month_short 	= ["","Jan","F&eacute;v","Mar","Avr","Mai","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
LNG["he"].month_short 	= ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

LNG["en"].heb_month 	= ["","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Tishray","Cheshvan","Kislev","Tevet","Shvat","Adar","Adar 1","Adar 2"]
LNG["fr"].heb_month 	= ["","Nissan","Iyar","Sivan","Tamouz","Av","Elul","Tichri","Hechvan","Kislev","Tevet","Chevat","Adar","Adar 1","Adar 2"]
LNG["he"].heb_month 	= ["","Nisan","Iyar","Sivan","Tamuz","Av","Elul","Tishray","Cheshvan","Kislev","Tevet","Shvat","Adar","Adar 1","Adar 2"]


LNG["en"].moadim = new Array()
LNG["en"].moadim["isru_chag"] 		= "Isru chag"
LNG["en"].moadim["rosh_hashana"] 	= "Rosh hashana"
LNG["en"].moadim["fast_gedalia"] 	= "Fast of gedalia"
LNG["en"].moadim["yom_kipur"]		= "Yom kipur"
LNG["en"].moadim["sukot"]			= "Sukot"
LNG["en"].moadim["hoshana_raba"]	= "Hoshana raba"
LNG["en"].moadim["shmini_atseret"]	= "Shmini atseret"
LNG["en"].moadim["simchat_tora"]	= "Simchat torah"
LNG["en"].moadim["chanuka"]			= "Chanuka"
LNG["en"].moadim["fast_tevet"]		= "Fast 10 tevet"
LNG["en"].moadim["tu_bishvat"]		= "15 Bishvat"
LNG["en"].moadim["fast_esther"]		= "Fast of esther"
LNG["en"].moadim["purim"]			= "Purim"
LNG["en"].moadim["shushan_purim"]	= "Shushan purim"
LNG["en"].moadim["fast_bechorot"]	= "Taanit bechorot"
LNG["en"].moadim["pesach"]			= "Pessach"
LNG["en"].moadim["yom_haatsmaut"]	= "Yom haatsmaut"
LNG["en"].moadim["yom_hashoa"]		= "Yom hashoa"
LNG["en"].moadim["pesach_sheni"]	= "Pessach sheni"
LNG["en"].moadim["lag_baomer"]		= "Lag baomer"
LNG["en"].moadim["yom_yerushalaim"]	= "Jerusalem day"
LNG["en"].moadim["shavuot"]			= "Shavout"
LNG["en"].moadim["fast_tamuz"]		= "Fast 17 Tamouz"
LNG["en"].moadim["tisha_beav"]		= "Fast 9 beav" 
LNG["en"].moadim["tu_beav"]			= "15 Beav"

LNG["fr"].moadim = new Array()
LNG["fr"].moadim["isru_chag"] 		= "Isrou hag"
LNG["fr"].moadim["rosh_hashana"] 	= "Roch hachana"
LNG["fr"].moadim["fast_gedalia"] 	= "Je&ucirc;ne de gedalia"
LNG["fr"].moadim["yom_kipur"]		= "Yom kipour"
LNG["fr"].moadim["sukot"]			= "Soukot"
LNG["fr"].moadim["hoshana_raba"]	= "Hochana raba"
LNG["fr"].moadim["shmini_atseret"]	= "Chemini atseret"
LNG["fr"].moadim["simchat_tora"]	= "Simchat torah"
LNG["fr"].moadim["chanuka"]			= "Hannouka"
LNG["fr"].moadim["fast_tevet"]		= "Je&ucirc;ne du 10 tevet"
LNG["fr"].moadim["tu_bishvat"]		= "Tou Bichvat"
LNG["fr"].moadim["fast_esther"]		= "Je&ucirc;ne de Esther"
LNG["fr"].moadim["purim"]			= "Pourim"
LNG["fr"].moadim["shushan_purim"]	= "Chouchan pourim"
LNG["fr"].moadim["fast_bechorot"]	= "Je&ucirc;ne des premiers-n&eacute;s"
LNG["fr"].moadim["pesach"]			= "Pessah"
LNG["fr"].moadim["yom_haatsmaut"]	= "Yom haatsmaout"
LNG["fr"].moadim["yom_hashoa"]		= "Yom hashoa"
LNG["fr"].moadim["pesach_sheni"]	= "Pessah cheni"
LNG["fr"].moadim["lag_baomer"]		= "Lag baomer"
LNG["fr"].moadim["yom_yerushalaim"]	= "Yom Jerusalem"
LNG["fr"].moadim["shavuot"]			= "Chavouot"
LNG["fr"].moadim["fast_tamuz"]		= "Je&ucirc;ne du 17 Tamouz"
LNG["fr"].moadim["tisha_beav"]		= " Je&ucirc;ne du 9 beav" 
LNG["fr"].moadim["tu_beav"]			= "Tou Beav"

LNG["he"].moadim = new Array()
LNG["he"].moadim["isru_chag"] 		= ""
LNG["he"].moadim["rosh_hashana"] 	= ""
LNG["he"].moadim["fast_gedalia"] 	= ""
LNG["he"].moadim["yom_kipur"]		= "Yom kipur"
LNG["he"].moadim["sukot"]			= "Sukot"
LNG["he"].moadim["hoshana_raba"]	= "Hoshana raba"
LNG["he"].moadim["shmini_atseret"]	= "Shmini atseret"
LNG["he"].moadim["simchat_tora"]	= "Simchat torah"
LNG["he"].moadim["chanuka"]			= "Chanuka"
LNG["he"].moadim["fast_tevet"]		= "Fast 10 tevet"
LNG["he"].moadim["tu_bishvat"]		= "15 Bishvat"
LNG["he"].moadim["fast_esther"]		= "Fast of esther"
LNG["he"].moadim["purim"]			= "Purim"
LNG["he"].moadim["shushan_purim"]	= "Shushan purim"
LNG["he"].moadim["fast_bechorot"]	= "Taanit bechorot"
LNG["he"].moadim["pesach"]			= "Pessach"
LNG["he"].moadim["yom_haatsmaut"]	= "Yom haatsmaut"
LNG["he"].moadim["yom_hashoa"]		= "Yom hashoa"
LNG["he"].moadim["pesach_sheni"]	= "Pessach sheni"
LNG["he"].moadim["lag_baomer"]		= "Lag baomer"
LNG["he"].moadim["yom_yerushalaim"]	= "Jerusalem day"
LNG["he"].moadim["shavuot"]			= "Shavout"
LNG["he"].moadim["fast_tamuz"]		= "Fast 17 Tamouz"
LNG["he"].moadim["tisha_beav"]		= "Fast 9 beav" 
LNG["he"].moadim["tu_beav"]			= "15 Beav"

LNG["en"].rosh_hodesh = "Rosh chodesh"
LNG["fr"].rosh_hodesh = "Roch hodech"
LNG["he"].rosh_hodesh = "Rosh chodesh"

LNG["en"].refresh = "Refresh"
LNG["fr"].refresh = "Actualiser"
LNG["he"].refresh = "Refresh"

LNG["en"].setting = "Setting"
LNG["fr"].setting = "param&egrave;tres"
LNG["he"].setting = "setting"

LNG["en"].parasha = "Parasha"
LNG["fr"].parasha = "paracha"
LNG["he"].parasha = "parasha"

LNG["en"].t_mikveh_france = "List mikveh in france"
LNG["fr"].t_mikveh_france = "Liste des mikv&eacute;s en france"
LNG["he"].t_mikveh_france = "Liste mikveh en france"

LNG["en"].t_mikveh_world = "Find mikveh over the world"
LNG["fr"].t_mikveh_world = "Trouver un mikv&eacute; partout dans le monde"
LNG["he"].t_mikveh_world = "Find mikveh over the world"

LNG["en"].t_cal_begin = "Calendars begin from"
LNG["fr"].t_cal_begin = "Ann&eacute;e de d&eacute;but du calendrier"
LNG["he"].t_cal_begin = "Calendars begin from"
LNG["en"].t_cal_end = "Calendars end at"
LNG["fr"].t_cal_end = "Ann&eacute;e de fin du calendrier"
LNG["he"].t_cal_end = "Calendars end at"
LNG["en"].t_dst = "Daylight saving time (+1 hr)"
LNG["fr"].t_dst = "Heure d'&eacute;t&eacute;(+1 hr)"
LNG["he"].t_dst = "Shaon kaitz (+1 hr)"



LNG["en"].netz 		= "Netz"
LNG["en"].shkia 	= "shkia"
LNG["en"].alot 		= "alot"
LNG["en"].shaa_zmanit = "shaa_zmanit"
LNG["en"].misheyakir = "misheyakir"
LNG["en"].tzeit 	= "tzait hakochavim"
LNG["en"].shema		= "shema"
LNG["en"].tefillah 	= "tefillah"
LNG["en"].chatzot 	= "chatzot"
LNG["en"].mincha_g 	= "mincha gedola"
LNG["en"].mincha_k 	= "mincha ketana"
LNG["en"].plag 		= "plag"
LNG["en"].three_stars = "3 Stars"


LNG["fr"].netz 		= "lever du soleil"
LNG["fr"].shkia 	= "coucher du soleil"
LNG["fr"].alot 		= "alot hachakhar"
LNG["fr"].shaa_zmanit = "heure moyenne"
LNG["fr"].misheyakir = "misheyakir"
LNG["fr"].tzeit 	= "sortie des &eacute;toiles"
LNG["fr"].shema		= "fin shema"
LNG["fr"].tefillah 	= "fin tefila"
LNG["fr"].chatzot 	= "hatzot"
LNG["fr"].mincha_g 	= "mincha gedola"
LNG["fr"].mincha_k 	= "mincha ketana"
LNG["fr"].plag 		= "plag"
LNG["fr"].three_stars = "3 &eacute;toiles"


LNG["he"].netz 		= "Netz"
LNG["he"].shkia 	= "shkia"
LNG["he"].alot 		= "alot"
LNG["he"].shaa_zmanit = "shaa_zmanit"
LNG["he"].misheyakir = "misheyakir"
LNG["he"].tzeit 	= "tzait hakochavim"
LNG["he"].shema		= "shema"
LNG["he"].tefillah 	= "tefillah"
LNG["he"].chatzot 	= "chatzot"
LNG["he"].mincha_g 	= "mincha gedola"
LNG["he"].mincha_k 	= "mincha ketana"
LNG["he"].plag 		= "plag"
LNG["he"].three_stars = "3 Stars"

LNG["en"].flow_s 	= ["Start of Flow","The 'ona' when the flow start to show","#flow-s"]
LNG["en"].flow_in 	= ["Min Continue of Flow","The minmum obligatory days to count from start of flow","#flow-in"]
LNG["en"].hefsek 	= ["Hefsek tahara","The bedika 'Moch dachuk' at the end of flows days","#hefsek"]
LNG["en"].seven_nekiaim = ["7 nekiaim","Seven days to verify 2 times at day any sign of blood","#7-nekim"]
LNG["en"].mikve		= ["Mikve","The mikveh at end of 7 nekiim","#mikveh"]
LNG["en"].veset_hodesh = ["Veset hachodesh","'Ona' of posibility to see a flow becouse of the day in hebrew month couse it","#veset-hodesh"]
LNG["en"].veset_haflaga = ["Veset haflaga","'Ona' of posibility to see a flow becouse of the distance between flows and hefsek tara","#veset-haflaga"]
LNG["en"].ona_benonit = ["Ona benonit","Entire day of posibilit to see a flow becouse of most of women see at it","#ona-benonit"]

LNG["fr"].flow_s 	= ["D&eacute;but des saignements","La ona pendant laquelle le saignement a &eacute;t&eacute; vu","#flow-s"]
LNG["fr"].flow_in 	= ["P&eacute;riode minimale des r&egrave;gles","Le minimum de jours obligatoire &agrave; compter du d&eacute;but des r&egrave;gles","#flow-in"]
LNG["fr"].hefsek 	= ["Hefsek tahara","La bedika 'Mokh dakhuk' &agrave; la fin des r&egrave;gles","#hefsek"]
LNG["fr"].seven_nekiaim = ["7 nekiim","Sept jours pendant lesquels on v&eacute;rifie deux fois par jours l'absence du sang","#7-nekim"]
LNG["fr"].mikve		= ["Mikve","Le mikv&eacute;&agrave; la fin des 7 nekiim","#mikveh"]
LNG["fr"].veset_hodesh = ["Veset hahodech","'Ona' pendant laquelle il est possible de voir le d&eacute;but des r&egrave;gles en raison du jour du mois h&eacute;bra&iuml;que","#veset-hodesh"]
LNG["fr"].veset_haflaga = ["Veset haflaga","'Ona' pendant laquelle il est possible de voir le d&eacute;but des r&egrave;gles en raison de la distance entre le hefsek tahara et le d&eacute;but des r&egrave;les","#veset-haflaga"]
LNG["fr"].ona_benonit = ["Ona benonit","Jour entier correspondant &agrave; un cycle pr&eacute;sent chez la plupart des femmes","#ona-benonit"]

LNG["he"].flow_s 	= ["Start of Flow","The 'ona' when the flow start to show","#flow-s"]
LNG["he"].flow_in 	= ["Min Continue of Flow","The minmum obligatory days to count from start of flow","#flow-in"]
LNG["he"].hefsek 	= ["Hefsek tahara","The bedika 'Moch dachuk' at the end of flows days","#hefsek"]
LNG["he"].seven_nekiaim = ["7 nekiaim","Seven days to verify 2 times at day any sign of blood","#7-nekim"]
LNG["he"].mikve		= ["Mikve","The mikveh at end of 7 nekiim","#mikveh"]
LNG["he"].veset_hodesh = ["Veset hachodesh","'Ona' of posibility to see a flow becouse of the day in hebrew month couse it","#veset-hodesh"]
LNG["he"].veset_haflaga = ["Veset haflaga","'Ona' of posibility to see a flow becouse of the distance between flows and hefsek tara","#veset-haflaga"]
LNG["he"].ona_benonit = ["Ona benonit","Entire day of posibilit to see a flow becouse of most of women see at it","#ona-benonit"]
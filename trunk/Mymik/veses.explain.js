Veses.prototype.explain=function(exp_type){
	var html="<div style='width:368px'><div class='title' style='margin-top:0px'>How to keep your own calendar</div><div align='left' style='margin-left:22px;'>";
	var goesOnCal=this.goesOnCalendar();if(!this._hefsek_confirmed&&exp_type=='R')
	{var letter='P';if(!goesOnCal)
	letter='S';if(this._cause==4||this._cause==5)
	letter='B';var reeyah_day=new Day(this._reeyah);var side=new Array('left','NIGHT');if(this._onah==_DAY_)
	side=new Array('right','DAY');var miniDate=this._reeyah.toString();
	miniDate=miniDate.split(",");var d=this._reeyah.clone();var temp;var miniHT_Dates=new Array(6);for(i=1;i<6;i++)
	{temp=d.toString();temp=temp.split(",");miniHT_Dates[i]=temp[0];d.next();}
	d2=d.clone();d2.prev();var chodesh=this._reeyah.clone();chodesh.next_mo();var benonis=chodesh.clone();
	if(lastDayOfHebrewMonth(this._reeyah._m,this._reeyah._y)==30)
	benonis.prev();var day_before_benonis=benonis.clone();
	day_before_benonis.prev();
	html+="<ol><li>"+this.cause_str()+"on the "+this._reeyah+" at "+time(this._time)+" which falls out on the "+_ONAH_NAMES_[this._onah]
	+". A \""+ letter+"\" will appear on the "+side[0]+" hand side of the box for the "+miniDate[0]+".</li>";
	bedikot_after_birth=" You should then keep the seven preparatory days before going to the mikvah. If performing bedikot " 
	+" pose a difficulty for you or you have difficulty attaining a clean bedikah, please consult an Orthodox rabbi on how to proceed.";
	if(this.StartedInWhiteWeek(top.frames[1].cal))
	html+="<li>"+this.cause_str()+"during your preparatory days and therefore you may confirm " 
	+ " bleeding has ceased (Hebrew for this confirmation is Hefsek Taharah) without having to wait 5 days.";
	else if(this._cause==4)
	html+="<li>After giving birth to a son, you may perform a Hefsek Taharah as soon as you are ready (providing your doctor has proclaimed you sufficiently healed)."
	+bedikot_after_birth;
	else if(this._cause==5)
	html+="<li>After giving birth to a daughter, you may perform a Hefsek Taharah as early as seven days after the birth " 
	+ " (providing your doctor has proclaimed you sufficiently healed)."+bedikot_after_birth;
	else if(this._cause==6&&!this.goesOnCalendar())
	html+="<li>After a miscariage, you may perform a Hefsek Taharah in as early as seven days (providing your doctor has proclaimed you sufficiently healed)."
	+bedikot_after_birth;
	else
	html+="<li>Regardless of how long the bleeding lasts,you may not confirm bleeding has ceased " 
	+ "(Hebrew for this confirmation is Hefsek Taharah) for a minimum of 5 days. The "
	+miniDate[0]+" is day 1, the "+miniHT_Dates[2]+" day 2, the "+miniHT_Dates[3]+" day 3, the "
	+miniHT_Dates[4]+" day 4 and the earliest day you may attempt a Hefsek Taharah will be the "
	+miniHT_Dates[5]+" ("+d2.to_eng()+"), day 5. The \"HT\" that appears is to remind you hat you may attempt a Hefsek" 
	+ "t Taharah starting on that day. The \"HT\" is movable and you may move it to the correct day once a successful Hefsek Taharah has been accomplished.</li>";
	if(goesOnCal){if(this._reeyah._d==30&&lastDayOfHebrewMonth(chodesh._m,chodesh._y)==29)
	html+="<li>Since you became nidah on the "+this._reeyah+", and there are only 29 days in the following month, there is no Veset Hachodesh for this period.</li>";
	else
	html+="<li>Since you became nidah on the "
	+this._reeyah+", an onah of anticipation called Veset Hachodesh (Hebrew Date Cycle), will be recorded for the same date of the next month. To help "
	+ " remember this date, a filled in circle will appear on the "
	+side[0]+" hand side of the "
	+chodesh+".</li>";html+="<li>The Average Onah of Separation (Onah Beinonit in Hebrew) falls on day 30 of your cycle with day 1 the " 
	+" day you became nidah. This time of separation consists of two onot (both night and day). To help remember this date, a filled in diamond will appear for the "
	+benonis+". Separation will be from sunset on the "+day_before_benonis+" and ending at nightfall after the "+benonis+". </li></ol>";}
	else if(letter=='B')
	html+="<li>After giving birth, all previous onahs of separation are discarded and no new onot of anticipation will result from the birth. " 
	+" Upon commencement of your regular menstrual cycle, you will begin to keep The Average Onah of Separation (Onah Beinonit) and the Monthly "
	+ " Cycle (Veset Hachodesh). You will only start keeping The Interval Cycle (Haflagah) after the second menstrual flow.</li>";
	else {if(this._cause>0&&this._cause<4)
	html+="<li>Since you are nidah by a rabbinical enactment and the rabbis did not require one to keep onot on account of their own prohibitions,"
	+" none of your onot of anticipation will change.</li>";
	else 
	html+="<li>None of your onot of anticipation will change so the rest of your calendar will remain the same</li>";}}
	else if(this._hefsek_confirmed&&exp_type=='HT')
	{if(this._explain_data['haflagahs']&&this._explain_data['haflagahs']!='reset'&&goesOnCal)
	{var lastHT=this._explain_data['lastHT'].clone();
	html+="<ol><li>Start counting by two for each day after your last Hefsek Taharah (the "+lastHT+").";
	this._explain_data['lastHT'].next();
	html+="The "+this._explain_data['lastHT'].toString().substring(0,
	this._explain_data['lastHT'].toString().length-6)+" will be 2, ";
	this._explain_data['lastHT'].next();html+="the "+this._explain_data['lastHT'].toString().substring(0,
	this._explain_data['lastHT'].toString().length-6)+" will be 4 etc. ";
	var temp;if(this._onah==_NIGHT_)
	temp=' one instead of two since the flow started during the night onah.';
	else
	temp=' two for that day since your flow started in the day onah.';
	html+="When you reach your most recent flow (" +this._reeyah+") add"+temp;html+=" This should give you a count of "
	+this._explain_data['count']+".</li>";
	html+="<li>The haflagah numbers list from the last flow was "
	+this._explain_data['old_list']+"";
	html+="Only carry over numbers greater than "+this._explain_data['count']+" so that the haflagah numbers list for this flow is ";
	html+=this._explain_data['new_list']+".</li>";
	html+="<li>All Haflagah onot of separation based on a count of a previous Hefsek Taharah are deleted. Starting from the day after " 
	+"your most recent Hefsek Taharah ("+this._hefsek+") begin counting by twos each day (one for the night onah and one for the day onah)." 
	+" Every time you reach a number in the haflagah numbers list a square will be filled in on the appropriate onah.</li>";}
	else if(!goesOnCal)
	html+="<li>No onahs of anticipation are recalculated and your calendar will remain the same.</li>";else if(this._explain_data['haflagahs']!='reset')
	{if(this._haflagas==undefined||this._haflagas.length==0)
	html+="<li>Since this is the first time you have performed a Hefsek Taharah, you do not need to calculate a Haflagah number </li>";
	else {var list='';for(i in this._haflagas)
	list+=this._haflagas[i][0]+", ";list=list.substring(0,list.length-2);
	html+="<li>You specified that you are carrying over haflagah numbers list {"+list+"} from earlier flows." 
	+" Starting from the day after your most recent Hefsek Taharah ("+this._hefsek+") begin counting by twos each day "
	+" (one for the night onah and one for the day onah). Every time you reach a number in the haflagah numbers list a square will be filled "
	+" in on the appropriate onah.</li>";}}
	else
	html+="<li>Since this is your first flow after pregnancy, you do not need to calculate a Haflagah number </li>";
	if(Settings.getInstance()._carry_chodesh)
	{if(this._explain_data['dates_to_carry']==null||this._explain_data['dates_to_carry']=='')
	{html+="<li> There are no Vestot Hachodesh between the flow on "+this._reeyah+" and the Hefsek Taharah on ";
	html+=this._hefsek+". Therefore you do not have to carry over any Vestos Hachodesh from previous flows.</li>";}
	else if(this._explain_data['dates_to_carry'].indexOf('and')==-1){
		html+="<li>The Veses Hachodesh on "+this._explain_data['dates_to_carry']+" occured during your flow.";
		html+=" Since you were unable to determine that a flow did not start on that day,";
		html+="you must carry it over to the next month.</li>";}
	else{
		html+="<li>The Vestos Hachodesh on "+this._explain_data['dates_to_carry']+" occured during your flow.";
		html+=" Since you were unable to determine that a flow did not start on these days,";
		html+="you must carry them over to the next month.</li>";}}
	var white1=this._hefsek.clone();white1.next();html+="<li>The "+white1+" is day one of your seven preparatory days.";
	html+="The earliest possible mikvah night is the "+this._mikvah+"</li></ol>";}
	else
	return"FAIL";html+="</div>";html+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),469);return html;}
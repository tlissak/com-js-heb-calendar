function HDate(d,m,y){this._d=Number(d);this._m=Number(m);this._y=Number(y);}
HDate.prototype._d;HDate.prototype._m;HDate.prototype._y;function HDate_from_english(eng_d,eng_m,eng_y,hour,minutes,location)
{hebrewFromAbsolute(absoluteFromGregorian(eng_d,eng_m+1,eng_y));var hebrew_date=new HDate(returnDateDay,returnDateMonth,returnDateYear);var hebrew_day=new Day(hebrew_date);var time=(hour*60)+minutes;var end_shkiah;if(location!=undefined)
{end_shkiah=get_zman(hebrew_day,3,-1,location);}
else
end_shkiah=hebrew_day.end_shkiah();if(time>=end_shkiah)
hebrew_date.next();return hebrew_date;}
HDate.prototype.clone=function(){var clone=new HDate(this._d,this._m,this._y);return clone;}
HDate.prototype.equals=function(hdate){return this._d==hdate._d&&this._m==hdate._m&&this._y==hdate._y;}
HDate.prototype.is_later_then=function(other){if(this._y>other._y)
return true;if(this._y==other._y)
{if(this._m==other._m)
{if(this._d>other._d)
return true;}
var thism=this._m;var otherm=other._m;if(thism<7)
thism=thism+13;if(otherm<7)
otherm=otherm+13;if(thism>otherm)
return true;}
return false;}
HDate.prototype.next=function(){if(this._d<lastDayOfHebrewMonth(this._m,this._y))
this._d=this._d+1;else
{this._d=1;if(this._m<lastMonthOfHebrewYear(this._y))
{this._m=this._m+1;if(this._m==7)
this._y=this._y+1;}
else
this._m=1;}}
HDate.prototype.prev=function(){if(this._d>1)
this._d=this._d-1;else
{if(this._m>1)
{this._m=this._m-1;if(this._m==6)
this._y=this._y-1;}
else
this._m=lastMonthOfHebrewYear(this._y);this._d=lastDayOfHebrewMonth(this._m,this._y);}}
HDate.prototype.next_mo=function(){if(this._m<lastMonthOfHebrewYear(this._y))
{this._m=this._m+1;if(this._m==7)
this._y=this._y+1;}
else
this._m=1;if(this._d>lastDayOfHebrewMonth(this._m,this._y))
this._d=lastDayOfHebrewMonth(this._m,this._y);}
HDate.prototype.prev_mo=function(){if(this._m>1)
{this._m=this._m-1;if(this._m==6)
this._y=this._y-1;}
else
this._m=lastMonthOfHebrewYear(this._y);if(this._d>lastDayOfHebrewMonth(this._m,this._y))
this._d=lastDayOfHebrewMonth(this._m,this._y);}
HDate.prototype.add_days=function(days){for(var x=1;x<=days;x++)
this.next();}
HDate.prototype.subtract_days=function(days){for(var x=1;x<=days;x++)
this.prev();}
HDate.prototype.to_eng=function(){gregorianFromAbsolute(absoluteFromHebrew(this._d,this._m,this._y));return getGregorianMonthName(returnDateMonth)+" "+returnDateDay+", "+returnDateYear;}
HDate.prototype.to_eng_short=function(){gregorianFromAbsolute(absoluteFromHebrew(this._d,this._m,this._y));return getGregorianMonthName(returnDateMonth).substring(0,3).toUpperCase()+". "+returnDateDay;}
HDate.prototype.to_eng_array=function(){gregorianFromAbsolute(absoluteFromHebrew(this._d,this._m,this._y));return new Array(returnDateDay,returnDateMonth,returnDateYear);}
HDate.prototype.to_eng_night=function(){var yesterday=this.clone();yesterday.prev();gregorianFromAbsolute(absoluteFromHebrew(yesterday._d,yesterday._m,yesterday._y));return getGregorianMonthName(returnDateMonth)+" "+returnDateDay+", "+returnDateYear;}
HDate.prototype.to_eng_night_array=function(){var yesterday=this.clone();yesterday.prev();gregorianFromAbsolute(absoluteFromHebrew(yesterday._d,yesterday._m,yesterday._y));return new Array(returnDateDay,returnDateMonth,returnDateYear);}
HDate.prototype.mo_name=function(){return getJewishMonthName(this._m,this._y);}
HDate.prototype.get_dow=function(){return(absoluteFromHebrew(this._d,this._m,this._y)%7)+1;}
HDate.prototype.toString=function(){var day=this._d;if(day==1||day==21)
day=String(day)+"st";else if(day==2||day==22)
day=String(day)+"nd";else if(day==3||day==23)
day=String(day)+"rd";else
day=this._d+"th";return day+" of "+getJewishMonthName(this._m,this._y)+", "+this._y;}
HDate.prototype.isShabbosOrYontef=function(){if(this.get_dow()==7)
return true;if(this.equals(getJewishHolidayDate(0,this._y))||this.equals(getJewishHolidayDate(1,this._y))||this.equals(getJewishHolidayDate(2,this._y))||this.equals(getJewishHolidayDate(9,this._y))||this.equals(getJewishHolidayDate(11,this._y))||this.equals(getJewishHolidayDate(17,this._y))||this.equals(getJewishHolidayDate(26,this._y))||this.equals(getJewishHolidayDate(42,this._y)))
return true;if(isDiaspora()&&(this.equals(getJewishHolidayDate(3,this._y))||this.equals(getJewishHolidayDate(10,this._y))||this.equals(getJewishHolidayDate(12,this._y))||this.equals(getJewishHolidayDate(39,this._y))||this.equals(getJewishHolidayDate(40,this._y))))
return true;return false;};Veses.prototype._id;Veses.prototype._reeyah;Veses.prototype._time;Veses.prototype._onah;Veses.prototype._cause;Veses.prototype._hefsek;Veses.prototype._hefsek_confirmed;Veses.prototype._mikvah;Veses.prototype._mikvah_confirmed;Veses.prototype._haflagas;Veses.prototype._explain_data;Veses.prototype._goesOnCal;Veses.prototype._leadup_cause;Veses.prototype._leadup_date;Veses.prototype._leadup_onah;function Veses(reeyah_date,hours,minutes,isAM,onah,cause){this._reeyah=reeyah_date;this._time=time2min(hours,minutes,isAM);if(onah==undefined)
{var reeyah_day=new Day(reeyah_date);this._onah=reeyah_day.get_onah(this._time);}
else
this._onah=onah;this._cause=cause;var hefsek=this.getEarliestHtDate();this._hefsek=hefsek;this._hefsek_confirmed=false;var mikvah=hefsek.clone();mikvah.add_days(8);this._mikvah=mikvah;this._mikvah_confirmed=false;}
Veses.prototype.info=function(){return"Vesos starting on "+this._reeyah+", ht on "+this._hefsek+", mikvah night iy\"h on "+this._mikvah;}
Veses.prototype.goesOnCalendar=function(){if(this._goesOnCal!==undefined)
return this._goesOnCal;if(this._cause==1||this._cause==2||this._cause==4||this._cause==5)
{this._goesOnCal=false;return false;}
if(this._cause==3)
{last_v=this.get_prev_veses(top.frames[1].cal);if(this.StartedInWhiteWeek(top.frames[1].cal)&&(last_v==null||last_v.goesOnCalendar()))
{this._goesOnCal=false;return false;}
else
{this._goesOnCal=true;return true;}}
last_v=this.get_prev_veses(top.frames[1].cal);if(last_v==null)
{this._goesOnCal=true;return true;}
while(!last_v.goesOnCalendar())
{last_v=last_v.get_prev_veses(top.frames[1].cal);if(last_v==null)
return true;}
if(last_v==null)
return true;if(this._cause==0)
{var last_r=last_v._reeyah.clone();last_r.add_days(6);var last_ht=last_v._hefsek.clone();last_ht.next();if(this._reeyah.is_later_then(last_r))
{this._goesOnCal=true;return true;}
if(this._reeyah.is_later_then(last_ht))
{this._goesOnCal=true;return true;}
this._goesOnCal=false;return false;}
if(this._cause==6)
gap=40;else if(this._cause==7)
gap=90;var last_r=last_v._reeyah.clone();last_r.add_days(gap);if(this._reeyah.is_later_then(last_r)){this._goesOnCal=false;return false;}
else
{this._goesOnCal=true;return true;}
this._goesOnCal=false;return false;}
Veses.prototype.cause_str=function(leadup){if(leadup===undefined)
cause=this._cause;else if(leadup)
cause=this._leadup_cause;if(cause==0||cause==7)
return"Your flow started ";if(cause==1)
return"A stain was discovered ";if(cause==2)
return"A womans medical prodedure was done ";if(cause==3)
return"An unclean bedikah was made ";if(cause==4)
return"You gave birth to a son ";if(cause==5)
return"You gave birth to a daughter ";if(cause==6)
return"A pregnancy was lost ";return"You became nidah ";}
Veses.prototype.explain=function(exp_type){var html="<div style='width:368px'><div class='title' style='margin-top:0px'>How to keep your own calendar</div><div align='left' style='margin-left:22px;'>";var goesOnCal=this.goesOnCalendar();if(!this._hefsek_confirmed&&exp_type=='R')
{var letter='P';if(!goesOnCal)
letter='S';if(this._cause==4||this._cause==5)
letter='B';var reeyah_day=new Day(this._reeyah);var side=new Array('left','NIGHT');if(this._onah==_DAY_)
side=new Array('right','DAY');var miniDate=this._reeyah.toString();miniDate=miniDate.split(",");var d=this._reeyah.clone();var temp;var miniHT_Dates=new Array(6);for(i=1;i<6;i++)
{temp=d.toString();temp=temp.split(",");miniHT_Dates[i]=temp[0];d.next();}
d2=d.clone();d2.prev();var chodesh=this._reeyah.clone();chodesh.next_mo();var benonis=chodesh.clone();if(lastDayOfHebrewMonth(this._reeyah._m,this._reeyah._y)==30)
benonis.prev();var day_before_benonis=benonis.clone();day_before_benonis.prev();html+="<ol><li>"+this.cause_str()+"on the "+this._reeyah+" at "+time(this._time)+" which falls out on the "+_ONAH_NAMES_[this._onah]+". A \""+
letter+"\" will appear on the "+side[0]+" hand side of the box for the "+miniDate[0]+".</li>";bedikot_after_birth=" You should then keep the seven preparatory days before going to the mikvah. If performing bedikot pose a difficulty for you or you have difficulty attaining a clean bedikah, please consult an Orthodox rabbi on how to proceed.";if(this.StartedInWhiteWeek(top.frames[1].cal))
html+="<li>"+this.cause_str()+"during your preparatory days and therefore you may confirm bleeding has ceased (Hebrew for this confirmation is Hefsek Taharah) without having to wait 5 days.";else if(this._cause==4)
html+="<li>After giving birth to a son, you may perform a Hefsek Taharah as soon as you are ready (providing your doctor has proclaimed you sufficiently healed)."+bedikot_after_birth;else if(this._cause==5)
html+="<li>After giving birth to a daughter, you may perform a Hefsek Taharah as early as seven days after the birth (providing your doctor has proclaimed you sufficiently healed)."+bedikot_after_birth;else if(this._cause==6&&!this.goesOnCalendar())
html+="<li>After a miscariage, you may perform a Hefsek Taharah in as early as seven days (providing your doctor has proclaimed you sufficiently healed)."+bedikot_after_birth;else
html+="<li>Regardless of how long the bleeding lasts,you may not confirm bleeding has ceased (Hebrew for this confirmation is Hefsek Taharah) for a minimum of 5 days. The "+miniDate[0]+" is day 1, the "+miniHT_Dates[2]+" day 2, the "+miniHT_Dates[3]+" day 3, the "+miniHT_Dates[4]+" day 4 and the earliest day you may attempt a Hefsek Taharah will be the "+miniHT_Dates[5]+" ("+d2.to_eng()+"), day 5. The \"HT\" that appears is to remind you that you may attempt a Hefsek Taharah starting on that day. The \"HT\" is movable and you may move it to the correct day once a successful Hefsek Taharah has been accomplished.</li>";if(goesOnCal)
{if(this._reeyah._d==30&&lastDayOfHebrewMonth(chodesh._m,chodesh._y)==29)
html+="<li>Since you became nidah on the "+this._reeyah+", and there are only 29 days in the following month, there is no Veset Hachodesh for this period.</li>";else
html+="<li>Since you became nidah on the "+this._reeyah+", an onah of anticipation called Veset Hachodesh (Hebrew Date Cycle), will be recorded for the same date of the next month. To help remember this date, a filled in circle will appear on the "+side[0]+" hand side of the "+chodesh+".</li>";html+="<li>The Average Onah of Separation (Onah Beinonit in Hebrew) falls on day 30 of your cycle with day 1 the day you became nidah. This time of separation consists of two onot (both night and day). To help remember this date, a filled in diamond will appear for the "+benonis+". Separation will be from sunset on the "+day_before_benonis+" and ending at nightfall after the "+benonis+". </li></ol>";}
else if(letter=='B')
html+="<li>After giving birth, all previous onahs of separation are discarded and no new onot of anticipation will result from the birth. Upon commencement of your regular menstrual cycle, you will begin to keep The Average Onah of Separation (Onah Beinonit) and the Monthly Cycle (Veset Hachodesh). You will only start keeping The Interval Cycle (Haflagah) after the second menstrual flow.</li>";else
{if(this._cause>0&&this._cause<4)
html+="<li>Since you are nidah by a rabbinical enactment and the rabbis did not require one to keep onot on account of their own prohibitions, none of your onot of anticipation will change.</li>";else
html+="<li>None of your onot of anticipation will change so the rest of your calendar will remain the same</li>";}}
else if(this._hefsek_confirmed&&exp_type=='HT')
{if(this._explain_data['haflagahs']&&this._explain_data['haflagahs']!='reset'&&goesOnCal)
{var lastHT=this._explain_data['lastHT'].clone();html+="<ol><li>Start counting by two for each day after your last Hefsek Taharah (the "+lastHT+").";this._explain_data['lastHT'].next();html+="The "+this._explain_data['lastHT'].toString().substring(0,this._explain_data['lastHT'].toString().length-6)+" will be 2, ";this._explain_data['lastHT'].next();html+="the "+this._explain_data['lastHT'].toString().substring(0,this._explain_data['lastHT'].toString().length-6)+" will be 4 etc. ";var temp;if(this._onah==_NIGHT_)
temp=' one instead of two since the flow started during the night onah.';else
temp=' two for that day since your flow started in the day onah.';html+="When you reach your most recent flow ("+this._reeyah+") add"+temp;html+=" This should give you a count of "+this._explain_data['count']+".</li>";html+="<li>The haflagah numbers list from the last flow was "+this._explain_data['old_list']+"";html+="Only carry over numbers greater than "+this._explain_data['count']+" so that the haflagah numbers list for this flow is ";html+=this._explain_data['new_list']+".</li>";html+="<li>All Haflagah onot of separation based on a count of a previous Hefsek Taharah are deleted. Starting from the day after your most recent Hefsek Taharah ("+this._hefsek+") begin counting by twos each day (one for the night onah and one for the day onah). Every time you reach a number in the haflagah numbers list a square will be filled in on the appropriate onah.</li>";}
else if(!goesOnCal)
html+="<li>No onahs of anticipation are recalculated and your calendar will remain the same.</li>";else if(this._explain_data['haflagahs']!='reset')
{if(this._haflagas==undefined||this._haflagas.length==0)
html+="<li>Since this is the first time you have performed a Hefsek Taharah, you do not need to calculate a Haflagah number </li>";else
{var list='';for(i in this._haflagas)
list+=this._haflagas[i][0]+", ";list=list.substring(0,list.length-2);html+="<li>You specified that you are carrying over haflagah numbers list {"+list+"} from earlier flows. Starting from the day after your most recent Hefsek Taharah ("+this._hefsek+") begin counting by twos each day (one for the night onah and one for the day onah). Every time you reach a number in the haflagah numbers list a square will be filled in on the appropriate onah.</li>";}}
else
html+="<li>Since this is your first flow after pregnancy, you do not need to calculate a Haflagah number </li>";if(Settings.getInstance()._carry_chodesh)
{if(this._explain_data['dates_to_carry']==null||this._explain_data['dates_to_carry']=='')
{html+="<li> There are no Vestot Hachodesh between the flow on "+this._reeyah+" and the Hefsek Taharah on ";html+=this._hefsek+". Therefore you do not have to carry over any Vestos Hachodesh from previous flows.</li>";}
else if(this._explain_data['dates_to_carry'].indexOf('and')==-1)
{html+="<li>The Veses Hachodesh on "+this._explain_data['dates_to_carry']+" occured during your flow.";html+=" Since you were unable to determine that a flow did not start on that day,";html+="you must carry it over to the next month.</li>";}
else
{html+="<li>The Vestos Hachodesh on "+this._explain_data['dates_to_carry']+" occured during your flow.";html+=" Since you were unable to determine that a flow did not start on these days,";html+="you must carry them over to the next month.</li>";}}
var white1=this._hefsek.clone();white1.next();html+="<li>The "+white1+" is day one of your seven preparatory days.";html+="The earliest possible mikvah night is the "+this._mikvah+"</li></ol>";}
else
return"FAIL";html+="</div>";html+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),469);return html;}
Veses.prototype.get_prev_veses=function(cal){var last_veses=null;for(i in cal._veses)
if(cal._veses[i]!=this&&!cal._veses[i]._reeyah.is_later_then(this._reeyah))
if(last_veses==null||cal._veses[i]._reeyah.is_later_then(last_veses._reeyah))
last_veses=cal._veses[i];return last_veses;}
Veses.prototype.StartedInWhiteWeek=function(cal){var last_veses=this.get_prev_veses(cal);if(last_veses==null)
return false;if(last_veses._mikvah.is_later_then(this._reeyah))
return true;return false;}
Veses.prototype.check_for_bad_mikvah=function(){var day;var badMikvah_reason='';var white_date=this._mikvah.clone();for(x=0;x<7;x++)
{white_date.prev();day=new Day(white_date);if(day._locations.length>1)
badMikvah_reason=international_dateline_checker(day);}
var mikvah_day=new Day(this._mikvah);var chag=mikvah_day.chag();if(chag=="Yom Kippur")
badMikvah_reason='since relations are prohibited on Yom Kippur,';if(chag=="Tisha B'Av")
badMikvah_reason='since relations are prohibited on Tisha B\'Av,';for(i in cal._events)
{var e=cal._events[i];if(e._date.equals(mikvah_day._date))
{if(e._type==_BENONIS_)
badMikvah_reason+='since you have an onah beinonit that night, ';else if(e._type==_CHODESH_&&e.chodesh_onah()==_NIGHT_)
badMikvah_reason+='since you have a veset hachodesh that night, ';else if(e._type==_HAFLAGAH_&&e._onah==_NIGHT_)
badMikvah_reason+='since you have a veset haflagah that night, ';}}
if(badMikvah_reason!='')
return"Your mikvah night may have to be postponed until the following night "+badMikvah_reason+" please ask a rabbi how to proceed.";else
return'';}
function explain_ht()
{setTimeout("new_popup_win_explainer('HT')",700);}
Veses.prototype.set_haflagas=function(cal,last_veses){for(i in this._haflagas)
{var date=this._hefsek.clone();var count=this._haflagas[i][0];if(this._haflagas[i][2]!=null)
var veses=this._haflagas[i][2];else
veses=this;date.add_days(Math.floor(count/2));if(count%2==0)
{var event=new Event(date,_HAFLAGAH_,veses);event._misc=count;event._onah=_DAY_;cal._events.push(event);}
else
{date.next();var event=new Event(date,_HAFLAGAH_,veses);event._misc=count;event._onah=_NIGHT_;cal._events.push(event);}}}
Veses.prototype.getEarliestHtNumber=function(){var v=this;if(v.StartedInWhiteWeek(top.frames[1].cal)||v._cause==4)
min_ht=0;else if(v._leadup_date!==undefined)
{days_already_red=1;kessem=v._leadup_date.clone();while(v._reeyah.is_later_then(kessem))
{days_already_red++;kessem.next();}
min_ht=5-days_already_red;if(min_ht<0)
mint_ht=0;}
else if(v._cause==5)
min_ht=6;else if(v._cause==6&&!v.goesOnCalendar())
min_ht=6;else
min_ht=4;return min_ht;}
Veses.prototype.getEarliestHtDate=function(){var v=this;var earliest_ht_date=v._reeyah.clone();min_ht=this.getEarliestHtNumber();earliest_ht_date.add_days(min_ht);return earliest_ht_date;}
Veses.prototype.confirm_hefsek=function(cal,isNew){if(isNew)
{var d=new Date();var now=HDate_from_english(d.getDate(),d.getMonth(),d.getFullYear(),d.getHours(),d.getMinutes());if(this._hefsek.is_later_then(now))
{popup("Please ensure the Hefsek Taharah is not a future date");return false;}}
this._hefsek_confirmed=true;var mikvah=this._hefsek.clone();mikvah.add_days(8);this._mikvah=mikvah;if(this._cause==5||(this._cause==6&&!this.goesOnCalendar()))
{var earliest_mikvah=this._reeyah.clone();earliest_mikvah.add_days(14);if(earliest_mikvah.is_later_then(this._mikvah))
this._mikvah=earliest_mikvah;}
if(isNew)
{$.post("ajax.php",{confirmHefsek:this._hefsek._d+"-"+this._hefsek._m+"-"+this._hefsek._y,veses_id:this._id});if(top.frames[1].vestos_db===undefined)
{alert('no vestos_db');top.frames[1].vestos_db=new Array();}
if(top.frames[1].vestos_db.length>0)
top.frames[1].vestos_db[top.frames[1].vestos_db.length-1][4]=this._hefsek;if(Settings.remindWhite())
{var date=this._hefsek.clone();for(white_count=1;white_count<8;white_count++)
{date.next();set_reminder(1,this,new Day(date),_DAY_,white_count);}}
var bad_mikvah=this.check_for_bad_mikvah();if(bad_mikvah!='')
{return_str="<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>Problematic Mikvah Night</div><Br><table  width='83%' ><tr><td align='left' style='font-size:12px'>"+bad_mikvah+"</td></tr></table>";var tmp='';if(top.frames[1].Settings.getInstance()._explain)
tmp="top.frames[1].explain_ht();";return_str+=buttons(new Array('OK'),new Array("this.blur();"+tmp+"top.frames[1].Hide_Windows();"),225)+"</div>";bad_mikvah=return_str;}
if(bad_mikvah!='')
set_reminder(2,this,new Day(this._mikvah),_NIGHT_,this.check_for_bad_mikvah(),null,Settings.remindMikvah());else
set_reminder(2,this,new Day(this._mikvah),_NIGHT_,this._hefsek.toString()+" ("+this._hefsek.to_eng()+")",null,Settings.remindMikvah());}
var last_veses=this.get_prev_veses(cal);while(last_veses!=null&&!last_veses.goesOnCalendar())
last_veses=last_veses.get_prev_veses(cal);this.set_haflagas(cal,last_veses);var chashashot=new Array();if(Settings.getInstance()._carry_chodesh)
{var date=this._reeyah.clone();if(!date.is_later_then(this._hefsek))
while(!date.is_later_then(this._hefsek))
{for(i in cal._events)
{if(cal._events[i]._date.equals(date)&&cal._events[i]._type==_CHODESH_)
if(!this._reeyah.equals(date)||(this._reeyah.equals(date)&&(cal._events[i]._onah==_DAY_||this._onah==_NIGHT_)))
chashashot.push(cal._events[i]);}
date.next();}
for(i in chashashot)
{var next_month=chashashot[i]._date.clone();next_month.next_mo();if(chashashot[i]._date._d==30&&lastDayOfHebrewMonth(next_month._m,next_month._y)==29)
continue;if(chashashot[i]._veses!=null)
var event=new Event(next_month,_CHODESH_,this);else
{var event=new Event(next_month,_CHODESH_,null);event._onah=chashashot[i]._onah;}
if(chashashot[i]._misc==null&&chashashot[i]._veses!=null)
event._misc=chashashot[i]._veses;else
event._misc=chashashot[i]._misc;cal._events.push(event);}}
if(isNew)
{if(Settings.remindOnah())
{for(i in cal._events)
{if(((cal._events[i]._veses==this||cal._events[i]._type==_HAFLAGAH_)&&(cal._events[i]._date.is_later_then(this._mikvah)||cal._events[i]._date.equals(this._mikvah)))||(cal._veses.length==1&&(cal._events[i]._date.is_later_then(this._mikvah)||cal._events[i]._date.equals(this._mikvah)||this._reeyah.is_later_then(cal._events[i]._date)||this._reeyah.equals(cal._events[i]._date)))||(cal._events[i]._veses==null&&cal._events[i]._type==_CHODESH_&&(cal._events[i]._date.is_later_then(this._mikvah)||cal._events[i]._date.equals(this._mikvah))))
{var type=_EVENT_NAMES_[cal._events[i]._type];var onah=0;if(cal._events[i]._type==_BENONIS_)
onah=_NIGHT_AND_DAY_;else if(cal._events[i]._type==_CHODESH_)
onah=cal._events[i].chodesh_onah();else if(cal._events[i]._type==_HAFLAGAH_)
onah=cal._events[i]._onah;var temp_i=i;var r_time=cal._events[i].reeyah_time();i=temp_i;set_reminder(3,this,new Day(cal._events[i]._date),onah,type,r_time);}}}
if(Settings.getInstance()._explain)
{this._explain_data=new Array();last_nidah=this.get_prev_veses(cal);if(last_veses==undefined||last_veses._cause==4||last_veses._cause==5||(last_veses._cause==6&&!last_veses.goesOnCalendar())||!this.goesOnCalendar())
this._explain_data['haflagahs']=false;else if(last_nidah==undefined||last_nidah==null||last_nidah._cause==4||last_nidah._cause==5||(last_nidah._cause==6&&!last_nidah.goesOnCalendar())||!this.goesOnCalendar())
this._explain_data['haflagahs']='reset';else
{this._explain_data['haflagahs']=true;this._explain_data['lastHT']=last_veses._hefsek.clone();var min_i=null;for(i in this._haflagas)
if(min_i==null||this._haflagas[i][0]<this._haflagas[min_i][0])
min_i=i;this._explain_data['count']=this._haflagas[min_i][0];this._explain_data['old_list']="{";for(i in last_veses._haflagas)
this._explain_data['old_list']+=last_veses._haflagas[i][0]+", ";this._explain_data['old_list']=this._explain_data['old_list'].substring(0,this._explain_data['old_list'].length-2);this._explain_data['old_list']+="} ";if(last_veses._haflagas.length==0)
this._explain_data['old_list']='empty. ';this._explain_data['new_list']="{";for(i in this._haflagas)
this._explain_data['new_list']+=this._haflagas[i][0]+", ";this._explain_data['new_list']=this._explain_data['new_list'].substring(0,this._explain_data['new_list'].length-2);this._explain_data['new_list']+="} ";}
if(Settings.getInstance()._carry_chodesh&&chashashot.length>0)
{this._explain_data['dates_to_carry']='the '+chashashot[0]._date;for(i=1;i<chashashot.length;i++)
this._explain_data['dates_to_carry']+=' and the '+chashashot[i]._date;}
if(bad_mikvah=='')
setTimeout("new_popup_win_explainer('HT')",700);else
setTimeout("new_popup_win(\""+bad_mikvah.replace(/"/g,"\\\"")+"\",'265','400')",700);}
else if(bad_mikvah!='')
setTimeout("new_popup_win(\""+bad_mikvah.replace(/"/g,"\\\"")+"\",'265','400')",700);}}
Veses.prototype.set_haflagah_list=function(haflagah){if(haflagah!=undefined&&haflagah!=''&&haflagah!=null)
{this._haflagas=new Array();var h=haflagah.split(",");for(i in h)
this._haflagas.push(new Array(h[i].replace(" ",""),1,this._reeyah.clone()));}}
function add_chodesh_dates(cal,chodesh,reeyah)
{if(chodesh.length<3)
return;chodesh_array=chodesh.split(',');for(i in chodesh_array)
{var temp=chodesh_array[i].split('(');temp[0]=temp[0].replace(' ','');var day_of_mo=Number(temp[0]);temp[1]=temp[1].replace(' ','');temp[1]=temp[1].replace(')','');var date=reeyah.clone();if(day_of_mo<date._d||(day_of_mo==date._d&&temp[1]=='night'))
date.next_mo();date._d=day_of_mo;e=new Event(date,_CHODESH_,null);e._onah=_NIGHT_;if(temp[1]=='day')
e._onah=_DAY_;if(date._d<=lastDayOfHebrewMonth(date._m,date._y))
cal._events.push(e);}}
function load_veses(id,start_date,start_time,onah,hefsek_date,cause,cal,haflagah,chodesh,leadup_cause,leadup_date,leadup_onah)
{if(chodesh!=undefined&&chodesh!=null&&chodesh!='')
add_chodesh_dates(cal,chodesh,start_date);time_array=time(start_time,false);ampm='pm';if(time_array[2])
ampm='am';new_veses(null,null,null,start_date._d,start_date._m,start_date._y,String(time_array[0]),String(time_array[1]),ampm,cause,cal,true,false,null,onah);v=cal._veses[cal._veses.length-1];v._id=id;if(leadup_date!==undefined&&leadup_date!=null&&leadup_date!='null'&&leadup_date!='0')
{v._leadup_cause=leadup_cause;v._leadup_onah=leadup_onah;v._leadup_date=leadup_date;if(!v._hefsek_confirmed)
{days_already_red=1;kessem=leadup_date.clone();while(v._reeyah.is_later_then(kessem))
{days_already_red++;kessem.next();}
v._hefsek=v._reeyah.clone();days_till_min_ht=5-days_already_red;if(days_till_min_ht>0)
v._hefsek.add_days(days_till_min_ht);}}
v.set_haflagah_list(haflagah);if(hefsek_date!=''&&hefsek_date!='null')
{v._hefsek=hefsek_date;v.confirm_hefsek(cal,false);}}
function new_veses(ed,em,ey,hd,hm,hy,hr,min,ampm,cause,cal,isNew,live_input,location,onah)
{if(hr==''||min==''||ampm=='undefined')
{popup('Please Select the time of the start of the flow. If you do not know the time, please ask a rabbi what to do');return false;}
var date;var date_from_eng=false;if(hd!=''&&hm!=''&&hy!=''&&(hy%1==0))
{if(lastDayOfHebrewMonth(hm,hy)<hd)
{popup('This month has only has 29 days, please either enter a valid jewish or secular date');return false;}
else if(hm==13&&!hebrewLeapYear(hy))
{popup(hy+' does not have a second month of Adar, please either enter a valid jewish or secular date');return false;}
else
date=new HDate(hd,hm,hy);}
else if(ed!=''&&em!=''&&ey!=''&&(ey%1==0))
{date_from_eng=true;var hours_24=Number(hr);if(ampm=='pm')
hours_24=hr+12;if(hr==12)
hours_24=hours_24-12;date=HDate_from_english(Number(ed),Number(em-1),Number(ey),hours_24,Math.round(min),location);}
else
{popup('Please either enter a valid jewish or secular date');return false;}
if(isNew&&live_input)
{var d=new Date();var now=HDate_from_english(d.getDate(),d.getMonth(),d.getFullYear(),d.getHours(),d.getMinutes());if(date.is_later_then(now))
{popup('You may not enter future dates, please either enter a valid jewish or secular date');return false;}}
var isAM=true;if(ampm=='pm')
isAM=false;var veses;if(location!=undefined&&location!=null)
{var t=time2min(hr,min,isAM);var end_shkiah=get_zman(new Day(date),3,-1,location);var netz=get_zman(new Day(date),2,-1,location);var onah;onah=_NIGHT_;if(t>netz&&t<end_shkiah)
onah=_DAY_;}
veses=new Veses(date,hr,min,isAM,onah,cause);for(i in cal._veses)
if(cal._veses[i]._reeyah.is_later_then(veses._reeyah))
{popup('A new flow for '+veses._reeyah+' can not be added since there is a later flow recorded on the '+cal._veses[i]._reeyah);return false;}
var last_veses=veses.get_prev_veses(cal);if(last_veses!=undefined&&last_veses.goesOnCalendar())
{if(last_veses._hefsek_confirmed==false)
{popup("<p>You are attempting to add a New Flow without confirming that a Hefsek Taharah has been done for a flow start on the "+last_veses._reeyah+". Please close this box and confirm the date of your Hefesk Taharah before adding a new flow.</p><br><p>If this is not an error and you are doing this on the advice and permission of your Orthodox rabbi, please email us or call our toll free number (1-866-908-2468) for detailed instructions on how to enter this information into the calendar and allow the program to function accordingly.</p>");return false;}
else if(!veses._reeyah.is_later_then(last_veses._hefsek))
{popup('A new flow ('+veses._reeyah+') can not be recorded for a day inbetween another flow ('+last_veses._reeyah+') and Hefsek Taharah('+last_veses._hefsek+').');return false;}
iterator=last_veses._reeyah.clone();count=1;while(count<5000&&!iterator.equals(veses._reeyah))
{count++;iterator.next();}
if(cause==3&&last_veses.goesOnCalendar()&&count>7&&!veses._reeyah.is_later_then(last_veses._mikvah)){popup("<h1 align='center'>Please read the following carefully</h1><br><p>You have entered an Unclean Bedikah during your Seven Preparatory days (after completing your Hefsek Taharah) on a date that is <b>after</b> seven days from the onset of your period . There is a difference of halachic opionion on how the calendar should be kept.</p><Br><p>Some Rabbanim maintain the opinion that an unclean bedikah occuring at this time is considered a New Flow. New calculations must then be made on the calendar. If you follow this opinion, please select \"Start of menstrual cycle\" from the drop down list of causes and the program will calculate accordingly.</p><br><p>Other Rabbanim maintain the opinion that only an actual New Flow during this time requires new calculations.  If you follow this opinion, please choose \"Stain found on white garment or body\" from the drop down list of causes and the program will calculate accordingly.</p><br><p align='center'>Please consult your rabbi to determine which opinion he wishes you to follow.</p>","Important Note");return false;}}
else if(last_veses!=undefined&&!last_veses.goesOnCalendar()&&!last_veses._hefsek_confirmed)
{veses._leadup_cause=last_veses._cause;veses._leadup_onah=last_veses._onah;veses._leadup_date=last_veses._reeyah;days_already_red=1;kessem=last_veses._reeyah.clone();while(veses._reeyah.is_later_then(kessem))
{days_already_red++;kessem.next();}
veses._hefsek=veses._reeyah.clone();days_till_min_ht=5-days_already_red;if(days_till_min_ht>0)
veses._hefsek.add_days(days_till_min_ht);$.post("ajax.php",{delVeses:last_veses._id});top.frames[1].vestos_db.pop();rebuild_vestos(top.frames[1].cal);}
veses._cause=cause;var last_veses=veses.get_prev_veses(cal);while(last_veses!=null&&!last_veses.goesOnCalendar())
last_veses=last_veses.get_prev_veses(cal);if(last_veses!=undefined&&last_veses!=null&&last_veses._haflagas!=undefined&&veses.goesOnCalendar()){veses._haflagas=new Array();var c=-2;var d=last_veses._hefsek.clone();while(!d.equals(veses._reeyah)){c+=2;d.next();}
if(veses._onah==_NIGHT_)
c+=1;else if(veses._onah==_DAY_)
c+=2;else
alert('There was an error building your calendar, please report a bug with bug code 832 to My Mikvah Calendar');var current_repeats=1;var check_for_haflagas_not_passed_clean_due_to_kessem=false;var last_veses_from_any_cause=veses.get_prev_veses(cal);for(i in last_veses._haflagas)
{var x=Number(last_veses._haflagas[i][0]);var repeats=Number(last_veses._haflagas[i][1]);if(x>c)
veses._haflagas.push(new Array(x,repeats,last_veses._haflagas[i][2]));else if(x==c)
current_repeats=repeats+1;else if(last_veses_from_any_cause!=last_veses)
check_for_haflagas_not_passed_clean_due_to_kessem=true;}
veses._haflagas.push(new Array(c,current_repeats,veses));}
else if(veses._cause!=4&&veses._cause!=5&&(veses._cause!=6||veses.goesOnCalendar()))
veses._haflagas=new Array();last_nidah=veses.get_prev_veses(cal);if(last_nidah!=null&&last_nidah._cause>3&&last_nidah._cause<7)
veses._haflagas=new Array();cal._veses.push(veses);if(isNew&&live_input)
top.frames[1].vestos_db.push(new Array(veses._id,veses._reeyah,veses._time,veses._onah,veses._hefsek,veses._cause,top.frames[1].cal,veses._leadup_cause,veses._leadup_date,veses._leadup_onah));if(veses.goesOnCalendar())
{var events=new Array();for(i in cal._events)
{if((cal._events[i]._type==_HAFLAGAH_)&&(!veses._reeyah.is_later_then(cal._events[i]._date)||(veses._reeyah.equals(cal._events[i]._date)&&(veses._onah==_NIGHT_||cal._events[i]._onah==_DAY_)))&&cal._events[i]._deletable)
{;}
else if(cal._events[i]._type==_BENONIS_&&cal._events[i]._veses!=veses&&!veses._reeyah.is_later_then(cal._events[i]._date));else
events.push(cal._events[i]);}
cal._events=events;var benonis=date.clone();benonis.add_days(29);cal._events.push(new Event(benonis,_BENONIS_,veses));var chodesh=date.clone();chodesh.next_mo();if(date._d==30&&lastDayOfHebrewMonth(chodesh._m,chodesh._y)==29);else
cal._events.push(new Event(chodesh,_CHODESH_,veses));}
if(live_input)
refresh();if(!isNew)
{veses.confirm_hefsek(cal,false);}
else if(live_input)
{var new_kavuah=find_kavuah(veses,cal);var popup_sent=false;if(!new_kavuah&&(veses._cause==0||veses._cause==7)&&last_veses!=undefined&&last_veses!=null)
{var last_r=last_veses._reeyah.clone();last_r.add_days(90);last_nidah=veses.get_prev_veses(top.frames[1].cal);if(veses._reeyah.is_later_then(last_r)&&last_nidah._cause!=4&&last_nidah._cause!=5&&last_nidah._cause!=6)
{popup_sent=true;str="You have entered a New Flow that is 90 days or more from your last flow. If you are in the menopausal years you are not required to keep the Onot Haveset until you have three New Flows. Once you have had three New Flows, the laws of Onot Haveset must again be kept. If you are not in the menopausal years please consult a qualified rabbi to determine how your calendar should be kept.<br><br>Please note that it is recommended that a woman during the menopausal years, who is uncertain when her next New Flow will be, do a bedikah prior to intimacy until six months have passed with no cycle.";str="<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>New flow after large gap</div><Br><table  width='98%' style='margin-left: -18px; margin-top: -18px;'><tr><td align='left' style='font-size:12px'>"+str+"</td></tr></table>";str+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),235);setTimeout("new_popup_win(\""+str.replace(/"/g,"\\\"")+"\",'265','400')",2700);}}
if(!popup_sent)
{if(veses.StartedInWhiteWeek(top.frames[1].cal))
reeyah_in_white_week_popup(veses);else if(Settings.getInstance()._explain&&!new_kavuah)
setTimeout("new_popup_win_explainer('R')",2700);else if(new_kavuah)
setTimeout("new_popup_win_explainer('kavuah')",2700);}}
return true;}
function reeyah_in_white_week_popup(veses)
{str='';lastV=veses.get_prev_veses(top.frames[1].cal)
if((veses._cause==0||veses._cause==7)&&(lastV._cause==0||lastV._cause==7))
str="It is uncommon to have a new flow begin during the seven preparatory days of another flow. In the event this happens you should consult a rabbi and ask him how to proceed in this situation.";else if(veses._cause==1)
str="A stain found on a white garment or bedding may or may not force you to do a new Hefsek Tahara and restart counting your 7 preparatory days. This is dependent on the size and color of the stain as well as the material the stain is on. Only a qualified rabbi may determine this status. Please show this stain to a qualified rabbi to determine when your mikvah night should be.";else if(veses._cause==2)
str="A medical procedure may or may not  force you to do a new Hefsek Tahara and restart the counting your 7 preparatory days. Please describe the nature of the procedure to a qualified rabbi to determine when your mikvah night should be.";else if(veses._cause==3)
str="A color other  than white or clear resulting from a bedikah examination may or may not force you to do a new Hefesk Tahara and restart the counting your 7 preparatory days. This is dependent on the color of the stain. Please show this bedikah cloth to a qualified rabbi to determine when your mikvah night should be.";if(str==''&&Settings.getInstance()._explain)
setTimeout('new_popup_win_explainer(10)',2700);else if(str!='')
{str="<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>New flow during preparatory day</div><Br><table  width='80%' ><tr><td align='left' style='font-size:12px'>"+str+"</td></tr></table>";str+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows(); if(Settings.getInstance()._explain) {setTimeout('new_popup_win_explainer(10)',2700);}"),235);setTimeout("new_popup_win(\""+str.replace(/"/g,"\\\"")+"\",'265','400')",2700);}}
function delete_ht(cal,y,m,d)
{var latest=true;var hefsek=new HDate(d,m,y);var veses;for(i in cal._veses)
{if(cal._veses[i]._hefsek.equals(hefsek))
{veses=cal._veses[i];}
else if(cal._veses[i]._hefsek.is_later_then(hefsek))
latest=false;}
if(!latest)
{popup("You may only delete the hefsek taharah for your most recent flow");return false;}
$.post("ajax.php",{delVeses:veses._id});top.frames[1].vestos_db.pop();rebuild_vestos(cal);time_array=time(veses._time,false);ampm='pm';if(time_array[2])
ampm='am';if(new_veses(null,null,null,veses._reeyah._d,veses._reeyah._m,veses._reeyah._y,String(time_array[0]),String(time_array[1]),ampm,veses._cause,cal,true,false))
{v=null;for(i in top.frames[1].cal._veses)
if(!top.frames[1].cal._veses[i]._hefsek_confirmed)
v=top.frames[1].cal._veses[i];v._leadup_cause=veses._leadup_cause;v._leadup_onah=veses._leadup_onah;v._leadup_date=veses._leadup_date;leadup_cause=null;leadup_date=null;leadup_onah=null;if(v._leadup_date!==undefined&&v._leadup_date!=null&&v._leadup_date!='null'&&v._leadup_date!='0')
{leadup_cause=v._leadup_cause;leadup_onah=v._leadup_onah;leadup_date=v._leadup_date._d+"-"+v._leadup_date._m+"-"+v._leadup_date._y;}
top.frames[1].$.post("ajax.php",{newVeses:v._reeyah._d+"-"+v._reeyah._m+"-"+v._reeyah._y,onah:v._onah,cause:v._cause,time:v._time,leadup_cause:leadup_cause,leadup_date:leadup_date,leadup_onah:leadup_onah},function(data)
{v._id=data.id;v._onah=veses._onah;if(top.frames[1].Settings.remindHefsek())
{var date=v._hefsek.clone();for(ht_count=1;ht_count<11;ht_count++)
{top.frames[1].set_reminder(4,v,new top.frames[1].Day(date),top.frames[1]._DAY_,ht_count);date.next();}}
top.frames[1].reminder_new_reeyah(v);top.frames[1].Hide_Windows();top.frames[1].refresh();},"json");}
return true;}
function delete_veses(cal,y,m,d)
{var latest=true;var reeyah=new HDate(d,m,y);var veses;for(i in cal._veses)
{if(cal._veses[i]._reeyah.equals(reeyah))
veses=cal._veses[i];else if(cal._veses[i]._reeyah.is_later_then(reeyah))
latest=false;}
if(!latest)
{popup("You may only delete your last flow");return false;}
popup_okcancel("This operation can <strong>not</strong> be undone.<br>Are you sure you want to delete this flow from the system?",function()
{$.post("ajax.php",{delVeses:veses._id});top.frames[1].vestos_db.pop();rebuild_vestos(top.frames[1].cal);top.frames[1].Hide_Windows();top.frames[1].refresh();});return true;}
function rebuild_vestos(cal)
{db=vestos_db;cal._veses=new Array();cal._events=new Array();for(i in db)
{v=db[i];if(i==0)
load_veses(v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9]);else
load_veses(v[0],v[1],v[2],v[3],v[4],v[5],v[6],null,null,v[7],v[8],v[9]);}};Event.prototype._date;Event.prototype._onah;Event.prototype._reeyah;Event.prototype._deletable;Event.prototype._type;Event.prototype._misc;Event.prototype._veses;function Event(date,type,vesses){this._date=date;this._type=type;this._deletable=true;this._veses=vesses;this._misc=null;}
Event.prototype.toString=function(){return" "+_EVENT_NAMES_[this._type]+" event on "+this._date;}
Event.prototype.chodesh_onah=function(){if(this._type!=_CHODESH_)
return-1;if(this._misc==null)
{if(this._veses==null)
return this._onah;else
return this._veses._onah;}
else
return this._misc._onah;}
Event.prototype.reeyah_time=function(){try{found=false;if(this._type==_BENONIS_||this._type==_HAFLAGAH_)
if(this._veses==null)
return-1;else
found=true;if(!found&&this._misc==null)
{if(this._veses==null)
return-1;else
found=true;}
if(!found)
{d1=new Day(this._misc._reeyah);rtime=this._misc._time;}
else
{d1=new Day(this._veses._reeyah);rtime=this._veses._time;}
if(d1._date===undefined){return-1;}
d2=new Day(this._date);if(d1.isDST()&&!d2.isDST())
rtime=rtime-60;if(!d1.isDST()&&d2.isDST())
rtime=rtime+60;return rtime;}
catch(err){return-1;}};var _RED_=0;var _YELLOW_=1;var _GREEN_=2;var _WHITE_=3;var _BLUE_=4;var _EVENT_=0;var _REEYAH_=1;var _HEFSEK_=2;var _REPEATING_=3;var _MEMO_=4;var _CHODESH_=5;var _BENONIS_=6;var _HAFLAGAH_=7;var _KAVUAH_=8;var _EVENT_NAMES_=new Array('Generic Event','Flow','Hefsek Taharah','Repeating Memo','Memo','Chodesh','Beinonit','Haflagah','Kavuah');var _NIGHT_=1;var _DAY_=2;var _NIGHT_AND_DAY_=3;var _ONAH_NAMES_=new Array('','night onah','day onah','night and day onahs');var _ONAH_TYPES_=new Array('','sunrise','sunset','sunset and sunrise');var _RABBIS_=new Array(new Array('Rabbi Sholom Ber Chaikin','chayamk1@gmail.com','216-381-9178','Ohio'),new Array('Rabbi Chaikin','rabbi@oxfordshul.com','27-83-794-1178','South Africa'),new Array('Rabbi Gluckowsky','bdchabad@012.net.il','972-504-145-770','Israel'),new Array('Rabbi Groner','sbgronersa@gmail.com','27-82-964-8900 (available 24 hrs daily)','South Africa'),new Array('Rabbi Jacobs','RabbiJacobs@FamilyPurity.com','972-3-9607-402','Israel'),new Array('Rabbi Jurkowicz','rabbibb@gmail.com','972-54-797-7042 ','Israel'),new Array('Dayan Raskin','lyraskin@btinternet.com','44-208-802-1606 ','London'),new Array('Rabbi Schmerling','rabbischmerling@gmail.com','917-689-5124','New York'),new Array('Rabbi Shusterman','none','310-271-9063','California'),new Array('Rabbi Ulman','ulman@tpg.com.au','612-9300-6279 or 347-853-8014','Sydney'),new Array('Rabbi Vigler','rabbivigler@gmail.com','718-510-3258','New York'));;function Day(hdate){this._date=hdate;this._night_color=_GREEN_;this._day_color=_GREEN_;this._chag="unset";this._events=new Array();this._memos=new Array();this._leftX=0;this._topY=0;this._locations=new Array();this._out_of_town=false;locs=_trip_locations;for(i in locs)
{var start=locs[i]._start_date;var end=locs[i]._end_date;if(!start.is_later_then(hdate)&&(end==null||!hdate.is_later_then(end)))
this._locations.push(locs[i]);}
for(i in this._locations)
{var trip=this._locations[i];if(!hdate.equals(trip._start_date)&&(trip._end_date==null||!hdate.equals(trip._end_date)))
{this._out_of_town=true;break;}}
if(!this._out_of_town)
this._locations.push(getHomeLocation(hdate));}
Day.prototype._date;Day.prototype._night_color;Day.prototype._day_color;Day.prototype._locations;Day.prototype._out_of_town;Day.prototype._reeyah;Day.prototype._hefsek;Day.prototype._mikvah;Day.prototype._events;Day.prototype._memos;Day.prototype._chag;Day.prototype._leftX;Day.prototype._topY;Day.prototype.toString=function(){return this._date.toString()+"<br>"+
this._date.to_eng();}
Day.prototype.chag=function(){if(this._chag=='unset'){var chag_date=new HDate(1,1,5769);for(holidayCounter=0;holidayCounter<56;holidayCounter++){chag_date=getJewishHolidayDate(holidayCounter,this._date._y);if(chag_date.equals(this._date)){this._chag=getJewishHolidayName(holidayCounter);break;}}}
return this._chag;}
Day.prototype.isDST=function(){if(getDST(12,0,this._date,this._locations[0]._timezone,this._locations[0]._gmt_offset)>0)
return true;else
return false;}
Day.prototype.start_shkiah=function()
{return get_zman(this,1);}
Day.prototype.netz=function()
{return get_zman(this,2);}
Day.prototype.end_shkiah=function()
{return get_zman(this,3);}
Day.prototype.get_onah=function(time)
{if(time<this.netz()||time>this.start_shkiah())
return _NIGHT_;else if(time>=this.netz()&&time<=this.end_shkiah())
return _DAY_;}
Day.prototype.get_bg_image=function(is_mini_month)
{if(is_mini_month===undefined)
is_mini_month=false;var image_name='';switch(this._night_color){case _GREEN_:image_name='g';break;case _RED_:image_name='r';break;case _YELLOW_:image_name='y';break;case _WHITE_:image_name='w';break;case _BLUE_:image_name='b';break;default:image_name='x';}
switch(this._day_color){case _GREEN_:image_name+='g';break;case _RED_:image_name+='r';break;case _YELLOW_:image_name+='y';break;case _WHITE_:image_name+='w';break;case _BLUE_:image_name+='b';break;default:image_name+='x';}
if(top.frames[1].cal._current_date.equals(this._date)&&!is_mini_month)
return'today/'+image_name+".png";return image_name+".png";}
function time(time,string_output)
{if(typeof string_output=="undefined")
string_output=true;if(time>1439)
time-=1440;else if(time<0)
time+=1440;var hour=Math.floor(time/60);var ampm="AM";if(hour>11)
ampm="PM";if(hour>12)
hour=hour-12;if(hour==0)
hour=12;var minute=time%60;if(!string_output)
return new Array(hour,minute,ampm=="AM");if(minute<10)
minute="0"+minute;return hour+":"+minute+" "+ampm;}
function time2min(hr,minute,isAM)
{hr=parseInt(hr);minute=parseInt(minute);var time=minute;if(hr==12)
hr=0;if(isAM)
time+=60*hr;if(!isAM)
time=time+720+(60*hr);return time;}
Day.prototype.format_time=function(minutes)
{return time(minutes);}
Day.prototype.output_html=function()
{var chashashot_html='';for(i in this._events){if(this._events[i]._type==_BENONIS_&&(this.show_chashashot(_NIGHT_)||this.show_chashashot(_DAY_)))
chashashot_html+="<div onClick=\"cal._selected_shape='diamond';\" style=\"position:absolute;left: 39px; top: 47px; width: 19px; height: 19px; background:URL('./images/diamond.png')\"></div>";else if(this._events[i]._type==_CHODESH_)
{var onah=this._events[i].chodesh_onah();if(onah==_NIGHT_&&this.show_chashashot(_NIGHT_))
chashashot_html+="<div onClick=\"cal._selected_shape='circle_left';\" style=\"position:absolute; left:14px; top:34px; width:14px; height:14px;background:URL('./images/circle.png')\"></div>";else if(onah==_DAY_&&this.show_chashashot(_DAY_))
chashashot_html+="<div onClick=\"cal._selected_shape='circle_right';\" style=\"position:absolute; left:67px; top:34px; width:14px; height:14px;background:URL('./images/circle.png')\"></div>";}
else if(this._events[i]._type==_HAFLAGAH_)
{if(this._events[i]._misc<100)
{if(this._events[i]._onah==_NIGHT_&&this.show_chashashot(_NIGHT_))
chashashot_html+="<div onClick=\"cal._selected_shape='square_left';\" style='background: transparent url(./images/2digits.png); font-size: 11px; font-family:Verdana; position: absolute; left: 12px; top: 60px; width: 17px; height: 15px;'>"+this._events[i]._misc+"</div>";else if(this._events[i]._onah==_DAY_&&this.show_chashashot(_DAY_))
chashashot_html+="<div onClick=\"cal._selected_shape='square_right';\" style='background: transparent url(./images/2digits.png); font-size: 11px; font-family:Verdana; position: absolute; left: 65px; top: 60px; width: 17px; height: 15px;'>"+this._events[i]._misc+"</div>";}
else
{if(this._events[i]._onah==_NIGHT_&&this.show_chashashot(_NIGHT_))
chashashot_html+="<div onClick=\"cal._selected_shape='square_left';\" style='background: transparent url(./images/3digits.png); font-size: 11px; font-family: Verdana; position: absolute; left: 9px; top: 60px; width: 28px; height: 15px;'>"+this._events[i]._misc+"</div>";else if(this._events[i]._onah==_DAY_&&this.show_chashashot(_DAY_))
chashashot_html+="<div onClick=\"cal._selected_shape='square_right';\" style='background: transparent url(./images/3digits.png); font-size: 11px; font-family: Verdana; position: absolute; left: 57px; top: 60px; width: 28px; height: 15px;'>"+this._events[i]._misc+"</div>";}}}
var night_div="<div style=' font-size:16px;position:absolute; left:0px; top:45px; width:48px; height:21px;' align='center'><font face='Geneva'  color='#666666'>";var day_div="<div id='ht' style=' font-size:16px;position:absolute; left:48px; top:45px; width:48px; height:21px;' align='center'><font face='Geneva' color='#666666'>";if(this._night_color==_BLUE_&&this._mikvah!==undefined)
{dow="<div style='font-size:9px;color:#555555;line-height: 11px;'>"+getLongWeekdayName(this._mikvah._mikvah.get_dow()-2)+" Night</div>";if(this._mikvah.check_for_bad_mikvah()=='')
chashashot_html+=night_div+"M</font>"+dow+"</div>";else
chashashot_html+=night_div+"M?</font>"+dow+"</div>";}
if(this._reeyah!=undefined&&(this._hefsek==undefined||this._reeyah._onah==_NIGHT_))
{var text="P";if(this._reeyah._cause==4||this._reeyah._cause==5)
text="B";else if(!this._reeyah.goesOnCalendar())
text="S";if(this._reeyah._onah==_NIGHT_)
{chashashot_html+=night_div+text+"</font></div>";if(this._hefsek==undefined)
chashashot_html+="<div style='position:absolute; left: 48px; top: 54px; width: 46px; height:2px;margin: 0; padding: 0;  border:none; background: url(images/date-div.png) no-repeat;'  align='center'></div>";}
else
chashashot_html+=day_div+text+"</font></div>";}
if(this._hefsek!=undefined)
{if(this._reeyah==undefined)
chashashot_html+="<div style='position:absolute; left:0px; top:54px; width:48px; height:2px;margin: 0; padding: 0; border:none; background: url(images/date-div.png) no-repeat;'  align='center'></div>";if(this._hefsek._hefsek_confirmed)
{if(this._reeyah!=undefined&&this._reeyah._onah==_DAY_)
{if(!this._reeyah.goesOnCalendar())
chashashot_html+=day_div+"S-HT</font></div>";else
chashashot_html+=day_div+"P-HT</font></div>";}
else
chashashot_html+=day_div+"HT</font></div>";}
else
chashashot_html+="<div id='ht_1' style='font-size:16px; border:solid; border-color:#993366; border-style:dashed; background: transparent; border-width:1px;position:absolute; left:52px; top:45px; width:36px; height:21px;'><font face='Geneva' color='#666666'>HT?</font></div>";}
else if(this._night_color==_RED_&&this._day_color==_RED_&&this._reeyah==undefined)
chashashot_html+="<div style='position:absolute; left:0px; top:54px; width:94px; height:2px;margin: 0; padding: 0; border:none; background: url(images/date-div.png) no-repeat;'  align='center'></div>";if(this._out_of_town||this._locations.length>1)
chashashot_html+="<div style=\"position:absolute; left: 29px; top: 34px; width: 37px; height: 39px;background:URL('./images/plane3.png')\"></div>";var icons_night='';var icons_day='';for(i in this._memos)
if(this._memos[i][0]._onah==_NIGHT_)
icons_night="<div onClick=\"cal._selected_shape='memo';\" style='background: transparent url(./images/days/memo.jpg); position: absolute; left: 12px; top: 3px; width: 12px; height: 10px;'></div>";else if(this._memos[i][0]._onah==_DAY_)
icons_day="<div onClick=\"cal._selected_shape='memo';\" style='background: transparent url(./images/days/memo.jpg); position: absolute; left: 70px; top: 3px; width: 12px; height: 10px;'></div>";var output="<td id = 'day_"+this._date._d+"' onMouseOut=\"this.style.cursor='default'\" onMouseOver=\"this.style.cursor='pointer'\" onClick='top.frames[1].cal._selected_day = "+this._date._d;output+="+ top.frames[1].cal._selected_offset;top.frames[1].refresh();if(top.frames[1].cal._selected_offset != 770){top.frames[1].new_popup_win_fromString();}'  height='90px' valign='top' style='background:url(./images/days/"+this.get_bg_image()+"); background-repeat:repeat-y; padding-top:4px; padding-bottom:4px'>";output+="<div align='center' style=';position:relative; width:95px; height:90px'>";output+="<table style=\"background:url(\'./images/day_bg.png\') repeat; border: 1px solid #999999;border-collapse: collapse;\"   width='76'";output+="border='0' align='center' cellpadding='0' cellspacing='0' >";output+="<tr align='center'>";output+="<td><div align='center' style=\"display:inline;font-size: 12px;line-height:15px; font:'Lucida Sans Unicode'\">"
output+=this._date._d+"</div><div align='center' style=\"display:inline;padding-left:3px;font-size: 14px;line-height:13px; font:'Lucida Sans Unicode'\">"+this.alefbeis_day()+"</div></td>";output+="</tr><tr><td>";if(this._chag.length>13)
output+="<div <div align='center' style=\"font-size: 8px;line-height:12px;\">"+this._chag+"</div></td>";else
output+="<div <div align='center' style=\"font-size: 10px;line-height:12px; f\">"+this._chag+"</div></td>";output+="</tr></table>";output+=chashashot_html;output+="<p style='position:absolute;left:50px; top:78px; width:43px'>"+this._date.to_eng_short()+"</p>";output+=icons_night+icons_day;output+="</div></td>";return output;}
Day.prototype.output_html_details=function()
{var html="<div class='title' style='margin-top:0px;margin-left:-20px'>";var dot=". ";if(getWeekdayName(this._date.get_dow()-1)=='Shabbat')
dot=" ";html+=getWeekdayName(this._date.get_dow()-1)+dot+this._date.toString();if(this._locations.length==1)
{html+="</div><div style='width:380px;' onMouseOver=\"this.style.cursor='default'\" >";html+="<table style='line-height:10px;'>";html+="<tr><td  align='right' width = '78'>Location:</td><td>&nbsp;&nbsp;"+this._locations[0].info(this._date)+"</td></tr>";html+="<tr><td>Night Onah Starts:</td><td align='left'>&nbsp;&nbsp;";html+=this._date.to_eng_night()+" at "+this.format_time(this.start_shkiah());html+="</td></tr> <tr><td align='right' >Day Onah Begins:</td><td align='left'>&nbsp;&nbsp;";html+=this._date.to_eng()+" at "+this.format_time(this.netz());html+="</td></tr><tr> <td align='right'>Day Onah Ends:</td><td align='left'>&nbsp;&nbsp;";html+=this._date.to_eng()+" at "+this.format_time(this.end_shkiah());html+="</td></tr></table>";}
else
{html+="</div><script type=\"text/javascript\">var times = new Array();";for(i in this._locations)
html+="times.push(new Array('"+this.format_time(get_zman(this,1,i))+"','"+this.format_time(get_zman(this,2,i))+"','"+this.format_time(get_zman(this,3,i))+"'));";html+="function update(){var i = document.getElementById('locations').value;";html+="document.getElementById('zman1').innerHTML=times[i][0];";html+="document.getElementById('zman2').innerHTML=times[i][1]; document.getElementById('zman3').innerHTML=times[i][2];} ";html+="</script>";html+="<div align=\"center\" style=\"font-size: 9px;line-height:12px;font-family: Geneva, Arial, Helvetica, sans-serif;\">Location: <select style=\"font-size:9px; font:Geneva, Arial, Helvetica, sans-serif\" id=\"locations\" name=\"locations\" size=\"1\" onchange=\"update();\">";for(i in this._locations)
html+=" <option value=\""+i+"\">"+this._locations[i].info(this._date)+"</option>";html+="</select></div><table style='line-height:10px;'><tr><td  align='right' width = '78'>Night Onah Starts:</td><td align='left'>&nbsp;&nbsp;";html+=this._date.to_eng_night()+" at <div style='display:inline;' id='zman1'>"+this.format_time(this.start_shkiah());html+="</td></tr> <tr><td align='right'>Day Onah Begins:</td><td align='left'>&nbsp;&nbsp;";html+=this._date.to_eng()+" at <div style='display:inline;' id='zman2'>"+this.format_time(this.netz());html+="</td></tr><tr> <td align='right'>Day Onah Ends:</td><td align='left'>&nbsp;&nbsp;";html+=this._date.to_eng()+" at <div style='display:inline;' id='zman3'>"+this.format_time(this.end_shkiah());html+="</div></td></tr></table>";}
if(this._hefsek!=undefined&&this._hefsek._hefsek_confirmed==false)
{var hefsek=this._date.clone();var reeyah=this._hefsek._reeyah.clone();if(this._hefsek._leadup_date!==undefined)
reeyah=this._hefsek._leadup_date.clone();var hefsek=this._hefsek._hefsek;var days=1;while(hefsek.is_later_then(reeyah))
{reeyah.next();days=days+1;}
var min_days=1+this._hefsek.getEarliestHtNumber();var msg="<div align='center' style='padding-left:18px;'><br><br>Today is day "+days+" from the start of your flow.<br>Did you perform a successful "+tooltip('Hefsek Taharah')+" on this day before sunset?</div>";if(days<min_days)
msg="<div align='center' style='padding-left:18px;'><p align = 'center' style='color:#990000; font-weight:500; font-size:14px'>Warning: Early "+tooltip('Hefsek Taharah')+"</p>Today is only day "+days+" from the start of your flow. You must wait at least "+min_days+" days before attempting a "+tooltip('Hefsek Taharah')+". Did you perform a successful "+tooltip('Hefsek Taharah')+" under the explicit instructions and permission of a rabbi?</div>";html+="<table width = '90%'><tr><td>"+msg+"</td></tr></table>";html+=buttons(new Array('No','Yes'),new Array('this.blur();top.frames[1].Hide_Windows();',"this.blur();top.frames[1].cal._month._days["+this._date._d+"]._hefsek.confirm_hefsek(top.frames[1].cal,true); top.frames[1].Hide_Windows();top.frames[1].refresh();"),235)+"</div>";}
else
{html+=this.day_details();html+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),235)+"</div>";}
return html;}
Day.prototype.bedikah_time=function(e,onah_name,onah_type)
{if(!e.reeyah_time()||e.reeyah_time()<0)
reeyah_time='';else
reeyah_time='('+this.format_time(e.reeyah_time())+')';if(onah_name=='night onah')
var end_of_onah=this.netz();else
var end_of_onah=this.end_shkiah();if((onah_name=='night onah'&&e.reeyah_time()<720&&(end_of_onah-e.reeyah_time())<16)||(onah_name=='day onah'&&(end_of_onah-e.reeyah_time())<16))
{return" Relations are forbidden for the "+onah_name+"  and a "+tooltip('bedikah')+" must be made close to (but before) the end of the "+onah_name+" - "+onah_type+". If the bedikah is clear or white, intimacy may resume only after the "+tooltip('onah')+" has ended.";}
if(e.reeyah_time()>1319||(onah_name=='night onah'&&e.reeyah_time()<540))
return" Relations are forbidden for the "+onah_name+"  and a "+tooltip('bedikah')+" must be made just <strong>after</strong> the time of day your flow started "+reeyah_time+" or sometime later on, but before the end of the "+onah_name+" - "+onah_type+".  If you will not be awake during this time range, a bedikah may be done first thing in the morning. If the bedikah is clear or white, intimacy may resume only after the "+tooltip('onah')+" has ended.";return" Relations are forbidden for the "+onah_name+"  and a "+tooltip('bedikah')+" must be made just <strong>after</strong> the time of day your flow started "+reeyah_time+" or sometime later on, but before the end of the "+onah_name+" - "+onah_type+". If the bedikah is clear or white, intimacy may resume only after the "+tooltip('onah')+" has ended.";}
Day.prototype.day_details=function(){var events=new Array();var titles=new Array("Start of Flow","Stain Discovered","Medical Procedure","Unclean Bedikah","Birth","Start of Flow during Menopause","Lost Pregnancy");if(this._reeyah!=undefined)
{var title=titles[this._reeyah._cause];if(this._reeyah._cause>3&&this._reeyah._cause<7)
title=titles[4];else if(this._reeyah._cause==7)
title=titles[0];if(this._reeyah._cause==6)
title=titles[6];var temp=this._reeyah.cause_str();if(this._reeyah._leadup_date===undefined)
events.push(new Array(title,temp+" during the "+_ONAH_NAMES_[this._reeyah._onah]+" at "+this.format_time(this._reeyah._time)+". All the laws of "+tooltip('harchakot')+" are in effect from this point in time until after the mikvah immersion."));else
events.push(new Array(title,this._reeyah.cause_str(true)+" on the "+this._reeyah._leadup_date+" during the "+_ONAH_NAMES_[this._reeyah._leadup_onah]+". You were not able to perform a hefsek taharah before your regular flow started on the "+this._date+" during the "+_ONAH_NAMES_[this._reeyah._onah]+" at "+this.format_time(this._reeyah._time)+". All the laws of "+tooltip('harchakot')+" are still in effect until after the mikvah immersion."));}
if(this._hefsek!=undefined)
if(this._hefsek._hefsek_confirmed)
events.push(new Array("Hefsek Taharah","A "+tooltip('Hefsek Taharah')+" was performed towards the end of the day "+tooltip('onah')+" but before sunset,  for the flow starting on the "+this._hefsek._reeyah+". Tomorrow is the first of the seven preparatory days."));else
events.push(new Array("Hefsek Taharah","If your flow has ended,a "+tooltip('Hefsek Taharah')+" may be performed at the end of the day but before sunset ("+
this.format_time(this.end_shkiah())+"), tommorow will be the first of the seven preparatory days."));if(this._mikvah!=undefined)
{var mikvah_problem=this._mikvah.check_for_bad_mikvah();if(mikvah_problem=='')
events.push(new Array("Mikvah Night","After immersion in a kosher mikvah a woman is obligated to inform her husband that she has immersed. Once these obligations are met, relations are once again permitted and the  laws of "+tooltip('harchakot')+" are no longer in effect."));else
events.push(new Array("Mikvah Night?",mikvah_problem+" After immersion in a kosher mikvah on the proper night a woman is obligated to inform her husband that she has immersed. Once these obligations are met, relations are once again permitted and the  laws of "+tooltip('harchakot')+" are no longer in effect."));}
if(events.length==0)
{if(this._day_color==_RED_&&this._night_color==_RED_)
events.push(new Array("Nidah","<br><br>Relations are forbidden today and the laws of "+tooltip('harchakot')+" are in effect."));else if(this._day_color==_RED_)
events.push(new Array("Nidah","<br>Relations are forbidden and the laws of "+tooltip('harchakot')+" are in effect for the day onah."));else if(this._day_color==_WHITE_&&this._night_color==_WHITE_)
events.push(new Array("Preparatory Day","Relations are forbidden today and the laws of "+tooltip('harchakot')+" are in effect. Additionally a "+tooltip('bedikah')+" should be done in the morning and again before sunset ("+
this.format_time(this.end_shkiah())+")."));}
for(i in this._events)
{if(this._events[i]._type==_BENONIS_&&(this.show_chashashot(_NIGHT_)||this.show_chashashot(_DAY_)))
events.push(new Array("Onah Beinonit (the Average Cycle)","This "+tooltip('onah')+" is the 30th day from the flow starting on the "+this._events[i]._veses._reeyah+". Relations are forbidden both night and day and a "+tooltip('bedikah')+" must be made prior to sunset towards the end of the day "+tooltip('onah')+".  If the "+tooltip('bedikah')+" is clear or white, intimacy may resume after nightfall when the "+tooltip('onah')+" is over. For those women for whom making bedikot poses no difficulty, it is an optional stringency (chumrah) to make another "+tooltip('bedikah')+" after nightfall following the end of the Onah Beinonit. A woman has a halachic obligation to inform her husband of the Onah Beinonit and to notify him that she has done the bedikah to cancel the day. If she does not inform him, it is the husband's obligation to ask."));else if(this._events[i]._type==_CHODESH_)
{var ignore_this=false;var onah_name='';var onah_type='';var intro_str='';if(this._events[i]._veses==null)
{if(!this.show_chashashot(this._events[i]._onah))
ignore_this=true;onah_name=_ONAH_NAMES_[this._events[i]._onah];onah_type=_ONAH_TYPES_[this._events[i]._onah];}
else if(this._events[i]._misc==null&&this.show_chashashot(this._events[i]._veses._onah)&&this._events[i]._veses!=null)
{onah_name=_ONAH_NAMES_[this._events[i]._veses._onah];onah_type=_ONAH_TYPES_[this._events[i]._veses._onah];intro_str="This "+tooltip('onah')+" is the same date of the month as the start of your flow last month on the "+this._events[i]._veses._reeyah+"."}
else if(this._events[i]._misc!=null&&this.show_chashashot(this._events[i]._misc._onah))
{onah_name=_ONAH_NAMES_[this._events[i]._misc._onah];onah_type=_ONAH_TYPES_[this._events[i]._misc._onah];intro_str="This "+tooltip('onah')+" is the same date of the month as the start of your flow on the "+this._events[i]._misc._reeyah+" and has been carried over since that date has not been passed clean.";}
else
ignore_this=true;if(!ignore_this)
events.push(new Array("Veset HaChodesh (Hebrew Date Cycle)",intro_str+this.bedikah_time(this._events[i],onah_name,onah_type)));}
else if(this._events[i]._type==_HAFLAGAH_&&this.show_chashashot(this._events[i]._veses._onah))
events.push(new Array("Haflagah (Cycle Based on Interval)","This is "+tooltip('onah')+" number "+this._events[i]._misc+" from the previous "+tooltip('Hefsek Taharah')+". "+this.bedikah_time(this._events[i],_ONAH_NAMES_[this._events[i]._onah],_ONAH_TYPES_[this._events[i]._onah])));}
if(this._chag=="Tisha B'Av"){events.push(new Array("Tisha B'Av","Relations are forbidden on Tisha B'Av every year, however a "+tooltip('bedikah')+" is not required."))}
else if(this._chag=="Yom Kippur"){events.push(new Array("Yom Kippur","Relations are forbidden on Yom Kippur every year, however a "+tooltip('bedikah')+" is not required."))}
if(this._locations.length>1)
for(j in this._locations)
if(this._locations[j]._start_date!=null&&this._locations[j]._start_date.equals(this._date))
{events.push(new Array("Trip Departure","Today is your departure date for your trip to "+this._locations[j]));break;}
if(events.length==0&&this._memos.length==0)
return"<div style='border:#A2A3A2 1px solid; width:380px;margin-left:-5px; margin-top:5px; height:125px; background:white;'><div align='center' style='line-height:28px;background:url(images/popup/header_bg.png); height:28px;color: #666;width:100%;'><strong>No Events</strong></div><div id='event_body' align='center' style='padding:2px; height:97px;overflow:auto;' onMouseOver=\"this.style.cursor='default'\" ><br>There are no restrictions in effect for both night and day "+tooltip('onot')+"<br><br><div onclick=\"setTimeout('top.frames[1].new_reeyah();',700); top.frames[1].cal._selected_day = "+this._date._d+"; top.frames[1].cal._selected_offset = 771; top.frames[1].Hide_Windows();\"><a href='#'>Add a new flow starting today</a></div></div></div>";var mouseOver="onMouseOut=\\\"this.style.cursor='default'\\\" onMouseOver=\\\"this.style.cursor='pointer'\\\"";return_string="<script type='text/javascript'>var data = new Array();";for(i in events)
{var action='null';if(events[i][0]==titles[0]||events[i][0]==titles[1]||events[i][0]==titles[2]||events[i][0]==titles[3]||events[i][0]==titles[4]||events[i][0]==titles[5]||events[i][0]==titles[6])
action="<img onClick='delete_veses(top.frames[1].cal,"+this._date._y+","+this._date._m+","+this._date._d+");' "+mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" onmouseup=\\\"this.src='./images/popup/trash.png'\\\" >";else if(events[i][0]=="Hefsek Taharah")
action="<img onClick='delete_ht(top.frames[1].cal,"+this._date._y+","+this._date._m+","+this._date._d+");' "+mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" onmouseup=\\\"this.src='./images/popup/trash.png'\\\" >";else if(events[i][0]=="Trip Departure")
action="<img onClick='top.frames[1].delete_trip("+this._locations[j]._id+"); top.frames[1].refresh(); this.blur(); top.frames[1].Hide_Windows();'  "+mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" onmouseup=\\\"this.src='./images/popup/trash.png'\\\">";return_string+="data.push(new Array(\""+events[i][0]+"\",\""+events[i][1]+"\",\""+action+"\"));";}
for(i in this._memos)
{return_string+="data.push(new Array(\"Memo: "+this._memos[i][0]._title+"\",\"";return_string+=this._memos[i][0]._memo;return_string+="\", \"<img onClick='popup_okcancel(1,function() {top.frames[1].cal._memos["+this._memos[i][1]+"].delete_me(top.frames[1].cal);top.frames[1].refresh();this.blur();top.frames[1].Hide_Windows();})'  "+mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" onmouseup=\\\"this.src='./images/popup/trash.png'\\\">\"));";}
if(cal._selected_shape!='none')
{shape=cal._selected_shape;cal._selected_shape='none';if(shape=='memo'){return_string+="for(i in data){";return_string+=" if(data[i][0].substring(0,5)=='Memo:'){";return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";}
else if(shape=='diamond'){return_string+="for(i in data){";return_string+=" if(data[i][0].substring(0,8)=='Onah Ben'){";return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";}
else if(shape.substring(0,6)=='circle'){return_string+="for(i in data){";return_string+=" if(data[i][0].substring(0,10)=='Veset HaCh'){";return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";}
else if(shape.substring(0,6)=='square'){return_string+="for(i in data){";return_string+=" if(data[i][0].substring(0,8)=='Haflagah'){";return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";}}
return_string+="</script><div style='border:#A2A3A2 1px solid; width:380px;margin-left:-5px; margin-top:5px; height:125px; background:white;'><div align='center' style='line-height:28px;background:url(images/popup/header_bg.png); height:28px; width:100%; color:#666'><table width=\"100%\"><tr style='line-height:26px'><td width=\"17\" ><div style=\"margin-left:1px; margin-bottom:3px; background:url(images/popup/left.png) right; width:17px; height:21px;\" onMouseDown=\"this.style.background='url(images/popup/left.png) left'\" onMouseUp=\"this.style.background='url(images/popup/left.png) right'\" id=\"left\" onClick='day_prev();'/></td><td width=\"47\"><div onMouseDown=\"this.style.background='url(images/popup/right_on.png)'\" onMouseUp=\"this.style.background='url(images/popup/right_off.png)'\" style=\"margin-left:1px;margin-bottom:3px;background:url(images/popup/right_off.png); width:47px; height:21px;\" id=\"right\" onClick='day_next();'/></td><td align=\"center\" ><div id=\"day_header\"  style=\"margin-left:-43px;display:inline;font-size:15px; \" ></div></td><td width=\"21\" align='right'><div id='trash' style='padding-right:2px; padding-bottom:3px;'></div></td></tr></table></div><div id='details' align='left' style='padding-left:2px;padding-right:2px; height:97px;overflow:auto;'></div></div>";return_string+="<script type='text/javascript'>var i = 0;function update_day(){ document.getElementById('day_header').innerHTML=data[i][0]; document.getElementById('details').innerHTML=data[i][1];if(data[i][2] != 'null' ) document.getElementById('trash').innerHTML=data[i][2]; else document.getElementById('trash').innerHTML='';if(i == data.length-1) document.getElementById('right').style.display='none'; else document.getElementById('right').style.display='block'; if(i == 0) document.getElementById('left').style.display='none'; else document.getElementById('left').style.display='block';} function day_next(){i++;update_day();} function day_prev(){i--;update_day();} update_day();</script>";return return_string;}
Day.prototype.show_chashashot=function(onah){if(onah==_NIGHT_)
if(this._night_color==_GREEN_||this._night_color==_YELLOW_)
return true;else
return false;if(onah==_DAY_)
if(this._day_color==_GREEN_||this._day_color==_YELLOW_)
return true;else
return false;if(onah==_NIGHT_AND_DAY_)
if(this._night_color==_GREEN_||this._night_color==_YELLOW_)
return true;else
return false;return true;}
Day.prototype.contains_pixel=function(x,y)
{return x>=this._leftX&&x<=(this._leftX+95)&&y>=this._topY&&y<=(this._topY+90);}
Day.prototype.alefbeis_day=function()
{var d=Number(this._date._d);var char1='';var char2='';if(d<11)
char1="&#"+String(1487+d);else if(d<20&&d!=15&&d!=16)
{char1="&#"+String(1487+10);char2="&#"+String(1487+d-10);}
else if(d==15||d==16)
{char1="&#"+String(1487+9);char2="&#"+String(1487+d-9);}
else if(d==20)
char1="&#"+String(1487+12);else if(d<30)
{char1="&#"+String(1487+12);char2="&#"+String(1487+d-20);}
else if(d==30)
char1="&#"+String(1487+13);return char1+char2;};var _trip_locations=new Array();var _home_locations=new Array();var home_location='';function getDST(h,m,hdate,tz,gmt){if(tz=='none')
return 0;var ed=hdate.to_eng_array();var D=new fleegix.date.Date(ed[2],ed[1]-1,ed[0],h,m,tz);return(-1*(D.getTimezoneOffset()/60))-gmt;}
function Location(id,name,lat,long,gmt,tz,start,end)
{this._id=id;this._name=name;this._lat=Number(lat);this._long=Number(long);this._gmt_offset=Number(gmt);this._timezone=tz;if(typeof start=="undefined")
this._start_date=null;else
this._start_date=start;if(typeof end=="undefined")
this._end_date=null;else
this._end_date=end;}
Location.prototype._id;Location.prototype._name;Location.prototype._lat;Location.prototype._long;Location.prototype._gmt_offset;Location.prototype._timezone;Location.prototype._start_date;Location.prototype._end_date;Location.prototype.toString=function(){return this._name;}
Location.prototype.info=function(hdate){if(getDST(12,0,hdate,this._timezone,this._gmt_offset)>0)
return this._name+' (Daylight saving time)';else
return this._name;}
Location.prototype.get_gmt_offset=function(hdate){if(this._timezone=='none')
return this._gmt_offset;var ed=hdate.to_eng_array();var D=new fleegix.date.Date(ed[2],ed[1]-1,ed[0],11,30,this._timezone);return-1*D.getTimezoneOffset();}
function delete_trip(id)
{var trip=null;var new_trip_list=new Array();for(i in _trip_locations)
if(String(_trip_locations[i]._id)==String(id))
trip=_trip_locations[i];else
new_trip_list.push(_trip_locations[i]);if(_trip_locations.length-new_trip_list.length==1)
{_trip_locations=new_trip_list;$.post("ajax.php",{delTrip:id});reminder_update_locations();}
else
alert('error removing trip');}
function getHomeLocation(hdate)
{if(hdate==undefined&&home_location=='')
{for(i in _home_locations)
if(_home_locations[i]._end_date==null)
{home_location=_home_locations[i];return _home_locations[i];}}
else if(hdate==undefined)
return home_location;for(i in _home_locations)
{var l=_home_locations[i];if((l._start_date==null||!l._start_date.is_later_then(hdate))&&(l._end_date==null||!hdate.is_later_then(l._end_date)))
return l;}
alert('error: no home location for date: '+hdate);return null;}
function international_dateline_checker(day)
{for(i in day._locations)
for(j in day._locations)
{if(i==j)
continue;var l1=Number(day._locations[i]._long);var l2=Number(day._locations[j]._long);if(l1>7000||l1<-16970)
if(l2<-3500&&l2>-16970)
return' or you may be able to go to the mikvah a night early if your flight between '+day._locations[i]._name.split(",",1)+' and '+day._locations[j]._name.split(",",1)+' crossed the International Date Line in the Pacific Ocean, '}
return'';}
function crosses_date_line(location1,location2){if(location1._name==location2._name)
return false;var l1=Number(location1._long);var l2=Number(location2._long);if(l1>7000||l1<-16970)
if(l2<-3500&&l2>-16970)
return true;if(l2>7000||l2<-16970)
if(l1<-3500&&l1>-16970)
return true;return false;};Memo.prototype._id;Memo.prototype._memo;Memo.prototype._title;Memo.prototype._time;Memo.prototype._date;Memo.prototype._onah;Memo.prototype._remind;Memo.prototype._force_color;Memo.prototype._color;function Memo(id,date,hr,min,isAM,remind,change_color,new_color,title,memo){this._id=id;this._memo=memo;this._title=title;this._date=date;this._time=time2min(hr,min,isAM);var day=new Day(date);this._onah=day.get_onah(this._time);this._remind=remind;this._force_color=change_color;if(change_color)
this._color=new_color;}
Memo.prototype.info=function(){return"Memo on "+this._date+": "+this._memo+" - color: "+this._new_color;}
Memo.prototype.delete_me=function(cal){$.post("ajax.php",{delMemo:this._id});for(i in cal._memos)
if(cal._memos[i]==this)
{cal._memos.splice(i,1);break;}}
function load_memo(id,date,t,remind,color,title,memo,cal)
{if(remind=='0')
remind=false;else
remind=true;change_color=false;if(color!=null)
change_color=true;time_array=time(t,false);ampm='pm';if(time_array[2])
ampm='am';return new_memo(id,null,null,null,date._d,date._m,date._y,String(time_array[0]),String(time_array[1]),ampm,remind,change_color,color,title,memo,cal,false);}
function new_memo(id,ed,em,ey,hd,hm,hy,hr,min,ampm,remind,change_color,new_color,title,memo,cal,isNew)
{if(hr==''||min==''||ampm=='undefined')
{popup('Please Select a time for the memo');return false;}
var isAM=true;if(ampm=='pm')
isAM=false;var date;if(hd!=''&&hm!=''&&hy!=''&&(hy%1==0)&&lastDayOfHebrewMonth(hm,hy)>=hd)
date=new HDate(hd,hm,hy);else if(ed!=''&&em!=''&&ey!=''&&(ey%1==0))
{var hours_24=Number(hr);if(ampm=='pm')
hours_24=hr+12;if(hr==12)
hours_24=hours_24-12;date=HDate_from_english(Number(ed),Number(em-1),Number(ey),hours_24,Math.round(min));}
else
{popup('Please either enter a valid jewish or secular date');return false;}
if(isNew&&remind&&date.isShabbosOrYontef())
{var d2=date.clone();d2.prev();if(d2.isShabbosOrYontef())
d2.prev();if(d2.isShabbosOrYontef())
d2.prev();popup('A reminder can not be sent on this date since it is either Shabbat or a Yom Tov. Instead, the reminder will be sent out on the morning of '+d2+' ('+d2.to_eng()+')');}
cal._memos.push(new Memo(id,date,hr,min,isAM,remind,change_color,new_color,title,memo));return true;};function Settings()
{this._rabbi_email='ploni@ploninet.com';}
Settings.instance=null;Settings.getInstance=function(){if(Settings.instance==null){Settings.instance=new Settings();}
return Settings.instance;}
Settings.prototype._carry_chodesh;Settings.prototype._email1;Settings.prototype._email2;Settings.prototype._phone;Settings.prototype._rabbi;Settings.prototype._rabbi_email;Settings.prototype._view;Settings.prototype._defaultView;Settings.prototype._explain;Settings.prototype._reminders;Settings.prototype._delay;Settings.prototype.toString=function(){return"carry chodesh: "+this._carry_chodesh;}
Settings.remindWhite=function(){if(this.getInstance()._reminders.substr(0,1)=='Y')
return true;return false;}
Settings.remindMikvah=function(){if(this.getInstance()._reminders.substr(1,1)=='Y')
return true;return false;}
Settings.remindOnah=function(){if(this.getInstance()._reminders.substr(2,1)=='Y')
return true;return false;}
Settings.remindHefsek=function(){if(this.getInstance()._reminders.substr(3,1)=='Y')
return true;return false;};function Month(m,y,cal)
{var month_name=getJewishMonthName(m,y);this._name=month_name+" "+y;this._length=lastDayOfHebrewMonth(m,y);this._days=new Array(this._length);this._m=m;this._y=y;var today;for(var d=1;d<=this._length;d++){this._days[d]=new Day(new HDate(d,m,y));this._days[d]._chag=month_name;}
this._days[1]._chag='Rosh Chodesh';var chag_date;for(holidayCounter=0;holidayCounter<56;holidayCounter++){chag_date=getJewishHolidayDate(holidayCounter,y);if(chag_date._m==m)
this._days[chag_date._d]._chag=getJewishHolidayName(holidayCounter);}
for(i in cal._events)
{if(cal._events[i]._date._m==m&&cal._events[i]._date._y==y)
{this._days[cal._events[i]._date._d]._events.push(cal._events[i]);if(cal._events[i]._type==_BENONIS_)
{this._days[cal._events[i]._date._d]._night_color=_YELLOW_;this._days[cal._events[i]._date._d]._day_color=_YELLOW_;}
else if(cal._events[i]._type==_CHODESH_)
{var onah=cal._events[i].chodesh_onah();if(onah==_NIGHT_)
this._days[cal._events[i]._date._d]._night_color=_YELLOW_;else
this._days[cal._events[i]._date._d]._day_color=_YELLOW_;}
else if(cal._events[i]._type==_HAFLAGAH_)
{if(cal._events[i]._onah==_NIGHT_)
this._days[cal._events[i]._date._d]._night_color=_YELLOW_;else
this._days[cal._events[i]._date._d]._day_color=_YELLOW_;}}}
var v;for(i in cal._veses){v=cal._veses[i];if(v._reeyah._y>y||(v._reeyah._y==y&&month_earlier_then(m,v._reeyah._m))){if(v._leadup_onah!=undefined&&v._leadup_onah!=null&&v._leadup_onah>0)
{if(v._leadup_date._y>y||(v._leadup_date._y==y&&month_earlier_then(m,v._leadup_date._m)))
continue;else if(v._leadup_date._y==y&&v._leadup_date._m==m)
{if(v._leadup_onah==_NIGHT_)
this._days[v._leadup_date._d]._night_color=_RED_;this._days[v._leadup_date._d]._day_color=_RED_;for(j=v._leadup_date._d+1;j<=this._length;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}}
else
for(j=1;j<=this._length;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}
continue;}
else
continue;}
if(v._mikvah._y<y||(v._mikvah._y==y&&month_earlier_then(v._mikvah._m,m)))
continue;var color=_RED_;var cur_day=1;if(v._reeyah._m==m&&v._reeyah._y==y){this._days[v._reeyah._d]._reeyah=v;if(v._onah==_NIGHT_)
this._days[v._reeyah._d]._night_color=_RED_;else if(this._days[v._reeyah._d]._mikvah!=undefined)
this._days[v._reeyah._d]._night_color=_BLUE_;this._days[v._reeyah._d]._day_color=_RED_;if(v._leadup_onah!=undefined&&v._leadup_onah!=null&&v._leadup_onah>0)
{if(v._leadup_date._m!=m||v._leadup_date._y!=y)
{for(j=1;j<=v._reeyah._d;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}}
else
{if(v._leadup_onah==_NIGHT_)
this._days[v._leadup_date._d]._night_color=_RED_;this._days[v._leadup_date._d]._day_color=_RED_;for(j=v._leadup_date._d+1;j<=v._reeyah._d;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}}}
color=_RED_;cur_day=v._reeyah._d;if(cur_day==this._length)
continue;else
cur_day=cur_day+1;}
if(v._hefsek._m==m&&v._hefsek._y==y){this._days[v._hefsek._d]._hefsek=v;for(j=cur_day;j<=v._hefsek._d;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}
cur_day=v._hefsek._d;if(cur_day==this._length)
continue;else
cur_day=cur_day+1;}
else{if(cur_day>1)
{for(j=cur_day;j<=this._length;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}
continue;}}
if(this._days[1]._date.is_later_then(v._reeyah)&&v._hefsek.is_later_then(this._days[this._length]._date))
for(j=1;j<=this._length;j++)
{this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}
else if(v._hefsek_confirmed){color=_WHITE_;var already_colored_whites=false;for(j in cal._veses){v2=cal._veses[j];if(v2!=v&&!v._hefsek.is_later_then(v2._reeyah)&&!v2._reeyah.is_later_then(v._mikvah))
{already_colored_whites=true;if(month_earlier_then(v2._reeyah._m,m))
break;if(v2._reeyah._m==m)
end=v2._reeyah._d;else
end=this._length+1;for(k=cur_day;k<end;k++){this._days[k]._night_color=_WHITE_;this._days[k]._day_color=_WHITE_;}
if(v2._onah==_DAY_&&v2._reeyah._m==m)
this._days[v2._reeyah._d]._night_color=_WHITE_;break;}}
if(!already_colored_whites)
{if(v._mikvah._m==m&&v._mikvah._y==y){this._days[v._mikvah._d]._mikvah=v;this._days[v._mikvah._d]._night_color=_BLUE_;for(j=cur_day;j<v._mikvah._d;j++){this._days[j]._night_color=_WHITE_;this._days[j]._day_color=_WHITE_;}}
else
{for(j=cur_day;j<=this._length;j++){this._days[j]._night_color=_WHITE_;this._days[j]._day_color=_WHITE_;}}}
else if(v._mikvah._m==m&&v._mikvah._y==y)
this._days[v._mikvah._d]._mikvah=v;}}
if(m==7)
{if(this._days[10]._night_color==_GREEN_)
this._days[10]._night_color=_YELLOW_;if(this._days[10]._day_color==_GREEN_)
this._days[10]._day_color=_YELLOW_;}
else if(m==5)
{var tisha_bav=getJewishHolidayDate(30,y);if(this._days[tisha_bav._d]._night_color==_GREEN_)
this._days[tisha_bav._d]._night_color=_YELLOW_;if(this._days[tisha_bav._d]._day_color==_GREEN_)
this._days[tisha_bav._d]._day_color=_YELLOW_;}
for(i in cal._memos)
{var memo=cal._memos[i];if(memo._date._m==m&&memo._date._y==y)
{this._days[memo._date._d]._memos.push(new Array(memo,i));if(memo._force_color)
{if(memo._onah==_NIGHT_)
this._days[memo._date._d]._night_color=Number(memo._color);else if(memo._onah==_DAY_)
this._days[memo._date._d]._day_color=Number(memo._color);}}}
var start_day=this._days[1];start_month=getGregorianMonthName(start_day._date.to_eng_array()[1]);end_month=getGregorianMonthName(this._days[this._length]._date.to_eng_array()[1]);end_year=(String)(this._days[this._length]._date.to_eng_array()[2]);start_year=(String)(start_day._date.to_eng_array()[2]);if(start_month=="December"&&end_month=="January")
this._eng_name=start_month+" '"+start_year.substring(2)+" - "+end_month+" '"+end_year.substring(2);else if(start_month!=end_month)
this._eng_name=start_month+" - "+end_month+" "+end_year;else
this._eng_name=start_month+" "+end_year;}
Month.prototype._eng_name;Month.prototype._name;Month.prototype._length;Month.prototype._days;Month.prototype._m;Month.prototype._y;Month.prototype.toString=function(){output="<script type='text/javascript'>top.frames[1].cal._selected_offset=0;</script>";output+="<image src='./images/header.gif' style='margin-left:2px;'><br>"
output+="<table style='font:Verdana, Arial, Helvetica, sans-serif; font-size:9px' width='678' border='0' cellpadding='0' cellspacing='2'> <tr>";var weekday_of_roshchodesh=this._days[1]._date.get_dow();var i=1;for(weekday=1;weekday<8;weekday++){if(weekday<weekday_of_roshchodesh)
output+="<td></td>";else
{output+=this._days[i].output_html();i++;}}
output+="</tr>";for(var row=2;row<7;row++){output+="<tr>";for(var col=1;col<8;col++){output+=this._days[i].output_html();i++;if(i>this._length)
break;}
output+="</tr>";if(i>this._length)
break;}
return output+"</table>";}
Month.prototype.mini_view=function(is_month_view){var output=getJewishMonthName(this._m,this._y);output+="</div><table ";if(is_month_view)
output+="onClick=\"top.frames[1].cal.jump("+this._m+","+this._y+");top.frames[1].draw();cur_view.innerHTML='Month';\" onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\" style='font:Verdana, Arial, Helvetica, sans-serif; font-size:9px'  width='160' height='100' border='0' cellpadding='0'  cellspacing='1'> <tr>";else
output+="onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='default'\" style='font:Verdana, Arial, Helvetica, sans-serif; font-size:9px'  width='160' height='100' border='0' cellpadding='0'  cellspacing='1'> <tr>";var weekday_of_roshchodesh=this._days[1]._date.get_dow();var i=1;for(weekday=1;weekday<8;weekday++){if(weekday<weekday_of_roshchodesh)
output+="<td></td>";else
{output+="<td style='background-image:url(./images/days/mini/"+this._days[i].get_bg_image(true)+"); background-position:center' align='center'>"+this._days[i]._date._d+"</td>";i++;}}
output+="</tr>";for(var row=2;row<7;row++){output+="<tr>";for(var col=1;col<8;col++){output+="<td style='background-image:url(./images/days/mini/"+this._days[i].get_bg_image(true)+"); background-position:center' align='center'>"+this._days[i]._date._d+"</td>";i++;if(i>this._length)
return output+"</tr></table>";}
output+="</tr>";}
output+="</table>";return output;}
Month.prototype.dateSelector=function(){var output="</div><table ";output+="onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='default'\" style='font-size:9px;margin-top:-5px;'  width='160' height='95' border='0' cellpadding='0'  cellspacing='1'> <tr>";var weekday_of_roshchodesh=this._days[1]._date.get_dow();var i=1;for(weekday=1;weekday<8;weekday++){if(weekday<weekday_of_roshchodesh)
output+="<td></td>";else
{output+="<td style='background-image:url(./images/days/mini/"+this._days[i].get_bg_image(true)+"); background-position:center' align='center' onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\"  onclick=setHebDate("+this._days[i]._date._d+");><span style='font-family:Lucida Sans Unicode;font-size:9px;'>"+this._days[i]._date._d+"</span></td>";i++;}}
output+="</tr>";for(var row=2;row<7;row++){output+="<tr>";for(var col=1;col<8;col++){output+="<td style='background-image:url(./images/days/mini/"+this._days[i].get_bg_image(true)+"); background-position:center' align='center' onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\"  onclick=setHebDate("+this._days[i]._date._d+");><span style='font-family:Lucida Sans Unicode;font-size:9px;'>"+this._days[i]._date._d+"</span></td>";i++;if(i>this._length)
return output+"</tr></table>";}
output+="</tr>";}
output+="</table>";return output;}
function EnglishDateSelector(m,y,clickFn){if(clickFn===undefined||clickFn=='')
clickFn='setEngDate';hebrewFromAbsolute(absoluteFromGregorian(1,m,y));var hebrew_date=new HDate(returnDateDay,returnDateMonth,returnDateYear);hebrew_month=new top.frames[1].Month(hebrew_date._m,hebrew_date._y,top.frames[1].cal);d=hebrew_date._d;var output="</div><table ";output+="onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='default'\" style='font:Verdana, Arial, Helvetica, sans-serif; font-size:9px;margin-top:-5px;'  width='160' height='95' border='0' cellpadding='0'  cellspacing='1'> <tr>";var weekday_of_roshchodesh=hebrew_date.get_dow();var i=1;for(weekday=1;weekday<8;weekday++){if(weekday<weekday_of_roshchodesh)
output+="<td></td>";else
{dayCol=hebrew_month._days[d]._day_color;d++;if(d>hebrew_month._length)
{d=1;hebrew_date.next_mo();hebrew_month=new top.frames[1].Month(hebrew_date._m,hebrew_date._y,top.frames[1].cal);}
nightCol=hebrew_month._days[d]._night_color;output+="<td style='background-image:url(./images/days/mini/"+get_english_bg_image(dayCol,nightCol)+"); background-position:center' align='center' onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\"  onclick='"+clickFn+"("+i+");'><span style='font-family:Lucida Sans Unicode;font-size:9px;'>"+i+"</span></td>";i++;}}
output+="</tr>";for(var row=2;row<7;row++){output+="<tr>";for(var col=1;col<8;col++){dayCol=hebrew_month._days[d]._day_color;d++;if(d>hebrew_month._length)
{d=1;hebrew_date.next_mo();hebrew_month=new top.frames[1].Month(hebrew_date._m,hebrew_date._y,top.frames[1].cal);}
nightCol=hebrew_month._days[d]._night_color;output+="<td style='background-image:url(./images/days/mini/"+get_english_bg_image(dayCol,nightCol)+"); background-position:center' align='center' onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\"  onclick="+clickFn+"("+i+");><span style='font-family:Lucida Sans Unicode;font-size:9px;'>"+i+"</span></td>";i++;if(i>lastDayOfGregorianMonth(m,y))
return output+"</tr></table>";}
output+="</tr>";}
output+="</table>";return output;}
function get_english_bg_image(day_color,night_color)
{var image_name='';switch(day_color){case _GREEN_:image_name='g';break;case _RED_:image_name='r';break;case _YELLOW_:image_name='y';break;case _WHITE_:image_name='w';break;case _BLUE_:image_name='b';break;default:image_name='x';}
switch(night_color){case _GREEN_:image_name+='g';break;case _RED_:image_name+='r';break;case _YELLOW_:image_name+='y';break;case _WHITE_:image_name+='w';break;case _BLUE_:image_name+='b';break;default:image_name+='x';}
return image_name+".png";}
Month.prototype.get_m_and_y=function(){return this._days[1]._date._m+" "+this._days[1]._date._y;}
Month.prototype.equals=function(other){if(this._m==other._m&&this._y==other._y)
return true;return false;};var confirm_result;function popup(string,title)
{if(title===undefined)
title='Error'
top.frames[1].jAlert(string,title);}
function popup_okcancel(string,ok_function)
{if(string==1)
string='If you delete this memo a reminder will <strong>not</strong> be sent.<br>Do you still want to delete this memo?';string="<div align='center'>"+string+"</div>";jConfirm(string,'Confirmation Required',function(r){if(r)ok_function();});}
function findPos(obj){var curleft=curtop=0;if(obj.offsetParent){do{curleft+=obj.offsetLeft;curtop+=obj.offsetTop;}while(obj=obj.offsetParent);}
return[curleft,curtop];}
function hide_view_menu()
{if(win.style.display=='block')
win.style.display='none';}
function view_name(command)
{if(command=='year')
return'Annual';else if(command=='table')
return'Table';else if(command=='charts')
return'Charts';return'Month';}
function show_view_menu(command,cal)
{if(win.style.display!='block')
{pos=findPos(cur_view);win.style.left=(String)(pos[0]+3)+'px';win.style.top='37px'
setTimeout("win.style.display='block'",200);}
else
{if(typeof cal!=="undefined")
{cal._settings._view=command;cur_view.innerHTML=view_name(command);this.selectedIndex=0;draw();}
win.style.display='none';}
return false;}
function tooltip(text)
{var ttip='';if(text=="Haflagah"||text=="haflagah")
ttip="Interval (number of days) time frame beginning  with the first day after a successful Hefsek Taharah to the first day of the subsequent  period (inclusive)";else if(text=="Bedikah"||text=="bedikah")
ttip="Self administered, halachic internal examination  (pl. bedikot) done with a pure white, cotton, pre-washed cloth";else if(text=="harhakot"||text=="harchakot")
ttip="Restrictions designed to minimize the  possibility of physical contact between a couple while the wife is nidah";else if(text=="hefsek taharah"||text=="Hefsek Taharah")
ttip="Internal examination to establish that  uterine bleeding has ceased (also called hefsek)";else if(text=="onah"||text=="Onah")
ttip="Literally, a time frame (pl. onot) one day or  night, measured from sunrise to sunset or from sunset to sunrise";else if(text=="onot"||text=="Onot")
ttip="Literally, time frames (sing. onah) measured from sunrise to sunset or from sunset to sunrise";else if(text=="harhakot"||text=="harchakot")
ttip="Restrictions designed to minimize the  possibility of physical contact between a couple while the wife is nidah";if(ttip!='')
return"<span style='border-bottom:1px dotted #770;' title='"+ttip+"'>"+text+"</span>";else
return text;}
function buttons(txt_array,code_array,height)
{var mrgLeft='154';if(txt_array.length==2)
mrgLeft='110';var str="<div style=\"position:absolute;left:"+mrgLeft+"px; top:"+height+"px\">";str+="<div onselectstart='event.returnValue=false;' id='btn' class='btn' onMouseUp=\"this.className = 'btn2';";str+=code_array[0]+"\"";str+="onMouseDown=\"this.className = 'btn3';if (event.preventDefault) {event.preventDefault();}return false;\" ";str+="onMouseOver=\"this.className = 'btn2';\" onMouseOut=\"this.className = 'btn';\">"+txt_array[0]+"</div>";if(txt_array.length==1)
return str+"</div>";str+="<div style='margin-left:8px;' onselectstart='event.returnValue=false;' id='btn' class='btn'  ";str+="onMouseUp=\"this.className = 'btn2';"+code_array[1]+"\"";str+="onMouseDown=\"this.className = 'btn3';if (event.preventDefault) {event.preventDefault();}return false;\" ";str+="onMouseOver=\"this.className = 'btn2';\" onMouseOut=\"this.className = 'btn';\">"+txt_array[1]+"</div>";return str+"</div>";}
function right_click(id,action,cal)
{var dom=id.substring(4);cal._selected_day=dom;var day=cal._month._days[dom];cal._selected_offset=771;if(action=='show')
new_popup_win_fromString();else if(action=='reeyah')
new_reeyah();else if(action=='memo')
{$(document).ready(function(){tb_show("",'new_note.html?KeepThis=true&TB_iframe=true&height=500&width=400&modal=true',"");});return;}
else if(action=='trip')
{$(document).ready(function(){tb_show("",'new_trip.php?KeepThis=true&TB_iframe=true&height=265&width=400&modal=true',"");});return;}
else
alert('unknown action: '+action);}
function drop(endX,endY)
{cal._selected_offset=770;var v=null;for(i in cal._veses)
if(!cal._veses[i]._hefsek_confirmed)
{v=cal._veses[i];break;}
if(v==null)
return;var new_day=0;var x=cal._month._days[v._hefsek._d]._leftX+endX;var y=cal._month._days[v._hefsek._d]._topY+endY;for(i=1;i<=cal._month._length;i++)
if(cal._month._days[i].contains_pixel(x,y))
{new_day=i;break;}
if(new_day!=0)
{var offset=new_day-v._hefsek._d;cal._selected_offset=offset;var date=v._hefsek.clone();var mikvah=v._mikvah.clone();if(offset>0)
for(i=0;i<offset;i++)
{date.next();mikvah.next();}
else
for(i=0;i<(offset*-1);i++)
{date.prev();mikvah.prev();}
var d=new Date();var now=HDate_from_english(d.getDate(),d.getMonth(),d.getFullYear(),d.getHours(),d.getMinutes());if(v._reeyah.is_later_then(date))
{popup("Please ensure the hefsek taharah is after the flow");cal._selected_offset=770;refresh();}
else if(date.is_later_then(now))
{popup("Please ensure the Hefsek Taharah is not a future date");cal._selected_offset=770;refresh();}
else
{v._hefsek=date;v._mikvah=mikvah;}}
else
{var last_mo=document.getElementById('last_mo');var next_mo=document.getElementById('next_mo');var ht_div=document.getElementById('ht_1');var abs_x=findPosX(ht_div);var abs_y=findPosY(ht_div);if(abs_x>=findPosX(last_mo)&&abs_x<=(findPosX(last_mo)+last_mo.offsetWidth)&&abs_y>=findPosY(last_mo)&&abs_y<=(findPosY(last_mo)+last_mo.offsetHeight))
{var date=v._hefsek.clone();date.prev_mo();date._d=1;var mikvah=date.clone();mikvah.add_days(8);var test=date.clone();test._d=v._reeyah._d+1;if(v._reeyah.is_later_then(test))
{popup("Please ensure the hefsek taharah is after the flow");refresh();}
else
{if(date._m==v._reeyah._m&&date._y==v._reeyah._y)
{min_ht=v.getEarliestHtNumber()
date._d=v._reeyah._d+min_ht;if(date._d>lastDayOfHebrewMonth(date._m,date._y))
date._d=lastDayOfHebrewMonth(date._m,date._y);}
v._hefsek=date;mikvah=date.clone();mikvah.add_days(8);v._mikvah=mikvah;prev();refresh();}}
else if(abs_x>=findPosX(next_mo)&&abs_x<=(findPosX(next_mo)+next_mo.offsetWidth)&&abs_y>=findPosY(next_mo)&&abs_y<=(findPosY(next_mo)+next_mo.offsetHeight))
{var date=v._hefsek.clone();date.next_mo();date._d=1;var mikvah=date.clone();mikvah.add_days(8);v._hefsek=date;v._mikvah=mikvah;next();refresh();}}}
function findPosX(obj)
{var curleft=0;if(obj.offsetParent)
{while(obj.offsetParent)
{curleft+=obj.offsetLeft
obj=obj.offsetParent;}}
else if(obj.x)
curleft+=obj.x;return curleft;}
function findPosY(obj)
{var curtop=0;if(obj.offsetParent)
{while(obj.offsetParent)
{curtop+=obj.offsetTop
obj=obj.offsetParent;}}
else if(obj.y)
curtop+=obj.y;return curtop;}
function move_unconfirmed_ht(){cal=top.frames[1].cal;if(cal._veses.length>0&&!cal._veses[cal._veses.length-1]._hefsek_confirmed)
{v=cal._veses[cal._veses.length-1];var date=v._hefsek.clone();date._m=cal._selected_month;date._y=cal._selected_year;date._d=1;earliest_ht_date=v.getEarliestHtDate();if(date.is_later_then(v._reeyah))
{if(earliest_ht_date.is_later_then(date))
date=earliest_ht_date;var mikvah=date.clone();mikvah.add_days(8);v._hefsek=date;v._mikvah=mikvah;refresh();return true;}
if(date._m==v._reeyah._m&&date._y==v._reeyah._y)
{date=earliest_ht_date;var mikvah=date.clone();mikvah.add_days(8);v._hefsek=date;v._mikvah=mikvah;refresh();return true;}}
return false;};function pad(str)
{if(Number(str)<10)
return"0"+str;return str;}
function reminder_new_reeyah(veses)
{var eng_dateArray=veses._reeyah.to_eng_array();var english_date=eng_dateArray[2]+"-"+pad(eng_dateArray[1])+"-"+pad(eng_dateArray[0]);var day=new Day(veses._reeyah);var offsetList='';for(i in day._locations)
offsetList+="#"+day._locations[i].get_gmt_offset(day._date);$.post("ajax.php",{delete_reminders_past:english_date,veses:veses._id,time:veses._time,offsets:offsetList});}
function set_reminder(type,veses,day,onah,misc,reeyah_time,send_reminder)
{if(send_reminder===undefined)
send_reminder=true;if(misc===undefined)
misc='';var dateStr=day._date;if(onah==_DAY_)
{dateStr+=" ("+day._date.to_eng()+")";var eng_dateArray=day._date.to_eng_array();}
else if(onah==_NIGHT_)
{dateStr+=" (night of "+day._date.to_eng_night()+")";var eng_dateArray=day._date.to_eng_night_array();}
else if(onah==_NIGHT_AND_DAY_)
{dateStr+=" (night of "+day._date.to_eng_night()+" and day of "+day._date.to_eng()+")";var eng_dateArray=day._date.to_eng_night_array();}
else
{alert('undefined onah: '+misc);return;}
var english_date=eng_dateArray[2]+"-"+pad(eng_dateArray[1])+"-"+pad(eng_dateArray[0]);erev_chag_or_shabbos='';d=day._date.clone();if(d.isShabbosOrYontef())
{while(d.isShabbosOrYontef())
d.prev();eng_dateArray2=d.to_eng_array();erev_chag_or_shabbos=eng_dateArray2[2]+"-"+top.frames[1].pad(eng_dateArray2[1])+"-"+top.frames[1].pad(eng_dateArray2[0]);}
if(reeyah_time==null||reeyah_time==-1)
reeyah_time='';var loc_data=new Array("","","","","");var delay=top.frames[1].Settings.getInstance()._delay*-60;for(i in day._locations)
{var name_array=day._locations[i]._name.split(",");loc_data[0]+="#"+name_array[0];offset=day._locations[i].get_gmt_offset(day._date)-delay;loc_data[1]+="#"+offset;loc_data[2]+="#"+top.frames[1].get_zman(day,1,i);loc_data[3]+="#"+top.frames[1].get_zman(day,2,i);loc_data[4]+="#"+top.frames[1].get_zman(day,3,i);}
$.post("ajax.php",{reminder_type:type,veses_id:veses._id,date:dateStr,eng_date:english_date,onah:onah,loc_name:loc_data[0],loc_gmt:loc_data[1],loc_shkiah1:loc_data[2],loc_netz:loc_data[3],loc_shkiah2:loc_data[4],misc:misc,misc2:reeyah_time,erev_chag_or_shabbos:erev_chag_or_shabbos,send_reminder:send_reminder});}
function reminder_update_locations()
{$.post("ajax.php",{get_Reminders:true},function(data)
{for(i in data.reminders)
{var reminder=data.reminders[i];var day=new Day(new HDate(reminder.d,reminder.m,reminder.y));var locations='';for(i in day._locations)
{var name_array=day._locations[i]._name.split(",");locations+="#"+name_array[0];}
if(locations!=reminder.loc_names)
{var loc_data=new Array("","","","","");var delay=top.frames[1].Settings.getInstance()._delay*-60;for(i in day._locations)
{offset=day._locations[i].get_gmt_offset(day._date)-delay;loc_data[1]+="#"+offset;loc_data[2]+="#"+top.frames[1].get_zman(day,1,i);loc_data[3]+="#"+top.frames[1].get_zman(day,2,i);loc_data[4]+="#"+top.frames[1].get_zman(day,3,i);}
$.post("ajax.php",{update_Reminders:reminder.id,loc_name:locations,loc_gmt:loc_data[1],loc_shkiah1:loc_data[2],loc_netz:loc_data[3],loc_shkiah2:loc_data[4]});}}},"json");};var odd;var rows;var avg=0;var plot_pg=1;function flip_charts()
{if(plot_pg==1)
plot_pg=2;else
plot_pg=1;}
function plot(cal)
{if(plot_pg==1)
{$(function(){x=1;var last=null;var chart_data=new Array();var total=0;var sum=0;chart_data.push(new Array(0,30));for(i in cal._veses)
{if(i==0)
continue;var r1=cal._veses[i-1]._reeyah;var r2=cal._veses[i]._reeyah.clone();var c=0;while(r2.is_later_then(r1))
{c++;r2.prev();}
if(c<120)
{chart_data.push(new Array(x,c));total++;sum=sum+c;}
else
chart_data.push(null);x++;}
if(total>0)
avg=Math.round((sum/total)*100)/100;setTimeout("document.getElementById('flow_length').innerHTML = avg;",300);$.plot($("#chart_view"),[chart_data],{lines:{show:true},points:{show:true},xaxis:{ticks:cal._veses.length-1,tickDecimals:0}});});}
else if(plot_pg==2)
{$(function(){x=1;var last=null;var chart_data=new Array();var total=0;var sum=0;chart_data.push(new Array(0,5));for(i in cal._veses)
{var r=cal._veses[i]._reeyah.clone();var ht=cal._veses[i]._hefsek.clone();var c=1;while(ht.is_later_then(r))
{c++;ht.prev();}
if(c<120)
{chart_data.push(new Array(x,c));total++;sum=sum+c;}
else
chart_data.push(null);x++;}
if(total>0)
avg=Math.round((sum/total)*100)/100;setTimeout("document.getElementById('flow_length').innerHTML = avg;",300);$.plot($("#chart_view"),[chart_data],{lines:{show:true,fill:true,fillColor:"rgba(230, 183, 192, 0.3)"},points:{show:true},xaxis:{ticks:cal._veses.length-1,tickDecimals:0},yaxis:{tickDecimals:0},colors:["#E6B7C0"]});});}}
function table_view(cal)
{output="<div  id = 'table_view' style='width:850px; height:565px;' ><table align='center'><thead><tr class='odd'><th scope='col'>Hebrew Date </th><th scope='col'>English Date </th><th scope='col'>Event</th><th scope='col'>Notes</th></tr></thead> <tbody>";if(cal._veses.length==0)
return output+"</tbody></table></div>";update_table();odd='<tr>';if((cal._page_num-1)*20>=rows.length-1)
cal._page_num--;var end=Math.min((cal._page_num*20)-1,rows.length-1);for(i=0+(cal._page_num-1)*20;i<=end;i++)
{output+=odd+"<td>"+rows[i][0]+"</td><td>"+
rows[i][1]+"</td><td>"+
rows[i][2]+"</td><td>"+rows[i][3]+"</td></tr>";swap_odd();}
output+="</tbody></table></div>";return output;}
function swap_odd()
{if(odd=='<tr>')
odd="<tr class='odd'>";else
odd='<tr>';}
function update_table()
{rows=new Array();var type_names=new Array("Flow","Stain","Medical procedure","Unclean Bedikah","Birth","Birth","Miscarriage","Flow");for(i in cal._veses)
{var type=type_names[cal._veses[i]._cause];rows.push(new Array(cal._veses[i]._reeyah,cal._veses[i]._reeyah.to_eng(),type,'Occured during '+_ONAH_NAMES_[cal._veses[i]._onah]+' at '+cal._month._days[1].format_time(cal._veses[i]._time)));if(cal._veses[i]._hefsek_confirmed)
rows.push(new Array(cal._veses[i]._hefsek,cal._veses[i]._hefsek.to_eng(),"Hefsek Taharah",''));}
rows.sort(HDate_Sort);rows.reverse();}
function HDate_Sort(a,b)
{if(a[0].is_later_then(b[0]))
return 1;if(a[0].equals(b[0]))
return 0;return-1;};var kavuah_reeyahs;var kavuah_text;var last_veses,before_last_veses;function find_kavuah(veses,cal){if(cal._veses.length<3)
return false;last_veses=veses.get_prev_veses(cal,true);before_last_veses=last_veses.get_prev_veses(cal,true);kavuah_text="<div class='title' style='margin-top:0px;margin-left:-20px'>You may have a Fixed Cycle!</div><div align='left' style='width:380px'><br>";kavuah_reeyahs=new Array();var result=false;if(find_chodesh_kavuah(veses,cal))
result=true;if(find_dilug(veses,cal))
result=true;if(find_sirug(veses,cal))
result=true;for(i in veses._haflagas)
if(veses._haflagas[i][1]>2&&veses._haflagas[i][2]==veses)
{kavuah_text+="A Fixed cycle (veses kavuah) has been  established by three flows all having haflagah number "+veses._haflagas[i][0];kavuah_text+=".<br><br>";result=true;}
if(result)
{kavuah_text+="<br>Please have a rabbi review your calendar in order to confirm this and instruct you how to keep";kavuah_text+=" a calendar with a <strong>fixed</strong> cycle. You should inform the rabbi if you have given birth in the past 24 months. If the rabbi";kavuah_text+=" confirms that you do have a fixed cycle then your online calendar will no longer calculate your onot of anticipation";kavuah_text+=" correctly until you have completely uprooted the fixed cycle. Until that time you may enter your flows and manually enter the dates of separation according to the dates the rav has given you using the memos. You will be reminded of the onot of separation in the manner you choose by clicking the \"Remind Me\" option when entering the memo.";kavuah_text+="</div>";kavuah_text+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),460);}
return result;}
function find_sirug(veses,cal)
{var found_kavuah=false;var reeyahs=new Array();for(i in cal._veses)
if(!cal._veses[i]._kessem)
reeyahs.push(new Array(cal._veses[i]._reeyah,cal._veses[i]._reeyah.get_dow(),i));reeyahs.sort(HDate_Sort);reeyahs.reverse();var max_pattern_length=Math.floor(reeyahs.length/3);for(pattern_length=1;pattern_length<=max_pattern_length;pattern_length++)
{var gaps=new Array();var failed=false;for(i=0;i<pattern_length;i++)
{var r1=reeyahs[i];var r2=reeyahs[i+pattern_length];var r3=reeyahs[i+(2*pattern_length)];if(r1[1]==r2[1]&&r1[1]==r3[1])
{gaps[i]=weeks_inbetween(r1[0],r2[0],r3[0]);if(gaps[i]==-1)
{failed=true;break;}}
else
{failed=true;break;}}
if(!failed)
{found_kavuah=true;var next_chashash=reeyahs[pattern_length-1][0].clone();for(x=0;x<(gaps[pattern_length-1]*7);x++)
next_chashash.next();if(pattern_length==1)
{kavuah_text+="A regularly spaced cycle (veses hasirug) has been  established for stringency. ";kavuah_text+="This pattern is due to a gap of "+gaps[0]+" weeks";kavuah_text+=" between each of the past three flows. Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+next_chashash;kavuah_text+=". This pattern was established by flows occurring between the "+reeyahs[2][0];kavuah_text+=" ("+reeyahs[2][0].to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";}
else
{var pattern_str=gaps[pattern_length-1];for(x=pattern_length-2;x>0;x--)
pattern_str+=", "+gaps[x];pattern_str+=" and "+gaps[0];kavuah_text+="An alternating regularly spaced cycle (veses hasirug) has been  established for stringency. ";kavuah_text+="This pattern is due to gaps of "+pattern_str+" weeks over the last "+pattern_length*3+" flows";kavuah_text+=". Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+next_chashash;kavuah_text+=" (since this will be "+gaps[pattern_length-1]+" weeks from the flow on the"+reeyahs[pattern_length-1][0];kavuah_text+="). This pattern was established by flows occurring between the "+reeyahs[(3*pattern_length)-1][0];kavuah_text+=" ("+reeyahs[(3*pattern_length)-1][0].to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";}}
var gaps_dom=new Array();var failed_dom=false;for(i=0;i<pattern_length;i++)
{var r1=reeyahs[i];var r2=reeyahs[i+pattern_length];var r3=reeyahs[i+(2*pattern_length)];if(r1[0]._d==r2[0]._d&&r1[0]._d==r3[0]._d)
{var d=r3[0].clone();var gap=0;while(!d.equals(r2[0])&&gap<12)
{gap=gap+1;d.next_mo();}
var gap2=0;while(!d.equals(r1[0])&&gap2<12)
{gap2=gap2+1;d.next_mo();}
if(gap2!=gap||gap<2)
{failed_dom=true;break;}
else
gaps_dom[i]=gap;}
else
failed_dom=true;}
if(!failed_dom)
{if(pattern_length==1)
{found_kavuah=true;var chashash=reeyahs[0][0].clone();var c=0;while(c<gaps_dom[0])
{c++;chashash.next_mo();}
kavuah_text+="A regularly spaced cycle (veses hasirug) has been  established for stringency. ";kavuah_text+="This pattern is due to a gap of excactly "+gaps_dom[0]+" months";kavuah_text+=" between each of the past three flows. Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+chashash;kavuah_text+=". This pattern was established by flows occurring between the "+reeyahs[2][0];kavuah_text+=" ("+reeyahs[2][0].to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";}
else
{var different_days=true;for(a=1;a<pattern_length;a++)
if(reeyahs[a-1][0]._d==reeyahs[a][0]._d)
{different_days=false;break;}
if(different_days)
{var pattern_str='';for(i=pattern_length-1;i>=0;i--)
if(pattern_str=='')
pattern_str+=reeyahs[i][0]._d;else
pattern_str+=", "+reeyahs[i][0]._d;var next_chashash=reeyahs[pattern_length-1][0].clone();var c=0;while(c<gaps_dom[pattern_length-1])
{c++;next_chashash.next_mo();}
found_kavuah=true;kavuah_text+="An alternating regularly spaced cycle (veses hasirug) has been  established for stringency. ";kavuah_text+="This pattern of flows on days "+pattern_str+" has repeated itself three times over the past ";kavuah_text+=pattern_length*3+" flows. "
kavuah_text+="Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+next_chashash;kavuah_text+=". This pattern was established by flows occurring between the "+reeyahs[(3*pattern_length)-1][0];kavuah_text+=" ("+reeyahs[(3*pattern_length)-1][0].to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";}
else
{var good_pattern=true;var show_onahs_for=new Array();for(i=1;i<pattern_length;i++)
{if(reeyahs[i-1][0]._d==reeyahs[i][0]._d)
{show_onahs_for.push(i);show_onahs_for.push(i-1);if(cal._veses[reeyahs[i-1][2]]._onah==cal._veses[reeyahs[i][2]]._onah||cal._veses[reeyahs[i-1][2]]._onah!=cal._veses[reeyahs[i-1+pattern_length][2]]._onah||cal._veses[reeyahs[i-1][2]]._onah!=cal._veses[reeyahs[i-1+(2*pattern_length)][2]]._onah||cal._veses[reeyahs[i][2]]._onah!=cal._veses[reeyahs[i+pattern_length][2]]._onah||cal._veses[reeyahs[i][2]]._onah!=cal._veses[reeyahs[i+(2*pattern_length)][2]]._onah)
{good_pattern=false;break;}}}
if(good_pattern)
{var pattern_str='';var comma="";var reeyah;for(i=pattern_length-1;i>=0;i--)
{reeyah=reeyahs[i][0]._d;for(j in show_onahs_for)
if(i==j)
{reeyah=_ONAH_NAMES_[cal._veses[reeyahs[i][2]]._onah]+" of day "+reeyah;break;}
pattern_str+=comma+reeyah;if(i==pattern_length-1)
comma=', ';}
var next_chashash=reeyahs[pattern_length-1][0].clone();var c=0;while(c<gaps_dom[pattern_length-1])
{c++;next_chashash.next_mo();}
var next_chashash_str=next_chashash.toString();for(i in show_onahs_for)
if(i==pattern_length-1)
{next_chashash_str=_ONAH_NAMES_[cal._veses[reeyahs[i][2]]._onah]+" of the "+next_chashash_str;break;}
found_kavuah=true;kavuah_text+="An alternating regularly spaced cycle (veses hasirug) has been  established for stringency. ";kavuah_text+="This pattern of flows on the following days of the month: ";kavuah_text+=pattern_str+" has repeated itself three times over the past ";kavuah_text+=pattern_length*3+" flows. "
kavuah_text+="Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+next_chashash_str;kavuah_text+=". This pattern was established by flows occurring between the "+reeyahs[(3*pattern_length)-1][0];kavuah_text+=" ("+reeyahs[(3*pattern_length)-1][0].to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";}}}}}
return found_kavuah;}
function find_dilug(veses,cal)
{var d1=veses._reeyah._d;var m1=veses._reeyah._m;var h1=get_min_haflagah(veses);var o1=veses._onah;var d2=last_veses._reeyah._d;var m2=last_veses._reeyah._m;if(h1!=null)
var h2=get_min_haflagah(last_veses);var o2=last_veses._onah;var d3=before_last_veses._reeyah._d;var m3=before_last_veses._reeyah._m;if(h2!=null)
var h3=get_min_haflagah(before_last_veses);var o3=before_last_veses._onah;var temp=veses._reeyah.clone();temp.prev_mo();var delta_DOM_direction=null
var delta_DOM=0;var delta_DOM_onahs=0;if(m2==temp._m)
{if(d1>d2||(d1==d2&&o1==_DAY_&&o2==_NIGHT_))
{delta_DOM_direction='ascending';delta_DOM=d1-d2;delta_DOM_onahs=2*delta_DOM;if(o1==_NIGHT_)
delta_DOM_onahs=delta_DOM_onahs+1;if(o2==_NIGHT_)
delta_DOM_onahs=delta_DOM_onahs-1;}
else if(d1!=d2||(d1==d2&&o1!=o2))
{delta_DOM_direction='descending';delta_DOM=d2-d1;delta_DOM_onahs=2*delta_DOM;if(o2==_NIGHT_)
delta_DOM_onahs=delta_DOM_onahs+1;if(o1==_NIGHT_)
delta_DOM_onahs=delta_DOM_onahs-1;}}
var delta_Span_direction=null
var delta_Span=0;var delta_Span_onahs=0;if(h1!=null&&h2!=null&&h1!=h2)
{if(h1>h2)
{delta_Span_direction='ascending';delta_Span_onahs=h1-h2;delta_Span=Math.ceil(h1/2)-Math.ceil(h2/2);}
else if(h2>h1)
{delta_Span_direction='descending';delta_Span_onahs=h2-h1;delta_Span=Math.ceil(h2/2)-Math.ceil(h1/2);}}
temp=last_veses._reeyah.clone();temp.prev_mo();var found_kavuah=false;if(m3==temp._m&&delta_DOM_direction!=null)
{if(d2>d3||(d2==d3&&o2==_DAY_&&o3==_NIGHT_))
{if(delta_DOM_direction=='ascending'&&delta_DOM==(d2-d3))
{var chashash=veses._reeyah.clone();chashash.next_mo();var next_month=chashash._m;chashash.add_days(delta_DOM);if(chashash._m==next_month)
{kavuah_text+="An incremental fixed cycle (veses hadilug) has been  established for stringency. ";kavuah_text+="This pattern is due to a gap of "+(d2-d3)+" day";if((d2-d3)>1)
kavuah_text+="s";kavuah_text+=" between each monthly flow. Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+chashash;kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}}
else
{var delta_DOM_onahs2=2*(d2-d3);if(o2==_NIGHT_)
delta_DOM_onahs2=delta_DOM_onahs2+1;if(o3==_NIGHT_)
delta_DOM_onahs2=delta_DOM_onahs2-1;if(delta_DOM_direction=='ascending'&&delta_DOM_onahs2==delta_DOM_onahs)
{var chashash=veses._reeyah.clone();chashash.next_mo();var onahs=delta_DOM_onahs;if(before_last_veses._onah==_NIGHT_)
onahs=onahs+1;var next_month=chashash._m;chashash.add_days(Math.floor(onahs/2));var onah='day onah';if(onahs%2==1)
onah='night onah';if(chashash._m==next_month)
{kavuah_text+="An incremental fixed cycle (veses hadilug) has been  established for stringency. ";kavuah_text+="This pattern is due to a gap of "+delta_DOM_onahs+" onah";if(delta_DOM_onahs>1)
kavuah_text+="s";kavuah_text+=" between each monthly flow. Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+onah+" of "+chashash;kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}}}}
else if(d2!=d3||(d2==d3&&o2!=o3))
{if(delta_DOM_direction=='descending'&&delta_DOM==(d3-d2))
{var chashash=veses._reeyah.clone();chashash.next_mo();var next_month=chashash._m;chashash.subtract_days(delta_DOM);if(chashash._m==next_month)
{kavuah_text+="A decreasing incremental fixed cycle (veses hadilug) has been  established for stringency. ";kavuah_text+="This pattern is due to a gap of "+Math.abs(d2-d3)+" day";if((d2-d3)>1)
kavuah_text+="s";kavuah_text+=" between each monthly flow. Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+chashash;kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}}
else
{var delta_DOM_onahs2=2*(d3-d2);if(o3==_NIGHT_)
delta_DOM_onahs2=delta_DOM_onahs2+1;if(o2==_NIGHT_)
delta_DOM_onahs2=delta_DOM_onahs2-1;if(delta_DOM_direction=='descending'&&delta_DOM_onahs2==delta_DOM_onahs)
{var chashash=veses._reeyah.clone();chashash.next_mo();var onahs=delta_DOM_onahs;if(before_last_veses._onah==_DAY_)
onahs=onahs+1;var next_month=chashash._m;chashash.subtract_days(Math.floor(onahs/2));var onah='day onah';if(onahs%2==1)
onah='night onah';if(chashash._m==next_month)
{kavuah_text+="A decreasing incremental fixed cycle (veses hadilug) has been  established for stringency. ";kavuah_text+="This pattern is due to a gap of "+Math.abs(delta_DOM_onahs)+" onah";if(delta_DOM_onahs>1)
kavuah_text+="s";kavuah_text+=" between each monthly flow. Aside from keeping your regular onot of separation, ";kavuah_text+="you should also separate and perform  an examination on the "+onah+" of "+chashash;kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}}}}}
if(h2!=null&&h3!=null&&h2!=h3&&delta_Span_direction!=null)
{if(delta_Span==(Math.ceil(h2/2)-Math.ceil(h3/2))&&delta_Span_direction=='ascending')
{kavuah_text+="An incremental fixed cycle based on span (veses hadilug) has been established for stringency. ";kavuah_text+="This pattern is due to a gap of "+delta_Span+" days between haflagah days over the past three flows. ";kavuah_text+="Aside from keeping your regular onot of separation, you should also separate and perform  an examination "+(Math.ceil(h1/2)+delta_Span);kavuah_text+=" days from your next hefsek taharah";kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}
else if(delta_Span_direction=='ascending'&&(h2-h3)==delta_Span_onahs)
{kavuah_text+="An incremental fixed cycle based on span (veses hadilug) has been established for stringency. ";kavuah_text+="This pattern is due to a gap of "+delta_Span_onahs+" onahs between haflagah numbers over the past three flows. ";kavuah_text+="Aside from keeping your regular onot of separation, you should also separate and perform  an examination "+(h1+delta_Span_onahs);kavuah_text+=" onahs from your next hefsek taharah";kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}
else if(delta_Span==(Math.ceil(h3/2)-Math.ceil(h2/2))&&delta_Span_direction=='descending')
{kavuah_text+="A decreasing incremental fixed cycle based on span (veses hadilug) has been established for stringency. ";kavuah_text+="This pattern is due to a gap of "+delta_Span+" days between haflagah days over the past three flows. ";kavuah_text+="Aside from keeping your regular onot of separation, you should also separate and perform  an examination "+(Math.ceil(h1/2)-delta_Span);kavuah_text+=" days from your next hefsek taharah";kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}
else if(delta_Span_direction=='descending'&&(h3-h2)==delta_Span_onahs)
{kavuah_text+="A decreasing incremental fixed cycle based on span (veses hadilug) has been established for stringency. ";kavuah_text+="This pattern is due to a gap of "+delta_Span_onahs+" onahs between haflagah numbers over the past three flows. ";kavuah_text+="Aside from keeping your regular onot of separation, you should also separate and perform  an examination "+(h1-delta_Span_onahs);kavuah_text+=" onahs from your next hefsek taharah";kavuah_text+=". This pattern was established by flows occurring between the "+before_last_veses._reeyah;kavuah_text+=" ("+before_last_veses._reeyah.to_eng()+") and the ";kavuah_text+=veses._reeyah+" ("+veses._reeyah.to_eng()+"). <br><br>";found_kavuah=true;}}
return found_kavuah;}
function weeks_inbetween(r1,r2,r3)
{var d=r3.clone();var gap=0;while(!d.equals(r2)&&gap<365)
{gap=gap+1;d.next();}
var gap2=0;while(!d.equals(r1)&&gap2<365)
{gap2=gap2+1;d.next();}
if(gap==gap2&&gap%7==0)
return(gap/7);return-1;}
function get_min_haflagah(veses)
{if(veses._haflagas===undefined||veses._haflagas.length==0)
return null;var min_i=null;for(i in veses._haflagas)
if(min_i==null||veses._haflagas[i][0]<veses._haflagas[min_i][0])
min_i=i;return veses._haflagas[min_i];}
function find_chodesh_kavuah(veses,cal)
{var this_reeyah=veses._reeyah;var r=this_reeyah.clone();r.prev_mo();var two_months_in_a_row=false;for(i in cal._veses)
if(cal._veses[i]._reeyah.equals(r)&&cal._veses[i]._onah==veses._onah)
{two_months_in_a_row=true;kavuah_reeyahs[2]=cal._veses[i];break;}
if(two_months_in_a_row)
{r.prev_mo();for(j in cal._veses)
if(cal._veses[j]._reeyah.equals(r)&&cal._veses[j]._onah==veses._onah)
{kavuah_text+="A Fixed cycle (veses kavuah) has been established by a flow starting on the ";kavuah_text+=_ONAH_NAMES_[veses._onah]+" of day "+veses._reeyah._d;kavuah_text+=" for the past three jewish months. <br>";kavuah_reeyahs[3]=cal._veses[j];kavuah_reeyahs[1]=veses;return true;}}
return false;};var reminders_holder='empty';function print_cal()
{$.get("reminders_txt.php",function(data){reminders_holder=data;});setTimeout('print_cal2();',100);}
function print_cal2()
{if(reminders_holder!='empty')
{try{var oIframe=document.getElementById('ifrmPrint');var oDoc=(oIframe.contentWindow||oIframe.contentDocument);if(oDoc.document)oDoc=oDoc.document;oDoc.write("<html><head><title></title>");oDoc.write("</head><body onload='this.focus(); this.print();'>");oDoc.write(build_hard_copy()+reminders_holder+"</body></html>");oDoc.close();reminders_holder='empty';}
catch(e){self.print();}}
else
setTimeout('print_cal2();',100);}
function build_hard_copy()
{var titles=new Array("Flow","Stain Discovered","Medical Procedure","Unclean Bedikah","Birth","Birth","Miscarriage","Flow during Menopause");var p="<div style='font-family:sans-serif'><h1 align='center'>My Mikvah Calendar</h1><br /><h3 style='text-decoration:underline'>Ten Most Recent Flows:</h3><ol>";var veses=top.frames[1].cal._veses;var count=0;for(i=veses.length-1;i>-1;i--)
{count++;if(count>10)
break;p+="<li><strong>"+titles[veses[i]._cause]+"</strong><ul>";p+="<li>Started during the "+_ONAH_NAMES_[veses[i]._onah]+" at "+time(veses[i]._time)+"</li>";p+="<li>"+veses[i]._reeyah.toString()+" - "+veses[i]._hefsek.toString()+"</li>";if(veses[i]._onah==_NIGHT_&&veses[i]._time>720)
start=veses[i]._reeyah.to_eng_night();else
start=veses[i]._reeyah.to_eng();p+="<li>"+start+" - "+veses[i]._hefsek.to_eng()+"</li></ul></li>";}
p+="</ol><br /><h3 style='text-decoration:underline'>Upcoming Reminders:</h3>";p+="</div>";return p;}
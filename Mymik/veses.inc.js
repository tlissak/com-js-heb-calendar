function reeyah_in_white_week_popup(veses){
	str='';
	lastV=veses.get_prev_veses(top.frames[1].cal)
	if((veses._cause==0||veses._cause==7)&&(lastV._cause==0||lastV._cause==7))
	str="It is uncommon to have a new flow begin during the seven preparatory days of another flow. In the event this happens you should consult a rabbi and ask him how to proceed in this situation.";
	else if(veses._cause==1)
	str="A stain found on a white garment or bedding may or may not force you to do a new Hefsek Tahara and restart counting your 7 preparatory days. This is dependent on the size and color of the stain as well as the material the stain is on. Only a qualified rabbi may determine this status. Please show this stain to a qualified rabbi to determine when your mikvah night should be.";
	else if(veses._cause==2)
	str="A medical procedure may or may not  force you to do a new Hefsek Tahara and restart the counting your 7 preparatory days. Please describe the nature of the procedure to a qualified rabbi to determine when your mikvah night should be.";
	else if(veses._cause==3)
	str="A color other  than white or clear resulting from a bedikah examination may or may not force you to do a new Hefesk Tahara and restart the counting your 7 preparatory days. This is dependent on the color of the stain. Please show this bedikah cloth to a qualified rabbi to determine when your mikvah night should be.";
	if(str==''&&Settings.getInstance()._explain)
	setTimeout('new_popup_win_explainer(10)',2700);else if(str!='')
	{str="<div align='center'><div class='title' style='margin-top:0px;margin-left:-20px'>New flow during preparatory day</div><Br><table  width='80%' ><tr><td align='left' style='font-size:12px'>"+str+"</td></tr></table>";
	str+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows(); if(Settings.getInstance()._explain) {setTimeout('new_popup_win_explainer(10)',2700);}"),235);setTimeout("new_popup_win(\""+str.replace(/"/g,"\\\"")+"\",'265','400')",2700);}}
function delete_ht(cal,y,m,d){
	var latest=true;
	var hefsek=new HDate(d,m,y);
	var veses;
	for(i in cal._veses)
	{if(cal._veses[i]._hefsek.equals(hefsek))
	{veses=cal._veses[i];}else if(cal._veses[i]._hefsek.is_later_then(hefsek))
	latest=false;}if(!latest)
	{popup("You may only delete the hefsek taharah for your most recent flow");return false;}
	$.post("ajax.php",{delVeses:veses._id});top.frames[1].vestos_db.pop();rebuild_vestos(cal);time_array=time(veses._time,false);ampm='pm';if(time_array[2])
	ampm='am';if(new_veses(null,null,null,veses._reeyah._d,veses._reeyah._m,veses._reeyah._y,String(time_array[0]),String(time_array[1]),ampm,veses._cause,cal,true,false))
	{v=null;for(i in top.frames[1].cal._veses)
	if(!top.frames[1].cal._veses[i]._hefsek_confirmed)
	v=top.frames[1].cal._veses[i];v._leadup_cause=veses._leadup_cause;v._leadup_onah=veses._leadup_onah;
	v._leadup_date=veses._leadup_date;leadup_cause=null;leadup_date=null;leadup_onah=null;if(v._leadup_date!==undefined&&v._leadup_date!=null
		&&v._leadup_date!='null'&&v._leadup_date!='0')
	{leadup_cause=v._leadup_cause;leadup_onah=v._leadup_onah;leadup_date=v._leadup_date._d+"-"+v._leadup_date._m+"-"+v._leadup_date._y;}
	top.frames[1].$.post("ajax.php",{newVeses:v._reeyah._d+"-"+v._reeyah._m+"-"+v._reeyah._y,onah:v._onah,cause:v._cause,time:v._time
						 ,leadup_cause:leadup_cause,leadup_date:leadup_date,leadup_onah:leadup_onah},function(data)
	{v._id=data.id;v._onah=veses._onah;if(top.frames[1].Settings.remindHefsek())
	{var date=v._hefsek.clone();for(ht_count=1;ht_count<11;ht_count++)
	{top.frames[1].set_reminder(4,v,new top.frames[1].Day(date),top.frames[1]._DAY_,ht_count);date.next();}}
	top.frames[1].reminder_new_reeyah(v);top.frames[1].Hide_Windows();top.frames[1].refresh();},"json");}
	return true;}
function delete_veses(cal,y,m,d){
	var latest=true;var reeyah=new HDate(d,m,y);var veses;for(i in cal._veses)
	{if(cal._veses[i]._reeyah.equals(reeyah))
	veses=cal._veses[i];else if(cal._veses[i]._reeyah.is_later_then(reeyah))
	latest=false;}
	if(!latest)
	{popup("You may only delete your last flow");return false;}
	popup_okcancel("This operation can <strong>not</strong> be undone.<br>Are you sure you want to delete this flow from the system?"
	,function() {$.post("ajax.php",{delVeses:veses._id});top.frames[1].vestos_db.pop();
	rebuild_vestos(top.frames[1].cal);top.frames[1].Hide_Windows();top.frames[1].refresh();});return true;}
function rebuild_vestos(cal){
	db=vestos_db;cal._veses=new Array();cal._events=new Array();for(i in db)
	{v=db[i];if(i==0)
	load_veses(v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9]);else
	load_veses(v[0],v[1],v[2],v[3],v[4],v[5],v[6],null,null,v[7],v[8],v[9]);}};
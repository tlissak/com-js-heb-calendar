function pad(str){if(Number(str)<10)return"0"+str;return str;}
function reminder_new_reeyah(veses){
	var eng_dateArray=veses._reeyah.to_eng_array();var english_date=eng_dateArray[2]+"-"
	+pad(eng_dateArray[1])+"-"+pad(eng_dateArray[0]);var day=new Day(veses._reeyah);var offsetList='';for(i in day._locations)
	offsetList+="#"+day._locations[i].get_gmt_offset(day._date);$.post("ajax.php",{delete_reminders_past:english_date,veses:veses._id,time:veses._time,offsets:offsetList});}
function set_reminder(type,veses,day,onah,misc,reeyah_time,send_reminder){
	if(send_reminder===undefined)
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


function reminder_update_locations() {
   $.post("ajax.php", {
      get_Reminders : true}
   , function(data) {
      for(i in data.reminders) {
         var reminder = data.reminders[i]; var day = new Day(new HDate(reminder.d, reminder.m, reminder.y)); var locations = ''; for(i in day._locations) {
            var name_array = day._locations[i]._name.split(","); locations += "#" + name_array[0]; }
         if(locations != reminder.loc_names) {
            var loc_data = new Array("", "", "", "", ""); var delay = top.frames[1].Settings.getInstance()._delay *- 60; for(i in day._locations) {
               offset = day._locations[i].get_gmt_offset(day._date) - delay; loc_data[1] += "#" + offset; loc_data[2] += "#" + top.frames[1].get_zman(day, 1, i); 
			   loc_data[3] += "#" + top.frames[1].get_zman(day, 2, i); loc_data[4] += "#" + top.frames[1].get_zman(day, 3, i); 
		 }
            $.post("ajax.php", 
				   {update_Reminders : reminder.id, loc_name : locations, loc_gmt : loc_data[1] , loc_shkiah1 : loc_data[2], loc_netz : loc_data[3], loc_shkiah2 : loc_data[4]}
            ); 
		}
      }
    }
   , "json"); 
   }
   
function delete_trip(id){
	var trip=null;var new_trip_list=new Array();for(i in _trip_locations)
	if(String(_trip_locations[i]._id)==String(id))
	trip=_trip_locations[i];else
	new_trip_list.push(_trip_locations[i]);if(_trip_locations.length-new_trip_list.length==1)
	{_trip_locations=new_trip_list;$.post("ajax.php",{delTrip:id});reminder_update_locations();}
	else
	alert('error removing trip');}
function get_english_bg_image(day_color,night_color){
	var image_name='';switch(day_color){case _GREEN_:image_name='g';break;
	case _RED_:image_name='r';break;case _YELLOW_:image_name='y';break;
	case _WHITE_:image_name='w';break;case _BLUE_:image_name='b';break;default:image_name='x';}
	switch(night_color){case _GREEN_:image_name+='g';break;
	case _RED_:image_name+='r';break;case _YELLOW_:image_name+='y';break;case _WHITE_:image_name+='w';break;case _BLUE_:image_name+='b';break;default:image_name+='x';}
	return image_name+".png";}

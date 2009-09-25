Day.prototype.day_details=function(){
	var events=new Array();
	var titles=new Array("Start of Flow","Stain Discovered","Medical Procedure","Unclean Bedikah","Birth","Start of Flow during Menopause","Lost Pregnancy");
	if(this._reeyah!=undefined){
		var title=titles[this._reeyah._cause];
		if(this._reeyah._cause>3&&this._reeyah._cause<7){		title=titles[4];
		}else if(this._reeyah._cause==7){		title=titles[0];}
		if(this._reeyah._cause==6){		title=titles[6];}
		var temp=this._reeyah.cause_str();
		if(this._reeyah._leadup_date===undefined){
			events.push(new Array(title,temp+" during the "+_ONAH_NAMES_[this._reeyah._onah]+" at "+this.format_time(this._reeyah._time)
									+". All the laws of "+tooltip('harchakot')+" are in effect from this point in time until after the mikvah immersion."));
		}else{
			events.push(new Array(title,this._reeyah.cause_str(true)+" on the "+this._reeyah._leadup_date+" during the "+_ONAH_NAMES_[this._reeyah._leadup_onah]
									+". You were not able to perform a hefsek taharah before your regular flow started on the "+this._date+" during the "
									+_ONAH_NAMES_[this._reeyah._onah]+" at "+this.format_time(this._reeyah._time)+". All the laws of "
									+tooltip('harchakot')+" are still in effect until after the mikvah immersion."));
		}
	}
	if(this._hefsek!=undefined){
		if(this._hefsek._hefsek_confirmed){
			events.push(new Array("Hefsek Taharah","A "+tooltip('Hefsek Taharah')+" was performed towards the end of the day "
									+tooltip('onah')+" but before sunset,  for the flow starting on the "+this._hefsek._reeyah
									+". Tomorrow is the first of the seven preparatory days."));
		}else{
			events.push(new Array("Hefsek Taharah","If your flow has ended,a "
								+  tooltip('Hefsek Taharah')+" may be performed at the end of the day but before sunset ("
								+	this.format_time(this.end_shkiah())+"), tommorow will be the first of the seven preparatory days."));
		}
	}
	if(this._mikvah!=undefined){
		var mikvah_problem=this._mikvah.check_for_bad_mikvah();
		if(mikvah_problem==''){
			str_ev = "After immersion in a kosher mikvah a woman is obligated to inform her husband that she has immersed. Once these obligations are met,"
			str_ev += "relations are once again permitted and the  laws of "+tooltip('harchakot')+" are no longer in effect."
			events.push(new Array("Mikvah Night",str_ev ))
		}else{
			str_ev = mikvah_problem+" After immersion in a kosher mikvah on the proper night a woman is obligated to inform her husband that she has"
			str_ev += " immersed. Once these obligations are met, relations are once again permitted and the  laws of "+tooltip('harchakot')+" are no longer in effect."
			events.push(new Array("Mikvah Night?",str_ev))
		}
	}
	if(events.length==0){
		if(this._day_color==_RED_&&this._night_color==_RED_){
			events.push(new Array("Nidah","<br><br>Relations are forbidden today and the laws of "+tooltip('harchakot')+" are in effect."));
		}else if(this._day_color==_RED_){
			events.push(new Array("Nidah","<br>Relations are forbidden and the laws of "+tooltip('harchakot')+" are in effect for the day onah."));
		}else if(this._day_color==_WHITE_&&this._night_color==_WHITE_){
			str_ev = "Relations are forbidden today and the laws of "+tooltip('harchakot')+" are in effect. Additionally a "
			str_ev += tooltip('bedikah')+" should be done in the morning and again before sunset ("+this.format_time(this.end_shkiah()) +")."
			events.push(new Array("Preparatory Day",str_ev));
		}
	}
	for(i in this._events){
		if(this._events[i]._type==_BENONIS_&&(this.show_chashashot(_NIGHT_)||this.show_chashashot(_DAY_))){
			events.push(new Array("Onah Beinonit (the Average Cycle)","This "+tooltip('onah')+" is the 30th day from the flow starting on the "
								+this._events[i]._veses._reeyah+". Relations are forbidden both night and day and a "
								+tooltip('bedikah')+" must be made prior to sunset towards the end of the day "+tooltip('onah')+".  If the "
								+tooltip('bedikah')+" is clear or white, intimacy may resume after nightfall when the "
								+tooltip('onah')+" is over. For those women for whom making bedikot poses no difficulty, it is an optional stringency (chumrah) to make another "
								+tooltip('bedikah')+" after nightfall following the end of the Onah Beinonit. A woman has a halachic obligation to inform her husband " 
								+" of the Onah Beinonit and to notify him that she has done the bedikah to cancel the day. If she does not inform him," 
								+" it is the husband's obligation to ask."));
		}else if(this._events[i]._type==_CHODESH_){
			var ignore_this=false
			var onah_name='';
			var onah_type=''
			var intro_str='';
			if(this._events[i]._veses==null){
				if(!this.show_chashashot(this._events[i]._onah)){					ignore_this=true;}
				onah_name=_ONAH_NAMES_[this._events[i]._onah];
				onah_type=_ONAH_TYPES_[this._events[i]._onah];
			}else if(this._events[i]._misc==null&&this.show_chashashot(this._events[i]._veses._onah)
					&&this._events[i]._veses!=null){
						onah_name=_ONAH_NAMES_[this._events[i]._veses._onah];
						onah_type=_ONAH_TYPES_[this._events[i]._veses._onah];
						intro_str="This "+tooltip('onah')+" is the same date of the month as the start of your flow last month on the "
						+this._events[i]._veses._reeyah+"."
			}else if(this._events[i]._misc!=null&&this.show_chashashot(this._events[i]._misc._onah)){
				onah_name=_ONAH_NAMES_[this._events[i]._misc._onah];
				onah_type=_ONAH_TYPES_[this._events[i]._misc._onah];
				intro_str="This "+tooltip('onah')+" is the same date of the month as the start of your flow on the "
				+this._events[i]._misc._reeyah+" and has been carried over since that date has not been passed clean.";
			}else{
				ignore_this=true;
			}
		}
	}
	if(!ignore_this){
		events.push(new Array("Veset HaChodesh (Hebrew Date Cycle)",
					intro_str+this.bedikah_time(this._events[i],onah_name,onah_type)));
	}else if(this._events[i]._type==_HAFLAGAH_
			&&this.show_chashashot(this._events[i]._veses._onah)){
				events.push(new Array("Haflagah (Cycle Based on Interval)",
							"This is "+tooltip('onah')+" number "+this._events[i]._misc+" from the previous "+tooltip('Hefsek Taharah')+". "
							+this.bedikah_time(this._events[i],_ONAH_NAMES_[this._events[i]._onah],_ONAH_TYPES_[this._events[i]._onah])));
	}
	if(this._chag=="Tisha B'Av"){
		events.push(new Array("Tisha B'Av","Relations are forbidden on Tisha B'Av every year, however a "
					+tooltip('bedikah')+" is not required."))
	}else if(this._chag=="Yom Kippur"){
		events.push(new Array("Yom Kippur","Relations are forbidden on Yom Kippur every year, however a "
					 +tooltip('bedikah')+" is not required."))
	}
	if(this._locations.length>1){
		for(j in this._locations){
			if(this._locations[j]._start_date!=null&&this._locations[j]._start_date.equals(this._date)){
				events.push(new Array("Trip Departure","Today is your departure date for your trip to "+this._locations[j]));
				break;
			}
		}
	}
	if(events.length==0&&this._memos.length==0){
		str_out = "<div style='border:#A2A3A2 1px solid; width:380px;margin-left:-5px; margin-top:5px; height:125px; background:white;'><div align='center'";
		str_out += "style='line-height:28px;background:url(images/popup/header_bg.png); height:28px;color: #666;width:100%;'><strong>No Events</strong></div>";
		str_out += "<div id='event_body' align='center' style='padding:2px; height:97px;overflow:auto;' onMouseOver=\"this.style.cursor='default'\" >";
		str_out += "<br>There are no restrictions in effect for both night and day "+tooltip('onot');
		str_out += "<br><br><div onclick=\"setTimeout('top.frames[1].new_reeyah();',700); top.frames[1].cal._selected_day = ";
		str_out += this._date._d+"; top.frames[1].cal._selected_offset = 771; top.frames[1].Hide_Windows();\"> ";
		str_out += "<a href='#'>Add a new flow starting today</a></div></div></div> " ;
	
		return str_out
	}
	
	var mouseOver="onMouseOut=\\\"this.style.cursor='default'\\\" onMouseOver=\\\"this.style.cursor='pointer'\\\"";
	return_string="<script type='text/javascript'>var data = new Array();";
	
	for(i in events){
		var action='null';
		if(events[i][0]==titles[0]||events[i][0]==titles[1]||events[i][0]==titles[2]
			||events[i][0]==titles[3]||events[i][0]==titles[4]||events[i][0]==titles[5]||events[i][0]==titles[6]){
			action="<img onClick='delete_veses(top.frames[1].cal,"+this._date._y+","+this._date._m+","+this._date._d+");' "
			action += mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" "
			action += "onmouseup=\\\"this.src='./images/popup/trash.png'\\\" >";
		}else if(events[i][0]=="Hefsek Taharah"){
			action="<img onClick='delete_ht(top.frames[1].cal,"+this._date._y+","+this._date._m+","+this._date._d+");' "
			action += mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" onmouseup=\\\"this.src='./images/popup/trash.png'\\\" >";
		}else if(events[i][0]=="Trip Departure"){
			action="<img onClick='top.frames[1].delete_trip("+this._locations[j]._id+"); top.frames[1].refresh(); this.blur(); top.frames[1].Hide_Windows();'  "
			action += mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" onmouseup=\\\"this.src='./images/popup/trash.png'\\\">";
			return_string+="data.push(new Array(\""+events[i][0]+"\",\""+events[i][1]+"\",\""+action+"\"));";
		}
		for(i in this._memos){
			return_string+="data.push(new Array(\"Memo: "+this._memos[i][0]._title+"\",\"";
			return_string+=this._memos[i][0]._memo;
			return_string+="\", \"<img onClick='popup_okcancel(1,function() {top.frames[1].cal._memos["+this._memos[i][1]
								+"].delete_me(top.frames[1].cal);top.frames[1].refresh();this.blur();top.frames[1].Hide_Windows();})'  "
								+mouseOver+"  src='./images/popup/trash.png' onmousedown=\\\"this.src='./images/popup/trash_on.png'\\\" " 
								+ "onmouseup=\\\"this.src='./images/popup/trash.png'\\\">\"));";
		}
		if(cal._selected_shape!='none'){
			shape=cal._selected_shape;
			cal._selected_shape='none';
			if(shape=='memo'){
				return_string+="for(i in data){";
				return_string+=" if(data[i][0].substring(0,5)=='Memo:'){";
				return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";
			}else if(shape=='diamond'){
				return_string+="for(i in data){";
				return_string+=" if(data[i][0].substring(0,8)=='Onah Ben'){";
				return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";
			}else if(shape.substring(0,6)=='circle'){
				return_string+="for(i in data){";
				return_string+=" if(data[i][0].substring(0,10)=='Veset HaCh'){";
				return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";
			}else if(shape.substring(0,6)=='square'){
				return_string+="for(i in data){";
				return_string+=" if(data[i][0].substring(0,8)=='Haflagah'){";
				return_string+="   tmp = data[0]; data[0]=data[i]; data[i]=tmp;} }";
			}
		}
		return_string+="</script><div style='border:#A2A3A2 1px solid; width:380px;margin-left:-5px; margin-top:5px; height:125px; background:white;'>" 
		return_string += "<div align='center' style='line-height:28px;background:url(images/popup/header_bg.png); height:28px; width:100%; color:#666'>"
		return_string += "<table width=\"100%\"><tr style='line-height:26px'><td width=\"17\" ><div style=\"margin-left:1px; margin-bottom:3px; "
		return_string += "background:url(images/popup/left.png) right; width:17px; height:21px;\" "
		return_string += "onMouseDown=\"this.style.background='url(images/popup/left.png) left'\" onMouseUp=\"this.style.background='url(images/popup/left.png) right'\" "
		return_string += "id=\"left\" onClick='day_prev();'/></td><td width=\"47\"><div onMouseDown=\"this.style.background='url(images/popup/right_on.png)'\" "
		return_string += "onMouseUp=\"this.style.background='url(images/popup/right_off.png)'\" "
		return_string += "style=\"margin-left:1px;margin-bottom:3px;background:url(images/popup/right_off.png); width:47px; height:21px;\" id=\"right\" "
		return_string += "onClick='day_next();'/></td><td align=\"center\" ><div id=\"day_header\"  style=\"margin-left:-43px;display:inline;font-size:15px; \" >"
		return_string += "</div></td><td width=\"21\" align='right'><div id='trash' style='padding-right:2px; padding-bottom:3px;'></div></td></tr></table></div>"
		return_string += "<div id='details' align='left' style='padding-left:2px;padding-right:2px; height:97px;overflow:auto;'></div></div>";
		return_string+="<script type='text/javascript'>var i = 0;function update_day(){ document.getElementById('day_header').innerHTML=data[i][0]; "
		return_string += "document.getElementById('details').innerHTML=data[i][1];if(data[i][2] != 'null' ) document.getElementById('trash').innerHTML=data[i][2];"
		return_string += "else document.getElementById('trash').innerHTML='';if(i == data.length-1) document.getElementById('right').style.display='none'; else "
		return_string += "document.getElementById('right').style.display='block'; if(i == 0) document.getElementById('left').style.display='none'; else "
		return_string += "document.getElementById('left').style.display='block';} function day_next(){i++;update_day();} function day_prev(){i--;update_day();} "
		return_string += "update_day();</script>";
	}
	return return_string;
}
Day.prototype.output_html=function(){
	var chashashot_html='';for(i in this._events){
	if(this._events[i]._type==_BENONIS_&&(this.show_chashashot(_NIGHT_)||this.show_chashashot(_DAY_)))
	chashashot_html+="<div onClick=\"cal._selected_shape='diamond';\" style=\"position:absolute;left: 39px; top: 47px; width: 19px; height: 19px; background:URL('./images/diamond.png')\"></div>";
	else if(this._events[i]._type==_CHODESH_){
		var onah=this._events[i].chodesh_onah();if(onah==_NIGHT_&&this.show_chashashot(_NIGHT_))
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


Day.prototype.output_html_details=function(){
	var html="<div class='title' style='margin-top:0px;margin-left:-20px'>";var dot=". ";if(getWeekdayName(this._date.get_dow()-1)=='Shabbat')
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
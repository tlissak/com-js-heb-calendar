var confirm_result;
function popup(string,title){
	if(title===undefined)title='Error'
	top.frames[1].jAlert(string,title);}
function popup_okcancel(string,ok_function){
	if(string==1)
	string='If you delete this memo a reminder will <strong>not</strong> be sent.<br>Do you still want to delete this memo?';
	string="<div align='center'>"+string+"</div>";jConfirm(string,'Confirmation Required',function(r){if(r)ok_function();});}
function findPos(obj){
	var curleft=curtop=0;if(obj.offsetParent){do{curleft+=obj.offsetLeft;curtop+=obj.offsetTop;}while(obj=obj.offsetParent);}
	return[curleft,curtop];}
function hide_view_menu(){
	if(win.style.display=='block')
	win.style.display='none';}
function view_name(command){
	if(command=='year')
	return'Annual';else if(command=='table')
	return'Table';else if(command=='charts')
	return'Charts';return'Month';}
function show_view_menu(command,cal){
	if(win.style.display!='block'){
		pos=findPos(cur_view);win.style.left=(String)(pos[0]+3)+'px';win.style.top='37px'
		setTimeout("win.style.display='block'",200);}
	else
	{if(typeof cal!=="undefined")
	{cal._settings._view=command;cur_view.innerHTML=view_name(command);this.selectedIndex=0;draw();}
	win.style.display='none';}
	return false;}
function tooltip(text) {
   var ttip = ''; 
   if(text == "Haflagah" || text == "haflagah")
   	ttip = "Interval (number of days) time frame beginning with the first day after a successful Hefsek Taharah to the first day of the subsequent period (inclusive)"; 
   else if(text == "Bedikah" || text == "bedikah")ttip = "Self administered, halachic internal examination (pl. bedikot) done with a pure white, cotton, pre-washed cloth"; 
   else if(text == "harhakot" || text == "harchakot")ttip = "Restrictions designed to minimize the possibility of physical contact between a couple while the wife is nidah"; 
   else if(text == "hefsek taharah" || text == "Hefsek Taharah")ttip = "Internal examination to establish that uterine bleeding has ceased (also called hefsek)"; 
   else if(text == "onah" || text == "Onah")ttip = "Literally, a time frame (pl. onot) one day or night, measured from sunrise to sunset or from sunset to sunrise"; 
   else if(text == "onot" || text == "Onot")ttip = "Literally, time frames (sing. onah) measured from sunrise to sunset or from sunset to sunrise"; 
   else if(text == "harhakot" || text == "harchakot")ttip = "Restrictions designed to minimize the possibility of physical contact between a couple while the wife is nidah"; 
   if(ttip != '')return"<span style='border-bottom:1px dotted #770;' title='" + ttip + "'>" + text + "</span>"; 
   else return text; 
   }

function buttons(txt_array, code_array, height) {
   var mrgLeft = '154'; 
   if(txt_array.length == 2)mrgLeft = '110'; 
   var str = "<div style=\"position:absolute;left:" + mrgLeft + "px; top:" + height + "px\">"; 
   str += "<div onselectstart='event.returnValue=false;' id='btn' class='btn' onMouseUp=\"this.className = 'btn2';"; 
   str += code_array[0] + "\""; 
   str += "onMouseDown=\"this.className = 'btn3';if (event.preventDefault) {event.preventDefault();}return false;\" "; 
   str += "onMouseOver=\"this.className = 'btn2';\" onMouseOut=\"this.className = 'btn';\">" + txt_array[0] + "</div>"; 
   if(txt_array.length == 1)return str + "</div>"; 
   str += "<div style='margin-left:8px;' onselectstart='event.returnValue=false;' id='btn' class='btn' "; 
   str += "onMouseUp=\"this.className = 'btn2';" + code_array[1] + "\""; 
   str += "onMouseDown=\"this.className = 'btn3';if (event.preventDefault) {event.preventDefault();}return false;\" "; 
   str += "onMouseOver=\"this.className = 'btn2';\" onMouseOut=\"this.className = 'btn';\">" + txt_array[1] + "</div>"; 
   return str + "</div>"; 
   }
function right_click(id, action, cal) {
   var dom = id.substring(4); 
   cal._selected_day = dom; 
   var day = cal._month._days[dom]; 
   cal._selected_offset = 771; 
   if(action == 'show')new_popup_win_fromString(); 
   else if(action == 'reeyah')new_reeyah(); 
   else if(action == 'memo') {
      $(document).ready(function() {
         tb_show("", 'new_note.html?KeepThis=true&TB_iframe=true&height=500&width=400&modal=true', ""); }
      ); 
      return; 
      }
   else if(action == 'trip') {
      $(document).ready(function() {
         tb_show("", 'new_trip.php?KeepThis=true&TB_iframe=true&height=265&width=400&modal=true', ""); }
      ); 
      return; 
      }
   else alert('unknown action: ' + action); 
   }
function drop(endX,endY){
	cal._selected_offset=770;var v=null;for(i in cal._veses)
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

function findPosX(obj){var curleft=0;if(obj.offsetParent){while(obj.offsetParent){curleft+=obj.offsetLeftobj=obj.offsetParent;}}else if(obj.x)curleft+=obj.x;return curleft;}
function findPosY(obj){var curtop=0;if(obj.offsetParent){while(obj.offsetParent){curtop+=obj.offsetTopobj=obj.offsetParent;}}else if(obj.y)curtop+=obj.y;return curtop;}

var odd;
var rows;
var avg=0;
var plot_pg=1;

function flip_charts(){
	if(plot_pg==1)
	plot_pg=2;else
	plot_pg=1;}	
function plot(cal){
	if(plot_pg==1){
		$(function(){x=1;
				var last=null;
				var chart_data=new Array();
				var total=0;var sum=0;
				chart_data.push(new Array(0,30));
				for(i in cal._veses){
					if(i==0)
						continue;
					var r1=cal._veses[i-1]._reeyah;
					var r2=cal._veses[i]._reeyah.clone();
					var c=0;
					while(r2.is_later_then(r1))
						{c++;r2.prev();}
					if(c<120)
						{chart_data.push(new Array(x,c));total++;sum=sum+c;}
					else
						chart_data.push(null);x++;
				}
				if(total>0)
					avg=Math.round((sum/total)*100)/100;
				setTimeout("document.getElementById('flow_length').innerHTML = avg;",300);
				$.plot($("#chart_view"),[chart_data],{lines:{show:true},points:{show:true},xaxis:{ticks:cal._veses.length-1,tickDecimals:0}});});
	}else if(plot_pg==2){
		$(function(){x=1;var last=null;
				   var chart_data=new Array();var total=0;var sum=0;
				   chart_data.push(new Array(0,5));
			for(i in cal._veses){
				var r=cal._veses[i]._reeyah.clone();
				var ht=cal._veses[i]._hefsek.clone();
				var c=1;
				while(ht.is_later_then(r))	{c++;ht.prev();}
				if(c<120)
					{chart_data.push(new Array(x,c));total++;sum=sum+c;}
				else
					chart_data.push(null);x++;
			}
			if(total>0)
				avg=Math.round((sum/total)*100)/100;
				setTimeout("document.getElementById('flow_length').innerHTML = avg;",300);
				$.plot($("#chart_view"),[chart_data],{lines:{show:true,fill:true,fillColor:"rgba(230, 183, 192, 0.3)"}
						,points:{show:true},xaxis:{ticks:cal._veses.length-1,tickDecimals:0},yaxis:{tickDecimals:0},colors:["#E6B7C0"]});});}
}
function table_view(cal){
	output="<div  id = 'table_view' style='width:850px; height:565px;' ><table align='center'><thead><tr class='odd'><th scope='col'>Hebrew Date </th><th scope='col'>English Date </th><th scope='col'>Event</th><th scope='col'>Notes</th></tr></thead> <tbody>";
	if(cal._veses.length==0)
	return output+"</tbody></table></div>";update_table();odd='<tr>';if((cal._page_num-1)*20>=rows.length-1)
	cal._page_num--;var end=Math.min((cal._page_num*20)-1,rows.length-1);for(i=0+(cal._page_num-1)*20;i<=end;i++)
	{output+=odd+"<td>"+rows[i][0]+"</td><td>"+
	rows[i][1]+"</td><td>"+
	rows[i][2]+"</td><td>"+rows[i][3]+"</td></tr>";swap_odd();}
	output+="</tbody></table></div>";return output;}
function swap_odd(){
	odd = (odd=='<tr>') ? "<tr class='odd'>" : odd='<tr>';}
function update_table(){
	rows=new Array();
	var type_names=new Array("Flow","Stain","Medical procedure","Unclean Bedikah","Birth","Birth","Miscarriage","Flow");
	for(i in cal._veses){
		var type=type_names[cal._veses[i]._cause];
		rows.push(new Array(cal._veses[i]._reeyah,cal._veses[i]._reeyah.to_eng()
			,type,'Occured during '+_ONAH_NAMES_[cal._veses[i]._onah]+' at '+cal._month._days[1].format_time(cal._veses[i]._time)));
		if(cal._veses[i]._hefsek_confirmed)
			rows.push(new Array(cal._veses[i]._hefsek,cal._veses[i]._hefsek.to_eng(),"Hefsek Taharah",''));
	}
	rows.sort(HDate_Sort);rows.reverse();
}



var reminders_holder='empty';		
		
		
function print_cal(){$.get("reminders_txt.php",function(data){reminders_holder=data;});setTimeout('print_cal2();',100);}
function print_cal2(){
	if(reminders_holder!='empty')
		{try{var oIframe=document.getElementById('ifrmPrint');
		var oDoc=(oIframe.contentWindow||oIframe.contentDocument);if(oDoc.document)oDoc=oDoc.document;
		oDoc.write("<html><head><title></title>");oDoc.write("</head><body onload='this.focus(); this.print();'>");
		oDoc.write(build_hard_copy()+reminders_holder+"</body></html>");oDoc.close();
		reminders_holder='empty';}
		catch(e){self.print();}}	else
	setTimeout('print_cal2();',100);}
function build_hard_copy(){
	var titles=new Array("Flow","Stain Discovered","Medical Procedure","Unclean Bedikah","Birth","Birth","Miscarriage","Flow during Menopause");
	var p="<div style='font-family:sans-serif'><h1 align='center'>My Mikvah Calendar</h1><br /><h3 style='text-decoration:underline'>Ten Most Recent Flows:</h3><ol>";
	var veses=top.frames[1].cal._veses;var count=0;for(i=veses.length-1;i>-1;i--)
	{count++;if(count>10)break;p+="<li><strong>"+titles[veses[i]._cause]+"</strong><ul>";
	p+="<li>Started during the "+_ONAH_NAMES_[veses[i]._onah]+" at "+time(veses[i]._time)+"</li>";
	p+="<li>"+veses[i]._reeyah.toString()+" - "+veses[i]._hefsek.toString()+"</li>";if(veses[i]._onah==_NIGHT_&&veses[i]._time>720)
	start=veses[i]._reeyah.to_eng_night();else
	start=veses[i]._reeyah.to_eng();p+="<li>"+start+" - "+veses[i]._hefsek.to_eng()+"</li></ul></li>";}
	p+="</ol><br /><h3 style='text-decoration:underline'>Upcoming Reminders:</h3>";p+="</div>";return p;}
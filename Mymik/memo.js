Memo.prototype._id;
Memo.prototype._memo;
Memo.prototype._title;
Memo.prototype._time;
Memo.prototype._date;
Memo.prototype._onah;
Memo.prototype._remind;
Memo.prototype._force_color;
Memo.prototype._color;
function Memo(id,date,hr,min,isAM,remind,change_color,new_color,title,memo){
	this._id=id;this._memo=memo;this._title=title;
	this._date=date;this._time=time2min(hr,min,isAM);
	var day=new Day(date);this._onah=day.get_onah(this._time);
	this._remind=remind;this._force_color=change_color;if(change_color)
	this._color=new_color;}
Memo.prototype.info=function(){
	return"Memo on "+this._date+": "+this._memo+" - color: "+this._new_color;}
Memo.prototype.delete_me=function(cal){
	$.post("ajax.php",{delMemo:this._id});for(i in cal._memos)
	if(cal._memos[i]==this)
	{cal._memos.splice(i,1);break;}}
function load_memo(id,date,t,remind,color,title,memo,cal){
	if(remind=='0')
	remind=false;else
	remind=true;change_color=false;if(color!=null)
	change_color=true;time_array=time(t,false);ampm='pm';if(time_array[2])
	ampm='am';return new_memo(id,null,null,null,date._d,date._m,date._y,String(time_array[0])
			,String(time_array[1]),ampm,remind,change_color,color,title,memo,cal,false);}
function new_memo(id,ed,em,ey,hd,hm,hy,hr,min,ampm,remind,change_color,new_color,title,memo,cal,isNew){
	if(hr==''||min==''||ampm=='undefined')
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
	d2.prev();
	if(d2.isShabbosOrYontef())
		d2.prev();
	popup('A reminder can not be sent on this date since it is either Shabbat or a Yom Tov. Instead, the reminder will be sent out on the morning of '
					+d2+' ('+d2.to_eng()+')');}
	cal._memos.push(new Memo(id,date,hr,min,isAM,remind,change_color,new_color,title,memo));return true;
};
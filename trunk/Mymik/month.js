function Month (){}
Month.prototype._eng_name;
Month.prototype._name;
Month.prototype._length;
Month.prototype._days;
Month.prototype._m;
Month.prototype._y;
function Month(m,y,cal){
	var month_name=getJewishMonthName(m,y);
	this._name=month_name+" "+y;
	this._length=lastDayOfHebrewMonth(m,y);
	this._days=new Array(this._length);
	this._m=m;
	this._y=y;
	var today;
	for(var d=1;d<=this._length;d++){
		this._days[d]=new Day(new HDate(d,m,y));
		this._days[d]._chag=month_name;
	}
	this._days[1]._chag='Rosh Chodesh';
	var chag_date;
	for(holidayCounter=0;holidayCounter<56;holidayCounter++){
		chag_date=getJewishHolidayDate(holidayCounter,y);
		if(chag_date._m==m)
			this._days[chag_date._d]._chag=getJewishHolidayName(holidayCounter);
	}
	for(i in cal._events){
		if(cal._events[i]._date._m==m&&cal._events[i]._date._y==y){
			this._days[cal._events[i]._date._d]._events.push(cal._events[i]);
			if(cal._events[i]._type==_BENONIS_){
				this._days[cal._events[i]._date._d]._night_color=_YELLOW_;
				this._days[cal._events[i]._date._d]._day_color=_YELLOW_;
			}else if(cal._events[i]._type==_CHODESH_){
				var onah=cal._events[i].chodesh_onah();
				if(onah==_NIGHT_)
					this._days[cal._events[i]._date._d]._night_color=_YELLOW_;
				else
					this._days[cal._events[i]._date._d]._day_color=_YELLOW_;
			}else if(cal._events[i]._type==_HAFLAGAH_){
				if(cal._events[i]._onah==_NIGHT_)
					this._days[cal._events[i]._date._d]._night_color=_YELLOW_;
				else
					this._days[cal._events[i]._date._d]._day_color=_YELLOW_;
			}
		}
	}
	var v;
	for(i in cal._veses){
		v=cal._veses[i];
		if(v._reeyah._y>y||(v._reeyah._y==y&&month_earlier_then(m,v._reeyah._m))){
			if(v._leadup_onah!=undefined&&v._leadup_onah!=null&&v._leadup_onah>0){
				if(v._leadup_date._y>y||(v._leadup_date._y==y&&month_earlier_then(m,v._leadup_date._m)))
					continue;
				else if(v._leadup_date._y==y&&v._leadup_date._m==m){
					if(v._leadup_onah==_NIGHT_)
						this._days[v._leadup_date._d]._night_color=_RED_;
					this._days[v._leadup_date._d]._day_color=_RED_;
					for(j=v._leadup_date._d+1;j<=this._length;j++){
						this._days[j]._night_color=_RED_;
						this._days[j]._day_color=_RED_;
					}
				}else
					for(j=1;j<=this._length;j++){
						this._days[j]._night_color=_RED_;
						this._days[j]._day_color=_RED_;
					}
				continue;
			}else
				continue;
			}
			if(v._mikvah._y<y||(v._mikvah._y==y&&month_earlier_then(v._mikvah._m,m)))
				continue;
			var color=_RED_;
			var cur_day=1;
			if(v._reeyah._m==m&&v._reeyah._y==y){
				this._days[v._reeyah._d]._reeyah=v;
			if(v._onah==_NIGHT_)
				this._days[v._reeyah._d]._night_color=_RED_;
			else if(this._days[v._reeyah._d]._mikvah!=undefined)
				this._days[v._reeyah._d]._night_color=_BLUE_;
			this._days[v._reeyah._d]._day_color=_RED_;
			if(v._leadup_onah!=undefined&&v._leadup_onah!=null&&v._leadup_onah>0){
				if(v._leadup_date._m!=m||v._leadup_date._y!=y){
					for(j=1;j<=v._reeyah._d;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}
				}else{
					if(v._leadup_onah==_NIGHT_)
						this._days[v._leadup_date._d]._night_color=_RED_;
					this._days[v._leadup_date._d]._day_color=_RED_;
						for(j=v._leadup_date._d+1;j<=v._reeyah._d;j++){this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;}
				}
			}
			color=_RED_;
			cur_day=v._reeyah._d;
			if(cur_day==this._length)
				continue;
			else
				cur_day=cur_day+1;
		}
		if(v._hefsek._m==m&&v._hefsek._y==y){
			this._days[v._hefsek._d]._hefsek=v;
			for(j=cur_day;j<=v._hefsek._d;j++){
				this._days[j]._night_color=_RED_;
				this._days[j]._day_color=_RED_;
			}
			cur_day=v._hefsek._d;
			if(cur_day==this._length)
				continue;
			else
				cur_day=cur_day+1;
		}else{
			if(cur_day>1){
				for(j=cur_day;j<=this._length;j++){		this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;	}
				continue;
			}
		}
		if(this._days[1]._date.is_later_then(v._reeyah)&&v._hefsek.is_later_then(this._days[this._length]._date))
			for(j=1;j<=this._length;j++){
				this._days[j]._night_color=_RED_;this._days[j]._day_color=_RED_;
			}
		else if(v._hefsek_confirmed){
			color=_WHITE_;
			var already_colored_whites=false;
			for(j in cal._veses){
				v2=cal._veses[j];
				if(v2!=v&&!v._hefsek.is_later_then(v2._reeyah)&&!v2._reeyah.is_later_then(v._mikvah)){
					already_colored_whites=true;
					if(month_earlier_then(v2._reeyah._m,m))
						break;
					if(v2._reeyah._m==m)
						end=v2._reeyah._d;
					else
						end=this._length+1;
					for(k=cur_day;k<end;k++){
						this._days[k]._night_color=_WHITE_;this._days[k]._day_color=_WHITE_;
					}
					if(v2._onah==_DAY_&&v2._reeyah._m==m)
						this._days[v2._reeyah._d]._night_color=_WHITE_;break;
				}
			}
			if(!already_colored_whites){
				if(v._mikvah._m==m&&v._mikvah._y==y){
					this._days[v._mikvah._d]._mikvah=v;
					this._days[v._mikvah._d]._night_color=_BLUE_;
					for(j=cur_day;j<v._mikvah._d;j++){
						this._days[j]._night_color=_WHITE_;this._days[j]._day_color=_WHITE_;
					}
				}else{
					for(j=cur_day;j<=this._length;j++){
						this._days[j]._night_color=_WHITE_;this._days[j]._day_color=_WHITE_;
					}
				}
			}else if(v._mikvah._m==m&&v._mikvah._y==y)
				this._days[v._mikvah._d]._mikvah=v;
		}
	}
	if(m==7){
		if(this._days[10]._night_color==_GREEN_)
			this._days[10]._night_color=_YELLOW_;
		if(this._days[10]._day_color==_GREEN_)
			this._days[10]._day_color=_YELLOW_;
	}else if(m==5){
		var tisha_bav=getJewishHolidayDate(30,y);
		if(this._days[tisha_bav._d]._night_color==_GREEN_)
			this._days[tisha_bav._d]._night_color=_YELLOW_;
		if(this._days[tisha_bav._d]._day_color==_GREEN_)
			this._days[tisha_bav._d]._day_color=_YELLOW_;
	}
	for(i in cal._memos){
		var memo=cal._memos[i];
		if(memo._date._m==m&&memo._date._y==y){
			this._days[memo._date._d]._memos.push(new Array(memo,i));
			if(memo._force_color){
				if(memo._onah==_NIGHT_)
					this._days[memo._date._d]._night_color=Number(memo._color);
				else if(memo._onah==_DAY_)
					this._days[memo._date._d]._day_color=Number(memo._color);
			}
		}
	}
	var start_day=this._days[1];
	start_month=getGregorianMonthName(start_day._date.to_eng_array()[1]);
	end_month=getGregorianMonthName(this._days[this._length]._date.to_eng_array()[1]);
	end_year=(String)(this._days[this._length]._date.to_eng_array()[2]);
	start_year=(String)(start_day._date.to_eng_array()[2]);
	if(start_month=="December"&&end_month=="January")
		this._eng_name=start_month+" '"+start_year.substring(2)+" - "+end_month+" '"+end_year.substring(2);
	else if(start_month!=end_month)
		this._eng_name=start_month+" - "+end_month+" "+end_year;
	else
		this._eng_name=start_month+" "+end_year;
}
Month.prototype.toString = function() {
   output = "<script type='text/javascript'>top.frames[1].cal._selected_offset=0;</script>"; 
   output += "<image src='./images/header.gif' style='margin-left:2px;'><br>"
   output += "<table style='font:Verdana, Arial, Helvetica, sans-serif; font-size:9px' width='678' border='0' cellpadding='0' cellspacing='2'> <tr>"; 
   var weekday_of_roshchodesh = this._days[1]._date.getDayOfWeek(); 
   var i = 1; 
   for(weekday = 1; weekday < 8; weekday++) {
      if(weekday < weekday_of_roshchodesh) output += "<td></td>"; 
      else {
         output += this._days[i].output_html(); 
         i++; 
         }
      }
   output += "</tr>"; 
   for(var row = 2; row < 7; row++) {
      output += "<tr>"; 
      for(var col = 1; col < 8; col++) {
         output += this._days[i].output_html(); 
         i++; 
         if(i > this._length) break; 
         }
      output += "</tr>"; 
      if(i > this._length) break; 
      }
   return output + "</table>"; 
   }
Month.prototype.mini_view = function(is_month_view) {
   var output = getJewishMonthName(this._m, this._y); 
   output += "</div><table "; 
   if(is_month_view){ 
   	output += "onClick=\"top.frames[1].cal.jump(" + this._m + "," + this._y + ");top.frames[1].draw();cur_view.innerHTML='Month';\" "
	output += " onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\" "
	output += " style='font:Verdana, Arial, Helvetica, sans-serif; font-size:9px' width='160' height='100' border='0' cellpadding='0' cellspacing='1'> <tr>"; 
   }else{ 
   	output += "onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='default'\" "
	output += " style='font:Verdana, Arial, Helvetica, sans-serif; font-size:9px' width='160' height='100' border='0' cellpadding='0' cellspacing='1'> <tr>"; 
   }
   var weekday_of_roshchodesh = this._days[1]._date.get_dow(); 
   var i = 1; 
   for(weekday = 1; weekday < 8; weekday++) {
      if(weekday < weekday_of_roshchodesh) output += "<td></td>"; 
      else {
         output += "<td style='background-image:url(./images/days/mini/" + this._days[i].get_bg_image(true) 
		 output += "); background-position:center' align='center'>" + this._days[i]._date._d + "</td>"; 
         i++; 
         }
      }
   output += "</tr>"; 
   for(var row = 2; row < 7; row++) {
      output += "<tr>"; 
      for(var col = 1; col < 8; col++) {
         output += "<td style='background-image:url(./images/days/mini/" + this._days[i].get_bg_image(true) 
		 output += "); background-position:center' align='center'>" + this._days[i]._date._d + "</td>"; 
         i++; 
         if(i > this._length) return output + "</tr></table>"; 
         }
      output += "</tr>"; 
      }
   output += "</table>"; 
   return output; 
   }
Month.prototype.dateSelector = function() {
   var output = "</div><table "; 
   output += "onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='default'\" "
   output += "style='font-size:9px;margin-top:-5px;' width='160' height='95' border='0' cellpadding='0' cellspacing='1'> <tr>"; 
   var weekday_of_roshchodesh = this._days[1]._date.get_dow(); 
   var i = 1; 
   for(weekday = 1; weekday < 8; weekday++) {
      if(weekday < weekday_of_roshchodesh) output += "<td></td>"; 
      else {
         output += "<td style='background-image:url(./images/days/mini/" + this._days[i].get_bg_image(true) 
		 output += "); background-position:center' align='center' onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\" onclick=setHebDate(" 
		 output += this._days[i]._date._d + ");><span style='font-family:Lucida Sans Unicode;font-size:9px;'>" + this._days[i]._date._d + "</span></td>"; 
         i++; 
         }
      }
   output += "</tr>"; 
   for(var row = 2; row < 7; row++) {
      output += "<tr>"; 
      for(var col = 1; col < 8; col++) {
         output += "<td style='background-image:url(./images/days/mini/" + this._days[i].get_bg_image(true) 
		 output += "); background-position:center' align='center' onmouseout=\"this.style.cursor='default'\" onmouseover=\"this.style.cursor='pointer'\" onclick=setHebDate(" 
		 output += this._days[i]._date._d + ");><span style='font-family:Lucida Sans Unicode;font-size:9px;'>" + this._days[i]._date._d + "</span></td>"; 
         i++; 
         if(i > this._length) return output + "</tr></table>"; 
         }
      output += "</tr>"; 
      }
   output += "</table>"; 
   return output; 
   }
Month.prototype.get_m_and_y=function(){return this._days[1]._date._m+" "+this._days[1]._date._y;}
Month.prototype.equals=function(other){
	if(this._m==other._m&&this._y==other._y)return true;return false;};
function Month (){}
Month.prototype._eng_name;
Month.prototype._name;
Month.prototype._length;
Month.prototype._days;
Month.prototype._m;
Month.prototype._y;
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
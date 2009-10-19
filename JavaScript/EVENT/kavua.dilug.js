Kevua.prototype.get_min_haflagah = function(){
	if(this.veses._haflagas===undefined||this.veses._haflagas.length==0){ 		return null;	}
	var min_i=null;
	for(i in this.veses._haflagas){
		if(min_i==null||this.veses._haflagas[i][0]<this.veses._haflagas[min_i][0]){
			min_i=i;
		}			
	}
	return this.veses._haflagas[min_i];
}
Kevua.prototype.dilug = function() {
   var d1 = this.veses._reeyah.getDay(); 
   var m1 = this.veses._reeyah.getMonth(); 
   var h1 = this.get_min_haflagah(); 
   var o1 = this.veses._onah; 
   var d2 = this.last_veses._reeyah.getDay(); 
   var m2 = this.last_veses._reeyah.getMonth(); 
   if(h1 != null) var h2 = this.get_min_haflagah(this.last_veses); 
   var o2 = this.last_veses._onah; 
   var d3 = this.before_last_veses._reeyah.getDay(); 
   var m3 = this.before_last_veses._reeyah.getMonth(); 
   if(h2 != null) var h3 = this.get_min_haflagah(this.before_last_veses); 
   var o3 = this.before_last_veses._onah; 
   var temp = this.veses._reeyah.clone().prevMonth(); 
   var delta_DOM_direction = null 
   var delta_DOM = 0; 
   var delta_DOM_onahs = 0; 
   if(m2 == temp.getMonth()) {
      if(d1 > d2 || (d1 == d2 && o1 == _DAY_ && o2 == _NIGHT_)) {
         delta_DOM_direction = 'ascending'; 
         delta_DOM = d1 - d2; 
         delta_DOM_onahs = 2 * delta_DOM; 
         if(o1 == _NIGHT_) delta_DOM_onahs = delta_DOM_onahs + 1; 
         if(o2 == _NIGHT_) delta_DOM_onahs = delta_DOM_onahs - 1; 
         }
      else if(d1 != d2 || (d1 == d2 && o1 != o2)) {
         delta_DOM_direction = 'descending'; 
         delta_DOM = d2 - d1; 
         delta_DOM_onahs = 2 * delta_DOM; 
         if(o2 == _NIGHT_) delta_DOM_onahs = delta_DOM_onahs + 1; 
         if(o1 == _NIGHT_) delta_DOM_onahs = delta_DOM_onahs - 1; 
         }
      }
   var delta_Span_direction = null 
   var delta_Span = 0; 
   var delta_Span_onahs = 0; 
   if(h1 != null && h2 != null && h1 != h2) {
      if(h1 > h2) {
         delta_Span_direction = 'ascending'; 
         delta_Span_onahs = h1 - h2; 
         delta_Span = Math.ceil(h1 / 2) - Math.ceil(h2 / 2); 
         }
      else if(h2 > h1) {
         delta_Span_direction = 'descending'; 
         delta_Span_onahs = h2 - h1; 
         delta_Span = Math.ceil(h2 / 2) - Math.ceil(h1 / 2); 
         }
      }
   temp = this.last_veses._reeyah.clone().prevMonth(); 
   var found_kavuah = false; 
   if(m3 == temp.getMonth() && delta_DOM_direction != null) {
      if(d2 > d3 || (d2 == d3 && o2 == _DAY_ && o3 == _NIGHT_)) {
         if(delta_DOM_direction == 'ascending' && delta_DOM == (d2 - d3)) {
            var chashash = this.veses._reeyah.clone().nextMonth(); 
            var next_month = chashash.getMonth(); 
            chashash.add(delta_DOM); 
            if(chashash.getMonth() == next_month) {
				this.msg += vmsg.kevua_dilug_a((d2 - d3),chashash,this.before_last_veses._reeyah,this.veses._reeyah)               
                found_kavuah = true; 
               }
            }
         else {
            var delta_DOM_onahs2 = 2 * (d2 - d3); 
            if(o2 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 + 1; 
            if(o3 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 - 1; 
            if(delta_DOM_direction == 'ascending' && delta_DOM_onahs2 == delta_DOM_onahs) {
               var chashash = this.veses._reeyah.clone().nextMonth(); 
               var onahs = delta_DOM_onahs; 
               if(this.before_last_veses._onah == _NIGHT_) onahs = onahs + 1; 
               var next_month = chashash.getMonth(); 
               chashash.add(Math.floor(onahs / 2)); 
               var onah = 'day onah'; 
               if(onahs % 2 == 1) onah = 'night onah'; 
               if(chashash.getMonth() == next_month) {
				   this.msg += vmsg.kevua_dilug_b(delta_DOM_onahs,onah,chashash,this.before_last_veses._reeyah,this.veses._reeyah)
                 
                  found_kavuah = true; 
                  }
               }
            }
     }else if(d2 != d3 || (d2 == d3 && o2 != o3)) {
         if(delta_DOM_direction == 'descending' && delta_DOM == (d3 - d2)) {
            var chashash = this.veses._reeyah.clone().nextMonth(); 
            var next_month = chashash.getMonth(); 
            chashash.sub(delta_DOM); 
            if(chashash.getMonth() == next_month) {
				this.msg += vmsg.kevua_dilug_c(Math.abs(d2 - d3),chashash,this.before_last_veses._reeyah,this.veses._reeyah)
				found_kavuah = true; 
            }
         }else {
            var delta_DOM_onahs2 = 2 * (d3 - d2); 
            if(o3 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 + 1; 
            if(o2 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 - 1; 
            if(delta_DOM_direction == 'descending' && delta_DOM_onahs2 == delta_DOM_onahs) {
               var chashash = this.veses._reeyah.clone().nextMonth(); 
                var onahs = delta_DOM_onahs; 
               if(this.before_last_veses._onah == _DAY_) onahs = onahs + 1; 
               var next_month = chashash.getMonth(); 
               chashash.sub(Math.floor(onahs / 2)); 
               var onah = 'day onah'; 
               if(onahs % 2 == 1) onah = 'night onah'; 
               if(chashash.getMonth() == next_month) {
				  this.msg += vmsg.kevua_dilug_d(Math.abs(delta_DOM_onahs),onah,chashash,this.before_last_veses._reeyah,this.veses._reeyah)
                   found_kavuah = true; 
                  }
               }
            }
         }
      }
   if(h2 != null && h3 != null && h2 != h3 && delta_Span_direction != null) {
      if(delta_Span == (Math.ceil(h2 / 2) - Math.ceil(h3 / 2)) && delta_Span_direction == 'ascending') {
		 this.msg += vmsg.kevua_dilug_e(delta_Span,(Math.ceil(h1 / 2) + delta_Span),this.before_last_veses._reeyah,this.veses._reeyah)		  
         found_kavuah = true; 
      }else if(delta_Span_direction == 'ascending' && (h2 - h3) == delta_Span_onahs) {
         this.msg += vmsg.kevua_dilug_f(delta_Span_onahs, (h1 + delta_Span_onahs),this.before_last_veses._reeyah,this.veses._reeyah)
         found_kavuah = true; 
      }else if(delta_Span == (Math.ceil(h3 / 2) - Math.ceil(h2 / 2)) && delta_Span_direction == 'descending') {
         this.msg +=vmsg.kevua_dilug_g(delta_Span, (Math.ceil(h1 / 2) - delta_Span),this.before_last_veses._reeyah,this.veses._reeyah)
         found_kavuah = true; 
         }
      else if(delta_Span_direction == 'descending' && (h3 - h2) == delta_Span_onahs) {
		  this.msg += vmsg.kevua_dilug_h(delta_Span_onahs,(h1 - delta_Span_onahs),this.before_last_veses._reeyah,this.veses._reeyah)
         found_kavuah = true; 
         }
      }
   return found_kavuah; 
   }
	
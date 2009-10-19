Kevua.prototype.weeks_inbetween = function(r1,r2,r3){
	var d=r3.clone();
	var gap=0;
	while(!d.eq(r2)&&gap<365){
		gap=gap+1;
		d.nextDay();
	}
	var gap2=0;
	while(!d.eq(r1)&&gap2<365){
		gap2=gap2+1;
		d.nextDay();
	}
	if(gap==gap2&&gap%7==0)
		return(gap/7);
	return-1;
}
Kevua.prototype.sirug = function(){
   var found_kavuah = false; 
   var reeyahs = new Array(); 
   for(i in Cal_Veses._veses) {
   		if(!Cal_Veses._veses[i]._kessem) {
   			reeyahs.push(new Array(Cal_Veses._veses[i]._reeyah, Cal_Veses._veses[i]._reeyah.getDayOfWeek(), i)); 
		}
   }
   reeyahs.sort(JDate.Sort); 
   reeyahs.reverse(); 
   var max_pattern_length = Math.floor(reeyahs.length / 3); 
   for(pattern_length = 1; pattern_length <= max_pattern_length; pattern_length++) {
      var gaps = new Array(); 
      var failed = false; 
      for(i = 0; i < pattern_length; i++) {
         var r1 = reeyahs[i]; 
         var r2 = reeyahs[i + pattern_length]; 
         var r3 = reeyahs[i + (2 * pattern_length)]; 
         if(r1[1] == r2[1] && r1[1] == r3[1]) {
            gaps[i] = this.weeks_inbetween(r1[0], r2[0], r3[0]); 
            if(gaps[i] ==- 1) {
               failed = true; 
               break; 
            }
         }else {
            failed = true; 
            break; 
         }
      }
      if(!failed) {
         found_kavuah = true; 
         var next_chashash = reeyahs[pattern_length - 1][0].clone(); 
         for(x = 0; x < (gaps[pattern_length - 1] * 7); x++) {
			 	next_chashash.nextDay(); 
		 }
         if(pattern_length == 1) {
			 this.msg += vmsg.kevua_sirug_a(gaps[0],next_chashash,reeyahs[2][0],this.veses._reeyah)
         }else{
            var pattern_str = gaps[pattern_length - 1]; 
            for(x = pattern_length - 2; x > 0; x--) {
				pattern_str += ", " + gaps[x]; 
			}
            pattern_str += " and " + gaps[0]; 
			this.msg += vmsg.kevua_sirug_b (pattern_str,pattern_length * 3 
							,next_chashash,gaps[pattern_length - 1]
							,reeyahs[pattern_length - 1][0]
							,reeyahs[(3 * pattern_length) - 1][0]
							,this.veses._reeyah)

         }
      }
      var gaps_dom = new Array(); 
      var failed_dom = false; 
      for(i = 0; i < pattern_length; i++) {
         var r1 = reeyahs[i]; 
         var r2 = reeyahs[i + pattern_length]; 
         var r3 = reeyahs[i + (2 * pattern_length)]; 
         if(r1[0].getDay() == r2[0].getDay() && r1[0].getDay() == r3[0].getDay()) {
            var d = r3[0].clone(); 
            var gap = 0; 
            while(!d.eq(r2[0]) && gap < 12) {
               gap = gap + 1; 
               d.nextMonth(); 
            }
            var gap2 = 0; 
            while(!d.eq(r1[0]) && gap2 < 12) {
               gap2 = gap2 + 1; 
               d.nextMonth(); 
            }
            if(gap2 != gap || gap < 2) {
               failed_dom = true; 
               break; 
            }else{ 
				gaps_dom[i] = gap; 
			}
         }else {
		 	failed_dom = true; 
		 }
      }
      if(!failed_dom) {
         if(pattern_length == 1) {
            found_kavuah = true; 
            var chashash = reeyahs[0][0].clone(); 
            var c = 0; 
            while(c < gaps_dom[0]) {
               c++; 
               chashash.nextMonth(); 
            }
			this.msg += vmsg.kevua_sirug_c (gaps_dom[0] ,chashash ,reeyahs[2][0] ,this.veses._reeyah)
         }else {
            var different_days = true; 
            for(a = 1; a < pattern_length; a++) {
				if(reeyahs[a - 1][0].getDay() == reeyahs[a][0].getDay()) {
				   different_days = false; 
				   break; 
               }
			}
            if(different_days) {
               var pattern_str = ''; 
               for(i = pattern_length - 1; i >= 0; i--) {
			   		if(pattern_str == '') {
						pattern_str += reeyahs[i][0].getDay(); 
					}else {
						pattern_str += ", " + reeyahs[i][0].getDay(); 
					}
			   }
               var next_chashash = reeyahs[pattern_length - 1][0].clone(); 
               var c = 0; 
               while(c < gaps_dom[pattern_length - 1]) {
                  c++; 
                  next_chashash.nextNonth(); 
               }
               found_kavuah = true; 			   
			   this.msg += vmsg.kevua_sirug_d ( pattern_str , pattern_length * 3 ,next_chashash, reeyahs[(3 * pattern_length) - 1][0], this.veses._reeyah)
		//til herre ok	
            }else {
               var good_pattern = true; 
               var show_onahs_for = new Array(); 
               for(i = 1; i < pattern_length; i++) {
                  if(reeyahs[i - 1][0].getDay() == reeyahs[i][0].getDay()) {
                     show_onahs_for.push(i); 
                     show_onahs_for.push(i - 1); 
                     if(Cal_Veses._veses[reeyahs[i - 1][2]]._onah == Cal_Veses._veses[reeyahs[i][2]]._onah 
						|| Cal_Veses._veses[reeyahs[i - 1][2]]._onah != Cal_Veses._veses[reeyahs[i - 1 + pattern_length][2]]._onah
						|| Cal_Veses._veses[reeyahs[i - 1][2]]._onah != Cal_Veses._veses[reeyahs[i - 1 + (2 * pattern_length)][2]]._onah 
						|| Cal_Veses._veses[reeyahs[i][2]]._onah != Cal_Veses._veses[reeyahs[i + pattern_length][2]]._onah 
						|| Cal_Veses._veses[reeyahs[i][2]]._onah != Cal_Veses._veses[reeyahs[i + (2 * pattern_length)][2]]._onah) {
							good_pattern = false; 
							break; 
                      }
                  }
               }
               if(good_pattern) {
                  var pattern_str = ''; 
                  var comma = ""; 
                  var reeyah; 
                  for(i = pattern_length - 1; i >= 0; i--) {
                     reeyah = reeyahs[i][0].getDay(); 
                     for(j in show_onahs_for) {
					 	if(i == j) {
							reeyah = _ONAH_NAMES_[Cal_Veses._veses[reeyahs[i][2]]._onah] + " of day " + reeyah; 
							break; 
                        }
					 }
					 //	} was missing
                     pattern_str += comma + reeyah; 
                     if(i == pattern_length - 1) {
						 comma = ', '; 
					 }
                  }
                  var next_chashash = reeyahs[pattern_length - 1][0].clone(); 
                  var c = 0; 
                  while(c < gaps_dom[pattern_length - 1]) {
                     c++; 
                     next_chashash.nextMonth(); 
                  }
                  var next_chashash_str = next_chashash.toString(); 
                  for(i in show_onahs_for) {
				  		if(i == pattern_length - 1) {
							 next_chashash_str = _ONAH_NAMES_[Cal_Veses._veses[reeyahs[i][2]]._onah] + " of the " + next_chashash_str; 
							 break;
						}
				  }
                  found_kavuah = true; 
				   this.msg += vmsg.kevua_sirug_e ( pattern_str , pattern_length * 3 ,next_chashash_str, reeyahs[(3 * pattern_length) - 1][0], this.veses._reeyah)
                  }
               }
            }
         }
      }
   return found_kavuah; 
}
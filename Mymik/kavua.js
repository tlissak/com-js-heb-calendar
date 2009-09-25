var kavuah_reeyahs;
var kavuah_text;
var last_veses
var before_last_veses;
function find_kavuah(veses,cal){
	if(	cal._veses.length<3)
		return false;
	last_veses=veses.get_prev_veses(cal,true);
	before_last_veses=last_veses.get_prev_veses(cal,true);
	kavuah_text="<div class='title' style='margin-top:0px;margin-left:-20px'>You may have a Fixed Cycle!</div><div align='left' style='width:380px'><br>";
	kavuah_reeyahs=new Array();
	var result=false;
	if(find_chodesh_kavuah(veses,cal))
		result=true;
	if(find_dilug(veses,cal))
		result=true;
	if(find_sirug(veses,cal))
		result=true;
	for(i in veses._haflagas)
		if(veses._haflagas[i][1]>2&&veses._haflagas[i][2]==veses){
			kavuah_text+="A Fixed cycle (veses kavuah) has been  established by three flows all having haflagah number "+veses._haflagas[i][0];
			kavuah_text+=".<br><br>";result=true;}
	if(result){
		kavuah_text+="<br>Please have a rabbi review your calendar in order to confirm this and instruct you how to keep";
		kavuah_text+=" a calendar with a <strong>fixed</strong> cycle. You should inform the rabbi if you have given birth in the past 24 months. If the rabbi";
		kavuah_text+=" confirms that you do have a fixed cycle then your online calendar will no longer calculate your onot of anticipation";
		kavuah_text+=" correctly until you have completely uprooted the fixed cycle. Until that time you may enter your flows and manually enter the " 
		+" dates of separation according to the dates the rav has given you using the memos. You will be reminded of the onot of separation in the "
		+" manner you choose by clicking the \"Remind Me\" option when entering the memo.";
		kavuah_text+="</div>";
		kavuah_text+=buttons(new Array('OK'),new Array("this.blur();top.frames[1].Hide_Windows();"),460);
	}
	return result;
}		
function weeks_inbetween(r1,r2,r3){
	var d=r3.clone();
	var gap=0;
	while(!d.equals(r2)&&gap<365){
		gap=gap+1;
		d.next();
	}
	var gap2=0;
	while(!d.equals(r1)&&gap2<365){
		gap2=gap2+1;
		d.next();
	}
	if(gap==gap2&&gap%7==0)
		return(gap/7);
	return-1;
}
function get_min_haflagah(veses){
	if(veses._haflagas===undefined||veses._haflagas.length==0)
		return null;
	var min_i=null;
	for(i in veses._haflagas)
		if(min_i==null||veses._haflagas[i][0]<veses._haflagas[min_i][0])
			min_i=i;
	return veses._haflagas[min_i];
}
	
function find_chodesh_kavuah(veses,cal){
	var this_reeyah=veses._reeyah;
	var r=this_reeyah.clone();
	r.prev_mo();
	var two_months_in_a_row=false;
	for(i in cal._veses)
		if(cal._veses[i]._reeyah.equals(r)&&cal._veses[i]._onah==veses._onah){
			two_months_in_a_row=true;
			kavuah_reeyahs[2]=cal._veses[i];
			break;
		}
	if(two_months_in_a_row){
		r.prev_mo();
		for(j in cal._veses)
			if(cal._veses[j]._reeyah.equals(r)&&cal._veses[j]._onah==veses._onah){
				kavuah_text+="A Fixed cycle (veses kavuah) has been established by a flow starting on the ";
				kavuah_text+=_ONAH_NAMES_[veses._onah]+" of day "+veses._reeyah._d;
				kavuah_text+=" for the past three jewish months. <br>";kavuah_reeyahs[3]=cal._veses[j];
				kavuah_reeyahs[1]=veses;
				return true;
			}
	}
	return false;
};
function find_sirug(veses, cal) {
   var found_kavuah = false; 
   var reeyahs = new Array(); 
   for(i in cal._veses) 
   		if(!cal._veses[i]._kessem) 
   			reeyahs.push(new Array(cal._veses[i]._reeyah, cal._veses[i]._reeyah.get_dow(), i)); 
   reeyahs.sort(HDate_Sort); 
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
            gaps[i] = weeks_inbetween(r1[0], r2[0], r3[0]); 
            if(gaps[i] ==- 1) {
               failed = true; 
               break; 
               }
            }
         else {
            failed = true; 
            break; 
            }
         }
      if(!failed) {
         found_kavuah = true; 
         var next_chashash = reeyahs[pattern_length - 1][0].clone(); 
         for(x = 0; x < (gaps[pattern_length - 1] * 7); x++) next_chashash.next(); 
         if(pattern_length == 1) {
            kavuah_text += "A regularly spaced cycle (veses hasirug) has been established for stringency. "; 
            kavuah_text += "This pattern is due to a gap of " + gaps[0] + " weeks"; 
            kavuah_text += " between each of the past three flows. Aside from keeping your regular onot of separation, "; 
            kavuah_text += "you should also separate and perform an examination on the " + next_chashash; 
            kavuah_text += ". This pattern was established by flows occurring between the " + reeyahs[2][0]; 
            kavuah_text += " (" + reeyahs[2][0].to_eng() + ") and the "; 
            kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
            }
         else {
            var pattern_str = gaps[pattern_length - 1]; 
            for(x = pattern_length - 2; x > 0; x--) 
				pattern_str += ", " + gaps[x]; 
            pattern_str += " and " + gaps[0]; 
            kavuah_text += "An alternating regularly spaced cycle (veses hasirug) has been established for stringency. "; 
            kavuah_text += "This pattern is due to gaps of " + pattern_str + " weeks over the last " + pattern_length * 3 + " flows"; 
            kavuah_text += ". Aside from keeping your regular onot of separation, "; 
            kavuah_text += "you should also separate and perform an examination on the " + next_chashash; 
            kavuah_text += " (since this will be " + gaps[pattern_length - 1] + " weeks from the flow on the" + reeyahs[pattern_length - 1][0]; 
            kavuah_text += "). This pattern was established by flows occurring between the " + reeyahs[(3 * pattern_length) - 1][0]; 
            kavuah_text += " (" + reeyahs[(3 * pattern_length) - 1][0].to_eng() + ") and the "; 
            kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
            }
         }
      var gaps_dom = new Array(); 
      var failed_dom = false; 
      for(i = 0; i < pattern_length; i++) {
         var r1 = reeyahs[i]; 
         var r2 = reeyahs[i + pattern_length]; 
         var r3 = reeyahs[i + (2 * pattern_length)]; 
         if(r1[0]._d == r2[0]._d && r1[0]._d == r3[0]._d) {
            var d = r3[0].clone(); 
            var gap = 0; 
            while(!d.equals(r2[0]) && gap < 12) {
               gap = gap + 1; 
               d.next_mo(); 
               }
            var gap2 = 0; 
            while(!d.equals(r1[0]) && gap2 < 12) {
               gap2 = gap2 + 1; 
               d.next_mo(); 
               }
            if(gap2 != gap || gap < 2) {
               failed_dom = true; 
               break; 
               }
            else gaps_dom[i] = gap; 
            }
         else failed_dom = true; 
         }
      if(!failed_dom) {
         if(pattern_length == 1) {
            found_kavuah = true; 
            var chashash = reeyahs[0][0].clone(); 
            var c = 0; 
            while(c < gaps_dom[0]) {
               c++; 
               chashash.next_mo(); 
               }
            kavuah_text += "A regularly spaced cycle (veses hasirug) has been established for stringency. "; 
            kavuah_text += "This pattern is due to a gap of excactly " + gaps_dom[0] + " months"; 
            kavuah_text += " between each of the past three flows. Aside from keeping your regular onot of separation, "; 
            kavuah_text += "you should also separate and perform an examination on the " + chashash; 
            kavuah_text += ". This pattern was established by flows occurring between the " + reeyahs[2][0]; 
            kavuah_text += " (" + reeyahs[2][0].to_eng() + ") and the "; 
            kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
            }
         else {
            var different_days = true; 
            for(a = 1; a < pattern_length; a++) if(reeyahs[a - 1][0]._d == reeyahs[a][0]._d) {
               different_days = false; 
               break; 
               }
            if(different_days) {
               var pattern_str = ''; 
               for(i = pattern_length - 1; i >= 0; i--) if(pattern_str == '') pattern_str += reeyahs[i][0]._d; 
               else pattern_str += ", " + reeyahs[i][0]._d; 
               var next_chashash = reeyahs[pattern_length - 1][0].clone(); 
               var c = 0; 
               while(c < gaps_dom[pattern_length - 1]) {
                  c++; 
                  next_chashash.next_mo(); 
                  }
               found_kavuah = true; 
               kavuah_text += "An alternating regularly spaced cycle (veses hasirug) has been established for stringency. "; 
               kavuah_text += "This pattern of flows on days " + pattern_str + " has repeated itself three times over the past "; 
               kavuah_text += pattern_length * 3 + " flows. "
			   kavuah_text += "Aside from keeping your regular onot of separation, "; 
               kavuah_text += "you should also separate and perform an examination on the " + next_chashash; 
               kavuah_text += ". This pattern was established by flows occurring between the " + reeyahs[(3 * pattern_length) - 1][0]; 
               kavuah_text += " (" + reeyahs[(3 * pattern_length) - 1][0].to_eng() + ") and the "; 
               kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
               }
            else {
               var good_pattern = true; 
               var show_onahs_for = new Array(); 
               for(i = 1; i < pattern_length; i++) {
                  if(reeyahs[i - 1][0]._d == reeyahs[i][0]._d) {
                     show_onahs_for.push(i); 
                     show_onahs_for.push(i - 1); 
                     if(cal._veses[reeyahs[i - 1][2]]._onah == cal._veses[reeyahs[i][2]]._onah 
						|| cal._veses[reeyahs[i - 1][2]]._onah != cal._veses[reeyahs[i - 1 + pattern_length][2]]._onah
						|| cal._veses[reeyahs[i - 1][2]]._onah != cal._veses[reeyahs[i - 1 + (2 * pattern_length)][2]]._onah 
						|| cal._veses[reeyahs[i][2]]._onah != cal._veses[reeyahs[i + pattern_length][2]]._onah 
						|| cal._veses[reeyahs[i][2]]._onah != cal._veses[reeyahs[i + (2 * pattern_length)][2]]._onah) {
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
                     reeyah = reeyahs[i][0]._d; 
                     for(j in show_onahs_for) if(i == j) {
                        reeyah = _ONAH_NAMES_[cal._veses[reeyahs[i][2]]._onah] + " of day " + reeyah; 
                        break; 
                        }
                     pattern_str += comma + reeyah; 
                     if(i == pattern_length - 1) comma = ', '; 
                     }
                  var next_chashash = reeyahs[pattern_length - 1][0].clone(); 
                  var c = 0; 
                  while(c < gaps_dom[pattern_length - 1]) {
                     c++; 
                     next_chashash.next_mo(); 
                     }
                  var next_chashash_str = next_chashash.toString(); 
                  for(i in show_onahs_for) 
				  		if(i == pattern_length - 1) {
							 next_chashash_str = _ONAH_NAMES_[cal._veses[reeyahs[i][2]]._onah] + " of the " + next_chashash_str; 
							 break;
						}
                  found_kavuah = true; 
                  kavuah_text += "An alternating regularly spaced cycle (veses hasirug) has been established for stringency. "; 
                  kavuah_text += "This pattern of flows on the following days of the month: "; 
                  kavuah_text += pattern_str + " has repeated itself three times over the past "; 
                  kavuah_text += pattern_length * 3 + " flows. " 
				  kavuah_text += "Aside from keeping your regular onot of separation, "; 
                  kavuah_text += "you should also separate and perform an examination on the " + next_chashash_str; 
                  kavuah_text += ". This pattern was established by flows occurring between the " + reeyahs[(3 * pattern_length) - 1][0]; 
                  kavuah_text += " (" + reeyahs[(3 * pattern_length) - 1][0].to_eng() + ") and the "; 
                  kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
                  }
               }
            }
         }
      }
   return found_kavuah; 
   }
function find_dilug(veses, cal) {
   var d1 = veses._reeyah._d; 
   var m1 = veses._reeyah._m; 
   var h1 = get_min_haflagah(veses); 
   var o1 = veses._onah; 
   var d2 = last_veses._reeyah._d; 
   var m2 = last_veses._reeyah._m; 
   if(h1 != null) var h2 = get_min_haflagah(last_veses); 
   var o2 = last_veses._onah; 
   var d3 = before_last_veses._reeyah._d; 
   var m3 = before_last_veses._reeyah._m; 
   if(h2 != null) var h3 = get_min_haflagah(before_last_veses); 
   var o3 = before_last_veses._onah; 
   var temp = veses._reeyah.clone(); 
   temp.prev_mo(); 
   var delta_DOM_direction = null 
   var delta_DOM = 0; 
   var delta_DOM_onahs = 0; 
   if(m2 == temp._m) {
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
   temp = last_veses._reeyah.clone(); 
   temp.prev_mo(); 
   var found_kavuah = false; 
   if(m3 == temp._m && delta_DOM_direction != null) {
      if(d2 > d3 || (d2 == d3 && o2 == _DAY_ && o3 == _NIGHT_)) {
         if(delta_DOM_direction == 'ascending' && delta_DOM == (d2 - d3)) {
            var chashash = veses._reeyah.clone(); 
            chashash.next_mo(); 
            var next_month = chashash._m; 
            chashash.add_days(delta_DOM); 
            if(chashash._m == next_month) {
               kavuah_text += "An incremental fixed cycle (veses hadilug) has been established for stringency. "; 
               kavuah_text += "This pattern is due to a gap of " + (d2 - d3) + " day"; 
               if((d2 - d3) > 1) kavuah_text += "s"; 
               kavuah_text += " between each monthly flow. Aside from keeping your regular onot of separation, "; 
               kavuah_text += "you should also separate and perform an examination on the " + chashash; 
               kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
               kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
               kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
               found_kavuah = true; 
               }
            }
         else {
            var delta_DOM_onahs2 = 2 * (d2 - d3); 
            if(o2 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 + 1; 
            if(o3 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 - 1; 
            if(delta_DOM_direction == 'ascending' && delta_DOM_onahs2 == delta_DOM_onahs) {
               var chashash = veses._reeyah.clone(); 
               chashash.next_mo(); 
               var onahs = delta_DOM_onahs; 
               if(before_last_veses._onah == _NIGHT_) onahs = onahs + 1; 
               var next_month = chashash._m; 
               chashash.add_days(Math.floor(onahs / 2)); 
               var onah = 'day onah'; 
               if(onahs % 2 == 1) onah = 'night onah'; 
               if(chashash._m == next_month) {
                  kavuah_text += "An incremental fixed cycle (veses hadilug) has been established for stringency. "; 
                  kavuah_text += "This pattern is due to a gap of " + delta_DOM_onahs + " onah"; 
                  if(delta_DOM_onahs > 1) kavuah_text += "s"; 
                  kavuah_text += " between each monthly flow. Aside from keeping your regular onot of separation, "; 
                  kavuah_text += "you should also separate and perform an examination on the " + onah + " of " + chashash; 
                  kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
                  kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
                  kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
                  found_kavuah = true; 
                  }
               }
            }
         }
      else if(d2 != d3 || (d2 == d3 && o2 != o3)) {
         if(delta_DOM_direction == 'descending' && delta_DOM == (d3 - d2)) {
            var chashash = veses._reeyah.clone(); 
            chashash.next_mo(); 
            var next_month = chashash._m; 
            chashash.subtract_days(delta_DOM); 
            if(chashash._m == next_month) {
               kavuah_text += "A decreasing incremental fixed cycle (veses hadilug) has been established for stringency. "; 
               kavuah_text += "This pattern is due to a gap of " + Math.abs(d2 - d3) + " day"; 
               if((d2 - d3) > 1) kavuah_text += "s"; 
               kavuah_text += " between each monthly flow. Aside from keeping your regular onot of separation, "; 
               kavuah_text += "you should also separate and perform an examination on the " + chashash; 
               kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
               kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
               kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
               found_kavuah = true; 
               }
            }
         else {
            var delta_DOM_onahs2 = 2 * (d3 - d2); 
            if(o3 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 + 1; 
            if(o2 == _NIGHT_) delta_DOM_onahs2 = delta_DOM_onahs2 - 1; 
            if(delta_DOM_direction == 'descending' && delta_DOM_onahs2 == delta_DOM_onahs) {
               var chashash = veses._reeyah.clone(); 
               chashash.next_mo(); 
               var onahs = delta_DOM_onahs; 
               if(before_last_veses._onah == _DAY_) onahs = onahs + 1; 
               var next_month = chashash._m; 
               chashash.subtract_days(Math.floor(onahs / 2)); 
               var onah = 'day onah'; 
               if(onahs % 2 == 1) onah = 'night onah'; 
               if(chashash._m == next_month) {
                  kavuah_text += "A decreasing incremental fixed cycle (veses hadilug) has been established for stringency. "; 
                  kavuah_text += "This pattern is due to a gap of " + Math.abs(delta_DOM_onahs) + " onah"; 
                  if(delta_DOM_onahs > 1) kavuah_text += "s"; 
                  kavuah_text += " between each monthly flow. Aside from keeping your regular onot of separation, "; 
                  kavuah_text += "you should also separate and perform an examination on the " + onah + " of " + chashash; 
                  kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
                  kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
                  kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
                  found_kavuah = true; 
                  }
               }
            }
         }
      }
   if(h2 != null && h3 != null && h2 != h3 && delta_Span_direction != null) {
      if(delta_Span == (Math.ceil(h2 / 2) - Math.ceil(h3 / 2)) && delta_Span_direction == 'ascending') {
         kavuah_text += "An incremental fixed cycle based on span (veses hadilug) has been established for stringency. "; 
         kavuah_text += "This pattern is due to a gap of " + delta_Span + " days between haflagah days over the past three flows. "; 
         kavuah_text += "Aside from keeping your regular onot of separation, you should also separate and perform an examination " + (Math.ceil(h1 / 2) + delta_Span); 
         kavuah_text += " days from your next hefsek taharah"; 
         kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
         kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
         kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
         found_kavuah = true; 
         }
      else if(delta_Span_direction == 'ascending' && (h2 - h3) == delta_Span_onahs) {
         kavuah_text += "An incremental fixed cycle based on span (veses hadilug) has been established for stringency. "; 
         kavuah_text += "This pattern is due to a gap of " + delta_Span_onahs + " onahs between haflagah numbers over the past three flows. "; 
         kavuah_text += "Aside from keeping your regular onot of separation, you should also separate and perform an examination " + (h1 + delta_Span_onahs); 
         kavuah_text += " onahs from your next hefsek taharah"; 
         kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
         kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
         kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
         found_kavuah = true; 
         }
      else if(delta_Span == (Math.ceil(h3 / 2) - Math.ceil(h2 / 2)) && delta_Span_direction == 'descending') {
         kavuah_text += "A decreasing incremental fixed cycle based on span (veses hadilug) has been established for stringency. "; 
         kavuah_text += "This pattern is due to a gap of " + delta_Span + " days between haflagah days over the past three flows. "; 
         kavuah_text += "Aside from keeping your regular onot of separation, you should also separate and perform an examination " + (Math.ceil(h1 / 2) - delta_Span); 
         kavuah_text += " days from your next hefsek taharah"; 
         kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
         kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
         kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
         found_kavuah = true; 
         }
      else if(delta_Span_direction == 'descending' && (h3 - h2) == delta_Span_onahs) {
         kavuah_text += "A decreasing incremental fixed cycle based on span (veses hadilug) has been established for stringency. "; 
         kavuah_text += "This pattern is due to a gap of " + delta_Span_onahs + " onahs between haflagah numbers over the past three flows. "; 
         kavuah_text += "Aside from keeping your regular onot of separation, you should also separate and perform an examination " + (h1 - delta_Span_onahs); 
         kavuah_text += " onahs from your next hefsek taharah"; 
         kavuah_text += ". This pattern was established by flows occurring between the " + before_last_veses._reeyah; 
         kavuah_text += " (" + before_last_veses._reeyah.to_eng() + ") and the "; 
         kavuah_text += veses._reeyah + " (" + veses._reeyah.to_eng() + "). <br><br>"; 
         found_kavuah = true; 
         }
      }
   return found_kavuah; 
   }
	
function load_veses(id,start_date,start_time,onah,hefsek_date,cause,cal,haflagah,chodesh,leadup_cause,leadup_date,leadup_onah){
	var add_chodesh_dates = function(cal,chodesh,reeyah){
		if(chodesh.length<3)return;
		chodesh_array=chodesh.split(',');
		for(i in chodesh_array){
			var temp=chodesh_array[i].split('(');
			temp[0]=temp[0].replace(' ','');
			var day_of_mo=Number(temp[0]);
			temp[1]=temp[1].replace(' ','');
			temp[1]=temp[1].replace(')','');
			var date=reeyah.clone();
			if(day_of_mo<date.getDay()||(day_of_mo==date.getDay()&&temp[1]=='night'))
				date.next_mo();
			date.getDay()=day_of_mo;
			e=new Event(date,_CHODESH_,null);
			e._onah=_NIGHT_;
			if(temp[1]=='day')
				e._onah=_DAY_;
			if(date.getDay()<=lastDayOfHebrewMonth(date._m,date._y))
				cal._events.push(e);
		}
	}
	if(chodesh!=undefined&&chodesh!=null&&chodesh!='')
		add_chodesh_dates(cal,chodesh,start_date);
		time_array=time(start_time,false);
		ampm='pm';
	if(time_array[2])
		ampm='am';
		new_veses(null,null,null,start_date.getDay(),start_date._m,start_date._y,String(time_array[0]),String(time_array[1]),ampm,cause,cal,true,false,null,onah);
		v=cal._veses[cal._veses.length-1];
		v._id=id;
		if(leadup_date!==undefined&&leadup_date!=null&&leadup_date!='null'&&leadup_date!='0'){
			v._leadup_cause=leadup_cause;
			v._leadup_onah=leadup_onah;
			v._leadup_date=leadup_date;
			if(!v._hefsek_confirmed){
				days_already_red=1;
				kessem=leadup_date.clone();
				
				//---------------------------------------------------------
				while(v._reeyah.gt(kessem)){
					days_already_red++;
					kessem.nextDay();
				}
				//--------------------------------------------------------
				
				v._hefsek=v._reeyah.clone();
				days_till_min_ht=5-days_already_red;
				if(days_till_min_ht>0)
					v._hefsek.add(days_till_min_ht);
			}
		}
	v.set_haflagah_list(haflagah);
	if(hefsek_date!=''&&hefsek_date!='null'){
		v._hefsek=hefsek_date;
		v.confirm_hefsek(cal,false);
	}
}
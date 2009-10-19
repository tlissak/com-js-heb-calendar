Veses.prototype.getEarliestHefsekTaharaNumber=function(){
	var v=this;
	if(v.StartedInWhiteWeek()||v._cause==Cause.birth_s){
		min_ht=0;
	}else if(v._leadup_date!==undefined){
		days_already_red=1;
		kessem=v._leadup_date.clone();
		while(v._reeyah.gt(kessem)){
			days_already_red++;
			kessem.nextDay();
		}
		min_ht=5-days_already_red;
		if(min_ht<0){
			mint_ht=0;
		}
	}else if(v._cause==Cause.birth_d){
		min_ht=6;
	}else if(v._cause==Cause.preglost&&!v.goesOnCalendar()){
		min_ht=6;
	}else{
		min_ht=4;
	}
	return min_ht;
}
Veses.prototype.getEarliestHefsekTaharaDate=function(){
	return this._reeyah.clone().add(this.getEarliestHefsekTaharaNumber());
}
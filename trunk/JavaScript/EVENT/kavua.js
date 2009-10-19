var kavuah_text;
var last_veses
var before_last_veses;

function Kevua(_veses){
	if(	Cal_Veses._veses.length>2){	
	
		this.veses 				= _veses
		this.last_veses			= this.veses.get_prev_veses();
		this.before_last_veses	= this.last_veses.get_prev_veses();
		if (this.chodesh()){	this.establish =  true	}
		if (this.dilug()){		this.establish =  true	}
		if (this.sirug()){		this.establish =  true	}
		
		for(i in this.veses._haflagas){
			if(this.veses._haflagas[i][1]>2&&this.veses._haflagas[i][2]==this.veses){
				this.msg += vmsg.kevua_haflaga(this.veses._haflagas[i][0])
				this.establish =  true ;
			}
		}
		if(this.establish ==  true){
			this.msg = _("k_you_may") + this.msg
			this.msg += _("k_new_msg")
		}
	}	
}
Kevua.prototype.reeyahs		= new Array()
Kevua.prototype.establish 	= false
Kevua.prototype.veses 		= null
Kevua.prototype.msg 		= ""

Kevua.prototype.chodesh = function(){
	vOna = this.veses._onah
	var this_reeyah=	this.veses._reeyah;
	var r=this_reeyah.clone().prevMonth();
	var two_months_in_a_row=false;
	for(i in Cal_Veses._veses)
		if(Cal_Veses._veses[i]._reeyah.eq(r)&&Cal_Veses._veses[i]._onah==vOna){
			two_months_in_a_row=true;
			this.reeyahs[2]=Cal_Veses._veses[i];
			break;
		}
	if(two_months_in_a_row){
		r.prevMonth();
		for(j in Cal_Veses._veses){
			if(Cal_Veses._veses[j]._reeyah.eq(r)&&Cal_Veses._veses[j]._onah==vOna){
				this.msg = vmsg.kevua_chodesh(_ONAH_NAMES_[vOna],this.veses._reeyah.getDay())
				this.reeyahs[3]=Cal_Veses._veses[j];
				this.reeyahs[1]=this.veses;
				return true;
			}
		}
	}
	return false;
}	
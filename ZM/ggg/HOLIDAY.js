/***************************************
 *             holidays.js             *
 ***************************************
 * Jewish holidays and events          *
 ***************************************
 * History                             *
 *  14/03/2005: v1.4: Holiday object,  *
 *              for Yom Tov support.   *
 *  13/12/2004: v1.31				   *
 ***************************************
 * March 14, 2004 - AdarII 3, 5765     *
 *  v1.4                               *
 *                                     *
 ***************************************
 * (c) Gabriel Zerbib,                 *
 *   gabriel@bumpt.net                 *
 *   http://www.bumpt.net              *
 *   http://www.calj.net               *
 *                                     *
 * It is strictly forbidden to use or  *
 * reproduce all or parts of this      *
 * program without the author's        *
 * explicit permission.                *
 * Commercial use of this program is   *
 * subject to purchase. Please contact *
 * the author.                         *
 ***************************************/
function JEvent(type, startDate, endDate){
	this.startDate = startDate;
	this.endDate = endDate;
	this.type = type;
	this.name = "";
	this.link = "";
	this.localize();
	this.format = function()	{
		switch(this.endDate.minus(this.startDate)){
			case 0: return "";
			case 1: return "AND";
			default: return "FROM_TO";
		}
	}
	this.display = function(){
		switch(this.format()){
			case "AND": case "FROM_TO":
			return this.startDate.WeekdayName() + " " + this.startDate.getDay() + " " + (this.startDate.getMonth() != this.endDate.getMonth() ? this.startDate.MonthName() : "") + " " + this.conj() + " " + this.endDate.WeekdayName() + " " + this.endDate;
			default:
				return this.startDate.WeekdayName() + " " + this.startDate;				
		}
	}
}


JEvent.prototype.localize = function(){
	switch(this.type){
		case HOLIDAYS.ROSH_HASHANA:	this.name = "Rosh Hashana" ; this.lng = "rosh_hashana" ;		this.link = "roshhashana.php"; break;
		case HOLIDAYS.GDALIA:		this.name = "Jeûne de Guédalia"; this.lng = "fast_gedalia" ;	this.link = "gdalia.php"; break;
		case HOLIDAYS.YOM_KIPPUR:	this.name = "Yom Kippour";	 this.lng = "yom_kipur" ;	this.link = "kipour.php"; break;
		case HOLIDAYS.SUCCOT:		this.name = "Souccot";	 this.lng = "sukot" ;		this.link = "souccot.php"; break;
		case HOLIDAYS.HOSHAANA_RABBA:	this.name = "Hoshaâna Rabba";	 this.lng = "hoshana_raba" ;	this.link = "hoshaanaraba.php"; break;
		case HOLIDAYS.SHMINI_ATSERET:	this.name = "Shemini Atséret";	this.lng = "shmini_atseret" ;	this.link = "shminiatseret.php"; break;
		case HOLIDAYS.SIMCHAT_TORAH:	this.name = "Simchat Torah";	this.lng = "simchat_tora" ;	this.link = "simchattorah.php"; break;
		case HOLIDAYS.CHANUKA:		this.name = "Hhanouka";		this.lng = "chanuka" ;	this.link = "chanuka.php"; break;
		case HOLIDAYS.TEVET_10:		this.name = "Jeûne du 10 Tevet"; this.lng = "fast_tevet"	; this.link = "10tevet.php"; break;
		case HOLIDAYS.SHVAT_15:		this.name = "Tou bi Shvat";	this.lng = "tu_bishvat"	;	this.link = "15shvat.php"; break;
		case HOLIDAYS.PURIM_FAST:		this.name = "Jeûne d'Esther";	this.lng = "fast_esther" ;		this.link = "pourim.php"; break;
		case HOLIDAYS.PURIM:		this.name = "Pourim";	this.lng = "purim" ;		this.link = "pourim.php"; break;
		case HOLIDAYS.PESACH:		this.name = "Pessahh";		this.lng = "pesach" ;	this.link = "pesach.php"; break;
		case HOLIDAYS.YOM_HASHOA: this.name = "Yom haShoa"; this.lng = "yom_hashoa" ; this.link = "yomhashoa.php"; break;
		case HOLIDAYS.YOM_HAATSMAUT:	this.name = "Yom ha Âtsma'out";	this.lng = "yom_haatsmaut" ;	this.link = "yomhaatsmaout.php"; break;
		case HOLIDAYS.OMER_33:		this.name = "Lag ba 'Omer";		this.lng = "lag_baomer" ; this.link = "33omer.php"; break;
		case HOLIDAYS.SHAVUOT:		this.name = "Shavou'ot";	this.lng = "shavuot" ;	this.link = "shavuot.php"; break;
		case HOLIDAYS.TAMUZ_17:		this.name = "Jeûne de Tamouz";	this.lng = "fast_tamuz" ;	this.link = "17tamuz.php"; break;
		case HOLIDAYS.AV_9:		this.name = "Tisha bé Av";		this.lng = "tisha_beav" ;this.link = "9av.php"; break;
	}
}

JEvent.prototype.prefix = function(){
	switch(this.format()){
		case "AND": return "les";
		case "": return "le";
		default: return "du";
	}
}

JEvent.prototype.conj = function(){
	switch(this.format()){
		case "AND": return "et";
		case "FROM_TO": return "au";
		default: return "";
	}
}
function Holiday(nType, hStart, hEnd, nLength, arrYomTov){
        this.Class = Holiday;
		
        this.type = nType;
        this.hStartDate = new HDate(hStart);
        this.hEndDate = new HDate(hEnd);
        this.nLength = nLength;
        this[0] = this.hStartDate;
        this.arrYomTov = (typeof(arrYomTov) != "undefined") ?  arrYomTov : [];
}
HOLIDAYS = {
        ISRAEL:         false,
        GALUT:          true,

		ROSH_HASHANA:   0,
        GDALIA:         1,
        YOM_KIPPUR:     2,
        SUCCOT:         3,
        HOSHAANA_RABBA: 4,
        SHMINI_ATSERET: 5,
        SIMCHAT_TORAH:  6,
        CHANUKA:        7,
        TEVET_10:       8,
        SHVAT_15:       9,
        PURIM_FAST:     10,
        PURIM:          11,
        PESACH:         12,
        YOM_HASHOA:     13,
        YOM_HAATSMAUT:  14,
        OMER_33:        15,
        SHAVUOT:        16,
        TAMUZ_17:       17,
        AV_9:           18
};
HOLIDAYS.RoshHashana = function(HYear){
        return new Holiday(HOLIDAYS.ROSH_HASHANA, new HDate(1, HDate.TISHRI, HYear), new HDate(2, HDate.TISHRI, HYear), 2, [1, 1]);
}

HOLIDAYS.Gdalia = function(HYear){
        var hdate = new HDate(3, HDate.TISHRI, HYear);
        if(hdate.getDayOfWeek() == HDate.SHABBAT){                hdate.add(1);}
        return new Holiday(HOLIDAYS.GDALIA, hdate, hdate,  1);
}
HOLIDAYS.YomKippur = function(HYear){
        return new Holiday(HOLIDAYS.YOM_KIPPUR, new HDate(10, HDate.TISHRI, HYear), new HDate(10, HDate.TISHRI, HYear),  1, [1]);
}

HOLIDAYS.Succot = function(HYear, bGalut){
        if(typeof(bGalut) == "undefined"){ bGalut = false;}
        var h = new HDate(15, HDate.TISHRI, HYear);
        var hEnd = new HDate(h);
        hEnd.add(6);
        return new Holiday(HOLIDAYS.SUCCOT,  h, hEnd, 6, [1, bGalut, 0, 0, 0, 0]);
}
HOLIDAYS.HoshaanaRabba = function(HYear){
        return new Holiday(HOLIDAYS.HOSHAANA_RABBA, new HDate(21, HDate.TISHRI, HYear),  new HDate(21, HDate.TISHRI, HYear),1);
}
HOLIDAYS.ShminiAtseret = function(HYear, bGalut){
        var h = new HDate(22, HDate.TISHRI, HYear);
        var hEnd = new HDate(h);
        if(bGalut){  hEnd.add(1);}
        return new Holiday(HOLIDAYS.SHMINI_ATSERET, h,hEnd,(bGalut ? 2 : 1),  [1, 1]);
}
HOLIDAYS.SimchatTorah = function(HYear, bGalut){
        var h = new HDate(bGalut ? 23 : 22, HDate.TISHRI, HYear);
        return new Holiday(HOLIDAYS.SIMCHAT_TORAH, h,h,1);
}
HOLIDAYS.Chanuka = function(HYear){
        var h1 = new HDate(25, HDate.KISLEV, HYear);
        var h8 = (new HDate(h1)).add(7);
        return new Holiday(HOLIDAYS.CHANUKA, h1, h8, 8);
}
HOLIDAYS.Tevet10 = function(HYear){
        var h = new HDate(10, HDate.TEVET, HYear);
        if(h.getDayOfWeek() == HDate.SHABAT){                h.add(1);}
        return new Holiday(HOLIDAYS.TEVET_10, h, h, 1);
}
HOLIDAYS.Shvat15 = function(HYear){
        var h = new HDate(15, HDate.SHVAT, HYear);
        return new Holiday(HOLIDAYS.SHVAT_15, h, h, 1);
}
HOLIDAYS.PurimFast = function(HYear){
        var h = new HDate(13, HDate.ADAR2, HYear);
        if(h.getDayOfWeek() == HDate.SHABBAT){          h.sub(2);}
        return new Holiday(HOLIDAYS.PURIM_FAST, h, h, 1);
}
HOLIDAYS.Purim = function(HYear){
        var h = new HDate(14, HDate.ADAR2, HYear);
        return new Holiday(HOLIDAYS.PURIM, h, h, 1);
}
HOLIDAYS.Pesach = function(HYear, bGalut){
        var h = new HDate(15, HDate.NISSAN, HYear);
        var hEnd = new HDate(bGalut ? 22: 21, HDate.NISSAN, HYear);
        return new Holiday(HOLIDAYS.PESACH, h, hEnd, bGalut ? 7 : 8, [1,bGalut,0,0,0,0,1,1]);
}
HOLIDAYS.YomHashoa = function(HYear){
        var h = new HDate(27, HDate.NISSAN, HYear);
        if(h.getDayOfWeek() == HDate.SHABBAT){              h.add(1);
		}else if(h.getDayOfWeek() == HDate.SHISHI){          h.add(2);}
        return new Holiday(HOLIDAYS.YOM_HASHOA, h, h, 1);
}
HOLIDAYS.YomHaatsmaut = function(HYear){
        var h = new HDate(5, HDate.IYAR, HYear);
        if(h.getDayOfWeek() == HDate.SHABAT){     h.sub(1);}
        if(h.getDayOfWeek() == HDate.SHISHI){     h.sub(1);}
        return new Holiday(HOLIDAYS.YOM_HAATSMAUT, h, h, 1);
}
HOLIDAYS.Omer33 = function(HYear){
        var h = new HDate(18, HDate.IYAR, HYear);
        return new Holiday(HOLIDAYS.OMER_33, h, h, 1);
}
HOLIDAYS.Shavuot = function(HYear, bGalut){
        var h = new HDate(6, HDate.SIVAN, HYear);
        var hEnd = new HDate(h);
        if(bGalut){                hEnd.add(1);}
        return new Holiday(HOLIDAYS.SHAVUOT, h, hEnd, bGalut ? 2 : 1, [1,1]);
}
HOLIDAYS.Tamuz17 = function(HYear){
        var h = new HDate(17, HDate.TAMUZ, HYear);
        if(h.getDayOfWeek() == HDate.SHABAT){  h.add(1);}
        return new Holiday(HOLIDAYS.TAMUZ_17, h, h, 1);
}
HOLIDAYS.Av9 = function(HYear){
        var h = new HDate(9, HDate.AV, HYear);
        if(h.getDayOfWeek() == HDate.SHABAT){ h.add(1);}
        return new Holiday(HOLIDAYS.AV_9, h, h, 1);
}
HOLIDAYS.events = [
        HOLIDAYS.RoshHashana,
        HOLIDAYS.Gdalia,
        HOLIDAYS.YomKippur,
        HOLIDAYS.Succot,
        HOLIDAYS.HoshaanaRabba,
        HOLIDAYS.ShminiAtseret,
        HOLIDAYS.SimchatTorah,
        HOLIDAYS.Chanuka,
        HOLIDAYS.Tevet10,
        HOLIDAYS.Shvat15,
        HOLIDAYS.PurimFast,
        HOLIDAYS.Purim,
        HOLIDAYS.Pesach,
        HOLIDAYS.YomHashoa,
        HOLIDAYS.YomHaatsmaut,
        HOLIDAYS.Omer33,
        HOLIDAYS.Shavuot,
        HOLIDAYS.Tamuz17,
        HOLIDAYS.Av9
];
HOLIDAYS.nextHoliday = function(hdate){
        var i;
        var y = hdate.getYear();
        var fn;
        var holiday = null;
       
        while(true){
                for(i = 0; i < HOLIDAYS.events.length; i ++){
                        fn = HOLIDAYS.events[i];                       
                        holiday = fn(y, true);
                        if(holiday.hStartDate.gt(hdate)){
                                return new JEvent(i, new GDate(holiday.hStartDate), new GDate(holiday.hEndDate));
						}
                }
                y ++;
        }
}
/* Parameters: in JDate jdate, in optional int nFromType
 * Return: a Holiday object representing the holiday of the passed JDate,
 *                               or null if no holiday occurs on this date. */
 
 /*returns Holiday*/
HOLIDAYS.currentHoliday = function(/*in JDate*/ jdate, /*in optional int */ nFromType){
        if( (typeof(nFromType) == "undefined") || (nFromType == null) ){     nFromType = 0}
        var hdate = null;
        var holiday = null;       
        if(jdate.Class == HDate){
                hdate = jdate;
		}else if(jdate.Class == GDate){
                hdate = new HDate(jdate);
		}else{
                throw "Type mismatch error in HOLIDAYS.currentHolidays: expected subclass of JDate.";
		}
	    var i;
        var y = hdate.getYear();
        var n;		
        for(n = 2; n; --n, ++y) {
                for(i = nFromType; i < HOLIDAYS.events.length; ++i){					
                   fn = HOLIDAYS.events[i];
                   holiday = fn(y, true);
                   if(holiday.hStartDate.gt(hdate)){     return null;}
                   if( holiday.hEndDate.gte(hdate) ){   return holiday;}                       
                }
        }
}

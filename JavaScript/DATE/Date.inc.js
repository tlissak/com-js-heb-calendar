HDate.prototype.Sort = function(a,b){
	if(a[0].lt(b[0]))	return 1;
	if(a[0].eq(b[0]))	return 0;
	return -1;
};
HDate.prototype.toString=function(){return this._d+" "+this._m+" . "+this._y;}
HDate.prototype.isShabbosOrMoed=function(){
	if(this.get_dow()==7)return true;
	if(this.equals(getJewishHolidayDate(0,this._y))||this.equals(getJewishHolidayDate(1,this._y))
			||this.equals(getJewishHolidayDate(2,this._y))||this.equals(getJewishHolidayDate(9,this._y))
			||this.equals(getJewishHolidayDate(11,this._y))||this.equals(getJewishHolidayDate(17,this._y))
			||this.equals(getJewishHolidayDate(26,this._y))||this.equals(getJewishHolidayDate(42,this._y)))
	return true;
	if(isDiaspora()&&(this.equals(getJewishHolidayDate(3,this._y))||this.equals(getJewishHolidayDate(10,this._y))
			||this.equals(getJewishHolidayDate(12,this._y))||this.equals(getJewishHolidayDate(39,this._y))
			||this.equals(getJewishHolidayDate(40,this._y)))) return true;return false;};

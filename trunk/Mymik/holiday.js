function getJewishHolidayName(holiday){
	switch(holiday){case 0:return"Rosh Hashanah I";case 1:return"Yom Kippur";case 2:return"Sukkot I";
	case 3:if(isDiaspora())return"Sukkot II";else return"Hol Hamoed";case 4:return"Hol Hamoed";
	case 5:return"Hol Hamoed";case 6:return"Hol Hamoed";case 7:return"Hol Hamoed";case 8:return"Hoshanah Rabbah";
	case 9:return"Shemini Azereth";case 10:return"Simchat Torah";case 11:return"Pesach I";
	case 12:if(isDiaspora())return"Pesach II";else return"Hol Hamoed";case 13:return"Hol Hamoed";
	case 14:return"Hol Hamoed";case 15:return"Hol Hamoed";case 16:return"Hol Hamoed";case 17:return"Pesach VII";
	case 18:return"Hanukkah I";case 19:return"Hanukkah II";case 20:return"Hanukkah III";case 21:return"Hanukkah IV";
	case 22:return"Hanukkah V";case 23:return"Hanukkah VI";case 24:return"Hanukkah VII";case 25:return"Hanukkah VIII";
	case 26:if(isDiaspora())return"Shavuot I";else return"Shavuot";case 27:return"Tu B'Shevat";case 28:return"Purim";
	case 29:return"Ta'anith Esther";case 30:return"Tisha B'Av";case 31:return"Tzom Gedaliah";case 32:return"Tzom Tevet";
	case 33:return"Tzom Tammuz";case 34:return"Shushan Purim";case 35:return"Lag B'Omer";case 36:return"Yom Hashoah";
	case 37:return"Yom Ha'Atzmaut";case 38:return"Yom Yerushalayim";case 39:return"Shavuot II";case 40:return"Pesach VIII";
	case 41:return"Shabbat Hagadol";case 42:return"Rosh Hashanah II";case 43:return"Yom Hazikaron";case 44:return"Purim Katan";
	case 45:return"Adar I";case 46:return"Erev R' Hashanah";case 47:return"Erev Yom Kippur";case 48:return"Erev Sukkot";
	case 49:return"Isru Chag";case 50:return"Erev Pesach";case 51:return"Isru Chag";case 52:return"Erev Shavuot";
	case 53:return"Isru Chag";case 54:return"Tu b'Av";case 55:return"Pesach Sheni";}}
function getJewishHolidayDate(holiday,year){
	holidayDay=0;holidayMonth=0;holidayYear=0;
	switch(holiday)	{
	case 0:holidayDay=1;holidayMonth=7;holidayYear=year;break;case 1:holidayDay=10;holidayMonth=7;holidayYear=year;break;
	case 2:case 3:case 4:case 5:case 6:case 7:case 8:holidayDay=15+holiday-2;holidayMonth=7;holidayYear=year;break;
	case 9:holidayDay=22;holidayMonth=7;holidayYear=year;break;case 10:if(isDiaspora())
	{holidayDay=23;holidayMonth=7;holidayYear=year;}else
	{holidayDay=0;holidayMonth=0;holidayYear=0;}
	break;case 11:case 12:case 13:case 14:case 15:case 16:
	case 17:holidayDay=15+holiday-11;holidayMonth=1;holidayYear=year;break;
	case 18:case 19:case 20:case 21:case 22:case 23:case 24:case 25:holidayDay=25+holiday-18;holidayMonth=9;
	if(holidayDay>lastDayOfHebrewMonth(9,year)){holidayDay-=lastDayOfHebrewMonth(9,year);holidayMonth++;}
	holidayYear=year;break;case 26:holidayDay=6;holidayMonth=3;holidayYear=year;break;
	case 27:holidayDay=15;holidayMonth=11;holidayYear=year;break;case 28:holidayDay=14;
	if(!hebrewLeapYear(year))
	holidayMonth=12;else
	holidayMonth=13;holidayYear=year;break;case 29:{holidayDay=14;if(!hebrewLeapYear(year))
	holidayMonth=12;else
	holidayMonth=13;holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);if(getWeekday(lAbs)==0)
	lAbs-=3;else
	lAbs--;hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}
	break;case 30:{holidayDay=9;holidayMonth=5;holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);
	if(getWeekday(lAbs)==6){lAbs++;hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}}
	break;case 31:{holidayDay=3;holidayMonth=7;holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);if(getWeekday(lAbs)==6)
	{lAbs++;hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}}
	break;case 32:{holidayDay=10;holidayMonth=10;holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);if(getWeekday(lAbs)==6)
	{lAbs++;hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}}
	break;case 33:{holidayDay=17;holidayMonth=4;holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);if(getWeekday(lAbs)==6)
	{lAbs++;hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}}
	break;case 34:{holidayDay=15;if(!hebrewLeapYear(year)){holidayMonth=12;}else{holidayMonth=13;}
	holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);if(postponeShushanPurim())
	{if(getWeekday(lAbs)==6)
	{lAbs++;hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}}}
	break;case 35:holidayDay=18;holidayMonth=2;holidayYear=year;break;case 36:{holidayDay=27;holidayMonth=1;
	holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);if(getWeekday(lAbs)==6)
	lAbs-=2;else
	if(getWeekday(lAbs)==5)	lAbs--;
	if(holidayYear>=5757){	if(getWeekday(lAbs)==0)	lAbs++;}
	hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}
	break;case 37:holidayDay=0;holidayMonth=0;holidayYear=0;break;case 38:holidayDay=0;holidayMonth=0;holidayYear=0;break;case 39:if(isDiaspora())
	{holidayDay=7;holidayMonth=3;holidayYear=year;}
	else
	{holidayDay=0;holidayMonth=0;holidayYear=0;}
	break;case 40:if(isDiaspora())
	{holidayDay=15+8-1;holidayMonth=1;holidayYear=year;}
	else
	{holidayDay=0;holidayMonth=0;holidayYear=0;}
	break;case 41:{holidayDay=15;holidayMonth=1;holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);lAbs--;while(getWeekday(lAbs)!=6)
	lAbs--;hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}
	break;case 42:holidayDay=2;holidayMonth=7;holidayYear=year;break;case 43:{holidayDay=4;holidayMonth=2;
	holidayYear=year;lAbs=absoluteFromHebrew(holidayDay,holidayMonth,holidayYear);
	if(getWeekday(lAbs)==5)lAbs-=2;else
	if(getWeekday(lAbs)==4)	lAbs--;
	if(year>=5764){if(getWeekday(lAbs)==0)lAbs++;}
	hebrewFromAbsolute(lAbs);holidayDay=returnDateDay;holidayMonth=returnDateMonth;holidayYear=returnDateYear;}
	break;case 44:{holidayDay=14;if(hebrewLeapYear(year))
	holidayMonth=12;else
	break;holidayYear=year;}
	break;case 45:{holidayDay=15;if(hebrewLeapYear(year))
	holidayMonth=12;else
	break;holidayYear=year;}
	break;case 46:holidayDay=29;holidayMonth=6;holidayYear=year;break;
	case 47:holidayDay=9;holidayMonth=7;holidayYear=year;break;
	case 48:holidayDay=14;holidayMonth=7;holidayYear=year;break;
	case 49:if(isDiaspora())holidayDay=24;else holidayDay=23;holidayMonth=7;holidayYear=year;break;
	case 50:holidayDay=14;holidayMonth=1;holidayYear=year;break;case 51:if(isDiaspora())
	holidayDay=23;else holidayDay=22;holidayMonth=1;holidayYear=year;break;
	case 52:holidayDay=5;holidayMonth=3;holidayYear=year;break;
	case 53:if(isDiaspora()) holidayDay=8;else holidayDay=7;holidayMonth=3;holidayYear=year;break;
	case 54:holidayDay=15;holidayMonth=5;holidayYear=year;break;case 55:holidayDay=14;holidayMonth=2;holidayYear=year;break;}
	return new HDate(holidayDay,holidayMonth,holidayYear);}
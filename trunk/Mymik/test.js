// JavaScript Document
oCal = new calender()
oTime = {hr:17,min:12}
oCause = Cause.start
oLocation = CITY[24]
function confirm_hefsek_and_mikveh(cal){
	for (var _i=0;_i<cal._veses.length;_i++) {
	cal._veses[_i].confirm_hefsek(cal)	}
}
var xc = console.log
var popup = function(){	console.log(arguments)}
function add_reminder(_p){ 	return false	}
// IMPORTANT clone the date object before new_veses
// dont use i as repeater
/////////////////////////////////////////////////////////////////////////////////////////////////



cc = (new GDate()).getZmanim(oLocation)

xc(cc)


	



/*
oDate = new HDate(3,7,5770)
new_veses(oDate,oTime,oCause,oCal,oLocation,_DAY_)
confirm_hefsek_and_mikveh(oCal)

xDate = oDate.clone().add(30)
new_veses(xDate,oTime,oCause,oCal,oLocation,_DAY_)
confirm_hefsek_and_mikveh(oCal)


yDate = xDate.clone().add(30)
new_veses(yDate,oTime,oCause,oCal,oLocation,_DAY_)
confirm_hefsek_and_mikveh(oCal)

zDate = yDate.clone().add(29)
new_veses(zDate,oTime,oCause,oCal,oLocation,_DAY_)
confirm_hefsek_and_mikveh(oCal)

/*
aDate = zDate.clone().add(32)
new_veses(aDate,oTime,oCause,oCal,oLocation,_DAY_)
confirm_hefsek_and_mikveh(oCal)

bDate = aDate.clone().add(33)
new_veses(bDate,oTime,oCause,oCal,oLocation,_DAY_)
confirm_hefsek_and_mikveh(oCal)

cDate = bDate.clone().add(34)
new_veses(cDate,oTime,oCause,oCal,oLocation,_DAY_)
confirm_hefsek_and_mikveh(oCal)
*/
xc(oCal)
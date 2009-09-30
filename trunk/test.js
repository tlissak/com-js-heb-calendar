// JavaScript Document
var xc = console.log
var popup = function(){	console.log(arguments)}
function add_reminder(_p){
	return false	
}
				  
oCal = new calender()
// IMPORTANT clone the date object before new_veses
// dont use i as repeater
oTime = {hr:17,min:12}
oLocation = new Location(3012, "Paris, France", 4852, 220, 1, "Europe/Paris", null, null) ;
oCause = Cause.start

oDate = new HDate(3,7,5770)
new_veses(oDate,oTime,oCause,oCal,oLocation,_DAY_)
for (var _i=0;_i<oCal._veses.length;_i++) {
	oCal._veses[_i].confirm_hefsek(oCal)	
}
xDate = oDate.clone().add(30)
new_veses(xDate,oTime,oCause,oCal,oLocation,_DAY_)
for (var _i=0;_i<oCal._veses.length;_i++) {
	oCal._veses[_i].confirm_hefsek(oCal)
}
yDate = xDate.clone().add(30)
new_veses(yDate,oTime,oCause,oCal,oLocation,_DAY_)
for (var _i=0;_i<oCal._veses.length;_i++) {
	oCal._veses[_i].confirm_hefsek(oCal)
}

zDate = yDate.clone().add(29)
new_veses(zDate,oTime,oCause,oCal,oLocation,_DAY_)
for (var _i=0;_i<oCal._veses.length;_i++) {
	oCal._veses[_i].confirm_hefsek(oCal)
}
/*
aDate = zDate.clone().add(32)
new_veses(aDate,oTime,oCause,oCal,oLocation,_DAY_)
for (var _i=0;_i<oCal._veses.length;_i++) {
	oCal._veses[_i].confirm_hefsek(oCal)
}
bDate = aDate.clone().add(33)
new_veses(bDate,oTime,oCause,oCal,oLocation,_DAY_)
for (var _i=0;_i<oCal._veses.length;_i++) {
	oCal._veses[_i].confirm_hefsek(oCal)
}
cDate = bDate.clone().add(34)
new_veses(cDate,oTime,oCause,oCal,oLocation,_DAY_)
for (var _i=0;_i<oCal._veses.length;_i++) {
	oCal._veses[_i].confirm_hefsek(oCal)
}
*/
xc(oCal)
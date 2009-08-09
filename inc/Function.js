<%
var date = new Date()
function obj2arr(o){
	if (typeof(o) == "undefined"){
		return []
	}else if(typeof(o) == "string"){
		return [o]
	}
	return o //is allready array
}
var br = "<br />"
function end(){Response.End()}
function qs(_p,t){
	_v = String(Request.QueryString(_p))
	return (t=="int")?(parseInt(_v)>0)?parseInt(_v):0:(_v!= "undefined")?_v:""
}
function print(_Str){Response.Write(_Str)}
function rf(_s){
	if (Request.Form(_s).Count == 0){ return "" 
	}else if(Request.Form(_s).Count==1){ return String(Request.Form(_s))
	}else{
		var a_out = new Array()
		for (var i=1;i<=Request.Form(_s).Count;i++){
			a_out.push(Request.Form(_s).Item(i)) ;
		}
		return a_out
	}
	
}
function c(){if(arguments.length==1){ print(arguments[0]);return} ;for(var __u=0; __u<arguments.length; __u++){ print(arguments[__u]+br)}}
function trim(x) { return this.replace(/^\s+|\s+$/g, ''); };
function isEmail(_x_){var rxftr=/^[\w-]+(?:\.[\w-]+)*@((?:[\w-]+\.)*\w[\w-]+)\.([a-z]+(?:\.[a-z]+)?)$/i ;return rxftr.test(_x_);}
function divide ( num, den ) { var rem = num % den; return (( num - rem ) / den) ;  /* remainder */}
function isDate(_sD) {sTmp=_sD ;var _tst = new Date(sTmp);return (_tst.toString() != "NaN" && _tst.toString() != "Invalid Date") }
function toDate(s){	_Date = new Date(s) ; return _Date.getDate()+"/"+_Date.getMonth()+"/"+_Date.getFullYear()}
function v2bol(v){return (Boolean(v)) ? v : "False" }
function v2txt(v){return "'"+String(v).replace(/'/g,"''")+"'"}
function v2int(v){return  (	!	isNaN(parseFloat(v))	) ? v : "Null"}
function v2dat(v){return (isDate(v)) ? toDate(v) : "Null"}
%>
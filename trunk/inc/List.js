<%


TABLE			= rf("data.table.name") ? rf("data.table.name") : "user_member"
PROVIDER		= rf("data.table.provider") ? rf("data.table.provider") : "Provider=Microsoft.Jet.OLEDB.4.0; Data Source="
SITE			= rf("data.table.site") ? rf("data.table.site") : "c:\\inetpub\\v7\\"
DB				= rf("data.table.db") ? rf("data.table.db") : "db/config.mdb"
CONN_STR		= PROVIDER + SITE + DB.replace(/\//g,"\\")

try{
	var Conn = Server.CreateObject("adodb.connection")
	Conn.Open(CONN_STR)
}catch(e){
	c("<data>Error openning conn "+ CONN_STR +"</data>")
	end()
}
COLUMNS			= rf("data.table.column.name") 	? obj2arr(rf("data.table.column.name")) : ["name"]
JOIN 			= rf("data.table.join") 		? obj2arr(rf("data.table.join")) : ["{hide:'False',col_id:'18',tbl_id:'3',table:'user',bound:['id','name'],column:'name',table_key:'id',forgien_key:'user_id',type:'number',title:'table_id join'}","{hide:'False',col_id:'22',tbl_id:'3',table:'member',bound:['id','name'],column:'name',table_key:'id',forgien_key:'member_id',type:'number',title:'table_key_id join'}"]
CURRENT_PAGE	= rf("data.state.page") 		? rf("data.state.page") : 1

PAGE_SIZE		= parseInt(rf("data.state.size"))> 0 ? parseInt(rf("data.state.size")) : 30
SORT			= rf("data.state.sort") 		? rf("data.state.sort") : ""
SEARCH_Q		= rf("data.state.search_q") 	? rf("data.state.search_q") : "" 
SEARCH_IN		= rf("data.state.search_in") 	? rf("data.state.search_in") : "" 
SEARCH_TYPE		= rf("data.state.search_type") 	? rf("data.state.search_type") : "" 

SQL_PARAM		= rf("data.table.sql_param") ? rf("data.table.sql_param") : ""// EX. "AND ( product_type IS null )"
SQL_SORT		= ""

if (SEARCH_Q && SEARCH_IN && SEARCH_TYPE){
	if (SEARCH_Q){ // search with value // search in join
		if (SEARCH_IN=="JOIN"){
			x = eval("(" +SEARCH_TYPE+")")
			SQL_SEARCH = " AND ["+x.forgien_key+"] IN (SELECT ["+x.table_key+"] FROM ["+x.table+"] WHERE ["+x.column+"]" 
			SQL_SEARCH += " LIKE '" +SEARCH_Q.replace(/'/g,"''") + "%')"	
		}else{
			SQL_SEARCH = " AND ["+SEARCH_IN+"] LIKE '" + SEARCH_Q.replace(/'/g,"''") + "%'"	
			// BOOL  true false //-1 | 0
		}
		SQL_PARAM += SQL_SEARCH
	}
}

if (SORT){
	aSORTS	= SORT.split(",")
	x_SORT 	= ""
	for (var i=0;i<aSORTS.length;i++){
		if (aSORTS[i]){
			aSort 		= aSORTS[i].split("|")
			Sort 		= aSort.length > -1 ? aSort[0] : aSort[0]
			Sort_dir 	= aSort[1] ? aSort[1] : "ASC"
			x_SORT		+= ",["+ Sort +"] "+ Sort_dir	
		}
	}
	SQL_SORT	= " ORDER BY "+ x_SORT.replace(",","")
}

/*
JOIN_COL = ""
SQL_JOIN = ""

for (var i=0;i<JOIN.length;i++){
	eval("oJoin =" + JOIN[i] )
	JOIN_COL	+= ",(SELECT ["+oJoin.column+"] FROM ["+oJoin.table+"]" 											  
	JOIN_COL	+= " WHERE ["+oJoin.table+"].["+ oJoin.table_key +"] = ["+ TABLE +"].["+ oJoin.forgien_key +"]"
	JOIN_COL	+= ") AS ["+ oJoin.forgien_key +"]"
}
*/
JOIN_COL = ""
SQL_JOIN = ""
cs = ""
for (var i=0;i<JOIN.length;i++){
	eval("oJoin =" + JOIN[i] )
	for (var j=0;j < oJoin.bound.length;j++){
		cs += 	",[" + oJoin.table+"].["+oJoin.bound[j] + "] AS ["+ oJoin.table+oJoin.bound[j] +"] "
	}
	SQL_JOIN	+= " RIGHT JOIN [" +oJoin.table+"]" 											  
	SQL_JOIN	+= " ON ["+oJoin.table+"].["+ oJoin.table_key +"] = ["+ TABLE +"].["+ oJoin.forgien_key +"]"
	//JOIN_COL	+= ")"
}

SQL_PARAM = SQL_PARAM.replace("AND","WHERE")

SQL_COLUMNS = ""
for (var i=0;i<COLUMNS.length;i++){
	SQL_COLUMNS += ",["+ TABLE + "].[" + COLUMNS[i] +"]"
}
SQL_COLUMNS = SQL_COLUMNS.replace(",","")

SQL = "SELECT "+ SQL_COLUMNS + cs +"  FROM ["+ TABLE +"] "+ SQL_JOIN + SQL_PARAM + SQL_SORT

//SQL = "SELECT "+ SQL_COLUMNS + JOIN_COL +"  FROM ["+ TABLE +"] "+ SQL_JOIN + SQL_PARAM + SQL_SORT
//c(SQL)
c(br)

//Response.ContentType = "text/xml" 
//Response.Write('<?xml version="1.0" encoding="utf-8"?>')
if (!(TABLE)){
	c("<root>NO TABLE</root>")	
	end()
}
%>
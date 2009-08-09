<%
function do_login(){
	_user = String(Request.Form("User"))
	_password = String(Request.Form("Password"))
	
	if (_user && _password){

	
	Session("User_id") = get_user_id(_user,_password)
	Session("Members") = load_user_group(Session("User_id"))
	
		if (Session("Members").length >= 1) {
							
					Response.Redirect(ref)

		}else if(Session("User_id")==-1){
			Error_message = ("No such user or password")
		}else{
			Error_message = ("No members access !! ")
		}
	}
}
function get_user_id(usr,pass){
	var RS_user_id = cfgConn.execute("SELECT id FROM [user] WHERE [login] = '"+usr+"' AND password = '"+ pass +"' AND active =  True")
	if (!( RS_user_id.eof )) { 
		return  parseInt(RS_user_id("id").value)
	}else{
		return   -1
	}
} 

function load_user_group(User_id){
	var aTmp  = new Array()
	var Sql = "SELECT member_id AS id FROM [user] WHERE [id] = " + User_id 

	var RS_user_group = cfgConn.execute(Sql)
	i_c = 0
		
		while (!(RS_user_group.eof)){
			aTmp[i_c] = RS_user_group("id").value
			i_c++
			RS_user_group.MoveNext()
		}
	
	return String(aTmp.join(","))
}
%>
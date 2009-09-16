<%@LANGUAGE="javascript" CODEPAGE="65001"%>
<%
var Conn = Server.CreateObject("adodb.connection")
Conn.open("Provider=Microsoft.Jet.OLEDB.4.0; Data Source=D:\\Inetpub\\wwwroot\\zm\\cal.mdb;")

//RS = Conn.execute("SELECT * FROM [orders]")
RSh = Conn.execute("SELECT * FROM [orders] WHERE dow <> 'Fri' AND [parasha-hag] <> '' ")
//RSf = Conn.execute("SELECT * FROM [orders] WHERE dow = 'Fri'")
RSs = Conn.execute("SELECT * FROM [orders] WHERE dow = 'Sat' OR dow = 'Fri'")
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>asp Document</title>
<style>
body{padding:5px; margin:0; font-family:Arial, Helvetica, sans-serif; font-size:9px}
ul{padding:0; margin:0}
li {list-style:none; padding:0;}
</style>
</head>
<body>
<div style="width:200px; float:left">
<%while (!(RSh.eof)){%>
	<%= RSh("dd").value %> . <%= RSh("mm").value %> . <%= RSh("yy").value %> . <%= RSh("parasha-hag").value %><br />
<%RSh.MoveNext}%>
</div>
<%RSh.MoveFirst%>
<div style="width:200px; float:left">
<%while (!(RSh.eof)){%>
	<%= String(RSh("zmanim_1_shabat_end").value).replace(":","h").replace("null","") %><br />
<%RSh.MoveNext}%>
</div>

<div style="width:280px; height:400px; float:left; border:#666 1px solid">
<h3> 9 - 2009</h3>
 <% 
mm = 9
while (!(RSs.eof)){
if ( parseInt(	RSs("mm").value	) != mm ){
	mm =  parseInt(RSs("mm").value) %>
	</div><div style="width:280px;min-height:400px; float:left; border:#666 1px solid">
  <h3> <%= mm %> - <%= RSs("yy").value %></h3>
  <!--  Knisa - yetsia  -->
<% } %>
 
		<% if ( RSs("dow").value == 'Fri'){ %>  
         <li >           
     <h3> <%= RSs("dd").value %>.<%= RSs("mm").value %> &nbsp; -<%= RSs("parasha-hag").value %></h3>
    <%= String(RSs("candel").value).replace(":","h") %><!-- &nbsp;( Alatabe <%= RSs("candel_before").value %> ) -->
     </li>
    <!--  <li> Shabat altabe :
	<%= RSs("altabe_ids_shabat_end").value %>
    </li>
    -->
	<%}else{%>
    <li > 
    <%=  String(RSs("zmanim_1_shabat_end").value).replace(":","h") %>
 	</li>
	<%}%>   
<% RSs.MoveNext}%>
</div>

<div style="clear:both"></div>
<%
Conn.Close()
Response.End()
%>

<div style="width:120px; float:left;">
<% while (!(RS.eof)){%>
<li>
<%= RS("dd").value%> - <%= RS("mm").value%> - <%= RS("yy").value%> <br /><br /><br /><br /><br />
</li>
<% RS.MoveNext}%>
</div>

<% RS.MoveFirst %>

<div style="width:120px; float:left">
<% while (!(RS.eof)){%>
<li>
 L S:<br /><%= RS("netz").value.substr(0,4) %><br /><br />
 C S:<br /><%= RS("skia").value%><br />
</li>
<% RS.MoveNext}%>
</div>

<% RS.MoveFirst %>

<div style="width:280px; height:200px; float:left; border:#666 1px solid">
<h3> 9 - 2009</h3>
 <!-- DATE   Alot   debut    sof K"S   Hatzot   Plag   Stars -->
<% 
mm = 9
while (!(RSf.eof)){
if ( parseInt(	RSf("mm").value	) != mm ){
	mm =  parseInt(RSf("mm").value) %>
	</div><div style="width:280px;height:200px; float:left; border:#666 1px solid">
  <h3> <%= mm %> - <%= RSf("yy").value %></h3>
  <!--  DATE   Alot   debut    sof K"S   Hatzot   Plag   Stars  -->
<% } %>

<li>
	 <%= RSf("dd").value %>.<%= RSf("mm").value %> &nbsp; -

  <%= RSf("alot-posna").value %> &nbsp;
  <%= RSf("debut_tfilin_pos").value %> &nbsp;
  <%= RSf("shema_gra").value %> &nbsp;
  <%= RSf("midday").value %> &nbsp;
  <%= RSf("plag_gra").value %> &nbsp;
  <%= RSf("stars").value %> &nbsp;
</li>
<% RSf.MoveNext}%>
</div>

</body>
</html>
<%
Conn.Close()
%>

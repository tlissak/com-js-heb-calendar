<!-- Paging start -->
<% if (iRecordCount > 0){ c(iRecordCount) %> Resultas - <%= iPages %> pages<% } %>
<% if (!(bEof)){ %>  R&eacute;ponse(s) <%= iStartRecord +1 %> - <%= iStopRecord %> <% } %>
          
<%  if (iPages != 0 && iPages != 1){ %>

		<ul class="paging">
           		
         		<li><strong> Pages</strong> </li>
                
	<% if (!(iPageCurrent==1)){ %>
         		<li><a href="Search.asp?Page=1<%= sPagingQueryString %>">&laquo; Premi&egrave;re</a></li>
		  <% } if ((iPageCurrent-1 > 0)){%>
                <li><a href="Search.asp?Page=<%= iPageCurrent-1 %><%= sPagingQueryString %>">Pr&eacute;c&eacute;dent </a></li>  
          <% } if (iPageCurrent  > iPagingMaxPages ){ %>
                  <li>..</li>
          <% }  for (var i=iStartPaging;i <= iStopPaging ;i++){ %>
          
                  <li class="<% if (i==iPageCurrent){ %> selected<% } %>"><a href="Search.asp?Page=<%= i %><%= sPagingQueryString %>"><%= i %></a></li>
                  
          <% }  if (iPageCurrent + (iPagingMaxPages-1) <= iPages ){ %>
                  <li>..</li>
          <% }  if (iPageCurrent < iPages){  %>
				  <li><a href="Search.asp?Page=<%= iPageCurrent+1 %><%= sPagingQueryString %>">Suivant</a></li>  
		  <% } if (!(iPages==iPageCurrent)){ %>
                  <li><a href="Search.asp?Page=<%= iPages %><%= sPagingQueryString %>">Derni&egrave;re &raquo;</a></li>
          <% } %>
           </ul>
<% } %>
<!-- Paging end -->
            
            
<!-- List start -->
<ul id="list">
    <% if (bEof){ %><li>		No Results         </li><% } %>
    <%  for ( var I = -1 ; I < iPageSize- 1 ;I++ ){
		  	if (!( RS.eof)){  %>
    <li>
    		<%= RS("name").value %>
    </li>
    <% RS.moveNext}} %>
</ul>
<!-- List end -->
                
             
             
<!-- Paging start -->
<ul class="paging">
<% for (var i=1;i <= iPages;i++){ %>
	<li <% if (i==iPageCurrent){ %>class="selected"<% } %>><a href="Search.asp?Page=<%= i %><%= sPagingQueryString %>"><%= i %></a></li>
<% } %>
</ul>
<!-- Paging end -->

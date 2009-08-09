<%
var adOpenForwardOnly 	= 0
var adLockReadOnly 		= 1
var adUseClient 		= 3

		RS = Server.CreateObject("ADODB.Recordset")
		
		RS.MaxRecords		= PAGE_SIZE
		RS.PageSize 		= PAGE_SIZE
		RS.CacheSize 		= PAGE_SIZE
		RS.CursorLocation 	= adUseClient
		
		// NEW UPDATE !!
		
		try{
		RS.Open(SQL, Conn, adOpenForwardOnly, adLockReadOnly)
		}catch(e){
			c(SQL)
			c(br + e.description)
			end()
			
			
		}
		
		
		iAbsPage 			= RS.AbsolutePage
		iPageCount 			= RS.PageCount
		iRecordCount 		= RS.RecordCount
		iPageSize			= RS.PageSize
		bEof 				= RS.eof
		
		iPageCurrent 		= CURRENT_PAGE
		iPageCurrent 		= (iPageCurrent != "" && iPageCurrent != "undefined" && parseInt(iPageCurrent) > 0) ? parseInt(iPageCurrent) : 1
		
		if ( iPageCurrent > iPageCount) { iPageCurrent = iPageCount }
		if ( iPageCurrent < 1 ){ iPageCurrent = 1 }	
	
		iPages = Math.round(iRecordCount/iPageSize)
		if (iPages < (iRecordCount/iPageSize) ){ iPages = iPages + 1 }
		
		iPagingMaxPages	=	3
		
		iStartRecord 		= ((iPageCurrent * iPageSize) - iPageSize)
		iStopRecord  		= (iPageCurrent * iPageSize) < (iRecordCount+1) ? (iPageCurrent * iPageSize) : iRecordCount
		iStartPaging 		= (iPageCurrent  < iPagingMaxPages) ? 1 : (iPageCurrent - (iPagingMaxPages -1) ) 
		iMaxPages			= (iPageCurrent + (iPagingMaxPages -1) <= iPages )? iPageCurrent + (iPagingMaxPages -1) : iPages
		iStopPaging	 		= (iPages  < iPagingMaxPages )? iPages : iMaxPages 
		
		
		
		if ((!(bEof))||(iStartRecord < iRecordCount)){ 	RS.move = iStartRecord	}
	
%>
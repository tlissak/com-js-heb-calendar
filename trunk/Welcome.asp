<!--#include file="inc/Header.js"--><!--#include file="inc/Function.js"-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="Css/Style.css"/>
<title></title>
</head>

<body>
<center>
<div class="spacer"></div>
<fieldset class="f" ><legend >Select your preferance </legend>
<form name="a1" action="frm.html" method="get">
<label>Language :</label><span> 
<input type="radio" name="lng" value="fr" />Francais 
<input type="radio" name="lng" value="en" checked="checked" /> English </span>
<div class="spacer"></div>
<label>Please select your time zone :</label>
			<select id="city" name="city">
        	<optgroup label="Israel">
				<option value="" selected="selected">Jerusalem</option>
            </optgroup>
            <optgroup label="Europe">
                <option value="Paris">Paris</option>
            </optgroup>
            <optgroup label="Russie">
            	<option value="Moscow">Moscow</option>
            </optgroup>
            </select>
<div class="spacer"></div>          
<label>Summer time :</label><span><input type="checkbox" id="time_adj" name="time_adj" checked="checked" value="1" /></span>
<div class="spacer"></div>
<label>Calendar months  :</label><br />
<span>Start  at Januar - <input type="text" name="start" size="5" maxlength="4" value="<%= date.getFullYear() %>" /> <br />
End at December - <input type="text" size="5" name="end" maxlength="4" value="<%= date.getFullYear() %>" /></span>
<div class="spacer"></div>
<input type="submit" value="Set preferace" />
</form>
</fieldset>

<div class="spacer"></div>

<fieldset class="f" ><legend >Login to load your preference </legend>
<form name="f2">
<label>Login :</label><span><input type="text" name="user" /></span>
<div class="spacer"></div>
<label>Password :</label><span><input type="text" name="password" /> </span>
<div class="spacer"></div>
<label></label><input type="submit" value="Login" />
<div class="spacer"></div>
<a href="#">Create an account </a><br />
 (Privecy . No personal information )
</form>
</fieldset>
</center>
<img src="Images/Logo_small.png" style="position:fixed; bottom:0; right:0" />
</body>
</html>

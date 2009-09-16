/***************************************
 *              city.js                *
 ***************************************
 *       Interface for                 *
 *   city search from database         *
 ***************************************
 * History														 *
 *  04/05/2005: v1.0									 *
 ***************************************
 * (c) Gabriel Zerbib,                 *
 *   gabriel@bumpt.net                 *
 *   http://www.bumpt.net              *
 *                                     *
 * It is strictly forbidden to use or  *
 * reproduce all or parts of this      *
 * program without author's explicit   *
 * permission.                         *
 * Commercial use of this program is   *
 * subject to purchase. Please contact *
 * the author.                         *
 ***************************************/

function City(name, latitude, longitude, timeZone, dst)
//and    City(name, country, state, latitude, longitude, timeZone, dst)
{
	if(City.arguments.length == 5)
	{
		this.name = name;
		this.latitude = latitude;
		this.longitude = longitude;
		this.timeZone = parseFloat(timeZone);
		this.dst = dst;
	}
	else
	{
		this.name = name;
		this.country = City.arguments[1];
		this.state = City.arguments[2];
		this.latitude = City.arguments[3];
		this.longitude = City.arguments[4];
		this.timeZone = parseFloat(City.arguments[5]);
		this.dst = City.arguments[6];
	}
	
	if(this.dst == null)
		this.dst = "0";
	
	this.cacheGYear = 0;
	this.cacheGStart = null;
	this.cacheGEnd = null;
	
	
	this.getName = function() { return this.name; }
	this.getTimeZone = function() { return this.timeZone; }
	this.getDST = function() { return this.dst; }
	
	this.getLongitudeDeg = function()
	{
		return parseInt(this.longitude.match(/^\d\d?\d?/)[0]);
	}
	this.getLongitudeMin = function()
	{
		return parseInt(this.longitude.match(/[^\d](\d\d?$)/)[1]);
	}
	this.getLatitudeDeg = function()
	{
		return parseInt(this.latitude.match(/^\d\d?\d?/)[0]);
	}
	this.getLatitudeMin = function()
	{
		return parseInt(this.latitude.match(/[^\d](\d\d?$)/)[1]);
	}
	this.getEWsign = function()
	{
		return this.longitude.search(/e/) != -1 ? 1 : -1;
	}
	this.getNSsign = function()
	{
		return this.latitude.search(/n/) != -1 ? 1 : -1;
	}

	this.isAutoDST = function()
	{
		return (this.dst.indexOf(",") > 0)
	}

	this.isDSTon = function(jdate)
	{
		//manual DST?
		if(! this.isAutoDST())
			return (this.dst == "1");
		
		var gdate = new GDate(jdate);

		if(this.cacheGYear != gdate.getYear())
		{
			this.cacheGYear = gdate.getYear();
			var arrDstDetails = this.dst.split("|");
			var arrDstStart = arrDstDetails[0].split(",");
			var arrDstEnd = arrDstDetails[1].split(",");
			this.cacheGStart = new GDate(1, arrDstStart[2], gdate.getYear());
			this.cacheGEnd = new GDate(1, arrDstEnd[2], gdate.getYear());
			
			
			//start
			if(arrDstStart[0] == -1)	//last Sun, Mon, etc.
			{
				this.cacheGStart.setDay(this.cacheGStart.getMonthLength());
				if(this.cacheGStart.getDayOfWeek() != arrDstStart[1] - 1)
					this.cacheGStart.sub(this.cacheGStart.getDayOfWeek() - arrDstStart[1] + 1);
			}
			else if(arrDstStart[0] > 0) //Nth Sun, Mon, etc.
			{
				var nDoW = (arrDstStart[1] - 1);
				if(nDoW == 0) nDoW = 7;
				this.cacheGStart.add(nDoW - this.cacheGStart.getDayOfWeek());
				this.cacheGStart.add(7 * (arrDstStart[0] - 1));
			}

			//end
			if(arrDstEnd[0] == -1)
			{
				this.cacheGEnd.setDay(this.cacheGEnd.getMonthLength());
				if(this.cacheGEnd.getDayOfWeek() != arrDstEnd[1] - 1)
					this.cacheGEnd.sub(this.cacheGEnd.getDayOfWeek() - arrDstEnd[1] + 1);
			}
			else if(arrDstEnd[0] > 0) //Nth Sun, Mon, etc.
			{
				var nDoW = (arrDstEnd[1] - 1);
				if(nDoW == 0) nDoW = 7;
				this.cacheGEnd.add(nDoW - this.cacheGEnd.getDayOfWeek());
				this.cacheGEnd.add(7 * (arrDstEnd[0] - 1));
			}
		}
		
		if(jdate.gte(this.cacheGStart) && jdate.lte(this.cacheGEnd))
			return true;
		return false;
		
	}
	
}
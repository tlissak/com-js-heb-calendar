
/***************************************
 *           hebrewdate.js             *
 ***************************************
 * Hebrew display functions            *
 ***************************************
 *  June 20, 2003 - Sivan 20, 5763     *
 *  v2.01                              *
 *                                     *
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

function HebrewMonthToString(nMonth)
{
	var aMonths = new Array (
		"&#1504;&#1497;&#1505;&#1503;",
		"&#1488;&#1497;&#1512;",
		"&#1505;&#1497;&#1493;&#1503;",
		"&#1514;&#1502;&#1493;&#1494;",
		"&#1488;&#1489;",
		"&#1488;&#1500;&#1493;&#1500;",
		"&#1514;&#1513;&#1512;&#1497;",
		"&#1495;&#1513;&#1493;&#1503;",
		"&#1499;&#1505;&#1500;&#1493;",
		"&#1496;&#1489;&#1514;",
		"&#1513;&#1489;&#1496;",
		"&#1488;&#1491;&#1512;",
		"&#1493;&#1488;&#1491;&#1512;");
	return aMonths[nMonth - 1];
}

function HebrewNumberToString(N, bNoSeparator)
{
	if(isNaN(N))
		return N;

	if(N == 15)
		return "&#1496;\"&#1493;";

	var sAlefBet = [ "&#1488;", "&#1489;", "&#1490;", "&#1491;", "&#1492;", "&#1493;", "&#1494;", "&#1495;", "&#1496;", "&#1497;", "&#1499;", "&#1500;", "&#1502;", "&#1504;", "&#1505;", "&#1506;", "&#1508;", "&#1510;", "&#1511;", "&#1512;", "&#1513;", "&#1514;" ];
	var sAlefBetSofit = [ "&#1488;", "&#1489;", "&#1490;", "&#1491;", "&#1492;", "&#1493;", "&#1494;", "&#1495;", "&#1496;", "&#1497;", "&#1498;", "&#1500;", "&#1501;", "&#1503;", "&#1505;", "&#1506;", "&#1508;", "&#1509;", "&#1511;", "&#1512;", "&#1513;", "&#1514;" ];

	var aValues = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400);
	var s = "";
	var i = 21;
	var n = N;

	while(n >= 1)
	{
		while(n >= aValues[i])
		{
			if(n == aValues[i])
			{
				if(s.length > 0)
					s += (bNoSeparator == true ? "" : "\"") + sAlefBetSofit[i];
				else
					s =  sAlefBet[i] + (bNoSeparator == true ? "" : "\"");
			}
			else
				s += sAlefBet[i];

			n -= aValues[i];
		}

		i --;
	}

	return s;
}

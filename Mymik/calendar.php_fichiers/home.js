
Spry.Utils.addLoadListener(function() {

	fleegix.date.timezone.zoneFileBasePath = './src/lib/date/tz';
	fleegix.date.timezone.defaultZoneFile = [];
	fleegix.date.timezone.init();

var city_list = new Array('Abidjan, Ivory Coast'  ,'Abilene, Texas, United States'  ,'Abu Dhabi, United Arab Emirates'  ,'Acapulco, Mexico'  ,'Accra, Ghana'  ,'Addis Abeba, Ethiopia'  ,'Aden, Yemen'  ,'Agana, Guam'  ,'Agen, France'  ,'Ahrweiler, Germany'  ,'Aix-en-Provence, France'  ,'Aix-les-Bains, France'  ,'Akron, Ohio, United States'  ,'Albany, New York, United States'  ,'Albuquerque, New Mexico, United States'  ,'Alexandria, Egypt'  ,'Algiers, Algeria'  ,'Ali Bayramli, Azerbaijan'  ,'Alicante, Spain'  ,'Allentown, Pennsylvania, United States'  ,'Altonna, Pennsylvania, United States'  ,'Amarillo, Texas, United States'  ,'Amberg, Germany'  ,'Amersfoort, Netherlands'  ,'Amiens, France'  ,'Amman, Jordan'  ,'Amsterdam, Netherlands'  ,'Anchorage, Alaska, United States'  ,'Ancona, Italy'  ,'Andorra, Andorra'  ,'Angers, France'  ,'Ankara, Turkey'  ,'Ann Arbor, Michigan, United States'  ,'Annecy, France'  ,'Antananarivo, Madagascar'  ,'Antibes, France'  ,'Antwerp, Belgium'  ,'Arad, Israel'  ,'Arcachon, France'  ,'Arlon, Belgium'  ,'Asheville, North Carolina, United States'  ,'Asti, Italy'  ,'Asuncion, Paraguay'  ,'Athens, Greece'  ,'Atlanta, Georgia, United States'  ,'Atlantic City, New Jersey, United States'  ,'Auckland, New Zealand'  ,'Augusta, Georgia, United States '  ,'Augusta, Maine, United States'  ,'Austin, Texas, United States'  ,'Bacau, Romania'  ,'Baden, Switzerland'  ,'Baghdad, Iraq'  ,'Bakersfield, California, United States'  ,'Baku, Aserbaidschan'  ,'Baltimore, Maryland, United States'  ,'Bamako, Mali'  ,'Bamberg, Germany'  ,'Bangkok, Thailand'  ,'Bangor, Maine, United States'  ,'Bangui, Central African Republic'  ,'Banjull, The Gambia'  ,'Barcelona, Spain'  ,'Basel, Switzerland'  ,'Baton Rouge, Louisiana, United States'  ,'Battle Creek, Michigan, United States'  ,'Bay City,  Michigan, United States'  ,'Bayonne, France'  ,'Beaumont, Texas, United States'  ,'Beersheva, Israel'  ,'Beijing, China'  ,'Beirut, Lebanon'  ,'Belfast, United Kingdom'  ,'Belfort, France'  ,'Belgrade, Yugoslavia'  ,'Bellingham, Washington, United States'  ,'Belts, Moldova'  ,'Bendery, Moldova'  ,'Benfeld, France'  ,'Bentonville, Arkansas, United States'  ,'Berdicev, Ukraine'  ,'Beregovoye, Ukraine'  ,'Bergen, Netherlands'  ,'Berkeley, California, United States'  ,'Berlin, Germany'  ,'Berne, Switzerland'  ,'Bershad, Ukraine'  ,'Besancon, France'  ,'Bethlehem,  Pennsylvania, United States'  ,'Biarritz, France'  ,'Biel, Switzerland'  ,'Billings, Montana, United States'  ,'Biloxi, Mississippi, United States'  ,'Binghamton, New York, United States'  ,'Birmingham, Alabama, United States '  ,'Birobidzan, Russia'  ,'Blackpool, Lancashire, United Kingdom'  ,'Bloomington, Illinois, United States '  ,'Boca Raton, Florida, United States'  ,'Bogota, Columbia'  ,'Boise, Idaho, United States'  ,'Bologna, Italy'  ,'Bombay, India '  ,'Boras, Sweden'  ,'Bordeuax, France'  ,'Boston, Massachusetts, United States '  ,'Boulay-Moselle, France'  ,'Boulogne-Sur-Mer, France'  ,'Bournemouth, United Kingdom'  ,'Bowling Green, Kentucky, United States'  ,'Bradford, United Kingdom'  ,'Brasov, Romania'  ,'Bratislava, Slovakia'  ,'Brattleboro, Vermount, United States'  ,'Brazzaville, Congo'  ,'Bremerhaven, Germany'  ,'Bremgarten, Switzerland'  ,'Brest, France'  ,'Bridgeport, Connecticut, United States'  ,'Bridgetown, Barbados'  ,'Brighton, United Kingdom'  ,'Brisbane, Australia'  ,'Bristol, United Kingdom'  ,'Brno, Czech Republic'  ,'Brockton, Massachusetts, United States'  ,'Broken Hill, Australia'  ,'Brooklyn, New York, United States'  ,'Brownsville, Texus, United States'  ,'Brussels, Belgium'  ,'Budapest, Hungary'  ,'Buenos Aires, Argentina'  ,'Buffalo, New York, United States'  ,'Bukarest, Romania'  ,'Burlington, Vermount, United States'  ,'Bursa, Turkey'  ,'Bussum, Netherlands'  ,'Butte, Montana'  ,'Caen, France'  ,'Calabasas, California, United States'  ,'Calgary, Alberta, Canada'  ,'Cali, Columbia'  ,'Caluire et Cuire, France'  ,'Cambridge, United Kingdom'  ,'Camdon, New Jersey, United States'  ,'Canary Islands, Spain'  ,'Canberra, Australia'  ,'Cannes, France'  ,'Canton, Ohio, United States'  ,'Capetown, South Africa'  ,'Caracas, Venezuela'  ,'Carlsbad, Czech Republic'  ,'Carpentras, France'  ,'Carson City, Nevada, United States'  ,'Casablanca, Morocco'  ,'Cavaillon, France'  ,'Cayenne, French Guyana'  ,'Cebu, Phillipines'  ,'Cedar Grove, New Jersey, United States'  ,'Cedar Rapids, Iowa, United States'  ,'Central Islip, New York, United States'  ,'Chalons-Sur-Marne, France'  ,'Chalons-Sur-Saone, France'  ,'Chambery, France'  ,'Champaign, Illinois, United States'  ,'Chapel Hill, North Carolina, United States'  ,'Charkow, Ukraine'  ,'Charleroi, Belgium '  ,'Charleston, South Carolina, United States'  ,'Charleston, West Virginia, United States'  ,'Charlotte, North Carolina, United States'  ,'Charlottesville, Virginia, United States'  ,'Chattanooga, Tennessee, United States  '  ,'Chernigov, Ukraine'  ,'Cherson, Ukraine'  ,'Cheyenne, Wyoming, United States'  ,'Chicago, Illinois, United States '  ,'Churchill, Manitoba, Canada'  ,'Cincinnati,Ohio, United States '  ,'Clermont-Ferrand, France'  ,'Cleveland ,Ohio, United States'  ,'Cologne, Germany'  ,'Columbia, Missouri, United States'  ,'Columbia, South Carolina, United States'  ,'Columbus, Georgia, United States '  ,'Columbus, Ohio, United States '  ,'Conakry, Guinea '  ,'Concord, New Hampshire, United States'  ,'Constanta, Romania'  ,'Copenhagen, Denmark'  ,'Cordoba, Argentinia'  ,'Cordoba, Spain'  ,'Corpus Christi, Texas, United States '  ,'Coventry, United Kingdom'  ,'Cracow, Poland'  ,'Croydon, United Kingdom'  ,'Czernowitz, Ukraine'  ,'Dakar, Senegal '  ,'Dalian, China'  ,'Dallas, Texas, United States '  ,'Damaskus, Syria'  ,'Darmstadt, Germany'  ,'Davenport, Iowa, United States'  ,'Davos, Switzerland'  ,'Dawson, Yukon, Canada'  ,'Dayton, Ohio, United States '  ,'Daytona Beach, Forida, United States'  ,'Deauville, France'  ,'Decatur, Illinios, United States'  ,'Decin, Czech Republic'  ,'Den Haag, Netherlands'  ,'Denver, Colorado, United States'  ,'Desmoines, Iowa, United States'  ,'Detroit, Michigan, United States '  ,'Dieuze, France'  ,'Dijon, France'  ,'Dnepropetrovsk, Ukraine'  ,'Dodge City, Kansas, United States'  ,'Donetsk, Ukraine'  ,'Dorohoi, Romania'  ,'Dubai, United Arab Emirates'  ,'Dublin, Ireland '  ,'Dubuque, Iowa, United States'  ,'Duisburg, Germany'  ,'Duluth, Minnesota, United States'  ,'Dunkerque, France'  ,'Durban, South Africa'  ,'Durham, North Carolina, United States '  ,'Durlach, Germany'  ,'Dusseldorf, Germany'  ,'Eastbourne, United Kingdom'  ,'Eau Claire, Wisconsin, United States'  ,'Edinburgh, United Kingdom'  ,'Edmonton, Alberta, Canada'  ,'Eilat, Israel'  ,'Eindhoven, Netherlands'  ,'El Paso, Texas, United States'  ,'Elbeuf, France'  ,'Elizabeth, New Jersey, United States'  ,'Encinitas, California, United States'  ,'Enid, Oklahoma, United States'  ,'Enschede, Netherlands'  ,'Epernay, France'  ,'Epinal, France'  ,'Erie, Pennsylvania, United States'  ,'Essen, Germany'  ,'Eugene, Oregon, United States'  ,'Eureka, California, United States'  ,'Evansville, Indiana, United States'  ,'Evian-Les-Bains, France'  ,'Exeter, United Kingdom'  ,'Fairbanks, Alaska, United States'  ,'Fall River, Massachusetts, United States '  ,'Fargo, North Dakota, United States'  ,'Ferrara, Italy'  ,'Firenze, Italy'  ,'Flagstaff, Arizona, United States'  ,'Flint, Michigan, United States'  ,'Florenz, Italy'  ,'Forbach, France'  ,'Fort Lauderdale, Florida, United States'  ,'Fort Smith, Arkansas, United States'  ,'Fort Walton Beach, Florida, United States'  ,'Fort Wayne, Indiana, United States'  ,'Fort Worth, Texas, United States'  ,'Frankfurt Oder, Germany'  ,'Frankfurt, Germany'  ,'Fredericton, New Brunswick, Canada'  ,'Freetown, Sierra Leone'  ,'Freiburg, Germany'  ,'Fresno, California, United States'  ,'Gaborone, Botswana'  ,'Gadsten, Alabama, United States'  ,'Gainesville, Florida, United States'  ,'Galanta, Slovakia'  ,'Galati, Romania'  ,'Gallup, New Mexico, United States'  ,'Galveston, Texas, United States'  ,'Gap, France'  ,'Gary, Indiana, United States'  ,'Gateshead, United Kingdom'  ,'Geneve, Switzerland'  ,'Genoa, Italy'  ,'Gent,  Belgium '  ,'Giessen, Germany'  ,'Givat Zev, Israel'  ,'Glasgow, United Kingdom'  ,'Goteborg, Sweden'  ,'Gottingen, Germany'  ,'Grand Junction, Colorado, United States'  ,'Grand Rapids, Michigan, United States'  ,'Grasse, France'  ,'Graz, Austria'  ,'Great Falls, Montana, United States'  ,'Green Bay, Wisconsin, United States '  ,'Greensboro, North Carolina, United States'  ,'Greenville, South Carolina, United States'  ,'Grenoble, France'  ,'Grimsby, United Kingdom'  ,'Groningen, The Netherlands'  ,'Guangzhou, China'  ,'Guatemala City, Guatemala'  ,'Guelph, Ontario, Canada'  ,'Guildford, United Kingdom'  ,'Gulfport, Mississippi, United States'  ,'Hagen, Germany'  ,'Haifa, Israel'  ,'Halifax, Nova Scotia, Canada'  ,'Halle Saale, Germany'  ,'Hamburg, Germany'  ,'Hamilton, Ohio, United States'  ,'Hamilton, Ontario, Canada'  ,'Harare, Zimbabwe'  ,'Harlow, United kingdom'  ,'Harrisburg, Pennsylvania, United States'  ,'Harrogate, United Kingdom'  ,'Harrow, United Kingdom'  ,'Hartford, Connecticut, United States '  ,'Havana, Cuba'  ,'Helena, Montana, United States'  ,'Helsinki, Finland'  ,'Hemel Hempstead, United Kingdom'  ,'Hermosillo, Mexico'  ,'Hevron, Israel'  ,'Hilo, Hawaii'  ,'Hilversum, The Netherlands'  ,'Hollywood, Florida, United States'  ,'Holyoke, Massachusetts, United States'  ,'Hong Kong, China'  ,'Honolulu, Hawaii, United States'  ,'Houston,Texas, United States'  ,'Huntsville, Alabama, United States '  ,'Indianapolis, Indiana, United States'  ,'Ingwiller, France'  ,'Innsbruck, Austria'  ,'Iowa City, Iowa, United States'  ,'Irkutsk, Russia'  ,'Istanbul, Turkey'  ,'Izmir,Turkey'  ,'Jackson, Mississippi, United States'  ,'Jacksonsville, Florida, United States'  ,'Jakarta, Indonesia'  ,'Jersey City, New Jersey, United States '  ,'Jerusalem, Israel'  ,'Johannesburg, South Africa'  ,'Johnstown, Pennsylvania, United States'  ,'Joplin, Missouri, United States'  ,'Juneau, Alaska, United States'  ,'Kaifeng, China'  ,'Kairo, Egypt'  ,'Kalamazoo, Michigan, United States'  ,'Kampala, Uganda'  ,'Kansas City, Kansas, United States'  ,'Kansas City, Missouri, United States'  ,'Karachi, Pakistan'  ,'Katmandu, Nepal'  ,'Kaunas, Lithuania'  ,'Kenosha, Wisconsin, United States'  ,'Key West, Florida, United States'  ,'Khabarovsk, Russia'  ,'Khartoum, Sudan'  ,'Kiev, Ukraine'  ,'Kilkis, Greece'  ,'Kingston, Jamaica'  ,'Kingston, Ontario, Canada'  ,'Kishinew, Moldova'  ,'Kitchener, Ontario, Canada'  ,'Knoxville,Tennessee, United States'  ,'Koblenz, Germany'  ,'Korosten, Ukraine'  ,'Kosice, Slovakia'  ,'Kremenchug, Ukraine'  ,'Kuala Lumpur, Malaysia'  ,'Kuwait, Kuwait'  ,'La Chaux de Fonds, Switzerland'  ,'La Ciotat, France'  ,'La Paz, Bolivia'  ,'La Plata, Argentinia'  ,'La Rochelle, France'  ,'La Seyne-Sur-Mer, France'  ,'Lagos, Nigeria'  ,'Lahr, Germany'  ,'Lancaster, Pennsylvania, United States'  ,'Lancaster, Pennsylvania, United States'  ,'Lansing, Michigan, United States'  ,'Laredo, Texas, United States'  ,'Larissa, Greece'  ,'Las Vegas, Nevada, United States '  ,'Lausanne, Switzerland'  ,'Laval, Montreal, Quebec'  ,'Lawrence, Massachusetts, United States'  ,'Le Mans, France'  ,'Leeds, United Kingdom'  ,'Leicester, United Kingdom '  ,'Leiden,The Netherlands'  ,'Leipzig, Germany'  ,'Lemberg, Lwow, Ukraine'  ,'Lethbridge, Alberta, Canada'  ,'Lexington, Kentucky, United States'  ,'Liberec, Czech Republic'  ,'Libourne, France'  ,'Lihue, Hawaii, United States'  ,'Lille, France'  ,'Lima, Ohio, United States'  ,'Lima, Peru'  ,'Limerick, Ireland'  ,'Limoges, France'  ,'Lincoln, Nebraska, United States '  ,'Linz, Austria'  ,'Lissabon, Portugal'  ,'Little Rock, Arkansas, United States'  ,'Liverpool, United Kingdom'  ,'Livorno, Italy'  ,'Ljubljana, Slovenia '  ,'Logan, Utah, United States'  ,'London, Ontario, Canada'  ,'London, United Kingdom'  ,'Long Beach, California, United States '  ,'Lorain, Ohio, United States'  ,'Los Angeles, California, United States'  ,'Louisville, Kentuky, United States'  ,'Lowell, Massachusetts, United States'  ,'Lubbock, Texas, United States'  ,'Lucerne, Switzerland'  ,'Ludwigshafen, Germany'  ,'Lugoj, Romania'  ,'Lund, Sweden'  ,'Luneville, France'  ,'Lushnje, Albania'  ,'Luton, United Kingdom'  ,'Luxembourg, Luxembourg'  ,'Lyon, France'  ,'Macao, China'  ,'Mâcon, France'  ,'Macon, Georgia, United States'  ,'Madison, Wisconsin, United States'  ,'Madrid, Spain'  ,'Mainz, Germany'  ,'Malaga, Spain'  ,'Mallorca, Spain'  ,'Malmö, Sweden'  ,'Manaus, Amazonas, Brazil'  ,'Manchester, New Hampshire, United States'  ,'Manchester, United Kingdom'  ,'Manila, Philippines'  ,'Mantua, Italy'  ,'Maracaibo, Venezuela'  ,'Marignane, France'  ,'Marseille, France'  ,'Marshall, Texas, United States'  ,'Maseru, Lesotho'  ,'Mbabane, Swasiland'  ,'Medellin, Columbia'  ,'Melbourne, Australia'  ,'Melun, France'  ,'Memphis, Tennessee, United States'  ,'Menton, France'  ,'Merano, Italy'  ,'Merlebach, France'  ,'Metz, France'  ,'Mexico City, Mexico'  ,'Miami Beach, Florida, United States'  ,'Miami, Florida, United States'  ,'Milwaukee, Wisconsin, United States '  ,'Minneapolis, Minnesota, United States'  ,'Minot, North Dakota, United States'  ,'Minsk, Belarus'  ,'Mississauga, Ontario, Canada'  ,'Mobile, Alabama, United States'  ,'Modena, Italy'  ,'Moline,  Illinois, United States'  ,'Moncton, New Brunswick, Canada'  ,'Mons, Belgium'  ,'Monsey, New York, United States'  ,'Montauban, France'  ,'Montbeliard, France'  ,'Monte Carlo, Monaco'  ,'Monterrey, Mexico'  ,'Montevideo, Uruguay'  ,'Montgomery, Alabama, United States'  ,'Monticello, Virginia, United States'  ,'Montpelier, Vermont, United States'  ,'Montpellier, France'  ,'Montreal, France'  ,'Montreal, Quebec, Canada'  ,'Moose Jaw, Saskatchewan, Canada'  ,'Morristown, New Jersey, United States'  ,'Moscow, Russia'  ,'Mukacevo, Ukraine'  ,'Mumbia, India'  ,'Munich, Germany'  ,'Nancy, France'  ,'Nantes, France'  ,'Naples, Florida, United States'  ,'Naples, Italy'  ,'Nashville, Tennessee, United States'  ,'Natchez, Mississippi, United States'  ,'Netanya, Israel'  ,'New Bedfort, Massachusetts, United States'  ,'New Dehli, India'  ,'New Haven, Connecticut, United States'  ,'New Orleans, Louisiana, United States'  ,'New York, New York, United States'  ,'Newark, New Jersey, United States'  ,'Newport, Rhode Island, United States'  ,'Niagra Falls, New York, United States'  ,'Nice, France'  ,'Nikolayev, Ukraine'  ,'Nimes, France'  ,'Nizhniy Novgorod, Russia'  ,'Nizza Monferrato, Italy'  ,'Nome, Alaska, United States'  ,'Norfolk, Virginia, United States'  ,'North Bay, Ontario, Canada'  ,'Norwich, United Kingdom'  ,'Nottingham, United Kingdom'  ,'Noumea, New Caledonia'  ,'Novi Sad, Serbia'  ,'Nurnberg, Germany'  ,'Oakland, California, United States'  ,'Obernai, France'  ,'Odense, Denmark'  ,'Odessa, Ukrain'  ,'Ogden, Utah, United States'  ,'Oklahoma City, Oklahoma, United States'  ,'Oldenburg, Germany'  ,'Olomouc, Czech Republic'  ,'Omaha, Nebraska, United States'  ,'Omsk, Russia'  ,'Oradea, Romania'  ,'Orlando, Florida, United States'  ,'Orléans, France'  ,'Osaka, Japan'  ,'Oshawa, Ontario, Canada'  ,'Oslo, Norway'  ,'Ostend, Belgium'  ,'Ostrava, Czech Republic'  ,'Ottawa, Ontario, Canada'  ,'Oxford, United Kingdom'  ,'Padova, Italy'  ,'Paducah, Kentucky, United States'  ,'Panama, Panama'  ,'Paramaribo, Surinam'  ,'Paris, France'  ,'Parma, Italy'  ,'Pasadena, California, United States'  ,'Paterson, New Jersey, United States'  ,'Pau, France'  ,'Peking, China'  ,'Pensacola, Florida, United States'  ,'Peoria, Illinois, United States'  ,'Perigueux, France'  ,'Perm, Russia'  ,'Perpignan, France'  ,'Perth, Australia'  ,'Perugia, Italy'  ,'Peterborough, Ontario, Canada'  ,'Phalsbourg, France'  ,'Philadelphia, Pennsylvania, United States'  ,'Phnom Penh, Cambodia'  ,'Phoenix, Arizona, United States'  ,'Pierre, South Dakota, United States'  ,'Pilsen, Czech Republic'  ,'Pisa, Italy'  ,'Pittsburgh, Pennsylvania, United States'  ,'Pittsfield, Massachusetts, United States'  ,'Plano, Texas, United States'  ,'Plovdiv, Bulgaria'  ,'Plymouth, United Kingdom'  ,'Pocatello, Idaho, United States'  ,'Poitiers, France'  ,'Port Arthur, Texas, United States'  ,'Port Louis, Mauritius'  ,'Port Moresby, Papua New Guinea'  ,'Port Said, Egypt'  ,'Portland, Maine, United States'  ,'Portland, Oregon, United States'  ,'Porto, Portugal'  ,'Portsmouth, New Hampshire, United States'  ,'Portsmouth, United Kingdom'  ,'Portsmouth, Virginia, United States'  ,'Postville, Iowa, United States'  ,'Prague, Czech Republic'  ,'Pretoria, South Africa'  ,'Prince Rupert, British Columbia, Canada'  ,'Providence, Rhode Island, United States'  ,'Provo, Utah, United States'  ,'Pueblo, Colorado, United States'  ,'Puta, Azerbaijan'  ,'Quebec City, Quebec, Canada'  ,'Quito, Ecuador'  ,'Raananna, Israel'  ,'Rabat, Morocco'  ,'Rachki, Ukraine'  ,'Racine, Wisconsin, United States'  ,'Radauti, Romania'  ,'Raleigh, North Carolina, United States'  ,'Ramat Gan, Israel'  ,'Ramsgate, United Kingdom'  ,'Rapid City, South Dakota, United States'  ,'Reading, Pennsylvania, United States'  ,'Reading, United Kingdom'  ,'Redmond, Washington, United States'  ,'Regensburg, Germany'  ,'Regina, Saskatchewan, Canada'  ,'Rehovot, Israel'  ,'Reims, France'  ,'Rennes, France'  ,'Reno, Nevada, United States'  ,'Reykjavik, Iceland'  ,'Richmond, Virginia, United States'  ,'Riga, Latvia'  ,'Rijeka, Croatia'  ,'Rio de Janeiro, Brazil'  ,'Riverside, California, United States'  ,'Riyadh, Saudi Arabia'  ,'Roanne, France'  ,'Roanooke, Virginia, United States'  ,'Rochester, Minnesota, United States'  ,'Rochester, New York, United States'  ,'Rockford, Illinois, United States'  ,'Rome, Italy'  ,'Rostock, Germanyn'  ,'Rotterdam, Netherlands'  ,'Rouen, France'  ,'Sacramento, California, United States'  ,'Saginaw, Michigan, United States'  ,'Saint Gallen, Switzerland'  ,'Saint-Avold, France'  ,'Saint-Die, France'  ,'Saint-Etienne, France'  ,'Saint-Fons, France'  ,'Saint-Laurent-du-Var, France'  ,'Saint-Quentin, France'  ,'Salem, Oregon, United States'  ,'Salina, Kansas, United States'  ,'Saloniki, Greece'  ,'Salt Lake City, Utah, United States'  ,'Salzburg, Austria'  ,'Salzgitter, Germany'  ,'San Angelo, Texus, United States'  ,'San Antonio, Texus, United States'  ,'San Bernardino, California, United States'  ,'San Diego, California, United States'  ,'San Francisco, California, United States '  ,'San Jose, California, United States'  ,'San Juan, Puerto Rico'  ,'San Salvador, El Salvador'  ,'Sana, yemen'  ,'Santa Barbara, California, United States'  ,'Santa Cruz, California, United States'  ,'Santa Fe, New Mexico, United States'  ,'Santiago, Chile'  ,'Santo Domingo, Dominican Republic'  ,'Sao Paulo, Brazil'  ,'Sarajevo, Bosnia'  ,'Sarasota, Florida, United States'  ,'Sarrebourg, France'  ,'Sarreguemines, France'  ,'Saskatoon, Saskatchewan, Canada'  ,'Satu Mare, Romania'  ,'Savannah, Georgia, United States'  ,'Saverne, France'  ,'Scarsdale, New York, United States'  ,'Schenectady, New York, United States '  ,'Scranton, Pennsylvania, United States'  ,'Seattle, Washington, United States'  ,'Sedan, France'  ,'Selestat, France'  ,'Sevilla, Spain'  ,'Shanghai, China'  ,'Sheboygan, Wisconsin, United States'  ,'Shechem, Israel'  ,'Sheffield, United Kingdom'  ,'Shenyang, China'  ,'Sherbrooke, Quebec, Canada'  ,'Sheridan, Wyoming, United States'  ,'Shreveport, Louisiana, United States '  ,'Siena, Italy'  ,'Silver Spring, Maryland, United States'  ,'Simferopol, Ukraine'  ,'Singapore, Singapore'  ,'Sioux City, Iowa, United States'  ,'Sioux Falls, South Dakota, United States'  ,'Skokie, Illinois, United States'  ,'Skopje, Yugoslavia'  ,'Slavuta, Ukraine'  ,'Sofia, Bulgaria'  ,'Solihull, United Kingdom'  ,'Somerville, Massachusetts, United States'  ,'Sopron, Hungary'  ,'South Bend, Indiana, United States'  ,'Southend-on-Sea, United Kingdom'  ,'Southport, United Kingdom'  ,'Spartanburg, South Carolina, United States'  ,'Split, Croatia'  ,'Spokane, Washington, United States'  ,'Springfield, Illinois, United States'  ,'Springfield, Massachusetts, United States'  ,'Springfield, Missouri, United States'  ,'Springfield, Ohio, United States'  ,'St Catherines, Ontario, Canada'  ,'St Cloud, Minnesota, United States'  ,'St John, New Brunswick, Canada'  ,'St Johns, Newfoundland, Canada'  ,'St Joseph, Missouri, United States'  ,'St Louis, Missouri, United States'  ,'St Paul, Minnesota, United States'  ,'St Petersburg, Florida, United States'  ,'St Petersburg, Russia'  ,'Stamford, Connecticut, United States'  ,'Stockholm, Sweden'  ,'Stockton, California, United States'  ,'Strasbourg, France'  ,'Stuebenville, Ohio, United States'  ,'Stuttgart, Germany'  ,'Subotica, Serbia'  ,'Suceava, Romania'  ,'Sudbury, Ontario, Canada'  ,'Suez, Egypt'  ,'Sunderland, United Kingdom'  ,'Superior, Wisconsin, United States'  ,'Sydney, Australia'  ,'Syracuse, New York, United States'  ,'Szeged, Hungary'  ,'Tacoma, Washington, United States'  ,'Tahiti, Polynesia'  ,'Taipei, Taiwan'  ,'Tallahassee, Florida, United States'  ,'Tallinn, Estonia'  ,'Tampa, Florida, United States'  ,'Taraclia, Moldova'  ,'Tarbes, France'  ,'Tashkent, Uzbekistan'  ,'Tbilisi, Georgia'  ,'Teaneck, New Jersey, United States'  ,'Tegucigalpa, Honduras'  ,'Tel Aviv, Israel'  ,'Teplice, Czech Republic'  ,'Teverya, Israel'  ,'Texarkana, Texas, United States'  ,'Thionville, France'  ,'Thunder Bay, Ontario, Canada'  ,'Tiberias, Israel'  ,'Tijuana, Mexico'  ,'Tilburg, Netherlands'  ,'Timisoara, Romania'  ,'Tinton Falls, New Jersey, United States'  ,'Tirana, Albania'  ,'Tokyo, Japan'  ,'Toledo, Ohio, United States'  ,'Topeka, Kansas, United States'  ,'Toronto, Ontario, Canada'  ,'Torremolinos, Spain'  ,'Toul, France'  ,'Toulon, France'  ,'Toulouse, France'  ,'Tours, France'  ,'Towson, Maryland, United States'  ,'Tralee, Ireland'  ,'Trenton, New Jersey, United States'  ,'Trieste, Italy'  ,'Tripoli, Libya'  ,'Trnava, Slovakia'  ,'Trois Riveres, Quebec, Canada'  ,'Trondheim, Norway'  ,'Troy, New York, United States'  ,'Troyes, France'  ,'Tucson, Arizona, United States'  ,'Tulsa, Oklahoma, United States'  ,'Tunis, Tunisia'  ,'Turin, Italy'  ,'Turku, Finland'  ,'Tzfat, Israel'  ,'Urbana, Illinois, United States'  ,'Utica, New York, United States'  ,'Utrecht, Netherlands'  ,'Vaduz, Liechtenstein'  ,'Valence, France'  ,'Valenciennes, France'  ,'Vancouver, British Columbia, Canada'  ,'Venice, Italy'  ,'Venissieux, France'  ,'Verdun, France'  ,'Verona, Italy'  ,'Versailles, France'  ,'Vevey, Switzerland'  ,'Vichy, France'  ,'Victoria, British Columbia'  ,'Vienna, Austria'  ,'Vientiane, Laos'  ,'Vilna, Lithuania'  ,'Waco, Texas, United States'  ,'Walla Walla, Washington, United States'  ,'Warsaw, Poland'  ,'Washington, DC., United States'  ,'Waterloo, Iowa, United States'  ,'Watford, United Kingdom'  ,'Wellington, New Zealand'  ,'West Palm Beach, Florida, United States'  ,'Wheeling, West Virginia'  ,'White Plains, New York, United States'  ,'Wichita, Kansas, United States'  ,'Wichita, Kansas, United States'  ,'Wilkes-Barre, Pennsylvania, United States'  ,'Wilmington, Delaware, United States'  ,'Wilmington, North Carolina, United States'  ,'Windhoek, Namibia'  ,'Windsor, Ontario, Canada'  ,'Winnipeg, Manitoba, Canada'  ,'Winston Salem, North Carolina, United States'  ,'Winterthur, Switzerland'  ,'Worcester, Massachusetts, United States'  ,'Worms, Germany'  ,'Woronesch, Russia'  ,'Yakima, Washington, United States'  ,'Yellowknife, Northwest Territories, Canada'  ,'Yerevan, Armenia'  ,'Yonkers, New York, United States'  ,'York, Pennsylvania, United States'  ,'Youngstown, Ohio, United States'  ,'Yuma, Arizona, United States'  ,'Zagreb, Croatia'  ,'Zanesville, Ohio, United States'  ,'Zhitomir, Ukraine'  ,'Zilina, Slovakia'  ,'Zug, Switzerland'  ,'Zurich, Switzerland'  ,'Zwolle, Netherlands'  );
_home_locations.push(new Location(3012, "Paris, France", 4852, 220, 1, "Europe/Paris", null, null));	
function calender()
{
	var d = new Date();
    var temp = HDate_from_english(d.getDate(), 
											 d.getMonth(), 
											 d.getFullYear(), 
											 d.getHours( ), 
											 d.getMinutes());
	this._selected_day = temp._d;
	this._selected_offset = 0;
	this._selected_shape = 'none';
	this._selected_month = temp._m;
	this._selected_year = temp._y;
	this._current_date = temp;

	this._month = new Month(this._selected_month,this._selected_year,this);
		var next_month = this._month._days[1]._date.clone();
		next_month.next_mo();
		this._next_month = new Month(next_month._m,next_month._y,this);	
		
		var last_month = this._month._days[1]._date.clone();
		last_month.prev_mo();
		this._last_month = new Month(last_month._m,last_month._y,this);	
	
	this._events = new Array();
	this._veses = new Array();
	this._memos = new Array();
	
	this._settings = Settings.getInstance();
	this._settings._carry_chodesh = true; 
	this._settings._explain = true; 
	this._settings._reminders = 'NNYN'; 	
	this._settings._email1 = 'foxdanni@gmail.com'; 
	this._settings._email2 = 'tlissak@gmail.com'; 
	this._settings._phone = ''; 	
	this._settings._defaultView = 'month'; 
	this._settings._rabbi = ''; 
	this._settings._delay = '12'; 
	this._settings._view = this._settings._defaultView;

	this._page_num = 1;
}
calender.prototype._settings;
calender.prototype._selected_day;
calender.prototype._selected_offset;
calender.prototype._selected_month;
calender.prototype._selected_year;
calender.prototype._current_date;
calender.prototype._month;
calender.prototype._last_month;
calender.prototype._next_month;
calender.prototype._events;
calender.prototype._veses;
calender.prototype._memos;
calender.prototype._page_num;
var css = " style='background: url(images/mini_cal_bg.png) no-repeat scroll center center; width: 178px; height: 139px;'><div style=\"line-height:28px;font-weight:regulat;font-family: Arial;font-size: 12px;color: #666;\">";

calender.prototype.draw = function() {
	
	var output = "";
	if(this._settings._view == 'month')
	{	
	 	this._page_num = 1;
		setHeader(this._month._name+" ("+this._month._eng_name+")");
		output = "<table cellspacing='5'><tr><td width='680px'>"+this._month+"</td>";
		output += "<td align='center' valign='top'><div align='center' id='last_mo' "+css+"Last Month: "+this._last_month.mini_view(true);
		output += "</div><div align='center' id='next_mo' "+css+"Next Month: "+this._next_month.mini_view(true)+"</div><img src='./images/legend.png' /></td></tr></table>";
	}
	else if(this._settings._view == 'table')
	{
			setHeader("Table View");
			output = table_view(this);
	}
	else if(this._settings._view == 'year')
	{
	 	this._page_num = 1;
		var y = this._month._y;
		var m = 1;
		var i;
		var months = new Array();
		var j=1;
		for(i=7;i<=lastMonthOfHebrewYear(y);i++)
		{
			months[j] = new Month(i,y,this);
			j++;
		}
		for(i=1;i<=6;i++)
		{
			months[j] = new Month(i,y,this);
			j++;
		}		

		setHeader("Hebrew Year of "+y+" ("+(y-3761)+" - "+(y-3760)+")");
				
		output = "<br><table cellspacing='5'><tr><td width='800px'><table cellspacing='10'>";
		for(row = 1; row < 5; row++)
		{
			output += "<tr>";
			for(col = 1; col < 5; col++)
			{
				output += "<td ><div  align='center' id='month' "+css+months[m].mini_view(false)+"</td>";
				m++;
				if(m > lastMonthOfHebrewYear(y))
					return output+"</tr></table></td></tr></table><img src='images/year_legend.png' style='margin-left:-25px'>";
			}
		}
		output +="</tr></table></td></tr></table><img src='images/year_legend.png' style='margin-left:-25px'>";
	}
	else if(this._settings._view == 'charts')
	{
		if(plot_pg == 1)
		{
		setHeader("Cycle Length");
		output = "<div align='center' style='font-size:12px;width:850px;'><div  id = 'chart_view' style='width:850px;height:400px;'></div><br>The Y axis represents the amount of days between succesive flows.<br>The X axis represents the gap between flows starting from the first flow entered.<br>This information has <strong>no relevance</strong> to the laws of family purity.<br><br><strong>Your average cycle length (including flows occuring from stains) is <div id='flow_length' style='display:inline'></div> days</strong><br><br></div>";
		}
		else if(plot_pg == 2)
		{
		setHeader("Flow Length");
		output = "<div align='center' style='font-size:12px;width:850px;'><div  id = 'chart_view' style='width:850px;height:400px;'></div><br>The Y axis represents the days between the start of a flow and the Hefsek Taharah.<br>The X axis represents the flow starting from the first flow entered.<br>This information has <strong>no relevance</strong> to the laws of family purity.<br><br><strong>Your average flow length (including flows occuring from stains) is <div id='flow_length' style='display:inline'></div> days</strong><br><br></div>";
		}
	}
	
	return output;

}
calender.prototype.update = function() {
	if(this._settings._view == 'month')
	{	
		var m = this._month._m;
		var y = this._month._y;
		this._month = new Month(m,y,this);
		var next_month = this._month._days[1]._date.clone();
		next_month.next_mo();
		this._next_month = new Month(next_month._m,next_month._y,this);	
		
		var last_month = this._month._days[1]._date.clone();
		last_month.prev_mo();
		this._last_month = new Month(last_month._m,last_month._y,this);			
	}
	else if(this._settings._view == 'table')
		update_table();

}
calender.prototype.next_month = function() {
	if(this._settings._view == 'month')
	{		
		this._last_month = this._month;
		this._month = this._next_month;
		this._selected_day = this._month._days[1]._date._d;
		this._selected_month = this._month._days[1]._date._m;
		this._selected_year = this._month._days[1]._date._y;
		
		var next_month = this._month._days[1]._date.clone();
		next_month.next_mo();
		this._next_month = new Month(next_month._m,next_month._y,this);
	}
	else if(this._settings._view == 'year')
	{	
		this._month._y++;
	}
	else if(this._settings._view == 'table')
	{	
		this._page_num = this._page_num+1;
	}
	else if(this._settings._view == 'charts')
	{
		flip_charts();
	}

}

calender.prototype.prev_month = function() {
    if(this._settings._view == 'month')
	{		
		this._next_month = this._month;
		this._month = this._last_month;
		this._selected_day = this._month._days[1]._date._d;
		this._selected_month = this._month._days[1]._date._m;
		this._selected_year = this._month._days[1]._date._y;
		
		var last_month = this._month._days[1]._date.clone();
		last_month.prev_mo();
		this._last_month = new Month(last_month._m,last_month._y,this);
	}
	else if(this._settings._view == 'year')
	{	
		this._month._y--;
	}	
	else if(this._settings._view == 'table')
	{	
		if(this._page_num > 1)
			this._page_num = this._page_num-1;
	}
	else if(this._settings._view == 'charts')
	{
		flip_charts();
	}

}


calender.prototype.jump = function(m,y) {
	this._settings._view = 'month';	
	this._selected_day = 1;
	this._selected_month = m;
	this._selected_year = y;

	this._month = new Month(this._selected_month,this._selected_year,this);
		var next_month = this._month._days[1]._date.clone();
		next_month.next_mo();
		this._next_month = new Month(next_month._m,next_month._y,this);	
		
		var last_month = this._month._days[1]._date.clone();
		last_month.prev_mo();
		this._last_month = new Month(last_month._m,last_month._y,this);	

		move_unconfirmed_ht();
}

var cal = new calender();

function draw()
{
	document.getElementById('result').innerHTML = cal.draw();
	if(cal._settings._view == 'month')
	{
		
		//disable new reeyah option if there is an uncforirmed hefsek taharah
		if(cal._veses.length == 0 || cal._veses[cal._veses.length-1]._hefsek_confirmed ||
		!cal._veses[cal._veses.length-1].goesOnCalendar())
			$('#myMenu').enableContextMenuItems('#reeyah');
		else
			$('#myMenu').disableContextMenuItems('#reeyah');	
		cal._selected_offset = 0;
		for(i=1;i<=cal._month._length;i++)
		{
			var div = document.getElementById('day_'+i);
			cal._month._days[i]._leftX = div.offsetLeft; 
			cal._month._days[i]._topY = div.offsetTop;
			$(document).ready( function() {$('#day_'+i).contextMenu({menu: 'myMenu'},function(action, el, pos) {
			right_click($(el).attr('id'),action,cal);
			});});
		}
		

		$(function(){$('#ht_1').easydrag();
		$('#ht_1').ondrop(function(e, element){ drop(Number(element.offsetLeft),Number(element.offsetTop)); });});
		

		
	}
	else if(cal._settings._view == 'charts')
		plot(cal);
	
}
	


top.frames[1].cal._selected_offset=0;


iframe_print = document.getElementById('ifrmPrint');
cur_view = document.getElementById('current_view');
cur_view.innerHTML = view_name(cal._settings._view);
	win = document.getElementById('views');
			

  function new_popup_win(string,height,width)
  {
  
  			if(string != '')
  				document.getElementById('hiddenModalContent').innerHTML = string; 
			var tb_pathToImage = "images/loadingAnimation.gif";
			imgLoader = new Image();// preload image
			imgLoader.src = tb_pathToImage;
			tb_show(null,'#TB_inline?height='+String(height-25)+'&width='+width+'&inlineId=hiddenModalContent&modal=true',false);
	}
  
  function new_popup_win_fromString()
  {

		var day = cal._month._days[cal._selected_day];
		if(day != null)
		{
			document.getElementById('hiddenModalContent').innerHTML = day.output_html_details(); 
			
			
			var tb_pathToImage = "images/loadingAnimation.gif";
			imgLoader = new Image();// preload image
			imgLoader.src = tb_pathToImage;
			
			tb_show(null,'#TB_inline?height=240&width=400&inlineId=hiddenModalContent&modal=true',false);
		}

  }  
  
  function new_popup_win_explainer(exp_type)
  {

  		//hack
		if(exp_type == 10)
			exp_type = 'R';
  		if(exp_type == 'kavuah')
			document.getElementById('hiddenModalContent').innerHTML = kavuah_text;
		else
		{
			var explain = cal._veses[cal._veses.length-1].explain(exp_type);
			if(explain == 'FAIL')
			{
				return;
				alert(exp_type+" returned failure");
			}
			
			document.getElementById('hiddenModalContent').innerHTML = explain; 
		}
		//alert(exp_type+"---"+document.getElementById('hiddenModalContent').innerHTML);
  		var tb_pathToImage = "images/loadingAnimation.gif";
		imgLoader = new Image();// preload image
		imgLoader.src = tb_pathToImage;
		$("#TB_window").css('background-image','url(../../../images/window2.jpg)');
		tb_show(null,'#TB_inline?height=475&width=400&inlineId=hiddenModalContent&modal=true',false);
  }
   

   

function Hide_Windows() { 
	tb_remove();
} 

	function next()
	{
		cal.next_month();
		if(!move_unconfirmed_ht())
			draw();
	}
	
	function prev()
	{
		cal.prev_month();
		if(!move_unconfirmed_ht())
			draw();
	}
	
	function refresh()
	{
		cal.update();
		draw();
		
	}

	function setHeader(str)
	{
		document.getElementById('header_txt').innerHTML = "<table width='440' style = 'margin-left: auto;margin-right: auto;'><tr valign=middle><td width='15'><img src='images/nav/left_off.png' onmousedown= \"this.src='images/nav/left_on.png'\" onmouseup=\"this.src='images/nav/left_off.png'\"  onclick='prev();'/></td><td align='center'><h1>"+str+"</h1></td><td width='15'><img  src='images/nav/right_off.png' id='nav_right' onmousedown= \"this.src='images/nav/right_on.png'\" onmouseup=\"this.src='images/nav/right_off.png'\" onclick='next();'/></td></tr></table>"; 
	} 
	
	
var vestos_db = new Array();
rebuild_vestos(cal);

function confirm_ht() {
for(i in cal._veses)
	if(!cal._veses[i]._hefsek_confirmed)
	{
		var v = cal._veses[i];
		var d = new Date();
		var today = HDate_from_english(d.getDate(), 
												 d.getMonth(), 
												 d.getFullYear(), 
												 d.getHours( ), 
												 d.getMinutes());
												 
		if(!today.is_later_then(v._reeyah))
			return;
		var counter = v._reeyah.clone();
		counter.prev();
		var count = 0;
		while(today.is_later_then(counter) && count < 6)
		{
			count++;
			counter.next();
		}
		
		if(v.StartedInWhiteWeek(cal) || count > 4 || v._cause == 4 || v._cause == 5)
			$(document).ready(function() 
					{tb_show(null, 'confirm_hefsek.php?TB_iframe=true&height=265&width=400&modal=true', null);});
	
		return;
	}
}

function new_reeyah() {
		
	if(cal._veses.length == 0 )
	{
		$(document).ready(function() {tb_show("", 'first_reeyah.php?TB_iframe=true&height=500&width=400&modal=true', "");});
		return;
	}
	else
	{
		$(document).ready(function() {tb_show("", 'new_reeyah.php?TB_iframe=true&height=265&width=400&modal=true', "");});
		return;	
	}
}

//needed so that an empty cal loads
//other bugs exist if this refresh is removed
refresh();
	
//hide splash screen and show app	
parent.document.getElementById('frameset').rows='0,*';

//check for unconfirmed ht's and show popup if one exists or welcome new users
if(cal._veses.length == 0 && cal._memos.length == 0)
	$(document).ready(function() {tb_show("", 'welcome.php?TB_iframe=true&height=265&width=400&modal=true', "");});
else
	setTimeout('confirm_ht();',2500);

//move unconfirmed ht tothe current month
move_unconfirmed_ht();
//needed for right click menu to work without calling refresh	
setTimeout('draw();',500);				
setTimeout('draw();',3000);	




var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));



try {
var pageTracker = _gat._getTracker("UA-8503901-2");
pageTracker._trackPageview();
} catch(err) {}

});

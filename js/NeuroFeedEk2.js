/*
* FeedEk jQuery RSS/ATOM Feed Plugin v1.1.2
* http://jquery-plugins.net/FeedEk/FeedEk.html
* Author : Engin KIZIL 
* http://www.enginkizil.com
* adapted by: Leonardo RESTIVO
*/


colors = new Array(14)
colors[0]="#4B7F7F";
colors[1]="#E9AA27";
colors[2]="#719382";
colors[3]="#D2E3AF";
colors[4]="#DF230C";
colors[5]="#D2E3AF";
colors[5]="#426060";
colors[6]="#185353";
colors[7]="#84BFBF";
colors[8]="#94BFBF";
colors[9]="#ABC674";
colors[10]="#859567";
colors[11]="#638126";
colors[12]="#CBE39D";
colors[13]="#D2E3AF";


function searchKey(cue,target){
	result = target.toLowerCase().indexOf(cue.toLowerCase())>-1;
	return (result);
}


(function (e) { e.fn.FeedEk = function (t, queryIN, jName, queryType){
	var n = {
		FeedUrl: "http://rss.cnn.com/rss/edition.rss",
		MaxCount: 5,
		ShowDesc: true,
		ShowPubDate: true,
		CharacterLimit: 0,
		TitleLinkTarget: "_blank"
	};
	if (t) {
		e.extend(n, t)
	}
	var r = e(this).attr("id");
	var i;
	serialN=0
	e("#" + r).empty().append('<div style="padding:3px;"><img src="images/loader.gif" /></div>');
	e.ajax({
		url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + n.MaxCount + "&output=json&q=" + encodeURIComponent(n.FeedUrl) + "&hl=en&callback=?",
		dataType: "json",
		success: function (t){	
			e("#" + r).empty();
			var s = "";
			var w = "";
			var interesting=false;
			s+='<p class="journalName">'+jName+'</p>';
			e.each(t.responseData.feed.entries,function (e, t){

				feedDate = new Date(t.publishedDate);
				today = new Date();
				one_day=1000*60*60*24;
				diffDays = Math.ceil((today- feedDate)/one_day);

				// retrieve only 7-days-old or "younger" feeds
				if (diffDays<=7) {

					// if the query type is boolean
					if(queryType){

						// search the boolean key 
						booleanTitle = searchKey(queryIN[1],t.title);
						booleanAuthor = searchKey(queryIN[1],t.author);
						booleanContent = searchKey(queryIN[1],t.content);

						// if the boolean key is found in title author or content fields
						if(booleanTitle || booleanAuthor || booleanContent){
							
							//loop over keywords list
							for (var i=2;i<queryIN.length;i++) {
								
								// search the keywords
								var titleKey = searchKey(queryIN[i],t.title);
								var authorKey = searchKey(queryIN[i],t.author);
								var contentKey = searchKey(queryIN[i],t.content);

								// if keys in the boolean subset, then display feeds
								if (titleKey || authorKey || contentKey){
									interesting=true;
									w+='<span class="myTag '+queryIN[i]+'" style="background:'+colors[i]+'">'+queryIN[i]+'</span>';
								}
							}
						}
					}
					else{
						//loop over keywords list
						for (var i=0;i<queryIN.length;i++) {
							
							// search the keywords
							var titleKey = searchKey(queryIN[i],t.title);
							var authorKey = searchKey(queryIN[i],t.author);
							var contentKey = searchKey(queryIN[i],t.content);
							
							// if keys in the feeds, then display feeds
							if (titleKey || authorKey || contentKey){
								interesting=true;
								w+='<span class="myTag '+queryIN[i]+'" style="background:'+colors[i]+'">'+queryIN[i]+'</span>';
							}
						}
					}

					// only display feeds containing keywords
					if (interesting){
						s += '<li><div class="itemTitle"><a href="' + t.link + '" target="' + n.TitleLinkTarget + '" >' + t.title + "</a></div>";
						s += '<div class="itemAuthor">'+t.author+'</div>'

						if (n.ShowPubDate) {
							i = new Date(t.publishedDate);

							// Highlight recent feeds (less than 4 days old)
							if (diffDays<=3){
								s += '<div class="itemDate recentFeed">' + i.toLocaleDateString() + "</div>"
							}
							else{
								s += '<div class="itemDate">' + i.toLocaleDateString() + "</div>"
							}
						}
						if (n.ShowDesc) {
							// display tag containing the detected keyword along with the feed content
							if (n.DescCharacterLimit > 0 && t.content.length > n.DescCharacterLimit){
								s += '<div class="itemContent">' + t.content.substr(0, n.DescCharacterLimit) + '...</div><span class="star">'+w+'</span>';
								w="";
								interesting=false;
							}
							
						}
					};
				// else {s += '<div class="itemContent">' +t.content + "</div>";}
			}});
e("#" + r).append('<ul class="feedEkList">' + s + "</ul>") } }) } })(jQuery)



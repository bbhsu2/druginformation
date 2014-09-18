/*
Drug Information- Chrome Extension
by Bernard Hsu
   All Good People LLC

with consultation from Bill Budris, RPh
   Northwestern Memorial Hospital, Chicago IL

this version found at http://www.github.com/bbhsu2/druginformation

MIT License */

function focusSearchQuery(){
	$("#searchQuery").focus();
}

setTimeout(function() {
  focusSearchQuery();
}, 500);

document.addEventListener('DOMContentLoaded', function () {
	var label = $("div > label");

	//set check disease button
	label[0].addEventListener('click', function(e){
		$(".disease").each(function(){
			this.checked = true;
		});
		focusSearchQuery();
	})

	//set check drug button
	label[1].addEventListener('click', function(e){
		$(".drug").each(function(){
			this.checked = true;
		});
		focusSearchQuery();
	})

	//set the check all button
	var flag = false; //TODO: fix this so it's based on checkbox state.
	label[2].addEventListener('click', function(e){
		if(flag) {
			$(this).html("Check All");
			$(".checkboxOption").each(function(){
				this.checked = false;
			});
			flag = false;
		} else{
			$(this).html("Unselect All");
			$(".checkboxOption").each(function(){
				this.checked = true;
			});
			flag =  true;
		}
		focusSearchQuery();
	});

	var searchButton = $(":button")[0];

	//set search button click
	searchButton.addEventListener('click', searchClick);

	//setting enter button click
	$(".content").keyup(function(e) {
		if(e.keyCode == 13) {
			searchButton.click();
		}
	});

	//make it so that checkboxes are checked when label is clicked
    $(".form-control").on("click", checkInside);
	$("#searchQuery").attr('onclick','').unbind('click'); //remove click handler for box
 })

 function checkInside(e) {
    var box = $(".checkboxOption",$(this).parent());
    if(box.prop('checked') == true){
        box.prop('checked', false);
    } else{
         box.prop('checked', true);
    }

	var allBoxes = $(":checkbox");
	var hasUnchecked = true;
	var box = $(".btn-group > .btn-primary");
	for(var i = 0; i < allBoxes.length; i++){
		if(!allBoxes[i].checked){
			hasUnchecked = true;
			box.html("Check All");
		} else {
			hasUnchecked = false;
			box.html("Unselect All");
		}
	}

	focusSearchQuery();
}

function getPubMedLink(query){
	return "http://www.ncbi.nlm.nih.gov/pubmed/?term=" + query;
}

function getDailyMedLink(query){
	return "http://dailymed.nlm.nih.gov/dailymed/search.cfm?query=" + query;
	//old link
	// return "https://dailymed.nlm.nih.gov/dailymed/search.cfm?startswith=" +
	// 	   query +
	// 	   "&x=0&y=0";
}

function getClinPharmLink(query){
	return "http://clinicalpharmacology-ip.com/Forms/search.aspx?s=" + query;
}

function getDrugsAtFDALink(query){
	return "http://www.accessdata.fda.gov/scripts/cder/drugsatfda/index.cfm?" +
		   "fuseaction=Search.Overview&" +
		   "DrugName=" + query + "&" +
		   "CFID=34297116&CFTOKEN=9b96930ccafcc38b-DB16D54C-B813-5F5E-A0A75D1DA67934C5";
}

function getDrugsAtFDAReviewLink(query){
	return "https://www.google.com/#q="+
		   query +
		   "+Medical+Review(s)+Pharmacology+Review(s)+Administrative+Document(s)+Correspondence"
}

function getGoogleLink(query){
	return "https://www.google.com/#q=" + query;
}

function getClinicalTrialsGovLink(query){
	return "http://clinicaltrials.gov/ct2/results?term=" + query + "&Search=Search";
}

function getEMEALink(query){
	return "http://www.ema.europa.eu/ema/index.jsp?" +
	"curl=pages%2Fincludes%2Fmedicines%2Fmedicines_landing_page.jsp" +
	"&searchkwByEnter=true" +
	"&quickSearch=" + query +
	"&keywordSearch=Submit";
}

function getWikipediaLink(query){
	return "http://en.wikipedia.org/w/index.php?search=" +
		   query +
		   "&title=Special%3ASearch&go=Go";
}

function getGoogleFDAAdComLink(query){
	return "https://www.google.com/search?q=" +
			query +
			"+fda+\"advisory+committee+meeting+announcement\"+\"public+participation\"";
}

function getGoogleREMSLink(query){
	return "https://www.google.com/search?q=" +
			query +
			"+REMS";
}

function getGoogleRestrictedDistributionLink(query){
	return "https://www.google.com/search?q=" +
			query +
			"+\"restricted+distribution\"";
}

function getGoogleGuidelinesLink(query){
	return "https://www.google.com/search?q=" +
			query +
			"+guidelines";
}

function getUpToDateLink(query){
	return "http://www.uptodate.com/contents/search?search=" +
			query +
			"&sp=0&searchType=PLAIN_TEXT&source=USER_INPUT&searchControl=TOP_PULLDOWN&searchOffset=";
}

function setClickTimeout(func){
	setTimeout(func, 125);
}

function searchClick(e){
	var query = document.getElementById("searchQuery").value;

	if(query != ""){
		var boxes = $(":checkbox");

		for(var i = 0; i < boxes.length; i++){
			var string = "";
			if(boxes[i].checked){
				switch(i){
					case 0:
						setClickTimeout(function(){
							chrome.tabs.create({url : getClinPharmLink(query)});
						});
						break;
					case 1:
						setClickTimeout(function(){
							chrome.tabs.create({url: getClinicalTrialsGovLink(query)});
						});
						break;
					case 2:
						setClickTimeout(function(){
							chrome.tabs.create({ url: getDailyMedLink(query)});
						});
						break;
					case 3:
						setClickTimeout(function(){
							chrome.tabs.create({ url: getDrugsAtFDALink(query)});
						});
						break;
					case 4:
						setClickTimeout(function(){
							chrome.tabs.create({url: getDrugsAtFDAReviewLink(query)});
						});
						break;
					case 5:
						setClickTimeout(function(){
							chrome.tabs.create({url: getGoogleFDAAdComLink(query)});
						});
						break;
					case 6:
						setClickTimeout(function(){
							chrome.tabs.create({ url: getEMEALink(query)});
						});
						break;
					case 7:
						setClickTimeout(function(){
							chrome.tabs.create({ url: getGoogleLink(query)});
						});
						break;
					case 8:
						setClickTimeout(function(){
							chrome.tabs.create({url: getGoogleGuidelinesLink(query)});
						});
						break;
					case 9:
						setClickTimeout(function(){
							chrome.tabs.create({url: getGoogleRestrictedDistributionLink(query)});
						});
						break;
					case 10:
						setClickTimeout(function(){
							chrome.tabs.create({url: getGoogleREMSLink(query)});
						});
						break;
					case 11:
						setClickTimeout(function(){
							chrome.tabs.create({url: getUpToDateLink(query)});
						});
						break;
					case 12:
						setClickTimeout(function(){
							chrome.tabs.create({ url: getPubMedLink(query)});
						});
						break;
				}
			}
		}
	} else{
		alert("Please enter a search query!");
	}
}

function checkAll(e){
	$(".checkboxOption").each(function(){
		this.checked = true;
	});
}

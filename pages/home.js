/* Bernard Hsu, 2014
License information here */

setTimeout(function() {
  $('#searchQuery').focus();
}, 500);

//var bg = chrome.extension.getBackgroundPage();
// var LOG_SRC = "POPUP";
// var searchStr = "";

document.addEventListener('DOMContentLoaded', function () {
	var label = $("div > label");
	var flag = false; //TODO: fix this so it's based on checkbox state.
	label[0].addEventListener('click', function(e){
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
	});
	
	$(":button")[1].addEventListener('click', searchClick);
	
	$(".content").keyup(function(e) {
		if(e.keyCode == 13) {
			$(":button")[1].click();
		}
	});
	
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
}

function getPubMedLink(query){
	return "http://www.ncbi.nlm.nih.gov/pubmed/?term=" + query;
}

function getDailyMedLink(query){
	return "https://dailymed.nlm.nih.gov/dailymed/search.cfm?startswith=" +
		   query +
		   "&x=0&y=0";
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
	return "";
}

function getGoogleREMSLink(query){
	return "";
}

function getGoogleRestrictedDistributionLink(query){
	return "";
}

function getGoogleGuidelinesLink(query){
	return "";
}

function searchClick(e){
	var query = document.getElementById("searchQuery").value;
	var boxes = $(":checkbox");
	
	for(var i = 0; i < boxes.length; i++){
		var string = "";
		if(boxes[i].checked){
			switch(i){
				case 0:
					chrome.tabs.create({url : getClinPharmLink(query)});
					break;
				case 1:
					chrome.tabs.create({url: getClinicalTrialsGovLink(query) });
					break;
				case 2:
					chrome.tabs.create({ url: getDailyMedLink(query) });
					break;
				case 3:
					chrome.tabs.create({ url: getDrugsAtFDALink(query) });
					break;
				case 4:
					chrome.tabs.create({ url: getEMEALink(query) });
					break;
				case 5:
					chrome.tabs.create({ url: getGoogleLink(query) });
					break;
				case 6:
					chrome.tabs.create({ url: getPubMedLink(query) });
					break;
			}
		}
	}
}

function checkAll(e){
	$(".checkboxOption").each(function(){
		this.checked = true;
	});
}


// Simple little timer class to help with optimizations
// function Timer() {
  // this.start = (new Date).getTime();
  // this.last = this.start;
// }
// Timer.prototype.log = function(id) {
  // var now = (new Date).getTime();
  // log(id + " total time " + (now - this.start) + " m/s, delta " + (now - this.last) + " m/s");
  // this.last = now;
// };

// /**
 // * Log call that prepends the LOG_SRC before delegating to the background page to simplify debugging
 // */
// function log() {
  // var args = Array.prototype.slice.call(arguments);
  // args.unshift(LOG_SRC);
  // bg.log.apply(bg, args);
// }
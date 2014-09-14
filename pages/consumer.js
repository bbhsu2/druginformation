//TODO: abstract this out

function focusSearchQuery(){
	$("#searchQuery").focus();
}

setTimeout(function() {
  focusSearchQuery();
}, 500);

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
	
	//TODO: change this 
	$(":button")[0].addEventListener('click', searchClick);
	
	$(".content").keyup(function(e) {
		if(e.keyCode == 13) {
			$(":button")[0].click();
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
	
	focusSearchQuery();
}

function checkAll(e){
	$(".checkboxOption").each(function(){
		this.checked = true;
	});
	focusSearchQuery();
}

//Begin page specific functions
function getWikipediaLink(query){
	return "http://en.wikipedia.org/wiki/Special:Search?search=" + query + "&go=Go";
}

function getMedlinePlusLink(query){
	return "http://vsearch.nlm.nih.gov/vivisimo/cgi-bin/query-meta?v%3Aproject=medlineplus&query=" + 
			query + 
			"&x=-1153&y=-113";
}

function getGoogleLink(query){
	return "https://www.google.com/#q=" + query;
}

function getMayoClinicLink(query){
	return "http://www.mayoclinic.org/search/search-results?q=" + query;
}

function getWebMDLink(query){
	return "http://www.webmd.com/search/search_results/default.aspx?query=" + query;
}

function getFDALink(query){
	return "http://google2.fda.gov/search?q=+" + 
			query + 
			"&client=FDAgov&site=FDAgov&lr=&" +
			"proxystylesheet=FDAgov" +
			"&requiredfields=-archive%3AYes&output=xml_no_dtd&getfields=*";
}

function getMHRALink(query){
	return "http://www.mhra.gov.uk/SearchHelp/GoogleSearch/index.htm?q=" + query;
}

function getTGALink(query){
	return "http://agencysearch.australia.gov.au/s/search.html?query=" + query + "&collection=agencies&profile=tga";
	//Therapeutic goods Administration
	//http://agencysearch.australia.gov.au/s/search.html?query=certolizumab+pegol&collection=agencies&profile=tga
}

function getISMPLink(query){
	return "http://www.ismp.org/searchresults.asp?q=" + query;
	//institute for safe medication practices
	//http://www.ismp.org/searchresults.asp?q=epinephrine
}

function searchClick(e){
	var query = document.getElementById("searchQuery").value;
	var boxes = $(":checkbox");
	
	for(var i = 0; i < boxes.length; i++){
		var string = "";
		if(boxes[i].checked){
			switch(i){
				case 0:
					chrome.tabs.create({url: getFDALink(query)});
					break;
				case 1:
					chrome.tabs.create({url : getGoogleLink(query)});
					break;
				case 2: 
					chrome.tabs.create({url : getISMPLink(query)});
					break;
				case 3:
					chrome.tabs.create({url: getMayoClinicLink(query) });
					break;
				case 4:
					chrome.tabs.create({ url: getMedlinePlusLink(query) });
					break;
				case 5:
					chrome.tabs.create({ url: getMHRALink(query) });
					break;
				case 6:
					chrome.tabs.create({ url: getTGALink(query) });
					break;
				case 7:
					chrome.tabs.create({ url: getWebMDLink(query) });
					break;
				case 8:
					chrome.tabs.create({url: getWikipediaLink(query)});
					break;
			}
		}
	}
}
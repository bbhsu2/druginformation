document.addEventListener('DOMContentLoaded', function () {
	$(":button")[0].addEventListener('click', searchClick);
})

function getPubMedLink(query){
	return "http://www.ncbi.nlm.nih.gov/pubmed/?term=" + query;
}

function getDailyMedLink(query){
	return "https://dailymed.nlm.nih.gov/dailymed/search.cfm?startswith=" +
		   query +
		   "&x=0&y=0";
}

function getDrugsAtFDALink(query){
	return "http://www.accessdata.fda.gov/scripts/cder/drugsatfda/index.cfm?" +
		   "fuseaction=Search.Overview&" +
		   "DrugName=" + query + "&" +
		   "CFID=34297116&CFTOKEN=9b96930ccafcc38b-DB16D54C-B813-5F5E-A0A75D1DA67934C5";
}

function getGoogleLink(query){
	return "https://www.google.com/#q=" + query;
}

function searchClick(){
	var query = document.getElementById("searchQuery").value;
	var boxes = $(":checkbox");
	
	for(var i = 0; i < boxes.length; i++){
		var string = "";
		if(boxes[i].checked){
			switch(i){
				case 0:
					chrome.tabs.create({ url: getDailyMedLink(query) });
					break;
				case 1:
					chrome.tabs.create({ url: getDrugsAtFDALink(query) });
					break;
				case 2:
					chrome.tabs.create({ url: getGoogleLink(query) });
					break;
				case 3:
					chrome.tabs.create({ url: getPubMedLink(query) });
					break;
			}
		}
	}
}
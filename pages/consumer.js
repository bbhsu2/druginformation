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
	
	focusSearchQuery();
}

function checkAll(e){
	$(".checkboxOption").each(function(){
		this.checked = true;
	});
}

//Begin page specific functions

function getWikipediaLink(query){
	return "http://en.wikipedia.org/wiki/Special:Search?search=" +metformin + "s&go=Go";
}

function getMedlinePlusLink(query){
	return "http://vsearch.nlm.nih.gov/vivisimo/cgi-bin/query-meta?v%3Aproject=medlineplus&query=" + 
			metformin + 
			"&x=-1153&y=-113";
}

function getGoogleLink(query){
	return "https://www.google.com/#q=" + query;
}

function getMayoClinicLink(query){
	return "http://www.mayoclinic.org/search/search-results?q=" + query;
}

function getWebMDLink(query){
	return "http://www.webmd.com/search/search_results/default.aspx?query=" + metformin;
}


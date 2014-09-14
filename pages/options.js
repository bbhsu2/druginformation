function saveOptions(){
	var isProvider = true;
	var consumerRadio = $(":input")[0];
	var providerRadio = $(":input")[1];
	
	if(consumerRadio.checked){
		isProvider = false;
	}
	
	chrome.storage.sync.set({
		isProvider: isProvider
	}, function(){
		$('.alert').show();
		setTimeout(function(){
			$('.alert').hide();
		}, 1500);
	});
}

function restoreOptions(){
	chrome.storage.sync.get({
		isProvider: true
	}, function(items){
		if(items.isProvider){
			$(":input")[1].checked = true;
		} else {
			$(":input")[0].checked = true;
		}
	});
}

document.addEventListener('DOMContentLoaded', function(){
	$(".alert").hide();
	
	restoreOptions();
	
	$(":button")[0].addEventListener('click', function(){
		chrome.tabs.create({url: "pages/about.html" });
	});
	
	$(":button")[1].addEventListener('click', saveOptions);	
});



document.addEventListener('DOMContentLoaded', function(){
	chrome.storage.sync.get({
		isProvider: true
	}, function(items){
		if(!items.isProvider){
			window.location = "consumer.html";
		} else{
			window.location = "provider.html";
		}
	});
});


$(function () {

	init();

	$('input[name="save"]').click(function(e) {
		var entity = {};

		entity = {
			regex: $('input[name="regex"]').val(),
			replace: $('input[name="replace"]').val(),
			scheme: $('input[name="scheme"]').val()
		};

		chrome.storage.sync.set(entity, function() {
			alert('保存しました');
		});
	});

	$('input[name="reset"]').click(function(e) {
		init();

		alert('リセットしました');
	});

	$('input[name="default"]').click(function(e) {
		chrome.storage.sync.remove(['regex', 'replace', 'scheme'], data => {
		});

		init();

		alert('デフォルトに戻しました');
	});


});

// Init - Loading
function init(){

	chrome.storage.sync.get(defaults, function(data) {
		if(data['regex'])
			$('input[name="regex"]').val(data['regex']);

		if(data['replace'])
			$('input[name="replace"]').val(data['replace']);

		if(data['scheme'])
			$('input[name="scheme"]').val(data['scheme']);
	});
}


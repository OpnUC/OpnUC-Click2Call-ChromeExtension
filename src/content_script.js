var entity = {};
var elements = document.getElementsByTagName('body')[0];

chrome.storage.sync.get(defaults, function(data) {
	entity = data;

	if(!entity.regex || !entity.replace || !entity.scheme)
		return;

	var validNodes = getNodes(elements);
	replaceNodes(validNodes);
});

function replaceNodes(nodes) {

	var regex = new RegExp(entity.regex, 'g');

	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		var newVal = node.nodeValue;

		newVal = newVal.replace(regex, '<a href="' + entity.scheme + '://' + entity.replace + '\">' + '$&' + '</a>');

		if (newVal !== node.nodeValue) {
			var wrapper = document.createElement('span');
			wrapper.innerHTML = newVal;
			var parent = node.parentNode;
			parent.insertBefore(wrapper, node);
			parent.removeChild(node);
		}
	}
}

function getNodes(node) {

	var textNodes = [];
	var queue = [node];
	var regex = new RegExp(entity.regex, 'g');

	while (queue.length > 0) {
		var childNode = queue.shift();

		if (typeof childNode === 'undefined')
			continue;

		var parent = childNode.parentElement;

		if (typeof parent != 'undefined' && childNode.nodeType === 3 && parent.tagName !== 'A' && parent.tagName !== 'TEXTAREA' && childNode.nodeValue.match(regex)) {
			textNodes.push(childNode);
		} else {
			for (var i = 0; i < childNode.childNodes.length; i++) {
				queue.push(childNode.childNodes[i]);
			}
		}
	}

	return textNodes;

}
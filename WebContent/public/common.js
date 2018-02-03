function CreateElement(elementName, idName) {
	var element = document.createElement(elementName);
	element.setAttribute('id', idName);
	return element;
}

function AddElement(parent, child) {
	parent.appendChild(child);
}

function DeleteElement(parent, child) {
	parent.removeChild(child);
}

function CreateTextNode(text) {
	var element = document.createTextNode(text);
	return element;
}



function showInput() {
    document.getElementById('display').innerHTML = 
                document.getElementById("user_input").value;
}

// Gets the text from the provided url
function getResultFrom(url) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

// Shows result on the display
function showInDisplay(value) {
	raw_data = getResultFrom('/test');
	source = JSON.parse(raw_data)

	var new_source = document.createElement("div");
	var new_source_title = document.createTextNode(source[0].title);
	new_source.className = 'ui segment';
	new_source.appendChild(new_source_title);

	document.getElementById('results').appendChild(new_source);

}
function loadPieChartForm() {
	// Clear the page
	clearPage();

	// Add the title field
	setTextInElement("title", "<label>Title: </label><input type='text' name='titleInput'></input>");

	// Set the graph type
	setTextInElement("graph-type", "Graph Type: Pie");

	// Add the unit feild
	setTextInElement("unit", "<label>Unit: </label><input type='text' name='unitInput'></input>");

	// Add the data fields
	setTextInElement("data", "<h3>Readings:</h3>", true);
	addPieField();

	// Set the button to add data
	var button = document.getElementById("add-new-data-reading");
	button.innerHTML = "Add new Pie slice";
	button.onclick = function() { addPieField() };
	button.style.visibility = "visible";
}

function addPieField() {
	var pieField = [
		"<h5>",
			"<label>Field name: </label><input type='text' name='reading-name'></input>",
			"<label>Value: </label><input type='text' name='reading-value' onkeypress='return isNumber(event)'></input>",
			"<label>Colour: </label><input type='text' name='reading-colour' onkeypress='return isNumber(event)'></input>",
		"</h5>"].join("\n");

	setTextInElement("data", pieField, true);
}

function clearPage() {
	setTextInElement("title", "");
	setTextInElement("graph-type", "");
	setTextInElement("unit", "");
	setTextInElement("data", "");
	var button = document.getElementById("add-new-data-reading");	
	button.style.visibility = "hidden";
}

function setTextInElement(id, text, keepOldData) {
	var element = document.getElementById(id);

	if (keepOldData) {
		text = element.innerHTML + text;
	}

	element.innerHTML = text;
}

function isNumber(evt) {
	// Get the value of the key pressed
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keycode;

	// If the key pressed is not a number return false
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}

	return true;
}

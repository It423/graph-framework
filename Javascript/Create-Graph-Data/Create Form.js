
function loadPieChartForm() {
	// Clear the page
	clearPage();

	// Add the title field
	setTextInElement("title", "<label>Title: </label><input type='text' name='titleInput' style='width: 50%'></input>");

	// Set the graph type
	setTextInElement("graph-type", "<label>Graph type: </label><input type='text' name='graphType' value='Pie' readonly></input>");

	// Add the unit feild
	setTextInElement("unit", "<label>Unit: </label><input type='text' name='unitInput' style='width: 50%'></input>");

	// Add the data fields
	setTextInElement("data", "<h3>Readings:</h3>", true);
	addPieField();

	// Set the button to add data
	var button = document.getElementById("add-new-data-reading");
	button.innerHTML = "Add new Pie slice";
	button.onclick = function() { addPieField() };
	button.style.visibility = "visible";

	// Make the validate button visable
	button = document.getElementById("validate-form");
	button.style.visibility = "visible";
}

function addPieField() {
	var idNum = ($("form").serializeArray().length - 3) / 3;

	// The input data
	var pieField = [
			"<h5 class='reading-pie' id='reading-name-" +idNum.toString() + "'><label>Field name: </label><input type='text' name='reading-name'></input></h5>",
			"<h5 class='reading-pie' id='reading-value-" +idNum.toString() + "'><label>Value: </label><input type='text' name='reading-value' onkeypress='return isNumber(event)'></input></h5>",
			"<h5 class='reading-pie' id='reading-colour-" +idNum.toString() + "'><label>Colour: </label><input type='text' name='reading-colour' onkeypress='return isNumber(event)'></input></h5>",
			"<br/>",
			"<br/>"].join("\n");

	setTextInElement("data", pieField, true);
}

function clearPage() {
	// Clear elements
	setTextInElement("title", "");
	setTextInElement("graph-type", "");
	setTextInElement("unit", "");
	setTextInElement("data", "");
	var button = document.getElementById("add-new-data-reading");	
	button.style.visibility = "hidden";
	button = document.getElementById("validate-form");
	button.style.visibility = "hidden";
}

function setTextInElement(id, text, data) {
	// Get the element
	var element = document.getElementById(id);

	if (data) {
		// Add the text
		$(element).append(text);
	} else {
		// Set the text
		element.innerHTML = text;
	}
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

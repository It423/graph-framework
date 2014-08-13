
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
	setTextInElement("data", "<h3>Readings:</h3>\n", true);
	addPieField();

	// Set the button to add data
	var button = document.getElementById("add-new-data-reading");
	button.innerHTML = "Add new Pie slice";
	button.onclick = function() { addPieField() };
	button.style.visibility = "visible";

	button = document.getElementById("remove-data-reading");
	button.innerHTML = "Remove Pie slice";
	button.onclick = function() { removePieField() };
	button.style.visibility = "visible";

	// Make the validate button visable
	button = document.getElementById("validate-form");
	button.style.visibility = "visible";
}

function addPieField() {
	var idNum = ($("form").serializeArray().length - 3) / 3;

	// The input data
	var pieField = [
			"<h5 class='reading-pie' id='reading-name-" + idNum.toString() + "'><label>Segment name: </label><input type='text' name='reading-name'></input></h5>",
			"<h5 class='reading-pie' id='reading-value-" + idNum.toString() + "'><label>Value: </label><input type='text' name='reading-value' onkeypress='return isNumber(event)'></input></h5>",
			"<h5 class='reading-pie' id='reading-colour-" + idNum.toString() + "'><label>Colour: </label><select name='reading-colour'>",
			getColourOptions(),
			"</select></h5>",
			"<br id='br-1-" + idNum.toString() + "'/>",
			"<br id='br-2-" + idNum.toString() + "'/>\n"].join("\n");

	setTextInElement("data", pieField, true);
}

function removePieField() {
	// If there is not enough elements to remove, don't do anything
	if (document.getElementById("data").innerHTML.split("</h5>").length <= 4) {
		return false;
	} else {
		// Get the id number to remove the elements
		var idNum = (($("form").serializeArray().length - 3) / 3) - 1;

		// Remove the elements and the break
		document.getElementById("reading-name-" + idNum.toString()).remove();
		document.getElementById("reading-value-" + idNum.toString()).remove();
		document.getElementById("reading-colour-" + idNum.toString()).remove();
		document.getElementById("br-1-" + idNum.toString()).remove();
		document.getElementById("br-2-" + idNum.toString()).remove();
	}
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

function getColourOptions() {
	var options = [
	"<option value=''></option>",
	"<option value='Blue'>Blue</option>",
	"<option value='Red'>Red</option>",
	"<option value='Green'>Green</option>",
	"<option value='Purple'>Purple</option>",
	"<option value='Light Blue'>Light Blue</option>",
	"<option value='Orange'>Orange</option>",
	"<option value='Brown'>Brown</option>",
	"<option value='Dark Purple'>Dark Purple</option>",
	"<option value='Light Red'>Light Red</option>",
	"<option value='Dark Blue'>Dark Blue</option>",
	"<option value='Pink'>Pink</option>",
	"<option value='Amber'>Amber</option>",
	"<option value='Light Yellow'>Light Yellow</option>",
	"<option value='Grey'>Grey</option>",
	"<option value='Black'>Black</option>",
	"<option value='White'>White</option>",
	"<option value='Random'>Random</option>",
	].join("\n");

	return options;
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

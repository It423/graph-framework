function loadBarGraphForm() {
	// Clear the page
	clearPage();

	// Add the title and set the graph type
	setTitle("Bar");

	// Add the axis label fields
	setTextInElement("x-label", "<label>X axis label: </label><input type='text' name='xAxisInput' style='width: 50%'>");
	setTextInElement("y-label", "<label>Y axis label: </label><input type='text' name='yAxisInput' style='width: 50%'>");

	// Add the reading info
	setTextInElement("readings-info", "<h3 id='readings-label'>Readings:</h3>");
	addBarDataSet();

	// Add the field info
	setTextInElement("data", "<h3 id='fields-label'>Fields:</h3>");
	addBarField();

	// Set the button to add and remove data
	var button = document.getElementById("add-new-data-piece");
	button.innerHTML = "Add new Bar field";
	button.onclick = function() { addBarField() };
	button.style.visibility = "visible";

	button = document.getElementById("remove-data-piece");
	button.innerHTML = "Remove Bar field";
	button.onclick = function() { removeBarField() };
	button.style.visibility = "visible";

	button = document.getElementById("add-new-reading");
	button.innerHTML = "Add a new reading";
	button.onclick = function() { addBarDataSet() };
	button.style.display = "inline";

	button = document.getElementById("remove-reading");
	button.innerHTML = "Remove a reading";
	button.onclick = function() { removeBarDataSet() };
	button.style.display = "inline";
}

function addBarDataSet() {
	// Get the id number
	var idNum = howManyOfClass("reading-set");

	// Get the string of html to put in the reading-info div
	var string = [
			"<div class='reading-set' id='reading-set-" + idNum.toString() + "'>",
				"<h5 class='readings' id='reading-info-name-" + idNum.toString() + "'><label>Name: </label><input type='text' name='reading-name-" + idNum.toString() + "'></h5>",
				"<h5 class='readings' id='reading-info-colour-" + idNum.toString() + "'><label>Colour: </label><select name='reading-colour-" + idNum.toString() + "'>",
					getColourOptions(),
					"</select>",
				"</h5>",
				"<br/>",
				"<br/>",
			"</div>"].join("\n");

	setTextInElement("readings-info", string, true);

	for (var i = 0; i < howManyOfClass("field-set"); i++) {
		setTextInElement("field-set-" + i.toString(), "<h5 class='recording' id='recording-" + i.toString() + "-" + idNum.toString() + "'><label>Recording " + (idNum + 1).toString() + ": </label><input type='text' name='recording-input-" + i.toString() + "-" + idNum.toString() + "' onkeypress='return isNumber(event)'></h5>", true);
	}
}

function removeBarDataSet() {
	// If there is only one reading set, don't remove it
	if (howManyOfClass("reading-set") <= 1) {
		return false;
	} else {
		// Get the id number
		var idNum = howManyOfClass("reading-set") - 1;

		// Remove the elements for name and colour input
		document.getElementById("reading-set-" + idNum.toString()).remove();

		// Remove the recording
		for (var i = 0; i < howManyOfClass("field-set"); i++) {
			document.getElementById("recording-" + i.toString() + "-" + idNum.toString()).remove();
		}
	}
}

function addBarField() {
	// Get the id number
	var idNum = howManyOfClass("field-set");

	// Get the string of recordings
	var recordingsArray = [];
	for (var i = 0; i < howManyOfClass("readings") / 2; i++) {
		recordingsArray.push("<h5 class='recording' id='recording-" + idNum.toString() + "-" + i.toString() + "'><label>Reading " + (i + 1).toString() + ": </label><input type='text' name='recording-input-" + idNum.toString() + "-" + i.toString() + "' onkeypress='return isNumber(event)'></h5>")
	}

	// Turn the recordings array into a string
	var recordings = recordingsArray.join("\n");


	var string = [
			"<div class='field-set' id='field-set-" + idNum.toString() + "'>",
			"<h5 class='field' id='field-name-" + idNum.toString() + "'><label>Field name " + (idNum + 1).toString() + ": </label><input type='text' name='field-name-" + idNum.toString() + "'></h5>",
			recordings,
			"</div>"].join("\n");

	setTextInElement("data", string, true);
}

function removeBarField() {
	// If there is only one field set don't do anything
	if (howManyOfClass("field-set") <= 1) {
		return false;
	} else{
		// Get the id number
		var idNum = howManyOfClass("field-set") - 1;

		// Remove the element
		document.getElementById("field-set-" + idNum.toString()).remove();
	}
}

function loadPieChartForm() {
	// Clear the page
	clearPage();

	// Add the title and set the graph type
	setTitle("Pie")

	// Add the unit field
	setTextInElement("unit", "<label>Unit: </label><input type='text' name='unitInput' style='width: 50%'>");
	document.getElementById("unit").style.display = "inline";

	// Add the data fields
	setTextInElement("data", "<h3 id='readings-label'>Readings:</h3>\n", true);
	addPieField();

	// Set the button to add and remove data
	var button = document.getElementById("add-new-data-piece");
	button.innerHTML = "Add new Pie slice";
	button.onclick = function() { addPieField() };
	button.style.visibility = "visible";

	button = document.getElementById("remove-data-piece");
	button.innerHTML = "Remove Pie slice";
	button.onclick = function() { removePieField() };
	button.style.visibility = "visible";
}

function addPieField() {
	var idNum = howManyOfClass("slice");

	// The input data
	var pieField = [
			"<div class='slice' id='slice-" + idNum.toString() + "'>",
				"<h5 class='reading-pie' id='reading-name-" + idNum.toString() + "'><label>Segment name: </label><input type='text' name='reading-name'></h5>",
				"<h5 class='reading-pie' id='reading-value-" + idNum.toString() + "'><label>Value: </label><input type='text' name='reading-value' onkeypress='return isNumber(event)'></h5>",
				"<h5 class='reading-pie' id='reading-colour-" + idNum.toString() + "'><label>Colour: </label><select name='reading-colour'>",
					getColourOptions(),
				"	</select>",
				"</h5>",
				"<br/>",
				"<br/>",
			"</div>"].join("\n");

	setTextInElement("data", pieField, true);
}

function removePieField() {
	// If there is not enough elements to remove, don't do anything
	if (howManyOfClass("slice") <= 1) {
		return false;
	} else {
		// Get the id number to remove the elements
		var idNum = howManyOfClass("slice") - 1;

		// Remove the elements and the break
		document.getElementById("slice-" + idNum.toString()).remove();
	}
}

function clearPage() {
	// Clear elements
	setTextInElement("error", "");
	setTextInElement("title", "");
	setTextInElement("graph-type", "");
	setTextInElement("x-label", "");
	setTextInElement("y-label", "");
	setTextInElement("readings-info", "");
	setTextInElement("unit", "");
	setTextInElement("data", "");
	document.getElementById("unit").style.display = "none";
	document.getElementById("add-new-data-piece").style.visibility = "hidden";
	document.getElementById("remove-data-piece").style.visibility = "hidden";
	document.getElementById("add-new-reading").style.display = "none";
	document.getElementById("remove-reading").style.display = "none";
	document.getElementById("validate-form").style.visibility = "hidden";
}

function setTitle(graphType) {
	// Add the title field
	setTextInElement("title", "<label>Title: </label><input type='text' name='titleInput' style='width: 50%'>");

	// Set the graph type
	setTextInElement("graph-type", "<label>Graph type: </label><input type='text' name='graphType' value='" + graphType + "' style='width: 75px' readonly>");

	// Make the validate button visable
	button = document.getElementById("validate-form");
	button.style.visibility = "visible";
}

function setTextInElement(id, text, add) {
	// Get the element
	var element = document.getElementById(id);

	if (add) {
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

function howManyOfClass(className) {
	var count = 0;

    var elems = document.getElementsByTagName('*');
    for (var i = 0; i < elems.length; i++) {
        if ((' ' + elems[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
            count++;
        }
    }

    return count;
}

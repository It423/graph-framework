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
	var idNum = howManyOfClass("bar-reading-set");

	// Get the string of html to put in the reading-info div
	var string = [
			"<div class='bar-reading-set' id='reading-set-" + idNum.toString() + "'>",
				"<h5 class='bar-readings' id='reading-info-name-" + idNum.toString() + "'><label>Name: </label><input type='text' name='reading-name-" + idNum.toString() + "'></h5>",
				"<h5 class='bar-readings' id='reading-info-colour-" + idNum.toString() + "'><label>Colour: </label><select name='reading-colour-" + idNum.toString() + "'>",
					getColourOptions(),
					"</select>",
				"</h5>",
				"<br/>",
				"<br/>",
			"</div>"].join("\n");

	setTextInElement("readings-info", string, true);

	for (var i = 0; i < howManyOfClass("bar-field-set"); i++) {
		setTextInElement("field-set-" + i.toString() + "-recordings", "<h5 class='bar-recording' id='recording-" + i.toString() + "-" + idNum.toString() + "'><label>Recording " + (idNum + 1).toString() + ": </label><input type='text' name='recording-input-" + i.toString() + "-" + idNum.toString() + "' onkeypress='return isNumber(event)'></h5>", true);
	}
}

function removeBarDataSet() {
	// If there is only one reading set, don't remove it
	if (howManyOfClass("bar-reading-set") <= 1) {
		return false;
	} else {
		// Get the id number
		var idNum = howManyOfClass("bar-reading-set") - 1;

		// Remove the elements for name and colour input
		document.getElementById("reading-set-" + idNum.toString()).remove();

		// Remove the recording
		for (var i = 0; i < howManyOfClass("bar-field-set"); i++) {
			document.getElementById("recording-" + i.toString() + "-" + idNum.toString()).remove();
		}
	}
}

function addBarField() {
	// Get the id number
	var idNum = howManyOfClass("bar-field-set");

	// Get the string of recordings
	var recordingsArray = [];
	recordingsArray.push("<div id='field-set-" + idNum.toString() + "-recordings'>");
	for (var i = 0; i < howManyOfClass("bar-readings") / 2; i++) {
		recordingsArray.push("<h5 class='bar-recording' id='recording-" + idNum.toString() + "-" + i.toString() + "'><label>Reading " + (i + 1).toString() + ": </label><input type='text' name='recording-input-" + idNum.toString() + "-" + i.toString() + "'></h5>")
	}
	recordingsArray.push("</div>");

	// Turn the recordings array into a string
	var recordings = recordingsArray.join("\n");


	var string = [
			"<div class='bar-field-set' id='field-set-" + idNum.toString() + "'>",
				"<img id='collapse-field-set-" + idNum.toString() + "' src='Images\\Collapsed-Elements.png'></img>",
				"<h5 class='bar-field' id='field-name-" + idNum.toString() + "' style='display: inline'><label>Field name " + (idNum + 1).toString() + ": </label><input type='text' name='field-name-" + idNum.toString() + "'></h5>",
				recordings,
			"</div>"].join("\n");

	setTextInElement("data", string, true);

	// Set the button's on click function
	document.getElementById("collapse-field-set-" + idNum.toString()).onclick = function() { collapseDiv("field-set-" + idNum.toString() + "-recordings", "collapse-field-set-" + idNum.toString()) };
}

function removeBarField() {
	// If there is only one field set don't do anything
	if (howManyOfClass("bar-field-set") <= 1) {
		return false;
	} else{
		// Get the id number
		var idNum = howManyOfClass("bar-field-set") - 1;

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
				"<h5 class='reading-pie' id='reading-value-" + idNum.toString() + "'><label>Value: </label><input type='text' name='reading-value'></h5>",
				"<h5 class='reading-pie' id='reading-colour-" + idNum.toString() + "'><label>Colour: </label><select name='reading-colour'>",
					getColourOptions(),
					"</select>",
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

function loadLineGraphForm() {
	// Clear the page 
	clearPage();

	// Set the title and graph type
	setTitle("Line");

	// Set the radio buttons
	setTextInElement("line-graph-type", [ "Type of line graph:", "<br/>", "<br/>", "<label>Normal </label><input type='radio' id='standerd-line-graph' name='typeOfLine' value='seperate' checked>", "<br/>", "<label>Cumulative </label><input type='radio' id='cumulative-line-graph' name='typeOfLine' value='cumulative' onclick='convertToCumulative()'>" ].join("\n"));

	// Set the axis labels
	setTextInElement("x-label", "<label>X axis label: </label><input type='text' name='xAxisInput' style='width: 50%'>");
	setTextInElement("y-label", "<label>Y axis label: </label><input type='text' name='yAxisInput' style='width: 50%'>");

	// Add a reading set 
	addLineReadingSet();

	// Add the buttons to remove/add reading sets
	var button = document.getElementById("add-new-data-piece");
	button.innerHTML = "Add new reading set";
	button.onclick = function() { addLineReadingSet() };
	button.style.visibility = "visible";

	button = document.getElementById("remove-data-piece");
	button.innerHTML = "Remove reading set";
	button.onclick = function() { removeLineReadingSet() };
	button.style.visibility = "visible";
}

function convertToCumulative() {
	// Make all the readings have the same amount of recording
	var recordingCount = countRecordingsInReadingSet(0);
	var readingCount = howManyOfClass("line-reading-set");

	// Work through every reading set
	for (var i = 1; i < readingCount; i++) {
		// Add or remove a recording until there is an equal amount in the first reading set
		do {
			if (countRecordingsInReadingSet(i) < recordingCount) {
				addRecording(i);
			} else if (countRecordingsInReadingSet(i) > recordingCount) {
				removeRecording(i);
			}
		} while (countRecordingsInReadingSet(i) != recordingCount);
	}

	// Make all the x recordings the same 
	for (var i = 0; i < recordingCount; i++) {
		for (var j = 1; j < readingCount; j++) {
			document.getElementById("recording-" + j.toString() + "-" + i.toString() + "-x").value = document.getElementById("recording-0-" + i.toString() + "-x").value;
		}
	}
}

function addLineReadingSet() {
	// Get the id number of the reading set
	var idNum = howManyOfClass("line-reading-set");

	// What to put in the data element
	var string = [
		"<div class='line-reading-set' id='reading-set-" + idNum.toString() + "'>",
			"<img id='collapse-reading-set-" + idNum.toString() + "' src='Images\\Collapsed-Elements.png'></img>",
			"<h3 class='line-reading-label' id='line-reading-label-" + idNum.toString() + "'>Reading set " + (idNum + 1).toString() + ":</h3>",
			"<br/>",
			"<br/>",
			"<div class='line-reading-container' id='reading-container-" + idNum.toString() + "'>",
				"<img id='collapse-recording-set-" + idNum.toString() + "' src='Images\\Collapsed-Elements.png'></img>",
				"<h5 class='line-reading-name' id='line-reading-name-" + idNum.toString() + "'><label>Name: </label><input type='text' name='readingName'></h5>",
				"<h5 class='line-reading-colour' id='line-reading-colour-" + idNum.toString() + "'><label>Colour: </label><select name='readingColour'>",
					getColourOptions(),
					"</select>",
				"</h5>",
				"<br/>",
				"<div class='recordings-container' id='recording-container-" + idNum.toString() + "'></div>",
				"<br/>",
				"<div class='center-wrapper'>",
					"<button type='button' id='add-recording-to-reading-" + idNum.toString() + "' onclick='addRecording(" + idNum.toString() + ")'>Add Recording</button>",
					"<button type='button' id='remove-recording-from-reading-" + idNum.toString() + "' onclick='removeRecording(" + idNum.toString() + ")'>Remove Recording</button>",
				"</div>",
			"</div>",
			"<br/>"].join("\n");

	// Add the string to the data element
	setTextInElement("data", string, true);

	// Set the button's on click function to collapse the reading
	document.getElementById("collapse-reading-set-" + idNum.toString()).onclick = function() { collapseDiv("reading-container-" + idNum.toString(), "collapse-reading-set-" + idNum.toString()) };
	document.getElementById("collapse-recording-set-" + idNum.toString()).onclick = function() { collapseDiv("recording-container-" + idNum.toString(), "collapse-recording-set-" + idNum.toString()) };

	// Add a recording into the reading
	addRecording(idNum);

	// Check it is cumulative data
	if (document.getElementById("cumulative-line-graph").checked) {
		// Keep adding recordings until the new reading has an equal amount of recordings to the rest of the sets of data
		while (countRecordingsInReadingSet(idNum) != countRecordingsInReadingSet(0)) {
			addRecording(idNum);
		}
	}
}

function removeLineReadingSet() {
	if (howManyOfClass("line-reading-set") <= 1) {
		return false;
	} else {
		// Get the id number of the last reading set
		var idNum = howManyOfClass("line-reading-set") - 1;

		// Remove the last reading set
		document.getElementById("reading-set-" + idNum.toString()).remove();
	}
}

function addRecording(readingIDNum, dontAddToOtherReadings) {
	// Get the element number
	var recordingNum = countRecordingsInReadingSet(readingIDNum);

	// The input to be added
	var string = [
		"<div class='line-recording' id='recording-" + readingIDNum.toString() + "-" + recordingNum.toString() + "'>",
			"<h5 class='line-x-value' id='recording-" + readingIDNum.toString() + "-" + recordingNum.toString() + "-x-label'><label>X value " + (recordingNum + 1).toString() + ": </label><input type='text' name='recordingXInput' id='recording-" + readingIDNum.toString() + "-" + recordingNum.toString() + "-x' onchange='copyXRecordingIfCumulative(" + readingIDNum.toString() + ", " + recordingNum.toString() + ")'></h5>",
			"<h5 class='line-y-value' id='recording-" + readingIDNum.toString() + "-" + recordingNum.toString() + "-y-label'><label>Y value " + (recordingNum + 1).toString() + ": </label><input type='text' name='recordingYInput' id='recording-" + readingIDNum.toString() + "-" + recordingNum.toString() + "-y'></h5>",
		"</h5>"].join("\n");

	// Add the recording to the recording set
	setTextInElement("recording-container-" + readingIDNum.toString(), string, true);

	// If it is cumulative data, add a recording to every other reading set
	if (document.getElementById("cumulative-line-graph").checked && dontAddToOtherReadings != true) {
		// Get how many elements are in the other readings
		var readingToCheck = 0;
		if (readingToCheck == readingIDNum) {
			if (howManyOfClass("line-reading-set") == 1) {
				return false;
			} else {
				readingToCheck++;
			}
		}

		// If there are more readings in the reading that just had an element added to, add one to the rest
		if (countRecordingsInReadingSet(readingIDNum) > countRecordingsInReadingSet(readingToCheck)) {
			// Itereate through each reading set
			for (var i = 0; i < howManyOfClass("line-reading-set"); i++) {
				// If this reading set is selected, skip it
				if (i == readingIDNum) {
					continue;
				} else {
					// Otherwise add a recording
					addRecording(i, true);
				}
			}
		} else {
			// Otherwise just make the recording equal to the reading to check's one
			document.getElementById("recording-" + readingIDNum.toString() + "-" + recordingNum.toString() + "-x").value = document.getElementById("recording-" + readingToCheck.toString() + "-" + recordingNum.toString() + "-x").value;
		}
	}
}

function removeRecording(readingIDNum) {
	// If there is one or less elements that can be removed, don't remove them
	if (countRecordingsInReadingSet(readingIDNum) <= 1) {
		return false;
	} else {
		// Get the recoding to remove
		var recordingNum = countRecordingsInReadingSet(readingIDNum) - 1;

		// Remove the recording
		document.getElementById("recording-" + readingIDNum.toString() + "-" + recordingNum.toString()).remove();

		// If it is cumulative data, remove a recording from all the other reading sets
		if (document.getElementById("cumulative-line-graph").checked) {
			for (var i = 0; i < howManyOfClass("line-reading-set"); i++) {
				// Skip if it is the current element
				if (i == readingIDNum) {
					continue;
				} else {
					// Remove the element for the selected reading set
					document.getElementById("recording-" + i.toString() + "-" + recordingNum.toString()).remove();
				}
			}
		}
	}
}

function countRecordingsInReadingSet(readingIDNum) {
	// Get the recording container set
	var readingSet = document.getElementById("recording-container-" + readingIDNum.toString())

	// Return how many div (recordings) are in the container
	return readingSet.getElementsByTagName("div").length;
}

function copyXRecordingIfCumulative(readingIDNum, recordingIDNum) {
	// Check it is cumulative data
	if (document.getElementById("cumulative-line-graph").checked) {
		// Work through each reading
		for (var i = 0; i < howManyOfClass("line-reading-set"); i++) {
			// If the reading is equal to the current on continue
			if (i == readingIDNum) {
				continue;
			} else {
				// Otherwise set the input to equal the one of the one just inputted
				document.getElementById("recording-" + i.toString() + "-" + recordingIDNum.toString() + "-x").value = document.getElementById("recording-" + readingIDNum.toString() + "-" + recordingIDNum.toString() + "-x").value;
			}
		}
	}
} 

function loadScatterGraphForm() {
	// Load the line graph from as they are the same
	loadLineGraphForm();

	// Reset the title to scatter graph
	setTitle("Scatter");

	// Disable the cumulative radio button
	setTextInElement("line-graph-type", [ "<div id='type-of-line-graph'>", "Type of line graph:", "<br/>", "<br/>", "<label>Normal </label><input type='radio' id='standerd-line-graph' name='typeOfLine' value='seperate' checked>", "<br/>", "<label>Cumulative </label><input type='radio' id='cumulative-line-graph' name='typeOfLine' value='cumulative' onclick='convertToCumulative()' disabled>", "</div>" ].join("\n"));

	// Hide the disfunctional radio buttons
	document.getElementById("type-of-line-graph").style.display = "none";
}

function clearPage() {
	// Reset all the colours
	resetColours();

	// Clear elements
	setTextInElement("error", "");
	setTextInElement("title", "");
	setTextInElement("graph-type", "");
	setTextInElement("line-graph-type", "");
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
	setTextInElement("graph-type", "<label>Graph type: </label><input type='text' name='graphType' value='" + graphType + "' style='width: 75px' readonly disable>");

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

function howManyOfClass(className) {
	var count = 0;

	// Get all the elements on the page
    var elms = document.getElementsByTagName('*');

    // Check which of them have the correct class name
    for (var i = 0; i < elms.length; i++) {
        if ((' ' + elms[i].className + ' ').indexOf(' ' + className + ' ') > -1) {
            count++;
        }
    }

    return count;
}

function resetColours() {
	// Get a list of elements on the page
    var elms = document.getElementsByTagName('*');

    // Set all the colours to black if they are elements that could turn red
    for (var i = 0; i < elms.length; i++) {
    	var tag = elms[i].tagName;

    	// If the tag of the element is h3 or h5 (elements where we change the font colour)
    	if (tag == "H5" || tag == "H3") {
    		elms[i].style.color = "rgb(0, 0, 0)";
	    }
    }
}

function collapseDiv(divID, imgID) {
	// Get the element
	var elm = document.getElementById(divID);

	// Reverse the visibility and set the image accordingly
	if (elm.style.display == "none") {
		elm.style.display = "inline";
		document.getElementById(imgID).src = "Images\\Collapsed-Elements.png";
	} else {
		elm.style.display = "none";
		document.getElementById(imgID).src = "Images\\Hidden-Elements.png";
	}
}

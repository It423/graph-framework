function validateForm() {
	// Turn the data from the form into a JSON object
	var formData = $("form").serializeArray();

	console.log(formData);

	// Set the error message to blank
	document.getElementById("error").innerHTML = "";

	// Check the title is filled in
	if (!validTitle(formData)) {
		return false;
	} else {
		// Get the graph type and validate it
		var graphType = formData[1].value.toLowerCase();

		if (graphType == "pie") {
			validPieForm(formData);
		} else if (graphType == "bar") {
			validBarForm(formData);
		}
	}
}

function validTitle(data) {
	// Set the colour to back
	document.getElementById("title").style.color = "rgb(0, 0, 0)";

	// Check the title has been filled in and if not turn it red and tell you what you did wrong
 	if (data[0].value == "") {
		document.getElementById("error").innerHTML = "Please enter a title!";
		document.getElementById("title").style.color = "rgb(255, 0, 0)";
		window.scrollTo(0, 0);
		return false;
	}

	return true;
}

function validAxisLabels(data) {
	// Check the x axis label is filled in
	document.getElementById("x-label").style.color = "rgb(0, 0, 0)";
	if (data[2].value == "") {
		document.getElementById("error").innerHTML = "Please enter a label for the x-axis!";
		document.getElementById("x-label").style.color = "rgb(255, 0, 0)";
		window.scrollTo(0, 0);
		return false;
	}

	// Check the y axis label is filled in
	document.getElementById("y-label").style.color = "rgb(0, 0, 0)";
	if (data[3].value == "") {
		document.getElementById("error").innerHTML = "Please enter a label for the y-axis!";
		document.getElementById("y-label").style.color = "rgb(255, 0, 0)";
		window.scrollTo(0, 0);
		return false;
	}

	return true;
}

function validBarForm(data) {
	// Check that the x and y labels has been filled in
	if (!validAxisLabels(data)) {
		return false;
	}

	// Get how many readings and fields there are
	var readingCount = howManyOfClass("bar-readings") / 2;
	var fieldCount = howManyOfClass("bar-field-set");

	// Check the readings are valid
	if (!validBarReadings(data, readingCount, fieldCount)) {
		return false;
	}

	// Check the fields are valid
	if (!validBarFields(data, readingCount, fieldCount)) {
		return false;
	}
}

function validBarReadings(data, readingCount, fieldCount) {
	// Set the readings label to black 
	document.getElementById("readings-label").style.color = "rgb(0, 0, 0)";

	// Check the readings have been filled in 
	for (var i = 4; i < 3 + readingCount * 2; i += 2) {
		// If it failed 
		var failed = false;

		// Set the colour of the elements to black (incase they were red before)
		document.getElementById("reading-info-name-" + ((i - 4) / 2).toString()).style.color = "rgb(0, 0, 0)";
		document.getElementById("reading-info-colour-" + ((i - 4) / 2).toString()).style.color = "rgb(0, 0, 0)";

		// Check the name is filled in
		if (data[i].value == "") {
			document.getElementById("error").innerHTML = "Please fill in data set " + (((i - 4) / 2) + 1).toString() + "!";
			document.getElementById("reading-info-name-" + ((i - 4) / 2).toString()).style.color = "rgb(255, 0, 0)";
			failed = true;
		}

		// Check the colour is filled in
		if (data[i + 1].value == "") {
			document.getElementById("error").innerHTML = "Please fill in data set " + (((i - 4) / 2) + 1).toString() + "!";
			document.getElementById("reading-info-colour-" + ((i - 4) / 2).toString()).style.color = "rgb(255, 0, 0)";
			failed = true;
		}

		// Exit if it failed on this reading set
		if (failed) {
			document.getElementById("readings-label").style.color = "rgb(255, 0, 0)";
			window.scrollTo(0, 0);
			return false;
		}
	}

	return true;
}

function validBarFields(data, readingCount, fieldCount) {
	// Set the fields label to black incase it was already red
	document.getElementById("fields-label").style.color = "rgb(0, 0, 0)";

	// Itterate over every field set
	for (var i = 4 + (readingCount * 2); i <= 4 + (fieldCount * (readingCount + 1)); i += 1 + readingCount) {
		// If it failed this loop
		var failed = false;

		// The field number
		var fieldNum = (i - 4 - (readingCount * 2)) / (1 + readingCount);

		// Check the field name has been filled in
		document.getElementById("field-name-" + fieldNum.toString()).style.color = "rgb(0, 0, 0)";
		if (data[i].value == "") {
			document.getElementById("error").innerHTML = "Please fill in field set " + (fieldNum + 1).toString() + "!";
			document.getElementById("field-name-" + fieldNum.toString()).style.color = "rgb(255, 0, 0)";
			failed = true;
		}

		for (var j = 1; j <= readingCount; j++) {
			// The id of the current element
			var readingNum = j - 1;

			// Check the field has been filled in
			document.getElementById("recording-" + fieldNum.toString() + "-" + readingNum.toString()).style.color = "rgb(0, 0	, 0)";
			if (data[i + j].value == "") {
				document.getElementById("error").innerHTML = "Please fill in field set " + (fieldNum + 1).toString() + "!";
				document.getElementById("recording-" + fieldNum.toString() + "-" + readingNum.toString()).style.color = "rgb(255, 0, 0)";
				failed = true;

				// If the element is hidden, click the button to show it again
				if (document.getElementById("field-set-" + fieldNum.toString() + "-recordings").style.display == "none") {
					// Get the button/image
					var elm = document.getElementById("collapse-field-set-" + fieldNum.toString());

					// Trigger the click
					elm.onclick.apply(elm);
				}
			}
		}

		// Exit if it failed on this field set
		if (failed) {
			document.getElementById("fields-label").style.color = "rgb(255, 0, 0)";
			window.scrollTo(0, 0);
			return false;
		}
	}

	return true;
}

function validPieForm(data) {
	// Check the unit has been filled in
	if (!validPieUnit(data)) {
		return false;
	}

	// Check the data is valid
	if (!validPieData(data)) {
		return false;
	}

	// If it didn't fail save the data
	savePieChart(data);	
}

function validPieUnit(data) {
	// Check that the unit has been filled in
	document.getElementById("unit").style.color = "rgb(0, 0, 0)";
	if (data[2].value == "") {
		document.getElementById("error").innerHTML = "Please enter a unit!";
		document.getElementById("unit").style.color = "rgb(255, 0, 0)";
		window.scrollTo(0, 0);
		return false;
	}

	return true;
}

function validPieData(data) {
	// Set the reading label to black incase it was already red
	document.getElementById("readings-label").style.color = "rgb(0, 0, 0)";

	// Check that every section of data has been filled in
	for (var i = 3; i < data.length; i += 3) {
		// Check wether the current data set failed
		var failed = false;

		// Check over the current data set
		for (var j = 0; j < 3; j++) {
			// Set colour to black
			document.getElementById(getPieElementID(i / 3 - 1, j)).style.color = "rgb(0, 0, 0)";

			// Check its filled in and make it red if it isn't
			if (data[i + j].value == "") {
				document.getElementById("error").innerHTML = "Please fill in data set " + (i / 3).toString() + "!";
				document.getElementById(getPieElementID(i / 3 - 1, j)).style.color = "rgb(255, 0, 0)";
				failed = true;
			}
		}

		// Exit if it failed
		if (failed) {
			document.getElementById("readings-label").style.color = "rgb(255, 0, 0)";
			window.scrollTo(0, 0);
			return false;
		}
	}

	return true;
}

function getPieElementID(endingNum, elementID) {
	switch (elementID) {
		case 0: return "reading-name-" + endingNum.toString();
		case 1: return "reading-value-" + endingNum.toString();
		case 2: return "reading-colour-" + endingNum.toString();
		default: return false;
	}
}

function validateForm() {
	// Turn the data from the form into a JSON object
	var formData = $("form").serializeArray();

	// Set the error message to blank
	document.getElementById("error").innerHTML = "";

	// Set the colour to back
	document.getElementById("title").style.color = "rgb(0, 0, 0)";

	// Check the title has been filled in and if not turn it red and tell you what you did wrong
 	if (formData[0].value == "") {
		document.getElementById("error").innerHTML = "Please enter a title!";
		document.getElementById("title").style.color = "rgb(255, 0, 0)";
		window.scrollTo(0, 0);
		return false;
	} else {
		// Get the graph type and validate it
		var graphType = formData[1].value.toLowerCase();

		if (graphType == "pie") {
			validPieForm(formData);
		}
	}
}

function validPieForm(data) {
	// Check that the unit has been filled in
	document.getElementById("unit").style.color = "rgb(0, 0, 0)";
	if (data[2].value == "") {
		document.getElementById("error").innerHTML = "Please enter a unit!";
		document.getElementById("unit").style.color = "rgb(255, 0, 0)";
		window.scrollTo(0, 0);
		return false;
	}

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
				document.getElementById("error").innerHTML = "Please fill in data set " + (i / 3).toString();
				document.getElementById(getPieElementID(i / 3 - 1, j)).style.color = "rgb(255, 0, 0)";
				failed = true;
			}
		}

		// Exit if it failed
		if (failed) {
			window.scrollTo(0, 0);
			return false;
		}
	}

	// If it didn't fail save the data
	savePieChart(data);	
}

function getPieElementID(endingNum, elementID) {
	switch (elementID) {
		case 0: return "reading-name-" + endingNum.toString();
		case 1: return "reading-value-" + endingNum.toString();
		case 2: return "reading-colour-" + endingNum.toString();
		default: return false;
	}
}

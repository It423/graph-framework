function saveBarGraph(data) {
	// Set up the json for the file
	var fileJSON = {
		"title": "",
		"graphType": "bar",
		"xLabel": "",
		"yLabel": "",
		"readingName": [],
		"readingColour": [],
		"data": []
	};

	// Push the axis labels and title
	fileJSON.title = data[0].value;
	fileJSON.xLabel = data[2].value;
	fileJSON.yLabel = data[3].value;

	// Get how many reading sets there are
	var readingCount = howManyOfClass("bar-reading-set");
	var fieldCount = howManyOfClass("bar-field-set");

	// Push the reading names and colours
	for (var i = 4; i < 3 + (readingCount * 2); i += 2) {
		fileJSON.readingName.push(data[i].value);
		fileJSON.readingColour.push(colourToInt(data[i + 1].value));
	}

	// Push the data
	for (var i = 4 + readingCount * 2; i < data.length; i += 1 + readingCount) {
		// The current data to be added to the data
		var currentData = {
			"field": "",
			"readings": []
		};

		// Add the field name
		currentData.field = data[i].value;

		// Add the readings
		for (var j = i + 1; j < i + 1 + readingCount; j++) {
			currentData.readings.push(parseInt(data[j].value));
		}

		// Add the current data to the data
		fileJSON.data.push(currentData);
	}

	saveFile(fileJSON);
}

function savePieChart(data) {
	// The array of each line in the .json file
	var fileJSON = { 
		"title": "",
		"graphType": "pie",
		"unit": "",
		"data": []
	}

	// Push all the elements into the text
	fileJSON.title = data[0].value;
	fileJSON.unit = data[2].value;

	// Push the graph data into the array
	for (var i = 3; i < data.length; i += 3) {
		var jsonReading = {
			"field": "",
			"count": 0,
			"colour": 0
		}

		jsonReading.field = data[i].value;
		jsonReading.count = parseInt(data[i + 1].value);
		jsonReading.colour = colourToInt(data[i + 2].value);

		fileJSON.data.push(jsonReading);
	}

	saveFile(fileJSON);
}

function saveLineGraph(data) {
	// Set up the json for the file
	var fileJSON = {
		"title": "",
		"graphType": "line",
		"lineType": "",
		"xLabel": "",
		"yLabel": "",
		"readings": []
	};

	// Add the title, axis labels and lineType
	fileJSON.title = data[0].value;
	fileJSON.lineType = data[2].value;
	fileJSON.xLabel = data[3].value;
	fileJSON.yLabel = data[4].value;

	// Add all the readings
	var readingIDNum = 0;
	for (var index = 5; index < data.length; index += 2 + (countRecordingsInReadingSet(readingIDNum) * 2), readingIDNum++) {
		fileJSON.readings.push(jsonOfLineReading(data, index, countRecordingsInReadingSet(readingIDNum)));
	}

	// Save the file
	saveFile(fileJSON);
}

function saveScatterGraph(data) {
	// Set up the json for the file
	var fileJSON = {
		"title": "",
		"graphType": "scatter",
		"xLabel": "",
		"yLabel": "",
		"readings": []
	};

	// Add the title, axis labels and lineType
	fileJSON.title = data[0].value;
	fileJSON.xLabel = data[2].value;
	fileJSON.yLabel = data[3].value;

	// Add all the readings
	var readingIDNum = 0;
	for (var index = 5; index < data.length; index += 2 + (countRecordingsInReadingSet(readingIDNum) * 2), readingIDNum++) {
		fileJSON.readings.push(jsonOfLineReading(data, index, countRecordingsInReadingSet(readingIDNum)));
	}

	// Save the file
	saveFile(fileJSON);
}

function jsonOfLineReading(data, indexOfName, amountOfRecordings) {
	// The obj of a reading
	returnObj = [
		{ "name": "", "colour": "" }
	];

	// Add the name and colour
	returnObj[0].name = data[indexOfName].value;
	returnObj[0].colour = colourToInt(data[indexOfName + 1].value);

	// Add all the recording
	for (var i = 0; i / 2 < amountOfRecordings; i += 2) {
		// The array to have the x and y values stored
		var addToReturnObj = [];

		// Add the x and y value
		addToReturnObj.push(parseInt(data[indexOfName + 2 + i].value));
		addToReturnObj.push(parseInt(data[indexOfName + 3 + i].value));

		// Add the stored x and y values to the reading set
		returnObj.push(addToReturnObj);
	}

	// Return the reading set
	return returnObj;
}

function saveFile(jsonData) {
	$.ajax({
		type: "POST",
		data: { "myData": JSON.stringify(jsonData) },
		url: "Javascript\\Create-Graph-Data\\Save.php",
		success: function(data) {
			alert("File Saved!");
		},
		error: function(e) {
			console.log(e.message);
		}
	});
}

function colourToInt(col) {
	// If it is already a number return the number
	if (!isNaN(col)) {
		return parseInt(col);
	} else {
		// Make the string lowercase
		var lCol = col.toLowerCase();

		// Check what number to return
		if (lCol == "blue") {
			return 0;
		} else if (lCol == "red") {
			return 1;
		} else if (lCol == "green") {
			return 2;
		} else if (lCol == "purple") {
			return 3;
		} else if (lCol == "light blue") {
			return 4;
		} else if (lCol == "orange") {
			return 5;
		} else if (lCol == "brown") {
			return 6;
		} else if (lCol == "dark purple") {
			return 7;
		} else if (lCol == "light red") {
			return 8;
		} else if (lCol == "dark blue") {
			return 9;
		} else if (lCol == "pink") {
			return 10;
		} else if (lCol == "amber") {
			return 11;
		} else if (lCol == "light yellow") {
			return 12;
		} else if (lCol == "grey") {
			return 13;
		} else if (lCol == "black") {
			return 14;
		} else if (lCol == "white") {
			return 15;
		} else if (lCol == "random") {
			return 16;
		} else {
			return null;
		}
	}
}

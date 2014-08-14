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

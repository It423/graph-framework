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
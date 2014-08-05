var canvas = document.getElementById("canvas");

// Load the JSON file
$.getJSON('.\\JSON-Graph-Data\\Eye Colour Bar Graph.json', function (data) {
	// Log all the infomation into the console
	console.log(data);

	// Runs the data as a bar graph if told to
	if (data.graphType.toLowerCase() == "bar") {
		barGraph(canvas, data);
	}	
});

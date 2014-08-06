var canvas = document.getElementById("canvas");

// Load the JSON file
$.getJSON('.\\JSON-Graph-Data\\Eye Colour Bar Graph.json', function (data) {
	// Display the title of the graph
	var title = document.getElementById("title");
	title.innerHTML = data.title;

	// Runs the data as a bar graph if told to
	if (data.graphType.toLowerCase() == "bar") {
		barGraph(canvas, data);
	}	
});

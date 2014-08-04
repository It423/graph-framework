function barGraph(cxt) {
	var graphData;

	// Load the JSON file here:
	$.getJSON('.\\JSON-Graph-Data\\Eye Colour Bar Graph.json', function (data) {
		graphData = data;
		console.log(data);
		alert(graphData.graphType);
	});

	/*// Assign the data
	graphData = { 
		"graphType": "bar",
		"xLabel": "Eye colour",
		"yLabel": "Count of people",
		"data": [
			{ "field": "Blue", "count": "20" },
			{ "field": "Green", "count": "18" },
			{ "field": "Brown", "count": "162" },
			{ "field": "Gray", "count": "3" }
		]
	};

	// Log the data in the console
	console.log(graphData);*/

	calculateScale(graphData);
}

function calculateScale(graphData) {

}
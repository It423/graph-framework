var cxt = getContext("canvas");

graphData = loadJSON();

if (graphData.graphType.toLowerCase() == "bar") {
	barGraph(cxt, graphData)
}

function getContext(canvasID) {
	var canvas = document.getElementById(canvasID);
	var context = canvas.getContext('2d');

	return context;
}

function loadJSON() {
	$.getJSON('.\\JSON-Graph-Data\\Eye Colour Bar Graph.json', function (data) {
		console.log(data);
		return data;
	});
}
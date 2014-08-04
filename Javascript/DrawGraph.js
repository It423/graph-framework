var cxt = getContext("canvas");

graphData = loadJSON();
console.log(graphData);

if (graphData.graphType.toLowerCase() == "bar") {
	barGraph(cxt, graphData);
}

function getContext(canvasID) {
	var canvas = document.getElementById(canvasID);
	var context = canvas.getContext('2d');

	return context;
}

function loadJSON() {
	var returnData;
	$.getJSON('.\\JSON-Graph-Data\\Eye Colour Bar Graph.json', function (jsonData) {
		returnData = jsonData;
	});

	return returnData;
}
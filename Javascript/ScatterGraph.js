function scatterGraph(canvas, graphData) {
	// Get the infomation about the scaleing, use the line scale code as they have the same structure
	var scaleInfo = calculateLineScale(canvas, graphData);

	// Plot the graph
	drawScatterGraph(canvas, scaleInfo, graphData);
}

function drawScatterGraph(canvas, scaleInfo, graphData) {
	// Use line code as the same structure
	drawLineAxis(canvas, scaleInfo, graphData);

	drawScatterData(canvas, scaleInfo, graphData);

	// Use line code as the same structure
	drawLineKey(canvas, graphData);
}

function drawScatterData(canvas, scaleInfo, graphData) {
	// Get the context
	var cxt = canvas.getContext("2d");

	// Create the array of points
	var points = [];

	// Get all the points
	for (var i = 0; i < graphData.readings.length; i++) {
		// The points for the current reading
		var currentPoints = [];

		// Get the points for the current reading
		for (var j = 1; j < graphData.readings[i].length; j++) {
			currentPoints.push(getChordOfData(graphData.readings[i][j], scaleInfo, canvas));
		}

		// Add the current readings points to the list of all points
		points.push(currentPoints);
	}

	// Draw the points
	drawPoints(cxt, points, graphData);
}
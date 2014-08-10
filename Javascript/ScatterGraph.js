function scatterGraph(canvas, graphData) {
	// Get the infomation about the scaleing, use the line scale code as they have the same structure
	var scaleInfo = calculateScatterScale(canvas, graphData);

	// Plot the graph
	drawScatterGraph(canvas, scaleInfo, graphData);
}

function calculateScatterScale(canvas, graphData) {
	var scale = { 
		"pixelsPerYUnit": 0,
		"yAxisPoints": [],
		"pixelsBetweenYScalePoints": 0,
		"pixelsPerXUnit": 0, 
		"xAxisPoints": [],
		"pixelsBetweenXScalePoints": 0
	};

	// See wether to use the max total (cummulative) or max readings (seperate) 
	var highest;
	if (graphData.lineType == "cummulative") {
		highest = getMaxTotalLineReading(graphData);
	} else {
		highest = getHighestLineReading(graphData);
	}

	// Get the scaleing data
	var yScaleing = getPointInfo(canvas, getLowestLineReading(graphData), highest, 10);
	var xScaleing = getPointInfo(canvas, getLowestLineReading(graphData, true), getHighestLineReading(graphData, true), 10, true);

	// Apply the data
	scale.pixelsPerYUnit = yScaleing.pixelsPerUnit;
	scale.pixelsBetweenYScalePoints = yScaleing.pixelsBetweenScalePoints;
	scale.yAxisPoints = yScaleing.scalePoints;

	scale.pixelsPerXUnit = xScaleing.pixelsPerUnit;
	scale.pixelsBetweenXScalePoints = xScaleing.pixelsBetweenScalePoints;
	scale.xAxisPoints = xScaleing.scalePoints;

	return scale;
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
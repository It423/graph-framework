function lineGraph(canvas, graphData) {
	var scaleInfo = calculateLineScale(canvas, graphData);

	drawLineGraph(canvas, scaleInfo, graphData);
}

function calculateLineScale(canvas, graphData) {
	var scale = { 
		"pixelsPerYUnit": 0,
		"yAxisPoints": [],
		"pixelsBetweenYScalePoints": 0,
		"pixelsPerXUnit": 0, 
		"xAxisPoints": [],
		"pixelsBetweenXScalePoints": 0
	};

	// Get the scaleing data
	var yScaleing = getPointInfo(canvas, getLowestLineReading(graphData), getHighestLineReading(graphData), 10);
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

function getHighestLineReading(graphData, x) {
	// Set the index to be checked according to the paramiter
	var index;
	if (x) {
		index = 0;
	} else {
		index = 1;
	}

	var highest = graphData.readings[0][1][index];

	// Look for the highest reading thoughtout all the readings
	for (var i = 0; i < graphData.readings.length; i++) {
		for (var j = 1; j < graphData.readings[i].length; j++) {
			if (graphData.readings[i][j][index] > highest) {
				highest = graphData.readings[i][j][index];
			}
		}
	}

	return highest;
}

function getLowestLineReading(graphData, x) {
	// Set the index to be checked according to the paramiter
	var index;
	if (x) {
		index = 0;
	} else {
		index = 1;
	}

	var lowest = graphData.readings[0][1][index];

	// Look for the lowest reading thoughtout all the readings
	for (var i = 0; i < graphData.readings.length; i++) {
		for (var j = 1; j < graphData.readings[i].length; j++) {
			if (graphData.readings[i][j][index] < lowest) {
				lowest = graphData.readings[i][j][index];
			}
		}
	}

	return lowest;
}

function drawLineGraph(canvas, scaleInfo, graphData) {
	drawLineAxis(canvas, scaleInfo, graphData);
	drawLineData(canvas, scaleInfo, graphData);
	drawLineKey(canvas, scaleInfo, graphData);
}

function drawLineAxis(canvas, scaleInfo, graphData) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "black";
	cxt.font = "18pt verdana";

	// Sideways y axis label
	drawYAxisLabel(canvas, cxt, graphData.yLabel);

	// x axis label 
	cxt.textAlign = "center";
	cxt.fillText(graphData.xLabel, ((canvas.width - 100) / 2) + 100, canvas.height - 10, canvas.width - 100);

	// y axis points
	drawYLabels(canvas, cxt, scaleInfo);

	// x axis values
	drawLineXLabels(canvas, cxt, scaleInfo);

	// axies
	drawAxis(canvas, cxt);
}

function drawLineXLabels(canvas, cxt, scaleInfo) {
	var xValue = double = 100;

	// Go through every point drawing them and a dash to show were it is on the scale
	for (var i = 0; i < scaleInfo.xAxisPoints.length; i++, xValue += scaleInfo.pixelsBetweenXScalePoints) {
		// Draw the dash
		cxt.beginPath();
		cxt.strokeStyle = "black";
		cxt.moveTo(xValue, canvas.height - 80);
		cxt.lineTo(xValue, canvas.height - 70);
		cxt.stroke();
		cxt.closePath();

		// Draw the label
		cxt.textAlign = "center";
		cxt.textBaseLine = "top";
		cxt.fillText(scaleInfo.xAxisPoints[i].toString(), xValue, canvas.height - 50, scaleInfo.pixelsBetweenXScalePoints / 2);
	}
}

function drawLineData(canvas, scaleInfo, graphData) {
	// Select how the graph will be draw according to the data
	if (graphData.lineType == "seperate") {
		drawLineSeparateData(canvas, scaleInfo, graphData);
	} else if (graphData.lineType == "cummulative") {
		drawLineCummulativeData(canvas, scaleInfo, graphData);
	}
}

function drawLineSeparateData(canvas, scaleInfo, graphData) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "black";

	// Do the line for every reading
	for (var i = 0; i < graphData.readings.length; i++) {
		// Set the colours and line width
		cxt.lineWidth = 3;
		cxt.strokeStyle = getColour(graphData.readings[i][0].colour);
		cxt.fillStyle = getColour(graphData.readings[i][0].colour);

		// Draw the line for the current reading
		for (var j = 2; j < graphData.readings[i].length; j++) {
			// Move to the first data point
			cxt.beginPath();
			var firstChord = getChordOfData(graphData.readings[i][j - 1], scaleInfo, canvas);
			cxt.moveTo(firstChord[0], firstChord[1]);

			// Do a line to the the point
			var chord = getChordOfData(graphData.readings[i][j], scaleInfo, canvas);
			cxt.lineTo(chord[0], chord[1]);

			// Draw the point
			cxt.stroke();
			cxt.closePath();
		}

		// Set the colour for the edge of the circles
		cxt.lineWidth = 1;
		cxt.strokeStyle = 'rgb(0, 0, 0)';
		// Draw the points for the current reading
		for (var j = 1; j < graphData.readings[i].length; j++) {
			// Get the co-ordinate to place the point
			var chord = getChordOfData(graphData.readings[i][j], scaleInfo, canvas);

			// Draw the point
			cxt.beginPath();
			cxt.arc(chord[0], chord[1], 5, convertToRad(0), convertToRad(360));
			cxt.fill();
			cxt.stroke();
			cxt.closePath();
		}
	}
}

function drawLineCummulativeData(canvas, scaleInfo, graphData) {
}

function getChordOfData(data, scaleInfo, canvas) {
	var chord = [ 0, 0 ];

	chord[0] = 100 + ((data[0] - scaleInfo.xAxisPoints[0]) * scaleInfo.pixelsPerXUnit);
	chord[1] = canvas.height - 80 -((data[1] - scaleInfo.yAxisPoints[0]) * scaleInfo.pixelsPerYUnit);

	return chord;
}

function drawLineKey(canvas, scaleInfo, graphData) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "black";
	cxt.font = "bold 8pt verdana";

	// Display the underlined word "key"
	cxt.textAlign = "left";
	cxt.textBaseLine = "top";
	cxt.fillText("Key:", canvas.width - 160, 10, 100);
	cxt.fillText("____", canvas.width - 160, 10, 100);

	var yValue = 25;

	// Draw the key
	for (var i = 0; i < graphData.readings.length; i++, yValue += 15) {
		// Set the correct colour
		cxt.fillStyle = getColour(graphData.readings[i][0].colour);

		// Draw the label for that colour
		cxt.textAlign = "left";
		cxt.textBaseLine = "top";
		cxt.fillText("- " + graphData.readings[i][0].name, canvas.width - 150, yValue, 100);
	}
}
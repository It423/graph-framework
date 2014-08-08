function lineGraph(canvas, graphData) {
	// Order the readings
	graphData.readings = orderReadings(graphData);

	// Get the infomation about the scaleing
	var scaleInfo = calculateLineScale(canvas, graphData);

	// Plot the graph
	drawLineGraph(canvas, scaleInfo, graphData);
}

function orderReadings(graphData) {
	// Get all the y averages
	var yAverages = [];
	for (var i = 0; i < graphData.readings.length; i++) {
		yAverages.push(getYAverage(graphData.readings[i]));
	}

	// Sort the averages low to high
	var sortedAverages = [];
	for (var i = 0; i < yAverages.length; i++) {
		sortedAverages.push(yAverages[i]);
	}
	sortedAverages.sortNumerically();

	// The array of readings to be sorted
	var sortedReadings = [];

	// Keep adding the next reading with the highest average until they have all been added
	while (sortedAverages.length > 0) {
		// Get the original index of the current highest average
		var originalIndex = yAverages.indexOf(sortedAverages[sortedAverages.length - 1]);

		// Add the set of readings with the highest current average
		sortedReadings.push(graphData.readings[originalIndex]);

		// Remove the highest current average
		sortedAverages.splice(sortedAverages.length - 1, 1);
	}

	return sortedReadings;
}

function getYAverage(reading) {
	// The count on how many elements were used
	var i = 1;

	// The total of the readings
	var total = 0;

	// Get the total
	for (; i < reading.length; i++) {
		total += reading[i][1];
	}

	// Divide the total by the amount of elements
	return total / i;
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

	// See wether to use the max total (cummulative) or max readings (seperate) 
	var highest;
	if (graphData.lineType == "cummulative") {
		highest = getMaxTotalLineReading(graphData);
	} else if (graphData.lineType == "seperate") {
		highest = getHighestLineReading(graphData);
	}

	// Get the scaleing data
	var yScaleing = getPointInfo(canvas, getLowestLineReading(graphData), highest, 10);
	var xScaleing = getPointInfo(canvas, getLowestLineReading(graphData, true), getHighestLineReading(graphData, true), 22, true);

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

function getMaxTotalLineReading(graphData) {
	// Set the highest to the lowest possible javascript number, so anything is higher than it
	var highest = Number.MIN_VALUE;

	// Check through each recording avalible
	for (var i = 1; i < graphData.readings[0].length; i++) {
		var total = graphData.readings[0][i][1];

		// Check through that recording in all the reading sets
		for (var j = 1; j < graphData.readings.length; j++) {
			total += graphData.readings[j][i][1];
		}

		// if the total was bigger than the rest, make it the new total
		if (total > highest) {
			highest = total;
		}
	}

	return highest;
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
	// Get the context and the colour
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "black";

	// Points to place circles
	var circles = [];

	// Do the line for every reading
	for (var i = 0; i < graphData.readings.length; i++) {
		// Points for this set of data
		var currentCirlces = [];
		currentCirlces.push(getChordOfData(graphData.readings[i][1], scaleInfo, canvas));

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
			currentCirlces.push(chord);

			// Draw the point
			cxt.stroke();
			cxt.closePath();
		}

		// Add the point infomation to the points list
		circles.push(currentCirlces);
	}

	// Draw the points
	drawPoints(cxt, circles, graphData);
}

function drawLineCummulativeData(canvas, scaleInfo, graphData) {
	// Get the context and the colour
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "black";

	// Points to place circles
	var circles = [];

	for (var i = 0; i < graphData.readings.length; i++) {
		// Points for this set of data
		var currentCirlces = [];

		// Set the colours and line width
		cxt.lineWidth = 1;
		cxt.strokeStyle = getColour(graphData.readings[i][0].colour);
		cxt.fillStyle = getColour(graphData.readings[i][0].colour);
		cxt.beginPath();

		// Draw the line for the current reading
		for (var j = 1; j < graphData.readings[i].length; j++) {
			// Get the next point
			var chord = graphData.readings[i][j];
			chord[1] = getTotalofValue(j, i, graphData);
			chord = getChordOfData(chord, scaleInfo, canvas);
			currentCirlces.push(chord);

			// Draw a line to the next point
			cxt.lineTo(chord[0], chord[1]);
		}

		// Draw the data
		cxt.stroke();
		cxt.fill();
		cxt.closePath();

		// Add the point infomation to the points list
		circles.push(currentCirlces);
	}

	// Draw points
	drawPoints(cxt, circles, graphData);
}

function drawPoints(cxt, points, graphData) {
	// Set line width and colour
	cxt.strokeStyle = "rgb(0, 0, 0)";
	cxt.lineWidth = 1;

	for (var i = 0; i < graphData.readings.length; i++) {
		// Set colour
		cxt.fillStyle = getColour(graphData.readings[i][0].colour);

		// Draw set of points
		for (var j = 0; j < points[i].length; j++) {
			cxt.beginPath();
			cxt.arc(points[i][j][0], points[i][j][1], 5, convertToRad(0), convertToRad(360));
			cxt.fill();
			cxt.stroke();
			cxt.closePath();
		}
	}
}

function getTotalofValue(secondIndex, fromFirstIndex, graphData) {
	var total = 0;

	// Get all the y values from the same catagory (after fromFirstIndex) and add them to the total 
	for (var i = fromFirstIndex; i < graphData.readings.length; i++) {
		total += graphData.readings[i][secondIndex][1];
	}

	return total;
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
	cxt.fillStyle = "rgba(255, 255, 255, 0.7)";
	cxt.font = "bold 8pt verdana";

	// Draw a semi transparent rectangle under the key, so you can read the data and the key clearly
	cxt.fillRect(canvas.width - 160, 15, 160, 15 * (graphData.readings.length + 1));

	// Set the colour back to black
	cxt.fillStyle = "rgb(0, 0, 0)";

	// Display the underlined word "key"
	cxt.textAlign = "left";
	cxt.textBaseLine = "top";
	cxt.fillText("Key:", canvas.width - 160, 15, 160);
	cxt.fillText("____", canvas.width - 160, 15, 160);

	var yValue = 30;

	// Draw the key
	for (var i = 0; i < graphData.readings.length; i++, yValue += 15) {
		// Set the correct colour
		cxt.fillStyle = getColour(graphData.readings[i][0].colour);

		// Draw the label for that colour
		cxt.textAlign = "left";
		cxt.textBaseLine = "top";
		cxt.fillText("- " + graphData.readings[i][0].name, canvas.width - 150, yValue, 150);
	}
}
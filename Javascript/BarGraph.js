function barGraph(canvas, graphData) {
	var scaleInfo = calculateScale(graphData, canvas);

	drawGraph(canvas, graphData, scaleInfo);
}

function calculateScale(graphData, canvas) {
	var scale = { 
		"startingPointY": 0, 
		"endPointY": 0,
		"pixelsBetweenBars": 0, 
		"widthOfBars": 0,
		"points": [],
		"pixelsBetweenScalePoints": 0,
		"pixelsPerUnit": 0
	};

	// Work out the scaling of the bars
	var barInfo = workOutBarInfo(canvas, graphData.data.length);

	scale.widthOfBars = barInfo.width;
	scale.pixelsBetweenBars = barInfo.gap;

	// Work out the points
	var pointInfo = workOutPointInfo(canvas, graphData);

	scale.startingPointY = pointInfo.startY;
	scale.endPointY = pointInfo.endY;
	scale.points = pointInfo.points;
	scale.pixelsBetweenScalePoints = pointInfo.scalePointGap;
	scale.pixelsPerUnit = pointInfo.pixelsPerUnit;

	return scale;
}

function workOutBarInfo(canvas, numberOfBars) {
	// The object to be returned
	var returnObj = {
		"width": 0,
		"gap": 0
	};

	// Work out the vars for the return object
	var graphWidth = canvas.width - 150;
	var widthAllowedPerBar = graphWidth / numberOfBars;

	returnObj.width = widthAllowedPerBar - (widthAllowedPerBar / 6);
	returnObj.gap = widthAllowedPerBar / 6;

	return returnObj;
}

function workOutPointInfo(canvas, graphData) {
	returnObj = {
		"startY": 0,
		"endY": 0,
		"scalePointGap": 0,
		"pixelsPerUnit": 0,
		"points": []
	};

	// If the lowest reading is not equal to the higest one
	if (getLowestReading(graphData) != getHighestReading(graphData)) {
		// Get the number size between reading
		var firstReading = getFirstYScaleReading(getHighestReading(graphData) - getLowestReading(graphData), 10);

		// Get the start point in the scale, and the last
		returnObj.startY = firstReading * Math.floor(getLowestReading(graphData) / firstReading);
		returnObj.endY = firstReading * Math.round(1 + getHighestReading(graphData) / firstReading);

		// Get the points
		for (var i = returnObj.startY; i <= returnObj.endY; i += firstReading) {
			// Check if the point is not already there (incase the scale is so samll)
			if (returnObj.points[returnObj.points.length - 1] != (Math.round(i * 10000) / 10000)) {
				// Round it to 4.p.d 
				returnObj.points.push(Math.round(i * 10000) / 10000);
			}
		}
	} else {
		// Set data to just above and below if the higest reading is also the lowest
		returnObj.startY = getLowestReading(graphData) - 1;
		returnObj.endY = getHighestReading(graphData) + 1;
		returnObj.points.push(returnObj.startY);
		returnObj.points.push(getHighestReading(graphData));
		returnObj.points.push(returnObj.endY);
	}

	// Work out the gap in pixels between each scale point
	returnObj.scalePointGap = (canvas.height - 100) / (returnObj.points.length - 1);

	// Work out how many pixels there are per a unit
	returnObj.pixelsPerUnit = (returnObj.scalePointGap * (returnObj.points.length - 1)) / (returnObj.points[returnObj.points.length - 1] - returnObj.points[0]);

	return returnObj;
}

function getHighestReading(graphData) {
	var highest = 0;

	for (var i = 0; i < graphData.data.length; i++) {
		if (graphData.data[i].count > highest) {
			highest = graphData.data[i].count;
		}
	}

	return highest;
}

function getLowestReading(graphData) {
	var lowest = getHighestReading(graphData);

	for (var i = 0; i < graphData.data.length; i++) {
		if (graphData.data[i].count < lowest) {
			lowest = graphData.data[i].count;
		}
	}

	return lowest;
}

function drawGraph(canvas, graphData, scaleInfo) {
	drawAxis(canvas, graphData, scaleInfo);
	drawData(canvas, graphData, scaleInfo);
}

function drawAxis(canvas, graphData, scaleInfo) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext('2d');
	cxt.fillStyle = 'black';
	cxt.font = '18pt verdana';

	// Sideways y axis label
	// Rotate the canvas and move it
	cxt.rotate(convertToRad(90));
	cxt.translate(((canvas.height - 180) / 2) + 58, 0);
	// Flip it so the text is the correct orientation
	cxt.scale(-1, -1);
	// Write the text
	cxt.textAlign = 'center';
	cxt.textBaseLine = 'top';
	cxt.fillText(graphData.yLabel, 0, 25, canvas.height - 95);
	// Un-do everything done the the canvas (making it able to be drawn on again)
	cxt.scale(-1, -1);
	cxt.translate(-(((canvas.height - 180) / 2) + 58), 0);
	cxt.rotate(convertToRad(-90));
	
	// x axis label 
	cxt.textAlign = 'center';
	cxt.fillText(graphData.xLabel, ((canvas.width - 100) / 2) + 100, canvas.height - 10, canvas.width - 100);

	// y axis points
	drawYLabels(canvas, cxt, scaleInfo, graphData)

	// x axis values
	drawXLabels(canvas, cxt, scaleInfo, graphData);

	// axies
	cxt.beginPath();
	cxt.strokeStyle = 'black';
	cxt.moveTo(100, 20);
	cxt.lineTo(100, canvas.height - 80);
	cxt.stroke();
	cxt.moveTo(100, canvas.height - 80);
	cxt.lineTo(canvas.width, canvas.height - 80);
	cxt.stroke();
	cxt.closePath();
}	

function drawYLabels(canvas, cxt, scaleInfo, graphData) {
	var yValue = double = 20;

	// Go through every point drawing them and a dash to show were it is on the scale
	for (var i = scaleInfo.points.length - 1; i >= 0; i--, yValue += scaleInfo.pixelsBetweenScalePoints) {
		// Draw a faint line along where the point it (making it easier to read)
		if (i != 0) {
			cxt.beginPath();
			cxt.strokeStyle = 'gray';
			cxt.moveTo(100, yValue);
			cxt.lineTo(canvas.width, yValue);
			cxt.stroke();
			cxt.closePath();
		}	

		// Draw the dash
		cxt.beginPath();
		cxt.strokeStyle = 'black';
		cxt.moveTo(100, yValue);
		cxt.lineTo(90, yValue);
		cxt.stroke();
		cxt.closePath();

		// Draw the label
		cxt.textAlign = 'right';
		cxt.textBaseLine = 'middle';
		cxt.fillText(scaleInfo.points[i].toString(), 87, yValue + 8, 37);
	}
}

function drawXLabels(canvas, cxt, scaleInfo, graphData) {
	var xValue = double = 100 + scaleInfo.pixelsBetweenBars;

	for (var i = 0; i < graphData.data.length; i++, xValue += scaleInfo.pixelsBetweenBars + scaleInfo.widthOfBars) {
		// Draw the width of the bar
		cxt.beginPath();
		cxt.strokeStyle = 'black';
		cxt.moveTo(xValue, canvas.height - 80);
		cxt.lineTo(xValue, canvas.height - 70);
		cxt.stroke();
		cxt.moveTo(xValue + scaleInfo.widthOfBars, canvas.height - 80);
		cxt.lineTo(xValue + scaleInfo.widthOfBars, canvas.height - 70);
		cxt.stroke();
		cxt.closePath();

		// Draw the labels
		cxt.textAlign = 'center';
		cxt.textBaseLine = 'top';
		cxt.fillText(graphData.data[i].field, xValue + (scaleInfo.widthOfBars / 2), canvas.height - 58, scaleInfo.widthOfBars);
	}
}

function drawData(canvas, graphData, scaleInfo, gapToYAxis) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext('2d');
	cxt.fillStyle = 'black';
	cxt.font = '18pt verdana';

	var xValue = double = 100 + scaleInfo.pixelsBetweenBars;

	// Plot bars
	for (var i = 0; i < graphData.data.length; i++, xValue += scaleInfo.pixelsBetweenBars + scaleInfo.widthOfBars) {
		cxt.beginPath();
		cxt.fillStyle = getColour(graphData.data[i].colour);
		cxt.fillRect(xValue, canvas.height - 80, scaleInfo.widthOfBars, -(scaleInfo.pixelsPerUnit * (graphData.data[i].count - scaleInfo.points[0])));
		cxt.strokeRect(xValue, canvas.height - 80, scaleInfo.widthOfBars, -(scaleInfo.pixelsPerUnit * (graphData.data[i].count - scaleInfo.points[0])));
		cxt.closePath();
	}
}

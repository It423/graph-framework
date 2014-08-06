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

	getLowestReading(graphData);

	// Get the number size between reading
	var firstReading = getFirstYScaleReading(getHighestReading(graphData) - getLowestReading(graphData), 10);

	// Get the start point in the scale, and the last
	returnObj.startY = firstReading * Math.floor(getLowestReading(graphData) / firstReading);
	returnObj.endY = firstReading * Math.round(1 + getHighestReading(graphData) / firstReading);

	// Get the points
	for (var i = returnObj.startY; i <= returnObj.endY; i += firstReading) {
		returnObj.points.push(i);
	}

	// Work out the gap in pixels between each scale point
	returnObj.scalePointGap = (canvas.height - 100) / (returnObj.points.length - 1);

	// Work out how many pixels there are per a unit
	returnObj.pixelsPerUnit = (returnObj.scalePointGap * (returnObj.points.length - 1)) / returnObj.points[returnObj.points.length - 1];

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

function getFirstYScaleReading(range, yReadings) {
	// Gets what the first reading would be un rounded
	var unroundedFirstReading = range / yReadings;

	// Divide the unrounded first reading to get a result between 0.1 and 1
	var x = Math.ceil(log10(unroundedFirstReading));
	var pow10x = Math.pow(10, x);

	// Divide the unround result by pow10x, round and times it back up to get a rounded first reading
	var roundedFirstReading = getRoundedValue(unroundedFirstReading, pow10x);
	roundedFirstReading *= pow10x;

	return roundedFirstReading;
}

function getRoundedValue(unroundedValue, pow10x) {
	// Divide the value by pow10x
	var valDivByPow10X = unroundedValue / pow10x;

	if (valDivByPow10X == 0.1) {
		return 0.1;
	}
	else if (valDivByPow10X <= 0.2) {
		return 0.2;
	}
	else if (valDivByPow10X <= 0.25) {
		return 0.25;
	}
	else if (valDivByPow10X <= 0.3) {
		return 0.3;
	}
	else if (valDivByPow10X <= 0.4) {
		return 0.4;
	}
	else if (valDivByPow10X <= 0.5) {
		return 0.5;
	}
	else if (valDivByPow10X <= 0.6) {
		return 0.6;
	}
	else if (valDivByPow10X <= 0.7) {
		return 0.7;
	}
	else if (valDivByPow10X <= 0.75) {
		return 0.75;
	}
	else if (valDivByPow10X <= 0.8) {
		return 0.8;
	}
	else if (valDivByPow10X <= 0.9) {
		return 0.9;
	}
	else if (valDivByPow10X <= 1) {
		return 1;
	}
	else {
		return 0.25;
	}
}

// The log ten oporator
function log10(val) {
	return Math.log(val) / Math.LN10;
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

	// y axis points
	drawYLabels(canvas, cxt, scaleInfo, graphData)

	// Sideways y axis label

	// x axis values
	drawXLabels(canvas, cxt, scaleInfo, graphData);

	// x axis label 
	cxt.textAlign = 'center';
	cxt.fillText(graphData.xLabel, ((canvas.width - 100) / 2) + 100, canvas.height - 10, canvas.width - 100);

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

	// Plot bar
	for (var i = 0; i < graphData.data.length; i++, xValue += scaleInfo.pixelsBetweenBars + scaleInfo.widthOfBars) {
		cxt.beginPath();
		cxt.strokeStyle = 'black';
		cxt.fillRect(xValue, canvas.height - 80, scaleInfo.widthOfBars, -(scaleInfo.pixelsPerUnit * graphData.data[i].count));
		cxt.closePath();
	}
}

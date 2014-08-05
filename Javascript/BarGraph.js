function barGraph(canvas, graphData) {
	var scaleInfo = calculateScale(graphData, canvas);

	console.log(scaleInfo);

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
	var retunObject = {
		"width": 0,
		"gap": 0
	};

	// Work out the vars for the return object
	var graphWidth = canvas.width - 80;
	var widthAllowedPerBar = graphWidth / numberOfBars;

	retunObject.width = widthAllowedPerBar - (widthAllowedPerBar / 6);
	retunObject.gap = widthAllowedPerBar / 6;

	return retunObject;
}

function workOutPointInfo(canvas, graphData) {
	retunObject = {
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
	retunObject.startY = firstReading * Math.floor(getLowestReading(graphData) / firstReading);
	retunObject.endY = firstReading * Math.round(1 + getHighestReading(graphData) / firstReading);

	// Get the points
	for (var i = retunObject.startY; i <= retunObject.endY; i += firstReading) {
		retunObject.points.push(i);
	}

	// The gap between each scale point is 100 pixels
	retunObject.scalePointGap = 100;

	// Work out how many pixels there are per a unit
	retunObject.pixelsPerUnit = (retunObject.scalePointGap * (retunObject.points.length - 1)) / retunObject.points[retunObject.points.length - 1];

	return retunObject;
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
	drawLabels(canvas, graphData);
	drawAxis(canvas, graphData, scaleInfo);
	drawData(canvas, graphData, scaleInfo);
}

function drawLabels(canvas, graphData) {

}

function drawAxis(canvas, graphData, scaleInfo) {
	
}

function  drawData(canvas, graphData, scaleInfo) {

}

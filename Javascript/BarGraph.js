function barGraph(canvas, graphData) {
	var scaleInfo = calculateBarScale(graphData, canvas);

	drawBarGraph(canvas, graphData, scaleInfo);
}

function calculateBarScale(graphData, canvas) {
	var scale = { 
		"pixelsBetweenBars": 0, 
		"widthOfBars": 0,
		"yAxisPoints": [],
		"pixelsBetweenYScalePoints": 0,
		"pixelsPerYUnit": 0
	};

	// Work out the scaling of the bars
	var barInfo = workOutBarInfo(canvas, graphData.data.length);

	scale.widthOfBars = barInfo.width;
	scale.pixelsBetweenBars = barInfo.gap;

	// Work out the points
	var pointInfo = getPointInfo(canvas, getLowestBarReading(graphData), getHighestBarReading(graphData), 10);

	scale.yAxisPoints = pointInfo.scalePoints;
	scale.pixelsBetweenYScalePoints = pointInfo.pixelsBetweenScalePoints;
	scale.pixelsPerYUnit = pointInfo.pixelsPerUnit;

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

function getHighestBarReading(graphData) {
	var highest = 0;

	for (var i = 0; i < graphData.data.length; i++) {
		if (graphData.data[i].count > highest) {
			highest = graphData.data[i].count;
		}
	}

	return highest;
}

function getLowestBarReading(graphData) {
	var lowest = getHighestBarReading(graphData);

	for (var i = 0; i < graphData.data.length; i++) {
		if (graphData.data[i].count < lowest) {
			lowest = graphData.data[i].count;
		}
	}

	return lowest;
}

function drawBarGraph(canvas, graphData, scaleInfo) {
	drawBarAxis(canvas, graphData, scaleInfo);
	drawBarData(canvas, graphData, scaleInfo);
}

function drawBarAxis(canvas, graphData, scaleInfo) {
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
	drawBarXLabels(canvas, cxt, scaleInfo, graphData);

	// axies
	drawAxis(canvas, cxt);
}	

function drawBarXLabels(canvas, cxt, scaleInfo, graphData) {
	var xValue = double = 100 + scaleInfo.pixelsBetweenBars;

	for (var i = 0; i < graphData.data.length; i++, xValue += scaleInfo.pixelsBetweenBars + scaleInfo.widthOfBars) {
		// Draw the width of the bar
		cxt.beginPath();
		cxt.strokeStyle = "black";
		cxt.moveTo(xValue, canvas.height - 80);
		cxt.lineTo(xValue, canvas.height - 70);
		cxt.stroke();
		cxt.moveTo(xValue + scaleInfo.widthOfBars, canvas.height - 80);
		cxt.lineTo(xValue + scaleInfo.widthOfBars, canvas.height - 70);
		cxt.stroke();
		cxt.closePath();

		// Draw the labels
		cxt.textAlign = "center";
		cxt.textBaseLine = "top";
		cxt.fillText(graphData.data[i].field, xValue + (scaleInfo.widthOfBars / 2), canvas.height - 58, scaleInfo.widthOfBars);
	}
}

function drawBarData(canvas, graphData, scaleInfo, gapToYAxis) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "black";
	cxt.font = "18pt verdana";

	var xValue = double = 100 + scaleInfo.pixelsBetweenBars;

	// Plot bars
	for (var i = 0; i < graphData.data.length; i++, xValue += scaleInfo.pixelsBetweenBars + scaleInfo.widthOfBars) {
		cxt.beginPath();
		cxt.fillStyle = getColour(graphData.data[i].colour);
		cxt.fillRect(xValue, canvas.height - 80, scaleInfo.widthOfBars, -(scaleInfo.pixelsPerYUnit * (graphData.data[i].count - scaleInfo.yAxisPoints[0])));
		cxt.strokeRect(xValue, canvas.height - 80, scaleInfo.widthOfBars, -(scaleInfo.pixelsPerYUnit * (graphData.data[i].count - scaleInfo.yAxisPoints[0])));
		cxt.closePath();
	}
}

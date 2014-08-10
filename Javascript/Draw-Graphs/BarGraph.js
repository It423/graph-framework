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
		for (var j = 0; j < graphData.data[i].readings.length; j++) {
			if (graphData.data[i].readings[j] > highest) {
				highest = graphData.data[i].readings[j];
			}
		}
	}

	return highest;
}

function getLowestBarReading(graphData) {
	var lowest = getHighestBarReading(graphData);

	for (var i = 0; i < graphData.data.length; i++) {
		for (var j = 0; j < graphData.data[i].readings.length; j++) {
			if (graphData.data[i].readings[j] < lowest) {
				lowest = graphData.data[i].readings[j];
			}
		}
	}

	return lowest;
}

function drawBarGraph(canvas, graphData, scaleInfo) {
	drawBarAxis(canvas, graphData, scaleInfo);
	drawBarData(canvas, graphData, scaleInfo);
	drawBarKey(canvas, graphData);
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
	for (var i = 0; i < graphData.data.length; i++, xValue += scaleInfo.pixelsBetweenBars) {
		// Go through each reading in the current field
		for (var j = 0; j < graphData.data[i].readings.length; j++, xValue += scaleInfo.widthOfBars / graphData.readingColour.length) {
			cxt.beginPath();

			// Get the colour
			cxt.fillStyle = getColour(graphData.readingColour[j]);

			// Draw and outline the bar
			cxt.fillRect(xValue, canvas.height - 80, scaleInfo.widthOfBars / graphData.readingColour.length, -(scaleInfo.pixelsPerYUnit * (graphData.data[i].readings[j] - scaleInfo.yAxisPoints[0])));
			cxt.strokeRect(xValue, canvas.height - 80, scaleInfo.widthOfBars / graphData.readingColour.length, -(scaleInfo.pixelsPerYUnit * (graphData.data[i].readings[j] - scaleInfo.yAxisPoints[0])));
			cxt.closePath();
		}
	}
}

function drawBarKey(canvas, graphData) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "rgba(255, 255, 255, 0.7)";
	cxt.font = "bold 8pt verdana";

	// Draw a semi transparent rectangle under the key, so you can read the data and the key clearly
	cxt.fillRect(canvas.width - 160, 15, 160, 15 * (graphData.readingColour.length));

	// Set the colour back to black
	cxt.fillStyle = "rgb(0, 0, 0)";

	// Display the underlined word "key"
	cxt.textAlign = "left";
	cxt.textBaseLine = "top";
	cxt.fillText("Key:", canvas.width - 160, 15, 160);
	cxt.fillText("____", canvas.width - 160, 15, 160);

	var yValue = 30;

	// Draw the key
	for (var i = 0; i < graphData.readingName.length; i++, yValue += 15) {
		// Set the correct colour
		cxt.fillStyle = getColour(graphData.readingColour[i]);

		// Draw the label for that colour
		cxt.textAlign = "left";
		cxt.textBaseLine = "top";
		cxt.fillText("- " + graphData.readingName[i], canvas.width - 150, yValue, 150);
	}
}

function pieChart(canvas, chartData) {
	var sectors = workOutSectors(chartData);

	drawPi(canvas, chartData, sectors);
}

function workOutSectors(chartData) {
	var percentages = [];

	var totalCount = getTotal(chartData);

	for (var i = 0; i < chartData.data.length; i++) {
		// Add the percentage to the array
		percentages.push((chartData.data[i].count / totalCount) * 100);
	}

	return percentages;
}

function getTotal(chartData) {
	var total = 0;

	// Add all the numbers to the total
	for (var i = 0; i < chartData.data.length; i++) {
		total += chartData.data[i].count;
	}

	return total;
}

function drawPi(canvas, chartData, sectors) {
	// Set up variables to help draw the pi chart
	var centerPoint = getCenterPoint(canvas);
	var pieRadius = canvas.height / 3;
	var startAngle = 270;

	// Get the context and the colours and fonts
	var cxt = canvas.getContext("2d");
	cxt.font = "8pt verdana";

	for (var i = 0; i < sectors.length; i++) {
		// Draw the sector
		drawSector(cxt, centerPoint, pieRadius, sectors[i], chartData.data[i], startAngle, chartData.unit, canvas.width);

		// Add the used angle to the start angle to avoid overlap and so the pie is a whole circle
		startAngle += getAngleFromPercentage(sectors[i]);
		startAngle %= 360;
	}
}

function getCenterPoint(canvas) {
	var centerPoint = [];

	centerPoint.push(canvas.width / 2);
	centerPoint.push(canvas.height / 2);

	return centerPoint;
}

function drawSector(cxt, centerPoint, radius, percentage, sliceInfo, startingAngle, unit, canvasWidth) {
	// Set the colour
	cxt.fillStyle = getColour(sliceInfo.colour);

	// Draw the sector
	cxt.beginPath();
	cxt.moveTo(centerPoint[0], centerPoint[1]);
	cxt.arc(centerPoint[0], centerPoint[1], radius, convertToRad(startingAngle), convertToRad(startingAngle + getAngleFromPercentage(percentage)));
	cxt.lineTo(centerPoint[0], centerPoint[1]);
	cxt.closePath();
	cxt.stroke();
	cxt.fill();

	// Draw the label for the slice
	drawLabel(cxt, centerPoint, radius, (startingAngle + getAngleFromPercentage(percentage) / 2), sliceInfo, percentage, unit, canvasWidth);
}

function drawLabel(cxt, centerPoint, radius, angle, sliceInfo, percentage, unit, canvasWidth) {
	// Get the starting and ending point of the label"s line
	var vectorToAdd = [ ((radius / 3) * 2) * Math.cos(convertToRad(angle)), ((radius / 3) * 2) * Math.sin(convertToRad(angle)) ];
	var startXY = [ centerPoint[0] + vectorToAdd[0], centerPoint[1] + vectorToAdd[1] ];
	var endXY = [ startXY[0] + vectorToAdd[0], startXY[1] + vectorToAdd[1] ];

	// Draw the labels line
	cxt.moveTo(startXY[0], startXY[1]);
	cxt.lineTo(endXY[0], endXY[1]);
	cxt.stroke();

	// Draw a line coming off (making it easier to read) and set the alignment of the text
	var addToEndXY = 0;
	var maxWidthOfText = canvasWidth;

	if (endXY[0] < centerPoint[0]) {
		addToEndXY = -20;
		cxt.textAlign = "right";
		maxWidthOfText = endXY[0] + addToEndXY;
	} else {
		addToEndXY = 20;
		cxt.textAlign = "left";
		maxWidthOfText = (canvasWidth / 2) - (endXY[0] + addToEndXY - centerPoint[0]);
	}

	cxt.moveTo(endXY[0], endXY[1]);
	cxt.lineTo(endXY[0] + addToEndXY, endXY[1]);
	cxt.stroke();

	// Draw the text
	cxt.textBaseLine = "center";
	cxt.fillText(" " + sliceInfo.field + ": " + sliceInfo.count + " " + unit + " [" + ((Math.round(percentage) * 10000) / 10000).toString() + "%] ", endXY[0] + addToEndXY, endXY[1] + 3, maxWidthOfText);
}

function getAngleFromPercentage(percentage) {
	return (360 / 100) * percentage;
}

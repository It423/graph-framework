function pieChart(canvas, chartData) {
	var sectors = workOutSectors(chartData);

	drawPie(canvas, chartData, sectors);
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

function drawPie(canvas, chartData, sectors) {
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

	// Draw the key at the side of the pie chart
	drawPieKey(canvas, chartData, sectors);
}

function getCenterPoint(canvas) {
	var centerPoint = [];

	centerPoint.push(canvas.width / 2);
	centerPoint.push(canvas.height / 2);

	return centerPoint;
}

function drawSector(cxt, centerPoint, radius, percentage, sliceInfo, startingAngle, unit, canvasWidth) {
	// Add the colour tot the colour list
	colours.push(getColour(sliceInfo.colour));

	// Set the colour
	cxt.fillStyle = colours[colours.length - 1];

	// Draw the sector
	cxt.beginPath();
	cxt.moveTo(centerPoint[0], centerPoint[1]);
	cxt.arc(centerPoint[0], centerPoint[1], radius, convertToRad(startingAngle), convertToRad(startingAngle + getAngleFromPercentage(percentage)));
	cxt.lineTo(centerPoint[0], centerPoint[1]);
	cxt.closePath();
	cxt.stroke();
	cxt.fill();
}

function getAngleFromPercentage(percentage) {
	return (360 / 100) * percentage;
}

function drawPieKey(canvas, chartData, sectors) {
	// Get the context and the colours and fonts
	var cxt = canvas.getContext("2d");
	cxt.font = "8pt verdana";
	cxt.textAlign = "left";
	cxt.lineWidth = 1;

	// The y position to place the text
	xPos = 10;
	yPos = 75;

	// Work out a third of the canvas width
	var maxLength = (canvas.width / 3) - 70;

	// Iterate over all the readings
	for (var i = 0; i < chartData.data.length; i++, yPos += 15) {
		// Put the x position to the other side of the screen if the y position has gone off the screen
		if (yPos > canvas.height) {
			xPos = ((maxLength + 70) * 2) + 70;
			yPos = 50;
		}

		// Set up the text string for the data reading with the percentage to 2 decimal places
		string = chartData.data[i].field + ": " + chartData.data[i].count + " " + chartData.unit + " [" + (Math.round(sectors[i] * 100) / 100).toString() + "%]";

		// Get the colour of the reading
		cxt.fillStyle = colours[i];

		// If the text is white, make it black and add a piece on the end saying it is actually white
		if (chartData.data[i].colour == 15) {
			string += " (White)";
			cxt.fillStyle = getColour(14);
		}

		// Write the string
		cxt.fillText(string, xPos, yPos, maxLength);
	}
}

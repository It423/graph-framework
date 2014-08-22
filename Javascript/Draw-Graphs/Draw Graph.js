// A list of rbg colour so if the colour is random, the key will use the same colour
var colours = [];

function drawGraph(fileName) {
	// Add the graph name to the end of the url if it isn't already there
	if (window.location.search.substring(1) == "") {
		window.history.pushState("object of string", "Title", "?" + fileName);
	}

	// Scroll to the top of the page
	window.scroll(0, 0);

	// Reset the colours list 
	colours = [];

	// Get the canvas
	var canvas = document.getElementById("canvas");

	// Set the width and height of the graph
	canvas.height = 550;
	canvas.width = 800;

	// Clear the canvas
	var cxt = canvas.getContext("2d");
	cxt.fillStyle = "rgb(255, 255, 255)";
	cxt.fillRect(0, 0, canvas.width, canvas.height);

	// Reset title
	var title = document.getElementById("title");
	title.innerHTML = "";

	// Load the JSON file if it exists
	if (fileExists("..\\JSON-Graph-Data\\" + fileName + ".json")) {
		$.getJSON("..\\JSON-Graph-Data\\" + fileName + ".json", function (data) {
			// Make sure it is a valid file and not corrupted
			if (validFile(data)) {
				// Display the title of the graph
				title.innerHTML = data.title;

				// Runs the data as a bar graph if told to
				if (data.graphType.toLowerCase() == "bar") {
					barGraph(canvas, data);
				} else if (data.graphType.toLowerCase() == "pie") {
					pieChart(canvas, data);
				} else if (data.graphType.toLowerCase() == "line") {
					lineGraph(canvas, data);
				} else if (data.graphType.toLowerCase() == "scatter") {
					scatterGraph(canvas, data);
				}
			} else {
				title.innerHTML = "The graph is corrupted! Please try another.";
				canvas.height = 0;
				canvas.width = 0;
			}
		});
	} else {
		title.innerHTML = "The graph does not exist! Please try another.";
		canvas.height = 0;
		canvas.width = 0;
	}
}

function fileExists(url) {
	filename = url.trim();
	
	var response = jQuery.ajax({
		url: filename,
		type: "HEAD",
		async: false
	}).status;	
	
	return (response != "200") ? false : true;
}

function validFile(data) {
	// Check if the file is valid genrally
	if (!data.hasOwnProperty("title") || !data.hasOwnProperty("graphType")) {
		return false;
	} else {
		// If it is go into more depth depending on what type of graph it is
		if (data.graphType.toLowerCase() == "bar") {
			return validBarGraph(data);
		} else if (data.graphType.toLowerCase() == "pie") {
			return validPieChart(data);
		} else if (data.graphType.toLowerCase() == "line") {
			return validLineGraph(data);
		} else if (data.graphType.toLowerCase() == "scatter") {
			return validScatterGraph(data);
		} else {
			return false;
		}
	}
}

function validBarGraph(data) {
	// Check the data has the correct properties
	if (!data.hasOwnProperty("xLabel") || !data.hasOwnProperty("yLabel") || !data.hasOwnProperty("readingColour") || !data.hasOwnProperty("readingName") || !data.hasOwnProperty("data")) {
		return false;
	} else {
		// Check there are an equal amount of colours to readings
		if (data.readingColour.length != data.readingName.length) {
			return false;
		}

		// Check the data array has valid data
		for (var i = 0; i < data.data.length; i++) {
			if (!data.data[i].hasOwnProperty("field") || !data.data[i].hasOwnProperty("readings") || data.data[i].readings.length < data.readingColour.length) {
				return false;
			}
		}

		// If it has all the required data, return true
		return true;
	}
}

function validPieChart(data) {
	// Check the data has the data array
	if (!data.hasOwnProperty("data") || !data.hasOwnProperty("unit")) {
		return false;
	} else {
		// Check the data arry has all the valid data reqiuired
		for (var i = 0; i < data.data.length; i++) {
			if (!data.data[i].hasOwnProperty("field") || !data.data[i].hasOwnProperty("count") || !data.data[i].hasOwnProperty("colour")) {
				return false;
			}
		}

		// If it has all the required data, return true
		return true;
	}
}

function validLineGraph(data) {
	// Check the data has the needed properties
	if (!data.hasOwnProperty("xLabel") || !data.hasOwnProperty("yLabel") || !data.hasOwnProperty("readings") || !data.hasOwnProperty("lineType")) {
		return false;
	} else {
		// Check it is a valid type of line graph
		if (data.lineType.toLowerCase() != "seperate" && data.lineType.toLowerCase() != "cumulative") {
			return false;
		}

		// Check the readings have valid data
		if (data.readings.length > 0) {
			for (var i = 0; i < data.readings.length; i++) {
				// If the set of readings has more than one result
				if (data.readings[i][0].hasOwnProperty("name") && data.readings[i][0].hasOwnProperty("colour")) {
					for (var j = 1; j < data.readings[i].length; j++) {
						// If the co-ordinate for the data does not have both elements, return false
						if (data.readings[i][j].length < 2) {
							return false;
						}

						// If the graph is cumulative and the reading's x is not equal to the rest of the files's x value for this recording
						if (data.lineType.toLowerCase() == "cumulative") {
							for (var k = i + 1; k < data.readings.length; k++) {
								if (data.readings[i][j][0] != data.readings[k][j][0]) {
									alert(i);
									alert(k);
									alert(j);
									return false;
								}
							}
						}
					}
				} else {
					return false;
				}
			}

			// Everything passed so return true
			return true;
		} else {
			return false;
		}
	}
}

function validScatterGraph(data) {
	// Check the data has the needed properties
	if (!data.hasOwnProperty("xLabel") || !data.hasOwnProperty("yLabel") || !data.hasOwnProperty("readings")) {
		return false;
	} else {
		// Check the readings have valid data
		if (data.readings.length > 0) {
			for (var i = 0; i < data.readings.length; i++) {
				// If the set of readings has more than one result
				if (data.readings[i].length > 0 && data.readings[i][0].hasOwnProperty("name") && data.readings[i][0].hasOwnProperty("colour")) {
					for (var j = 1; j < data.readings[i].length; j++) {
						// If the co-ordinate for the data does not have both elements, return false
						if (data.readings[i][j].length < 2) {
							return false;
						}
					}
				} else {
					return false;
				}
			}

			// Everything passed so return true
			return true;
		} else {
			return false;
		}
	}
}

function getPointCount(highestVal) {
	// Get a number that if the highestVal was devided by, it would return an answer between 0 and 10
	var x = Math.ceil(log10(highestVal));
	var devideor = Math.pow(0.50, x);

	// Get the result
	var result = Math.ceil(highestVal / devideor) * devideor;

	// Keep deviding the result by 2 until it is less than 15
	while (result > 15) {
		result = Math.floor(result / 2);
	}

	// Make sure the result is at least 4
	if (result < 4) {
		result = 4;
	}

	return result;
}

function getPointInfo(canvas, lowestReading, heighestReading, points, xAxis, lineGraph) {
	returnObj = {
		"pixelsBetweenScalePoints": 0,
		"pixelsPerUnit": 0,
		"scalePoints": []
	};

	// If the lowest reading is not equal to the higest one
	if (lowestReading != heighestReading) {
		// Get the number size between reading
		var firstReading = getFirstScaleReading(heighestReading - lowestReading, points);

		// Get the start point in the scale, and the last
		var startY = firstReading * Math.floor(lowestReading / firstReading);
		var endY = firstReading * Math.ceil(1 + heighestReading / firstReading);

		// Change the end y if its a line graph (so it ends on the max readings) 
		if (lineGraph) {
			endY = heighestReading;
		}

		// Get the points
		for (var i = startY; i <= endY; i += firstReading) {
			// Check if the point is not already there (incase the scale is so samll)
			if (returnObj.scalePoints[returnObj.scalePoints.length - 1] != (Math.round(i * 10000) / 10000)) {
				// Round it to 4.p.d 
				returnObj.scalePoints.push(Math.round(i * 10000) / 10000);
			}
		}
	} else {
		// Set data to just above and below if the higest reading is also the lowest
		returnObj.scalePoints = [ lowestReading - 1, lowestReading, lowestReading + 1 ];
	}

	// Work out the length the axis will be 
	var scaleLength = -100;
	if (xAxis) {
		scaleLength += canvas.width;
	} else {
		scaleLength += canvas.height;
	}

	// Work out the gap in pixels between each scale point
	returnObj.pixelsBetweenScalePoints = scaleLength / (returnObj.scalePoints.length - 1);

	// Re-ajust the scale if it is the x axis (so the last scale label is displayed properly)
	if (xAxis) {
		scaleLength -= returnObj.pixelsBetweenScalePoints / 2;
		returnObj.pixelsBetweenScalePoints = scaleLength / (returnObj.scalePoints.length - 1);
	}

	// Work out how many pixels there are per a unit
	returnObj.pixelsPerUnit = scaleLength / (returnObj.scalePoints[returnObj.scalePoints.length - 1] - returnObj.scalePoints[0]);

	return returnObj;
}

function getFirstScaleReading(range, yReadings) {
	// Gets what the first reading would be un rounded
	var unroundedFirstReading = range / yReadings;

	// Divide the unrounded first reading to get a result between 0.1 and 1
	var x = Math.ceil(log10(unroundedFirstReading));
	var pow10x = Math.pow(10, x);

	// Divide the unround result by pow10x, round and times it back up to get a rounded first reading
	var roundedFirstReading = getRoundedValue(unroundedFirstReading, pow10x);
	roundedFirstReading *= pow10x;

	// Round the reading if the range is greater than one
	if (range > 1) {
		roundedFirstReading = Math.round(roundedFirstReading);
	}

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

function log10(val) {
	return Math.log(val) / Math.LN10;
}

function convertToRad(deg) {
	return deg * (Math.PI / 180);
}

Array.prototype.sortNumerically = function() {
	return this.sort(function(a, b) {
		return a - b;
	})
}

function drawYAxisLabel(canvas, cxt, text) {
	// Rotate the canvas and move it
	cxt.rotate(convertToRad(90));
	cxt.translate(((canvas.height - 180) / 2) + 58, 0);
	// Flip it so the text is the correct orientation
	cxt.scale(-1, -1);
	// Write the text
	cxt.textAlign = "center";
	cxt.textBaseLine = "top";
	cxt.fillText(text, 0, 25, canvas.height - 95);
	// Un-do everything done the the canvas (making it able to be drawn on again)
	cxt.scale(-1, -1);
	cxt.translate(-(((canvas.height - 180) / 2) + 58), 0);
	cxt.rotate(convertToRad(-90));
}

function drawYLabels(canvas, cxt, scaleInfo) {
	var yValue = double = 20;

	// Go through every point drawing them and a dash to show were it is on the scale
	for (var i = scaleInfo.yAxisPoints.length - 1; i >= 0; i--, yValue += scaleInfo.pixelsBetweenYScalePoints) {
		// Draw a faint line along where the point it (making it easier to read)
		if (i != 0) {
			cxt.beginPath();
			cxt.strokeStyle = "gray";
			cxt.moveTo(100, yValue);
			cxt.lineTo(canvas.width, yValue);
			cxt.stroke();
			cxt.closePath();
		}	

		// Draw the dash
		cxt.beginPath();
		cxt.strokeStyle = "black";
		cxt.moveTo(100, yValue);
		cxt.lineTo(90, yValue);
		cxt.stroke();
		cxt.closePath();

		// Draw the label
		cxt.textAlign = "right";
		cxt.textBaseLine = "middle";
		cxt.fillText(scaleInfo.yAxisPoints[i].toString(), 87, yValue + 8, 37);
	}
}

function drawAxis(canvas, cxt) {
	cxt.beginPath();
	cxt.strokeStyle = "black";
	cxt.moveTo(100, 20);
	cxt.lineTo(100, canvas.height - 80);
	cxt.stroke();
	cxt.moveTo(100, canvas.height - 80);
	cxt.lineTo(canvas.width, canvas.height - 80);
	cxt.stroke();
	cxt.closePath();
}

function getColour(colourNum) {
	switch (colourNum) {
		case 0: return "rgb(0, 0, 255)"; // Blue
		case 1: return "rgb(255, 0, 0)"; // Red
		case 2: return "rgb(55, 215, 15)"; // Green
		case 3: return "rgb(180, 45, 170)"; // Purple
		case 4: return "rgb(85, 215, 245)"; // Light blue
		case 5: return "rgb(250, 105, 0)"; // Orange
		case 6: return "rgb(140, 80, 5)"; // Brown
		case 7: return "rgb(140, 5, 120)"; // Dark purple
		case 8: return "rgb(225, 75, 75)"; // Light red
		case 9: return "rgb(0, 110, 120)"; // Dark blue 
		case 10: return "rgb(255, 190, 190)"; // Pink
		case 11: return "rgb(240, 175, 120)"; // Amber
		case 12: return "rgb(225, 240, 120)"; // Light yellow
		case 13: return "rgb(200, 200, 200)"; // Grey
		case 14: return "rgb(0, 0, 0)"; // Black
		case 15: return "rgb(255, 255, 255)"; // White
		default: return "rgb(" + Math.round(Math.random() * 255).toString() + " ," + Math.round(Math.random() * 255).toString() + " ," + Math.round(Math.random() * 255).toString() + ")"; // Random
	}
}

function drawPoints(cxt, points, graphData) {
	// Set line width and colour
	cxt.strokeStyle = "rgb(0, 0, 0)";
	cxt.lineWidth = 1;

	for (var i = 0; i < graphData.readings.length; i++) {
		// Set colour
		cxt.fillStyle = colours[i];

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

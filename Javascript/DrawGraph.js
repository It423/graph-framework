var canvas = document.getElementById("canvas");

// Load the JSON file if it exists
if (fileExists(".\\JSON-Graph-Data\\Eye Colour Bar Graph.json")) {
	$.getJSON('.\\JSON-Graph-Data\\Eye Colour Bar Graph.json', function (data) {
		if (validFile(data)) {
			// Display the title of the graph
			var title = document.getElementById("title");
			title.innerHTML = data.title;

			// Runs the data as a bar graph if told to
			if (data.graphType.toLowerCase() == "bar") {
				barGraph(canvas, data);
			}	
		} else {
			var cxt = canvas.getContext("2d");
			cxt.font = "24pt verdana";
			cxt.fillText("This graph is corrupt! Please try another.", 10, 50);
		}
	});
} else {
	var cxt = canvas.getContext("2d");
	cxt.font = "24pt verdana";
	cxt.fillText("This graph does not exist! Please try another.", 10, 50);
}

function getColour(colourNum) {
	switch (colourNum) {
		case 0: return 'rgb(0, 0, 255)'; // Blue
		case 1: return 'rgb(255, 0, 0)'; // Red
		case 2: return 'rgb(55, 215, 15)'; // Green
		case 3: return 'rgb(180, 45, 170)'; // Purple
		case 4: return 'rgb(85, 215, 245)'; // Light blue
		case 5: return 'rgb(250, 105, 0)'; // Orange
		case 6: return 'rgb(140, 80, 5)'; // Brown
		case 7: return 'rgb(140, 5, 120)'; // Dark purple
		case 8: return 'rgb(225, 75, 75)'; // Light red
		case 9: return 'rgb(0, 110, 120)'; // Dark blue 
		case 10: return 'rgb(255, 190, 190)'; // Pink
		case 11: return 'rgb(240, 175, 120)'; // Amber
		case 12: return 'rgb(225, 240, 120)'; // Light yellow
		case 13: return 'rgb(200, 200, 200)'; // Gray
		case 14: return 'rgb(0, 0, 0)'; // Black
		default: return 'rgb(' + Math.round(Math.random() * 255).toString() + ' ,' 
							   + Math.round(Math.random() * 255).toString() + ' ,' 
							   + Math.round(Math.random() * 255).toString() + ')'; // Random
	}
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

function fileExists(url) {
	filename = url.trim();
	
	var response = jQuery.ajax({
		url: filename,
		type: 'HEAD',
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
		if (data.graphType == "bar") {
			return validBarGraph(data);
		} else {
			return false;
		}
	}
}

function validBarGraph(data) {
	// Check the data has the correct properties
	if (!data.hasOwnProperty("xLabel") || !data.hasOwnProperty("yLabel") || !data.hasOwnProperty("data")) {
		return false;
	} else {
		// Check the data array has valid data
		for (var i = 0; i < data.data.length; i++) {
			if (!data.data[i].hasOwnProperty("field") || !data.data[i].hasOwnProperty("count") || !data.data[i].hasOwnProperty("colour")) {
				return false;
			}
		}

		return true;
	}
}

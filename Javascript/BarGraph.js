function barGraph(canvas, graphData) {
	var scaleInfo = calculateScale(graphData, canvas);

	console.log(scaleInfo);
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

	return retunObject;
}

function drawGraph(canvas, graphData, scaleInfo) {
	drawLabels(canvas, graphData);
	drawAxis(canvas, scaleInfo);
	drawData(canvas, graphData, scaleInfo);
}

function drawLabels(canvas, graphData) {

}

function drawAxis(canvas, scaleInfo) {

}

function  drawData(canvas, graphData, scaleInfo) {

}
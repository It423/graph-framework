var cxt = getContext("canvas");

barGraph(cxt);

function getContext(canvasID) {
	var canvas = document.getElementById(canvasID);
	var context = canvas.getContext('2d');

	return context;
}
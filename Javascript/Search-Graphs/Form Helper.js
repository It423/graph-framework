function checkBoxesTicked() {
	// Get the value of both the line graphs together
	var lineGraphsCheckedVal = document.getElementById("norm-line-graphs").checked &&
							   document.getElementById("cumulative-line-graphs").checked;

	// Set the line graph check box to that value
	document.getElementById("line-graphs").checked = lineGraphsCheckedVal;

	// Get the value of all the check boxes together
	var totalCheckedVal = document.getElementById("bar-graphs").checked &&
						  document.getElementById("pie-charts").checked &&
						  document.getElementById("line-graphs").checked &&
						  document.getElementById("scatter-graphs").checked;

	// Set the all graphs check box to that value
	document.getElementById("all-graphs").checked = totalCheckedVal;
}

function tickAllBoxes() {
	// Get the value of the all graphs boolean
	var checkVal = document.getElementById("all-graphs").checked;

	// Set all the boxes to that value
	document.getElementById("bar-graphs").checked = checkVal;
	document.getElementById("pie-charts").checked = checkVal;
	document.getElementById("line-graphs").checked = checkVal;
	document.getElementById("norm-line-graphs").checked = checkVal;
	document.getElementById("cumulative-line-graphs").checked = checkVal;
	document.getElementById("scatter-graphs").checked = checkVal;
}

function tickLineBoxes() {
	// Get the value of the line graph boolean
	var checkVal = document.getElementById("line-graphs").checked;

	// Set all the line graph types to that value
	document.getElementById("norm-line-graphs").checked = checkVal;
	document.getElementById("cumulative-line-graphs").checked = checkVal;
}

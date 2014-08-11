function validateForm() {
	var formData = $("form").serializeArray();

	if (formData[0].value == "") {
		alert("Please fill in the title of the graph!");
		return false;
	} else {
		var graphType = formData[1].value.toLowerCase();

		if (graphType == "pie") {
			validPieForm(formData);
		}
	}
}

function validPieForm(data, hasFailed) {
	if (data[2].value == "") {
		alert("Please fill in what the unit is!");
		return false;
	}

	for (var i = 3; i < data.length; i += 3) {
		for (var j = 0; j < 3; j++) {
			if (data[i + j].value == "") {
				alert("Please fill in all the readings and their data!");
				return false;
			}
		}
	}
}
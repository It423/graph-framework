function savePieChart(data) {
	// The array of each line in the .json file
	var fileText = [];

	// Push all the elements into the text
	fileText.push('{');
	fileText.push('    "title": "' + data[0].value + '",');
	fileText.push('    "graphType": "pie",');
	fileText.push('    "unit": "' + data[2].value + '",');
	fileText.push('    "data": [');

	// Push the graph data into the array
	for (var i = 3; i < data.length; i += 3) {
		fileText.push('        { "field": "' + data[i].value + '", "count": ' + data[i + 1].value + ', "colour": ' + data[i + 2].value + ' },');
	}

	// Remove the last comma (making it a valid file)
	fileText[fileText.length - 1] = fileText[fileText.length - 1].slice(0, fileText[fileText.length - 1].length - 1);

	// Push the ending of the file
	fileText.push('    ]');
	fileText.push('}');
}
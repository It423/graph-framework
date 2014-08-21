function getGraphsFromParams(filter) {
	// Clear the displayed graphs
	document.getElementById("graphs-available").innerHTML = "";

	// Create a list of graphs containing ones that have been selected
	graphs = selectedGraphs();

	// Filter the graphs by the string inputted as search term
	filters = filter.split(" ");
	for (var i = 0; i < filters.length; i++) {
		graphs = filterGraphsWithString(graphs, filters[i]);
	}

	// Sort the graphs alphabetically
	graphs.sort();

	// Display the selected graphs
	displayGraphsFromList(graphs);
}

function selectedGraphs() {
	// The list of graphs
	var graphs = [];

	// Check to see if bar graphs are selected
	if (document.getElementById("bar-graphs").checked) {
		graphs = addGraphs(graphs, barFileNames);
	}

	// Check to see if pie charts are selected
	if (document.getElementById("pie-charts").checked) {
		graphs = addGraphs(graphs, pieFileNames);
	}

	// Check to see if normal line graphs are selected
	if (document.getElementById("norm-line-graphs").checked) {
		graphs = addGraphs(graphs, lineFileNames);
	}

	// Check to see if cumulative line graphs are selected
	if (document.getElementById("cumulative-line-graphs").checked) {
		graphs = addGraphs(graphs, cumulativeFileNames);
	}

	// Check to see if scatter graphs are selected
	if (document.getElementById("scatter-graphs").checked) {
		graphs = addGraphs(graphs, scatterFileNames);
	}

	return graphs;
}

function addGraphs(graphsList, graphsToAdd) {
	// Re create the list of graphs that can be manipulated and later returned
	var graphs = graphsList;

	// Add the graphs to add
	for (var i = 0; i < graphsToAdd.length; i++) {
		graphs.push(graphsToAdd[i]);
	}

	return graphs;
}

function filterGraphsWithString(graphsList, string) {
	// Re create the list of graphs that can be manipulated and later returned
	var graphs = graphsList;

	// Iterate over all the graphs
	for (var i = 0; i < graphs.length; i++) {
		// Check the graph name has the string being checked for
		if (graphs[i].toLowerCase().indexOf(string) == -1) {
			// If it doesn't have it, remove the graph
			graphs.splice(i, 1);

			// Minus one from i so that it checks the next element
			i--;
		}
	}

	return graphs;
}

function displayGraphsFromList(graphs) {
	// Iterate through the graphs
	for (var i = 0; i < graphs.length; i++) {
		// Display the selected graph
		displayGraphName(graphs[i]);
	}
}

function displayGraphName(fileName) {
	// Get the name to display
	var displayName = removeNumberInBrackets(fileName);

	// Set up the string of HTML to display the graphs
	var string = [
		"<div class='search-result'>",
			"<h4 class='filename'>" + fileName + "</h4>",
			"<button class='redirection-button' id='" + fileName + "'onclick='loadGraph(" + '"' + fileName + '"' + ")'>Draw Graph!</button>",
		"</div>",
		"<hr/>"].join("\n");

	// Add the html string to the div where the graphs are listed
	$("#graphs-available").append(string);
}

function removeNumberInBrackets(fileName) {
	// Remove the brackets from the string if they are present
	if (fileName.charAt(fileName.length - 1) == ')') {
		return fileName.slice(0, fileName.lastIndexOf('('));
	} else {
		return fileName;
	}
}

function loadGraph(fileName) {
	// Send the user to the main page with the graph they selected loaded
	window.location = "index.html?" + fileName;
}

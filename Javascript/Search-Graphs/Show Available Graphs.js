function getGraphsFromParams(filter) {
	// Clear the displayed graphs
	document.getElementById("graphs-available").innerHTML = "";

	// The list of graphs
	var graphs = [];

	// Add the selected graphs
	graphs = addGraphs(graphs, barFileNames);
	graphs = addGraphs(graphs, pieFileNames);
	graphs = addGraphs(graphs, lineFileNames);
	graphs = addGraphs(graphs, cumulativeFileNames);
	graphs = addGraphs(graphs, scatterFileNames);

	// Filter the graphs by the string inputted as search term
	graphs = filterGraphsWithString(graphs, filter);

	// Display the selected graphs
	displayGraphsFromList(graphs);
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
		"<span>" + fileName + "</span>",
		"<br/>"].join("\n");

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

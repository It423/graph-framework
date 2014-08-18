<?php
// The file name
$dir = "..\\..\\JSON-Graph-Data\\";
$fileName = getFileName();
$extension = ".json";
$myFile = $dir . $fileName . $extension;

// If it exists add a number to the end (stops removal of graphs)
if (file_exists($myFile)) {
	$endingToFile = "(0)";
	$numberInEnding = 0;
	$newFileName = $dir . $fileName . $endingToFile . $extension;

	while (file_exists($newFileName)) {
		// Add one to the number in the ending
		$numberInEnding++;

		// Set the ending to the number surrounded by brackets
		$endingToFile = "(" . (string)$numberInEnding . ")";

		// Set the new file name to incude the number
		$newFileName = $dir . $fileName . $endingToFile . $extension;
	}

	// Set the file name to the new one
	$myFile = $newFileName;
}

// Open the file
$fh = fopen($myFile, "w");

// Write the data
fwrite($fh, $_POST["myData"]);

// Close the file
fclose($fh);

function getFileName() {
	$name;

	// Get the name of the graph
	$name = explode('"', $_POST["myData"])[3];

	// Get the ending to it
	$name .= " " . getEnding(explode('"', $_POST["myData"])[7], explode('"', $_POST["myData"])[11]);

	return $name;
}


function getEnding($graphType, $lineType) {
	if ($graphType == "pie") {
		return "pie chart";
	} else if ($graphType == "bar") {
		return "bar graph";
	} else if ($graphType == "line") {
		if ($lineType == "seperate") {
			return "line graph";
		} else if ($lineType == "cummulative") {
			return "cummulative line graph";
		}
	} else if ($graphType == "scatter") {
		return "scatter graph";
	} 

	// Return a blank string if it hasn't found a correct graph match
	return "";
}
?>
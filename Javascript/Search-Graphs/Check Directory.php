<?php
// The array which will contain the file names
$fileNames = [];

// Get all the files ending in ".json" within the graph data storage folder
foreach (glob("..\\..\\JSON-Graph-Data\\*.json") as $file) {
	// Add the filename to the array without the "..\\..\\JSON-Graph-Data" or ".json" parts
	array_push($fileNames, str_replace("..\\..\\JSON-Graph-Data\\", "", str_replace(".json", "", $file)));
}

// Send the list of file names back to the javascript
echo json_encode($fileNames);
?>
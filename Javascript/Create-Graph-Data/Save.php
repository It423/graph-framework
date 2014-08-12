<?php
$myFile = "..\\..\\JSON-Graph-Data\\" . getFileName() . ".json";

$fh = fopen($myFile, 'w');

fwrite($fh, $_POST["myData"]);

fclose($fh);

function getFileName() {
	$name;

	// Get the name of the graph
	$name = explode('"', $_POST["myData"])[3];

	// Get the ending to it
	$name .= " " . getEnding(explode('"', $_POST["myData"])[7]);

	return $name;
}


function getEnding($graphType) {
	if ($graphType == "pie") {
		return "pie chart";
	} else {
		return "poop, it didnt work ya fag";
	}
}
?>
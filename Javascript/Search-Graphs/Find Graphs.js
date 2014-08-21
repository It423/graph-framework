// Global variables of the graph types and their corrosponding files' names
var barFileNames = [];
var pieFileNames = [];
var lineFileNames = [];
var cumulativeFileNames = [];
var scatterFileNames = [];

function findAllJSONGraphs() {
	$.ajax({
		type: "POST",
		url: "Javascript\\Search-Graphs\\Check Directory.php",
		success: function(foundFileNames) {
			// Split the file names into an array of them
			var fileNames = foundFileNames.split(", ");

			// Remove the blank element 
			fileNames.splice(fileNames.length - 1, 1);

			// Put each graph type into its type and put it in that array
			for (var i = 0; i < fileNames.length; i++) {
				// Remove the ".json" from each filename
				fileNames[i] = fileNames[i].replace(".json", "");

				// Sort the graph into its corrosponding graph type
				if (fileNames[i].toLowerCase().lastIndexOf("bar graph") == fileNames[i].length - 9) {
					barFileNames.push(fileNames[i]);
				} else if (fileNames[i].toLowerCase().lastIndexOf("pie chart") == fileNames[i].length - 9) {
					pieFileNames.push(fileNames[i]);
				} else if (fileNames[i].toLowerCase().lastIndexOf("line graph") == fileNames[i].length - 10) {
					if (fileNames[i].toLowerCase().lastIndexOf("cumulative line graph") == fileNames[i].length - 21) {
						cumulativeFileNames.push(fileNames[i]);
					} else {
						lineFileNames.push(fileNames[i]);
					}
				} else if (fileNames[i].toLowerCase().lastIndexOf("scatter graph") == fileNames[i].length - 13) {
					scatterFileNames.push(fileNames[i]);
				}
			}
		},
		error: function(e) {
			console.log(e.message);
		}
	});
}

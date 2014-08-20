function findAllJSONGraphs() {
	$.ajax({
		type: "POST",
		url: "Javascript\\Search-Graphs\\Check Directory.php",
		success: function(fileNames) {
			console.log(fileNames);
		},
		error: function(e) {
			console.log(e.message);
		}
	});
}

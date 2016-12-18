var colors = ["#0091d8", "#00acd8", "#ff8541", "#ffe541", "#4dc4ff", "#e40026"];
var createList = function(colorString) {
	var array = colorString.split(",");
	var max = array.length;
	var list = "<div class='list-group'>";
	for (var i = 0; i < max; i++) {
		var color = array[i];
		list += "<div class='list-group-item' style='background-color:" + color + "'>" + color + "</div>";
	}
	list += "</div>";
	return list;
};
function createSamples(outputPanel, colorlist) {
	var samples = "<div class='container-fluid'><div class='row'>";
	var i = 0;
	var max = colorlist.length;
	for (; i < max; i++) {
		if (i > 0 && i % 4 == 0)
			samples += "</div><div class='row'>";
		samples += "<div class='sample col-md-3' style='background-color:" + colorlist[i] + "'></div>";
	}
	samples += "</div></div>";
	samples += "";
	$(outputPanel).html(samples);
}
$(function() {
	createSamples("#colorexamples", colors);
});

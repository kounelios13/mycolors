var colors = ["#e22d00", "#2f688e", "#6ed3cf", "#9ad3de",
	"#89bdd3", "#89bdd3", "#89bdd3", "#c8be51",
	"#0091d8", "#00acd8", "#ff8541", "#ffe541",
	"#4dc4ff", "#e40026", "#98dafc", "#6534ff",
	"#62bcfa", "#e05038", "#c43235", "#f2b632",
	"#D32F2F", "#F44336", "#FF5722", "#FFC107",
	"#1bbfe4", "#E71D36", "#004BA8", "#FF9F1C",
	"#011627", "#9b3018", "#ffe047"
];
var createList = function(colorString) {
	var array = colorString.split(',');
	var max = array.length;
	//Create the opening tag
	var list = "<div class='list-group'>";
	for (var i = 0; i < max; i++) {
		var color = array[i];
		list += "<div class='list-group-item' style='background-color:" + color.toUpperCase() + "'>" + color + "</div>";
	}
	//Add the closing tag
	list += "</div>";
	return list;
};
var wrapToCol = function(item, col_num) {
	return "<div class='col-md-" + col_num + "'>" + item + "</div>";
};
var log = function(o) {
	console.log(o);
};
var createColorLists = function(colorList) {
	var div = (a, b) => Math.floor(a / b);
	var mod = (a, b) => a % b;
	var maxCol = 12;
	var arraySize = colorList.length;
	var numofrows = div(arraySize, 4);
	if (mod(arraySize, 4))
		numofrows++;
	log("Total lists:" + numofrows)
	var colorIndex = 0;
	var rowIndex = 0;
	var remaining = arraySize - div(arraySize, 4);
	var str = "<div class = 'container'><div class='row'>";
	var listmod = mod(arraySize, 2);
	for (var i = 0; i < numofrows; i++) {
		if (i && !mod(rowIndex, maxCol)) {
			str += "</div><div class='row'>";
		}
		rowIndex += 6;
		var currentcolors = colorList.slice(colorIndex, colorIndex + 4);
		var colorString = currentcolors.join(",");
		var ul = createList(colorString);
		// fixes #3
		//Calculate the mod of the total number of rows with 2
		var colnum = 6;
		if (i == (numofrows - 1) & mod(numofrows, 2) == 1)
			colnum = 12;
		var wrapped = wrapToCol(ul, colnum);
		str += wrapped;
		colorIndex += 4;
	}
	str += "</div></div>";
	return str;
};
$(function() {
	var array = Array.from(new Set(colors)).sort();
	var max = array.length;
	var pos = Math.floor(Math.random() * max);
	var cur = array[pos];
	log(cur)
	var markup = createColorLists(array);
	$("body").css("background", cur);
	$("#colorexamples").html(markup);
	$(".list-group-item").on("click", function() {
		var color = $(this).html();
		$("body").css("background", color);
	});
});

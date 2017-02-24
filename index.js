var colors = [];
var array = [];
var cur = "";
var loadFromDisk = () => {
	$.ajax({
		type: "GET",
		url: "colors.xml",
		dataType: "xml",
		failure:function(err){
			console.log(err);
		},
		success: function(xml) {
			$(xml).find('value').each(function() {
				colors.push($(this).text());
			});
			array = Array.from(new Set(colors.sort()));
			var max = array.length;
			var pos = Math.floor(Math.random() * max);
			cur = array[pos];
			var markup = createColorLists(array);
			$("body").css("background", cur);
			$("#colorexamples").html(markup);
		}
	});
};
var shuffleArray = function(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};
var createList = function(colorString) {
	var array = colorString.split(',');
	var max = array.length;
	//Create the opening tag
	var list = "<div class='list-group'>\n\t";
	for (var i = 0; i < max; i++) {
		var color = array[i];
		list += "<div class='list-group-item' style='background-color:" + color.toUpperCase() + "'>" + color + "</div>\n";
	}
	//Add the closing tag
	list += "</div>";
	return list;
};
var wrapToCol = (item, col_num) => {
	return `<div class='col-md-${col_num}'>${item}</div>\n\t`;
};
var wrapToSuccessPanel = (item) => {
	var panel = "\n<div class='panel panel-success'>\n\t";
	panel += "<div class='panel-heading text-center'>\n\t\tColors\n\t</div>\n\t"
	panel += `<div class='panel-body'>\n\t\t${item}\n\t</div>\n`;
	panel += "</div>";
	return panel;
};
var log = (o) => console.log(o);
var createColorLists = (colorList) => {
	var div = (a, b) => Math.floor(a / b);
	var mod = (a, b) => a % b;
	var maxCol = 12;
	var arraySize = colorList.length;
	var numofrows = div(arraySize, 4);
	if (mod(arraySize, 4))
		numofrows++;
	var colorIndex = 0;
	var rowIndex = 0;
	var remaining = arraySize - div(arraySize, 4);
	var str = "<div class = 'container'>\n\t<div class='row'>";
	var listmod = mod(arraySize, 2);
	for (var i = 0; i < numofrows; i++) {
		if (i && !mod(rowIndex, maxCol)) {
			str += "\n\t\t</div>\n\t<div class='row'>";
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
		var panel = wrapToSuccessPanel(ul);
		var wrapped = wrapToCol(panel, colnum);
		str += wrapped;
		colorIndex += 4;
	}
	str += "\n\t\t</div>\n\t</div>\n";
	return str;
};
$(function() {
	loadFromDisk();
	$("#colorexamples").on("click", ".list-group-item", function() {
		var color = $(this).html();
		$("body").css("background", color);
	});
	$("#shuffle").on("click", function() {
		shuffleArray(array);
		var markup = createColorLists(array);
		$("body").css("background", cur);
		$("#colorexamples").html(markup);
	});
	$("#sort").on("click", function() {
		array = array.sort();
		var markup = createColorLists(array);
		$("body").css("background", cur);
		$("#colorexamples").html(markup);
	});
});

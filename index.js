var colors = ["#0091d8", "#00acd8", "#ff8541", "#ffe541", "#4dc4ff", "#e40026"];
var t = ["red", "green", "green", "orange", "black", "grey", "blue", "brown", "aliceblue", "lightblue", "lightsteelblue", "gold", "yellow", "lightyellow", "darkorange", "lightgreen", "lightgrey"];
var createList = function(colorString) {
	var array = colorString.split(',');
	var max = array.length;
	//Create the opening tag
	var list = "<div class='list-group'>";
	for (var i = 0; i < max; i++) {
		var color = array[i];
		list += "<div class='list-group-item' style='background-color:" + color + "'>" + color + "</div>";
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
var createColorLists = function(colorList){
	var div = (a,b)=>Math.floor(a/b);
	var mod = (a,b)=>a % b;
	var maxCol = 12;
	var arraySize = colorList.length;
	var totalLists = div(arraySize,4);
	if(mod(arraySize,4))
		totalLists++;
	var colorIndex = 0;
	var remaining = arraySize - div(arraySize,4);
	var str = "<div class = 'container'><div class='row'>";
	for(var i = 0;i < totalLists;i++)
	{
		if(i && !mod(i,maxCol)){
			str+="</div><div class='row'>";
		}
		var colorString = colorList.slice(colorIndex,colorIndex+4).join(",");
		colorIndex+=4;
		var ul = createList(colorString);
		var wrapped = wrapToCol(ul,6);
		str+=wrapped;
	}
	str+="</div></div>";
	return str;
};
$(function() {
	var markup = createColorLists(t);
	$("#colorexamples").html(markup);
	$(".list-group-item").on("click", function() {
		var color = $(this).html();
		$("body").css("background", color);
	});
});

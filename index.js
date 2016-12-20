var colors = ["#e22d00","#2f688e","#6ed3cf","#9ad3de",
"#89bdd3","#89bdd3","#89bdd3","#c8be51",
"#0091d8", "#00acd8", "#ff8541", "#ffe541",
 "#4dc4ff", "#e40026","#98dafc","#6534ff",
 "#62bcfa","#e05038","#c43235","#f2b632",
 "#D32F2F","#F44336","#FF5722"];
/*var t = colors.slice(0);
for(var r of colors)
	t.push(r);*/
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
	var rowIndex = 0;
	var remaining = arraySize - div(arraySize,4);
	var str = "<div class = 'container'><div class='row'>";
	for(var i = 0;i < totalLists;i++)
	{
		if(i && !mod(rowIndex,maxCol)){
			str+="</div><div class='row'>";
		}
		rowIndex+=6;
		var colorString = colorList.slice(colorIndex,colorIndex+4).join(",");
		colorIndex+=4;
		var ul = createList(colorString);
		var wrapped = wrapToCol(ul,remaining==1&& i >= totalLists?12:6);
		str+=wrapped;
	}
	str+="</div></div>";
	return str;
};
$(function() {
	var markup = createColorLists(Array.from(new Set(colors)).sort());
	$("#colorexamples").html(markup);
	$(".list-group-item").on("click", function() {
		var color = $(this).html();
		$("body").css("background", color);
	});
});

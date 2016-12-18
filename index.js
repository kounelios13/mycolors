var colors = ["#0091d8", "#00acd8", "#ff8541", "#ffe541", "#4dc4ff", "#e40026"];
function readColorsFromDisk(){
	//function thar reads the color from a txt file

}
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
var createColorLists= function(outputPanel,colorlist){
	if(!colorlist || !outputPanel)
		throw new Error("Please enter a valid html element and a vali color list");
	var out = $(outputPanel);
	var index = 0;
	var max = colorlist.length;
	var maxdiv = Math.floor(max / 4);
	var mode = max % 4;
	var str = "<div class='container'>div class='row'>";
	for(var i = 0 ; i < max; i++){
		if(i && i % 4 == 0)
			str+="</div><div class='row'>";
		str+=createList(colorlist.slice(index,index+4).join(","));
		index+=4;
	}
	str+="</div></div>";
	return str;
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
	createColorLists("#coloeexamples",colors);
});

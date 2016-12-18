var colors = ["#0091d8","#00acd8","#ff8541","#ffe541","#4dc4ff","#e40026"];
function createSamples(outputPanel){
	var samples = "<div class='row'>";
	for(var i = 0,max = colors.length; i < max; i++){
		var color = colors[i];
		samples+="<div class='col-md-3'><div class = 'sample' style='background-color:"+color+"'></div></div>";
		if(i % 4 == 0 && i>0)
			samples+="</div><div class='row'>";
	}

	samples+="</div>";
	$(outputPanel).html(samples);
}
$(function(){
	createSamples("#colorexamples");
});
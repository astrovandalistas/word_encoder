
$(document).foundation();



var rad = Math.PI / 180;
function segment(cx, cy, r, startAngle, endAngle, params) {
	var x1 = cx + r * Math.cos(-startAngle * rad),
	x2 = cx + r * Math.cos(-endAngle * rad),
	y1 = cy + r * Math.sin(-startAngle * rad),
	y2 = cy + r * Math.sin(-endAngle * rad);

	return paper.path(["M", cx, cy, "M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2]).attr(params);

}	





var paper;

var strokeWidth = 20;

window.onload = function() {

	paper = new Raphael(document.getElementById('canvas'));

	var text  = "Hello Fucked Up World";

	var words = text.split(" ");


	for( wordIndex in words ) {

		wordIndex = parseInt( wordIndex );

		var word = words[wordIndex];

		wc = new WordCircle();
console.log( wc );
		wc.setText( word );

		wc.draw();

		
	}


    	//sector( 100, 100, 30, 90, 135,{'stroke':'#fa0'})

}	
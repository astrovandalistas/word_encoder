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

var strokeWidth = 10;
var lineStrokeWidth = 4;

var wcs = [];

window.onload = function() {}


var textFile = null,
makeTextFile = function (text) {
	var data = new Blob([text], {type: 'image/svg+xml'});

    if (textFile !== null) {
    	window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};

$(document).ready(function(){

	paper = new Raphael(document.getElementById('canvas'));




	setInterval(function(){

    	paper.clear();

		for(var i = wcs.length - 1; i > -1; i-- ) {
			if(wcs[i].deleteMe){
				wcs.splice(i, 1);
			}
			else{
				wcs[i].draw();
			}
		}

		for( var i = 0; i < wcs.length - 1; i++ ) {


			var p1 = wcs[ i ].getPosition();
			var p2 = wcs[ i + 1 ].getPosition();

    		var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);


    		var startX = p1.x + ( Math.cos( angleRadians ) * wcs[i].getRadius() );
    		var startY = p1.y + ( Math.sin( angleRadians ) * wcs[i].getRadius() );


    		var endX = p2.x - ( Math.cos( angleRadians ) * wcs[i+1].getRadius() );
    		var endY = p2.y - ( Math.sin( angleRadians ) * wcs[i+1].getRadius() );

			paper.path("M" + startX + " " + startY + " L " +  endX + " " + endY ).attr({'stroke-width': lineStrokeWidth});
		}
		$('#download a').attr('target','_blank').attr('href',makeTextFile(paper.toSVG())).attr('download', '');

	}, 300);


	addRepeatable();


})


function addRepeatable() {

	var newRepeatable = $('.repeatable.hidden').clone().appendTo('#text_input').removeClass('hidden');

	newRepeatable.find('.add_button ').click(function(){

		var word = newRepeatable.find('.text_input input').val();
		var width = parseInt( newRepeatable.find('.number_input input').val() );

		console.log( word, width )

		var wc = new WordCircle();

		wc.setStrokeWidth( width );

		wc.setPosition( Math.random() * $('#canvas').width(), Math.random() * $('#canvas').height() );

		wc.setText( word );

		wcs.push( wc );

		newRepeatable.find('.text_input input').val('');
	})
}


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

var wcs = [];

window.onload = function() {

	
    	//sector( 100, 100, 30, 90, 135,{'stroke':'#fa0'})

    }	


    setInterval(function(){
    	paper.clear();
    	for( i in wcs ) {
    		wcs[i].draw();
    	}
    }, 300)


	var textFile = null,
	makeTextFile = function (text) {
		var data = new Blob([text], {type: 'text/plain'});

	    if (textFile !== null) {
	    	window.URL.revokeObjectURL(textFile);
	    }

	    textFile = window.URL.createObjectURL(data);

	    return textFile;
	};

    $(document).ready(function(){
    	console.log("ready")
    	$('#export').click(function(e){
    		var svg = paper.toSVG();
    		$('#download a').attr('target','_blank').attr('href',makeTextFile(svg)).removeClass('disabled');
    		$('#download').removeClass('disabled');




		var create = document.getElementById('create'),
		textbox = document.getElementById('textbox');

		// create.addEventListener('click', function () {
		// 	var link = document.getElementById('downloadlink');
		// 	link.href = makeTextFile(textbox.value);
		// 	link.style.display = 'block';
		// }, false);



	})

    	paper = new Raphael(document.getElementById('canvas'));

    	var text  = "Hello Fucked Up World";

    	var words = text.split(" ");


    	for( wordIndex in words ) {

    		wordIndex = parseInt( wordIndex );

    		var word = words[wordIndex];

    		wc = new WordCircle();

    		wc.setPosition( Math.random() * 1000, Math.random() * 600 );

    		wc.setText( word );

    		wcs.push( wc );

    	}



    })
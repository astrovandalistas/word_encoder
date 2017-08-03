var paper;

var strokeWidth = 10;
var lineStrokeWidth = 4;

var wcs = [];

newText = ""
rawText = ""
wordsArray = []
lastArray = []

var textFile = null


defaultStrokeWidth = 10

startedTyping = false

$(document).ready(function(){

	$('#v2-text_input').html( "click here and start typing" )

	vcenter($('#v2-text_input-container'))


	paper = new Raphael(document.getElementById('v2-canvas'))

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

      $('#v2-download a').attr('target','_blank').attr('href',makeTextFile(paper.toSVG())).attr('download', '');

	}, 500);


   vcenter($('#v2-text_input-container'))


   $('html').keydown(function(e){

		if( ! startedTyping ) {
			$('#v2-text_input').html( "" )
			startedTyping = true
		}

		console.log("keydown",e.which)

		if( e.which === 8 ) {
         newText = rawText.slice(0,-1)
			e.preventDefault()
			rawText = newText
      }

      $('#v2-text_input').html( newText )

		vcenter($('#v2-text_input-container'))

		updateGlyph()


	})

   $('html').keypress(function(e){

      // disable firefox spacebar scrolling

		if( ! startedTyping ) {
			$('#v2-text_input').html( "" )
			startedTyping = true
		}
		
      if (e.which == 32 && e.target == document.body) {
         e.preventDefault();
      }

      // backspace:
      if( e.which === 8 ) {
         newText = rawText.slice(0,-1)
      } else {
         newText = $('#v2-text_input').html() + String.fromCharCode(e.which)
      }


      $('#v2-text_input').html( newText )

      rawText = newText

      // updateTextArray()

      vcenter($('#v2-text_input-container'))

      // update glyph model
      updateGlyph()

   })



})




function updateGlyph() {

   wordsArray = rawText.split(" ")

   console.log(wordsArray[ wordsArray.length - 1 ])

   if( wordsArray.length > lastArray.length ) {


      var wc = new WordCircle();

		wc.setStrokeWidth( defaultStrokeWidth );

		totalW =
		wc.setPosition(
			$('#v2-canvas').width()*0.2 + (Math.random() * $('#v2-canvas').width()*0.6),
			$('#v2-canvas').height()*0.2 + (Math.random() * $('#v2-canvas').height()*0.6)
		);

		wc.setText( wordsArray[ wordsArray.length - 1 ] );

		wcs.push( wc );


   }

   if( wordsArray.length == lastArray.length ) {
      wcs[wcs.length-1].setText( wordsArray[ wordsArray.length - 1 ] );
   }

   if( wordsArray.length < lastArray.length ) {

      last = wcs.pop()
		last.div.remove()

   }


   lastArray = wordsArray


}





var rad = Math.PI / 180;
function segment(cx, cy, r, startAngle, endAngle, params) {

	var x1 = cx + r * Math.cos(-startAngle * rad),
	x2 = cx + r * Math.cos(-endAngle * rad),
	y1 = cy + r * Math.sin(-startAngle * rad),
	y2 = cy + r * Math.sin(-endAngle * rad);

	return paper.path(["M", cx, cy, "M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2]).attr(params);

}



function vcenter(contenedores){

   contenedores.each(function(){

      contenedor = $(this)

      hijos = contenedor.children()

      // vamos a eliminar el marginTop del primer hijo
      hijos.first().css({
         marginTop: 0
      })
      // vamos a eliminar el marginBottom del ultimo hijo
      hijos.last().css({
         marginBottom: 0
      })

      alturaHijos = 0

      // recorrer cada uno de sus hijos para obtener su altura
      hijos.each(function(){

         hijo = $(this)

         // sumar la altura de cada hijo a la altura total
         alturaHijos += hijo.outerHeight(true)

      })

      diferencia = contenedor.height() - alturaHijos

      distanciaParaCentrar = diferencia / 2

      contenedor.css({
         paddingTop: distanciaParaCentrar
      })

   })
}


makeTextFile = function (text) {

	var data = new Blob([text], {type: 'image/svg+xml'});

    if (textFile !== null) {
    	window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
}

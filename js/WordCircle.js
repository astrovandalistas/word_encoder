
function WordCircle() {


	this.text = "";
	this.x = 0;
	this.y = 0;

	WordCircle.prototype.setPosition = function ( x, y  ) {
		this.x = x;
		this.y = y;
	}
	WordCircle.prototype.getX = function() {
		return this.x;
	}
	WordCircle.prototype.getY = function() {
		return this.y;
	}
	WordCircle.prototype.getPosition = function() {
		return { x : this.x, y : this.y }
	}


	WordCircle.prototype.setText = function( text ) {
		this.text = text;
	}
	WordCircle.prototype.getText = function() {
		return this.text;
	}


	WordCircle.prototype.draw = function() {

		for(letterIndex in this.text ) {

			var byteStr = "";

			letterBinary =  this.text[letterIndex].charCodeAt(0).toString(2) ;

			var offset = 8 - letterBinary.length;

			for( i=0; i<offset; i++ ) {
				byteStr += "0";  
			}

			byteStr = byteStr.concat( letterBinary );

			for (j=0; j<8; j++) {

    			var b =  byteStr.charAt(j) ;    			

    			sp =  ( (( 1 * (j) ) ))

    			if ( b == 1 ) {
    				cx1 = (wordIndex + 1) * 250;
    				cy1 = (wordIndex + 1) * 150;

    				cx2 = (wordIndex + 2) * 250;
    				cy2 = (wordIndex + 2) * 150;

    				segment( cx1, cy1, strokeWidth +  (strokeWidth * (letterIndex)),  (j*45) + sp, ((j+1)*45)+sp, { 'stroke' : '#000', 'stroke-width' : strokeWidth - 1 });

    				// if( wordIndex < words.length - 1 )

    				//	 paper.path( "M"+ cx1 + " " + cy1 + " L " + cx2 + " " + cy2  ).attr({ 'stroke-width' : strokeWidth / 2 });	
    			}

    		}


		}

	}



}

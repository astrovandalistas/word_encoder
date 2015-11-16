
function WordCircle() {


	this.text = "";
	this.x = 0;
	this.y = 0;

	this.dragging = false;

	this.div = $('<div>').css({position:'absolute'}).appendTo($('body')).width(300).height(300);
	
	var WC = this;


	WordCircle.prototype.setPosition = function ( x, y  ) {
		this.x = x;
		this.y = y;
		this.updatePosition();
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

console.log( this.x )
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
    				segment( this.x, this.y, strokeWidth +  (strokeWidth * (letterIndex)),  (j*45) + sp, ((j+1)*45)+sp, { 'stroke' : '#000', 'stroke-width' : strokeWidth - 1 });

    			}

    		}


		}

	}



	this.div.mousedown(function(){
		this.dragging = true;
	})

	this.div.mouseup(function(){
		this.dragging = false;		
	})

	this.div.mousemove(function(e){

		if( this.dragging ) {
			
			WC.x = e.pageX;
			WC.y = e.pageY;

			WC.updatePosition();

		}
	})


	WordCircle.prototype.updatePosition = function() {
		this.div.css({left:this.x-150, top: this.y-150});
	}


}

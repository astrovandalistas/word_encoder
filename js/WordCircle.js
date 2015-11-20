var rad = Math.PI / 180;
function segment(cx, cy, r, startAngle, endAngle, params) {
	var x1 = cx + r * Math.cos(-startAngle * rad),
	x2 = cx + r * Math.cos(-endAngle * rad),
	y1 = cy + r * Math.sin(-startAngle * rad),
	y2 = cy + r * Math.sin(-endAngle * rad);

	return paper.path(["M", cx, cy, "M", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2]).attr(params);
}

function WordCircle() {


	this.text = "";
	this.x = 0;
	this.y = 0;

	this.radius = 0;

	this.dragging = false;

	this.div = $('<div>').css({position:'absolute',border:'1px solid black'}).appendTo($('#canvas')).width(300).height(300);

	$('<div>').addClass('text').appendTo(this.div);

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
		this.div.find('.text').html( this.text );

		this.updatePosition();

	}
	WordCircle.prototype.getText = function() {
		return this.text;
	}

	WordCircle.prototype.setStrokeWidth = function( strokeWidth ) {
		this.strokeWidth = strokeWidth;
	}
	
	WordCircle.prototype.getStrokeWidth = function() {
		return this.strokeWidth;
	}	

	WordCircle.prototype.getRadius = function() {
		return this.strokeWidth * ( this.text.length + 1 );
	}
	
	WordCircle.prototype.draw = function() {

		for(letterIndex=0; letterIndex < this.text.length; letterIndex++ ) {

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
    			
    				segment( this.x, this.y, this.strokeWidth +  (this.strokeWidth * (letterIndex)),  (j*45) + sp, ((j+1)*45)+sp, { 'stroke' : '#000', 'stroke-width' : this.strokeWidth - 1 });

    			}

    		}


		}
		var circle = paper.circle(this.x, this.y, this.getRadius()-this.strokeWidth/2+lineStrokeWidth).attr({'stroke':'#000', 'stroke-width':lineStrokeWidth});

	}



	this.div.mousedown(function(){
		WC.dragging = true;
	})

	this.div.mouseup(function(){
		WC.dragging = false;		
	})

	this.div.mousemove(function(e){

		if( WC.dragging ) {
			
			WC.x = e.pageX ;
			WC.y = e.pageY - WC.getRadius();

			WC.updatePosition();

		}
	})


	WordCircle.prototype.updatePosition = function() {
		var r = this.getRadius() * 2;

		console.log( r )
		this.div.css({
			left:this.x - r/2,
			top: this.y,
			width: r,
			height: r
		});

	}


}

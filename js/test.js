/**
* A Simple Vector Shape Drawing App with RaphaelJS and jQuery
* copyright 2010 Kayla Rose Martin - Licensed under the MIT license
* Inspired by http://stackoverflow.com/questions/3582344/draw-a-connection-line-in-raphaeljs
**/
function Circle(startX, startY, width, raphael) {
	var start = {
		x: startX,
		y: startY,
		w: width
	};
	var end = {
		w: width
	};
	var getWidth = function() {
		return end.w;
	};
	var redraw = function() {
		node.attr({r: getWidth()});
	}
	var node = raphael.circle(start.x, start.y, getWidth());
	node.attr({'fill': 'yellow', 'fill-opacity':0.3});
	return {
		updateStart: function(x, y) {
			start.x = x;
			start.y = y;
			redraw();
			return this;
		},
		updateEnd: function(x, y) {
			var v = {
				x: Math.abs(x - start.x),
				y: Math.abs(y - start.y)
			};
//Radius
end.w = Math.sqrt((Math.pow(v.x, 2) + Math.pow(v.y, 2)));
redraw();
return this;
},
clear: function() {
	node.remove();
}
};
};
function Rect(startX, startY, width, height, raphael) {
	var start = {
		x: startX,
		y: startY,
		w: width,
		h: height
	};
	var end = {
		w: width,
		h: height
	};
	var getWidth = function() {
		return end.w;
	};
	var getHeight = function() {
		return end.h;
	};
	var redraw = function() {
		node.attr({width: getWidth(), height: getHeight()});
	}
	var node = raphael.rect(start.x, start.y, getWidth(), getHeight());
	node.attr({'fill': 'red', 'fill-opacity':0.3});
	return {
		updateStart: function(x, y) {
			start.x = x;
			start.y = y;
			redraw();
			return this;
		},
		updateEnd: function(x, y) {
			var v = {
				x: Math.abs(x - start.x),
				y: Math.abs(y - start.y)
			};
//Width
var width = Math.sqrt((Math.pow(v.x, 2) + Math.pow(v.y, 2)));
end.h = width;
end.w = width;
redraw();
return this;
},
clear: function() {
	node.remove();
}
};
};
$(function() {
	var $paper = $("#paper");
	var $controls = $('.control');
	var paper = Raphael("paper",0, 0, 300, 400);
	var painter = {};
	var shapes = [];
	painter.brush = function(){};
	$('.rect').bind('click', function(e){
		$controls.removeClass('active');
		$(this).addClass('active');
		painter.brush = function(e) {
			var shape = Rect(e.layerX, e.layerY, 5, 5, paper);
			shapes.push(shape);
			$paper.bind('mousemove', function(e) {
				shape.updateEnd(e.layerX, e.layerY);
			});
		};
	});
	$('.circ').bind('click', function(){
		$controls.removeClass('active');
		$(this).addClass('active');
		painter.brush = function(e) {
			var shape = Circle(e.layerX, e.layerY, 5, paper);
			shapes.push(shape);
			$paper.bind('mousemove', function(e) {
				shape.updateEnd(e.layerX, e.layerY);
			});
		};
	});
	$('.toggle').bind('click', function(e){
		$paper.toggle();
	});
	$('.clear').bind('click', function(e){
		while(shapes.length > 0)
		{
			var shape = shapes.pop();
			console.log(shape);
			shape.clear();
		}
		$(shapes).each(function(i){
			this.remove();
		}).toggle();
	});
	$paper.bind('mousedown', function(e){
		painter.brush.call(this, e);
	});
	$paper.bind('mouseup', function(e) {
		$(this).unbind('mousemove');
	});
});
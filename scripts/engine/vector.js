define(function(){

	function Vector(x, y){
		this.x = x;
		this.y = y;
	}

	Vector.createFromPoints = function(point1x, point1y, point2x, point2y){
		var x = point2x - point1x;
		var y = point2y - point1y;
		var vectorLength = Math.sqrt(x*x + y*y);
		return new Vector(x/vectorLength, y/vectorLength);
	};
	
	Vector.distance = function(point1x,point1y,point2x,point2y){
		return Math.sqrt(Math.pow(point2x-point1x,2) + Math.pow(point2y-point1y,2));
	};
	Vector.prototype.add = function(otherVector){
		this.x += otherVector.x;
		this.y += otherVector.y;
	};

	Vector.prototype.inverse = function(){
		this.x*=-1;
		this.y*=-1;
	};

	return Vector;
});
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

        return this;
	};

    Vector.prototype.multiply = function(scalar){
        this.x *= scalar;
        this.y *= scalar;

        return this;
    };

	Vector.prototype.inverse = function(){
		this.x*=-1;
		this.y*=-1;

        return this;
	};

	Vector.prototype.length = function(){
		return Math.sqrt(this.lengthSquared());
	};
	
	Vector.prototype.lengthSquared = function(){
		return this.x*this.x+this.y*this.y;
	};
	
	Vector.prototype.normalize = function(){
		var d = this.length();
		this.x /= d;
		this.y /= d;

        return this;
	};

    //
    // static functions that return new vectors
	Vector.dot = function(a,b){
        return a.x*b.x + a.y*b.y;
	};
	
	Vector.multiply = function(a,b){
		if (b instanceof Vector) return new Vector(a.x* b.x, a.y* b.y);
        return new Vector(a.x*b, a.y*b);
	};
	
	Vector.add = function(a,b){
        if (b instanceof Vector) return new Vector(a.x+b.x, a.y+b.y);
        return new Vector(a.x+b, a.y+b);
	};
	
	return Vector;
});
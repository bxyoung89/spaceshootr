//Note!  This class is used for documentation purposes only.  I think doing some sort of inheritance will introduce too much overhead.

define(["engine/vector"], function(Vector){

	function GameObjectBase(){
		this.directionVector = new Vector(0, 0);
		this.x = 0;
		this.y = 0;
		this.sprite = "";
		this.hp = 10;
        this.mass = 1;
		this.damage = 1;
		this.height = 100;
		this.width = 100;
		this.timestampValue = 0;
		this.priorityValue = 0;
		this.idValue = 0;
		this.removed = false;
		this.color = "red";
		this.lastPosition = undefined;
        this.isColliding = false;
	}

	GameObjectBase.prototype.update = function(){
		this.saveLastPosition();
		this.x += this.directionVector[0];
		this.y += this.directionVector[1];
	};

	GameObjectBase.prototype.handleCollision = function(collidingObject){
		//getting hit
		this.hp -= collidingObject.damage;

		//maybe changing vector?
		this.directionVector.inverse();
		this.restoreLastPosition();
	};

    GameObjectBase.bounce = function(a, b)
    {
        var n = Vector.createFromPoints(a.x,a.y, b.x, b.y);
        var t = new Vector(-n.y, n.x);
        var v1 = Vector.multiply(a.directionVector, a.speed);
        var v2 = Vector.multiply(b.directionVector, b.speed);
        var v1n = Vector.dot(n,v1);
        var v1t = Vector.dot(t,v1);
        var v2n = Vector.dot(n,v2);
        var v2t = Vector.dot(t,v2);

        var u1n = (v1n*(a.mass-b.mass) + 2*b.mass*v2n) / (a.mass+b.mass);
        var u2n = (v2n*(b.mass-a.mass) + 2*a.mass*v1n) / (a.mass+b.mass);
        var u1 = Vector.multiply(n,u1n).add(Vector.multiply(t,v1t));
        var u2 = Vector.multiply(n,u2n).add(Vector.multiply(t,v2t));

        a.speed = u1.length();
        a.directionVector = u1.multiply(1/ a.speed);

        b.speed = u2.length();
        b.directionVector = u2.multiply(1/ b.speed);
    }

	GameObjectBase.prototype.priority = function(value){
		if(arguments.length === 0){
			return this.priorityValue;
		}
		this.priorityValue = value;
		return this;
	};

	GameObjectBase.prototype.timestamp = function(value){
		if(arguments.length === 0){
			return this.timestampValue;
		}
		this.timestampValue = value;
		return this;
	};
	
	GameObjectBase.prototype.id = function(value){
		if(arguments.length === 0){
			return this.idValue;
		}
		this.idValue = value;
		return this;
	};


	GameObjectBase.prototype.topLeftCorner = function(){
		return {
			x: this.x - (this.width/2),
			y: this.y - (this.height/2)
		};
	};

	GameObjectBase.prototype.saveLastPosition = function(){
		this.lastPosition = {
			x: this.x,
			y: this.y
		};
	};

	GameObjectBase.prototype.restoreLastPosition = function(){
		this.x = this.lastPosition.x;
		this.y = this.lastPosition.y;
	};

	return GameObjectBase;
});
define(["game/constants"], function(constants){

	var offScreenBoundaryArea = 50;

	function BulletObject(x, y, directionVector){
		this.directionVector = directionVector;
		this.x = x;
		this.y = y;
		this.sprite = "";
		this.hp = constants.bullet.hp;
		this.damage = constants.bullet.damage;
		this.height = constants.bullet.height;
		this.width = constants.bullet.width;
		this.timestampValue = 0;
		this.priorityValue = 0;
		this.idValue = 0;
		this.removed = false;
		this.color = "orange";
		this.speed = constants.bullet.speed;
		this.type = "bullet";
	}

	//TODO NEED TO FIGURE HOW TO PREVENT GOING OFF THE SCREEN
	BulletObject.prototype.update = function(screenWidth, screenHeight){

		var newX = this.x + this.directionVector[0] * this.speed;
		var newXIsOutOfBoundary = newX < offScreenBoundaryArea*-1 || newX > screenWidth - this.width + offScreenBoundaryArea;
		if(newXIsOutOfBoundary){
			this.hp = 0;
		}
		this.x = newX;


		var newY = this.y + this.directionVector[1] * this.speed;
		var newYIsOutOfBoundary = newY < offScreenBoundaryArea*-1 || newY > screenHeight - this.height + offScreenBoundaryArea;
		if(newYIsOutOfBoundary){
			this.hp = 0;
		}
		this.y = newY;
	};

	BulletObject.prototype.handleCollision = function(collidingObject){
		if(collidingObject.type === "bullet"){
			bounceOffX.bind(this)();
			bounceOffY.bind(this)();
			this.speed /=2;
			return;
		}
		this.hp = 0;
	};

	BulletObject.prototype.priority = function(value){
		if(arguments.length === 0){
			return this.priorityValue;
		}
		this.priorityValue = value;
		return this;
	};

	BulletObject.prototype.timestamp = function(value){
		if(arguments.length === 0){
			return this.timestampValue;
		}
		this.timestampValue = value;
		return this;
	};

	BulletObject.prototype.id = function(value){
		if(arguments.length === 0){
			return this.idValue;
		}
		this.idValue = value;
		return this;
	};

	function bounceOffX(){
		this.directionVector[0] = this.directionVector[0] > 0 ? -1* Math.random() : Math.random();
	}

	function bounceOffY(){
		this.directionVector[1] = this.directionVector[1] > 0 ? -1* Math.random() : Math.random();
	}



	return BulletObject;
});
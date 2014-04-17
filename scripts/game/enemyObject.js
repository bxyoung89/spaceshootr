define([], function(){

	var offScreenBoundaryArea = 50;

	function EnemyObject(x, y, directionVector){
		this.directionVector = directionVector;
		this.x = x;
		this.y = y;
		this.sprite = "";
		this.hp = 10;
		this.damage = 1;
		this.height = 50;
		this.width = 50;
		this.timestampValue = 0;
		this.priorityValue = 0;
		this.idValue = 0;
		this.removed = false;
		this.color = "red";
		this.speed = 1;
	}

	//TODO NEED TO FIGURE HOW TO PREVENT GOING OFF THE SCREEN
	EnemyObject.prototype.update = function(screenWidth, screenHeight){
		
		var newX = this.x + this.directionVector[0] * this.speed;
		var newXIsOutOfBoundary = newX < offScreenBoundaryArea*-1 || newX > screenWidth - this.width + offScreenBoundaryArea;
		if(newXIsOutOfBoundary){
			bounceOffX.bind(this)();
			newX = this.x + this.directionVector[0] * this.speed;
		}
		this.x = newX;


		var newY = this.y + this.directionVector[1] * this.speed;
		var newYIsOutOfBoundary = newY < offScreenBoundaryArea*-1 || newY > screenHeight - this.height + offScreenBoundaryArea;
		if(newYIsOutOfBoundary){
			bounceOffY.bind(this)();
			newY = this.y + this.directionVector[1] * this.speed;
		}
		this.y = newY;
	};

	EnemyObject.prototype.handleCollision = function(collidingObject){
		//getting hit
		//this.hp -= collidingObject.damage;

		//maybe changing vector?
		bounceOffX.bind(this)();
		bounceOffY.bind(this)();
	};

	EnemyObject.prototype.priority = function(value){
		if(arguments.length === 0){
			return this.priorityValue;
		}
		this.priorityValue = value;
		return this;
	};

	EnemyObject.prototype.timestamp = function(value){
		if(arguments.length === 0){
			return this.timestampValue;
		}
		this.timestampValue = value;
		return this;
	};

	EnemyObject.prototype.id = function(value){
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



	return EnemyObject;
});
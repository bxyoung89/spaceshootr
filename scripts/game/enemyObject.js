define([], function(){

	function EnemyObject(x, y, directionVector){
		this.directionVector = directionVector;
		this.x = x;
		this.y = y;
		this.sprite = "";
		this.hp = 10;
		this.damage = 1;
		this.height = 5;
		this.width = 5;
		this.timestampValue = 0;
		this.priorityValue = 0;
		this.idValue = 0;
		this.removed = false;
		this.color = "red";
	}

	//TODO NEED TO FIGURE HOW TO PREVENT GOING OFF THE SCREEN
	EnemyObject.prototype.update = function(){
		this.x += this.directionVector[0];
		this.y += this.directionVector[1];
	};

	EnemyObject.prototype.handleCollision = function(collidingObject){
		//getting hit
		this.hp -= collidingObject.damage;

		//maybe changing vector?
		this.directionVector[0] *= -1;
		this.directionVector[1] *= -1;
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



	return EnemyObject;
});
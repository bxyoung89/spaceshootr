define([], function(){

	function PlayerObject(x, y){
		this.directionVector = [0, 0];
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
		this.color = "blue";
	}

	//TODO NEED TO FIGURE HOW TO PREVENT GOING OFF THE SCREEN
	PlayerObject.prototype.update = function(){
		this.x += this.directionVector[0];
		this.y += this.directionVector[1];
	};

	PlayerObject.prototype.handleCollision = function(collidingObject){
		//getting hit
		this.hp -= collidingObject.damage;
	};

	PlayerObject.prototype.priority = function(value){
		if(arguments.length === 0){
			return this.priorityValue;
		}
		this.priorityValue = value;
		return this;
	};

	PlayerObject.prototype.timestamp = function(value){
		if(arguments.length === 0){
			return this.timestampValue;
		}
		this.timestampValue = value;
		return this;
	};

	PlayerObject.prototype.id = function(value){
		if(arguments.length === 0){
			return this.idValue;
		}
		this.idValue = value;
		return this;
	};



	return PlayerObject;
});
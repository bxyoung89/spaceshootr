//Note!  This class is used for documentation purposes only.  I think doing some sort of inheritance will introduce too much overhead.

require([], function(){

	function GameObjectBase(){
		this.directionVector = [0, 0];
		this.x = 0;
		this.y = 0;
		this.sprite = "";
		this.hp = 10;
		this.damage = 1;
		this.height = 100;
		this.width = 100;
		this.timestampValue = 0;
		this.priorityValue = 0;
		this.idValue = 0;
	}

	GameObjectBase.prototype.update = function(){
		this.x += this.directionVector[0];
		this.y += this.directionVector[1];
	};

	GameObjectBase.prototype.handleCollision = function(collidingObject){
		//getting hit
		this.hp -= collidingObject.damage;

		//maybe changing vector?
		this.directionVector[0] *= -1;
		this.directionVector[1] *= -1;
	};

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




});
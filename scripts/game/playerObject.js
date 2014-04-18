define(["game/constants", "engine/gameObjectBase", "engine/vector"], function (constants, GameObjectBase, Vector) {

	function PlayerObject(x, y) {
		this.directionVector = new Vector(0, 0);
		this.x = x;
		this.y = y;
		this.sprite = "";
		this.hp = constants.player.hp;
		this.damage = constants.player.damage;
		this.height = constants.player.height;
		this.width = constants.player.width;
		this.timestampValue = 0;
		this.priorityValue = 0;
		this.idValue = 0;
		this.removed = false;
		this.color = "blue";
		this.type = "player";

		this.keys = {
			"W": false,
			"A": false,
			"S": false,
			"D": false
		};
		this.AWasLast = false;
		this.WWasLast = false;
		this.speed = constants.player.speed;
	}

	PlayerObject.prototype = new GameObjectBase();

	PlayerObject.prototype.update = function (screenWidth, screenHeight) {
		var newX = this.x + this.directionVector.x * this.speed;
		if(newX >= 0 && newX <= screenWidth - this.width){
			this.x = newX;
		}
		var newY = this.y + this.directionVector.y * this.speed;
		if(newY >= 0 && newY <= screenHeight - this.height){
			this.y = newY;
		}
	};

	PlayerObject.prototype.handleCollision = function (collidingObject) {
		//getting hit
		this.hp -= collidingObject.damage;
	};

	PlayerObject.prototype.keyUp = function (key) {
		if (this.keys[key] === undefined) {
			return;
		}
		this.keys[key] = false;
		recalculateDirectionVector.bind(this)();
	};

	PlayerObject.prototype.keyDown = function (key) {
		if (this.keys[key] === undefined) {
			return;
		}
		this.keys[key] = true;
		this.AWasLast = key === "A" && key !== "W" && key !== "S";
		this.WWasLast = key === "W" && key !== "A" && key !== "D";
		recalculateDirectionVector.bind(this)();
	};

	function recalculateDirectionVector() {
		recalculateXDirectionVector.bind(this)();
		recalculateYDirectionVector.bind(this)();
	}

	function recalculateYDirectionVector() {
		if((this.keys.W && this.keys.S)){
			this.directionVector.y = this.WWasLast ? -0.5 : 0.5;
			return;
		}
		if(this.keys.W){
			this.directionVector.y = -1;
			return;
		}
		if(this.keys.S){
			this.directionVector.y = 1;
			return;
		}
		this.directionVector.y = 0;
	}

	function recalculateXDirectionVector() {
		if((this.keys.A && this.keys.D)){
			this.directionVector.x = this.AWasLast ? -0.5 : 0.5;
			return;
		}
		if(this.keys.A){
			this.directionVector.x = -1;
			return;
		}
		if(this.keys.D){
			this.directionVector.x = 1;
			return;
		}
		this.directionVector.x = 0;
	}


	return PlayerObject;
});
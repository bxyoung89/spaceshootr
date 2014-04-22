define(["game/constants"], function (constants) {

	function Sprite(x, y,imageObjectSrc,gameObject) {
		this.image = new Image();
		this.imageObjectSrc = imageObjectSrc;
		this.x = gameObject.x;
		this.y = gameObject.y;
		this.height = gameObject.height;
		this.width = gameObject.width;
	}

	//TODO NEED TO FIGURE HOW TO PREVENT GOING OFF THE SCREEN
	PlayerObject.prototype.update = function (screenWidth, screenHeight) {
		var newX = this.x + this.directionVector[0] * this.speed;
		if(newX >= 0 && newX <= screenWidth - this.width){
			this.x = newX;
		}
		var newY = this.y + this.directionVector[1] * this.speed;
		if(newY >= 0 && newY <= screenHeight - this.height){
			this.y = newY;
		}
	};

	

	PlayerObject.prototype.priority = function (value) {
		if (arguments.length === 0) {
			return this.priorityValue;
		}
		this.priorityValue = value;
		return this;
	};

	PlayerObject.prototype.timestamp = function (value) {
		if (arguments.length === 0) {
			return this.timestampValue;
		}
		this.timestampValue = value;
		return this;
	};

	PlayerObject.prototype.id = function (value) {
		if (arguments.length === 0) {
			return this.idValue;
		}
		this.idValue = value;
		return this;
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
			this.directionVector[1] = this.WWasLast ? -0.5 : 0.5;
			return;
		}
		if(this.keys.W){
			this.directionVector[1] = -1;
			return;
		}
		if(this.keys.S){
			this.directionVector[1] = 1;
			return;
		}
		this.directionVector[1] = 0;
	}

	function recalculateXDirectionVector() {
		if((this.keys.A && this.keys.D)){
			this.directionVector[0] = this.AWasLast ? -0.5 : 0.5;
			return;
		}
		if(this.keys.A){
			this.directionVector[0] = -1;
			return;
		}
		if(this.keys.D){
			this.directionVector[0] = 1;
			return;
		}
		this.directionVector[0] = 0;
	}


	return PlayerObject;
});
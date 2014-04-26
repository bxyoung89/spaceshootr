define(["game/constants", "engine/gameObjectBase"], function(constants, GameObjectBase){

	var offScreenBoundaryArea = 0;

	function BulletObject(x, y, directionVector){
		this.directionVector = directionVector;
		this.x = x;
		this.y = y;
		this.sprite = "";
		this.hp = constants.bullet.hp;
        this.mass = constants.bullet.mass;
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
        this.bounces = 0;
	}

	BulletObject.prototype = new GameObjectBase();

	BulletObject.prototype.update = function(screenWidth, screenHeight){

		this.saveLastPosition();

		var newX = this.x + this.directionVector.x * this.speed;
        if (newX < this.width/2 || newX > screenWidth-this.width/2) {
            this.directionVector.x *= -1;
            this.bounces++;
            newX = this.x + this.directionVector.x * this.speed;
        }

//		var newXIsOutOfBoundary = newX < offScreenBoundaryArea*-1 || newX > screenWidth - this.width + offScreenBoundaryArea;
//		if(newXIsOutOfBoundary){
//			this.hp = 0;
//		}
		this.x = newX;


		var newY = this.y + this.directionVector.y * this.speed;

        if (newY < this.height/2 || newY > screenHeight-this.height/2) {
            this.directionVector.y *= -1;
            this.bounces++;
            newY = this.y + this.directionVector.y * this.speed;
        }
//		var newYIsOutOfBoundary = newY < offScreenBoundaryArea*-1 || newY > screenHeight - this.height + offScreenBoundaryArea;
//		if(newYIsOutOfBoundary){
//			this.hp = 0;
//		}
		this.y = newY;

        if (this.bounces == 2) this.hp = 0;
	};

	BulletObject.prototype.handleCollision = function(collidingObject){
		if(collidingObject.type === "bullet"){
//			bounceOffX.bind(this)();
//			bounceOffY.bind(this)();
//			this.speed /=2;
			return;
		}
		this.hp = 0;
		this.restoreLastPosition();
	};


	function bounceOffX(){
		this.directionVector.x = this.directionVector.x > 0 ? -1* Math.random() : Math.random();
	}

	function bounceOffY(){
		this.directionVector.y = this.directionVector.y > 0 ? -1* Math.random() : Math.random();
	}



	return BulletObject;
});
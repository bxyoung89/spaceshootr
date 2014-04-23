define(["game/constants", "engine/gameObjectBase","game/bulletManager","engine/vector"], function(constants, GameObjectBase,bulletManager,Vector){

	var offScreenBoundaryArea = 50;
	
	function EnemyObject(x, y, directionVector){
		this.directionVector = directionVector;
		this.x = x;
		this.y = y;
		this.sprite = "";
		this.hp = constants.enemy.hp;
        this.mass = constants.enemy.mass;
		this.damage = constants.enemy.damage;
		this.height = constants.enemy.height;
		this.width = constants.enemy.width;
		this.timestampValue = 0;
		this.priorityValue = 0;
		this.idValue = 0;
		this.removed = false;
		this.color = "red";
		this.speed = constants.enemy.speed;
		this.type = "enemy";
		this.timeThatLastBulletWasShot = 0;
		this.timeToShoot = 3;
	}
	EnemyObject.prototype = new GameObjectBase();

	EnemyObject.prototype.update = function(screenWidth, screenHeight, elapsedSeconds){
		this.saveLastPosition();

        // this should be this.position.add(Vector.multiply(this.velocity, timeElapsed));
        this.timeThatLastBulletWasShot += elapsedSeconds;

		if(this.timeThatLastBulletWasShot > this.timeToShoot){
            this.shoot();
			this.timeThatLastBulletWasShot -= this.timeToShoot;
		}

		
		var newX = this.x + this.directionVector.x * this.speed;
		var newXIsOutOfBoundary = newX < offScreenBoundaryArea*-1 || newX > screenWidth - this.width + offScreenBoundaryArea;
		if(newXIsOutOfBoundary){
			bounceOffX.bind(this)();
			newX = this.x + this.directionVector.y * this.speed;
		}
		this.x = newX;
		

		var newY = this.y + this.directionVector.y * this.speed;
		var newYIsOutOfBoundary = newY < offScreenBoundaryArea*-1 || newY > screenHeight - this.height + offScreenBoundaryArea;
		if(newYIsOutOfBoundary){
			bounceOffY.bind(this)();
			newY = this.y + this.directionVector.y * this.speed;
		}
		this.y = newY;
	};

    EnemyObject.prototype.shoot = function(){
        var dir;
        // random
        dir = Vector.random();
        //// towards the player
        // dir = Vector.subtract(GameStateManager.instance.player.position, this.position).normalize();
        //// plus a bit of error
        // var normal = new Vector(-dir.y,dir.x).multiply(Math.random()*0.2);
        // dir.add(normal).normalize();
        bulletManager.shoot(this, dir);

        //
    };

	EnemyObject.prototype.handleCollision = function(collidingObject){
		//getting hit
		this.hp -= collidingObject.damage;
		
//		//maybe changing vector?
//		bounceOffX.bind(this)();
//		bounceOffY.bind(this)();
		this.restoreLastPosition();
	};

	function bounceOffX(){
		this.directionVector.x = this.directionVector.x > 0 ? -1* Math.random() : Math.random();
	}

	function bounceOffY(){
		this.directionVector.y = this.directionVector.y > 0 ? -1* Math.random() : Math.random();
	}

	return EnemyObject;
});
define(["engine/objectList", "game/constants", "game/bulletObject"], function(objectList, constants, BulletObject){

	function BulletManager(){
		objectList.createLayer("bullet", constants.layers.bullet);
	}

	BulletManager.prototype.shoot =function(shootingObject, directionVector){
		var shootingObjectCenterX = shootingObject.x + shootingObject.width/2;
		var shootingObjectCenterY = shootingObject.y + shootingObject.height/2;
		var bulletX = shootingObjectCenterX + (directionVector[0] * shootingObject.width);
		var bulletY = shootingObjectCenterY + (directionVector[1] * shootingObject.height);
		var bullet = new BulletObject(bulletX, bulletY, directionVector);
		objectList.addObject(bullet, "bullet");
	};


	var instance = new BulletManager();
	return instance;
});
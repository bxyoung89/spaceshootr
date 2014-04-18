define(["engine/objectList", "game/constants", "game/bulletObject"], function(objectList, constants, BulletObject){

	function BulletManager(){
		objectList.createLayer("bullet", constants.layers.bullet);
	}

	BulletManager.prototype.shoot =function(shootingObject, directionVector){
		var bulletX = shootingObject.x+ (directionVector.x * (shootingObject.width + constants.bullet.width));
		var bulletY = shootingObject.y + (directionVector.y * (shootingObject.height + constants.bullet.width));
		var bullet = new BulletObject(bulletX, bulletY, directionVector);
		objectList.addObject(bullet, "bullet");
	};


	var instance = new BulletManager();
	return instance;
});
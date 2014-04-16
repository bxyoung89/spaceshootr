requirejs.config({
	paths:{
		"jquery": "lib/jquery-2.1.0.min"
	}
});

define(["engine/eventListener", "engine/renderer", "engine/objectList", "game/enemyObject", "game/playerObject"], function(EventListener, Renderer, objectList, EnemyObject, PlayerObject){

	var player = new PlayerObject(600, 600);
	var enemy1 = new EnemyObject(0, 0, [1, 1]);
	var enemy2 = new EnemyObject(900, 0, [-1, 1]);
	objectList.createLayer("enemy", 1);
	objectList.createLayer("player", 9999);

	objectList.addObject(player, "player");
	objectList.addObject(enemy1, "enemy");
	objectList.addObject(enemy2, "enemy");

	var eventLister = new EventListener(player);
	var renderer = new Renderer("game-canvas");

	renderer.startRenderLoop();


});
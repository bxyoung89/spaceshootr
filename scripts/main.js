requirejs.config({
	paths:{
		"jquery": "lib/jquery-2.1.0.min"
	}
});

define(["game/eventListener", "engine/renderer", "engine/objectList", "game/enemyObject", "game/playerObject", "engine/vector","game/gameStateManager"], function(EventListener, Renderer, objectList, EnemyObject, PlayerObject, Vector, gameStateManager){


	var player = new PlayerObject(600, 600);
    gameStateManager.setPlayer(player);
	var enemy1 = new EnemyObject(0, 0, new Vector(1, 1),gameStateManager);
	var enemy2 = new EnemyObject(900, 0, new Vector(-1, 1),gameStateManager);

	objectList.createLayer("enemy", 1);
	objectList.createLayer("player", 2);

	objectList.addObject(player, "player");
	objectList.addObject(enemy1, "enemy");
	objectList.addObject(enemy2, "enemy");

	var eventLister = new EventListener(player);
	var renderer = new Renderer("game-canvas");

	renderer.startRenderLoop();


});
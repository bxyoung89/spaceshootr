define(["jquery", "game/bulletManager", "engine/vector"], function($, bulletManager, Vector){

	function EventListener(playerObj){
		this.player = playerObj;
		$(window).keydown(handleKeyDown.bind(this));
		$(window).keyup(handleKeyUp.bind(this));
		$(window).click(handleClick.bind(this));
	}

	function handleKeyDown(){
		var key = event.keyCode;
		var keyString = String.fromCharCode(key);
		this.player.keyDown(keyString);
	}

	function handleKeyUp(){
		var key = event.keyCode;
		var keyString = String.fromCharCode(key);
		this.player.keyUp(keyString);
	}

	function handleClick(){
		bulletManager.shoot(this.player, Vector.createFromPoints(this.player.x, this.player.y, event.x, event.y));
	}

	return EventListener;
});
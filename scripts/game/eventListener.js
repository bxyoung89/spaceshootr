define(["jquery", "game/bulletManager"], function($, bulletManager){

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
		var vectorX = event.x - this.player.x;
		var vectorY = event.y - this.player.y;
		var normalizedX = vectorX / (Math.abs(vectorX) + Math.abs(vectorY));
		var normalizedY = vectorY / (Math.abs(vectorX) + Math.abs(vectorY));

		bulletManager.shoot(this.player, [normalizedX, normalizedY]);
	}

	return EventListener;
});
define([], function(){

	function EventListener(playerObj){
		this.player = playerObj;
		window.onkeydown = handleKeyDown.bind(this);
		window.onkeyup = handleKeyUp.bind(this);
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

	return EventListener;
});
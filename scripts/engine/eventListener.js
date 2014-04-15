define([], function(){

	function EventListener(playerObj){
		this.player = playerObj;
		window.onkeydown = handleKeyDown.bind(this);
		window.onkeyup = handleKeyUp.bind(this);
	}

	function handleKeyDown(){
		var key = event.keyCode;
		var keyString = String.fromCharCode(key);
		if(keyString === "W"){
			this.player.directionVector[1] = -1;
			return;
		}
		if(keyString === "A"){
			this.player.directionVector[0] = -1;
			return;
		}
		if(keyString === "S"){
			this.player.directionVector[1] = 1;
			return;
		}
		if(keyString === "D"){
			this.player.directionVector[0] = 1;
			return;
		}
	}

	function handleKeyUp(){
		var key = event.keyCode;
		var keyString = String.fromCharCode(key);
		if(keyString === "W"){
			this.player.directionVector[1] = 0;
			return;
		}
		if(keyString === "A"){
			this.player.directionVector[0] = 0;
			return;
		}
		if(keyString === "S"){
			this.player.directionVector[1] = 0;
			return;
		}
		if(keyString === "D"){
			this.player.directionVector[0] = 0;
			return;
		}

	}

	return EventListener;
});
define(function(){

	return {
		layers: {
			"enemy":1,
			"player": 2,
			"bullet":3
		},
		player: {
			speed: 2,
			height: 100,
			width: 100,
			hp: 100,
			damage: 1
		},
		enemy: {
			speed: 1,
			height: 50,
			width: 50,
			hp: 30,
			damage: 1
		},
		bullet: {
			speed: 5,
			height: 20,
			width: 20,
			hp: 50,
			damage: 5
		}

	};

});
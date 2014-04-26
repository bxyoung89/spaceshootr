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
            mass: 100,
			damage: 1
		},
		enemy: {
			speed: 1,
			height: 50,
			width: 50,
			hp: 30,
            mass: 10,
			damage: 1
		},
		bullet: {
			speed: 2.5,
			height: 10,
			width: 10,
			hp: 50,
            mass: 1,
			damage: 5
		},
        test: {
			speed: 1,
			height: 10,
			width: 10,
			hp: 500,
            mass: 1,
			damage: 5
		}

	};

});

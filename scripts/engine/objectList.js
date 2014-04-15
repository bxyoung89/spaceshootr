require(["engine/objectLayer"], function(ObjectLayer){

	var objects = [];
	var layers = [];
	var layerNameToIndexMap = {};
	var maxObjectId = 0;


	function ObjectList(){

	}

	ObjectList.prototype.createLayer = function(layerName, priority){
		var newLayer = new ObjectLayer(layerName, priority);
		var layerIndex = layers.length;
		layers.push(newLayer);
		layerNameToIndexMap[layerName] = layerIndex;
	};

	ObjectList.prototype.addObject = function(obj, layerName){
		obj.priority(layers[layerNameToIndexMap[layerName]].priority)
			.timestamp((new Date()).getTime())
			.id(maxObjectId++);
		objects.push(obj);
	};

	ObjectList.prototype.removeObject = function(objectId){
		//TODO MAY NEED TO BE OPTIMIZED
		objects = objects.filter(function(obj){
			return obj.id() !== objectId;
		});
	};

	ObjectList.prototype.updateObjects = function(){

		//move all objects
		objects.forEach(function(obj){
			obj.update();
		});

		//detect collisions
		var collisions = [];
		objects.forEach(function(obj, index, array){
			for(var x = index+1; x < array.length; x++ ){
				if(areObjectsColliding(obj, array[x])){
					collisions.push([obj, array[x]]);
				}
			}
		});

		//handleCollisions
		//TODO  HANDLE REMOVED OBJECTS
		collisions.forEach(function(map){
			var a = map[0];
			var b = map[1];
			a.handleCollsion(b);
			b.handleCollsion(a);
			if(a.hp === 0){
				this.removeObject(a);
			}
			if(b.hp === 0){
				this.removeObject(b);
			}
		}, this);

	};

	function areObjectsColliding(a, b){
		var bXWithinAX = (a.x <= b.x && b.x <= (a.x + a.width));
		var aXWithinBX = (b.x <= a.x && a.x <= (b.x + b.width));
		var bYWithinAY = (a.y <= b.y && b.y <= (a.y + a.height));
		var aYWithinBY = (b.y <= a.y && a.y <= (b.y + b.height));

		return (bXWithinAX && bYWithinAY) || (aXWithinBX && aYWithinBY);
	}








	var instance = new ObjectList();
	return instance;
});
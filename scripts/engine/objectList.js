define(["engine/objectLayer"], function(ObjectLayer){

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

	ObjectList.prototype.getLayers = function(){
		return layers;
	};

	ObjectList.prototype.getObjects = function(){
		return objects;
	};

	ObjectList.prototype.addObject = function(obj, layerName){
		obj.priority(layers[layerNameToIndexMap[layerName]].priority)
			.timestamp((new Date()).getTime())
			.id(maxObjectId++);
		objects.push(obj);
	};

	ObjectList.prototype.removeObject = function(object){
		//TODO MAY NEED TO BE OPTIMIZED
		object.removed = true;
		objects = objects.filter(function(obj){
			return obj.id() !== object.id();
		});
	};

	ObjectList.prototype.updateObjects = function(screenWidth, screenHeight){
		var objectsToRemove = [];

		//move all objects
		objects.forEach(function(obj){
			obj.update(screenWidth, screenHeight);
			if(obj.hp === 0){
				objectsToRemove.push(obj);
			}
		});

		objectsToRemove.forEach(function(obj){
			this.removeObject(obj);
		}, this);

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
		collisions.forEach(function(map){
			var a = map[0];
			var b = map[1];
			if(a.removed || b.removed){
				return;
			}
			a.handleCollision(b);
			b.handleCollision(a);
			if(a.hp === 0){
				this.removeObject(a);
			}
			if(b.hp === 0){
				this.removeObject(b);
			}
		}, this);

	};

	function areObjectsColliding(a, b){
		var aTopLeftCorner = a.topLeftCorner();
		var bTopLeftCorner = b.topLeftCorner();
		var bXWithinAX = (aTopLeftCorner.x <= bTopLeftCorner.x && bTopLeftCorner.x <= (aTopLeftCorner.x + a.width));
		var aXWithinBX = (bTopLeftCorner.x <= aTopLeftCorner.x && aTopLeftCorner.x <= (bTopLeftCorner.x + b.width));
		var bYWithinAY = (aTopLeftCorner.y <= bTopLeftCorner.y && bTopLeftCorner.y <= (aTopLeftCorner.y + a.height));
		var aYWithinBY = (bTopLeftCorner.y <= aTopLeftCorner.y && aTopLeftCorner.y <= (bTopLeftCorner.y + b.height));

		return (bXWithinAX && bYWithinAY) || (aXWithinBX && aYWithinBY);
	}

	var instance = new ObjectList();
	return instance;
});
define(["engine/objectLayer", "engine/vector", "engine/quadTree"], function(ObjectLayer, Vector, QuadTree){

	var objects = [];
	var layers = [];
	var layerNameToIndexMap = {};
	var maxObjectId = 0;
    var bounds = {x:0,y:0,width:100,height:100};
    var quadTree = new QuadTree(bounds, false, 4);

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


        quadTree.clear();
        bounds.width = screenWidth;
        bounds.height = screenHeight;
        quadTree.insert(objects);

		//detect collisions
		var collisions = [];
        objects.forEach(function(obj){
            var items = quadTree.retrieve(obj)
            for (var i=0; i<items.length; i++)
            {
                var item = items[i];
                if (obj === item) continue;
                if (obj.isColliding && item.isColliding) continue;
                if(areObjectsColliding(obj, item)){
                    collisions.push([obj, item]);
                    obj.isColliding = item.isColliding = true;
                }
            }
        });

//		objects.forEach(function(obj, index, array){
//			for(var x = index+1; x < array.length; x++ ){
//				if(areObjectsColliding(obj, array[x])){
//					collisions.push([obj, array[x]]);
//				}
//			}
//		});

		//handleCollisions
		collisions.forEach(function(map){
			var a = map[0];
			var b = map[1];
			if(a.removed || b.removed){
				return;
			}

			a.handleCollision(b);
			b.handleCollision(a);
            obj.isColliding = item.isColliding = false;

            if(a.hp === 0){
				this.removeObject(a);
			}
			if(b.hp === 0){
				this.removeObject(b);
			}
		}, this);

	};

	function areObjectsColliding(a, b){
        var distance = Vector.distance(a.x, a.y, b.x, b.y);
        var aRadius = a.width/2;
        var bRadius = b.width/2;
        return aRadius+bRadius > distance;
	}

	var instance = new ObjectList();
	return instance;
});
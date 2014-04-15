define(["engine/objectList"], function(objectList){

	function Renderer(canvasId){
		this.canvas = document.getElementById(canvasId);

	}

	Renderer.prototype.render = function(){
		objectList.updateObjects();
		//TODO may need to worry about layers with same priority
		var layerList = objectList.getLayers();
		var priorityList = layerList.map(function(layer){
			return layer.priority;
		}).sort();
		var objects = objectList.getObjects();

		//resets the drawing;
		this.canvas.width = this.canvas.width;

		//TODO may need to optimize
		priorityList.forEach(function(priority){
			var matchingObjects = objects.filter(function(obj){
				return obj.priority() === priority;
			});
			matchingObjects.forEach(function(obj){
				var canvasContext = this.canvas.getContext("2d");
				canvasContext.fillStyle = obj.color;
				canvasContext.fillRect(obj.x, obj.y, obj.width, obj.height);
			}, this);
		}, this);

	};


	Renderer.prototype.startRenderLoop = function(){
		window.setInterval(this.render.bind(this), 20);
	};


	return Renderer;
});
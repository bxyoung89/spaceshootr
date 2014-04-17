define(["jquery", "engine/objectList"], function($, objectList){

	function Renderer(canvasId){
		this.canvas = document.getElementById(canvasId);

	}

	Renderer.prototype.render = function(){
		var screenWidth = $(document).width();
		var screenHeight = $(document).height();
		objectList.updateObjects(screenWidth, screenHeight);
		//TODO may need to worry about layers with same priority
		var layerList = objectList.getLayers();
		var priorityList = layerList.map(function(layer){
			return layer.priority;
		}).sort();
		var objects = objectList.getObjects();

		//resets the drawing;
		this.canvas.width = screenWidth;
		this.canvas.height = screenHeight;

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
		window.setInterval(this.render.bind(this), 1);
	};


	return Renderer;
});
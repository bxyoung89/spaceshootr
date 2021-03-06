define(["jquery", "engine/objectList"], function($, objectList){

	function Renderer(canvasId){
		this.canvas = document.getElementById(canvasId);

	}

    var lastUpdate;

	Renderer.prototype.render = function(){
		var screenWidth = $(document).width();
		var screenHeight = $(document).height();

        var now = Date.now();
        var elapsed = (now - this.lastUpdate)/1000.0 || 0;
        this.lastUpdate = now;

		objectList.updateObjects(screenWidth, screenHeight, elapsed);

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
				var ctx = this.canvas.getContext("2d");
                ctx.fillStyle = obj.color;
				var topLeftCorner = obj.topLeftCorner();
                ctx.beginPath();
                //arc(x, y, radius, startAngle, endAngle, anticlockwise)
                ctx.arc(obj.x, obj.y,obj.width/2,0,Math.PI*2,false);
                ctx.fill();

                //ctx.fillRect(topLeftCorner.x, topLeftCorner.y, obj.width, obj.height);
			}, this);
		}, this);

	};


	Renderer.prototype.startRenderLoop = function(){
		window.setInterval(this.render.bind(this), 1);
	};


	return Renderer;
});
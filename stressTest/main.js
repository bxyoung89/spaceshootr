requirejs.config({
    paths:{
        "jquery": "../scripts/lib/jquery-2.1.0.min",
        "engine": "../scripts/engine",
        "game": "../scripts/game"
    }
});

define(["game/eventListener", "engine/renderer", "engine/objectList", "game/testObject", "engine/vector"], function(EventListener, Renderer, objectList, TestObject, Vector){
    var screenWidth = $(document).width();
    var screenHeight = $(document).height();

    objectList.createLayer("test", 1);

    for(var x = 0; x < 200; x++){
        var randomNumber = Math.round(Math.random() * 5);
        var test = new TestObject(Math.random() * screenWidth,
                Math.random() * screenHeight, new Vector(
               (randomNumber % 2 === 0 ? -1 : 1) * Math.random(),
               (randomNumber % 4 === 0 ? -1 : 1) * Math.random()));

        // tests elastic collisions of objects with different masses
        test.width = test.height = Math.round(Math.random() * 20 + 5);
        test.mass = test.width*test.width;
        objectList.addObject(test, "test");
    }

    var renderer = new Renderer("game-canvas");

    renderer.startRenderLoop();


});
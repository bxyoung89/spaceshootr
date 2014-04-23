define(["game/constants"], function(constants){

    function GameStateManager(){

    }
    GameStateManager.prototype.setPlayer = function(player){
        this.player = player;
    };
    var instance = new GameStateManager();
    return instance;
});
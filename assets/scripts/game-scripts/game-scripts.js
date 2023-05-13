/** @type {HTMLCanvasElement} */
document.addEventListener('DOMContentLoaded', function() {    
    console.log('The page has finished loading!');
    //https://www.youtube.com/watch?v=GFO_txvwK_c
    //Prep canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    
    let GameMeta = {
        canvas: {
            width: 800,
            height: 700,
            ctx: ctx
        },
        gameFrame: 0,
        staggerFrames: 5
    };

    let GameObjects = [];

    canvas.width = GameMeta.canvas.width;
    canvas.height = GameMeta.canvas.height;

    let gameFrame = GameMeta.gameFrame;
    let staggerFrames = GameMeta.staggerFrames;

    let parallaxBG = new GameBackground();
    parallaxBG.setGameMeta(GameMeta);
    parallaxBG.setAssetData({
        width: 2400, 
        height: 700, 
        src: "/assets/background"
    });

    parallaxBG.setBackgroundData([        
        { "src": "layer-1.png", "speed": 0.2 },
        { "src": "layer-2.png", "speed": 0.4 },
        { "src": "layer-3.png", "speed": 0.6 },
        { "src": "layer-4.png", "speed": 0.8 },
        { "src": "layer-5.png", "speed": 1 }
    ]);

    GameObjects.push(parallaxBG);
    /////////////////////
    let player = new GamePlayer();
    player.setGameMeta(GameMeta);
    player.setAssetData({
        width: 575, 
        height: 523, 
        dir: "/assets/characters/shadow-dog",
        file: "shadow-dog.png",
        scale: 0.3
    });
    player.setAnimationStates([
        {
            "name": "idle",
            "frames": 7,
            "index": 0
        },
        {
            "name": "run",
            "frames": 9,
            "index": 3
        }
    ]);
    player.setAdjustY(110);
    player.setState('run');
    GameObjects.push(player);
    /////////////////////
    // console.log(parallaxBG.DrawData);
    animate = function() {
        ctx.clearRect(0, 0, GameMeta.canvas.width, GameMeta.canvas.width);
        
        GameObjects.forEach((obj, index) => {
            obj.setGameFrame(GameMeta.gameFrame);
            obj.update();
            obj.draw();
            if(obj.constructor.name == 'GameEffects' && obj.getMetaData().loop == 1) {
                GameObjects.splice(index, 1);
            }
        });

        GameMeta.gameFrame++;

        // console.log(GameMeta.gameFrame);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('click', function(e) {
        let canvasPosition = canvas.getBoundingClientRect();
        let positionX = e.clientX - canvasPosition.left;
        let positionY = e.clientY - canvasPosition.top;
        let explode = new GameEffects('explosion');

        explode.setGameMeta(GameMeta);
        explode.setAssetData({
            width: 200, 
            height: 179, 
            dir: "/assets/effects",
            file: "boom.png",
            // scale: 1
        });
        explode.setAnimationStates([
            {
                "name": "explode",
                "frames": 5,
                "index": 0
            }
        ]);
        explode.setXY(positionX, positionY);
        explode.setState('explode');
        GameObjects.push(explode);
    });    
});

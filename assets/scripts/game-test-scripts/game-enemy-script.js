document.addEventListener('DOMContentLoaded', function() {    
    console.log('The page has finished loading!');
    //https://www.youtube.com/watch?v=GFO_txvwK_c
    //Prep canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;
    const numberOfEnemies = 100;
    const enemiesArray = [];

    let gameFrame = 0;
    let staggerFrames = 5;
    let gameMeta = {
        canvas: {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            ctx: ctx
        }
    };
    // async function loadGameData() {
    //     // animate();
    // }

    // loadGameData();

    for(let i = 0; i < numberOfEnemies; i++) {
        let enemy = new GameEnemy('Enemy'+i);
        enemy.setGameMeta(gameMeta);
        enemiesArray.push(enemy);
    }

    animate = function() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameFrame++;

        enemiesArray.forEach(enemy => {
            enemy.update();
            enemy.setGameFrame(gameFrame);
            enemy.draw();
        });
        
        requestAnimationFrame(animate);
    }
    animate();
});
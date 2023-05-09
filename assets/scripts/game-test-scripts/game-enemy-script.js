document.addEventListener('DOMContentLoaded', function() {    
    console.log('The page has finished loading!');
    //https://www.youtube.com/watch?v=GFO_txvwK_c
    //Prep canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;
    const GameCharacters = {};

    let gameFrame = 0;
    let staggerFrames = 5;


    async function loadGameData() {
        let characterData = {
            "main": {
                "url": "/assets/characters/shadow-dog"
            }
        };
      
        // Load the character data for each character
        for (const characterName in characterData) {

        }

        animate();
    }
      

    loadGameData();

    animate = function() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        let mainChar = GameCharacters["main"];
        let position = Math.floor(gameFrame/ staggerFrames) % mainChar.spriteAnimations[mainChar.characterState].loc.length;
        let frameX = mainChar.spriteWidth * position;
        let frameY = mainChar.spriteAnimations[mainChar.characterState].loc[position].y;

        ctx.drawImage(mainChar.getImage(), frameX, frameY, mainChar.spriteWidth, mainChar.spriteHeight, 0 ,0 , mainChar.spriteWidth, mainChar.spriteHeight);
        gameFrame++;
 
        requestAnimationFrame(animate);
    }
});
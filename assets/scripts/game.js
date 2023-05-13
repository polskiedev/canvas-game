/** @type {HTMLCanvasElement} */
document.addEventListener('DOMContentLoaded', function() {    
    console.log('The page has finished loading!');
    //https://www.youtube.com/watch?v=GFO_txvwK_c
    //https://opengameart.org/content/magic-sfx-sample
    //Prep canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 700;
    const GameCharacters = {};

    //Prep game globals
    let gameFrame = 0;
    let staggerFrames = 5;

    // Create background images
    const BACKGROUND_WIDTH = 2400;
    const BACKGROUND_HEIGHT = 700;
    let backgrounds = [];//[
    //     { src: "../assets/background/layer-1.png", speed: 0.2 },
    //     { src: "../assets/background/layer-2.png", speed: 0.4 },
    //     { src: "../assets/background/layer-3.png", speed: 0.6 },
    //     { src: "../assets/background/layer-4.png", speed: 0.8 },
    //     { src: "../assets/background/layer-5.png", speed: 1 }
    // ];
    //////////////////////


    async function loadGameData() {
        let characterData = {
            "avatar": {
                "url": "/assets/characters/shadow-dog"
            }
        };
      
        // Load the character data for each character
        for (const characterName in characterData) {
          let url = characterData[characterName].url;
          const response = await fetch(url + '/character-data.json');
          const data = await response.json();
      
          GameCharacters[characterName] = new GameCharacter(characterName, url);
          GameCharacters[characterName].loadData(data);

          if(characterName == "avatar") {
            const select = document.getElementById('animations');
            const options = GameCharacters[characterName].getStates();
            select.innerHTML = '';

            for (let i = 0; i < options.length; i++) {
            const option = document.createElement('option');
            option.value = options[i];
            option.text = options[i];
            select.add(option);
            }

            select.addEventListener('change', function(e){
                GameCharacters[characterName].setState(e.target.value);
            });
          }
        }

        const gameBG = new ParallaxBackground("/assets/background");
        const bgResponse = await fetch(gameBG.getDataFileURL());
        const bgData = await bgResponse.json();

        gameBG.loadData(bgData);
        backgrounds = gameBG.updateBG();
        
        animate();
    }
      
    loadGameData();

    animate = function() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
        // Loop through background images
        backgrounds.forEach(bg => {
            // Calculate position and size of background image
            let x = (gameFrame * bg.speed) % BACKGROUND_WIDTH;
            let y = 0;

            ctx.drawImage(bg.img, x - BACKGROUND_WIDTH, y, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
            ctx.drawImage(bg.img, x, y, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
        });
        
        let avatar = GameCharacters["avatar"];
        let position = Math.floor(gameFrame/ staggerFrames) % avatar.spriteAnimations[avatar.state].loc.length;

        let meta = avatar.getMetaData();
        let scale = meta.scale ?? 1;
        let img = avatar.getImage();

        let sx = avatar.spriteWidth * position;
        let sy = avatar.spriteAnimations[avatar.state].loc[position].y;
        let sWidth = avatar.spriteWidth;
        let sHeight = avatar.spriteHeight;

        let dx = (CANVAS_WIDTH - (avatar.spriteWidth * scale)) / 2;
        let dy = CANVAS_HEIGHT - ((avatar.spriteHeight * scale) + 100);
        let dWidth = avatar.spriteWidth * scale;
        let dHeight = avatar.spriteHeight * scale;
        
        ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        gameFrame++;
 
        requestAnimationFrame(animate);
    }
});
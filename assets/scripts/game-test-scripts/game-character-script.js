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
            "avatar": {
                "url": "/assets/characters/shadow-dog"
            }
        };
      
        // Load the character data for each character
        for (const characterName in characterData) {
          const url = characterData[characterName].url;
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

        animate();
    }
      

    loadGameData();

    animate = function() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        let avatar = GameCharacters["avatar"];
        let position = Math.floor(gameFrame/ staggerFrames) % avatar.spriteAnimations[avatar.state].loc.length;
        let frameX = avatar.spriteWidth * position;
        let frameY = avatar.spriteAnimations[avatar.state].loc[position].y;

        ctx.drawImage(avatar.getImage(), frameX, frameY, avatar.spriteWidth, avatar.spriteHeight, 0 ,0 , avatar.spriteWidth, avatar.spriteHeight);
        gameFrame++;
 
        requestAnimationFrame(animate);
    }
});
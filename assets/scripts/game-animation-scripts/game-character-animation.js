class GameCharacter {
    constructor(characterName, dataURL = '') {
      this.logger = true;
      this.name = characterName;
      this.dataURL = dataURL ?? '';
      this.characterImage = '';
      this.spriteHeight = 0;
      this.spriteWidth = 0;
      this.state = 'run';
      this.spriteAnimations = [];
      this.metaData = {};

      this.printLog(`Added character ${this.name} on ${this.state} state`);
    }

    getImage() {
      const img = new Image();
      img.src = this.characterImage;
      return img;
    }

    setState(state) {
      let states = this.getStates();
      
      if (states.includes(state)) {
        this.state = state;
        this.printLog(`${this.name} started to ${state}.`);
      } else {
        this.printLog(`${state} is not available.`);
      }
    }

    setMetaData(data) {
      this.metaData = data;
    }

    getMetaData() {
      return this.metaData;
    }

    getStates() {
      let states = [];
      return Object.keys(this.spriteAnimations);
    }

    setSpriteData(spriteData) {
      this.characterImage = this.dataURL + '/' + spriteData.image ?? this.name + '.png';
      this.spriteHeight = spriteData.height;
      this.spriteWidth = spriteData.width;
    }

    setAnimationStates(animationStates) {
      animationStates.forEach((state, index) => {
        let frames = {
          loc: []
        };

        for(let j = 0; j < state.frames; j++) {
          let positionX = j * this.spriteWidth;
          let positionY = index * this.spriteHeight;
          frames.loc.push({x: positionX, y: positionY});
        }
        this.spriteAnimations[state.name] = frames;
      });
    }

    loadData(jsonData){
      this.setSpriteData(jsonData.sprite);
      this.setAnimationStates(jsonData.animationStates);
      this.setMetaData(jsonData.metaData);
    }

    setDataURL(url) {
      this.dataURL = url;
    }
    
    printLog(logData) {
      if(this.logger) console.log(logData);
    }

    test() {
      console.log(`Game Character ${this.name} test`);
    }
}
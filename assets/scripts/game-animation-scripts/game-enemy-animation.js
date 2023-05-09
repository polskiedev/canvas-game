class Enemy {
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

      this.printLog(`Added enemy ${this.name} on ${this.state} state`);
    }
    

    loadData(jsonData){
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
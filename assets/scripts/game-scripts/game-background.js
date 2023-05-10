class GameBackground {
  static instanceCount = 0;

  constructor(name) {
    GameBackground.instanceCount++;
    
    this.name = name ?? this.constructor.name;
    this.logger = true;
    this.initialize();
    this.printLog(`Added ${this.name}#${GameBackground.instanceCount} on the game.`);
  }

  initialize() {
    this.backgrounds = [];
    this.GameMeta = {
      gameFrame: 0,
      canvas: {
        ctx: null
      }
    };
    this.AssetData = {
      imgsrc: ''
    };
    this.MetaData = {
      backgrounds: []
    };
    this.DrawData = [];
  }

  setGameMeta(data) {
    this.GameMeta = data;
  }

  setAssetData(data) {
    let {width, height, src} = data;
    src = src ?? dir + "/" + file;
    
    this.AssetData.width = width;
    this.AssetData.height = height;
    this.AssetData.imgsrc = src;
  }

  setCanvas(ctx) {
    this.GameMeta.canvas.ctx = ctx;
  }

  setMetaData(data) {
    this.MetaData = data;
  }

  getMetaData() {
    return this.MetaData;
  }

  setGameFrame(gameFrame) {
    this.GameMeta.gameFrame = gameFrame;
  }

  setBackgroundData(data) {
    data.forEach((background, index) => {
      let speed = background.speed;
      let src = this.AssetData.imgsrc + '/' + background.src;
 
      const img = new Image();
      img.src = src;

      this.MetaData.backgrounds[index] = {img, speed};
    });
  }

  update() {
    this.DrawData = [];
    this.MetaData.backgrounds.forEach(obj => {
      // Calculate position and size of background image
      let x = (this.GameMeta.gameFrame * obj.speed) % this.AssetData.width;
      let y = 0;
      this.DrawData.push({obj, x, y});
    });
  }

  draw() {
    this.DrawData.forEach(bg => {
      let {obj, x, y} = bg;
      let width = this.AssetData.width;
      let height = this.AssetData.height;

      this.GameMeta.canvas.ctx.drawImage(obj.img, x, y, width, height);
      this.GameMeta.canvas.ctx.drawImage(obj.img, x - width, y, width, height);
    });
  }

  printLog(logData) {
    if(this.logger) console.log(logData);
  }

  test() {
    console.log(`${this.constructor.name} test`);
  }
}

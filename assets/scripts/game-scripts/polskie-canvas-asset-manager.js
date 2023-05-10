class PolskieCanvasAssetManager {
    static instanceCount = 0;

    constructor(characterName) {
        PolskieCanvasAssetManager.instanceCount++;
        this.name = characterName ?? this.constructor.name;
        this.logger = false;
        this.initialize();
        this.printLog(`Added ${this.name}#${PolskieCanvasAssetManager.instanceCount} on the game.`);
    }

    initialize() {
        this.GameMeta = {
            gameFrame: 0,
            canvas: {
                ctx: null
            }
        };
        this.AssetData = {};
        this.MetaData = {
            animationStates: [],
            state: "idle"
        };
        this.DrawData = {
            sx: 0,
            sy: 0,
            sWidth: 0,
            sHeight: 0,
            dx: 0,
            dy: 0,
            dWidth: 0,
            dHeight: 0,
        };
    }

    setGameMeta(data) {
        this.GameMeta = data;
    }

    setAssetData(data) {
        let {width, height, scale, dir, file, src} = data;
        src = src ?? dir + "/" + file;
        
        this.AssetData.width = width;
        this.AssetData.height = height;
        this.AssetData.scale = scale;
        this.AssetData.imgsrc = src;
        this.AssetData.img = {dir, file};
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
    
    getStates() {
        let states = [];
        return Object.keys(this.MetaData.animationStates);
    }

    setState(state) {
        let states = this.getStates();

        if (states.includes(state)) {
            this.MetaData.state = state;
            this.printLog(`${this.name} started to ${state}.`);
        } else {
            this.printLog(`${state} is not available.`);
        }
    }

    setAnimationStates(data) {
        data.forEach((state, index) => {
            let row = state.index ?? index;
            let frames = {
                loc: []
            };

            for(let j = 0; j < state.frames; j++) {
                let posX = j * this.AssetData.width;
                let posY = row * this.AssetData.height;
                frames.loc.push({x: posX, y: posY});
            }

            this.MetaData.animationStates[state.name] = frames;
        });
    }

    setGameFrame(gameFrame) {
        this.GameMeta.gameFrame = gameFrame;
    }

    update() {
        let obj = this.MetaData.animationStates[this.MetaData.state];
        let position = Math.floor(this.GameMeta.gameFrame/ this.GameMeta.staggerFrames) % obj.loc.length;
        let scale = this.AssetData.scale ?? 1;

        let sx = this.AssetData.width * position;
        let sy = obj.loc[position].y;
        let sWidth = this.AssetData.width;
        let sHeight = this.AssetData.height;

        let dx = (this.GameMeta.canvas.width - (this.AssetData.width * scale)) / 2;
        let dy = this.GameMeta.canvas.height - (this.AssetData.height * scale);
        let dWidth = this.AssetData.width * scale;
        let dHeight = this.AssetData.height * scale;

        dy -= 120;//adjustments?

        this.DrawData = {sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight};
    }
    
    getImage() {
        const img = new Image();
        img.src = this.AssetData.imgsrc;

        return img;
    }

    draw() {
        let {sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight} = this.DrawData;
        this.GameMeta.canvas.ctx.drawImage(this.getImage(), sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
    
    printLog(logData) {
      if(this.logger) console.log(logData);
    }
  
    test() {
      console.log(`${this.constructor.name}#${GameCharacter.instanceCount} test`);
    }
  }
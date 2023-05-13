class GameEffects extends PolskieCanvasAssetManager {
    static instanceCount = 0;

    constructor(effectName) {
        GameEffects.instanceCount++;
        super(effectName);
        
        this.name = effectName ?? this.constructor.name;
        this.initialize();
        this.printLog(`Added ${this.name}#${GameEffects.instanceCount} on the game.`);
    }

    after_initialize() {
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = './assets/sounds/boom.wav';
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

        dx = this.MetaData.position.x;
        dy = this.MetaData.position.y;
        
        this.timer++;
        if(this.timer % 5 === 0) {
            if(this.MetaData.frame == 0) {
                this.sound.play();
            }

            this.MetaData.frame++;

            if(obj.frames == this.MetaData.frame) {
                this.MetaData.frame = 0;
                this.MetaData.loop++;
            }
    
            this.DrawData = {sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight};
        }
    }

    test() {
        console.log(`${this.constructor.name}#${GameEffects.instanceCount} test`);
    }
  }

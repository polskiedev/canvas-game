class GameEnemy extends PolskieCanvasAssetManager {
    static instanceCount = 0;

    constructor(characterName) {
        GameEnemy.instanceCount++;
        super(characterName);
        
        this.name = characterName ?? this.constructor.name;
        this.initialize();
        this.printLog(`Added ${this.name}#${GameEnemy.instanceCount} on the game.`);
    }

    test() {
        console.log(`${this.constructor.name}#${GameEnemy.instanceCount} test`);
    }
  }
  
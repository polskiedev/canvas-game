class GamePlayer extends PolskieCanvasAssetManager {
  static instanceCount = 0;

  constructor(characterName) {
    GamePlayer.instanceCount++;
    super(characterName);
    
    this.name = characterName ?? this.constructor.name;
    this.logger = true;
    this.initialize();
    this.printLog(`Added ${this.name}#${GamePlayer.instanceCount} on the game.`);
  }
}

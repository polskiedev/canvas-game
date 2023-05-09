class GameHelper {
    constructor() {
        this.logger = true;
        this.printLog(`Game Helper loaded`);
    }

    printLog(logData) {
      if(this.logger) console.log(logData);
    }

    test() {
      console.log(`Game Helper test`);
    }
}
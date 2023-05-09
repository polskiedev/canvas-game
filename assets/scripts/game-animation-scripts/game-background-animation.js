class ParallaxBackground {
    constructor(dataURL = '', dataFile = 'background-data.json') {
      this.logger = true;
      this.dataURL = dataURL ?? '';
      this.dataFileURL = '';
      this.setDataFileURL(this.dataURL, dataFile);
      this.backgrounds = [];
      this.width = 0;
      this.height = 0;
      this.printLog(`Added background layer`);
    }   

    setDataFileURL(dataURL = '', dataFile = '') {
        this.dataFileURL = dataURL + '/' + dataFile;
    }
    
    setBackgroundDimensions(data){
        this.width = data.width;
        this.height = data.height;
    }

    setParallaxBackground(data){
        this.backgrounds = data;
    }

    loadData(jsonData) {
        this.setParallaxBackground(jsonData.background);
        // this.setBackgroundDimensions(jsonData.dimensions);
    }

    updateBG() {
        // Loop through background images
        this.backgrounds.forEach((background, index) => {
            let speed = background.speed;
            let src = this.dataURL + '/' + background.src;

            const img = new Image();
            img.src = src;
           
            // Draw background image
            this.backgrounds[index] = {...background, "img": img};
        });
        return this.backgrounds;
    }

    getDataFileURL() {
        return this.dataFileURL;
    }

    printLog(logData) {
      if(this.logger) console.log(logData);
    }

    test() {
      console.log(`Background Layers test`);
    }
}
document.addEventListener('DOMContentLoaded', function() {    
    console.log('The page has finished loading!');
    //Prep canvas
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;
    const BACKGROUND_WIDTH = 2400;
    const BACKGROUND_HEIGHT = 600;
    // Create background images
    const backgrounds = [
        { src: "../assets/background/layer-1.png", speed: 0.2 },
        { src: "../assets/background/layer-2.png", speed: 0.4 },
        { src: "../assets/background/layer-3.png", speed: 0.6 },
        { src: "../assets/background/layer-4.png", speed: 0.8 },
        { src: "../assets/background/layer-5.png", speed: 1 }
    ];
    const images = [];
    let loadedImages = 0;
    backgrounds.forEach((bg) => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === backgrounds.length) {
                requestAnimationFrame(render);
            }
        };
        img.src = bg.src;
        images.push({ img, speed: bg.speed });
    });
    
    // Render function
    function render() {
        // Clear canvas
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
        // Loop through background images
        images.forEach((bg, index) => {
            // Calculate position and size of background image
            const x = (gameFrame * bg.speed) % BACKGROUND_WIDTH;
            const y = 0;
        
            // Draw background image
            ctx.drawImage(bg.img, x - BACKGROUND_WIDTH, y, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
            ctx.drawImage(bg.img, x, y, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
            ctx.drawImage(bg.img, x + BACKGROUND_WIDTH, y, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
        });
    
        // Update game frame and stagger frame
        gameFrame++;
        staggerFrame = (staggerFrame + 1) % STAGGER_MAX;
    
        // Request next frame
        requestAnimationFrame(render);
    }
    
    // Start rendering
    let gameFrame = 0;
    const STAGGER_MAX = 10;
    let staggerFrame = 0;
    requestAnimationFrame(render);
});

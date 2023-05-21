/** @type {HTMLCanvasElement} */
document.addEventListener('DOMContentLoaded', function() {
    console.log('The page has finished loading!');

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 700;

    let game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        game.update(deltaTime);
        game.draw();
        // enemy1.test();
        // console.log(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});
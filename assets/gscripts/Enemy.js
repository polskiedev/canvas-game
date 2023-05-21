class Enemy extends CanvasGameObject {
    static instanceCount = 0;

    constructor(game) {
        super(game);
        this.game = game;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height;
        this.markedForDeletion = false;

        this.frameX = 0;
        this.maxFrame = 5;
        this.frameInterval = 100;
        this.frameTimer = 0;
    }

    update(deltaTime) {
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) this.markedForDeletion = true;

        if(this.frameTimer > this.frameInterval) {
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Worm extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        
        this.x = this.game.width;
        // this.y = Math.random() * this.game.height;
        this.y = this.game.height - this.height;
        this.image = worm;
        this.vx = Math.random() * 0.1 + 0.1;
    }
}

class Ghost extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.image = ghost;
        this.vx = Math.random() * 0.2 + 0.1;
        this.angle = 0;
        this.curve = Math.random() * 3;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.04;
    }
    draw(){
        this.game.ctx.save();
        this.game.ctx.globalAlpha = 0.5;
        super.draw();
        this.game.ctx.restore();
    }
}

class Spider extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        
        this.x = Math.random() * this.game.width;
        // this.y = Math.random() * this.game.height;
        this.y = 0 - this.height;
        this.image = spider;
        this.vx = 0;
        this.vy = Math.random() * 0.1 + 0.1;
        this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime) {
        super.update(deltaTime);
        if(this.y < 0 - this.height * 2) this.markedForDeletion = true;
        
        this.y += this.vy * deltaTime;
        if(this.y > this.maxLength) this.vy *= -1;
    }
    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(this.x + this.width/2, 0);
        this.game.ctx.lineTo(this.x + this.width/2, this.y + 10);
        this.game.ctx.stroke();
        super.draw();
    }
}

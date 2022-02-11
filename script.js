"use strict";
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let drawOn = false;
class Root {
    constructor(x, y) {
        this.color = Math.floor(Math.random() * 360);
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.growSpeed = Math.random() * 0.2 + 0.1;
        this.size = Math.random() * 10 + 10;
        this.maxSize = Math.random() * 5 + 4;
        this.lightness = Math.floor(Math.random() * 20);
        this.angleX = Math.random() * 6.2;
        this.vAngleY = Math.random() * 0.1 + 0.1;
        this.angleY = Math.random() * 6.2;
        this.vAngleX = Math.random() * 0.1 + 0.1;
        this.x = x;
        this.y = y;
    }
    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.angleX += this.vAngleX;
        this.angleY += this.vAngleY;
        this.color += 1;
        if (this.lightness < 70) {
            this.lightness += 0.25;
        }
        if (this.size > 1) {
            this.size -= this.growSpeed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'hsl(' + this.color + ', 100%,' + this.lightness + '%)';
            ctx.lineWidth = 0.3;
            ctx.stroke();
            ctx.fill();
            requestAnimationFrame(this.update.bind(this));
        }
    }
}
window.addEventListener("mousemove", draw);
window.addEventListener("mousedown", toggleDraw);
window.addEventListener("mouseup", toggleDraw);
function draw(e) {
    if (drawOn) {
        for (let i = 0; i < 3; i++) {
            const root = new Root(e.x, e.y);
            root.update();
        }
    }
}
function toggleDraw() {
    drawOn = !drawOn;
}

/** @type {HTMLCanvasElement} */
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas1");
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawOn: boolean = false;

class Root {
    y: number;
    x: number;
    color = Math.floor(Math.random() * 360);
    speedX: number = Math.random() * 4 - 2;
    speedY: number = Math.random() * 4 - 2;
    growSpeed: number = Math.random() * 0.2 + 0.1;
    size: number = Math.random() * 10 + 10;
    maxSize: number = Math.random() * 5 + 4;
    lightness: number = Math.floor(Math.random() * 20);
    angleX: number = Math.random() * 6.2;
    vAngleY: number = Math.random() * 0.1 + 0.1;
    angleY: number = Math.random() * 6.2;
    vAngleX: number = Math.random() * 0.1 + 0.1;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.angleX += this.vAngleX;
        this.angleY += this.vAngleY;
        this.color += 1;
        if (this.lightness < 100) {
            this.lightness += 0.75;
        }

        if (this.size > 1) {
            this.size -= this.growSpeed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
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
function draw(e: MouseEvent) {
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



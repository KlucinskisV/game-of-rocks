// Setup canvas
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameFrame = 0;
let gameOverstate = false;
ctx.font = '40px Georgia';
const stone = new Image();
const gameOver = new Image();
stone.src = './img/stonemin.png';
gameOver.src = './img/gameOver.png';
const randomFire = new Image();
randomFire.src = './img/tranceFire.png';
const randomMonster = new Image();
randomMonster.src = './img/randomMonsterMod.png'
const cloud = new Image();
cloud.src = './img/cloud.png';

// Mouse engine
let canvasPosit = canvas.getBoundingClientRect()

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

canvas.addEventListener('mousedown', function (e) {
    mouse.click = true;
    mouse.x = e.x - canvasPosit.left;
    mouse.y = e.y - canvasPosit.top;
    console.log(mouse.x, mouse.y);
});
canvas.addEventListener('mouseup', function (e) {
    mouse.click = false;
});
//  Circles stone

class FirstCircle {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height;
        this.radius = 20;

    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x) {
            this.x -= dx / 10;
        }
        if (mouse.y != this.y) {
            this.y -= dy / 10;
        }
    }
    draw() {
        if (mouse.click) {
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            //ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'rgba(62, 173, 121, 0.734)'
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        //ctx.fill();
        ctx.closePath();


        ctx.drawImage(stone, this.x - 30, this.y - 30);


    }


}

const oneCircle = new FirstCircle();

const circleArr = [];

// Random Cicles monster
class randomCicles {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height - Math.random() * canvas.height;
        this.radius = 50;
        this.speed = Math.random() + 1;
        this.distance;
        this.couted = false;
    }
    update() {
        this.x += this.speed;
        const dx = this.x - oneCircle.x;
        const dy = this.y - oneCircle.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);




    }
    draw() {

        ctx.fillStyle = 'rgba(131, 128, 113, 0.556)'
        ctx.drawImage(randomMonster,this.x -60 , this.y-60);
        ctx.drawImage(randomFire,this.x -50 , this.y);
        
        

    }
    
}

function hanlCircle() {
    if (gameFrame % 30 == 0) {
        circleArray.push(new Circle());
        circleArr.push(new randomCicles());
        console.log(circleArr.length);
    }
    for (let i = 0; i < circleArr.length; i++) {
        circleArr[i].update();
        circleArr[i].draw();
        circleArray[i].update();

    }
    for (let i = 0; i < circleArr.length; i++) {
        if (circleArr[i].x >= canvas.width + circleArr[i].radius * 2) {
            circleArr.splice(i, 1);
        }
        if (circleArr[i].x >= canvas.width + circleArr[i].radius * 2) {
            this.x = -this.x;

        }

        if (circleArr[i].distance < circleArr[i].radius + oneCircle.radius) {
            console.log('Point');
            if (!circleArr[i].couted) {
                score++;
                circleArr[i].couted = true;
                circleArr.splice(i, 1);

            }
        }
        if (circleArray[i].distance < circleArray[i].radius + oneCircle.radius) {
            console.log('Point');
            if (!circleArray[i].couted) {
                score++;
                circleArray[i].couted = true;
                circleArray.splice(i, 1);

            }
        }

    }
}
// fly cloud
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw = function () {
        ctx.drawImage(cloud, this.x -40,this.y-35)

    }


    this.update = function () {
        this.draw();
        if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;

        }
        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x -= this.dx;
        this.y -= this.dy;
    }

    

}


let circleArray = [];

for (let i = 0; i < 5; i++) {
    let r = Math.floor(Math.random() * 5) + 25;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let y = Math.random() * (innerHeight - r * 2) + r;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    circleArray.push(new Circle(x, y, dx, dy, r));
    console.log(circleArray)
}

function handlGameOver() {

    if (score === 15) {
        
       
        
        gameOverstate = true;
        ctx.drawImage(gameOver, (canvas.width / 2) - 100, (canvas.height / 2)-75);
    }
}


// Animate

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hanlCircle();
    handlGameOver();
    oneCircle.update();
    oneCircle.draw();
    gameFrame++;
    ctx.fillStyle = 'black';
    ctx.fillText('Score:  ' + score, 30, 70)
     for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    if (!gameOverstate) {        
        requestAnimationFrame(animate);
    };
}

animate();

window.addEventListener('resize', function () {
    canvasPosit = canvas.getBoundingClientRect()
});
// GAME VARIABLES



let jumping = false;
let stopped = false;

let velY = 0;
let impulse = 900;

//Floor
let floorY = 22;
let floorX = 0;
let velEscene = 1280/3;
let gameVel = 1;

//Dino
let dinoPosY = floorY

// Game Settings
let score = 0


let time = new Date();
let deltaTime = 0;
let gravity = 2500;

if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(Init, 1);
}else{
    document.addEventListener('DOMContentLoaded', Init);
}

function Init(){
    time = new Date();
    start();
    loop();
}

let container;
let dino;
let scoreText;
let floor;
let gameOver;

function start(){
    container = document.querySelector('.container');
    dino = document.querySelector('.dino');
    scoreText = document.querySelector('.scoreText');
    floor = document.querySelector('.floor');
    gameOver = document.querySelector('.game-over');
    document.addEventListener('keydown', HandleKeyDown); // Al presionar cualquier tecla, se activa el evento
}

function HandleKeyDown(event){
    if(event.keyCode === 32){
        jump()
    }
}

function jump(){
    if(dinoPosY === floorY){
        console.log('Saltando')
        jumping = true;
        velY = impulse;
        dino.classList.remove('dino-running')
    }
}

function loop(){
    deltaTime = (new Date() - time) / 1000;
    
    time = new Date();
    update();
    requestAnimationFrame(loop);
}

function update(){
    if(stopped) return;
    moveDino()
    moveFloor()
    // decideCreateObstacle()
    // decideCreateClouds()
    // moveObstacles()
    // moveClouds()
    // detectCollision()

    velY -= gravity * deltaTime;
}

function moveDino(){
    dinoPosY += velY * deltaTime;
    // console.log('dinoPosY: ' + dinoPosY);
    if(dinoPosY < floorY){
        touchFloor();
    }
    dino.style.bottom = dinoPosY+'px'
}

function touchFloor(){
    dinoPosY = floorY;
    velY = 0;
    
    if(jumping){
        dino.classList.add('dino-running');
    }
    jumping = false;
}

function moveFloor(){
    floorX += calculateMovement();
    floor.style.left = -(floorX % container.clientWidth) + 'px';
}

function calculateMovement(){
    return velEscene * deltaTime * gameVel
}
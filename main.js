// GAME VARIABLES

let floorY = 22;

let jumping = false;
let stopped = false;

let velY = 0;
let impulse = 900;

let dinoPosY = floorY

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
        saltando = true;
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
    decideCreateObstacle()
    decideCreateClouds()
    moveObstacles()
    moveClouds()
    detectCollision()

    velY -= gravity * deltaTime;
}
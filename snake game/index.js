const playBoard = document.getElementById("playBoard");

let snakeX = 0, snakeY = 0;
let velocityX = 0, velocityY = 0;
let snakeBody = [];

let foodX = 0, foodY =0;

const handleGameOver = () => {
    clearInterval(intervalId);
    alert("Game Over!");
    location.reload();
}
const randomDegree = () => {
    return Math.floor(Math.random() * 20) + 1;
}
 
const directionSnake = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;

    } if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        
    } if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        
    } if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    gameInit();
}
const gameInit = () => {
    if (snakeBody.length === 0) {
        snakeX = randomDegree();
        snakeY = randomDegree();
        snakeBody.push([snakeX, snakeY]);
    }else {
        for (let i = snakeBody.length - 1; i > 0; i--){
            snakeBody[i] = [...snakeBody[i-1]]
           
        }
        snakeBody[0][0] += velocityX;
        snakeBody[0][1] += velocityY;
    }

    if (foodX === 0 && foodY === 0){
        foodX = randomDegree();
        foodY = randomDegree(); 
    }

    let snake = '';
    for(let i = 0; i < snakeBody.length; i++) {
        snake += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;

        if(i != 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            handleGameOver();
        }
    }

    
    if (snakeBody[0][0] === foodX && snakeBody[0][1] === foodY) {
        snakeBody.push([foodX, foodY]);
        foodX = randomDegree();
        foodY = randomDegree(); 
    }

    if (snakeBody[0][1] < 1|| snakeBody[0][0] < 1 || snakeBody[0][1] > 20 || snakeBody[0][0] > 20) {
        handleGameOver();
    }
    let food = `<div class= "food" style="grid-area: ${foodY}/${foodX};"></div>`
    playBoard.innerHTML = snake + food;
}

let intervalId = setInterval(gameInit, 150);
addEventListener('keydown', directionSnake);
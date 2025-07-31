const playBoard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
let gameOver=false;
let foodX ,foodY;
let snakeX=5 ,snakeY=10;
let velocityX =0 , velocityY=0;
let snakeBody=[];
let setIntervalId
let score = 0;
let highScore= localStorage.getItem("high-score")||0;
const moveSound = new Audio('sounds/move.mp3');
const popSound = new Audio('sounds/pop.mp3');
const gameOverSound = new Audio('sounds/gameover.mp3');

const changeFoodPosition = ()=>{
    // passing a random 0-30 value as food
    foodX = Math.floor(Math.random () *30)+1;
    foodY = Math.floor(Math.random () *30)+1;
    // snakeY = Math.floor(Math.random () *30)+1;
    // snakeX = Math.floor(Math.random () *30)+1;

}
const handleGameOver=() =>{
    clearInterval(setIntervalId);
      moveSound.pause();
    gameOverSound.play()
    gameOver = true;

    playBoard.innerHTML += `
        <div class="game-over-screen">
            <div class="game-over-message">Game Over</div>
            <button class="restart-btn" onclick="location.reload()">Restart</button>
        </div>
    `;
     setTimeout(() => {
        location.reload();
    }, 5000);

}
const changeDirection = (e) =>{
    if(e.key==="ArrowUp" && velocityY !=1){
        velocityX=0;
        velocityY=-1;
      
    }else if(e.key==="ArrowDown" && velocityY !=-1){
        velocityX=0;
        velocityY=1;
        
        

    }else if(e.key==="ArrowLeft" && velocityX !=1){
        velocityX=-1;
        velocityY=0;
      
        
    }else if(e.key==="ArrowRight" && velocityX !=-1 ){
        velocityX=1;
        velocityY=0;
      
    }

}

const initGame=()=>{
    moveSound.play()
    if(gameOver)return handleGameOver();
    let htmlMarkup =`<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    if(snakeX === foodX && snakeY ===  foodY){
        changeFoodPosition()
        snakeBody.push([foodX,foodY]);
            popSound.currentTime = 0;
    popSound.play();
        score++;
        highScore=score>=highScore?score :highScore;
        localStorage.setItem("high-score", highScore)
        scoreElement.innerHTML=`Score:${score}`;
        highScoreElement.innerHTML=`High score :${highScore}`
        
        
    }
    for(let i= snakeBody.length-1;i>0; i--){
        snakeBody[i]=snakeBody[i-1]
    }

    snakeBody[0]=[snakeX,snakeY]
    snakeX +=velocityX;
    snakeY +=velocityY;
    if(snakeX <=0|| snakeX>=31 ||snakeY <=0|| snakeY>=31){
     gameOver =true;
    }

    for(let i=0; i<snakeBody.length; i++){
    htmlMarkup +=`<div class="head" style="grid-area : ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    if(i !==0 && snakeBody[0][1] ===snakeBody[i][1]&& snakeBody[0][0]===snakeBody[i][0]){
        gameOver=true
    }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();

 setIntervalId=setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);

const dino=document.getElementById('dino');
const grid=document.getElementById('grid');
const alert=document.getElementById('alert');
const desert=document.getElementById('desert');

let scoreDiv=document.getElementById('score');
let score=0; // to update score
let gameOver=false;
let isJumping=false; 
let dinoPosition=0;


function control(e){ //this function is used to check the clicking buttom is "Space" or not

     if(e.code=='Space'){  // if the code is 'Space' Then call the function 'jump()'

        if(!isJumping && !gameOver){ // if the isJumping=false  and the gameOver = false, then execute the funvtion
            jump();
        }
     }
}

function jump(){
    isJumping=true; // setting isJumping = true ,  to avoid multiple jumps on same time

    let upInterval=setInterval(()=>{  // adding 10px on dino 'bottom' position for each 20ms
          dinoPosition+=10;
          dino.style.bottom=dinoPosition+'px';

          if(parseInt(dino.style.bottom)==140){ //stop the upInterval when bottom of dino==110, because the dino has reached the maximum height for a jump
               clearInterval(upInterval);
                downInterval();
          }
    },22)
}

function downInterval(){
    let downInterval=setInterval(()=>{   // for reducing the 'bottom px'of the dino to reach the ground

        dinoPosition-=10;
        dino.style.bottom=dinoPosition+'px';

        if(parseInt(dino.style.bottom)==0){   // if the bottom of dino ==0 , then clear the 'downInterval' .Because dino reached the ground
            clearInterval(downInterval);
            isJumping=false;
        }
   },22)   
}

function createObstacles(){
    let alert=document.getElementById('alert');

    if(!gameOver){ // if the gameover = false then execute the process
        let obstaclePosition=1300;
        let obstacle=document.createElement('div');
        obstacle.className='obstacle';
       
              let cactusImage=document.createElement('img');
              cactusImage.src='cacti.png';

          obstacle.append(cactusImage)

          obstacle.style.position='absolute'
          obstacle.style.bottom=0+'px'
          obstacle.style.left=obstaclePosition+'px';    
          
        grid.appendChild(obstacle);

        let obstacleInterval=setInterval(()=>{  
            score++; // incrementing score
            scoreDiv.textContent="Your Score : "+score; // displaying the updated score 
           
            gameOver=isTouching(dino,obstacle);
                if(gameOver){
                    clearInterval(obstacleInterval);
                    grid.removeChild(grid.lastChild);

                        // T-rex after dead
                        dinoAfterDead(desert,dino);
                       
                        // Alert Message
                        alert.innerHTML="Game Over ! ";
                        let popUp=document.createElement('div');
                        popUp.id='pop-up';
                        popUp.textContent='Focus bruh :(';
                    grid.append(popUp); // append pop-up to the grid
                }
              obstaclePosition-=10;
              obstacle.style.left=obstaclePosition+'px';

              if(parseInt( obstacle.style.left)==-80){
                  clearInterval(obstacleInterval);  
                  grid.removeChild(grid.lastChild);
                  createObstacles();
              }
          },25)
    }
}
createObstacles()


// checking the two objects touching each other or not , returns boolean value
function isTouching(object1,object2){
    let touch=false;
    if(parseInt(object1.style.bottom)<70 && parseInt(object2.style.left)<20){
      touch=true;
      gameOver=true;
      isJumping=true;
    }
    return touch;
}

// Style for Trex after his death and stop the bg-animation
function dinoAfterDead(bg,trex){
    bg.style.animation='none';

    trex.style.backgroundImage="url('t-rex-dead.png')";
    trex.style.width=72+'px';
    trex.style.height=70+'px';
}

document.addEventListener('keydown',control);



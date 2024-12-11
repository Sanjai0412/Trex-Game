
const dino=document.getElementById('dino');
const grid=document.getElementById('grid');
const alert=document.getElementById('alert');
const desert=document.getElementById('desert');

let isJumping=false; 

let dinoPosition=150;
let count=0;


function control(e){
    if(e.code=='Space'){
       // console.log(e.code);
       if(!isJumping){
          jump();
       }
    }
}

function jump(){

    isJumping=true;
    let Interval=setInterval(()=>{
        dinoPosition-=8;
        count++;
        dino.style.top=dinoPosition+'px';
        if(count==8){
            clearInterval(Interval);
            dinoPosition=80;
            let DownInterval=setInterval(()=>{
                dinoPosition+=8;
                count--;
                dino.style.top=dinoPosition+'px';
                if(count==0){
                    clearInterval(DownInterval)
                    isJumping=false;
                }
            },20)
        }
    },20)
}


document.addEventListener('keydown',control); 


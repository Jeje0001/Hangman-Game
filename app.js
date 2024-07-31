
const keyboard=document.querySelector(".keyboard")
const guesstext=document.querySelector(".incorrect b")
const worddisplay=document.querySelector(".worddisplay")
const hangman=document.querySelector(".mainbox img")
let current;
let wrongguess=0
const maxguess=6
let correct=[]
let gamemodal= document.querySelector(".gamemodal")
const getrandom=()=>{
    const { word , hint} = wordList[Math.floor(Math.random() * wordList.length)]
    console.log(word,hint)
    current=word
    document.querySelector(".hint").innerText=`Hint:${hint}`
    worddisplay.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("")
}
const gameover=(victory)=>{
    setTimeout(()=>{
        const modaltext=victory ? `You found the word` :`The correct word was :`;
        gamemodal.classList.add("show")

    },300)
}
getrandom()
const initgame=(button,clickedletter)=>{
    if (current.includes(clickedletter)){
        [...current].forEach((letter,index)=>{
            if(letter === clickedletter ){
                correct.push(letter)
                worddisplay.querySelectorAll("li")[index].innerText=letter;
                worddisplay.querySelectorAll("li")[index].classList.add("letter");
            }
        })

    }else{
        wrongguess+=1
        hangman.src=`images/hangman-${wrongguess}.svg`
    }
    button.disabled=true;
    guesstext.innerText=`${wrongguess} / ${maxguess}`;

    if (wrongguess == maxguess){
        return gameover(false);
    }
    if (correct.length == current.length){
        return gameover(true);
    }

}
for (let index = 97; index < 123; index++) {
    const button=document.createElement("button")
    button.innerText=String.fromCharCode(index)
    keyboard.appendChild(button)
    button.addEventListener("click",e=>initgame(e.target,String.fromCharCode(index)))

}


// continue at 33:21


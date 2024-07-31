
const keyboard=document.querySelector(".keyboard")
const worddisplay=document.querySelector(".worddisplay")
let current;
wrongguess=0
const maxguess=6
const getrandom=()=>{
    const { word , hint} = wordList[Math.floor(Math.random() * wordList.length)]
    console.log(word,hint)
    current=word
    document.querySelector(".hint").innerText=`Hint:${hint}`
    worddisplay.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("")
}
getrandom()
const initgame=(button,clickedletter)=>{
    if (current.includes(clickedletter)){
        [...current].forEach((letter,index)=>{
            if(letter === clickedletter ){
                worddisplay.querySelectorAll("li")[index].innerText=letter;
                worddisplay.querySelectorAll("li")[index].classList.add("letter");
            }
        })

    }else{
        console.log(clickedletter,"Does not exist")

    }


}
for (let index = 97; index < 122; index++) {
    const button=document.createElement("button")
    button.innerText=String.fromCharCode(index)
    keyboard.appendChild(button)
    button.addEventListener("click",e=>initgame(e.target,String.fromCharCode(index)))

}


// continue at 26:35


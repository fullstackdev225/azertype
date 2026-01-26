const { use } = require("react");

function displayScore(score, totalScore){
    let scoreArea = document.querySelector(".score-area span");
    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector(".proposition-area");
    propositionArea.innerHTML = proposition;
}


function main(){
    //initializing variables...
    let score = 0;
    let totalScore = 3;
    let i = 0;
    let proposition = '';

    //we disapear share button...
    const shareButton = document.getElementById('btn-share');
    shareButton.style.display = "none";

    //user choices an option...
    const word = document.getElementById('word');
    const sentence = document.getElementById('sentence');

    word.addEventListener("click", () => {
        proposition = words;
        displayProposition(proposition[i]);
        sentence.disabled = true;
    });

    sentence.addEventListener("click", () => {
        proposition = sentences;
        displayProposition(proposition[i]);
        word.disabled = true;
    });

    //in playing...
    const userProposition = document.getElementById("user-proposition");
    const validateButton = document.getElementById("btn-validate");

    validateButton.addEventListener("click", () => {
        if(userProposition.value === ''){
            alert("Veuillez entrer une proposition");
        }
         else if(userProposition.value === proposition[i]){
             score++;
             displayScore(score, totalScore);
             i++;
             displayProposition(proposition[i]);
             userProposition.value = '';
         }
          else{
             i++;
             displayProposition(proposition[i]);
             userProposition.value = '';
          }

        if(proposition[i] === undefined){
            displayProposition("Le jeu est termine !");
            userProposition.disabled = true;
            validateButton.disabled = true;
            shareButton.style.display = "flex";
        }
    })

    //we display score...
    displayScore(score, totalScore);
}
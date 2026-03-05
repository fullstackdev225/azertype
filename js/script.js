function displayResult(score, totalScore){
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
    const buttonShare = document.getElementById("btn-share");
    buttonShare.style.display = 'none';

    //user choice...
    const word = document.getElementById("word");
    const sentence = document.getElementById("sentence");

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

    //user plays...
    const userProposition = document.getElementById("user-proposition");
    const buttonValidate = document.getElementById("btn-validate");

    buttonValidate.addEventListener("click", () => {
        if(userProposition.value === ""){
            alert("Veuillez entrer une proposition");
        }
         else if(userProposition.value === proposition[i]){
            score++;
            displayResult(score, totalScore);
            i++;
            displayProposition(proposition[i]);
            userProposition.value = "";
         }
          else{
            i++;
            displayProposition(proposition[i]);
            userProposition.value = "";
          }

          if(proposition[i] === undefined){
            displayProposition("Le jeu est terminé !");
            userProposition.disabled = true;
            buttonValidate.disabled = true;
            buttonShare.style.display = 'flex';
          }
    })

    //we display result...
    displayResult(score, totalScore);
}
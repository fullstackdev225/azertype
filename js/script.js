function displayScore(score, totalScore){
    let scoreArea = document.querySelector(".score-area span");

    scoreArea.innerHTML = `${score} / ${totalScore}`;
}

function displayProposition(proposition){
    let propositionArea = document.querySelector(".proposition-area");

    propositionArea.innerHTML = proposition;
}

function displayError(error){
    const errorMessage = document.querySelector(".error-message");

    errorMessage.innerHTML = error;
}

function gameStart(){
    //initializing variables...
    let score = 0;
    const totalScore = 3;
    let i = 0;
    let proposition;

    //we disable button of share...
    const buttonShare = document.getElementById("btn-share");
    buttonShare.disabled = true;

    //we make a choice...
    const word = document.getElementById("word");
    const sentence = document.getElementById("sentence");

    word.addEventListener("click", () => {
        sentence.disabled = true;
        proposition = words;
        displayProposition(proposition[i]);
    });

    sentence.addEventListener("click", () => {
        word.disabled = true;
        proposition = sentences;
        displayProposition(proposition[i]);
    });

    //we verify user results...
    let userProposition = document.getElementById("user-proposition");
    const buttonValidate = document.getElementById("btn-validate");

    buttonValidate.addEventListener("click", () => {
         if(userProposition.value === ""){
             displayError("Veuillez entrer une proposition");
         }
          else if(userProposition.value === proposition[i]){
              score++;
              displayScore(score, totalScore);
              i++;
              displayProposition(proposition[i]);
              userProposition.value = "";
              displayError("");
          }
           else{
            i++;
            displayProposition(proposition[i]);
            userProposition.value = "";
            displayError("");
           }

        if(proposition[i] === undefined){
            displayProposition("Le jeu est terminé");
            buttonValidate.disabled = true;
            buttonShare.disabled = false;
        }
    });

    displayScore(score, totalScore);
}
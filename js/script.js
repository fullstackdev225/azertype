function displayScore(score, totalScore){
    let scoreArea = document.querySelector(".score-area span");

    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector(".proposition-area");

    propositionArea.innerHTML = proposition;
}


function displayError(error){
    let errorArea = document.querySelector(".error-message");

    errorArea.innerHTML = error;
}


function main(){
    //Initializing variables...
    let score = 0;
    let totalScore = 3;
    let i = 0;
    let proposition;

    //we disable share button...
    const buttonShare = document.getElementById("btn-share");
    buttonShare.disabled = true;

    //we choice an option...
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

    //start of the game by user...
    const userProposition = document.getElementById("user-proposition");
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
            displayError('');
            userProposition.value = "";
         }
          else{
             i++;
             displayProposition(proposition[i]);
             displayError('');
             userProposition.value = "";
          }

          //we stop the game...
          if(proposition[i] === undefined){
             displayProposition("Le jeu est terminé !");
             buttonValidate.disabled = true;
             buttonShare.disabled = false;
          }
    });

    //we display score...
    displayScore(score, totalScore);
}
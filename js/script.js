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
    const totalScore = 3;
    let proposition = '';
    let i = 0;

    //we disapear share button...
    const buttonShare = document.getElementById("btn-share");
    buttonShare.style.display = "none";

    //we let user choice between words and sentences...
    const word = document.getElementById('word');
    const sentence = document.getElementById('sentence');

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

    //we verify responses...
    const userProposition = document.getElementById("user-proposition");
    const buttonValidate = document.getElementById("btn-validate");

    buttonValidate.addEventListener("click", () => {
        if(userProposition.value === ""){
            alert("veuillez entrer une proposition");
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
              buttonValidate.disabled = true;
              buttonShare.style.display = "flex";
          }
    });

    //we display score...
    displayScore(score, totalScore);
}
function displayScore(score, totalScore){
    let scoreArea = document.querySelector('.score-area span');

    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector('.proposition-area');

    propositionArea.innerHTML = proposition;
}


function main(){
    //initializing variables...
    let score = 0;
    let totalScore = 3;
    let i = 0;
    let proposition = "";

    //we disapear share button...
    const shareButton = document.getElementById("btn-share");
    shareButton.style.display = "none";


    //user will choice an option...
    const word = document.getElementById("word");
    const sentence = document.getElementById("sentence");

    word.addEventListener('click', () => {
        sentence.disabled = true;
        proposition = words;
        displayProposition(proposition[i]);
    });

    sentence.addEventListener("click", () => {
        word.disabled = true;
        proposition = sentences;
        displayProposition(proposition[i]);
    });

    //user will text...
    const userProposition = document.getElementById("user-proposition");
    const buttonvalidate = document.getElementById("btn-validate");

    buttonvalidate.addEventListener("click", () => {
        if(userProposition.value === ""){
            alert("Veuillez entrer une proposition !");
        }
         else if(userProposition.value === proposition[i]){
            score++;
            displayScore(score, totalScore);
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
             buttonvalidate.disabled = true;
             shareButton.style.display = "flex";
          }
    })

    //display score...
    displayScore(score, totalScore);
}
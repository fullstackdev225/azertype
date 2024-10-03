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

function emailVerification(email){
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    let result = regex.test(email);

    if(result){
        return true;
    }

    return false;
}

function sendScore(email, name, score){
    let mailto = `mailto:${email}?subject=Partage de score du jeu AzerType&body=Bonjour je me nomme ${name}
 et je voudrais partager avec toi le score ${score} que j'ai obtenu à la fin du jeu.`;

   location.href = mailto;
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

           //we stop the game...
        if(proposition[i] === undefined){
            displayProposition("Le jeu est terminé");
            buttonValidate.disabled = true;
            buttonShare.disabled = false;
        }
    });

    //opening and closing dialog...
    const buttonClose = document.getElementById("btn-close");
    const modal = document.querySelector("dialog");

    buttonShare.addEventListener("click", () => {
        modal.showModal();
    });

    buttonClose.addEventListener("click", () => {
        modal.close();
    });

    //we verify form...
    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let userName = document.getElementById("user-name").value;
        let userEmail = document.getElementById("user-email").value;
        let userScore = `${score} / ${totalScore}`;

        if(emailVerification(userEmail)){
           sendScore(userEmail, userName, userScore);
           errorEmail.innerHTML = "";
        }
         else{
            const errorEmail = document.querySelector(".email-error");
            errorEmail.innerHTML = "Email invalid";
         }
    })

    displayScore(score, totalScore);
}
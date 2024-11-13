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


function sendScore(email, name, score){
    let mailto = `mailto:${email}?subject=Partage de score&body=Bonjour je me nomme ${name}
 et je voudrais partager avec toi le score ${score} que j'ai obtenu à l'issue du jeu.`;
     location.href = mailto;
}


function emailValidation(email){
    let regex = new RegExp("[a-z0-9._-]@+[a-z0-9._-]+\\.[a-z0-9._-]+");

    let result = regex.test(email);

    if(result){
        return true;
    }

    return false;
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

    //opening and closing modal...
    const modal = document.querySelector(".modal");
    const buttonClose = document.getElementById("btn-close");

    buttonShare.addEventListener("click", () => {
        modal.showModal();
    });

    buttonClose.addEventListener("click", () => {
        modal.close();
    });

    //sending score...
    const formModal = document.querySelector(".form");

    formModal.addEventListener("submit", (event) => {
        //we stop prevent default...
        event.preventDefault();

        //we getting data...
        let userName = document.getElementById("user-name").value;
        let userEmail = document.getElementById("user-email").value;
        let userScore = `${score} / ${totalScore}`;
        const errorMessage = document.querySelector(".error-email");

        //we verify email validation...
        if(emailValidation(userEmail)){
            //we send score...
            sendScore(userEmail, userName, userScore);
            errorMessage.innerHTML = "";
        }
         else{
            //we display error message...
            errorMessage.innerHTML = "Email invalid";
         }
    });

    //we display score...
    displayScore(score, totalScore);
}
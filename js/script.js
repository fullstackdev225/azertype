function displayScore(score, totalScore){
    let scoreArea = document.querySelector(".score-area span");

    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector(".proposition-area");

    propositionArea.innerHTML = proposition;
}


function emailValidation(email){
    let regex = new RegExp("[a-z0-9._-]@+[a-z0-9._-]+\\.[a-z0-9._-]+");
    let result = regex.test(email);

    if(result){
        return true;
    }
     else{
        return false;
     }
}

function sendScore(email, name, score){
    let mailto = `mailto:${email}?Subject=Partage de score&body=Bonjour je me nomme ${name} et je voudrais partager avec vous le score ${score} que j'ai obtenu a l'issue du jeu`;
    location.href = mailto;
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

    //opening and closing modal...
    const buttonClose = document.getElementById("btn-close");
    const modal = document.querySelector(".modal");

    buttonShare.addEventListener("click", () => {
        modal.showModal();
    });

    buttonClose.addEventListener("click", () => {
        modal.close();
    });


    const form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const userName = document.getElementById("name").value;
        const userEmail = document.getElementById("email").value;
        let userScore = `${score} / ${totalScore}`;

        if(emailValidation(userEmail)){
            sendScore(userEmail, userName, userScore);
        }
         else{
            alert("Email invalid");
         }
    });

    //we display score...
    displayScore(score, totalScore);
}
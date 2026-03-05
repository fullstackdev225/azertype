function displayResult(score, totalScore){
    let scoreArea = document.querySelector(".score-area span");

    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector(".proposition-area");

    propositionArea.innerHTML = proposition;
}


function emailVerification(email){
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
    let mailto = `mailto:${email}?Subject=Partage de score&body=Salut je me nomme ${name} et je voudrais partager le score ${score} que j'ai obtenue à la fin du jeu`;
    location.href = mailto;
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

    //opening and closing dialog...
    const buttonClose = document.getElementById("btn-close");
    const modal = document.querySelector(".modal");

    buttonShare.addEventListener("click", () => {
        modal.showModal();
    });

    buttonClose.addEventListener("click", () => {
        modal.close();
    });

    //script of the form...
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        //we stop prevent default...
        event.preventDefault();

        //we getting user data...
        const userName = document.getElementById("name").value;
        const userEmail = document.getElementById("email").value;
        const userScore = `${score} / ${totalScore}`;

        //checking informations...
        if(emailVerification(userEmail)){
            sendScore(userEmail, userName, userScore);
        }
         else{
            alert("Email invalid");
         }
    })

    //we display result...
    displayResult(score, totalScore);
}
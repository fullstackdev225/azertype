function displayScore(score, totalScore){
    let scoreArea = document.querySelector(".score-area span");
    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector(".proposition-area");
    propositionArea.innerHTML = proposition;
}

function emailVerification(email){
    let regex = new RegExp("[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\\.[a-zA-Z0-9.-_]+");

    let result = regex.test(email);
    if(result){
        return true;
    }
     else{
        return false;
     }
}

function sendScore(name, email, score){
    let mailto = `mailto:${email}?Subject=Partage de score&body=Bonjour je me nomme ${name} et je voudrais partager le score ${score} que j'ai obtenue a la fin du jeu`;

    location.href = mailto;
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

    //opening and closing dialog...
    const closeButton = document.getElementById("btn-close");
    const modal = document.querySelector("dialog");

    shareButton.addEventListener("click", () => {
        modal.showModal();
    });

    closeButton.addEventListener("click", () => {
        modal.close();
    });

    //form script...
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        //we prevent default
        event.preventDefault();

        const userName = document.getElementById("name").value;
        const userEmail = document.getElementById("email").value;
        const userScore = `${score} / ${totalScore}`;


        if(emailVerification(userEmail)){
            sendScore(userName, userEmail, userScore);
        }
         else{
            alert("L'email est invalid");
         }
    })

    //we display score...
    displayScore(score, totalScore);
}
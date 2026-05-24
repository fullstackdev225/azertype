function displayScore(score, totalScore){
    let scoreArea = document.querySelector('.score-area span');

    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector('.proposition-area');

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


function sendScore(mail, name, score){
    let mailto = `mailto:${mail}?Subject=Partage de score&body=Salut je me nomme ${name} et je voudrais partager le score ${score} que j'ai obtenu à l'issu du jeu.`;
    location.href = mailto;
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

    /* opening & closing dialog */
    const modal = document.querySelector(".modal");
    const closeButtonDialog = document.getElementById("btn-close");

    shareButton.addEventListener("click", () => {
        modal.showModal();
    });

    closeButtonDialog.addEventListener("click", () => {
        modal.close();
    });

    /* form dialog script */

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const userName = document.getElementById("name").value;
        const userEmail = document.getElementById("email").value;
        const userScore = `${score} / ${totalScore}`;

        if(emailValidation(userEmail)){
            sendScore(userEmail, userName, userScore);
        }
         else{
            alert("Adresse email invalide !");
         }
    })


    //display score...
    displayScore(score, totalScore);
}
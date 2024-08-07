function displayScore(score, totalScore){
    let scoreArea = document.querySelector(".score-area span");

    scoreArea.innerHTML = score + " / " + totalScore;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector(".proposition-area");

    propositionArea.innerHTML = proposition;
}

function sendScore(name, email, score){
    let mailto = `mailto:${email}?subject=Partage du score du jeu AzerType&body=Salut je me nomme ${name} et je voudrais partager avec toi le score que j'ai obtenu au jeu : ${score}`;
    location.href = mailto;
}


function startGame(){
    let score = 0;
    let totalScore = 3;
    let i = 0;
    let proposition = wordList;

    let userProposition = document.getElementById("user-proposition");
    let buttonValidate = document.getElementById("validate-button");

    const formMessage = document.querySelector(".message");

    displayProposition(proposition[i]);

    buttonValidate.addEventListener("click", () => {
        if(userProposition.value === ""){
            displayProposition(proposition[i]);
            formMessage.innerHTML = "Veuillez entrer une proposition";
        }
         else if(userProposition.value === proposition[i]){
            score++;
            displayScore(score, totalScore);
            i++;
            displayProposition(proposition[i]);
            userProposition.value = "";
            formMessage.innerHTML = "";
         }
          else{
             i++;
             displayProposition(proposition[i]);
             userProposition.value = "";
             formMessage.innerHTML = "";
          }

          if(proposition[i] === undefined){
             displayProposition("Le jeu est terminé");
             buttonValidate.disabled = true;
          }
    });

    const word = document.getElementById("word");
    const sentence = document.getElementById("sentence");

    word.addEventListener("click", () => {
        sentence.disabled = true;
        proposition = wordList;
        displayProposition(proposition[i]);
    });

    sentence.addEventListener("click", () => {
        word.disabled = true;
        proposition = sentenceList;
        displayProposition(proposition[i]);
    });

    //opening dialog...
    const shareButton = document.getElementById("share-button");
    const modal = document.querySelector(".modal");

    shareButton.addEventListener("click", () => {
        modal.showModal();
    });

    //closing dialog...
    const closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", () => {
        modal.close();
    });

    //sending score...
    const form = document.querySelector(".modal-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let name = document.getElementById("user-name").value;
        let email = document.getElementById("user-email").value;
        let emailScore = `${score} / ${totalScore}`;

        sendScore(name, email, emailScore);
    });
    
    displayScore(score, totalScore);
}
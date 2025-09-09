function displayResult(score, totalScore){
    let scoreArea = document.querySelector('.score-area span');

    scoreArea.innerHTML = `${score} / ${totalScore}`;
}


function displayProposition(proposition){
    let propositionArea = document.querySelector('.proposition-area');

    propositionArea.innerHTML = proposition;
}


function main(){
    //Initialisations de variables...
    let i = 0;
    let score = 0;
    let totalScore = 3;
    let proposition = '';

    //Disparition du bouton partager...
    const shareButton = document.getElementById("btn-share");
    shareButton.style.display = 'none';

    //Choix entre les mots et les phrases...
    const word = document.getElementById('word');
    const sentence = document.getElementById('sentence');

    word.addEventListener('click', () => {
        sentence.disabled = true;
        proposition = words;
        displayProposition(proposition[i]);
    });

    sentence.addEventListener('click', () => {
        word.disabled = true;
        proposition = sentences;
        displayProposition(proposition[i]);
    });

    //l'utilisateur commence a jouer...
    const userProposition = document.getElementById('user-proposition');
    const buttonValidate = document.getElementById('btn-validate');

    buttonValidate.addEventListener('click', () => {
        if(userProposition.value === ''){
            alert('Veuillez entrer une proposition');
        }
         else if(userProposition.value === proposition[i]){
             score++;
             displayResult(score, totalScore);
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
            displayProposition('Le jeu est termine !');
             userProposition.disabled = true;
             buttonValidate.disabled = true;
             shareButton.style.display = 'flex';
          }
    })

    //Affichage du score...
    displayResult(score, totalScore);
}
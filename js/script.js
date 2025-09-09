function displayResult(score, totalScore){
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


function sendScore(email, name, score){
    let mailto = `mailto:${email}?subject=Partage de score&body=Je me nomme ${name} et je voudrais partager le score ${score} que j'ai obtenu a la fin du jeu`;
    location.href = mailto;
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

    //ouverture et fermeture de la boite de dialog...
    const buttonCloseModal = document.getElementById('btn-close');
    const modal = document.querySelector('.modal');

    shareButton.addEventListener('click', () => {
        modal.showModal();
    });

    buttonCloseModal.addEventListener('click', () => {
        modal.close();
    });

    //traitement de l'envoi des donnees du formulaire...
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', (event) => {
        //stop de le comportement par defaut...
        event.preventDefault();

        //on recupere les donnees de l'utilisateur...
        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userScore = `${score} / ${totalScore}`;

        //on verifie si l'email est valide...
        if(emailValidation(userEmail)){
            //on envoie le score...
            sendScore(userEmail, userName, userScore);
        }
         else{
            //mesage d'erreur...
            alert('Entrez une adresse e-mail valide');
         }
    });

    //Affichage du score...
    displayResult(score, totalScore);
}
//Read about the web speech recognition API to understand better

const msgElement = document.querySelector('#msg');

const randNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//I initiated the speech recognition API
//assigned it to variable 'recognition' which will changes as they keep guessing
let recognition = new window.SpeechRecognition();

//Begin voice recognition
recognition.start();

//Function to capture speech event
function onSpeak(e){
    const msg = e.results[0][0].transcript;

    displayMessage(msg);

    checkNumber(msg);
}

//Display what number user says
function displayMessage(msg){
    msgElement.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
    `;
}

//Function to check message against number
function checkNumber(msg) {
    const num = +msg;
    
    //Check if number is valid
    if(Number.isNaN(num)){
        // Message will be added to end of msgElement div
        //This is preferred so we can keep playing if the guess is Not a number
        msgElement.innerHTML += `<div>Sorry, that's not a valid number</div>`;

        // Number won't show unless its a valid number
        // msgElement.innerHTML = `<div>Sorry, that's not a valid number</div>`;
        return; 
    }

    //Check that spoken number is in range
    if(num > 150 || num < 1) {
        msgElement.innerHTML += `<div>Number must be between 1 and 150</div>`;
        return;
    }

    //check number
    if(num === randNum){
        document.body.innerHTML = `
        <h2>Yayy! You guessed the Right Number!!
        <br> <br> It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randNum) {
        msgElement.innerHTML += `<div>GO LOWER</div>`; //append instead of replace
    } else{
        msgElement.innerHTML += `<div>GO HIGHER</div>`;
    }
}

//Function to generate random number
function getRandomNumber() {
    return Math.floor(Math.random() * 150) + 1;
}

//Listen for result event of speech
recognition.addEventListener('result', onSpeak);

//End of speech recognition event?
recognition.addEventListener('end', () => recognition.start());

//Ensure the play-again button works
//Simply adding an event listener to play again
//using the reload method in location object
document.body.addEventListener('click', (e) => {
    if(e.target.id === 'play-again'){
        window.location.reload();
    }
})
let catalogue = {};
const questionNumberElement = document.querySelector("#questionNumber");
const questionElement = document.querySelector("#question");

const answerButton1 = document.querySelector("#answerButton1");
const answerButton2 = document.querySelector("#answerButton2");
const answerButton3 = document.querySelector("#answerButton3");
const answerButton4 = document.querySelector("#answerButton4");
const nextQuestionButton = document.querySelector("#nextQuestionButton");


let allAnswerButtons = [
    answerButton1,
    answerButton2,
    answerButton3,
    answerButton4
];

let correctAnswer = -1;

let currentQuestionIndex = 0;

function shuffleArray(array) {
    //Verweis: selection sort
    array = array.slice(); //liste = list[:]

    let resultArray = [];
    while (array.length > 0) {
        let randomIndex = Math.floor(Math.random() * array.length);
        //Math.floor rundet ab
        //Math.random generiert eine Zahl [0;1)
        resultArray.push(array[randomIndex]);
        //months.splice(start, deleteCount, +item1, +item2, +itemN)
        array.splice(randomIndex, 1);

    };
    return resultArray;

}



function loadJson(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
//Aufruf 
loadJson("./catalogue.json", function (status, json) {
    catalogue = json;
    hideNextQuestionButton();
    //Array randomisieren
    catalogue.questions = shuffleArray(catalogue.questions);




    //Alles was mit dem Laden & Ausführen des json zu tun hat hier direkt rein coden
    displayQuestion(currentQuestionIndex);


});



function displayQuestion(index) {
    //eingefügte class (correct/wrong = Farbzuweisung) im HTML löschen (von vorne anfangen)
    for (let i = 0; i < 4; i++) {
        //Notlösung: allAnswerButtons[i].classList.remove(...allAnswerButtons[i].classList);
        allAnswerButtons[i].classList.remove("wrong", "correct");

    }

    questionNumberElement.innerHTML = currentQuestionIndex + 1;
    const currentQuestionBlock = catalogue.questions[index];

    //Ordnet dem HTML Question Tag seinen Fragetext zu
    questionElement.innerHTML = currentQuestionBlock.text;

    //Schleife: ordnet jedem AnswerButton Tag im HTML seinen Antworttext zu
    for (let i = 0; i < 4; i++) {
        allAnswerButtons[i].innerHTML = currentQuestionBlock.answers[i];
    }

    correctAnswer = currentQuestionBlock.correctAnswer;

    answerButton1.disabled = false;
    answerButton2.disabled = false;
    answerButton3.disabled = false;
    answerButton4.disabled = false;


}

const scoreKeeper = document.querySelector("#score");
let score = 0;


function giveAnswer(number) {

    console.log("Given number", number);
    let correctGuess = correctAnswer == number; // areEqual(correctA, number)
    let guessClass = "wrong";
    if (correctGuess) {
        console.log("You guessed correctly!");
        guessClass = "correct";
        score += 100;
        scoreKeeper.innerText = score;
    } else {
        console.log("Sorry, wrong answer.");
    }
    answerButton1.disabled = true;
    answerButton2.disabled = true;
    answerButton3.disabled = true;
    answerButton4.disabled = true;

    //setzt die guessClass = "correct"/"wrong" als richtige class ins HTML ein; number-1 = der button, welcher geklickt wurde
    allAnswerButtons[number - 1].classList.add(guessClass);

    showNextQuestionButton();

    return score;
}

const questionContainer = document.querySelector('#hideQuestions')
const end = document.querySelector('#end')
const finalScore = document.querySelector('.score')


window.onload = function () {
    end.style.display = 'none';
}

function nextQuestion() {
    if (currentQuestionIndex < 9) {
        console.log(" 'nächste Frage' Button has been clicked")
        hideNextQuestionButton();
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        console.log(currentQuestionIndex)
    } else {
        questionContainer.classList.add('hide');
        end.style.display = 'block';
        finalScore.classList.add('display-5');
        finalScore.textContent = 'Final score'
    }
    return currentQuestionIndex
}

function hideNextQuestionButton() {
    nextQuestionButton.style.visibility = "hidden";
    nextQuestionButton.disabled = true;
}

function showNextQuestionButton() {
    nextQuestionButton.disabled = false;
    nextQuestionButton.style.visibility = "visible";

}
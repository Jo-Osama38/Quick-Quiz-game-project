const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById ('progressText')
const scoreText = document.getElementById ('score')
const progressBarfull = document.getElementById ('progressBarfull')
const load = document.getElementById ('load')
const game = document.getElementById ('game')



let currentQuestion = {};
let acceptingAnswers = false ;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions =>{
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestions=>{
            const formattedQuestion={
                question : loadedQuestions.question
            };
            const answerChoices= [...loadedQuestions.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random()*3)+1;
            answerChoices.splice(formattedQuestion.answer -1 , 0 , loadedQuestions.correct_answer);

            answerChoices.forEach((choice , index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });
            return formattedQuestion;
        });

        startGame();
    })
    .catch (err =>{
        console.error(err);
    });


// make m game is life

const CORRECT_BOUNUS = 10;
const MAX_QUESTIONS = Math.floor(Math.random() * 6) + 5;;

startGame = () => {
    questionCounter =0;
    score = 0 ;
    availableQuesions = [...questions];
    getNewQuestion();
    game.hidden = false;
    load.hidden = true;
};

getNewQuestion = () => {
    if (availableQuesions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore",score);
        localStorage.setItem("questionsPlayed",questionCounter);
        return window.location.assign("end.html")
    }
    questionCounter++;
    progressBarfull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`
    progressText.innerText = `Questions ${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random()* availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach (choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion ['choice' + number]
    })
    availableQuesions.splice(questionIndex , 1);
    acceptingAnswers =true;
};

choices.forEach(choice => {
    choice.addEventListener("click" , e =>{
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply == 'correct'){
            incrementScore(CORRECT_BOUNUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1200);
        
    });
});

incrementScore =num =>{
    score += num;
    scoreText.innerText = score
}
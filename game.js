const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById ('progressText')
const scoreText = document.getElementById ('score')
const progressBarfull = document.getElementById ('progressBarfull')


let currentQuestion = {};
let acceptingAnswers = false ;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "inside which html element do we put the jave",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "what is the correct syntax for referring to and etenal scrotp",
        choice1: "<script href = 'xxx.js'>",
        choice2: "<script name = 'xxx.js'>",
        choice3: "<script src = 'xxx.js'>",
        choice4: "<script file = 'xxx.js'>",
        answer: 3
    },
    {
        question: "how do you  write 'hello world' in an alert box?",
        choice1: "<msgBox('Hello world')>",
        choice2: "<alertBox('Hello world')>",
        choice3: "<msg('Hello world')>",
        choice4: "<alert('Hello world')>",
        answer: 4
    },
]

// make m game is life

const CORRECT_BOUNUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter =0;
    score = 0 ;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length == 0 || questionCounter >= MAX_QUESTIONS){
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
startGame()


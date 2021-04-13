// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "ما هو عدد السجدات في القرآن الكريم؟",
        imgSrc : "img/css.png",
        choiceA : "15 سجدة",
        choiceB : "14 سجدة",
        choiceC : "17 سجدة",
        correct : "A"
    },{
        question : "من هو النبي الذي آمن به جميع قومه؟",
        imgSrc : "img/css.png",
        choiceA : "شعيب عليه السلام",
        choiceB : "إبراهيم عليه السلام",
        choiceC : "يونس عليه السلام",
        correct : "C"
    },{
        question : "ما هي المدة التي نام فيها أهل الكهف؟",
        imgSrc : "img/css.png",
        choiceA : "308 سنة",
        choiceB : " 309 سنة",
        choiceC : "310 سنة",
        correct : "B"
    },{
        question : "من هو النبي الملقب بـ “شيخ المرسلين”؟",
        imgSrc : "img/css.png",
        choiceA : "إدريس عليه السلام",
        choiceB : "يونس عليه السلام",
        choiceC : "نوح عليه السلام",
        correct : "C"
    },{
        question : "كم عدد أبناء الرسول صلى الله عليه وسلم؟",
        imgSrc : "img/css.png",
        choiceA : "خمسة أبناء",
        choiceB : "ستة أبناء",
        choiceC : "سبعة أبناء",
        correct : "C"
    },{
        question : "من النبي الأول الذي يقرع باب الجنة يوم القيامة؟",
        imgSrc : "img/css.png",
        choiceA : "إبراهيم",
        choiceB : "محمد",
        choiceC : "علي بن أبي طالب",
        correct : "B"
    },{
        question : "من هو الملقب بـ أسد الله الغالب؟" ,
        imgSrc : "img/css.png",
        choiceA : "علي بن أبي طالب",
        choiceB : "عمر بن الخطاب",
        choiceC : "زيد بن ثابت",
        correct : "A"
    },{
        question : "من هو النبي الذي قبض روحه في السماء؟",
        imgSrc : "img/css.png",
        choiceA : "عيسى عليه السلام",
        choiceB : "هود عليه السلام",
        choiceC : " إدريس عليه السلام",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}






















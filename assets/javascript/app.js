var trivia = $("#quiz-box");
var startCount = 10;
var timer;


var questionsArr = [
    {   question: "Which of these players never made an all-star appearance?",
        answers: ["Michael Cooper", "Eddie Jones", "Nick Van Exel", "AC Green"],
        corAns: "Michael Cooper" 
    },
    {   question: "What or who did Kobe Bryant's parent's name him after?",
        answers: ["A type of steak", "A shipyard in Japan", "A relative", "A character from a book"],
        corAns: "A type of steak"
    },
    {   question: "What is the highest point total a Laker has scored in a single game?",
        answers: ["100", "81", "55", "42"],
        corAns: "81"
    },
    {   question: "In his 20 seasons with the NBA how many league MVP Awards did Kareem Abdul-Jabbar receive?",
        answers: ["2", "4", "6", "8"],
        corAns: "6"
    },
    {   question: "Kareem Abdul-Jabbar scored how many chart topping points during his career?",
        answers: [ "50,001", "38,387", "34,567", "29,985"],
        corAns: "38,387"
    },
]

var quiz = {
    questionsArr: questionsArr,
    currentQuestion: 0,
    right: 0,
    wrong: 0,
    clock: startCount,

    countdown: function() {
        quiz.clock--;
        $("#current-time").text(quiz.clock);
        if (quiz.clock === 0){
            quiz.clockOut();
        }
    },

    showQuestion: function() {
        timer = setInterval(quiz.countdown, 1000);
        trivia.html("<h2>" + questionsArr[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questionsArr[this.currentQuestion].answers.length; i++) {
            trivia.append("<button class='ans-but' id='button' data-name='" + questionsArr[this.currentQuestion].answers[i] + "'>" + questionsArr[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        quiz.clock = startCount;
        $("#current-time").text(quiz.clock);
        quiz.currentQuestion++;
        quiz.showQuestion();
    },

    clockOut: function() {
        clearInterval(timer);
        $("#current-time").html(quiz.clock);
        trivia.html("Time is UP!");
        trivia.append("<h2>The Correct answer is: " + questionsArr[this.currentQuestion].corAns);
        if (quiz.currentQuestion === questionsArr.length -1) {
            setTimeout(quiz.outcomes, 2000);
        }
        else {
            setTimeout(quiz.nextQuestion, 2000)
        }
    },

    outcomes: function() {
        clearInterval(timer);
        trivia.html("<h2>You Finished! Check out how well(or not) you did...</h2>");
        $("#current-time").text(quiz.clock);
        trivia.append("<h2>Right: " + quiz.right + "</h2>");
        trivia.append("<h2>Wrong: " + quiz.wrong + "</h2>");
        trivia.append("<button id='replay'>Try Again?</button>");
    },

    answered: function(zot) {
        clearInterval(timer);
        if ($(zot.target).attr("data-name") === questionsArr[this.currentQuestion].corAns) {
            this.ansRight();
        }
        else {
            this.ansWrong();
        }
    },

    ansRight: function() {
        quiz.right++;
        clearInterval(timer);
        trivia.html("<h2>Nice Job!</h2>");
        trivia.append("<h2>You chose the right answer!");
        if (quiz.currentQuestion === questionsArr.length -1) {
            setTimeout(quiz.outcomes, 2000);
        }
        else {
            setTimeout(quiz.nextQuestion, 2000)
        }
    },

    ansWrong: function() {
        clearInterval(timer);
        quiz.wrong++;
        trivia.html("<h2>That's a negative, Ghostrider</h2>");
        if (quiz.currentQuestion === questionsArr.length -1) {
            setTimeout(quiz.outcomes, 2000);
        }
        else {
            setTimeout(quiz.nextQuestion, 2000)
        }
    },

    restart: function() {
        this.currentQuestion = 0;
        this.clock = startCount;
        this.right = 0;
        this.wrong = 0;
        this.showQuestion();
    }
};

$(document).on("click", "#start-game", function() {
    $("#int-container").prepend("<h1>Seconds Left: <span id='current-time'>10</span></h2>");
    quiz.showQuestion();
});

$(document).on("click", ".ans-but", function(zot){
    quiz.answered(zot);
});

$(document).on("click", "#replay", function() {
    quiz.restart();
});



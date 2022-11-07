var timeRemaining = document.querySelector("#pTimeRemaining");
var startButton = document.querySelector("#startButton");
var submitButton = document.querySelector("#submitButton");
var pQuestion = document.querySelector("#pQuestion");
var olOptions = document.querySelector("#olOptions");
var playerName = document.querySelector("#playerName");
var viewHighScores = document.querySelector("#viewHighScores");
var pHighScores = document.querySelector("#pHighScores");

var question = {
    questionText: "Question Text",
    answers: {
      a: "Option A",
      b: "Option B",
      c: "Option C",
      d: "Option D",
    },
    correctAnswer: "a",
  };
  var questions = [];
  
  var score = {
    personName: "",
    personScore: 0,
    dateTimeStamp: Date.now(),
  };
  var highScores = [];
  
  var currentScore = 0;
  
  var timeLeft = 60;
  var timeInterval;
  
  var currentQuestionIndex = 0;
  
  startButton.addEventListener("click", function (event) {
    event.preventDefault();
  
    // Clear timer & refresh remaining letters
    timeRemaining.textContent = "";
  
    // display first question
    currentQuestionIndex = 0;
    displayQuestion(currentQuestionIndex);
  
    // hide start button
    $("#startButton").toggleClass("hidden");
  
    $("#pQuestion").toggleClass("hidden");
    $("#olOptions").toggleClass("hidden");
  
    viewHighScores.textContent = "View Highscores";
    pHighScores.textContent = "";
  
    // Start Timer
    timeLeft = 60;
    timeInterval = setInterval(function () {
      timeRemaining.textContent = "Time Left: " + timeLeft;
  
      if (timeLeft <= 0) {
        timeRemaining.textContent = "Time's up!";
  
        // Calls function to complete quiz
        endQuiz();
      }
      timeLeft--;
    }, 1000);
  });
  
  // A function for when an li is clicked.
  olOptions.addEventListener("click", function (event) {
    var element = event.target;
    // TODO: Describe the functionality of the following `if` statement.
    // if a Complete button is clicked, remove the appropriate list item.
    if (element.matches("li") === true) {
      // selectedAnswer should have the selected answer in it
      var selectedAnswer = element.getAttribute("data-index");
  
      if (selectedAnswer != questions[currentQuestionIndex].correctAnswer) {
        // They got it wrong.  Deduct 5 seconds.
        timeLeft -= 5;
        if (timeLeft <= 0) {
          timeRemaining.textContent = "Time Left: " + timeLeft;
          endQuiz();
        }
      }
  
      nextQuestion();
    }
  });
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      endQuiz();
    }
  }
  
  // End quiz
  function endQuiz() {
    // Stops execution of action at set interval
    clearInterval(timeInterval);
  
    // Hide question & answers
    $("#pQuestion").toggleClass("hidden");
    $("#olOptions").toggleClass("hidden");
  
    // Display textbox for initials & saveScore button
    $("#playerName").toggleClass("hidden");
    $("#submitButton").toggleClass("hidden");
  }
  
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Save score to localStorage
    score = {
      personName: playerName.value.trim(),
      personScore: timeLeft + 1, // For some reason it decrements an extra one.
      dateTimeStamp: Date.now(),
    };
  
    highScores.push(score);
    highScores.sort(sortHighScores);
    if (highScores.length > 5) {
      highScores.pop();
    }
  
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    // Show Start Button again
    $("#startButton").toggleClass("hidden");
  
    // Hide playername and submit button
    $("#playerName").toggleClass("hidden");
    $("#submitButton").toggleClass("hidden");
  
    showHighScores();
  });
  
  // Sort highScores
  function sortHighScores(a, b) {
    if (a.personScore > b.personScore) return -1;
    else if (a.personScore < b.personScore) return 1;
    else return 0;
  }
  
  // Function for clicking on View Highscores to show them
  viewHighScores.addEventListener("click", function (event) {
    event.preventDefault();
    showHighScores();
  });
  
  // Function to show the high scores
  function showHighScores() {
    if (pHighScores.textContent == "") {
      if (localStorage.getItem("highScores") != null) {
        highScores = JSON.parse(localStorage.getItem("highScores"));
        for (let i = 0; i < highScores.length; i++) {
          score = highScores[i];
          var dtScore = new Date(score.dateTimeStamp);
          pHighScores.textContent += `Player: ${score.personName}, Score: ${
            score.personScore
          }, DateTime: ${dtScore.toLocaleString()} --`;
        }
        viewHighScores.textContent = "Hide Highscores";
      }
    } else {
      viewHighScores.textContent = "View Highscores";
      pHighScores.innerHTML = "";
    }
  }
  
  function displayQuestion(index) {
    if (index < questions.length) {
      question = questions[index];
  
      pQuestion.textContent = question.questionText;
  
      const answers = Object.values(question.answers);
      var abcd = ["a", "b", "c", "d"];
  
      // Need to remove all lis from ol
      while (olOptions.firstChild) {
        olOptions.removeChild(olOptions.firstChild);
      }
  
      for (let i = 0; i < answers.length; i++) {
        var li = document.createElement("li");
        li.textContent = "" + (i + 1) + ". " + answers[i];
        li.setAttribute("data-index", abcd[i]);
        olOptions.appendChild(li);
      }
    }
  }
  
  function buildQuestions() {
    const question1 = {
      questionText: "JavaScript has a file extension of:",
      answers: {
        a: ".java",
        b: ".js",
        c: ".cs",
        d: ".html",
      },
      correctAnswer: "b",
    };
    questions.push(question1);
  
    const question2 = {
      questionText: "CSS is short for:",
      answers: {
        a: "Cascading Style Sheets",
        b: "C Sharp Sharp",
        c: "Cows Singing Songs",
        d: "Cool Super Style",
      },
      correctAnswer: "a",
    };
    questions.push(question2);
  
    const question3 = {
      questionText: "Is JavaScript the same thing as Java?",
      answers: {
        a: "True",
        b: "Most Definitely",
        c: "Of course, they both have Java in the name.",
        d: "C'mon man, no.",
      },
      correctAnswer: "d",
    };
    questions.push(question3);
  
    const question4 = {
      questionText: "HTML is short for:",
      answers: {
        a: "HTTP Model Language",
        b: "Hyperpace Is Too Slow",
        c: "HyperText Markup Language",
        d: "Nothing, it's just random letters.",
      },
      correctAnswer: "c",
    };
    questions.push(question4);
  
    const question5 = {
      questionText: "FlexBox was released in what year?",
      answers: {
        a: "1995",
        b: "2002",
        c: "2009",
        d: "2015",
      },
      correctAnswer: "c",
    };
    questions.push(question5);
  }
  
  function init() {
    // build questions
    buildQuestions();
  
    // Hide controls that should not be displayed on init
    $("#pQuestion").toggleClass("hidden");
    $("#olOptions").toggleClass("hidden");
    $("#playerName").toggleClass("hidden");
    $("#submitButton").toggleClass("hidden");
  
    if (localStorage.getItem("highScores") != null) {
      highScores = JSON.parse(localStorage.getItem("highScores"));
    }
  }
  init();
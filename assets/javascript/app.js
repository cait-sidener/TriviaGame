var questions = [{
    question: "1. Comment est-ce qu'on dit 12h30 ?",
    answers: [
      "midi et quart",
      "midi moins le quart",
      "midi et demi",
      "une heure moins le quart"
    ],
    correctAnswer: "midi et demi",
    name: "noon"
  },
  {
    question: "2. Quel genre de film est triste ?",
    answers: [
      "un drame",
      "une comédie",
      "un film d'action",
      "un film d'aventures"
    ],
    correctAnswer: "un drame",
    name: "genre"
  },
  {
    question: "3. Où est-ce que vous nagez ?",
    answers: [
      "à l'école",
      "à la bibliothèque",
      "au centre commércial",
      "à la piscine"
    ],
    correctAnswer: "à la piscine",
    name: "swimming"
  },
  {
    question: "4. À quelle heure dînons-nous ?",
    answers: [
      "à 8h00",
      "à 19h00",
      "à midi",
      "à 3h00 de l'après-midi"
    ],
    correctAnswer: "à 19h00",
    name: "dinner"
  },
  {
    question: "5. Quand allez-vous à l'école ?",
    answers: [
      "à huit heure du soir",
      "à huit heure du matin",
      "à huit heure de l'après-midi",
      "à minuit"
    ],
    correctAnswer: "à huit heure du matin",
    name: "school day"
  },
  {
    question: "6. Quel est votre jour préféré ?",
    answers: [
      "samedi",
      "lundi",
      "mercredi",
      "mardi"
    ],
    correctAnswer: "samedi",
    name: "favorite day"
  },
  {
    question: "7. Qui est le metteur en scène ?",
    answers: [
      "Gérard Depardieu",
      "Marion Cotillard",
      "Françoise Hardy",
      "Jean-Luc Goddard"
    ],
    correctAnswer: "Jean-Luc Goddard",
    name: "directors"
  },
  {
    question: "8. Zut ! Le film commence à 21h00, mais il est 21h10.",
    answers: [
      "Je suis à l'heure.",
      "Je suis en retard.",
      "Je suis en avance.",
      "Je suis nulle."
    ],
    correctAnswer: "Je suis en retard.",
    name: "tardiness"
  }
];

var $content = $('#content');
var $finalScreen = $('#finalScreen');
var $splashScreen = $('#splashScreen');
var $timesUp = $('#timesUp');
var $timer = $(".timeRemaining");
var timeLimit = 60;

var correctAnswers = 0;
var incompleteAnswers = 0;
var incorrectAnswers = 0;

var timerIntervalId;

function startTimer() {

  timerIntervalId = setInterval(resetTimer, 1000);
}

function stopTimer() {
  clearInterval(timerIntervalId);
}

function resetTimer() {
  $timer.html(timeLimit);
  timeLimit--;
  if (timeLimit === 0) {
    stopTimer();
    endGame(true);
  }
}

function endGame(timeUp) {

  questions.forEach(function (question) {
    var value = '';

    question.root.find('input').each(function (index, input) {
      var $input = $(input);

      if ($input.prop('checked')) {
        value = $input.val();
      }
    });

    if (!value) {
      incompleteAnswers++;
      return;
    }
    var hasCorrectAns = value === question.correctAnswer;
    if (hasCorrectAns) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }
  });
  $content.removeClass('active');

  if (timeUp) {
    startTimesUpScreen();
    return;
  }

  startFinalScreen();
}

function startTimesUpScreen() {
  $timesUp.addClass('active');

  var $correctScreen = $('#correctTimesUp');
  var $noAnswerScreen = $('#noAnswerTimesUp');
  var $wrongScreen = $('#wrongTimesUp');

  $correctScreen.append($('<span> ' + correctAnswers + '</span>'));
  $noAnswerScreen.append($('<span> ' + incompleteAnswers + '</span>'));
  $wrongScreen.append($('<span> ' + incorrectAnswers + '</span>'));

}

function startFinalScreen() {
  $finalScreen.addClass('active');

  var $correctScreen = $('#correctScreen');
  var $noAnswerScreen = $('#noAnswerScreen');
  var $wrongScreen = $('#wrongScreen');

  $correctScreen.append($('<span> ' + correctAnswers + '</span>'));
  $noAnswerScreen.append($('<span> ' + incompleteAnswers + '</span>'));
  $wrongScreen.append($('<span> ' + incorrectAnswers + '</span>'));
}

function startGame() {
  startTimer();
  var questionContainer = $("#question--container");

  for (var i = 0; i < questions.length; i++) {
    var newDiv = $("<div>");
    newDiv.append($("<h4>" + questions[i].question + "</h4>"));

    var options = questions[i].answers
    for (var optIdx = 0; optIdx < options.length; optIdx++) {
      var value = options[optIdx];

      newDiv.append(
        "<label class='question-option'>" +
        "<input type='radio' name='" + questions[i].name + "' value='" + value + "' data-idx='" + i + "' />" +
        value +
        "</label>"
      );

      questions[i].root = newDiv;
    }

    questionContainer.append(newDiv);
  }

  $("#sub-but").on("click", function () {
    endGame(false);
  })
}

$splashScreen.addClass('active');
$splashScreen.on("click", function () {
  $splashScreen.removeClass('active');
  $content.addClass('active');
  startGame();
})
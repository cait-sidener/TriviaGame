var questions = [
  {
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
var timeLimit = 1;

var correctAnswers = 0;
var incompleteAnswers = 0;
var incorrectAnswers = 0;

var timerIntervalId;

function startTimer () {
  // @todo Start a setInterval that will end the game after a certain amount of time.
  // Do not forget to save the id for later
  // You should display the time left to the user.
  timerIntervalId = setInterval(resetTimer, 1000);
}

function stopTimer() {
    clearInterval(timerIntervalId);
}

function resetTimer(){
    $timer.html(timeLimit);
    timeLimit--;
    if (timeLimit === 0) {
        stopTimer();
        endGame(true);
    }
}

function endGame(timeUp) {
  console.log("game over", questions);
  /*
   * @todo
   * 1. Stop the timer
   * 2. use jQuery to get all the 'checked' input. https://api.jquery.com/checked-selector/
   * 3. Loop thru the collection and get th value and the data-idx attribute
   * 4. Use the data-idx attribute to retrive the correctAnswer from the questions array
   * 5. Compare values, if matches is the user answered correctly increment corrext
   */

  // This is your skeleton for the intructions above:
//   clearInterval(timmerIntervalId)
  questions.forEach(function (question) {
    var value = '';

    question.root.find('input').each(function (index, input) {
        var $input = $(input);

        if ($input.prop('checked')) {
            value = $input.val();
        }
    });

    if(!value) {
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
  console.log(correctAnswers, incompleteAnswers,incorrectAnswers);
  $content.removeClass('active');
  // Update your page with the new data
  // Remember that you need to remove the questions and show the results

  if (timeUp) {
      startTimesUpScreen();
      return;
  }

  startFinalScreen();
}

function startTimesUpScreen(){
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

function startGame () {
    startTimer();
  var questionContainer = $("#question--container");

  for (var i = 0; i < questions.length; i++) {
      var newDiv = $("<div>");
      newDiv.append($("<h4>" + questions[i].question + "</h4>"));

      var options = questions[i].answers
      for(var optIdx = 0; optIdx < options.length; optIdx++) {
        var value = options[optIdx];

        /*
          Added a label with an input element with the value of the current option,
          and the index of the question on the questions array.
        */
        newDiv.append(
          "<label class='question-option'>" +
            "<input type='radio' name='"+ questions[i].name +"' value='"+ value +"' data-idx='"+ i +"' />" +
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

/*
 * @todo The questions should be hidden at first
 * Use jQuery to add a click handler to a 'start' button
 */
// $("your-start-btn-selector").on("click", function () {
//   // @todo User jquery to remove the start screen and show the questions screen
//
//   // This populate the questions...
//   startGame();
//
//   // @todo start the timer
//   startTimmer();
// })

$splashScreen.addClass('active');
$splashScreen.on("click", function(){
    $splashScreen.removeClass('active');
    $content.addClass('active');
    startGame();
})


// Note: remove this after you get the start button working...
// this should be called from the start button click event after hiding the initial screen

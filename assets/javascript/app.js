var questions = [{
        question: "1. Comment est-ce qu'on dit 12h30 ?",
        answers: ["midi et quart", "midi moins le quart", "midi et demi", "une heure moins le quart"],
        correctAnswer: "midi et demi",
        name: "noon"
    },
    {
        question: "2. Quel genre de film est triste ?",
        answers: ["un drame", "une comédie", "un film d'action", "un film d'aventures"],
        correctAnswer: "un drame",
        name: "genre"
    },
    {
        question: "3. Où est-ce que vous nagez ?",
        answers: ["à l'école", "à la bibliothèque", "au centre commércial", "à la piscine"],
        correctAnswer: "à la piscine",
        name: "swimming"
    },
    {
        question: "4. À quelle heure dînons-nous ?",
        answers: ["à 8h00", "à 19h00", "à midi", "à 3h00 de l'après-midi"],
        correctAnswer: "à 19h00",
        name: "dinner"
    },
    {
        question: "5. Quand allez-vous à l'école ?",
        answers: ["à huit heure du soir", "à huit heure du matin", "à huit heure de l'après-midi", "à minuit"],
        correctAnswer: "à huit heure du matin",
        name: "school day"
    },
    {
        question: "6. Quel est votre jour préféré ?",
        answers: ["samedi", "lundi", "mercredi", "mardi"],
        correctAnswer: "samedi",
        name: "favorite day"
    },
    {
        question: "7. Qui est le metteur en scène ?",
        answers: ["Gérard Depardieu", "Marion Cotillard", "Françoise Hardy", "Jean-Luc Goddard"],
        correctAnswer: "Jean-Luc Goddard",
        name: "directors"

    },
    {
        question: "8. Zut ! Le film commence à 21h00, mais il est 21h10.",
        answers: ["Je suis à l'heure.", "Je suis en retard.", "Je suis en avance.", "Je suis nulle."],
        correctAnswer: "Je suis en retard.",
        name: "tardiness"
    }
];

var userChoice = [];

function initialize(){
    var questionContainer = $("#question--container");
    for (var i = 0; i < questions.length; i++) {
        var newDiv = $("<div>");
        newDiv.append($("<h4>" + questions[i].question + "</h4>"));

        var questionAns = questions[i].answers
        for(var j = 0; j < questionAns.length; j++) {

            var answerDiv = $("<div>");
            var radioButton = $(
                "<input type='radio' name='" + questions[i].name + "' value='"+ questionAns[j] +"'>"
            );
            var checkAnswer = questions[i].correctAnswer
            console.log(checkAnswer)
            radioButton.on("click", function(){
                console.log($(this).val() === checkAnswer)
                console.log(checkAnswer)
            });

            answerDiv.append(radioButton, $("<span>" + questionAns[j] + "</span>"));
            newDiv.append(answerDiv);
        }

        questionContainer.append(newDiv);
 
    }
    $("#sub-but").on("click", function(){
        console.log(userChoice);
    })
}
initialize();

        
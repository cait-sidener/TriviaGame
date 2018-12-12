// This will run the timer as soon as the page loads

var number = 60;

var intervalId;
var clockRunning = false;

function run(){
    intervalId = setInterval(decrement, 1000);
    clockRunning = true;
}

function decrement() {
    number--;
    $(".timeRemaining").html("<h2>" + number + "</h2>");
    if (number === 0) {
        stop();
        clockRunning = false;
        alert("Fini !");
    }
}

function stop() {
    clearInterval(intervalId);
}

run();
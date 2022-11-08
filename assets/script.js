// Global Variables

var score = 0;

var questionIndex = 0;

var remainingTime = document.querySelector("#remainingTime");

var timer = document.querySelector("#startTime");

var questionsDiv = document.querySelector("#questionsDiv");

var container = document.querySelector("#container");

var secondsLeft = 100;

var holdInterval = 0;

var penalty = 10;

var addList = document.createElement("ul");

var questions = [
    {
        title: "Lorem Ipsum 1",
        choices: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"],
        answer: "Correct"
    },
    {
        title: "Lorem Ipsum 2",
        choices: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"],
        answer: "Correct"
    },
    {
        title: "Lorem Ipsum 3",
        choices: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"],
        answer: "Correct"
    },
    {
        title: "Lorem Ipsum 4",
        choices: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"],
        answer: "Correct"
    },
    {
        title: "Lorem Ipsum 5",
        choices: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"],
        answer: "Correct"
    },

    {
        title: "Lorem Ipsum 6",
        choices: ["Correct", "Wrong 1", "Wrong 2", "Wrong 3"],
        answer: "Correct"
    }
];

// Countdown
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            remainingTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                Results();
                remainingTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    loadQuestion(questionIndex);
});

// Loads questions and choices to page: 
function loadQuestion(questionIndex) {
    // Clearing container
    questionsDiv.innerHTML = "";
    addList.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(addList);
        addList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Compares question with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        //    Show Results to user at the end
        Results();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        loadQuestion(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
function Results() {
    questionsDiv.innerHTML = "";
    remainingTime.innerHTML = "";

    var H1Scores = document.createElement("h1");
    H1Scores.setAttribute("id", "H1Scores");
    H1Scores.textContent = "All Done!"

    questionsDiv.appendChild(H1Scores);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "You finished with " + timeRemaining + " seconds left!";

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            window.alert("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var highScores = localStorage.getItem("highScores");
            if (highScores === null) {
                highScores = [];
            } else {
                highScores = JSON.parse(highScores);
            }
            highScores.push(finalScore);
            var newScore = JSON.stringify(highScores);
            localStorage.setItem("highScores", newScore);
        }
        scoreBoard()
    });
}

function scoreBoard() {
    questionsDiv.innerHTML = "";
    remainingTime.innerHTML = "";

    var H1Scores = document.createElement("h1");
    H1Scores.setAttribute("id", "H1Scores");
    H1Scores.textContent = "High Scores"

    questionsDiv.appendChild(H1Scores);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

    highScores.sort(function (a, b) {
        return b.score - a.score;
    })

    highScores.forEach(function (score) {

        var playerScore = document.createElement("li");
        playerScore.textContent = score.initials + " - " + score.score;

        var orderedList = document.getElementById("createP");
        orderedList.appendChild(playerScore);

    })
}

const questions = [
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    choices: ["Var", "Let", "Const", "Variable"],
    correctAnswer: "Variable",
  },
  {
    question: "Which language is used for web development?",
    choices: ["Java", "C++", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
  },
];

const startButton = document.getElementById("start-quiz");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const choicesList = document.getElementById("choices");
const scoreForm = document.getElementById("score-form");
const scoreText = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");
const timerDiv = document.getElementById("timer"); // Added this line
const timeRemainingSpan = document.getElementById("time-remaining"); // Added this line

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
let timerInterval;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.style.display = "none";
  questionContainer.style.display = "block";
  scoreForm.style.display = "none";
  timerDiv.style.display = "block";
  displayQuestion(currentQuestionIndex);
  startTimer();
}

function startTimer() {
  updateTimerDisplay();

  timerInterval = setInterval(function () {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timeRemainingSpan.textContent = timeRemaining;
}

function displayQuestion(index) {
  if (index < questions.length) {
    questionText.textContent = questions[index].question;
    choicesList.innerHTML = "";
    questions[index].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.className = "choice";
      li.textContent = choice;
      li.addEventListener("click", checkAnswer);
      choicesList.appendChild(li);
    });
  } else {
    endQuiz();
  }
}

function checkAnswer(event) {
  const selectedChoice = event.target.textContent;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedChoice === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  displayQuestion(currentQuestionIndex);
}

function endQuiz() {
  questionContainer.style.display = "none";
  scoreForm.style.display = "block"; // Changed "scoreForm.style.display"
  scoreText.textContent = score;
}

submitScoreButton.addEventListener("click", saveHighScore);

function saveHighScore() {
  const initials = initialsInput.value;
  alert(`High Score: ${score} saved for ${initials}`);
}


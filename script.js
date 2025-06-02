const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
    answer: "Bill Gates"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "Which country is known for sushi?",
    options: ["India", "China", "Thailand", "Japan"],
    answer: "Japan"
  }
];

// Shuffle questions randomly
const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const quizEl = document.getElementById("quiz");

function showQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="answer" value="${option}"> ${option}</label>`;
    optionsEl.appendChild(li);
  });
}

nextBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    alert("Please select an answer!");
    return;
  }

  const userAnswer = selectedOption.value;
  const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;

  if (userAnswer === correctAnswer) {
    score++;
  }

  // Store answer for review
  userAnswers.push({
    question: shuffledQuestions[currentQuestionIndex].question,
    correctAnswer: correctAnswer,
    yourAnswer: userAnswer
  });

  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizEl.classList.add("hide");
  resultEl.classList.remove("hide");
  scoreEl.textContent = `${score} / ${shuffledQuestions.length}`;

  const review = document.createElement("div");
  review.innerHTML = `<h3>Answer Review:</h3>`;
  userAnswers.forEach((item, index) => {
    const isCorrect = item.correctAnswer === item.yourAnswer;
    review.innerHTML += `
      <p>
        <strong>Q${index + 1}: ${item.question}</strong><br>
        Your Answer: <span style="color:${isCorrect ? 'green' : 'red'}">${item.yourAnswer}</span><br>
        Correct Answer: <span style="color:green">${item.correctAnswer}</span>
      </p>
    `;
  });

  resultEl.appendChild(review);
}

// Start the quiz
showQuestion();

const questions = [
{
    question: "What famous opening line begins the novel?",
    options: ["A long time ago, before the revolution...", "It was the best of times, it was the worst of times...", "Marley was dead to begin with...", "It is a truth, universally acknowledged that..."],
    correct: 1,
    image: "../images/Question1ForQuiz.jpg"

},
{
    question: "What are the two cities in the title?",
    options: ["New York and London", "Paris and Rome", "London and Paris", "Berlin and London"],
    correct: 2,
    image: "../images/StoppageAtTheFountain.jpg"
},
{
    question: "What is the significantce of the spilled wine on the streets of Paris?",
    options: ["It symbolizes the bloodshed to come during the French Revolution.", "It represents the poverty of the peasants", "It shows the abundance of resources in Paris", "It is a trivial event with no deeper meaning"],
    correct: 0,
    image: "../images/MadameDefarge.jpg"
},
{ 
    question: "Which two characters are look-alikes in the book?",
    options: ["Dr. Manette and Monsieur Defarge", "Jerry Cruncher and Mr. Lorry", "Lucie Manette and Madame Defarge", "Sydney Carton and Charles Darnay"],
    correct: 3,
    image: "../images/TheLookAlikes.jpg"
},
{
    question: "What does Madame Defarge always carry with her, and why is it important?",
    options: ["A knitting needle, to knit the names of her enemies", "A sword, symbolizing her vengeance", "A flower, showing her peaceful nature", "A book, representing her intelligence"],
    correct: 0,
    image: "../images/Revolution.jpg"
},
{
    question: "What pseudonym does Charles Darnay use when he travels to France?",
    options: ["Ernest Defarge", "Dr. Lorry", "Charles Evermonde", "Monsieur Gabelle"],
    correct: 2,
    image: "../images/Nickname.jpg"
},
{
    question: "What is the name of the bank where Mr. Lorry works?",
    options: ["Defarge & Co.", "Tellson's Bank", "The Bank of Paris", "The Royal Bank of England"],
    correct: 1,
    image: "../images/Bank.jpg"
},
{
    question: "What is the nickname given to the guillotine by the revolutionaries?",
    options: ["The National Razor", "The People's Justice", "Madame Guillotine", "The Revolutionary Blade"],
    correct: 0,
    image: "../images/TravellingToParis.jpg"

}
];


const questionContainer = document.getElementById("question-container");
const scoreContainer = document.getElementById("score-container");
const nextButton = document.getElementById("next-button");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1 ));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function initializeQuiz() {
    shuffleArray(questions); // Shuffle questions at the start
    questions.forEach((question) => {
    const correctAnswer = question.options[question.correct]; // Get the correct answer
    shuffleArray(question.options); //Shuff options for each answer
    question.correct = question.options.indexOf(correctAnswer);}); // Make correct answer the new shuffled index of the correct answer
    loadQuestion();
}
function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        <img src="${questionData.image}" alt="Question Image" class="question-image">
        <ul>
            ${questionData.options.map((option, index) => `<li><button class="option-button" onclick="selectAnswer(${index})">${option}</button></li>`).join("")}
        </ul>
    `;
    nextButton.style.display = "none";
}
function selectAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option-button");
    
    buttons.forEach((button) => {
        button.disabled = true; // Disable all buttons after selection
    })
    if (selectedIndex === questionData.correct){
        score++;
        buttons[selectedIndex].style.backgroundColor = "green"; // Change color to green for correct answer
        alert("Correct!");
    }
    else {
        buttons[selectedIndex].style.backgroundColor = "red"; // Change color to red for wrong answer
        buttons[questionData.correct].style.backgroundColor = "green"; // Show correct answer
        alert("Wrong! The correct answer was: " + questionData.options[questionData.correct]);

    }
    nextButton.style.display = "inline-block";

}

function showFinalScore() {
    questionContainer.innerHTML = '<h2>Quiz Completed!</h2>';
    scoreContainer.innerHTML = `<h3>Your final score is ${score} out of ${questions.length}.<h3>`;
    nextButton.style.display = "none";

    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart Quiz";
    restartButton.classList.add("restart-button");

    scoreContainer.appendChild(restartButton);
    createConfetti(); // Call the confetti function when showing the final score
    restartButton.addEventListener("click", restartQuiz); // Add event listener to restart button
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.innerHTML = "";
    initializeQuiz(); // Restart the quiz

    const restartButton = document.querySelector(".restart-button");
    if (restartButton) restartButton.remove(); // Remove the restart button if it exists
    
    const confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach((confetti) => confetti.remove()); // Remove confetti elements  
}
function createConfetti() {
    const confettiContainer = document.body;
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = getRandomColor()
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random duration  

        confettiContainer.appendChild(confetti);
    }
}
function getRandomColor() {
    const colors = ['#ffeb3b', '#ff4500', 'ff8c00', '4caf50', '#00bcd4', '#ff69b4', '#8a2be2'];
    return colors[Math.floor(Math.random() * colors.length)];
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextButton.style.display = "none";
    }
    else {
        showFinalScore();
    }
});

let currentQuestionIndex = 0;
let score = 0;
initializeQuiz(); // Start the quiz when the page loads

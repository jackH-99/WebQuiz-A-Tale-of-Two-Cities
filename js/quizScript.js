const questions = [
{
    question: "What famous opening line begins the novel?",
    options: ["A long time ago, before the revolution...", "It was the best of times, it was the worst of times...", "Marley was dead to begin with...", "It is a truth, universally acknowledged that..."],
    correct: 1
},
{
    question: "What are the two cities in the title?",
    options: ["New York and London", "Paris and Rome", "London and Paris", "Berlin and London"],
    correct: 2
},
{
    question: "What is the significantce of the spilled wine on the streets of Paris?",
    options: ["It symbolizes the bloodshed to come during the French Revolution.", "It represents the poverty of the peasants", "It shows the abundance of resources in Paris", "It is a trivial event with no deeper meaning"],
    correct: 0
},
{ 
    question: "Which two characters are look-alikes in the book?",
    options: ["Dr. Manette and Monsieur Defarge", "Jerry Cruncher and Mr. Lorry", "Lucie Manette and Madame Defarge", "Sydney Carton and Charles Darnay"],
    correct: 3
},
{
    question: "What does Madame Defarge always carry with her, and why is it important?",
    options: ["A knitting needle, to knit the names of her enemies", "A sword, symbolizing her vengeance", "A flower, showing her peaceful nature", "A book, representing her intelligence"],
    correct: 0
},
{
    question: "What pseudonym does Charles Darnay use when he travels to France?",
    options: ["Ernest Defarge", "Dr. Lorry", "Charles Evermonde", "Monsieur Gabelle"],
    correct: 2
},
{
    question: "What is the name of the bank where Mr. Lorry works?",
    options: ["Defarge & Co.", "Tellson's Bank", "The Bank of Paris", "The Royal Bank of England"],
    correct: 1
},
{
    question: "What is the nickname given to the guillotine by the revolutionaries?",
    options: ["The National Razor", "The People's Justice", "Madame Guillotine", "The Revolutionary Blade"],
    correct: 0
}
];
let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const scoreContainer = document.getElementById("score-container");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        <ul>
            ${questionData.options.map((option, index) => `<li><button class="option-button" onclick="selectAnswer(${index})">${option}</button></li>`).join("")}
        </ul>
    `;
}
function selectAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    if (selectedIndex === questionData.correct){
        score++;
        alert("Correct!");
    }
    else {
        alert("Wrong! The correct answer was: " + questionData.options[questionData.correct]);

    }
    nextButton.style.display = "block";

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
function showFinalScore() {
    questionContainer.innerHTML = '<h2>Quiz Completed!</h2>';
    scoreContainer.innerHTML = `<p>Your final score is ${score} out of ${questions.length}.</p>`;
    nextButton.style.display = "none";
}
loadQuestion();

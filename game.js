const questions = [
    // Level 1 Questions
    {
        level: 1,
        question: "What is the minimum wind speed for a hurricane?",
        options: ["74 mph", "100 mph", "120 mph", "150 mph"],
        correct: 0
    },
    {
        level: 1,
        question: "What scale is used to measure hurricane strength?",
        options: ["Richter Scale", "Fujita Scale", "Saffir-Simpson Scale", "Mercalli Scale"],
        correct: 2
    },
    {
        level: 1,
        question: "What is the eye of the hurricane?",
        options: ["The center of calm", "The strongest winds", "The outer rain bands", "None of the above"],
        correct: 0
    },
    // Level 2 Questions
    {
        level: 2,
        question: "What is a storm surge?",
        options: [
            "High winds in a hurricane",
            "Heavy rainfall during a hurricane",
            "A rise in sea level due to a hurricane",
            "Lightning strikes during a hurricane"
        ],
        correct: 2
    },
    {
        level: 2,
        question: "What causes hurricanes to weaken?",
        options: [
            "Warm ocean water",
            "Strong winds",
            "Cold water",
            "High pressure systems"
        ],
        correct: 2
    },
    {
        level: 2,
        question: "Which of the following regions is most prone to hurricanes?",
        options: [
            "The Sahara Desert",
            "The Great Plains",
            "The Gulf of Mexico",
            "The Himalayas"
        ],
        correct: 2
    },
    // Level 3 Questions
    {
        level: 3,
        question: "Which hurricane caused significant damage in New Orleans in 2005?",
        options: ["Hurricane Sandy", "Hurricane Katrina", "Hurricane Irma", "Hurricane Harvey"],
        correct: 1
    },
    {
        level: 3,
        question: "What is the safest room in your house during a hurricane?",
        options: ["Living room", "Bedroom", "Bathroom", "Garage"],
        correct: 2
    },
    {
        level: 3,
        question: "What does the term 'hurricane watch' indicate?",
        options: [
            "Hurricane is expected within 48 hours",
            "Hurricane is currently affecting the area",
            "No hurricane threat is present",
            "Hurricane has made landfall"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let lifelinesUsed = 0;

function loadQuestion() {
    document.getElementById('question').textContent = questions[currentQuestion].question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = questions[currentQuestion].options[index];
        option.style.display = 'block'; // Ensure options are visible
    });
    document.getElementById('result').textContent = "";
    document.getElementById('next-btn').style.display = 'none';
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].correct) {
        document.getElementById('result').textContent = "Correct!";
        score++;
    } else {
        document.getElementById('result').textContent = "Wrong answer.";
    }
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
        document.getElementById('next-btn').style.display = 'none';
    }
}

// Lifeline 50/50
function lifeline50_50() {
    if (lifelinesUsed < 1) {
        lifelinesUsed++;
        const options = document.querySelectorAll('.option');
        const correctIndex = questions[currentQuestion].correct;
        // Remove two incorrect options
        let removed = 0;
        for (let i = 0; i < options.length; i++) {
            if (i !== correctIndex && removed < 2) {
                options[i].style.display = 'none';
                removed++;
            }
        }
    } else {
        alert("You have already used this lifeline.");
    }
}

// Lifeline Ask the Audience
function lifelineAskAudience() {
    if (lifelinesUsed < 2) {
        lifelinesUsed++;
        const correctIndex = questions[currentQuestion].correct;
        const percentage = Math.floor(Math.random() * 30) + 70; // Random percentage for correct answer
        alert(`Audience says: ${questions[currentQuestion].options[correctIndex]} - ${percentage}% sure.`);
    } else {
        alert("You have already used this lifeline.");
    }
}

// Load the first question
loadQuestion();

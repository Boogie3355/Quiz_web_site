const questions = {
    easy: [
        {
            question: "What does HTML stand for?",
            answers: [
                { text: "Hyper Text Markup Language", correct: true },
                { text: "High Text Machine Language", correct: false },
                { text: "Hyper Transfer Markup Language", correct: false },
                { text: "High Transfer Machine Language", correct: false }
            ]
        },
        {
            question: "Which memory is volatile?",
            answers: [
                { text: "RAM", correct: true },
                { text: "ROM", correct: false },
                { text: "Hard Disk", correct: false },
                { text: "Flash Drive", correct: false }
            ]
        },
        {
            question: "What is the full form of CSS?",
            answers: [
                { text: "Cascading Style Sheets", correct: true },
                { text: "Computer Style Sheets", correct: false },
                { text: "Creative Style System", correct: false },
                { text: "Color Style Sheets", correct: false }
            ]
        },
        {
            question: "Which of these is not an operating system?",
            answers: [
                { text: "Oracle", correct: true },
                { text: "Windows", correct: false },
                { text: "Linux", correct: false },
                { text: "macOS", correct: false }
            ]
        },
        {
            question: "1 Byte equals how many bits?",
            answers: [
                { text: "8", correct: true },
                { text: "4", correct: false },
                { text: "16", correct: false },
                { text: "32", correct: false }
            ]
        }
    ],
    medium: [
        {
            question: "What is the time complexity of inserting an element in a hash table?",
            answers: [
                { text: "O(1) average case", correct: true },
                { text: "O(n) always", correct: false },
                { text: "O(log n)", correct: false },
                { text: "O(n²)", correct: false }
            ]
        },
        {
            question: "Which of these is not a valid SQL join type?",
            answers: [
                { text: "RANDOM JOIN", correct: true },
                { text: "LEFT JOIN", correct: false },
                { text: "INNER JOIN", correct: false },
                { text: "FULL JOIN", correct: false }
            ]
        },
        {
            question: "What is the purpose of Virtual Memory?",
            answers: [
                { text: "To extend RAM using disk space", correct: true },
                { text: "To speed up CPU", correct: false },
                { text: "To store temporary files", correct: false },
                { text: "To encrypt data", correct: false }
            ]
        },
        {
            question: "Which protocol is used for sending emails?",
            answers: [
                { text: "SMTP", correct: true },
                { text: "FTP", correct: false },
                { text: "HTTP", correct: false },
                { text: "TCP", correct: false }
            ]
        },
        {
            question: "What is the main purpose of normalization in databases?",
            answers: [
                { text: "Reduce data redundancy", correct: true },
                { text: "Increase data redundancy", correct: false },
                { text: "Speed up queries", correct: false },
                { text: "Encrypt data", correct: false }
            ]
        }
    ],
    hard: [
        {
            question: "What is the Byzantine Generals Problem?",
            answers: [
                { text: "A consensus problem in distributed computing", correct: true },
                { text: "A military strategy", correct: false },
                { text: "A sorting algorithm", correct: false },
                { text: "A network protocol", correct: false }
            ]
        },
        {
            question: "What is the CAP theorem in distributed systems?",
            answers: [
                { text: "Cannot simultaneously guarantee Consistency, Availability, and Partition tolerance", correct: true },
                { text: "A theorem about CPU scheduling", correct: false },
                { text: "A theorem about database indexing", correct: false },
                { text: "A theorem about network security", correct: false }
            ]
        },
        {
            question: "What is the difference between L1 and L2 cache?",
            answers: [
                { text: "L1 is smaller, faster, and closer to CPU than L2", correct: true },
                { text: "L2 is smaller and faster than L1", correct: false },
                { text: "They are the same thing", correct: false },
                { text: "L1 is used only for data, L2 only for instructions", correct: false }
            ]
        },
        {
            question: "What is a Race Condition in concurrent programming?",
            answers: [
                { text: "When multiple threads access shared data and try to change it simultaneously", correct: true },
                { text: "When a program runs too fast", correct: false },
                { text: "When CPU usage is 100%", correct: false },
                { text: "When memory gets full", correct: false }
            ]
        },
        {
            question: "What is the difference between asymmetric and symmetric encryption?",
            answers: [
                { text: "Asymmetric uses different keys for encryption and decryption", correct: true },
                { text: "Symmetric is more secure", correct: false },
                { text: "Asymmetric is always faster", correct: false },
                { text: "There is no difference", correct: false }
            ]
        }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

console.log('Script loaded');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const startButton = document.getElementById('start-btn');
    console.log('Start button:', startButton);
    const quizContainer = document.getElementById('quiz');
    const homeContainer = document.getElementById('home');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreElement = document.getElementById('score');
    const questionCounterElement = document.getElementById('questionCounter');
    const endContainer = document.getElementById('end');
    const finalScoreElement = document.getElementById('final-score');
    const playAgainButton = document.getElementById('play-again-btn');
    const goHomeButton = document.getElementById('go-home-btn');
    const saveScoreButton = document.getElementById('save-score-btn');

    startButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', startGame);
    goHomeButton.addEventListener('click', goHome);
    saveScoreButton.addEventListener('click', saveScore);

    function startGame() {
        homeContainer.classList.add('hide');
        endContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        
        // Reset game state
        score = 0;
        currentQuestionIndex = 0;
        scoreElement.innerText = score;
        
        // Select questions based on difficulty
        const easyQuestions = questions.easy.sort(() => Math.random() - 0.5).slice(0, 4);
        const mediumQuestions = questions.medium.sort(() => Math.random() - 0.5).slice(0, 3);
        const hardQuestions = questions.hard.sort(() => Math.random() - 0.5).slice(0, 3);
        
        // Combine questions
        currentQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions]
            .sort(() => Math.random() - 0.5);
        
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(currentQuestions[currentQuestionIndex]);
        questionCounterElement.innerText = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        
        if (correct) {
            score += 10;
            scoreElement.innerText = score;
        }

        // Disable all buttons after selection
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
        });

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentQuestions.length) {
                setNextQuestion();
            } else {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        quizContainer.classList.add('hide');
        endContainer.classList.remove('hide');
        finalScoreElement.innerText = `Final Score: ${score}`;
    }

    function goHome() {
        endContainer.classList.add('hide');
        homeContainer.classList.remove('hide');
    }

    function saveScore() {
        const username = document.getElementById('username').value;
        if (!username) return;
        
        // Here you can implement the logic to save the score
        // For now, we'll just log it
        console.log(`Score saved: ${username} - ${score}`);
        goHome();
    }
}); 
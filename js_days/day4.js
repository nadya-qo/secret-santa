// ===== День 4 =====

const words = [
  'РАДОСТЬ', 'ЗВЕЗДА', 'ПРАЗДНИК', 'ЧУДЕСНЫЙ', 'ВОЛШЕБСТВО', 'СКАЗОЧНЫЙ',
  'ПРИКЛЮЧЕНИЕ', 'КОЛОКОЛЬЧИК', 'СЕРПАНТИН', 'СКАЗОЧНОСТЬ', 'ПРАЗДНОВАНИЕ',
  'ПРЕДВКУШЕНИЕ', 'МАНДАРИНОВЫЙ', 'СЕРЕБРЯНЫЙ'
];
let availableWords = [...words];

const lettersEl = document.getElementById('letters');
const answerEl = document.getElementById('answer');
const countEl = document.getElementById('count');
const winEl = document.getElementById('win');

let currentWord = '';
let shuffledLetters = [];
let userAnswer = '';
let successCount = 0;

// старт игры
startRound();

function startRound() {
  if (availableWords.length === 0) {
    availableWords = [...words];
  }

  lettersEl.innerHTML = '';
  answerEl.textContent = '';
  userAnswer = '';

  const index = Math.floor(Math.random() * availableWords.length);
  currentWord = availableWords[index];
  availableWords.splice(index, 1); // удаляем туту слово

  shuffledLetters = currentWord
    .split('')
    .sort(() => Math.random() - 0.5);

  shuffledLetters.forEach(letter => {
    const btn = document.createElement('div');
    btn.className = 'letter';
    btn.textContent = letter;

    btn.addEventListener('click', () => {
      btn.classList.add('used');
      userAnswer += letter;
      answerEl.textContent = userAnswer;

      if (userAnswer.length === currentWord.length) {
        checkAnswer();
      }
    });

    lettersEl.appendChild(btn);
  });
}

function checkAnswer() {
  if (userAnswer === currentWord) {
    successCount++;
    countEl.textContent = successCount;

    if (successCount >= 5) {
      finishGame();
    } else {
      setTimeout(startRound, 600);
    }
  } else {
    // если ошибка - сбрасысваем
    setTimeout(startRound, 600);
  }
}

function finishGame() {
  lettersEl.innerHTML = '';
  answerEl.textContent = '';
  answerEl.classList.add("hidden");
  winEl.classList.remove('hidden');
}
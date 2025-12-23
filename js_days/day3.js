// ===== День 3 =====
const gameArea = document.getElementById('gameArea');
const santa = document.getElementById('santa');
const scoreEl = document.getElementById('score');
const secretWord = document.getElementById('secretWord');

let score = 0;
let gameFinished = false;

const animals = ['🐰', '🦊', '🐻', '🐿️', '🦝', '🦉', '🦌'];

const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
santa.textContent = randomAnimal;

// двидения Санты
function moveSanta(clientX) {
  const rect = gameArea.getBoundingClientRect();
  let x = clientX - rect.left;

  // ограничения, чтобы не вылезал за края
  x = Math.max(20, Math.min(x, rect.width - 20));

  santa.style.left = x + 'px';
}

/* ===== управление мышкой ===== */
gameArea.addEventListener('mousemove', (e) => {
  moveSanta(e.clientX);
});

/* ===== управление пальцем ===== */
gameArea.addEventListener('touchmove', (e) => {
  e.preventDefault(); // важно!
  const touch = e.touches[0];
  moveSanta(touch.clientX);
}, { passive: false });

/* ===== падающие подарки ===== */
function createSnowflake() {
  const flake = document.createElement('div');
  flake.classList.add('snowflake');
  flake.textContent = '🎁';

  const left = Math.random() * 90 + 5;
  const duration = Math.random() * 2 + 2;

  flake.style.left = left + '%';
  flake.style.animationDuration = duration + 's';

  gameArea.appendChild(flake);

  const checkCollision = setInterval(() => {
    const flakeRect = flake.getBoundingClientRect();
    const santaRect = santa.getBoundingClientRect();

    if (
      flakeRect.bottom >= santaRect.top &&
      flakeRect.left < santaRect.right &&
      flakeRect.right > santaRect.left
    ) {
      score++;
      scoreEl.textContent = score;
      flake.remove();
      clearInterval(checkCollision);

      if (score >= 30) {
        finishGame();
      }
    }
  }, 50);

  setTimeout(() => {
    flake.remove();
    clearInterval(checkCollision);
  }, duration * 1000);
}

function finishGame() {
  if (!gameFinished) {
    gameFinished = true;
    secretWord.classList.remove('hidden');
  }
}

// старт игры
setInterval(createSnowflake, 800);

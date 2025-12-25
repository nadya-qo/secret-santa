// ===== День 5 =====

// настройки
let TOTAL_DUCKS = 74;
let TOTAL_NOISE = 386;
const WIN_AT = 15;
const TIME_LIMIT = 30;

// ето чтобы за экран не выходили эмодзи на мобильных
let widthO = 96;
const mediaQuery = window.matchMedia('(max-width: 600px)');
function handleTabletChange(e) {
  if (e.matches) {
     widthO = 90;
     TOTAL_DUCKS = 62;
     TOTAL_NOISE = 257;
  } else {
     widthO = 96;
     TOTAL_DUCKS = 74;
     TOTAL_NOISE = 386;
  }
}
handleTabletChange(mediaQuery);

// эмодзи
const GOOD_DUCKS = ['🐥','🐣','🦆','🐤'];
const BAD = ['🐔','🐦','🦉','🪿','🦢','😺'];
const NEUTRAL = ['🍂','❄️','🌲','🎄','🎁','⭐','✨','🍬','🧦','🧸','🦤','🦊'];

// ищем уточек
const layers = {
  back: document.querySelector('.duck-layer.back'),
  mid: document.querySelector('.duck-layer.mid'),
  front: document.querySelector('.duck-layer.front')
};

const foundEl = document.getElementById('found');
const winMessage = document.getElementById('winMessage');
const timeEl = document.getElementById('time');
const endPopup = document.getElementById('endPopup');
const finalScoreEl = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// состояние - (не состояние) я лучше бы спать пошла
let found = 0;
let timeLeft = TIME_LIMIT;
let gameOver = false;

// для рандома
function random(min, max) {
  return Math.random() * (max - min) + min;
}
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// уточки создаюца
function createDuck() {
  const duck = document.createElement('div');
  duck.className = 'duck';
  duck.textContent = randomItem(GOOD_DUCKS);

  const layerKeys = Object.keys(layers);
  const layer = layerKeys[Math.floor(Math.random() * layerKeys.length)];
  layers[layer].appendChild(duck);

  duck.style.left = random(2, widthO) + '%';
  duck.style.top = random(2, 90) + '%';
  duck.style.transform = `rotate(${random(-25, 25)}deg)`;

  if (Math.random() > 0.7) duck.classList.add('float');

  duck.addEventListener('click', () => {
    if (gameOver) return;
    if (duck.classList.contains('found')) return;

    duck.classList.add('found');
    found++;
    foundEl.textContent = found;

    if (found === WIN_AT) {
      winMessage.style.display = 'block';
    }
  });
}

// создаюца все остальные эмодзи
function createNoise() {
  const noise = document.createElement('div');
  noise.className = 'duck';
  noise.textContent = Math.random() > 0.5
    ? randomItem(BAD)
    : randomItem(NEUTRAL);

  const layerKeys = Object.keys(layers);
  const layer = layerKeys[Math.floor(Math.random() * layerKeys.length)];
  layers[layer].appendChild(noise);

  noise.style.left = random(1, widthO) + '%';
  noise.style.top = random(6, 94) + '%';
  noise.style.transform = `rotate(${random(-40, 40)}deg)`;
  noise.style.opacity = random(0.25, 0.9);

  if (Math.random() > 0.6) noise.classList.add('float');

  noise.addEventListener('click', () => {
    if (gameOver) return;

    // плохие эмодзи - штраф
    if (BAD.includes(noise.textContent)) {
      found = Math.max(-26, found - 1);
      foundEl.textContent = found;
    }

    noise.remove();
  });
}

// таймер
const timerInterval = setInterval(() => {
  if (gameOver) return;

  timeLeft--;
  timeEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}, 1000);

// конец игры
function endGame() {
  gameOver = true;
  clearInterval(timerInterval);

  finalScoreEl.textContent = found;
  endPopup.style.display = 'flex';
}
// рестарт
restartBtn.addEventListener('click', () => {
  location.reload();
});
// старт
for (let i = 0; i < TOTAL_DUCKS; i++) {
  createDuck();
}
for (let i = 0; i < TOTAL_NOISE; i++) {
  createNoise();
}

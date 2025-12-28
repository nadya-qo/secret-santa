const symbols = ['🎁','🎄','⭐','🎅','🍬','❄️','🍪','🔔'];
const rounds = [
  { cols: 4, rows: 4 },
  { cols: 3, rows: 4 },
  { cols: 4, rows: 3 }
];

let round = 0;
let opened = [];
let matched = 0;

const grid = document.getElementById('grid');
const roundEl = document.getElementById('round');
const messageEl = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startRound() {
  messageEl.classList.remove('win');
  grid.innerHTML = '';
  opened = [];
  matched = 0;

  const config = rounds[round];
  const total = config.cols * config.rows;
  const pairs = total / 2;

  grid.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
  roundEl.textContent = round + 1;
  messageEl.textContent = '';

  const pool = shuffle(symbols).slice(0, pairs);
  const tiles = shuffle([...pool, ...pool]);

  tiles.forEach(symbol => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.symbol = symbol;

    tile.innerHTML = `
      <div class="tile-inner">
        <div class="tile-face tile-front"></div>
        <div class="tile-face tile-back">${symbol}</div>
      </div>
    `;

    tile.addEventListener('click', () => onClick(tile));
    grid.appendChild(tile);
  });
}

function onClick(tile) {
  if (
    tile.classList.contains('open') ||
    tile.classList.contains('matched') ||
    opened.length === 2
  ) return;

  tile.classList.add('open');
  opened.push(tile);

  if (opened.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = opened;

  if (a.dataset.symbol === b.dataset.symbol) {
    a.classList.add('matched');
    b.classList.add('matched');
    matched += 2;
    opened = [];

    if (matched === grid.children.length) {
      setTimeout(nextRound, 700);
    }
  } else {
    setTimeout(() => {
      a.classList.remove('open');
      b.classList.remove('open');
      opened = [];
    }, 900);
  }
}

function nextRound() {
  if (round < rounds.length - 1) {
    round++;
    messageEl.textContent = 'Отлично! Следующий раунд';
    messageEl.classList.add('win');
    setTimeout(startRound, 1000);
  } else {
    messageEl.textContent = '🎁 Огонь! Слово дня: СЕКУНДЫ';
    messageEl.classList.add('win');
  }
}

startRound();

// рестарт
restartBtn.addEventListener('click', () => {
  location.reload();
});
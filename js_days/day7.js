(() => { //какой-то из скриптов или хер знает что перебивает этот, поэтому костыль - todo
  const treeArea = document.getElementById('treeArea');
  const decors = document.querySelectorAll('.decor');
  const finalMessage = document.getElementById('finalMessage');
  const timeEl = document.getElementById('time');

  let selectedDecor = null;
  let gameEnded = false;

  // таймер
  let totalTime = 90;

  const timer = setInterval(() => {
    totalTime--;

    const minutes = String(Math.floor(totalTime / 60)).padStart(2, '0');
    const seconds = String(totalTime % 60).padStart(2, '0');
    timeEl.textContent = `${minutes}:${seconds}`;

    if (totalTime <= 0) {
      endGame();
    }
  }, 1000);

  // выбор украшений. сначала нажали-выбрали, потом крепим
  decors.forEach(decor => {
    decor.addEventListener('click', () => {
      if (gameEnded) return;

      decors.forEach(d => d.classList.remove('active'));
      decor.classList.add('active');
      selectedDecor = decor.dataset.icon;
    });
  });

  // ставим украшения на елку
  treeArea.addEventListener('click', e => {
    if (!selectedDecor || gameEnded) return;

    const rect = treeArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const item = document.createElement('div');
    item.className = 'placed-decor';
    item.textContent = selectedDecor;
    item.style.left = x - 14 + 'px';
    item.style.top = y - 14 + 'px';

    treeArea.appendChild(item);
  });

  // конец игры
  function endGame() {
    clearInterval(timer);
    gameEnded = true;
    selectedDecor = null;

    decors.forEach(d => d.classList.remove('active'));
    finalMessage.style.display = 'block';
  }
})();

// рестарт
restartBtn.addEventListener('click', () => {
  location.reload();
});
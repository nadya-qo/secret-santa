// ===== День 1 =====
const grid = document.getElementById('giftsGrid');
const triesEl = document.getElementById('tries');
const message = document.getElementById('gameMessage');

if (grid) {
   const TOTAL_GIFTS = 9;
   const FULL_GIFTS = 3;
   let tries = 6;
   let found = 0;
   let gameOver = false;

   // создаём подарки
   const gifts = Array(TOTAL_GIFTS).fill('empty');

   // рандомно выбираем 3 непустых
   let placed = 0;
   while (placed < FULL_GIFTS) {
      const i = Math.floor(Math.random() * TOTAL_GIFTS);
      if (gifts[i] === 'empty') {
      gifts[i] = 'full';
      placed++;
      }
   }

   // рендер подарков
   gifts.forEach(type => {
      const gift = document.createElement('div');
      gift.className = 'gift';
      gift.textContent = '🎁';

      gift.addEventListener('click', () => {
      if (gameOver || gift.classList.contains('opened')) return;

      gift.classList.add('opened');
      tries--;
      triesEl.textContent = tries;

      if (type === 'full') {
         gift.textContent = '⭐';
         gift.classList.add('full');
         found++;

         if (found === FULL_GIFTS) {
            gameOver = true;
            message.textContent = '🎁 УРА! СЛОВО ДНЯ: ДЛИТСЯ';
            message.className = 'result win';
            message.classList.remove('hidden');
         }
      } else {
         gift.textContent = '❄️';
         gift.classList.add('empty');
      }

      if (tries === 0 && !gameOver) {
         gameOver = true;
         message.textContent = '❌ Попытки закончились. Попробуй ещё раз)';
         message.className = 'result lose';
         message.classList.remove('hidden');
      }
      });

      grid.appendChild(gift);
   });
}
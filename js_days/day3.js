   // --- День 3 ---
   const gameArea = document.getElementById('gameArea');
   const santa = document.getElementById('santa');
   const scoreEl = document.getElementById('score');
   const secretWord = document.getElementById('secretWord');

   let score = 0;
   let gameFinished = false;

   // движение Санты мышкой
   gameArea.addEventListener('mousemove', e => {
   const rect = gameArea.getBoundingClientRect();
   let x = e.clientX - rect.left;
   x = Math.max(20, Math.min(x, rect.width - 20));
   santa.style.left = x + 'px';
   });

   // создание снежинки
   function createSnowflake() {
      const flake = document.createElement('div');
      flake.classList.add('snowflake');
      flake.textContent = '🎁';

      const left = Math.random() * 100;
      const duration = Math.random() * 2 + 2;

      flake.style.left = left + '%';
      flake.style.animationDuration = duration + 's';

      gameArea.appendChild(flake);

      // проверка столкновения
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

            if (score >= 10) {
            finishGame();
            }
         }
      }, 50);

      // удаление, если упала
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

   // старт
   setInterval(createSnowflake, 800);
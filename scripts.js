// таймер
const timerEl = document.getElementById("timer");

if (timerEl) {
  const targetDate = new Date("2025-12-30T12:00:00").getTime();
  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    if (diff <= 0) {
      timerEl.textContent = "Пора дарить подарки 🎁";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    timerEl.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}
// попап с картинкой
document.addEventListener('DOMContentLoaded', () => {
  const santa = document.querySelector('.santa');
  const popup = document.getElementById('memePopup');
  const overlay = popup.querySelector('.meme-popup__overlay');
  const closeBtn = popup.querySelector('.meme-popup__close');

  if (!santa || !popup) return;
  // открыть попап
  santa.addEventListener('click', () => {
    popup.style.display = 'block';
  });
  // закрыть по крестику
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
  // закрыть по клику на затемнение
  overlay.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});

// звездочки от курсора
const SNOW_INTERVAL = 120; // интервал генерации (мс)
const OFFSET_X = -25; // смещение от курсора
const OFFSET_Y = -32;
let lastSnowTime = 0;

// создание звездочке
function createCursorSnowflake(x, y) {
  const snow = document.createElement('div');
  snow.className = 'cursor-snowflake';
  snow.textContent = '⭐';
  // стартовая позиция
  snow.style.left = (x + OFFSET_X) + 'px';
  snow.style.top  = (y + OFFSET_Y) + 'px';
  // направление и дальность улета
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 120 + 60;

  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  snow.style.setProperty('--x', dx + 'px');
  snow.style.setProperty('--y', dy + 'px');

  document.body.appendChild(snow);
  // удаляем после анимации
  setTimeout(() => {
    snow.remove();
  }, 1200);
}
// для мышки
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSnowTime < SNOW_INTERVAL) return;
  lastSnowTime = now;
  createCursorSnowflake(e.clientX, e.clientY);
});
// для мобилки тач
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  if (!touch) return;
  const now = Date.now();
  if (now - lastSnowTime < SNOW_INTERVAL) return;
  lastSnowTime = now;
  createCursorSnowflake(touch.clientX, touch.clientY);
}, { passive: true });

console.log('scripts.js загружен');
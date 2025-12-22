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

console.log('scripts.js загружен');
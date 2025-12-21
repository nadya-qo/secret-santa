// TIMER
const targetDate = new Date("2025-12-30T07:00:00").getTime();
const timerEl = document.getElementById("timer");

function updateTimer() {
  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff <= 0) { timerEl.textContent = "Пора дарить подарки 🎁"; return; }
  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff/(1000*60*60)) %24);
  const minutes = Math.floor((diff/(1000*60)) %60);
  const seconds = Math.floor((diff/1000)%60);
  timerEl.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
}
updateTimer();
setInterval(updateTimer, 1000);


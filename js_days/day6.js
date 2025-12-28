const WIN_AT = 10;

const field = document.getElementById('field');
const slingshot = document.getElementById('slingshot');
const chimneys = document.querySelectorAll('.chimney');
const scoreEl = document.getElementById('score');
const winMessage = document.getElementById('winMessage');

let score = 0;
let gift = null;
let startX = 0;
let startY = 0;

/* ---------- CREATE GIFT ---------- */
function createGift() {
  gift = document.createElement('div');
  gift.className = 'gift';
  gift.textContent = '🎁';

  const slingRect = slingshot.getBoundingClientRect();
  const fieldRect = field.getBoundingClientRect();

  gift.style.left = slingRect.left - fieldRect.left + 10 + 'px';
  gift.style.top = slingRect.top - fieldRect.top - 10 + 'px';

  field.appendChild(gift);

  gift.addEventListener('pointerdown', onStart);
}

/* ---------- DRAG ---------- */
function onStart(e) {
  startX = e.clientX;
  startY = e.clientY;

  gift.setPointerCapture(e.pointerId);
  gift.addEventListener('pointerup', onRelease);
}

/* ---------- RELEASE ---------- */
function onRelease(e) {
  const dx = startX - e.clientX;
  const dy = startY - e.clientY;

  launchGift(dx, dy);
  gift.removeEventListener('pointerup', onRelease);
}

/* ---------- PHYSICS ---------- */
function launchGift(dx, dy) {
  let x = gift.offsetLeft;
  let y = gift.offsetTop;

  let vx = dx * 0.12;
  let vy = dy * 0.12;

  function fly() {
    vx *= 0.99;
    vy += 0.4; // гравитация

    x += vx;
    y += vy;

    gift.style.left = x + 'px';
    gift.style.top = y + 'px';

    if (checkHit()) {
      score++;
      scoreEl.textContent = score;

      gift.remove();
      gift = null;

      if (score >= WIN_AT) {
        winMessage.classList.remove('hidden');
      } else {
        setTimeout(createGift, 300);
      }
      return;
    }

    if (y > field.clientHeight || x > field.clientWidth) {
      gift.remove();
      gift = null;
      setTimeout(createGift, 300);
      return;
    }

    requestAnimationFrame(fly);
  }

  fly();
}

/* ---------- HIT CHECK ---------- */
function checkHit() {
  const giftRect = gift.getBoundingClientRect();

  for (let ch of chimneys) {
    const rect = ch.getBoundingClientRect();

    if (
      giftRect.right > rect.left &&
      giftRect.left < rect.right &&
      giftRect.bottom > rect.top &&
      giftRect.top < rect.bottom
    ) {
      return true;
    }
  }
  return false;
}

/* ---------- START ---------- */
createGift();

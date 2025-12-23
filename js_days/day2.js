// ===== День 2 =====
const correctAnswer = 'ёлка';

const input = document.getElementById('answerInput');
const btn = document.getElementById('checkBtn');
const result = document.getElementById('result');

if (btn) {
btn.addEventListener('click', () => {
   const userAnswer = input.value.trim().toLowerCase();

   input.disabled = true;
   btn.disabled = true;

   if (userAnswer === correctAnswer) {
      result.textContent = '🎁 ПРАВИЛЬНО! СЛОВО ДНЯ: ВСЕ';
      result.classList.add('win');
   } else {
      result.textContent = '❌ Неа! Попробуй еще раз)';
      result.classList.add('lose');
   }

   result.classList.remove('hidden');
});
}
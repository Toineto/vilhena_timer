document.addEventListener("DOMContentLoaded", function() {
  const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');

  // Função para formatar o tempo em minutos e segundos
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  }

  // Função para atualizar e exibir o temporizador
  function displayTimeLeft(seconds) {
    timerDisplay.textContent = formatTime(seconds);
  }

  // Função para iniciar o temporizador com o tempo especificado
  function startTimer(minutes) {
    let secondsRemaining = minutes * 60;
    displayTimeLeft(secondsRemaining);
    const timerInterval = setInterval(() => {
      secondsRemaining--;
      displayTimeLeft(secondsRemaining);
      if (secondsRemaining <= 0) {
        clearInterval(timerInterval);
        alert('Tempo esgotado!');
      }
    }, 1000);
  }

  // Evento de clique no botão de iniciar
  startBtn.addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('minutes').value);
    if (minutes > 0) {
      startTimer(minutes);
    } else {
      alert('Por favor, insira um valor de minutos válido.');
    }
  });
});

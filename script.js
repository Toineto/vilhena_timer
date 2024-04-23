document.addEventListener("DOMContentLoaded", function() {
  const timerDisplay = document.getElementById('timer');
  const stoppedDisplay = document.getElementById('stopped');
  const startBtn = document.getElementById('startBtn');

  // Função para formatar o tempo em minutos e segundos
  function formatTime(minutes, seconds) {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Função para atualizar e exibir o temporizador
  function displayTimeLeft(minutes, seconds) {
    timerDisplay.textContent = formatTime(minutes, seconds);
  }

  // Função para iniciar o temporizador com o tempo especificado
  function startTimer(minutes, seconds) {
    let totalSeconds = (minutes * 60) + seconds;
    displayTimeLeft(minutes, seconds);
    const timerInterval = setInterval(() => {
      totalSeconds--;
      const remainingMinutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;
      displayTimeLeft(remainingMinutes, remainingSeconds);
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00';
        stoppedDisplay.textContent = 'PAROU';
      }
    }, 1000);
  }

  // Evento de clique no botão de iniciar
  startBtn.addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);
    if (minutes > 0 || seconds > 0) {
      startTimer(minutes, seconds);
    } else {
      alert('Por favor, insira um valor válido de minutos ou segundos.');
    }
  });
});

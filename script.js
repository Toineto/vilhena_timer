let interval;
let remainingTime; // Variável para armazenar o tempo restante quando o temporizador é pausado

const btnStart = document.getElementById('btn-start');
const stopButton = document.getElementById('btn-stop');
const continueButton = document.getElementById('btn-continue');
const pauseButton = document.getElementById('btn-pause');
const presetButtons = document.querySelectorAll('.preset');

btnStart.addEventListener('click', () => {
  const hours = document.getElementById('hour');
  const minutes = document.getElementById('minute');
  const seconds = document.getElementById('second');

  let duration = (parseInt(hours.value) * 60 * 60) + (parseInt(minutes.value) * 60) + parseInt(seconds.value);

  const display = document.getElementById('timer');
  timer(duration, display);

  btnStart.disabled = true; // Desativa o botão "Iniciar"
});

presetButtons.forEach(button => {
  button.addEventListener('click', () => {
    const minutes = parseInt(button.dataset.minutes);
    const duration = minutes * 60;

    const display = document.getElementById('timer');
    timer(duration, display);

    btnStart.disabled = true; // Desativa o botão "Iniciar"
  });
});

const timer = (duration, display) => {
  let timer = duration;
  let hours, minutes, seconds;

  interval = setInterval(() => {
    hours = Math.floor((timer / 60) / 60);
    minutes = Math.floor(timer / 60 - (hours * 60));
    seconds = Math.floor(timer % 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;

    timer -= 1;

    if (timer < 0) {
      display.innerHTML = 'PAROU !!!';
      clearInterval(interval);
      playSound(); // Chama a função para reproduzir o som
      btnStart.disabled = false; // Reativa o botão "Iniciar"
    }
  }, 1000);
};

stopButton.addEventListener('click', () => {
  clearInterval(interval);
  const display = document.getElementById('timer');
  display.innerHTML = '00:00:00'; // Reinicia o contador
  btnStart.disabled = false; // Reativa o botão "Iniciar"
});

pauseButton.addEventListener('click', () => {
  clearInterval(interval);
  remainingTime = calculateRemainingTime(); // Calcula o tempo restante em segundos
});

continueButton.addEventListener('click', () => {
  const display = document.getElementById('timer');
  timer(remainingTime, display);

  btnStart.disabled = true; // Desativa o botão "Iniciar"
});

function calculateRemainingTime() {
  const display = document.getElementById('timer');
  const [hours, minutes, seconds] = display.innerHTML.split(':').map(part => parseInt(part));
  return (hours * 60 * 60) + (minutes * 60) + seconds; // Retorna o tempo restante em segundos
}

function playSound() {
  const audio = document.getElementById('audio');
  audio.play();
}

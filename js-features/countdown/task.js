const timerElement = document.getElementById("timer");
let counter = +timerElement.textContent;
let intervalId = null;

function updateCounter() {
  counter -= 1;
  if (counter < 0) {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      alert("Вы победили в конкурсе!");
    }
  } else {
    timerElement.textContent = counter;
  }
}

intervalId = setInterval(updateCounter, 1000);
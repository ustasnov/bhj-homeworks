let counter = +document.getElementById("timer").textContent;
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
    document.getElementById("timer").textContent = counter;
  }
}

intervalId = setInterval(updateCounter, 1000);
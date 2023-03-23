let counter = +document.getElementById("timer").textContent;
let intervalId = null;

function updateCounter() {
  document.getElementById("timer").textContent = counter--;
  if (counter < 0) {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      alert("Вы победили в конкурсе!");
    }  
  }
}

intervalId = setInterval(updateCounter, 1000);
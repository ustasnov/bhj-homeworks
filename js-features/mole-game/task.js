const deadElement = document.getElementById("dead");
const lostElement = document.getElementById("lost");
const getHole = index => document.getElementById(`hole${index}`);

function finishGame(finishMessage) {
  playin = false;
  alert(finishMessage);   
  deadElement.textContent = "0";
  lostElement.textContent = "0";
}

function clickHandler() {
  if (this.className.includes("hole_has-mole")) {
    deadElement.textContent = +deadElement.textContent + 1;
    if (deadElement.textContent === "10") {
      finishGame("Победа!")
    }
  } else {
    lostElement.textContent = +lostElement.textContent + 1;  
    if (lostElement.textContent === "5") {
      finishGame("Вы проиграли!")
    }
  }
}

for (let i = 1; i < 10; i++) {
  getHole(i).onclick = clickHandler;
}

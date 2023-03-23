let deadCount = 0;
let lostCount = 0;
let dead = document.getElementById("dead");
let lost = document.getElementById("lost");
const getHole = index => document.getElementById(`hole${index}`);

function resetResults() {
  deadCount = 0;
  lostCount = 0;
  dead.textContent = deadCount;
  lost.textContent = lostCount;
}

function clickHandler() {
  if (this.className.includes("hole_has-mole")) {
    deadCount++;
    dead.textContent = deadCount;
    if (deadCount === 10) {
      playin = false;
      alert("Победа!");
      resetResults();
    }
  } else {
    lostCount++;
    lost.textContent = lostCount;
    if (lostCount === 5) {
      playin = false;
      alert("Вы проиграли!");
      resetResults();
    }
  }
}

for (let i = 1; i < 10; i++) {
  getHole(i).onclick = clickHandler;
}

let deadCount = 0;
let lostCount = 0;
let dead = document.getElementById("dead");
let lost = document.getElementById("lost");
const getHole = index => document.getElementById(`hole${index}`);

function clickHandler() {
  if (this.className.includes("hole_has-mole")) {
    deadCount++;
    dead.textContent = deadCount;
    if (deadCount === 10) {
      playin = false;
      alert("Победа!");
      this.resetResults();
    }
  } else {
    lostCount++;
    lost.textContent = lostCount;
    if (lostCount === 5) {
      playin = false;
      alert("Вы проиграли!");
      this.resetResults();
    }
  }
}

for (let i = 1; i < 10; i++) {
  getHole(i).onclick = clickHandler;
}

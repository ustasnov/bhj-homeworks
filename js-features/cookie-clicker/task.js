const counterElement = document.getElementById("clicker__counter");
const speedElement = document.getElementById("clicker__speed");
const cookieElement = document.getElementById("cookie");
let oldDate = Date.now();

cookieElement.onclick = () => {
  let newDate = Date.now();
  speedElement.textContent = `${(1000 / (newDate - oldDate)).toFixed(2)}`;
  oldDate = newDate;
  counterElement.textContent = +counterElement.textContent + 1;
  cookieElement.width = cookieElement.width === 200 ? 250 : 200;
}



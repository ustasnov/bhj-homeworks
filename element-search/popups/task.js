const mainWindow = document.getElementById("modal_main");
const successWindow = document.getElementById("modal_success");
let activeWindow = null;

function setWindowState(element, active) {
  if (element) {
    if (active) {
      element.classList.add("modal_active");
      activeWindow = element;
    } else {
      element.classList.remove("modal_active");
      activeWindow = null;
    }
  }
}

mainWindow.querySelector("a.modal__close").onclick = () => {
  setWindowState(mainWindow, false);
  setWindowState(successWindow, true);
}

document.querySelectorAll("div.modal__close").forEach(element => {
  element.onclick = () => setWindowState(activeWindow, false);
});

setWindowState(mainWindow, true);
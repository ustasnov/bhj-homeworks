function setActiveCase(element) {
  element.classList.add("rotator__case_active");
  element.style.color = element.dataset.color;
}

function runRotateLoop() {
  let activeCases;

  function rotate(i) {
    if (i === 0) {
      activeCases = Array.from(document.querySelectorAll(".rotator__case_active"));
    }
    const element = activeCases[i];
    element.style.color = element.dataset.color;

    setTimeout(() => {
      element.classList.remove("rotator__case_active");
      const rotator = element.closest(".rotator");
      const rotatorCases = Array.from(rotator.querySelectorAll(".rotator__case"));
      let index = rotatorCases.indexOf(element);
      index === rotatorCases.length - 1 ? index = 0 : index += 1;
      setActiveCase(rotatorCases[index]);
      rotate(i < activeCases.length - 1 ? i + 1 : 0);
    }, element.dataset.speed);
  }

  rotate(0);
}

runRotateLoop();


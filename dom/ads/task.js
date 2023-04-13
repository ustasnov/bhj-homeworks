function runRotateLoop() {
  setInterval(() => {
    const activeCases = Array.from(document.querySelectorAll(".rotator__case_active"));
    activeCases.forEach(element => {
      element.classList.remove("rotator__case_active");
      const rotator = element.closest(".rotator");
      const rotatorCases = Array.from(rotator.querySelectorAll(".rotator__case"));
      let index = rotatorCases.indexOf(element);
      index === rotatorCases.length - 1 ? index = 0 : index += 1;
      rotatorCases[index].classList.add("rotator__case_active");
    });
  }, 1000);
}

runRotateLoop();


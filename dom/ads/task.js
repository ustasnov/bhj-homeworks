const rotators = document.querySelectorAll(".rotator");

function setActiveCase(element) {
  element.classList.add("rotator__case_active");
  element.style.color = element.dataset.color;
}

function rotate() {
  rotators.forEach(element => {
    const rotatorCases = Array.from(element.querySelectorAll(".rotator__case"));
    if (rotatorCases.length > 0) {
      let activeCase = element.querySelector(".rotator__case_active");
      if (!activeCase) {
        activeCase = rotatorCases[0];
      }
      setActiveCase(activeCase);  
      setTimeout( () => {
        activeCase.classList.remove("rotator__case_active");
        let index = rotatorCases.indexOf(activeCase);
        index === rotatorCases.length - 1 ? index = 0 : index += 1;
        setActiveCase(rotatorCases[index]);
        rotate();
      }, activeCase.dataset.speed);
    }
  })
};

rotate();


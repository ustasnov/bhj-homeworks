const checkBoxes = Array.from(document.querySelectorAll(".interest__check"));
const rootElement = document.querySelector(".interests_main");

function setParentsState() {
  const interests = rootElement.querySelectorAll(".interest");
  interests.forEach(interest => {
    const checks = Array.from(interest.querySelectorAll(".interest__check"));
    let checksLength = 0;
    let checksCount = 0;
    checks.forEach(check => {
      if (check.checked) {
        checksCount++;
      }
      if (!check.indeterminate) {
        checksLength++;
      }
    });
    checks[0].indeterminate = false;
    if (checksCount === 0) {
      checks[0].checked = false;
    } else if (checksCount === checksLength) {
      checks[0].checked = true;
    } else if (checksCount < checksLength) {
      checks[0].checked = false;
      checks[0].indeterminate = true;
    }
  });
}

function checkBoxChangeHandler(event) {
  const check = event.currentTarget;
  const _parent = check.closest(".interest");
  Array.from(_parent.querySelectorAll(".interest__check"))
    .forEach(element => {
      element.checked = check.checked
    });
  setParentsState();
}

checkBoxes.forEach(element => {
  element.addEventListener("change", checkBoxChangeHandler);
})
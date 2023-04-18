const checkBoxes = Array.from(document.querySelectorAll(".interest__check"));

function setParentsState(element) {
  let _parent = element.closest(".interest");
  if (_parent) {
    const childElements = Array.from(_parent.querySelectorAll(".interest"));
    let checkedCount = 0;
    childElements.forEach(child => {
      checkedCount += child.childs[0].childs[0].checked ? 1 : 0;
    });
    _input = _parent.childs[0].childs[0];
    _input.indeterminate = false;
    if (checkedCount === 0) {
      _input.checked = false;
    } else if (checkedCount < childElements.length) {
      _input.indeterminate = true;
    } else {
      _input.checked = true;
    }
    _parent = _parent.closest(".interest");
    if (_parent) {
      setParentsState(_parent);
    }
  }
}

function checkBoxChangeHandler(event) {
  const check = event.currentTarget;
  const _parent = check.closest(".interest");
  Array.from(_parent.querySelectorAll(".interest__check"))
    .forEach(element => { 
      element.checked = check.checked 
    });
  setParentsState(_parent);
}

checkBoxes.forEach(element => {
  element.addEventListener("change", checkBoxChangeHandler);
})
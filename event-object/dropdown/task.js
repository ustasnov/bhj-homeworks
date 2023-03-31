function clickDropdownHandler(event) {
  const parent = event.currentTarget.closest("div.dropdown");
  if (parent) {
    const menu = parent.querySelector("ul.dropdown__list");
    if (menu) {
      menu.classList.contains("dropdown__list_active")
        ? menu.classList.remove("dropdown__list_active") : menu.classList.add("dropdown__list_active")
    }
  }
}

function clickMenuItem(event) {
  let parent = event.currentTarget.closest("div.dropdown");
  if (parent) {
    const button = parent.querySelector("div.dropdown__value");
    const link = event.currentTarget.querySelector("a.dropdown__link");
    if (button && link) {
      button.textContent = link.innerText;
      button.click();
    }
  }
  event.preventDefault();
}

document.querySelectorAll("div.dropdown__value")
  .forEach(element => element.addEventListener("click", clickDropdownHandler));

document.querySelectorAll("li.dropdown__item")
  .forEach(element => element.addEventListener("click", clickMenuItem));


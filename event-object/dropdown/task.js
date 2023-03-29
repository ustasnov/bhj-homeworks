function clickDropdownHandler(event) {
  let parent = event.currentTarget.closest("div.dropdown");
  if (parent) {
    let menu = parent.querySelector("ul.dropdown__list");
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
      localStorage.setItem("gropdown_button_text", link.innerText);
      button.textContent = link.innerText;
    }
  }
}

function setButtonText() {
  let text = localStorage.getItem("gropdown_button_text");  
  if (text) {
    let card = document.querySelector("div.card");
    if (card) {
      let button = card.querySelector("div.dropdown__value");
      if (button) {
        button.textContent = text;
      }
    }
  } else {
    text = "JavaScript";
  }

}

document.querySelectorAll("div.dropdown__value")
  .forEach(element => element.addEventListener("click", clickDropdownHandler));

document.querySelectorAll("li.dropdown__item")
  .forEach(element => element.addEventListener("click", clickMenuItem));

setButtonText();
  
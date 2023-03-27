const subMenus = document.querySelectorAll("ul.menu.menu_sub");

Array.from(document.getElementsByClassName("menu__link")).forEach(element => {
  element.onclick = event => {
    let subMenu = event.currentTarget.closest("li").querySelector("ul.menu.menu_sub");
    if (subMenu) {
      subMenus.forEach(element => {
        element === subMenu ? element.classList.toggle("menu_active") : element.classList.remove("menu_active");
      });
    }
    return subMenu === null;
  }
});

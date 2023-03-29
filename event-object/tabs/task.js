const tabActivityClass = "tab_active";
const tabContentActivityClass = "tab__content_active";

function setActiveElement(element, elementsArray, activityClass) {
  elementsArray.forEach(item => {
    if (item !== element && item.classList.contains(activityClass)) {
      item.classList.remove(activityClass);
    } else if (item === element && !item.classList.contains(activityClass)) {
      item.classList.add(activityClass);
    }
  });
}

function tabClickHandler(event) {
  const parent = event.currentTarget.closest("div.tabs");
  const tabsArray = Array.from(parent.querySelectorAll("div.tab"));
  const tabsContentArray = Array.from(parent.querySelectorAll("div.tab__content"));
  setActiveElement(event.currentTarget, tabsArray, tabActivityClass);
  const tabIndex = tabsArray.indexOf(event.currentTarget);
  if (tabIndex > -1 && tabIndex < tabsContentArray.length) {
    setActiveElement(tabsContentArray[tabIndex], tabsContentArray, tabContentActivityClass);
  }
}

document.querySelectorAll("div.tabs").forEach(elementTabs => {
  elementTabs.querySelectorAll("div.tab").forEach(element => element.addEventListener("click", tabClickHandler));
});
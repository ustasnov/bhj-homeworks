const hrefs = document.querySelectorAll("a.has-tooltip");

function addTooltipElement(element) {
  const bound = element.getBoundingClientRect();
  let tooltipElementText = 
  `<div class="tooltip" style="left: ${Math.floor(bound.left)}; top: 0">
    ${element.getAttribute("title")}
  </div>`;
  element.insertAdjacentHTML("afterEnd", tooltipElementText);
}

function showTooltip(element) {
  Array.from(document.querySelectorAll(".tooltip")).forEach(e => {
    if (e.classList.contains("tooltip_active")) {
      e.classList.remove("tooltip_active");
    }
  });
  element.nextSibling.classList.add("tooltip_active");
}

hrefs.forEach(element => {
    addTooltipElement(element);
    element.addEventListener('click', event => {
      showTooltip(element);
      event.preventDefault();
    });
});
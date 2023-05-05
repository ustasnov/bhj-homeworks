const hrefs = document.querySelectorAll("a.has-tooltip");
const tooltipElementText =
  `<div class="tooltip" style="left: 0; top: 0">
      Проверка!
    </div>`;

const tooltip = addTooltipElement(hrefs[0]);
let currentElement = null;

function addTooltipElement(element) {
  element.insertAdjacentHTML("afterEnd", tooltipElementText);
  return document.querySelector(".tooltip");
}

function showTooltip(element) {
  const bound = element.getBoundingClientRect();

  if (currentElement === element) {
    tooltip.classList.toggle("tooltip_active");
  } else {
    if (currentElement) {
      currentElement.classList.remove("tooltip_active");
    }
    tooltip.classList.add("tooltip_active");
  }
  tooltip.style.top = `${Math.floor(bound.bottom)}px`;
  tooltip.style.left = `${Math.floor(bound.left)}px`;
  tooltip.textContent = element.getAttribute("title");
  currentElement = element;
}

hrefs.forEach(element => {
  element.addEventListener('click', event => {
    showTooltip(element);
    event.preventDefault();
  });
});


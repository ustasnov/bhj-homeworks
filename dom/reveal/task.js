const blocks = document.querySelectorAll(".reveal");

function scrollHandler() {
  blocks.forEach(block => {
    const { top, bottom } = block.getBoundingClientRect();
    if (top > window.innerHeight || bottom < 0) {
      block.classList.remove("reveal_active");
    } else {
      block.classList.add("reveal_active");
    }
  });
}

window.addEventListener("scroll", scrollHandler);
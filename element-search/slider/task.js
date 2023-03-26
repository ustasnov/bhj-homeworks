const slides = Array.from(document.querySelectorAll("div.slider__item"));
const dots = Array.from(document.querySelectorAll("div.slider__dot"));
let curId = 0;

function setActiveSlide(id) {
    if (id > curId && id === slides.length) {
        id = 0;
    } else if (id < curId && id === -1) {
        id = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        if (i === id) {
            slides[i].classList.add("slider__item_active");
            dots[i].classList.add("slider__dot_active");
        } else {
            slides[i].classList.remove("slider__item_active");
            dots[i].classList.remove("slider__dot_active");
        }
    }
    curId = id;
}

function arrowClickHandler(element) {
    if (element.classList.contains("slider__arrow_prev")) {
        setActiveSlide(curId - 1);
    } else if (element.classList.contains("slider__arrow_next")) {
        setActiveSlide(curId + 1);
    }
}

document.querySelectorAll("div.slider__arrow")
    .forEach(element => element.onclick = event => arrowClickHandler(event.currentTarget));

document.querySelectorAll("div.slider__dot")
    .forEach(element => element.onclick = event => setActiveSlide(dots.indexOf(event.currentTarget)));

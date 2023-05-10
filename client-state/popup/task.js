const modalWindow = document.getElementById("subscribe-modal");
const cookieName = "showSubsWin";

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function showModalWindow() {
  modalWindow.classList.add("modal_active");
}

const closeModalWindowButton = document.querySelector(".modal__close");
closeModalWindowButton.addEventListener("click", event => {
  modalWindow.classList.remove("modal_active");
  setCookie(cookieName, "false", { "max-age": 3600 });
});

const _cookie = getCookie(cookieName);
if (!_cookie && _cookie !== "false") {
  showModalWindow();
}


const loaderElement = document.querySelector(".loader");
const items = document.getElementById("items");
let valutes = null;

function getItemElementText(charCode, value) {
  return `<div class="item__code">
            ${charCode}
          </div>
          <div class="item__value">
            ${value}
          </div>
          <div class="item__currency">
            руб.
          </div>`;
}

function fillValutesList() {
  Object.values(valutes).forEach((value, index) => {
    let currentItem = null;
    if (index === 0) {
      currentItem = document.querySelector(".item");
    } else {
      currentItem = document.createElement("div");
      currentItem.classList.add("item");
      items.appendChild(currentItem);
    }
    if (currentItem) {
      currentItem.innerHTML = getItemElementText(value.CharCode, value.Value);
    }
    loaderElement.classList.remove("loader_active");
  });
}

function loadValutes() {
  const valutesData = localStorage.getItem("ValutesData");
  if (valutesData) {
    valutes = JSON.parse(valutesData);
    fillValutesList();
  }
}

function saveValutes() {
  if (valutes) {
    const valutesData = JSON.stringify(valutes);
    try {
      localStorage.setItem("ValutesData", valutesData);
    } catch (e) {
      if (e === QUOTA_EXCEEDED_ERR) {
        console.log('Превышен лимит выделенного пространства для локального хранилища!');
      }
    }
  } else {
    localStorage.removeItem("valutesData");
  }
}

//localStorage.removeItem("ValutesData");
loadValutes();
if (!valutes) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const responseData = JSON.parse(xhr.responseText);
      if (responseData) {
        valutes = responseData.response.Valute;
        fillValutesList();
        saveValutes();
      }
    }
  });
  xhr.send();
}



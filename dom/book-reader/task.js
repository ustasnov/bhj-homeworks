/*
const book = document.getElementById("book");
const settingButtons = Array.from(document.querySelectorAll(".font-size"));

function setBookFontSize(fontSizeClass) {
  if (book.classList.contains("font-size_small")) {
    book.classList.remove("font-size_small");
  } else if (book.classList.contains("font-size_big")) {
    book.classList.remove("font-size_big");
  }
  if (fontSizeClass) {
    book.classList.add(fontSizeClass);
  }
}

function setActiveButton(buttons, activeButton, activeClass) {
    const element = buttons.find(value => value.classList.contains("font-size_active"));
    if (element) {
      element.classList.remove(activeClass);
    }
    activeButton.classList.add(activeClass)
    if (activeButton.classList.contains("font-size_small")) {
      setBookFontSize("font-size_small");
    } else if (activeButton.classList.contains("font-size_big")) {
      setBookFontSize("font-size_big");
    } else {
      setBookFontSize(null);
    }
}

function settingButtonHandler(event) {
  const button = event.currentTarget;
  setActiveButton(settingButtons, button, "font-size_active");
  event.preventDefault();
}

settingButtons.forEach(element => {
  element.addEventListener("click", settingButtonHandler);
});
*/

class BookSettingController {

  constructor(bookSetting, setting, ...settingValues) {
    this.book = document.getElementById("book");
    this.bookSetting = bookSetting;
    this.setting = setting;
    this.settingValues = settingValues;
    this.settingButtons = Array.from(document.querySelectorAll("." + setting));
    this.activeClass = setting + "_active";
    this.settingButtons.forEach(element => {
      element.addEventListener("click", this.settingButtonHandler.bind(this));
    });
  }

  setBookSetting(settingValue) {
    this.settingValues.forEach(element => {
      if (element) {
        const settingVal = this.bookSetting + "-" + element;
        if (this.book.classList.contains(settingVal)) {
          this.book.classList.remove(settingVal);
        }
      }
    });
    if (settingValue) {
      this.book.classList.add(settingValue);
    }
  }

  setActiveButton(activeButton) {
    const element = this.settingButtons.find(value => value.classList.contains(this.activeClass));
    if (element) {
      element.classList.remove(this.activeClass);
    }
    activeButton.classList.add(this.activeClass);
    let settingValue = null;
    this.settingValues.forEach(element => {
      if (element) {
        const settingVal = this.setting + "_" + element; 
        if (activeButton.classList.contains(settingVal)) {
          settingValue = this.bookSetting + "-" + element; 
        }
      }    
    });
    this.setBookSetting(settingValue);
  }

  settingButtonHandler(e) {
    this.setActiveButton(e.currentTarget);
    e.preventDefault();
  }
}

new BookSettingController("book_fs", "font-size", "small", "big", null);
new BookSettingController("book_color", "text_color", "black", "gray", "whitesmoke");
new BookSettingController("book_bg", "bg_color", "black", "gray", "white");



class BookSettingController {
  constructor(book, bookSetting, setting, settingValues) {
    this.book = book;
    this.bookSetting = bookSetting;
    let bookControl = document.querySelector(".book__control_" + setting);
    let settingValueClass = "color";
    this.activeClass = settingValueClass + "_active";
    this.setting = setting;
    switch (setting) {
      case "color":
        this.setting = "text_color";
        break;
      case "background":
        this.setting = "bg_color";
        break;
      default:
        settingValueClass = setting;
        this.activeClass = setting + "_active";
    };
    this.settingValues = settingValues;
    this.settingButtons = Array.from(bookControl.querySelectorAll("." + settingValueClass));
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

class BookController {
  constructor() {
    this.book = document.getElementById("book");
    this.bookSettings = ["book_fs", "book_color", "book_bg"];
    this.settings = ["font-size", "color", "background"];
    this.settingsValues = [["small", "big", null], ["black", "gray", "whitesmoke"], ["black", "gray", "white"]];

    for (let i = 0; i < this.bookSettings.length; i++) {
      new BookSettingController(this.book, this.bookSettings[i], this.settings[i], this.settingsValues[i]);
    }
  }
}

new BookController();



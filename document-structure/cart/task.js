class BasketManager {
  constructor() {
    this.basketData = [];
    this.addHandlers();
  }

  setQuantityValue(quantityElement, inc = true, value = 1) {
    const _value = +quantityElement.textContent + (inc ? value : -value);
    if (_value > 0) {
      quantityElement.textContent = `${_value}`;
    }
  }

  addBasketElement(id, productImage, quantity) {
    const basketProducts = document.querySelector(".cart__products");
    let newBusketElement = basketProducts.appendChild(document.createElement("div"));
    newBusketElement.classList.add("cart__product");
    newBusketElement.dataset.id = id;
    let productImageElement = newBusketElement.appendChild(document.createElement("img"));
    productImageElement.classList.add("cart__product-image");
    productImageElement.setAttribute("src", productImage);
    let productQuantityElement = newBusketElement.appendChild(document.createElement("div"));
    productQuantityElement.classList.add("cart__product-count");
    productQuantityElement.textContent = `${quantity}`;
  }

  removeBasketElement(basketProduct) {
    const parent = basketProduct.parentNode;
    parent.removeChild(basketProduct);
  }

  addToBasket(productElement) {
    const quantity = +productElement.querySelector(".product__quantity-value").textContent;
    let basketElement = this.basketData.find(e => e.id === productElement.dataset.id);
    if (basketElement) {
      basketElement.quantity += quantity;
      const basketProduct = Array.from(document.querySelectorAll(".cart__product"))
        .find(e => e.dataset.id === productElement.dataset.id);
      if (basketProduct) {
        this.setQuantityValue(basketProduct.querySelector(".cart__product-count"), true, quantity);
      }
    } else {
      this.basketData.push({ id: productElement.dataset.id, quantity: quantity });
      const productImage = productElement.querySelector(".product__image").getAttribute("src");
      this.addBasketElement(productElement.dataset.id, productImage, quantity);
    }
    const removeButton = productElement.querySelector(".product__remove");
    if (removeButton.classList.contains("product__remove-hidden")) {
      removeButton.classList.remove("product__remove-hidden");
    }
  }

  removeFromBasket(productElement) {
    const quantity = +productElement.querySelector(".product__quantity-value").textContent;
    let basketElement = this.basketData.find(e => e.id === productElement.dataset.id);
    if (basketElement.quantity <= quantity) {
      this.basketData.splice(this.basketData.indexOf(basketElement), 1);
      const basketProduct = Array.from(document.querySelectorAll(".cart__product"))
        .find(e => e.dataset.id === productElement.dataset.id);
      this.removeBasketElement(basketProduct);
      const removeButton = productElement.querySelector(".product__remove");
      removeButton.classList.add("product__remove-hidden");
    } else {
      basketElement.quantity -= quantity;
      const basketProduct = Array.from(document.querySelectorAll(".cart__product"))
        .find(e => e.dataset.id === productElement.dataset.id);
      this.setQuantityValue(basketProduct.querySelector(".cart__product-count"), false, quantity);
    }
  }

  addHandlers() {
    const incButtons = document.querySelectorAll(".product__quantity-control_inc");
    incButtons.forEach(element => {
      element.addEventListener('click',
        event => this.setQuantityValue(event.currentTarget.parentElement.querySelector(".product__quantity-value")));
    });

    const decButtons = document.querySelectorAll(".product__quantity-control_dec");
    decButtons.forEach(element => {
      element.addEventListener('click',
        event => this.setQuantityValue(event.currentTarget.parentElement.querySelector(".product__quantity-value"), false));
    });

    const addBasketButtons = document.querySelectorAll(".product__add");
    const bindAddFunction = this.addToBasket.bind(this);
    addBasketButtons.forEach(element => {
      element.addEventListener('click',
        event => bindAddFunction(event.currentTarget.closest(".product")));
    });

    const removeFromBasketButtons = document.querySelectorAll(".product__remove");
    const bindRemoveFunction = this.removeFromBasket.bind(this);
    removeFromBasketButtons.forEach(element => {
      element.addEventListener('click',
        event => bindRemoveFunction(event.currentTarget.closest(".product")));
    });

  }
}

new BasketManager();




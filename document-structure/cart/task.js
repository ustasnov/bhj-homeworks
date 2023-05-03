class BasketManager {
  constructor() {
    this.basketData = [];
    this.addEventListeners();
    this.loadBasketData();
  }

  fillBasket() {
    this.basketData.forEach(element => {
      const productElement = Array.from(document.querySelectorAll(".product"))
        .find(e => e.dataset.id === element.id);
      if (productElement) {
        const productImage = productElement.querySelector(".product__image");
        if (productImage) {
          this.addBasketElement(element.id, productImage.getAttribute("src"), element.quantity);
        }
        const removeButton = productElement.querySelector(".product__remove");
        if (removeButton) {
          removeButton.classList.remove("product__remove-hidden");
        }
      }
    });
  }

  loadBasketData() {
    const bd = localStorage.getItem("basketData");
    if (bd) {
      this.basketData = JSON.parse(bd);
      this.fillBasket();
    }
  }

  saveBasketData() {
    if (this.basketData.length > 0) {
      const bd = JSON.stringify(this.basketData);
      try {
        localStorage.setItem("basketData", bd);
      } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
          console.log('Превышен лимит выделенного пространства для локального хранилища!');
        }
      }
    } else {
      localStorage.removeItem("basketData");
    }
  }

  setQuantityValue(quantityElement, inc = true, value = 1) {
    if (quantityElement) {
      const _value = +quantityElement.textContent + (inc ? value : -value);
      if (_value > 0) {
        quantityElement.textContent = `${_value}`;
      }
    }
  }

  /*
  moveProductImage(productImage, basketImage) {
    if(productImage && basketImage) {

      let beginTop = productImage.getBoundingClientRect().top;
      let endTop = basketImage.getBoundingClientRect().top;
      let width = productImage.getBoundingClientRect().width;
      let height = productImage.getBoundingClientRect().height;
      let beginLeft = productImage.getBoundingClientRect().left;
      let endLeft = basketImage.getBoundingClientRect().left;
      let dimY = beginTop - endTop;
      let dimX = endLeft - beginLeft;
      const step = 15;
      const cloneElement = productImage.cloneNode(false);
      document.querySelector("body").appendChild(cloneElement);
      cloneElement.style.position = "absolute";
      cloneElement.style.top = `${Math.floor(beginTop + step)}`;
      cloneElement.style.left = `${Math.floor(beginLeft + step)}`;
      cloneElement.width = `${Math.floor(width)}`;
      cloneElement.height = `${Math.floor(height)}`;
    }
  }
  */

  addBasketElement(id, productImage, quantity) {
    const basketProducts = document.querySelector(".cart__products");
    if (basketProducts) {
      const newBusketElement = basketProducts.appendChild(document.createElement("div"));
      newBusketElement.classList.add("cart__product");
      newBusketElement.dataset.id = id;

      const productImageElement = newBusketElement.appendChild(document.createElement("img"));
      productImageElement.classList.add("cart__product-image");
      productImageElement.setAttribute("src", productImage);

      const productQuantityElement = newBusketElement.appendChild(document.createElement("div"));
      productQuantityElement.classList.add("cart__product-count");
      productQuantityElement.textContent = `${quantity}`;
    }
  }

  removeBasketElement(basketProduct) {
    if (basketProduct) {
      basketProduct.parentNode.removeChild(basketProduct);
    }
  }

  addToBasket(productElement) {
    const quantityElement = productElement.querySelector(".product__quantity-value");
    if (quantityElement) {
      const quantity = +quantityElement.textContent;
      let basketElement = this.basketData.find(e => e.id === productElement.dataset.id);
      if (basketElement) {
        basketElement.quantity += quantity;
        const basketProduct = Array.from(document.querySelectorAll(".cart__product"))
          .find(e => e.dataset.id === productElement.dataset.id);
        if (basketProduct) {
          const productImage = productElement.querySelector(".product__image");
          const basketImage = basketProduct.querySelector(".cart__product-image");
          //this.moveProductImage(productImage, basketImage);
          this.setQuantityValue(basketProduct.querySelector(".cart__product-count"), true, quantity);
        }
      } else {
        this.basketData.push({ id: productElement.dataset.id, quantity: quantity });
        const productImage = productElement.querySelector(".product__image");
        if (productImage) {
          this.addBasketElement(productElement.dataset.id, productImage.getAttribute("src"), quantity);
        }
      }
      this.saveBasketData();
      const removeButton = productElement.querySelector(".product__remove");
      if (removeButton && removeButton.classList.contains("product__remove-hidden")) {
        removeButton.classList.remove("product__remove-hidden");
      }
    }
  }

  removeFromBasket(productElement) {
    if (productElement) {
      const quantity = +productElement.querySelector(".product__quantity-value").textContent;
      let basketElement = this.basketData.find(e => e.id === productElement.dataset.id);
      if (basketElement) {
        if (basketElement.quantity <= quantity) {
          this.basketData.splice(this.basketData.indexOf(basketElement), 1);
          const basketProduct = Array.from(document.querySelectorAll(".cart__product"))
            .find(e => e.dataset.id === productElement.dataset.id);
          this.removeBasketElement(basketProduct);
          const removeButton = productElement.querySelector(".product__remove");
          if (removeButton && !removeButton.classList.contains("product__remove-hidden")) {
            removeButton.classList.add("product__remove-hidden");
          }
        } else {
          basketElement.quantity -= quantity;
          const basketProduct = Array.from(document.querySelectorAll(".cart__product"))
            .find(e => e.dataset.id === productElement.dataset.id);
          if (basketProduct) {
            this.setQuantityValue(basketProduct.querySelector(".cart__product-count"), false, quantity);
          }
        }
      }
      this.saveBasketData();
    }
  }

  addEventListeners() {
    document.querySelectorAll(".product__quantity-control_inc").forEach(element => {
      element.addEventListener('click',
        event => this.setQuantityValue(event.currentTarget.parentElement.querySelector(".product__quantity-value")));
    });

    document.querySelectorAll(".product__quantity-control_dec").forEach(element => {
      element.addEventListener('click',
        event => this.setQuantityValue(event.currentTarget.parentElement.querySelector(".product__quantity-value"), false));
    });

    const bindAddFunction = this.addToBasket.bind(this);
    document.querySelectorAll(".product__add").forEach(element => {
      element.addEventListener('click',
        event => bindAddFunction(event.currentTarget.closest(".product")));
    });

    const bindRemoveFunction = this.removeFromBasket.bind(this);
    document.querySelectorAll(".product__remove").forEach(element => {
      element.addEventListener('click',
        event => bindRemoveFunction(event.currentTarget.closest(".product")));
    });
  }
}

new BasketManager();




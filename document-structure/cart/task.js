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

  addBusketElement(id, productImage, quantity) {
    const basketProducts = document.querySelector(".cart__products");
    let newBusketElement = basketProducts.appendChild(document.createElement("div"));
    newBusketElement.classList.add("cart__product");
    newBusketElement.setAttribute("data-id", id);
    let productImageElement = newBusketElement.appendChild(document.createElement("img"));
    productImageElement.classList.add("cart__product-image");
    productImageElement.setAttribute("src", productImage);
    let productQuantityElement = newBusketElement.appendChild(document.createElement("div"));
    productQuantityElement.classList.add("cart__product-count");
    productQuantityElement.textContent = `${quantity}`;
  }

  addToBasket(productElement) {
    const quantity = +productElement.querySelector(".product__quantity-value").textContent;
    const basketElement = this.basketData.find(e => {e.id === productElement.dataset.id});
    if (basketElement) {
      basketElement.quantity += quantity;
      const busketProduct = document.querySelectorAll("cart__product").find(value => { value.dataset.id = productElement.dataset.id});
      if (busketProduct) {
        setQuantityValue(busketProduct.querySelector(".cart__product-count", true, quantity));
      }
      
    } else {
      this.basketData.push({id: productElement.dataset.id, quantity: quantity});
      const productImage = productElement.querySelector(".product__image").getAttribute("src");
      this.addBusketElement(productElement.dataset.id, productImage, quantity);
    }  
    
    //element.dataset.id;
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
    addBasketButtons.forEach(element => {
      element.addEventListener('click', 
        event => this.addToBasket(event.currentTarget.closest(".product")));
    });

  }
}

new BasketManager();




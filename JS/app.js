const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.toggle("active");
});

function ready() {
    let removeCartButtons = document.querySelectorAll(".cart-remove");
    // console.log(removeCartButtons);

    for (let i = 0; i < removeCartButtons.length; i++) {
        const button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    let quantityInputs = document.querySelectorAll(".cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    let addCart = document.querySelectorAll(".add-cart");
    for (let i = 0; i < addCart.length; i++) {
        const button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document
        .querySelectorAll(".btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    alert("Your order is placed");
    const cartContent = document.querySelectorAll(".cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCartItem(e) {
    let btnClicked = e.target;
    btnClicked.parentElement.remove();
    updateTotal();
}

function updateTotal() {
    let cartContent = document.querySelectorAll(".cart-content")[0];
    // console.log(cartContent);
    let cartBoxes = cartContent.querySelectorAll(".cart-box");
    // console.log(cartBoxes);
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.querySelectorAll(".cart-price")[0];
        let quantityElement = cartBox.querySelectorAll(".cart-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    }
    document.querySelectorAll(".total-price")[0].innerText = `$ ${total.toFixed(
        2
    )}`;
}

function quantityChanged(e) {
    const input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(e) {
    let button = e.target;
    let shopProduct = button.parentElement;
    let title = shopProduct.querySelectorAll(".product-title")[0].innerText;
    let productImg = shopProduct.querySelectorAll(".product-img")[0].src;
    let price = shopProduct.querySelectorAll(".price")[0].innerText;
    addProductToCart(title, price, productImg);
    // console.log(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    const cartItems = document.querySelectorAll(".cart-content")[0];
    const cartItemsNames = cartItems.querySelectorAll(".cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already add this item to your cart");
            return;
        }
    }
    const cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img"/>
            <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity"/>
            </div>
            <i class="fa-solid fa-trash-can cart-remove"></i>
            `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .querySelectorAll(".cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .querySelectorAll(".cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

ready();

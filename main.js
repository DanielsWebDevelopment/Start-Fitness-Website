// Swiper JS
const swiper = new Swiper('.swiper', {

    direction: 'vertical',
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
  cart.classList.add("active");
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

// working cart 
if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready(){
  var removeCartButtons = document.getElementsByClassName(".close-cart");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityinputs = document.getElementsByClassName(".cart-quantity")
  for (var i = 0; i < quantityinputs.length; i++){
    var input = quantityinputs[i];
    input.addEventListener("change", quantityChanged);
  }
  var addCart = document.getElementsByClassName(".add-cart");
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  document.getElementsByClassName(".btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked(){
  alert("Your order is placed")
  var cartContent = document.getElementsByClassName(".cart-content")[0]
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild)
  }
  updatetotal();
}

// removing items from cart
function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updatetotal();
}

function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName(".products-title")[0].innerText;
  var price = shopProducts.getElementsByClassName(".price")[0].innerText;
  var productImage = shopProducts.getElementsByClassName(".product-image")[0].src;
  addProductToCart(title, price, productImage);
  updatetotal();
}


function addProductToCart(title, price, productImage){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName(".cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName(".cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++){
   if (cartItemsNames[i].innerText == title){
    alert("you have this item added in your cart already");
    return;
   }
  }
}

var cartBoxContent = `
                    <img src="${productImage}" alt="" class="cart-img">
                    <div class="details-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>

                      <i class='bx bxs-trash cart-remove'></i>`;



cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName(".cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName(".cart-quantity")[0].addEventListener("change", quantityChanged);


// Updating total amounts
function updatetotal(){
  var cartContent = document.getElementsByClassName(".cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName(".cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName(".cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName(".cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
    total = Math.round(total * 100 / 100);

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;

}
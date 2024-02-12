/**
 * Developer    : Luigui P.
 * Github       : Luidev
 * Date         : 04/01/2024
 **/

// Recuperar la información del LocalStorage para ver si hay algo en el carrito
const productsInCart = JSON.parse(localStorage.getItem("products-in-cart"));

// // Declaración de elementos del DOM
const emptyCartContainer = document.querySelector("#empty__cart");
const cartProductsContainer = document.querySelector("#cart__products");
const cartActionsContainer = document.querySelector("#cart__actions");
const cartOrderPlaced = document.querySelector("#cart__order");
const clearCartBtn = document.querySelector("#cart__actions__left-clearBtn");
const totalContainer = document.querySelector("#total");
const buyBtn = document.querySelector("#cart__actions_right-buyBtn");
let deleteItemBtn = document.querySelectorAll(".cart__products__item-delete");

// Función de validación de productos en el carrito
function loadProductsInCart() {
  if (productsInCart && productsInCart.length > 0) {
    emptyCartContainer.classList.add("disabled");
    cartOrderPlaced.classList.add("disabled");
    cartProductsContainer.classList.remove("disabled");
    cartActionsContainer.classList.remove("disabled");
    // Vaciamos el contendor productos al inicio
    cartProductsContainer.innerHTML = "";
    // Mostrar cada producto que está en el carrito
    productsInCart.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("cart__products__item");
      div.innerHTML = `
            <img
                src=${product.img}
                alt=${product.title}
                class="cart__products__item-image"
            />
            <div class="cart__products__item-content">
                <small>Title</small>
                <h3>${product.title}</h3>
            </div>
            <div class="cart__products__item-content">
                <small>Quantity</small>
                <h3>${parseInt(product.quantityAdded)}</h3>
            </div>
            <div class="cart__products__item-content">
                <small>Price</small>
                <h3>$${parseInt(product.price)}</h3>
            </div>
            <div class="cart__products__item-content">
                <small>Subtotal</small>
                <h3>$${parseInt(product.quantityAdded * product.price)}</h3>
            </div>
            <button
                id=${product.id}
                class="cart__products__item-delete"
            >
                <i class="bi bi-trash"></i>
            </button>
                  
        `;
      cartProductsContainer.append(div);
    });
  } else {
    emptyCartContainer.classList.remove("disabled");
    cartOrderPlaced.classList.add("disabled");
    cartProductsContainer.classList.add("disabled");
    cartActionsContainer.classList.add("disabled");
  }
  // Ejecutamos la funcionalidad de botones para eliminar
  updateDeleteBtns();
  // Ejecutamos la funcionalidad del total cada vez que se actualicen los precios
  updateTotalPrice();
}

loadProductsInCart();

// Funcion que llama nuevamente a los botones de eleminar que se renderizan
function updateDeleteBtns() {
  // Selecionamos nuevamente los botones cuando se actualice por categorías
  btnDelete = document.querySelectorAll(".cart__products__item-delete");
  // Recorremos todos los botones y añadimos funcionalidad
  btnDelete.forEach((item) => {
    item.addEventListener("click", deleteFromCart);
  });
}

// Función para eliminar un producto del carrito
function deleteFromCart(e) {
  const idBtn = e.currentTarget.id;
  // Encontrar el producto que queremos eliminar
  const productToDelete = productsInCart.find(
    (product) => product.id === idBtn
  );
  // Obtener el índice del producto a eliminar y luego utilizar el método splice para retirarlo del array
  const index = productsInCart.findIndex((product) => product.id === idBtn);
  productsInCart.splice(index, 1);
  // Actualizar el LS
  localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
  // Actualizamos el la tabla
  loadProductsInCart();
  // Notificación con Toastify JS
  Toastify({
    text: "Product deleted",
    duration: 3000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #961818, #961818)",
      borderRadius: "2rem",
      textTransform: "uppercase",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// Acción limpiar carrito
clearCartBtn.addEventListener("click", clearCart);

// Función de vaciar carrito
function clearCart() {
  // Sweet Alert mensaje
  Swal.fire({
    title: "<strong>Clear <u>cart?</u></strong>",
    icon: "info",
    html: `
      Do you really wanna clear your cart?
      <b> ${productsInCart.reduce(
        (acc, product) => acc + product.quantityAdded,
        0
      )} items will dissapear!</b>,           
    `,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `Yes`,
    cancelButtonText: `No`,
    cancelButtonAriaLabel: "Thumbs down",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      productsInCart.length = 0;
      // Actualizar el LS
      localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
      // Actualizamos el la tabla
      loadProductsInCart();
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

// Actualizar el total del carrito
function updateTotalPrice() {
  totalContainer.innerText =
    "$" +
    productsInCart.reduce(
      (acc, product) => acc + product.quantityAdded * product.price,
      0
    );
}

// Acción comprar
buyBtn.addEventListener("click", buyProductsInCart);

// Comprar productos
function buyProductsInCart() {
  productsInCart.length = 0;
  // Actualizar el LS
  localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
  // Actualizamos el la tabla con tabla de compra
  emptyCartContainer.classList.add("disabled");
  cartOrderPlaced.classList.remove("disabled");
  cartProductsContainer.classList.add("disabled");
  cartActionsContainer.classList.add("disabled");
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();
}

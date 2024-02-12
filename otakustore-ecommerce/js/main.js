/**
 * Developer    : Luigui P.
 * Github       : Luidev
 * Date         : 04/01/2024
 **/

// Declaración de elementos del DOM
const productsContainer = document.querySelector("#main__container");
const btnCategory = document.querySelectorAll(".btn-category");
const mainTitle = document.querySelector("#main__title");
const quantity = document.querySelector("#quantity");
let btnAdd = document.querySelectorAll(".product__details-add");

// Conseguimos la información del JSON
let products = [];

fetch("./js/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    loadProducts(products);
  });

// Función para cargar la información de los productos
function loadProducts(selectedProducts) {
  // Vaciamos el contendor productos al inicio
  productsContainer.innerHTML = "";
  // Rellenamos el contendor con los productos
  selectedProducts.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src=${product.img} alt=${product.title} class="product__img" />
      <div class="product__details">
        <h3 class="product__details-title">${product.title}</h3>
        <p class="product__details-price">$ ${product.price}</p>
        <button class="product__details-add" id=${product.id}>
          Add to cart
        </button>
      </div>
    `;
    productsContainer.append(div);
  });
  updateAddBtns();
}

// Funcionalidad para filtra y cambiar detalles del contenedor de productos
btnCategory.forEach((category) => {
  category.addEventListener("click", (e) => {
    btnCategory.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
    // Se filtran por categoría. En todo caso se muestra todo
    if (e.currentTarget.id !== "all-products") {
      // Cambio de título x categoría
      const productByCat = products.find(
        (product) => product.category.id === e.currentTarget.id
      );
      mainTitle.innerHTML = productByCat.category.label;
      // Filtro de productos x categoría
      const filteredProducts = products.filter(
        (product) => product.category.id === e.currentTarget.id
      );
      loadProducts(filteredProducts);
    } else {
      mainTitle.innerHTML = "All products";
      loadProducts(products);
    }
  });
});

// Se ejecutan las función de carga de productos
loadProducts(products);

// Funcion que llama nuevamente a los botones de añadir que se renderizan
function updateAddBtns() {
  // Selecionamos nuevamente los botones cuando se actualice por categorías
  btnAdd = document.querySelectorAll(".product__details-add");
  // Recorremos todos los botones y añadimos funcionalidad
  btnAdd.forEach((add) => {
    add.addEventListener("click", addToCart);
  });
}

// Recuperar la información del LocalStorage para ver si hay algo en el carrito
let productsInCart;
const productsInCartLS = JSON.parse(localStorage.getItem("products-in-cart"));
if (productsInCartLS) {
  productsInCart = productsInCartLS;
  updateQuantityCart();
} else {
  productsInCart = [];
}

// Función para añadir productos al carrito
function addToCart(e) {
  // Notificación con Toastify JS
  Toastify({
    text: "Product added",
    duration: 3000,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #696969, #2b2b2b)",
      borderRadius: "2rem",
      textTransform: "uppercase",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  // Obtenemos ID
  const idBtn = e.currentTarget.id;
  const addedProducts = products.find((product) => product.id === idBtn);
  // Sí ya existe el producto en el carrito, subir la cantidad
  if (productsInCart.some((product) => product.id === idBtn)) {
    const index = productsInCart.findIndex((product) => product.id === idBtn);
    productsInCart[index].quantityAdded++;
  } else {
    addedProducts.quantityAdded = 1;
    productsInCart.push(addedProducts);
  }
  // Actualizamos la cantidad del carrito
  updateQuantityCart();
  // Guardamos la cantidad de productos en el carrito con LocalStorage
  localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

// Función para actualizar la cantidad mostrada en el carrito
function updateQuantityCart() {
  let number = productsInCart.reduce(
    (acc, product) => acc + product.quantityAdded,
    0
  );
  quantity.innerHTML = number;
}

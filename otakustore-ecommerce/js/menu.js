/**
 * Developer    : Luigui P.
 * Github       : Luidev
 * Date         : 04/01/2024
 **/

// Declaración de elementos del DOM
const openMenu = document.querySelector("#header__mobile-btnMenuOpen");
const closeMenu = document.querySelector("#header__mobile-btnMenuClose");
const aside = document.querySelector("aside");
const btnCategoryMenu = document.querySelectorAll(".btn-category");

openMenu.addEventListener("click", () => {
  aside.classList.add("aside-visible");
});

closeMenu.addEventListener("click", () => {
  aside.classList.remove("aside-visible");
});

btnCategoryMenu.forEach((btn) =>
  btn.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);

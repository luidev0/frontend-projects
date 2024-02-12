/**
 * Developer    : Luigui P.
 * Github       : Luidev
 * Date         : 02/01/2024
 **/

// Declarmos los selectores que se manipularán
let header = document.querySelector(".header");
let navbar = document.querySelector(".header .flex .header__navbar");
let MenuBtn = document.querySelector("#menu-btn");
let home = document.querySelector("#home");

// Funcionalidad del ícono de menú responsivo
MenuBtn.onclick = () => {
  navbar.classList.toggle("active");
  MenuBtn.classList.toggle("fa-times");
};

// Quitar funcionalidad del ícono de menú responsivo cuando haya un scroll
window.onscroll = () => {
  navbar.classList.remove("active");
  MenuBtn.classList.remove("fa-times");

  if (window.scrollY > 0) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

// Efecto de movimiento sobre la imagen principal
home.onmousemove = (e) => {
  let homeImg = home.querySelector(".home__image");
  let x = (window.innerWidth - e.pageX * 2) / 90;
  let y = (window.innerHeight - e.pageY * 2) / 90;
  homeImg.style.transform = `translateX(${x}px) translateY(${y}px)`;
};

// Quitar efecto de movimiento sobre la imagen principal
home.onmouseleave = () => {
  let homeImg = home.querySelector(".home__image");

  homeImg.style.transform = `translateX(0px) translateY(0}px)`;
};

// Funcionalidad de contador
let dataOffset = 24 * 60 * 60 * 1000 * 7;
let countDate = new Date().getTime() + dataOffset;

function countDown() {
  let now = new Date().getTime();
  let gap = countDate - now;
  let seconds = 1000;
  let minutes = seconds * 60;
  let hours = minutes * 60;
  let days = hours * 24;
  let d = Math.floor(gap / days);
  let h = Math.floor((gap % days) / hours);
  let m = Math.floor((gap % hours) / minutes);
  let s = Math.floor((gap % minutes) / seconds);

  document.getElementById("day").innerText = d;
  document.getElementById("hour").innerText = h;
  document.getElementById("minute").innerText = m;
  document.getElementById("second").innerText = s;
}

setInterval(function () {
  countDown();
}, 1000);

// Loader function
function loader() {
  document.querySelector(".loader-container").classList.add("active");
}

function fadeOut() {
  setInterval(loader, 3000);
}

// Necesitamos cargar la función para que se ejecute
window.onload = fadeOut();

// SwiperJS script
var swiper = new Swiper(".products-slider", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

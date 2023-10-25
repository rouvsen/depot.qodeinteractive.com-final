

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

var autoSlide = setInterval (function () {
    plusSlides (1);
}, 6000);


// tab menu codes
const tabMenuItem_1 = document.querySelector(".about-us-section-headers > div:nth-child(1) a");
const tabMenuItem_2 = document.querySelector(".about-us-section-headers > div:nth-child(2) a");
const tabMenuItem_3 = document.querySelector(".about-us-section-headers > div:nth-child(3) a");

const arrTabMenus = [tabMenuItem_1, tabMenuItem_2, tabMenuItem_3];


const tabMenuDescription = document.querySelector(".about-us-description");
tabMenuDescription.innerText = "Lorem kimi basha dushe bilersiz"

tabMenuItem_1.addEventListener("click", function(event) {
  event.preventDefault()

  arrTabMenus.map(item => {
    item.classList.remove("activeee");
  })

  tabMenuItem_1.classList.add("activeee")

  tabMenuDescription.innerText = "Lorem kimi basha dushe bilersiz"
})
tabMenuItem_2.addEventListener("click", function(event) {
  event.preventDefault()

  arrTabMenus.map(item => {
    item.classList.remove("activeee");
  })

  tabMenuItem_2.classList.add("activeee")

  tabMenuDescription.innerText = "Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz"
})
tabMenuItem_3.addEventListener("click", function(event) {
  event.preventDefault()

  arrTabMenus.map(item => {
    item.classList.remove("activeee");
  })

  tabMenuItem_3.classList.add("activeee")

  tabMenuDescription.innerText = "Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz, Lorem kimi basha dushe bilersiz"
})


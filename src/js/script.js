
const onclicked = document.querySelector(".item-info-hover");
const onclickedSection = document.querySelector(".item-look-span-onklicked");
const onclickedSectionWrapper = document.querySelector(".span-onklicked-wrapper");

onclicked.addEventListener("click", () => {
  onclickedSection.style.zIndex = "999";
  onclickedSection.style.visibility = "visible";
})

onclickedSection.addEventListener("click", (e) => {
      if(!onclickedSectionWrapper.contains(e.target)) {
        onclickedSection.style.zIndex = "-1";
        onclickedSection.style.visibility = "hidden";
      }
})



const headerLoginBtn = document.getElementById("header-login-link");
const headerLoginSection = document.querySelector(".login-section");
const headerLoginSectionWrapper = document.querySelector(".login-sec-wrapper");

const headerRightMenu = document.querySelector(".header-right-link.menu")
const headerRightMenuSection = document.querySelector(".right-menu-section")
const headerRightMenuCloseBtn = document.querySelector(".right-menu-section .close-btn")

const headerSearchBtn = document.querySelector(".header-right-link.search")
const headerSearchPlace = document.querySelector(".header-right-link .right-link-search-place")

headerLoginBtn.addEventListener("click", () => {
    headerLoginSection.style.zIndex = "999";
    headerLoginSection.style.visibility = "visible";
})

headerLoginSection.addEventListener("click", (e) => {
        if(!headerLoginSectionWrapper.contains(e.target)) {
            headerLoginSection.style.zIndex = "-1";
            headerLoginSection.style.visibility = "hidden";
        }
})

headerRightMenu.addEventListener("click", () => {
    headerRightMenuSection.style.zIndex = "9999";
    headerRightMenuSection.style.visibility = "visible";
    headerRightMenuSection.style.right = "0";
})

headerRightMenuCloseBtn.addEventListener("click", () => {
    headerRightMenuSection.style.zIndex = "-11";
    headerRightMenuSection.style.visibility = "hidden";
    headerRightMenuSection.style.right = "-605px";
})

headerSearchBtn.addEventListener("click", () => {
    if(headerSearchPlace.style.visibility == "visible") {
        headerSearchPlace.style.zIndex = "-11";
        headerSearchPlace.style.visibility = "hidden";
        headerSearchPlace.style.opacity = "0";
    }   else {
                headerSearchPlace.style.zIndex = "9999";
                headerSearchPlace.style.visibility = "visible";
                headerSearchPlace.style.opacity = "1";
        }
})

const sliderImage = document.querySelector(".slider-image img");
const sliderTitle = document.querySelector(".slider-content h2");
const sliderDesc = document.querySelector(".slider-content p");

const arr = [
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg",
             "./src/img/h1-slide1-img.png",
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg",
             "./src/img/h1-slide1-img.png",
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg",
             "./src/img/h1-slide1-img.png",
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg",
             "./src/img/h1-slide1-img.png",
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg",
             "./src/img/h1-slide1-img.png",
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg",
             "./src/img/h1-slide1-img.png",
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg",
             "./src/img/h1-slide1-img.png",
             "./src/img/h1-slide2-img1.png",
             "./src/img/h1-slide3-img.jpg"];

             const arrTitles = [
                "THINK DIFFERENT",
                "PREMIUM COMFORT",
                "CONTEMPORARY DESIGN",
                "THINK DIFFERENT",
                "PREMIUM COMFORT",
                "CONTEMPORARY DESIGN",
                "THINK DIFFERENT",
                "PREMIUM COMFORT",
                "CONTEMPORARY DESIGN",
                "THINK DIFFERENT",
                "PREMIUM COMFORT",
                "CONTEMPORARY DESIGN",
                "THINK DIFFERENT",
                "PREMIUM COMFORT",
                "CONTEMPORARY DESIGN",
                "THINK DIFFERENT",
                "PREMIUM COMFORT",
                "CONTEMPORARY DESIGN",
                "THINK DIFFERENT",
                "PREMIUM COMFORT",
                "CONTEMPORARY DESIGN",
                "THINK DIFFERENT",
                "CONTEMPORARY DESIGN",
            ];

let iterate = 0;

setInterval(() => {
    for(let i = 0; i < arr.length; i++) {
        sliderImage.setAttribute("src", arr[iterate])
        sliderTitle.innerHTML = arrTitles[iterate];
        sliderDesc.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, itaque.";
    }
    iterate++;
    if(iterate == 20) { iterate = 0 }
}, 6000)









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
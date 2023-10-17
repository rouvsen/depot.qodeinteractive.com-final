




const headerLoginBtn = document.getElementById("header-login-link");
const headerLoginSection = document.querySelector(".login-section");
const headerLoginSectionWrapper = document.querySelector(".login-sec-wrapper");

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
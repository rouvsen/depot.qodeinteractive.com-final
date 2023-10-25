
let cart = [];

// local storage'de cart adında bir değer varsa, onu alıyoruz ve JSON.parse ile objeye dönüştürüyoruz
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

let productItemsWrapper = document.querySelector(".product-items-wrapper");

console.log(cart)

let totalPriceCart = 0;

async function fillElements() {
    cart.forEach(element => {
        productItemsWrapper.innerHTML += `
        <div class="product-item-wrapper">
            <div class="product-item-primary-infos">
                <div class="product-item-deleter">
                    <i class="bi bi-x"></i>
                </div>
                <div class="cart-progress-product-item-img-wrapper">
                    <img src="${element.image}" alt="">
                </div>
                <div class="product-item-title">
                    <a href="#">${element.name}</a>
                </div>
            </div>
            <div class="product-item-price"><span>${element.price}</span></div>
            <div class="product-item-count-selector">
                <span class="count-selector-word">Quantity</span>
                <i class="bi bi-caret-left-fill bi-caret"></i> <input value="${element.quantity}" min="0" max="99" class="cart-progress-item-count" type="number"> <i class="bi bi-caret-right-fill bi-caret"></i> 
            </div>
            <div class="product-item-count"><span>$${Number((element.price).replace("$", "")) * Number(element.quantity)}</span></div>
        </div>
        `;

        // item-delete-btn elementini seçiyoruz
        let itemDeleteBtn = document.querySelector(".product-item-deleter");

        // item-delete-btn elementine click event listener ekliyoruz
        itemDeleteBtn.addEventListener("click", () => {
            // cart değişkeninden seçili olan product'ı çıkarıyoruz
            cart = cart.filter(p => p.name !== element.name);

            // local storage'a cart değişkenini kaydediyoruz
            localStorage.setItem("cart", JSON.stringify(cart));

            // sayfayı yeniliyoruz
            window.location.reload();
        });

        totalPriceCart += Number((element.price).replace("$", "")) * Number(element.quantity)
        document.getElementById("total-span-wrap").innerText = "$" + totalPriceCart;
    });
}

fillElements();


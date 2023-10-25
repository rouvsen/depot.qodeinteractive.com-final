



// right-menu-modal
const rightMenuBtn = document.querySelector(".right-menu-list")
const rightMenuModal = document.querySelector(".right-menu-modal")
const rightMenuModalClose = document.querySelector(".right-menu-modal .right-menu-modal-close")

rightMenuBtn.addEventListener("click", () => {
    rightMenuModal.style.zIndex = "999";
    rightMenuModal.style.width = "700px";
    rightMenuModal.style.visibility = "visible";
})

rightMenuModalClose.style.cursor = "pointer";

rightMenuModalClose.addEventListener("click", () => {
    rightMenuModal.style.zIndex = "-111";
    rightMenuModal.style.width = "0";
    rightMenuModal.style.visibility = "hidden";
})

//login-modal
const loginModalWrapper = document.querySelector(".header-login-modal-wrapper")
const loginModal = document.querySelector(".header-login-modal")
const loginSectionClick = document.querySelector(".login-section-click")

loginSectionClick.addEventListener("click", () => {
    loginModal.style.zIndex = "999"
    loginModal.style.visibility = "visible"
})

loginModal.addEventListener("click", (e) => {
    if(!loginModalWrapper.contains(e.target)) {
        loginModal.style.zIndex = "-111"
        loginModal.style.visibility = "hidden"
    }
})


// main products page -> fetch db.json
// db.json dosyasını fetch ediyoruz
fetch("../../src/db/db.json")
  .then(response => response.json()) // json formatına dönüştürüyoruz
  .then(data => {
    // data.products dizisini alıyoruz
    let products = data.products;

    // quick-look-product-modal elementini seçiyoruz
    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");

    // local storage'de cart adında bir değişken tanımlıyoruz
    let cart = [];

    // local storage'de cart adında bir değer varsa, onu alıyoruz ve JSON.parse ile objeye dönüştürüyoruz
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    // main-products-wrapper elementini seçiyoruz
    let wrapper = document.querySelector(".main-products-wrapper");

    // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      wrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });

    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
  })
  .catch(error => {
    // hata olursa konsola yazdırıyoruz
    console.error(error);
  });





// local storage'de cart adında bir değişken tanımlıyoruz
// let cart = [];

// local storage'de cart adında bir değer varsa, onu alıyoruz ve JSON.parse ile objeye dönüştürüyoruz
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

// shopping-cart-modal elementini seçiyoruz
let shoppingCartModal = document.querySelector(".shopping-cart-modal");

// shopping-cart-modal elementinin içindeki elementleri seçiyoruz
let modalTop = shoppingCartModal.querySelector(".shopping-cart-modal-top");
let modalCenter = shoppingCartModal.querySelector(".shopping-cart-modal-center span:last-child");

// modalTop elementinin içeriğini boşaltıyoruz
modalTop.innerHTML = "";

// cart değişkenindeki her bir product için bir döngü başlatıyoruz
for (let product of cart) {
  // item-holder elementini oluşturuyoruz
  let itemHolder = document.createElement("div");
  itemHolder.className = "item-holder";

  // item-holder elementinin içeriğini şablon string ile dolduruyoruz
  // {product.name}, {product.price}, {product.image}, {product.quantity} gibi değerleri product objesinden alıyoruz
  itemHolder.innerHTML = `
    <div class="item-image-wrapper">
      <img src="${product.image}">
    </div>
    <div class="item-details-wrapper">
      <h5><a href="#">${product.name}</a></h5>
      <div class="item-details-span-wrapper">
        <span>${product.quantity}</span> X <span>${product.price}</span>
      </div>
    </div>
    <div class="item-delete-btn">
      <i class="bi bi-x"></i>
    </div>
  `;

  // item-delete-btn elementini seçiyoruz
  let itemDeleteBtn = itemHolder.querySelector(".item-delete-btn");

  // item-delete-btn elementine click event listener ekliyoruz
  itemDeleteBtn.addEventListener("click", () => {
    // cart değişkeninden seçili olan product'ı çıkarıyoruz
    cart = cart.filter(p => p.name !== product.name);

    // local storage'a cart değişkenini kaydediyoruz
    localStorage.setItem("cart", JSON.stringify(cart));

    // sayfayı yeniliyoruz
    window.location.reload();
  });

  // item-holder elementini modalTop'a ekliyoruz
  modalTop.appendChild(itemHolder);
}

let shopCartInnerCounter = document.querySelector(".shopping-cart-btn-inner-count");

// modalCenter elementinin içeriğini güncelliyoruz
// cart değişkenindeki product'ların price ve quantity değerlerini çarpıp topluyoruz
let totalCartCount = cart.reduce((total, product) => 
total + parseInt((product.price).replace("$", "")) * parseInt((product.quantity).replace("$", "")), 0);

modalCenter.innerText = "$" + totalCartCount;

shopCartInnerCounter.innerText = "$" + totalCartCount;



/*

Bu kodda, modalCenter elementinin içeriğini güncelliyoruz. 
Bu element, shopping-cart-modal’ın ortasında toplam fiyatı gösteren bir span elementidir. 
Cart değişkenindeki product’ların price ve quantity değerlerini çarpıp topluyoruz. 
Bunu yapmak için reduce metodu kullanıyoruz. Reduce metodu, bir diziyi tek bir değere indirgemek için kullanılır. 
Reduce metodu, bir callback fonksiyonu ve bir başlangıç değeri alır. 
Callback fonksiyonu, her bir dizi elemanı için çalışır ve bir önceki değer ile bir sonraki değeri birleştirir. 
Başlangıç değeri ise ilk önceki değer olarak kullanılır. Bizim durumumuzda, callback fonksiyonu total ve product parametrelerini alır. 
Total, önceki değerdir ve başlangıçta 0 olarak verilir. 
Product ise sonraki değerdir ve cart değişkenindeki her bir product objesidir. 
Callback fonksiyonu, total değerine product’ın price ve quantity değerlerinin çarpımını ekler ve yeni total değerini döndürür.
Böylece, reduce metodu bize cart değişkenindeki tüm product’ların toplam fiyatını verir. 
Bu değeri modalCenter elementinin içeriğine “$” işareti ile birlikte yazıyoruz.

*/

const modalBottom = document.querySelector(".shopping-cart-modal-bottom");



// shopping-cart-modal-bottom elementini seçiyoruzlet modalBottom = shoppingCartModal.querySelector(".shopping-cart-modal-bottom");
// view cart ve checkout butonlarını seçiyoruz
let viewCartBtn = modalBottom.querySelector("a:first-child");
let checkoutBtn = modalBottom.querySelector("a:last-child");
// view cart butonuna click event listener ekliyoruz
viewCartBtn.addEventListener("click", () => {  // view cart sayfasına yönlendiriyoruz
  window.location.href = "view-cart.html";});
// checkout butonuna click event listener ekliyoruz
checkoutBtn.addEventListener("click", () => {  // checkout sayfasına yönlendiriyoruz
  window.location.href = "checkout.html";});


const mainProductsTop_All =  document.querySelector(".main-products-top-list .main-products-top-list-item:nth-child(1)");
const mainProductsTop_HomeDecor =  document.querySelector(".main-products-top-list .main-products-top-list-item:nth-child(2)");
const mainProductsTop_Lighting =  document.querySelector(".main-products-top-list .main-products-top-list-item:nth-child(3)");
const mainProductsTop_Decoration =  document.querySelector(".main-products-top-list .main-products-top-list-item:nth-child(4)");
const mainProductsTop_Vases =  document.querySelector(".main-products-top-list .main-products-top-list-item:nth-child(5)");
const mainProductsTop_Basics =  document.querySelector(".main-products-top-list .main-products-top-list-item:nth-child(6)");

const mainProductsWrapper = document.querySelector(".main-products-wrapper")

mainProductsTop_All.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(true) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })

})

mainProductsTop_HomeDecor.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.category === "home_decor") {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })

})
mainProductsTop_Lighting.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.category === "lighting") {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })

})
mainProductsTop_Decoration.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.category === "decoration") {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })

})
mainProductsTop_Vases.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.category === "vase") {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })

})
mainProductsTop_Basics.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.category === "home_decor") {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })

})


const filterLowToHigh = document.querySelector(".filter-low-to-high a")
const filterHighToLow = document.querySelector(".filter-high-to-low a")

const filter40plus = document.querySelector(".filter40 a")
const filter0_10 = document.querySelector(".filter-0-10 a")
const filter10_20 = document.querySelector(".filter-10-20 a")
const filter20_30 = document.querySelector(".filter-20-30 a")
const filter30_40 = document.querySelector(".filter-30-40 a")
const filterAll = document.querySelector(".filter-all")

function sortByPriceHighToLow (products) {
  return products.sort ( (a,b) => {
    // a ve b productları arasındaki farkı hesapla
    var diff = b.price - a.price;
    // farka göre sıralama yap
    return diff;
  });
}

function sortByPriceLowToHigh (products) {
  return products.sort ( (a,b) => {
    // a ve b productları arasındaki farkı hesapla
    var diff = a.price - b.price;
    // farka göre sıralama yap
    return diff;
  });
}


filterHighToLow.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      products = sortByPriceHighToLow(products)

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(true) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})

filterLowToHigh.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      products = sortByPriceLowToHigh(products)

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(true) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})

filter40plus.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.price > 40) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})

filter0_10.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.price > 0 && product.price < 10) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})

filter10_20.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.price > 10 && product.price < 20) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})

filter20_30.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.price > 20 && product.price < 30) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})

filter30_40.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(product.price > 30 && product.price < 40) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})

filterAll.addEventListener("click", () => {
  mainProductsWrapper.innerHTML = ""

    fetch("../../src/db/db.json")
    .then(res => res.json())
    .then(data => {
      let products = data.products;

      // her bir product için bir döngü başlatıyoruz
    for (let product of products) {
      if(true) {
        // main-product-item elementini oluşturuyoruz
      let item = document.createElement("div");
      item.className = "main-product-item";

      // main-product-item elementinin içeriğini şablon string ile dolduruyoruz
      // {product.name}, {product.price}, {product.image} gibi değerleri product objesinden alıyoruz
      item.innerHTML = `
        <div class="product-item-image-wrapper">
          <img src="${product.image}">
        </div>
        <div class="main-product-item-details-wrapper">
          <h5 class="main-product-item-name">${product.name}</h5>
          <div class="main-product-item-price">$${product.price}</div>
        </div>
        <div class="product-item-quicklook">
          <div class="quicklook-wrapper">
            <h6 class="quick-look-btn">quick look</h6>
            <a href="#"><i class="bi bi-heart-fill"></i></a>
          </div>
        </div>
      `;

      // item elementini wrapper'a ekliyoruz
      mainProductsWrapper.appendChild(item);

      // quick-look-btn elementini seçiyoruz
      let quickLookBtn = item.querySelector(".quick-look-btn");

      // quick-look-btn elementine click event listener ekliyoruz
      quickLookBtn.addEventListener("click", () => {
        // seçtiğimiz elementlerin içeriğini product objesinden aldığımız değerlerle güncelliyoruz
        modalImage.src = product.image;
        modalName.innerText = product.name;
        modalPrice.innerText = "$" + product.price;
        modalDescription.innerText = product.description;
        modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

        // quick-look-product-modal elementini görünür yapıyoruz
        quickLookProductModal.style.visibility = "visible";
        quickLookProductModal.style.zIndex = "9999";
      });
      }
    }

    // caret-left-fill ve caret-right-fill iconlarını seçiyoruz
    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    // caret-left-fill iconuna click event listener ekliyoruz
    caretLeftIcon.addEventListener("click", () => {
      // input değerini bir azaltıyoruz, minimum 0 olacak şekilde
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    // caret-right-fill iconuna click event listener ekliyoruz
    caretRightIcon.addEventListener("click", () => {
      // input değerini bir arttırıyoruz, maksimum 99 olacak şekilde
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });


    let quickLookProductModal = document.querySelector(".quick-look-product-modal");

    // quick-look-product-modal elementinin içindeki elementleri seçiyoruz
    let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
    let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
    let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
    let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
    let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
    let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


    // add to cart butonuna click event listener ekliyoruz
    modalAddToCartBtn.addEventListener("click", () => {
      // seçili olan product'ı ve input değerini alıyoruz
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      // cart değişkeninde seçili olan product'ın olup olmadığını kontrol ediyoruz
      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      // eğer cart değişkeninde seçili olan product varsa, quantity'sini arttırıyoruz
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        // eğer cart değişkeninde seçili olan product yoksa, cart değişkenine ekliyoruz
        cart.push(selectedProduct);
      }

      // local storage'a cart değişkenini kaydediyoruz
      localStorage.setItem("cart", JSON.stringify(cart));

      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    // quick-look-product-modal-closer elementini seçiyoruz
    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    // quick-look-product-modal-closer elementine click event listener ekliyoruz
    quickLookProductModalCloser.addEventListener("click", () => {
      // quick-look-product-modal elementini görünmez yapıyoruz
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
    })
})



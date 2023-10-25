const leftSidebarProductsWrapper = document.querySelector(".left-sidebar-products-wrapper");

let quickLookProductModal = document.querySelector(".quick-look-product-modal");

let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");


leftSidebarProductsWrapper.innerHTML = "";

  fetch("../../src/db/db.json")
  .then(response => response.json())
  .then(data => {
      let products = data.products;
      products.forEach(product => {
        
        let item = document.createElement("div");
        item.className = "main-product-item";
  
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
  
        leftSidebarProductsWrapper.appendChild(item);

        let quickLookBtn = item.querySelector(".quick-look-btn");
        

        quickLookBtn.addEventListener("click", () => {
            modalImage.src = product.image;
            modalName.innerText = product.name;
            modalPrice.innerText = "$" + product.price;
            modalDescription.innerText = product.description;
            modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

            quickLookProductModal.style.visibility = "visible";
            quickLookProductModal.style.zIndex = "9999";
        });

      })

    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    caretLeftIcon.addEventListener("click", () => {
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    caretRightIcon.addEventListener("click", () => {
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });

    modalAddToCartBtn.addEventListener("click", () => {
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        cart.push(selectedProduct);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    quickLookProductModalCloser.addEventListener("click", () => {
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });

  })
  .catch(err => {
    console.log(err)
  })

const rangeInput = document.querySelectorAll(".left-sidebar-left-filter-section-3 .range-input input"),
priceInput = document.querySelectorAll(".left-sidebar-left-filter-section-3 .price-input input"),
range = document.querySelector(".left-sidebar-left-filter-section-3 .slider .progress");
let priceGap = 1;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});



function filterWithMinAndMax(min, max) {

  leftSidebarProductsWrapper.innerHTML = ""

  fetch("../../src/db/db.json")
  .then(response => response.json()) // json formatına dönüştürüyoruz
  .then(data => {
      let products = data.products;
      let filteredProds = products.filter( prod => prod.price > min &&  prod.price < max)
      filteredProds.forEach(product => {
        
        let item = document.createElement("div");
        item.className = "main-product-item";
  
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
  
        leftSidebarProductsWrapper.appendChild(item);

        let quickLookBtn = item.querySelector(".quick-look-btn");
        

        quickLookBtn.addEventListener("click", () => {
            modalImage.src = product.image;
            modalName.innerText = product.name;
            modalPrice.innerText = "$" + product.price;
            modalDescription.innerText = product.description;
            modalInput.value = 1; // input değerini 1 olarak başlatıyoruz

            quickLookProductModal.style.visibility = "visible";
            quickLookProductModal.style.zIndex = "9999";
        });

      })

    let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
    let caretRightIcon = document.querySelector(".bi-caret-right-fill");

    caretLeftIcon.addEventListener("click", () => {
      modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
    });

    caretRightIcon.addEventListener("click", () => {
      modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
    });

    modalAddToCartBtn.addEventListener("click", () => {
      let selectedProduct = {
        name: modalName.innerText,
        price: modalPrice.innerText,
        image: modalImage.src,
        description: modalDescription.innerText,
        quantity: modalInput.value
      };

      let cart = localStorage.getItem("cart");

      let existingProduct = cart.find(p => p.name === selectedProduct.name);

      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
      } else {
        cart.push(selectedProduct);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";

      window.location.reload();
    });

    let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");

    quickLookProductModalCloser.addEventListener("click", () => {
      quickLookProductModal.style.visibility = "hidden";
      quickLookProductModal.style.zIndex = "-999";
    });
  })
  .catch(err => {
    console.log(err)
  })
}

let prodPriceMin = 5;
let prodPriceMax = 460;

const rangeMin = document.querySelector(".left-sidebar-left-filter-section-3 .range-min");
rangeMin.addEventListener("change", () => {
  prodPriceMin = rangeMin.value;
  filterWithMinAndMax(prodPriceMin, prodPriceMax)
})

const rangeMax = document.querySelector(".left-sidebar-left-filter-section-3 .range-max");
rangeMax.addEventListener("change", () => {
  prodPriceMax = rangeMax.value;
  filterWithMinAndMax(prodPriceMin, prodPriceMax)
})

const inputMin = document.querySelector(".left-sidebar-left-filter-section-3 .input-min");
inputMin.addEventListener("change", () => {
  prodPriceMin = inputMin.value;
  filterWithMinAndMax(prodPriceMin, prodPriceMax)
})

const inputMax = document.querySelector(".left-sidebar-left-filter-section-3 .input-max");
inputMax.addEventListener("change", () => {
  prodPriceMax = inputMax.value;
  filterWithMinAndMax(prodPriceMin, prodPriceMax)
})





const sidebarFilterColor1 = document.getElementById("sidebar-filter-color-1");
const sidebarFilterColor2 = document.getElementById("sidebar-filter-color-2");
const sidebarFilterColor3 = document.getElementById("sidebar-filter-color-3");
const sidebarFilterColor4 = document.getElementById("sidebar-filter-color-4");
const sidebarFilterColor5 = document.getElementById("sidebar-filter-color-5");
const sidebarFilterColor6 = document.getElementById("sidebar-filter-color-6");
const sidebarFilterColor7 = document.getElementById("sidebar-filter-color-7");
const sidebarFilterColor8 = document.getElementById("sidebar-filter-color-8");


sidebarFilterColor1.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
      for (let product of products) {
        if(product.color === "beige") {
        let item = document.createElement("div");
        item.className = "main-product-item";
  
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
  
        leftSidebarProductsWrapper.appendChild(item);
  
        let quickLookBtn = item.querySelector(".quick-look-btn");
  
        quickLookBtn.addEventListener("click", () => {
          modalImage.src = product.image;
          modalName.innerText = product.name;
          modalPrice.innerText = "$" + product.price;
          modalDescription.innerText = product.description;
          modalInput.value = 1;
  
          quickLookProductModal.style.visibility = "visible";
          quickLookProductModal.style.zIndex = "9999";
        });
        }
      }
  
      let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
      let caretRightIcon = document.querySelector(".bi-caret-right-fill");
  
      caretLeftIcon.addEventListener("click", () => {
        modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
      });
  
      caretRightIcon.addEventListener("click", () => {
        modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
      });
  
  
      let quickLookProductModal = document.querySelector(".quick-look-product-modal");
  
      let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
      let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
      let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
      let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
      let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
      let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");
  
  
      modalAddToCartBtn.addEventListener("click", () => {
        let selectedProduct = {
          name: modalName.innerText,
          price: modalPrice.innerText,
          image: modalImage.src,
          description: modalDescription.innerText,
          quantity: modalInput.value
        };
  
        let existingProduct = cart.find(p => p.name === selectedProduct.name);
  
        if (existingProduct) {
          existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
        } else {
          cart.push(selectedProduct);
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
  
        quickLookProductModal.style.visibility = "hidden";
        quickLookProductModal.style.zIndex = "-999";
  
        window.location.reload();
      });
  
      let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");
  
      quickLookProductModalCloser.addEventListener("click", () => {
        quickLookProductModal.style.visibility = "hidden";
        quickLookProductModal.style.zIndex = "-999";
      });
      })
  })

sidebarFilterColor2.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
      for (let product of products) {
        if(product.color === "black") {
        let item = document.createElement("div");
        item.className = "main-product-item";
  
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
  
        leftSidebarProductsWrapper.appendChild(item);
  
        let quickLookBtn = item.querySelector(".quick-look-btn");
  
        quickLookBtn.addEventListener("click", () => {
          modalImage.src = product.image;
          modalName.innerText = product.name;
          modalPrice.innerText = "$" + product.price;
          modalDescription.innerText = product.description;
          modalInput.value = 1;
  
          quickLookProductModal.style.visibility = "visible";
          quickLookProductModal.style.zIndex = "9999";
        });
        }
      }
  
      let caretLeftIcon = document.querySelector(".bi-caret-left-fill");
      let caretRightIcon = document.querySelector(".bi-caret-right-fill");
  
      caretLeftIcon.addEventListener("click", () => {
        modalInput.value = Math.max(0, parseInt(modalInput.value) - 1);
      });
  
      caretRightIcon.addEventListener("click", () => {
        modalInput.value = Math.min(99, parseInt(modalInput.value) + 1);
      });
  
  
      let quickLookProductModal = document.querySelector(".quick-look-product-modal");
  
      let modalImage = quickLookProductModal.querySelector(".quick-look-modal-left-image-wrapper img");
      let modalName = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper h3");
      let modalPrice = quickLookProductModal.querySelector(".quicklook-product-maindata-wrapper div");
      let modalDescription = quickLookProductModal.querySelector(".quicklook-product-additional-details p");
      let modalInput = quickLookProductModal.querySelector(".quicklook-product-item-count");
      let modalAddToCartBtn = quickLookProductModal.querySelector(".quicklook-product-add-tocart-btn-wrapper a");
  
  
      modalAddToCartBtn.addEventListener("click", () => {
        let selectedProduct = {
          name: modalName.innerText,
          price: modalPrice.innerText,
          image: modalImage.src,
          description: modalDescription.innerText,
          quantity: modalInput.value
        };
  
        let existingProduct = cart.find(p => p.name === selectedProduct.name);
  
        if (existingProduct) {
          existingProduct.quantity = parseInt(existingProduct.quantity) + parseInt(selectedProduct.quantity);
        } else {
          cart.push(selectedProduct);
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
  
        quickLookProductModal.style.visibility = "hidden";
        quickLookProductModal.style.zIndex = "-999";
  
        window.location.reload();
      });
  
      let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");
  
      quickLookProductModalCloser.addEventListener("click", () => {
        quickLookProductModal.style.visibility = "hidden";
        quickLookProductModal.style.zIndex = "-999";
      });
      })
  })

sidebarFilterColor3.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
      for (let product of products) {
        if(product.color === "brown") {
        let item = document.createElement("div");
        item.className = "main-product-item";
  
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
  
        leftSidebarProductsWrapper.appendChild(item);
  
        let quickLookBtn = item.querySelector(".quick-look-btn");
  
        quickLookBtn.addEventListener("click", () => {
          modalImage.src = product.image;
          modalName.innerText = product.name;
          modalPrice.innerText = "$" + product.price;
          modalDescription.innerText = product.description;
          modalInput.value = 1;
  
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

sidebarFilterColor4.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.color === "gold") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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


sidebarFilterColor5.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.color === "grey") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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

sidebarFilterColor6.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.color === "orange") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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

sidebarFilterColor7.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.color === "rose") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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

sidebarFilterColor8.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.color === "white") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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




  const sidebarFilterMaterial1 = document.getElementById("sidebar-filter-material-1");
  const sidebarFilterMaterial2 = document.getElementById("sidebar-filter-material-2");
  const sidebarFilterMaterial3 = document.getElementById("sidebar-filter-material-3");
  const sidebarFilterMaterial4 = document.getElementById("sidebar-filter-material-4");
  const sidebarFilterMaterial5 = document.getElementById("sidebar-filter-material-5");
  const sidebarFilterMaterial6 = document.getElementById("sidebar-filter-material-6");


sidebarFilterMaterial1.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.material === "chrome") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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
  
        localStorage.setItem("cart", JSON.stringify(cart));
  
        quickLookProductModal.style.visibility = "hidden";
        quickLookProductModal.style.zIndex = "-999";
  
        window.location.reload();
      });
  
      let quickLookProductModalCloser = document.querySelector(".quick-look-product-modal-closer");
  
      quickLookProductModalCloser.addEventListener("click", () => {
        quickLookProductModal.style.visibility = "hidden";
        quickLookProductModal.style.zIndex = "-999";
      });
      })
  })

  sidebarFilterMaterial2.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.material === "concrete") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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

  sidebarFilterMaterial3.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.material === "glass") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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

  sidebarFilterMaterial4.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.material === "metal") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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

  sidebarFilterMaterial5.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.material === "steel") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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

  sidebarFilterMaterial6.addEventListener("click", () => {
    leftSidebarProductsWrapper.innerHTML = ""
  
      fetch("../../src/db/db.json")
      .then(res => res.json())
      .then(data => {
        let products = data.products;
  
        // her bir product için bir döngü başlatıyoruz
      for (let product of products) {
        if(product.material === "wood") {
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
        leftSidebarProductsWrapper.appendChild(item);
  
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



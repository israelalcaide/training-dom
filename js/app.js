window.addEventListener("load", () => {
    //Seleccionar las ventanas modales
    let addedToCart = new bootstrap.Modal(
      document.querySelector("#addedToCart"),
      {
        keyboard: false,
      }
    );
    let cartPurchased = new bootstrap.Modal(
      document.querySelector("#cartPurchased"),
      {
        keyboard: false,
      }
    );
    let alreadyAddedToCart = new bootstrap.Modal(
      document.querySelector("#alreadyAddedToCart"),
      {
        keyboard: false,
      }
    );
    let shoppingCart = new bootstrap.Modal(
      document.querySelector("#shoppingCart"),
      {
        keyboard: false,
      }
    );
    //Añadir productos al carro con botones
    let addToCartButtons = document.querySelectorAll(".card-body");
    for (let index = 0; index < addToCartButtons.length; index++) {
      const button = addToCartButtons[index];
      button.addEventListener("click", (e) => {
        addToCartClicked(e);
      });
    }
    // Vaciar el carro de la compra
    document.querySelector("#empty-cart").addEventListener("click", () => {
      emptyCart();
      setTimeout(() => {
        shoppingCart.hide();
      }, 800);
    });
    // Simular la confimación de pago
    document.querySelector("#btn-purchase").addEventListener("click", () => {
      purchaseClicked();
    });
    // Detener la animación del carrito
    document.querySelector("#cart").addEventListener("click", () => {
      cart.classList.remove("hvr-pulse");
    });
    //activar o desactivar los botones del carro
    const toggleShoppingControls = (enable) => {
      if (enable) {
        document.querySelector("#empty-cart").classList.remove("disabled");
        document.querySelector("#btn-purchase").classList.remove("disabled");
        document.querySelector("#btn-purchase").classList.add("hvr-pulse");
      } else {
        document.querySelector("#empty-cart").classList.add("disabled");
        document.querySelector("#btn-purchase").classList.add("disabled");
        document.querySelector("#btn-purchase").classList.remove("hvr-pulse");
      }
    };
    //vaciar carro de la compra
    const emptyCart = () => {
      document.querySelector("tbody").innerHTML = "";
      updateCartTotal();
      toggleShoppingControls(false);
    };
    //simular compra y mostrar ventana modal
    const purchaseClicked = () => {
      document.querySelector("tbody").innerHTML = "";
      updateCartTotal();
      toggleShoppingControls(false);
      cartPurchased.show();
      setTimeout(() => {
        cartPurchased.hide();
        shoppingCart.hide();
      }, 2000);
    };
  
    //Eliminar elemento del carro individualmente
    const removeCartItem = (e) => {
      let buttonClicked = e.target;
      let numRow = buttonClicked.parentNode.parentNode.getAttribute("row-number");
      document.querySelector(`#${numRow}`).remove();
      let numItemsAdded = document.querySelector("tbody").childElementCount;
      if (numItemsAdded == 0) {
        toggleShoppingControls(false);
        setTimeout(() => {
          shoppingCart.hide();
        }, 1000);
      }
      updateCartTotal();
    };
    //añadir producto al carro desde el botón
    const addToCartClicked = (e) => {
      let button = e.target;
      let shopItem = button.parentNode.parentNode.parentNode;
      let productId = shopItem.getAttribute("product-id");
      let title = shopItem.firstElementChild.getAttribute("alt");
      let productName = shopItem.lastElementChild.firstElementChild.textContent;
      let price = shopItem.children[1].firstElementChild.innerText.replace(
        " € / Kg",
        ""
      );
      let imageSrc = shopItem.firstElementChild.src;
      addItemToCart(productId, title, productName, price, imageSrc);
      updateCartTotal();
      cart.classList.add("hvr-pulse");
    };
    //generar una fila para el carro
    const addItemToCart = (productId, title, productName, price, imageSrc) => {
      let cartRow = document.createElement("tr");
      let rowId = "row-number" + productId;
      cartRow.setAttribute("id", rowId);
      let cartItems = document.querySelectorAll("tr");
      for (let index = 0; index < cartItems.length; index++) {
        if (cartItems[index].getAttribute("id") == rowId) {
          alreadyAddedToCart.show();
          setTimeout(() => {
            alreadyAddedToCart.hide();
          }, 2500);
          return;
        }
      }
      let itemsAdded = cartItems.length;
      let cartRowContents = `
      <th scope="row">${itemsAdded}</th>
      <td>
         <div class="card border-success mb-3 text-center">
            <div class="card-body text-success">
               <img src="${imageSrc}" alt="${title}" class="img-thumbnail">
            </div>
            <div class="card-footer bg-transparent border-success">${productName}</div>
         </div>
      </td>
      <td>
         <h4 class="card-title pricing-card-title text-center">${price} € <small class="text-muted">/ Kg</small></h4>
      </td>
      <td>
         <div class="row">
            <div class="d-flex justify-content-center quantity col-12 col-md-6">
               <input class="form-control rounded-sm text-dark border-info" type="number" min="1" max="10"
                  step="1" value="1" row-number="${rowId}">
               <div class="quantity-nav">
                  <div class="quantity-button quantity-up border-info d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-circle-arrow-up text-warning"></i>
                  </div>
                  <div class="quantity-button quantity-down border-info d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-circle-arrow-down text-warning"></i>
                  </div>
               </div>
            </div>
            <div class="text-center col-12 col-md-6">
               <button type="button" class="btn btn-link text-danger mt-2" row-number="${rowId}">
                  <span>
                  <i class="fa-solid fa-circle-xmark"></i>
                  </span>
               </button>
            </div>
         </div>
      </td>
      `;
      cartRow.innerHTML = cartRowContents;
      document.querySelector("tbody").appendChild(cartRow);
      //Evento click para eliminar la fila
      cartRow.lastElementChild.lastElementChild.lastElementChild.firstElementChild.addEventListener(
        "click",
        removeCartItem
        //no se le ponen parentesis para refereniciarla en memoria
      );
      //Evento de modificacion de productos
      cartRow.lastElementChild.firstElementChild.firstElementChild.firstElementChild.addEventListener(
        "change",
        updateCartTotal
      );
      //Evento de modificacion de productos
      cartRow.lastElementChild.firstElementChild.firstElementChild.firstElementChild.addEventListener(
        "input",
        updateCartTotal
      );
      let input = cartRow.querySelector("input");
      let max = input.getAttribute("max");
      let min = input.getAttribute("min");
      let quantityUp = cartRow.querySelector(".quantity-up");
      let quantityDown = cartRow.querySelector(".quantity-down");
      quantityUp.firstElementChild.addEventListener("click", () => {
        if (parseInt(input.value) < max) {
          input.value = parseInt(input.value) + 1;
        }
        updateCartTotal();
      });
      quantityDown.addEventListener("click", () => {
        if (parseInt(input.value) > min) {
          input.value = parseInt(input.value) - 1;
        }
        updateCartTotal();
      });
      toggleShoppingControls(true);
      addedToCart.show();
      setTimeout(() => {
        addedToCart.hide();
      }, 1800);
    };
    //actualizar el total de la compra
    const updateCartTotal = () => {
      let cartItemContainer = document.querySelector("table");
      let cartPrices = cartItemContainer.querySelectorAll(".pricing-card-title");
      let cartQuantities = cartItemContainer.querySelectorAll("input");
      let total = 0;
      for (let index = 0; index < cartPrices.length; index++) {
        let price = cartPrices[index].textContent;
        let quantity = cartQuantities[index].value;
        price = parseFloat(price.replace(/[^0-9|^.]/, ""));
        total += price * quantity;
      }
      document.querySelector("#total-count").innerText = total.toFixed(2);
    };
    //hacer los productos arrastrables
    const listItems = document.querySelectorAll(".draggable");
    const cart = document.querySelector("#cart");
    let draggedItem = null;
    for (let index = 0; index < listItems.length; index++) {
      const item = listItems[index];
      item.addEventListener("dragstart", () => {
        draggedItem = item;
        setTimeout(() => {
          item.style.opacity = "0.5";
        }, 200);
      });
      item.addEventListener("dragend", () => {
        setTimeout(() => {
          item.style.opacity = "1";
          draggedItem = null;
        }, 200);
      });
    }
    //soltar productos en el carro
    cart.addEventListener("dragenter", (e) => {
      e.preventDefault();
    });
    cart.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  
    cart.addEventListener("drop", () => {
      let productId = draggedItem.getAttribute("product-id");
      let title = draggedItem.firstElementChild.getAttribute("alt");
      let productName = draggedItem.lastElementChild.textContent;
      let price = draggedItem.children[1].firstElementChild.innerText.replace(
        " € / Kg",
        ""
      );
      let imageSrc = draggedItem.firstElementChild.src;
      addItemToCart(productId, title, productName, price, imageSrc);
      updateCartTotal();
      cart.classList.add("hvr-pulse");
    });
  });
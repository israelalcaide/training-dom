window.addEventListener("load", () => {
  // Seleccionar las ventanas modales
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
  // Añadir productos al carro con botones
  let addToCartButtons = document.querySelectorAll(".card-body");
  for (let index = 0; index < addToCartButtons.length; index++) {
    const button = addToCartButtons[index];
    button.addEventListener("click", (e) => {
      //TO DO
    });
  }

  // Vaciar el carro de la compra
  document.querySelector("#empty-cart").addEventListener("click", () => {
    //TO DO
  });
  // SImular la confirmacion de pago
  document.querySelector("#btn-purchase").addEventListener("click", () => {
    //TO DO
  });
  // Detener la animacion del carrito
  document.querySelector("#cart").addEventListener("click", () => {
    //TO DO
  });
  // Activar o desactivar los botones del carro
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
  // Vaciar carro de la compra
  const emptyCart = () => {
    //TO DO
  };
  //Simular compra y mostrar ventana modal
  const purchaseClicked = () => {
    // TO DO
  };
  // Eliminar el elemento del carro individualmente
  const removeCartItem = (e) => {
    // TO DO
  };
  // Añadir producto al carro desde el boton
  const addToCartClicked = (e) => {
    //TO DO
  };
  // Generar una fila para el carro
  const addItemToCart = (productId, title, productName, price, imageSrc) => {
    // TO DO
  };
  // Actualizar el total de la compra
  const updateCartTotal = () => {
    let cartItemContainer = document.querySelector("table");
    let cartPrices = cartItemContainer.querySelectorAll(".pricing-card-title");
    let cartQuantities = cartItemContainer.querySelector("input")
    let total = 0
    for (let index = 0; index < cartPrices.length; index++) {
        let price = cartPrices[index].textContent
        let quantity = cartQuantities[index].value
        price = parseFloat(price.replace(/[^0-9|^.]/,""))
        total +=price *quantity;

        
    }
    document.querySelector("#total-count").innerText = total.toFixed(2)
  };
  // Hacer los productos arrastable
  // Soltar productos en el carro
});

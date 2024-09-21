document.addEventListener("DOMContentLoaded", () => {
  const ulCart = document.querySelector("#carts-list");

  // Función para obtener los productos del carrito y renderizarlos
  const renderCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Obtener el carrito del localStorage

    ulCart.innerHTML = ""; // Limpiar lista de carrito

    cart.forEach((item) => {
      let liItem = document.createElement("li");
      liItem.innerHTML = `
        <strong>${item.productTitle}</strong> <br>
        Cantidad: <input type="number" class="quantity-input" 
                        data-product-id="${item.productId}" 
                        value="${item.quantity}" min="1">
        <button class="update-quantity" data-product-id="${item.productId}">
          Actualizar Cantidad
        </button>
        <button class="remove-from-cart" data-product-id="${item.productId}">
          Eliminar del Carrito
        </button>
      `;
      ulCart.append(liItem);
    });

    // Añadir eventos para los botones después de renderizar
    addEventListeners();
  };

  // Función para manejar la actualización de cantidad de producto
  const updateProductQuantity = (productId, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Volver a renderizar el carrito con las actualizaciones
  };

  // Función para manejar la eliminación de producto del carrito
  const removeProductFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Volver a renderizar el carrito con las eliminaciones
  };

  // Función para manejar eventos de botones después de renderizar
  const addEventListeners = () => {
    // Añadir eventos a los botones de actualizar cantidad
    document.querySelectorAll(".update-quantity").forEach(button => {
      button.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-product-id");
        const quantity = Number(event.target.previousElementSibling.value);
        updateProductQuantity(productId, quantity);
      });
    });

    // Añadir eventos a los botones de eliminar producto
    document.querySelectorAll(".remove-from-cart").forEach(button => {
      button.addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-product-id");
        removeProductFromCart(productId);
      });
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    localStorage.removeItem("cart");
    ulCart.innerHTML = ""; // Limpiar lista de carrito
  };

  // Función para manejar el botón de "Finalizar Compra"
  const handleCheckout = () => {
    const checkoutButton = document.querySelector("#checkout");
    checkoutButton.addEventListener("click", () => {
      // Redirigir a una página de confirmación de compra o de pago
      window.location.href = "/checkout"; 
    });
  };

  // Agregar evento al botón de "Vaciar Carrito"
  document.querySelector("#clear-cart").addEventListener("click", clearCart);
  handleCheckout();
  renderCart();
});

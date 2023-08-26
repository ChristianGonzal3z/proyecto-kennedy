document.addEventListener("DOMContentLoaded", function () {
  const carrito = document.querySelector("#carrito");
  const listaCarrito = document.querySelector("#lista-carrito tbody");
  const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
  const agregarCarritoBtns = document.querySelectorAll(".agregar-carrito");
  const totalPagarElement = document.querySelector("#total-pagar"); // Nuevo

  // Array para almacenar los productos en el carrito
  let productosCarrito = [];

  // Event listeners
  agregarCarritoBtns.forEach((boton) => {
    boton.addEventListener("click", agregarProductoAlCarrito);
  });

  carrito.addEventListener("click", eliminarProducto);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Función para agregar un producto al carrito
  function agregarProductoAlCarrito(event) {
    event.preventDefault();
    const productoSeleccionado = event.target.parentElement.parentElement;

    const producto = {
      imagen: productoSeleccionado.querySelector("img").src,
      nombre: productoSeleccionado.querySelector("h4").textContent,
      precio: productoSeleccionado.querySelector(".price").textContent,
      id: productoSeleccionado.querySelector(".agregar-carrito").getAttribute("data-id"),
    };

    // Verificar si el producto ya está en el carrito
    const existe = productosCarrito.some((productoCarrito) => productoCarrito.id === producto.id);
    if (existe) {
      alert("Este producto ya está en el carrito");
      return;
    }

    productosCarrito = [...productosCarrito, producto];

    // Agregar el producto al carrito visualmente
    insertarProductoEnCarrito(producto);

    // Actualizar el total a pagar
    actualizarTotal();
  }

  // Función para insertar un producto en el carrito visualmente
  function insertarProductoEnCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${producto.imagen}" width="50"></td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
    `;
    listaCarrito.appendChild(row);
  }

  // Función para eliminar un producto del carrito
  function eliminarProducto(event) {
    if (event.target.classList.contains("borrar-producto")) {
      const productoId = event.target.getAttribute("data-id");
      productosCarrito = productosCarrito.filter((producto) => producto.id !== productoId);
      actualizarCarrito();
      actualizarTotal();
    }
  }

  // Función para vaciar el carrito
  function vaciarCarrito() {
    productosCarrito = [];
    actualizarCarrito();
    actualizarTotal();
  }

  // Función para actualizar el carrito visualmente
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    productosCarrito.forEach(insertarProductoEnCarrito);
  }

  // Función para calcular y mostrar el total a pagar
  function actualizarTotal() {
    const total = productosCarrito.reduce((total, producto) => total + parseFloat(producto.precio), 0);
    totalPagarElement.textContent = total.toFixed(2);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderizarProductos = () => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((response) => response.json())

      .then((data) => {
        let contenedorProductos = document.getElementById(
          "contenedorProductos"
        );
        for (const producto of data.products) {
          let tarjetaProducto = document.createElement("article");
          tarjetaProducto.classList.add("tarjetaProducto");
          let tituloProducto = document.createElement("h3");
          tituloProducto.classList.add("tituloProducto");
          tituloProducto.textContent = producto.title;

          let precioProducto = document.createElement("p");
          precioProducto.textContent = `$${producto.price}`;

          let imagenProducto = document.createElement("img");
          imagenProducto.src = producto.images[0];
          imagenProducto.classList.add("imgProducto");
          imagenProducto.alt = producto.description;

          let botonAgregar = document.createElement("button");
          botonAgregar.textContent = "Agregar";
          botonAgregar.classList.add("btnAgregar");
          botonAgregar.addEventListener("click", () => {
            alert(`Se agrego ${producto.title} al carrito`);

            agregarProductos(producto);
            actualizarAgregados();
          });

          tarjetaProducto.appendChild(tituloProducto);
          tarjetaProducto.appendChild(precioProducto);
          tarjetaProducto.appendChild(imagenProducto);
          tarjetaProducto.appendChild(botonAgregar);
          contenedorProductos.appendChild(tarjetaProducto);
        }
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  };

  const agregarProductos = (producto) => {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const actualizarAgregados = () => {
    const contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.textContent = carrito.length;
  };
  renderizarProductos();
  actualizarAgregados();
});

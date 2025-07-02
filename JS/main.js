document.addEventListener("DOMContentLoaded", ()=>{
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const renderizarProductos = ()=>{
fetch(('https://dummyjson.com/products?limit=10'))
.then(response =>response.json())

.then(data=>{ 
    let contenedorProductos = document.getElementById("contenedor-productos")
    for(const producto of data.products){
        let tarjetaProducto = document.createElement("article")
        tarjetaProducto.classList.add("tarjeta-producto")
       let tituloProducto = document.createElement("h3")
       tituloProducto.textContent = producto.title

       let precioProducto = document.createElement("p")
       precioProducto.textContent=`$${producto.price}`
    
       let imagenProducto = document.createElement("img")
       imagenProducto.src = producto.images[0]
       imagenProducto.classList.add("img-producto")
       imagenProducto.alt = producto.description;

       let botonAgregar = document.createElement("button")
       botonAgregar.textContent ="Agregar"
       botonAgregar.classList.add("btn-agregar")
       botonAgregar.addEventListener("click", ()=>{
        alert(`Se agrego ${producto.title} al carrito`)

        agregarProductos(producto)
        actualizarAgregados()

       })
       
       tarjetaProducto.appendChild(tituloProducto)
       tarjetaProducto.appendChild(precioProducto)
       tarjetaProducto.appendChild(imagenProducto)
       tarjetaProducto.appendChild(botonAgregar)
       contenedorProductos.appendChild(tarjetaProducto)
    }
         // DEBERIA DARLE A CADA UNO UN FORMATO TIPO CARD Dentro del div que ya existe tal vez
     
})
     .catch(error=>{
    console.error('Error al obtener productos:', error)
})

}

const agregarProductos = producto =>{
    carrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const actualizarAgregados = ()=>{
    const contadorCarrito= document.getElementById("contador-carrito")
    contadorCarrito.textContent = carrito.length
}
renderizarProductos()
actualizarAgregados()
})

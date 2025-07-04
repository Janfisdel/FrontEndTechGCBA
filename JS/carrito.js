document.addEventListener("DOMContentLoaded", ()=>{

const renderizarCarrito = ()=>{
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []
    productosEnCarrito(carrito)
   
    let contenedorCarrito = document.getElementById("contenedor-carrito")
    contenedorCarrito.innerHTML = ""

    if (!carrito.length){
        let mensajeCarrito = document.createElement("p")
        mensajeCarrito.classList.add("mensaje-carrito")
        mensajeCarrito.textContent = "Tu carrito esta vacio"
        
        contenedorCarrito.appendChild(mensajeCarrito)
    }else{  
      carrito.forEach((elemento, index) => {
        let tarjetaProducto = document.createElement("article")
        tarjetaProducto.classList.add("producto-carrito")

      //  let imagenProducto = document.createElement("img")
      //  imagenProducto.src = elemento.images[0]
      //  imagenProducto.classList.add("img-producto")
      //  imagenProducto.alt = elemento.description;

       let tituloProducto = document.createElement("h3")
       tituloProducto.textContent = elemento.title

       let precioProducto = document.createElement("p")
       precioProducto.textContent=`$${elemento.price}`
    
       let botonEliminar = document.createElement("button")
       botonEliminar.classList.add("btn-eliminar")
       botonEliminar.textContent = "Eliminar del carrito"
       botonEliminar.addEventListener("click", ()=>{
            eliminarProducto(index)
       })
       
       tarjetaProducto.appendChild(tituloProducto)
      //  tarjetaProducto.appendChild(imagenProducto)
       tarjetaProducto.appendChild(precioProducto)
       tarjetaProducto.appendChild(botonEliminar)
    
       contenedorCarrito.appendChild(tarjetaProducto)
      })
      

    }
     renderizarBotones()

}

const renderizarBotones =() =>{
  let carrito = JSON.parse(localStorage.getItem("carrito")) || []
  let divAcciones = document.getElementById("acciones-carrito")
  divAcciones.innerHTML = ""

  if (carrito.length){
    let botonVaciar = document.createElement("button")
    botonVaciar.classList.add("btn-vaciar")
    botonVaciar.textContent ="Vaciar carrito"
    botonVaciar.addEventListener("click", ()=>{
        vaciarCarrito()
    })

    let botonFinalizar = document.createElement("button")
    botonFinalizar.classList.add("btn-vaciar")
    botonFinalizar.textContent = "Finalizar compra"
    botonFinalizar.addEventListener("click", ()=>{
      let confirmado = confirm("Esta seguro que desea finalizar la compra?")
      if(confirmado){
        alert("Gracias por su compra")
        localStorage.removeItem("carrito")
        window.location.href ="./index.html"
      }
    

    })

    divAcciones.appendChild(botonVaciar)
    divAcciones.appendChild(botonFinalizar)
  }
}


 const productosEnCarrito = (carrito)=>{
    const contadorProductos=document.getElementById("contador-productos")
    contadorProductos.textContent = carrito.length
 }

 const eliminarProducto = (indice)=>{
  let carrito = JSON.parse(localStorage.getItem("carrito"))|| []
  carrito.splice(indice,1);
  localStorage.setItem("carrito",JSON.stringify(carrito))
  renderizarCarrito()
 }

 const vaciarCarrito = ()=>{
  localStorage.removeItem("carrito")
  alert("Carrito vaciado")
  renderizarCarrito()
 }
renderizarCarrito()

productosEnCarrito()




















})

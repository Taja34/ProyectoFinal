//Definir variables
let storage_category = [];
let cantidadDelProducto = 1;
const API_URL = "http://localhost:3000";
const urlProducts = "http://localhost:3000/productos"
let storageProducts = [];
let dataFiltered = [];
let data = []
let favoritos = JSON.parse(localStorage.getItem("favoritospage")) || [];
let carrito = JSON.parse(localStorage.getItem("carritopage")) || [];
//Capturar elementos del HTML
const contCard = document.getElementById('cont-card')
const cardsCarritoHoverContainer = document.getElementById('cardsCarritoHoverContainer')
const totalCarrito = document.getElementById('totalCarrito')

//función obtener datos
const getData = async (url) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data)
        storageProducts = data
        
        showCards(storageProducts);
    } catch (error) {
        console.log(error);
    }
};
getData(urlProducts)

//función pintar cards
const showCarritoHoverCards = () => {
    let carrito = JSON.parse(localStorage.getItem("carritopage")) || [];
    cardsCarritoHoverContainer.innerHTML = "";
    carrito.forEach(element => {
        cardsCarritoHoverContainer.innerHTML += `
        <div class="CardCarritoHover">
        <figure>
            <img src="${element.image}" alt="${element.name}" class="imgCarritoHover">
        </figure>
        <div class="informationCarritoHover">
            <h3>${element.name}</h3>
            <p>${element.cantidad}x $${element.price}</p>
        </div>
    </div>
        `
    })


}


const showCarritoHoverPrice = () => {
    let carrito = JSON.parse(localStorage.getItem("carritopage")) || [];
let totaldetotales = []
carrito.forEach((element) => {
    totaldetotales.push(element.total)
})
let total1 = totaldetotales.reduce((a, b) => a + b, 0);
totalCarrito.innerHTML = "";
totalCarrito.innerHTML = `
<h3>Total :</h3>
<p>$${total1}</p>
`
}
const showCards = (array) => {
    contCard.innerHTML = "";
   
    array.forEach((element) => {
        
        contCard.innerHTML += `
        <div class="card">
                        <figure class="imgCardContainer"><img
                                src="${element.image}"
                                alt="${element.name}" class="imgProductos"><figure><img src="./Img/estrella.png"" alt="" class="favoriteButton"name="${element.id}"></figure></figure>
                        <div class="nombreDelProducto">
                        ${element.name}
                            <p class="ValorDelProducto"> <b>$${element.price}</b>
                            </p>
                            <div>
                                <figure><img src="./Img/estrellitas.png" alt="" class="estrellitas"></figure>
                            </div>

                            <div class="butonAdd">
                                <p>Add</p>
                                <figure><img src="./Img/botonmas.png" alt=""class="botonmas btn--plus btnVadd" name="${element.id}"></figure>
                            </div>


                        </div>
                        </div>`
    })
}

//función filter
let cantidadesDelCart =  document.getElementsByClassName('cantidadesDelCart')
const filterProducts = (word) => {
  
     dataFiltered = storageProducts.filter((product) =>
     product.category.includes(word))
     
     showCards(dataFiltered) 
}

showCarritoHoverCards();
showCarritoHoverPrice();
//escuchar botones

document.addEventListener('click', ({target}) => {
    //escuchar boton categorias
    if (target.classList.contains('allOption')){
        showCards(storageProducts);
    }
    
    if (target.classList.contains('vegetablesOption')){
        console.log('Categoría vegetales')
        filterProducts('Frutas y verduras')
    }

    if (target.classList.contains('bervagesOption')){
        console.log('Categoría Bebidas')
        filterProducts('Bebidas')
    }

    if (target.classList.contains('meatsOption')){
        filterProducts('Carnes')
        }

    if (target.classList.contains('dairyOption')){
        console.log('Categoría lácteos')
        filterProducts('Lácteos')
    }

    if (target.classList.contains('frozenFoodsOption')){
        console.log('Categoría comida congelada')
        filterProducts('Carnes')
    }

    if (target.classList.contains('snacksOption')){
        console.log('Categoría snacks')
        filterProducts('Snack')
    }

    if (target.classList.contains('groceryOption')){
        console.log('Categoría grocery')
        filterProducts('Panadería')
    }

    if (target.classList.contains('alcoholOption')){
        console.log('Categoría alcohol')
        filterProducts('Bebidas alcohólicas')
    }

    //escuchar boton favoritos
    if (target.classList.contains("favoriteButton")) {
       
        const savefav = storageProducts.find((item) => item.id == target.getAttribute("name")
        
        );
        console.log(favoritos)
        const elementExist = favoritos.some((item) => item.id === savefav.id);
        console.log(elementExist);
        if (elementExist == false){
          favoritos.push(savefav);
          localStorage.setItem("favoritospage", JSON.stringify(favoritos));
        
      }
    }
    if(target.classList.contains("botonmas")){

        const savefav = storageProducts.find((item) => item.id == target.getAttribute("name")
        
        );
        console.log(carrito)
        const elementExist = carrito.some((item) => item.id === savefav.id);
        console.log(elementExist);
        if (elementExist == false){
            carrito.push(savefav);
          localStorage.setItem("carritopage", JSON.stringify(carrito));
        showCarritoHoverCards();
        showCarritoHoverPrice();
      }
    }
   
    
    
    }
);

document.addEventListener('mousemove',({target}) => {
    if (target.classList.contains('carretilla') || target.classList.contains('carritoHover')) {
        carritoHover.classList.add("carritoHoverVisible")
    }
    if (target.classList != 'carretilla' && target.classList != 'carritoHover') {
        carritoHover.classList.remove("carritoHoverVisible")
    }
})



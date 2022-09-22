const contCard = document.getElementById('contCarrito')
const processToCheckout = document.querySelector('.rojo')
const form = document.querySelector('.formContainer')
const cancelButton = document.getElementById('formCancelButton')
let TotalDeTodosProduct = document.getElementById('TotalDeTodosProduct')
let API_URL = "http://localhost:3000/compras";
const formBuyButton = document.getElementById('formBuyButton')
let dataStorage = JSON.parse(localStorage.getItem("carritopage")) || [];
console.log(dataStorage)
let recargaTotal = () => {
    let dataStorage = JSON.parse
        (localStorage.getItem("carritopage")) || [];
    let totaldetotales = []
    dataStorage.forEach((element) => {
        totaldetotales.push(element.total)
    })
    console.log(totaldetotales)
    let total1 = totaldetotales.reduce((a, b) => a + b, 0);
    TotalDeTodosProduct.innerHTML = total1
    console.log(total1);
}
recargaTotal()



const showCards = (array) => {
    contCard.innerHTML = "";

    array.forEach((element) => {
        contCard.innerHTML += `<div class="productoCarretilla">
        <figure><img
                src="${element.image}"
                alt="${element.name}" class="imgProductoKart"></figure>
        <div class="descripcionProductsCart">
            <b> ${element.name}</b>
            <p class="soldBy"><b> sold By: </b>Fresho</p>
            <p class="soldBy"><b> Quantity</b> -500 g</p>
        </div>
        <div class="descripcionProductsCart">
            <p class="soldBy sd1"> Price </p>
            <p class="precioProductosCart">$
                ${element.price}
            </p>

        </div>
        <div class="descripcionProductsCart">
            <p class="sd1 soldBy">Qty</p>
            <div class="contadoCart">
                <figure><img src="./Img/botonDelMenosCart.png" alt="" class="botonmas sd2 btn--minus" name="${element.id}"></figure>
                <p id ="${element.id}">${element.cantidad}</p>
                <figure><img src="./Img/botonDelMasCart.png" alt="" class="botonmas btn btn--plus"name="${element.id}"></figure>
            </div>
        </div>
        <div class="descripcionProductsCart">
            <p class="soldBy sd1"> Total </p>
            <p class="precioProductosCart">
        $${element.total}
            </p>

        </div>
        <div class="descripcionProductsCart">
            <p class="soldBy sd1"> Action </p>
            <p class="sd4">
Safe for later                             
            </p>
            <figure><img src="./Img/remove.png" alt=""class="botonEliminado btn btn--delete remove" name="${element.id}"></figure>

        </div>
         `
    })

}

const btnDeletes = document.getElementsByClassName('btn--delete');
const btnPlus = document.getElementsByClassName('btn--plus')
showCards(dataStorage)

let multiplicacion = (index, precio, cantidad) => {
    let dataStorage = JSON.parse
        (localStorage.getItem("carritopage"));
    console.log(dataStorage)
    let resultado = precio * cantidad;
    dataStorage[index].total = resultado;
    let totaldetotales = []
    dataStorage.forEach((element) => {
        totaldetotales.push(element.total)

    })


    console.log(totaldetotales)
    let total1 = totaldetotales.reduce((a, b) => a + b, 0);
    TotalDeTodosProduct.innerHTML = total1
    console.log(total1);
    localStorage.setItem("carritopage", JSON.stringify(dataStorage));
    let carrito1 = JSON.parse(localStorage.getItem("carritopage"))
    showCards(carrito1);


}
const handleDelete = (index) => {
    let desicion = confirm('Esta seguro de eliminar?')

    if (desicion = true) {
        let dataStorage = JSON.parse
            (localStorage.getItem("carritopage"));
        console.log(dataStorage)
        console.log(index)
        dataStorage.splice(index, 1)
        index = 0;
        //Render Data

        //Update LocalStorage
        localStorage.setItem('carritopage', JSON.stringify(dataStorage));
        showCards(dataStorage);
        recargaTotal()
    } else {
        alert('okey')
    }
}

document.addEventListener('click', ({ target }) => {
    if (target.classList.contains("btn--delete")) {
        let dataStorage = JSON.parse
            (localStorage.getItem("carritopage"));
        const index = dataStorage.findIndex(function (element) {
            return element.id == target.name
        })
        console.log(index);
        console.log(target.name)
        handleDelete(index)



    }
    if (target.classList.contains("btn--plus")) {
        let dataStorage = JSON.parse
            (localStorage.getItem("carritopage"));
        console.log(dataStorage)

        let index = dataStorage.findIndex(function (element) {
            return element.id == target.name
        })
        console.log(index);


        console.log(dataStorage[index].cantidad)
        dataStorage[index].cantidad += 1


        localStorage.setItem("carritopage", JSON.stringify(dataStorage));
        let carrito1 = JSON.parse(localStorage.getItem("carritopage"))
        showCards(carrito1);
        let precio = dataStorage[index].price
        let cantidad = dataStorage[index].cantidad
        multiplicacion(index, precio, cantidad)
    }
    if (target.classList.contains("btn--minus")) {
        let dataStorage = JSON.parse
            (localStorage.getItem("carritopage"));
        console.log(dataStorage)
        let index = dataStorage.findIndex(function (element) {
            return element.id == target.name
        })
        if (dataStorage[index].cantidad >= 1) {
            console.log(index);
            console.log(dataStorage[index].cantidad)
            dataStorage[index].cantidad = dataStorage[index].cantidad - 1
            console.log(dataStorage[index].cantidad)

            localStorage.setItem("carritopage", JSON.stringify(dataStorage));
            let carrito1 = JSON.parse(localStorage.getItem("carritopage"))
            showCards(carrito1);
            let precio = dataStorage[index].price
            let cantidad = dataStorage[index].cantidad
            multiplicacion(index, precio, cantidad)
            // if(dataStorage[index].cantidad < 0){

            // }
        }
    }

})

processToCheckout.addEventListener('click', () => {
    form.classList.add("formContainerVisible")
})

cancelButton.addEventListener('click', () => {
    form.classList.remove("formContainerVisible")
})

formBuyButton.addEventListener('click', async () => {
    // e.preventDefault();
    let dataStorage = JSON.parse
            (localStorage.getItem("carritopage"));
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(dataStorage),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          }});
          localStorage.clear()

})



const contCard = document.getElementById('contCard')
let favoritos  = JSON.parse (localStorage.getItem("favoritospage")) || [];
console.log(favoritos)

const showCards = async(array) => {
    contCard.innerHTML = "";

    array.forEach ((element) => {
        contCard.innerHTML += `
        <div class="card cardWish">
        <figure><img src="./Img/botonDeEliminado.png" alt="" class="botonEliminado btn btn--delete" name="${element.id}"></figure>
        <figure><img
                src="${element.image}
                alt="${element.name}" class="imgProductos"></figure>
        <div class="nombreDelProducto">
            ${element.name}
            <p class="ValorDelProducto"> <b>$${element.price} </b>
            </p>
            <div>
                <figure><img src="./Img/estrellitas.png" alt="" class="estrellitas"></figure>
            </div>

            <div class="botonAdd">
                <figure><img src="./Img/botonDelMenos.png" alt="" class="botonmas"></figure>
                <p>0</p>
                <figure><img src="./Img/botonmas.png" alt="" class="botonmas"></figure>
            </div>
        </div>
    </div> `
    })

}

const btnDeletes = document.getElementsByClassName('btn--delete');
showCards(favoritos)

const handleDelete = (index) => {
    let desicion = confirm('Esta seguro de eliminar?')
    if (desicion = true) {
        favoritos.splice(index, 1);
        //Render Data

        //Update LocalStorage
        localStorage.setItem('favoritospage', JSON.stringify(favoritos));
        showCards(favoritos);
      
    } else {
        alert('okey')
    }
}

document.addEventListener('click', ({ target }) => {
    if (target.classList.contains("btn--delete")) {
        console.log('click eliminar')
        const index = favoritos.findIndex(function(element){
            return element.id == target.name
        })
       
        console.log(target.name)
        console.log(index);
        handleDelete(index);
    }
})
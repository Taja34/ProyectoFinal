//Definir variables
 const btnListaDeCompras = document.getElementById('btnListaDeCompras')
const btnNew = document.getElementById('btnNew');
const containerForm = document.getElementById('containerForm');
const form = document.getElementById('form');
const containerItems = document.getElementById('items');
let verProductos = document.getElementById('verProductos')
const API_URL = "http://localhost:3000";
const urlProducts = "http://localhost:3000/productos"
const urlMercado = "http://localhost:3000/compras"
const branchInput = document.getElementsByName('branch')[0];
const referenceInput = document.getElementsByName('reference')[0];
const modelInput = document.getElementsByName('model')[0];
const kilometersInput = document.getElementsByName('kilometers')
[0];
const id = document.getElementsByName('id')[0];
const imageInput = document.getElementsByName('image')[0];
('crearNuevoProducto')
let isEdit = false;
let indexEdit;
botonGuardado =document.getElementById('botonGuardado')
let contCard = document.getElementById('cont-card')
let storageProducts = []
let listaDelMercado = []

const getData = async (url) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();

        storageProducts = data
        console.log(storageProducts)
        localStorage.setItem('admin', JSON.stringify(storageProducts));
showCards(storageProducts)
    } catch (error) {
        console.log(error);
    }
};
getData(urlProducts)
const showCards = (array) => {
    contCard.innerHTML = "";

    array.forEach((element) => {

        contCard.innerHTML += `
        <div class="card">
                        <figure class="imgCardContainer"><img
                                src="${element.image}"
                                alt="${element.name}" class="imgProductos"></figure>
                        <div class="nombreDelProducto">
                        ${element.name}
                            <p class="ValorDelProducto"> <b>$${element.price}</b>
                            </p>
                            <div>
                                <figure><img src="./Img/estrellitas.png" alt="" class="estrellitas"></figure>
                            </div>

                            <div class="botonesAdmin">
                            <div class="botonEliminarAdmin btn btn--delete">
                                <p>ELIMINAR</p>
                                </div>
                            
                            <div class="botonEditarAdmin btn btn--edit">
                            <a href="#icono" class="sd9"> <p>Editar</p></a>
                            </div>
                            </div>

                        </div>
                        </div>`
    })
    const btnDeletes = document.getElementsByClassName('btn--delete');
    const btnEdits = document.getElementsByClassName('btn--edit');

    //Listeners
    Array.from(btnDeletes).forEach((element, index) => {
        element.addEventListener('click', () => {
            handleDelete(index);
        })
    });

    Array.from(btnEdits).forEach((element, index) => {
        element.addEventListener('click', () => {
            handleEdit(index);
        })
    });
}

//Functions events
const showForm = () => {
    containerForm.classList.remove('hidden');
};

const handleSave = async(e) => {
    e.preventDefault();
    let nuevoProducto = {
        id: storageProducts[storageProducts.length - 1].id + 1,
        name: branchInput.value,
        category: referenceInput.value,
        cantidad:1,
        price:Number( kilometersInput.value),
        total:Number( kilometersInput.value),
        image: imageInput.value,

    };
    await fetch(urlProducts, {
        method: "POST",
        body: JSON.stringify(nuevoProducto),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          }});
    storageProducts.push (nuevoProducto);
   console.log( storageProducts)
    localStorage.setItem  ('admin', JSON.stringify(nuevoProducto));
    //Show cards
    showCards(storageProducts)
    //Clean Inputs
    id.value='';
    branchInput.value = '';
    referenceInput.value = '';
    modelInput.value = '';
    kilometersInput.value = '';
    imageInput.value = '';
    //Hide Form
    containerForm.classList.add('hidden');
};

const handleUpdate = (e) => {
    e.preventDefault();
    let editProduct = {
        id: storageProducts[indexEdit].id,
        name: branchInput.value,
        category: referenceInput.value,
        cantidad:storageProducts[indexEdit].cantidad,
        total:Number( kilometersInput.value),
        price:Number( kilometersInput.value),
        image: imageInput.value,
    };
    storageProducts[indexEdit] = editProduct;
     fetch(`${urlProducts}/${storageProducts[indexEdit].id} `, {
        method: "PUT",
      
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          },
        body:JSON.stringify({ id: storageProducts[indexEdit].id,
            name: branchInput.value,
            category: referenceInput.value,
            cantidad:storageProducts[indexEdit].cantidad,
            total:Number( kilometersInput.value),
            price:Number( kilometersInput.value),
            image: imageInput.value,

        })
        });
    //Update LocalStorage
    localStorage.setItem('products', JSON.stringify(storageProducts));
    //Show cards
    console.log(storageProducts)
   showCards(storageProducts)
    //Clean Inputs
    branchInput.value = '';
    referenceInput.value = '';
  
    kilometersInput.value = '';
    imageInput.value = '';
    //Hide Form
    containerForm.classList.add('hidden');
index= '';
}

const handleDelete = (index) => {
let desicion = confirm('Esta seguro de eliminar?')
if (desicion = true) {
    fetch(`${urlProducts}/${storageProducts[index].id} `, {
        method: "DELETE",
      
        
        });
 storageProducts.find(element)
  
  

}else{
    alert('okey')
}
}
const handleEdit = (index) => {
    isEdit = true;
    indexEdit = index;
    showForm();
    const product = storageProducts[index];
  
    branchInput.value = product.name;
    referenceInput.value = product.category;

    kilometersInput.value = product.price
    imageInput.value = product.image;
}

//Listeners Events
btnNew.addEventListener('click', showForm);
form.addEventListener('submit', (e) => {
    if (isEdit) {
        handleUpdate(e);
    }else {
        handleSave(e);
    }
});

const getDataLista = async (url) => {
    try {
        const res = await fetch(url);
        const dat = await res.json();

        listaDelMercado = dat

        console.log(listaDelMercado)
     
showLista(listaDelMercado)
    } catch (error) {
        console.log(error);
    }
};
let totaldetotales = []
let display = true;
btnListaDeCompras.addEventListener('click',()=>{

   
    getDataLista(urlMercado)
} )

const contListas = document.getElementById('cont-lista')
const showLista = (array) => {
if(display === true){



    contListas.innerHTML = "";
    array.forEach((element) => {
       contListas.innerHTML +='<div class="espacio"></div>'
        totaldetotales = []
element.forEach((dts) =>{
    contListas.innerHTML += `<div class="tituloDeListaDeCompras">Elemento
    <div>Nombre: ${dts.name}</div>
    <div>Cantidad: ${dts.cantidad}</div>
    <div>Precio: ${dts.price}</div>
    <div>total: ${dts.total}</div>
    </div>
    `
})

    element.forEach((element) => {

        totaldetotales.push(element.total)

   

 
      
    }
     )
     let total1 = totaldetotales.reduce((a, b) => a + b, 0);
     contListas.innerHTML+=` <div class="tituloDeListaDeCompras sd90"> Total de la compra es: ${total1} <hr> </div>`})
     display = false}else(contListas.innerHTML='',
     display = true)
    }
     
  



let url = window.location.href; 
let id = new URL(url).searchParams.get('id');

// Récupération de l'ID

getArticle(id);

async function getArticle(id) {
    let getInfos = await fetch("http://localhost:3000/api/products/" + id)
    .then(async res => {
        return await res.json()
        .then(product => {

            //Création de l'affichage du produit

            let imgContainer = document.querySelector('.item__img');
            let img = document.createElement('img');
            img.id = "img__product";
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            imgContainer.appendChild(img);

            let title = document.getElementById('title');
            title.innerHTML = product.name

            let price = document.getElementById('price');
            price.innerHTML = product.price

            let desc = document.getElementById('description');
            desc.innerHTML = product.description;

            let select = document.getElementById('colors');
            product.colors.forEach(color => {
                let option = document.createElement('option');
                option.value = color;
                option.innerHTML = color;
                select.appendChild(option);
        });
    });
})

//Message d'erreur si l'API est down

.catch(err => {errorMessage('article', 'désolé une erreur est survenue', '.item');
console.log(err);
})
}

// Ajouter un produit au panier (id, imsSrc, imgAlt, name, colors, quantity)

let cart=[];

let addButton=document.getElementById("addToCart");

addButton.addEventListener("click", function() {
    let color=document.getElementById("colors").value;
    let quantity=document.getElementById("quantity").value;
    let name = document.getElementById("title").textContent;
    let price = document.getElementById("price").textContent;
    let img = document.getElementById("img__product");
    let object = {
        id : id,
        imgSrc : img.src,
        imgAlt : img.alt,
        name : name,
        price : price,
        color : color,
        quantity: quantity
    };

    let isPresent = false;

    // Si on ne selectionne pas de couleur ni la quantité adéquate, le produit ne va pas dans le panier

    if (color == '' || quantity == 0 || quantity > 100) {
        alert("Veuillez choisir une couleur et une quantité comprise entre 1 et 100");
        return;
    }

    else {

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
            
        // Si le panier contient des produits de même id et même couleur

        for(let i=0; i < cart.length; i++) {
            if (cart[i].id === id && cart[i].color == color) {
                console.log('canapé déjà présent');
                isPresent = true;
                cart[i].quantity = parseInt(quantity) + parseInt(cart[i].quantity);
            }
        }

        // Si le panier contient des produits différents

        if (isPresent == false) {
            cart.push(object);    
        }
        
    localStorage.setItem("cart", JSON.stringify(cart));
    }

    //Redirection

    setTimeout(function() { 
        window.location.href = "./cart.html";
    }, 1000);
})
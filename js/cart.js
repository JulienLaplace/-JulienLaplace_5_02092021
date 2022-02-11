let url = window.location.href; 
let id = new URL(url).searchParams.get('id');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

// Récupération des produits de l'API

fetch("http://localhost:3000/api/products", requestOptions)
.then(response => response.text())
//.then(result => console.log(result))

// ----- Message d'erreur si API down -----

.catch(err => { errorMessage('#limitedWidthBlock', 'désolé une erreur est survenue', 'main');
console.log(err);
})

function getCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart == null) {
        cart = Array();
    } 
    return cart;
}

// ----- Création du panier -----

let cart = getCart();
let cartItem = document.querySelector('#cart__items');

cart.forEach(product => {
    console.log(product)

    let article = document.createElement('article');
    article.classList.add("cart__item");
    article.dataset.id = product.id;
    article.dataset.color = product.color;
    cartItem.appendChild(article);

    let cartItemImg = document.createElement('div');
    cartItemImg.classList.add("cart__item__img");
    article.appendChild(cartItemImg);

    let img = document.createElement('img');
    img.src = product.imgSrc;
    img.alt = product.imgAlt;
    cartItemImg.appendChild(img);

    let cartItemContent = document.createElement('div');
    cartItemContent.classList.add("cart__item__content");
    article.appendChild(cartItemContent);

    let cartItemContentDescription = document.createElement('div');
    cartItemContentDescription.classList.add("cart__item__content__description");
    cartItemContent.appendChild(cartItemContentDescription);

    let h2 = document.createElement('h2');
    h2.textContent = product.name;
    h2.classList.add("productName");
    cartItemContentDescription.appendChild(h2);

    let color = document.createElement('p');
    color.textContent = product.color;
    color.classList.add("colors");
    cartItemContentDescription.appendChild(color);

    let price = document.createElement('p');
    price.classList.add("price");
    price.textContent = product.price * product.quantity + " €";
    cartItemContentDescription.appendChild(price);
    
    let cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    let quantity = document.createElement('p');
    quantity.textContent=('qté:');
    cartItemContentSettingsQuantity.appendChild(quantity);

    let itemQuantity = document.createElement('input');
    itemQuantity.setAttribute('type' , 'number');
    itemQuantity.setAttribute('min', '1');
    itemQuantity.setAttribute('max', '100');
    itemQuantity.value=product.quantity;
    itemQuantity.classList.add('itemQuantity');
    cartItemContentSettingsQuantity.appendChild(itemQuantity);

    let deleteContenair = document.createElement('div');
    deleteContenair.classList.add('cart__item__content__settings__delete');
    cartItemContentSettings.appendChild(deleteContenair);

    let deleteItem = document.createElement('p'); 
    deleteItem.classList.add('deleteItem');
    deleteItem.innerText = 'Supprimer';
    deleteContenair.appendChild(deleteItem);
})

// Si le panier est vide

if (cart === null || cart == 0) {
    cartItem.textContent = "Il n'y a pas d'article dans votre panier";
}

// ----- Supprimer un article -----

// Récupère tous les boutons supprimer
let deleteBtn = document.getElementsByClassName('deleteItem');

Array.from(deleteBtn).forEach(button => {
    button.addEventListener('click', function() {

        if (confirm("Voulez vous supprimer ?") == true) {
            // Récupère l'id dans l'attribut data
            let id = button.closest('article').getAttribute('data-id');
            // Récupère la couleur dans l'attribut data
            let color = button.closest('article').getAttribute('data-color'); 
            // Récupère l'article parent du bouton supprimer concerné
            let article = button.closest('article'); 
            // La boucle va parcourir le panier
            for(let i = 0; i < cart.length; i++){ 
                // Si l'id du produit correspond à l'id du panier, et que la couleur du produit correspond à la couleur du panier
                if( id === cart[i].id && color === cart[i].color) { 
                    // On enlève le produit du panier
                    cart.splice(i, 1);
                    // On enlève la fiche produit du DOM 
                    article.parentElement.removeChild(article);
                    // On renvoie le panier à jour dans le localstorage
                    localStorage.setItem('cart', JSON.stringify(cart)); 
                    console.log('Canapé supprimé', cart);
                    displayTotal(cart);
                }
                
                if(cart.length === 0) {
                    localStorage.clear()
                }
            }
        } else {
            alert("Vous avez annulé");
        } 
        
        // Si on supprime les produits du panier
        if (cart === null || cart == 0) {
            cartItem.textContent = "Il n'y a pas d'article dans votre panier";
        }
    })   
});

// ----- Modifier la quantité + Prix et quantité total du panier -----

// Modification de la quantité

let itemQuantity = document.getElementsByClassName('itemQuantity');

Array.from(itemQuantity).forEach(quantity => {
    quantity.addEventListener('change', function() {
        let inputQuantity = quantity.value;
        let id = quantity.closest('article').getAttribute('data-id');
        let color = quantity.closest('article').getAttribute('data-color');
        let price = quantity.closest('.cart__item__content').getElementsByTagName('p')[1];
        
        for(let i = 0; i < cart.length; i++){ 
            if(cart[i].id === id && cart[i].color === color) { 
                cart[i].quantity = inputQuantity;
                let originPrice = cart[i].price;
                price.innerText = parseInt(originPrice) * parseInt(inputQuantity) + " €";
                localStorage.setItem('cart', JSON.stringify(cart)); 
                displayTotal(cart);
            }
            
            // Si la quantité dépasse 100 ou moins de 1 alors un message s'affiche
            
            if (inputQuantity > 100 || inputQuantity <1) {
                alert("La quantité minimale est de 1 produit et la quantité maximale est de 100 produits");
                window.location.reload();
                return;
            }    
        }
    })
});

// Fonction pour la quantité totale ainsi que le prix total du panier

function displayTotal(cartContent) {
    let totalQuantity = 0;
    let totalPrice = 0;

    for (let i =0; i < cartContent.length; i++) {
        let allPrices = cartContent[i].price * cartContent[i].quantity;
        let allQuantities = cartContent[i].quantity;
        totalPrice += allPrices;
        totalQuantity += parseInt(allQuantities);
    }

    let subQuantity = document.getElementById('totalQuantity');
    subQuantity.innerText = totalQuantity;
    let subPrice = document.getElementById('totalPrice');
    subPrice.innerText = totalPrice;
}

displayTotal(cart);

// ----- Formulaire -----

// Création des regex
let formValues = {
    "firstName" : {"regex": /^[a-zA-ZàáâäãèéêëìíîïńòóôöùúûüçÀÁÂÄÃĖÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜÇŒÆ ,.'-]{2,}$/, "errorLabel": "Le prénom"},
    "lastName" : {"regex": /^[a-zA-Z + ZàáâäãèéêëìíîïńòóôöùúûüçÀÁÂÄÃĖÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜÇŒÆ ,.'-]{2,}$/, "errorLabel": "Le nom"},
    "address": {"regex": /^[0-9a-zA-Z + ZàáâäãèéêëìíîïńòóôöùúûüçÀÁÂÄÃĖÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜÇŒÆ ,.'-]{2,}$/, "errorLabel": "L'adresse"},
    "city" : {"regex": /^[a-zA-Z + ZàáâäãèéêëìíîïńòóôöùúûüçÀÁÂÄÃĖÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜÇŒÆ '-]{2,}$/, "errorLabel": "La ville"},
    "email" : {"regex": /^[a-zA-Z0-9 + ZàáâäãèéêëìíîïńòóôöùúûüçÀÁÂÄÃĖÈÉÊËÌÍÎÏÒÓÔÖÙÚÛÜÇŒÆ ._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{3,15}$/, "errorLabel": "L'adresse mail"}
};

// Permet l'ajout d'un message d'erreur en dessous de l'input quand le champs est mal rempli
for (field in formValues) {
    let fieldName = field;
    let element = document.getElementById(field);
    let regex = formValues[field]['regex'];
    let errorLabel = formValues[field]['errorLabel'];
    
    element.addEventListener("input", (form) => {
        form.preventDefault();
        if (regex.test(element.value) == false || element.value == "") {
        document.getElementById(fieldName + "ErrorMsg").innerHTML =
            errorLabel + " n'est pas valide";
        } else {
        document.getElementById(fieldName + "ErrorMsg").innerHTML = "";
        }
    });
};

// Création tableau pour récuperer données utilisateur

let order = [];

order = document.getElementById("order");

// Validation du formulaire pour la commande

order.addEventListener("click", function(e) {
    e.preventDefault();
    let validForm = true;
    for (field in formValues) {
        let errorField = document.getElementById(field + "ErrorMsg");
        
        if (errorField.innerHTML === formValues[field]['errorLabel'] + " n'est pas valide") {
            validForm = false;
        }
    }

    //console.log(validForm);
    
    // Si le formulaire est vide une alerte s'affiche et rien ne s'envoie
    if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === ""
        ) {
        alert("le formulaire est incomplet");   
        return;
    
    //Sinon il est envoyé
    } else if (validForm) {
        let cart = getCart();
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        let products = [];
        cart.forEach((article) => {
            products.push(article.id);
        });
    
        let orderProducts = {
            contact: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email,
            },
            products : products,
        }

    // Si le panier est vide mais le formulaire remplis, 
    // alors un message indique qu'il faut ajouter un produit    
    if (cart.length === 0){
        alert ("Veuillez ajouter un produit au panier")
        return;
    }

        // Methode POST pour l'envoie des données au serveur
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(orderProducts),
        })
        .then((res) => {
            return res.json();
        })
        .then((confirmation) => {
        
            // Suppression du Local Storage
            localStorage.clear();

            window.location.href = "./confirmation.html?orderId=" + confirmation.orderId;
        }) 
    } 
});
let url = window.location.href; 
let id = new URL(url).searchParams.get('id');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
fetch("http://localhost:3000/api/products", requestOptions)
.then(response => response.text())
.then(result => console.log(result))

//Message d'erreur si API down

.catch(err => { 
    let itemContainer =document.querySelector('#limitedWidthBlock');
    itemContainer.style.display='none'; 
    let h2Error=document.createElement('h2');
    h2Error.style.marginTop = "100px";
    h2Error.textContent = 'désolé une erreur est survenue';
    document.querySelector('main').appendChild(h2Error);
    console.log(err);
})

//Création du panier

let cart = localStorage.getItem('cart');

JSON.parse(cart).forEach(product => {
    console.log(product)
    let cartItem = document.querySelector('#cart__items');

    let article = document.createElement('article');
    article.classList.add("cart__item");
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
    cartItemContentDescription.appendChild(price);
    
    let cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.classList.add("cart__item__content__settings");
    article.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    let quantity = document.createElement('p');
    quantity.textContent=('qté:');
    quantity.classList.add('quantity');
    cartItemContentSettingsQuantity.appendChild(quantity);

    let itemQuantity = document.createElement('input');
    itemQuantity.setAttribute('type' , 'number');
    itemQuantity.value=product.quantity;
    itemQuantity.classList.add('itemQuantity');
    cartItemContentSettingsQuantity.appendChild(itemQuantity);

    let deleteContenair = document.createElement('div');
    deleteContenair.classList.add('cart__item__content__settings__delete');
    cartItemContentSettings.appendChild(deleteContenair);

    let deleteItem = document.createElement('p'); 
    erase.classList.add('deleteItem');
    deleteContenair.appendChild(deleteItem);
})

// Supprimer un article

function deleteItem() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  console.log(deleteButtons);
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute("data-id");
      const deleteColor = event.target.getAttribute("data-color");
      console.log(deleteId, deleteColor);
      itemsInLocalStorage = itemsInLocalStorage.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      deleteConfirm = window.confirm(
        "Etes vous sûr de vouloir supprimer cet article ?"
      );
      if (deleteConfirm == true) {
        localStorage.setItem("cartItems", JSON.stringify(itemsInLocalStorage));
        location.reload();
      }
      alert("Article supprimé avec succès");
    });
  });
}
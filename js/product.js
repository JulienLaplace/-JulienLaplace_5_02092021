let url = window.location.href; 
let id = new URL(url).searchParams.get('id');

getArticle(id);

async function getArticle(id) {
    let getInfos = await fetch("http://localhost:3000/api/products/" + id)
    .then(async res => {
        return await res.json()
        .then(product => {

            //Création produit

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

    //Message d'erreur si API down

    }).catch(err => {
        let itemContainer =document.querySelector('article');
        itemContainer.style.display='none'; 
        let h2Error=document.createElement('h2');
        h2Error.textContent = 'désolé une erreur est survenue';
        document.querySelector('.item').appendChild(h2Error);
        console.log(err);
    })
}

// AJOUTER AU PANIER (id, colors, quantity)

let cart=[];

let addButton=document.getElementById("addToCart");

addButton.addEventListener("click", function(){
    let color=document.getElementById("colors").value;
    let quantity=document.getElementById("quantity").value;
    let name = document.getElementById("title").textContent;
    let img = document.getElementById("img__product");
    let object = {
        id : id,
        imgSrc : img.src,
        imgAlt : img.alt,
        name : name,
        color : color,
        quantity: quantity
    };
    let isPresent = false;

    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }

    for(let i=0; i < cart.length; i++) {
        if (cart[i].id === id && cart[i].color == color) {
            console.log('sofa déjà présent');
            isPresent = true;
            cart[i].quantity = parseInt(quantity) + parseInt(cart[i].quantity);
        }
    }

    if (isPresent == false) {
        cart.push(object);    
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    //Redirection

    setTimeout(function(){ 
        window.location.href = "./cart.html";
    }, 1000);
})
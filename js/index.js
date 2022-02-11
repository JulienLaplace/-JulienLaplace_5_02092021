
// Appel à l'API products

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
  
fetch("http://localhost:3000/api/products", requestOptions)
  .then(response => response.text())
  .then(result => JSON.parse(result).forEach(product => {
    console.log(product);
    const itemContainer = document.getElementById('items');

// Intégration dans le DOM

    let a = document.createElement('a');
    a.href = "./product.html?id=" + product._id;
    itemContainer.appendChild(a);
    
    let article = document.createElement('article');
    a.appendChild(article);

    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    article.appendChild(img);

    let h3 = document.createElement('h3');
    h3.innerHTML = product.name;
    h3.classList.add("productName");
    article.appendChild(h3);

    let p = document.createElement('p');
    p.innerHTML = product.description;
    p.classList.add("productDescription");
    article.appendChild(p);
  }))

  //Message d'erreur si API down
  
.catch(err => { 
  errorMessage('h2', 'désolé une erreur est survenue', '.items');
  console.log(err);
  })
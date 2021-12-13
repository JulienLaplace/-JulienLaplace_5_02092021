var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/api/products", requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result).forEach(product => {
            console.log(product);
            const itemContainer = document.getElementById('items');

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
        let itemContainer =document.querySelector('h2');
        itemContainer.style.display='none'; 
        let h2Error=document.createElement('h2');
        h2Error.textContent = 'désolé une erreur est survenue';
        document.querySelector('.items').appendChild(h2Error);
        console.log(err);
    })
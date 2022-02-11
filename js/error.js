// Création d'une fonction permettant d'afficher une erreur sur les
//pages index, product et cart

function errorMessage(selector, message, racine) {
    let itemContainer =document.querySelector(selector);
    itemContainer.style.display='none'; 
    let h2Error=document.createElement('h2');
    h2Error.textContent = message;
    document.querySelector(racine).appendChild(h2Error);
    console.log(err);
}
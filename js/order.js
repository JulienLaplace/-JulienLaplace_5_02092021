// Récupération de l'orderId

let params = new URL(document.location).searchParams;
let id = params.get("orderId");
console.log(id);

// Affichage du numéro de commande

document.getElementById("orderId").textContent = id;
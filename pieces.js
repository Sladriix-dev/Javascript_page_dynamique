// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-auto.json");
const pieces = await reponse.json();

// Création des éléments et remplissage du texte ou de la source de l'image

// Function qui génère toute la page web
function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    // Récupération de l'élément du DOM
    const sectionFiches = document.querySelector(".fiches");

    // Création d'une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    // Création de l'élément img
    const imageElement = document.createElement("img");

    // On accède à l'indice i de la liste pieces pour configurer la source de l'image
    imageElement.src = pieces[i].image;

    // On rattache l'image à pieceElement (balise article)
    pieceElement.appendChild(imageElement);

    // Idemn pour le name/prix/catégorie
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;
    pieceElement.appendChild(nomElement);

    const prixElement = document.createElement("p");
    prixElement.innerText = "Prix : " + pieces[i].prix + "€";
    pieceElement.appendChild(prixElement);

    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "(acune catégorie)";
    pieceElement.appendChild(categorieElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText =
      pieces[i].description ?? "Flemme de décrire connard";
    descriptionElement.setAttribute("class", "desc");
    pieceElement.appendChild(descriptionElement);

    const stockElement = document.createElement("p");
    stockElement.innerText = pieces[i].disponibilité
      ? "En stock"
      : "Rupture de stock";
    if (pieces[i].disponibilité) {
      stockElement.setAttribute("class", "inStock");
    } else {
      stockElement.setAttribute("class", "outOfStock");
    }
    pieceElement.appendChild(stockElement);

    // On rattache la balise article au body
    sectionFiches.appendChild(pieceElement);
  }
}

// Premier affichage de la plage
genererPieces(pieces);

// Listener du bouton pour trier par ordre croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  const piecesReordonnees = Array.from(pieces);
  piecesReordonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });

  // Effacement de l'écran et régénration de la plage
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesReordonnees);
});

// Listener du btn pour retirer les prix eleves
const boutonFilter = document.querySelector(".btn-filter");
boutonFilter.addEventListener("click", function () {
  const piecesFilter = pieces.filter(function (pieces) {
    return pieces.prix <= 35;
  });
  // Effacement de l'écran et régénration de la plage
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFilter);
});

// Listener pour filtrer les pieces sans description
const boutonFilterDescription = document.querySelector(".btn-desc-only");
boutonFilterDescription.addEventListener("click", function () {
  const piecesDesc = pieces.filter(function (pieces) {
    return pieces.description;
  });
  // Effacement de l'écran et régénration de la plage
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesDesc);
});

// Listener pour trier les prix par ordre decroissant
const boutonTrier2 = document.querySelector(".btn-decroissant");
boutonTrier2.addEventListener("click", function () {
  pieces.sort(function (a, b) {
    return b.prix - a.prix;
  });
  // Effacement de l'écran et régénration de la plage
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(pieces);
});

// Listener pour le filter des prix
const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function () {
    const piecesFiltrees = pieces.filter(function(piece) {
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

// Récupération du nom des pièces
const noms = pieces.map((piece) => piece.nom);

// Boucle for de la fin vers le début
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    noms.splice(i, 1);
  }
}

// Création de l'élément ul
const abordablesElement = document.createElement("ul");

// Création et rattachement des éléments li
for (let i = 0; i < noms.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText = noms[i];
  abordablesElement.appendChild(nomElement);
}

// Rattachement de toute la liste à la page
document.querySelector(".abordables").appendChild(abordablesElement);

// Résumé des pièces disponibles
const nomsDisponibles = pieces.map((piece) => piece.nom);
const prixDisponibles = pieces.map((piece) => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].disponibilité === false) {
    nomsDisponibles.splice(i, 1);
    prixDisponibles.splice(i, 1);
  }
}

const disponiblesElement = document.createElement("ul");

for (let i = 0; i < nomsDisponibles.length; i++) {
  const nomElement = document.createElement("li");
  nomElement.innerText =
    nomsDisponibles[i] + "  -  " + prixDisponibles[i] + "€";
  disponiblesElement.appendChild(nomElement);
}

document.querySelector(".disponibles").appendChild(disponiblesElement);

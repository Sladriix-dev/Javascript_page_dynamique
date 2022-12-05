// Function qui enregistre des event listener sur les boutons de la page
export function ajoutListenerAvis() {
	const piecesElements = document.querySelectorAll(".fiches article button");

	for (let i = 0; i < piecesElements.length; i++) {
		piecesElements[i].addEventListener("click", async function(event) {
            // Récup de la valeur de l'attribut data-id="XX"
			const id = event.target.dataset.id;

            //Attente de la réponse de l'API
			const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");

            // Reconstruction des données en mémoire depuis la réponse au format JSON
            const avis = await reponse.json();

            // Récupération de la balise article pour la pièce désirée
            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement, avis);
            
		});
	}
}

export function afficherAvis(pieceElement, avis) {
    // Création de la balise p pour regrouper les avis
    const avisElement = document.createElement("p");

    for (let i = 0; i < avis.length; i++) {
        avisElement.innerHTML += avis[i].utilisateur + ': ' + avis[i].commentaire + '<br>' + 'Note : ' + avis[i].nbEtoiles + '<br>';
    }
    pieceElement.appendChild(avisElement);
}

// Ajout d'un listener sur l'event submit
const formulaireAvis = document.querySelector(".formulaire-avis");
formulaireAvis.addEventListener("submit", function (event) {
    // Désactivation du comportement par défaut
    event.preventDefault();

    // Création de l'objet du nouvel avis
    const avis = {
        pieceId: event.target.querySelector("[name=piece-id]").value,
        utilisateur: event.target.querySelector("[name=utilisateur]").value,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles: event.target.querySelector("[name=nb-etoiles]").value,
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(avis);

    // Appel de la fonction fetch avec toutes les infos nécessaires
    fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
})
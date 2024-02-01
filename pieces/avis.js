export function ajoutListenersAvis() {
	const piecesElements = document.querySelectorAll(".fiches article button");

	for (let i = 0; i < piecesElements.length; i++) {
		piecesElements[i].addEventListener("click", async function (event) {
			const id = event.target.dataset.id;
			const avis = await fetch(`http://localhost:8081/pieces/${id}/avis`).then(avis => avis.json());

			const pieceElement = event.target.parentElement;

			const avisElement = document.createElement("p");
			for (let i = 0; i < avis.length; i++) {
				avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
			}
			if (pieceElement.childNodes.length == 8)
				pieceElement.childNodes[7].innerHTML = avisElement.innerHTML;
			else
				pieceElement.appendChild(avisElement);
		});
	}
}

export function listenerEnvoyerAvis () {
	const formulaireAvis = document.querySelector(".formulaire-avis");
	formulaireAvis.addEventListener("submit", function (event) {
		event.preventDefault();
		const avis = {
			pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
			utilisateur: event.target.querySelector("[name=utilisateur]").value,
			commentaire: event.target.querySelector("[name=commentaire]").value,
			nbEtoiles: event.target.querySelector("[name=nbEtoiles]").value,
		};
		fetch("http://localhost:8081/avis", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(avis)});
		event.target.querySelector("[name=piece-id]").value = "";
		event.target.querySelector("[name=utilisateur]").value = "";
		event.target.querySelector("[name=commentaire]").value = "";
		event.target.querySelector("[name=nbEtoiles]").value = "";
	});
}

export async function afficherGraphiqueAvis() {
	const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
	const nb_commentaires = [0, 0, 0, 0, 0];
	for (let commentaire of avis) {
		nb_commentaires[commentaire.nbEtoiles - 1]++;
	}

	const labels = ["5", "4", "3", "2", "1"];
	const data = {
		labels: labels,
		datasets: [{
			label: "Étoiles attribuées",
			data: nb_commentaires.reverse(),
			backgroundColor: "rgba(255, 230, 0, 1)",
		}],
	};
	const config = {
		type: "bar",
		data: data,
		options: {
			indexAxis: "y",
		},
	};
	const graphAvis = new Chart(document.querySelector("#graphique-avis"), config);
}

// export async function afficherGraphiqueAvis() {
//     // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
//     const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
//     const nb_commentaires = [0, 0, 0, 0, 0];

//     for (let commentaire of avis) {
//         nb_commentaires[commentaire.nbEtoiles - 1]++;
//     }
//     // Légende qui s'affichera sur la gauche à côté de la barre horizontale
//     const labels = ["5", "4", "3", "2", "1"];
//     // Données et personnalisation du graphique
//     const data = {
//         labels: labels,
//         datasets: [{
//             label: "Étoiles attribuées",
//             data: nb_commentaires.reverse(),
//             backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
//         }],
//     };
//     // Objet de configuration final
//     const config = {
//         type: "bar",
//         data: data,
//         options: {
//             indexAxis: "y",
//         },
//     };
//     // Rendu du graphique dans l'élément canvas
//     const graphiqueAvis = new Chart(
//         document.querySelector("#graphique-avis"),
//         config,
//     );
// }

// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("http://127.0.0.1:8081/pieces").then(pieces => pieces.json());
import { ajoutListenersAvis, listenerEnvoyerAvis, afficherGraphiqueAvis } from "./avis.js";

function piecesAbordables (pieces) {
	const nomsAborddables = pieces.map(piece => piece.nom);
	for (let i = pieces.length - 1; i >= 0; i--) {
		if (pieces[i].prix > 35) {
			nomsAborddables.splice(i, 1);
		}
	}
	const pElement = document.createElement("p");
	pElement.innerText = "Pièces abordables:";
	const abordablesElements = document.createElement("ul");
	for (let i = 0; i < nomsAborddables.length; i++) {
		const nomElement = document.createElement("li");
		nomElement.innerText = nomsAborddables[i];
		abordablesElements.appendChild(nomElement);
	}
	document.querySelector(".fiches").appendChild(pElement).appendChild(abordablesElements);
}

function piecesDisponibles(pieces) {
	const nomsDisponibles = pieces.map(piece => piece.nom);
	const prixDisponibles = pieces.map(piece => piece.prix);
	for (let i = pieces.length - 1; i >= 0; i--) {
		if (!pieces[i].disponibilite) {
			nomsDisponibles.splice(i, 1);
			prixDisponibles.splice(i, 1);
		}
	}
	const pElement = document.createElement("p");
	pElement.innerText = "Pièces disponibles:";
	const disponiblesElements = document.createElement("ul");
	for (let i = 0; i < nomsDisponibles.length; i++) {
		const nomElement = document.createElement("li");
		nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]}€`;
		disponiblesElements.appendChild(nomElement);
	}
	document.querySelector(".fiches").appendChild(pElement).appendChild(disponiblesElements);
}

function piecesGenerator(pieces) {
	piecesAbordables(pieces);
	piecesDisponibles(pieces);
	for (let i = 0; i < pieces.length; i++) {
		const sectionFiches = document.querySelector(".fiches");

		const pieceElement = document.createElement("article");
		const imageElement = document.createElement("img");
		imageElement.src = pieces[i].image;
		const nomElement = document.createElement("h2");
		nomElement.innerText = pieces[i].nom;
		const prixElement = document.createElement("p");
		prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
		const categorieElement = document.createElement("p");
		categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
		const descriptionElement = document.createElement("p");
		descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
		const stockElement = document.createElement("p");
		stockElement.innerText = pieces[i].disponibilite ? "En stock" : "Rupture de stock";
		const avisBouton = document.createElement("button");
		avisBouton.dataset.id = pieces[i].id;
		avisBouton.textContent = "Afficher les avis";

		// On rattache la balise article à la section Fiches
		pieceElement.appendChild(imageElement);
		pieceElement.appendChild(nomElement);
		pieceElement.appendChild(prixElement);
		pieceElement.appendChild(categorieElement);
		pieceElement.appendChild(descriptionElement);
		pieceElement.appendChild(stockElement);
		pieceElement.appendChild(avisBouton);
		sectionFiches.appendChild(pieceElement);
	}
	// Ajout de la fonction ajoutListenersAvis
	ajoutListenersAvis();
}

piecesGenerator(pieces);

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
	const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
	document.querySelector(".fiches").innerHTML = "";
	piecesGenerator(piecesOrdonnees);
});

const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function() {
	const piecesOrdonnees = Array.from(pieces);
	piecesOrdonnees.sort(function (a,b) {
		return (b.prix - a.prix);
	});
	document.querySelector(".fiches").innerHTML = "";
	piecesGenerator(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= 35;
	});
	document.querySelector(".fiches").innerHTML = "";
	piecesGenerator(piecesFiltrees);
});

const boutonNoDesc = document.querySelector(".btn-nodesc");
boutonNoDesc.addEventListener("click", function() {
	const piecesFiltrees = pieces.filter(function (piece) {
		return (piece.description);
	});
	document.querySelector(".fiches").innerHTML = "";
	piecesGenerator(piecesFiltrees);
});

listenerEnvoyerAvis();
await afficherGraphiqueAvis();

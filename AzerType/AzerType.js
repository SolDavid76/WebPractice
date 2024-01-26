const sentence = ["hello how are you?", "My name is djanusz!", "i'm learning JavaScript"];
const words = ["hello", "name", "learning", "djanusz", "JavaScript"];

function printStatus(score, size)
{
	document.getElementById("score").textContent = "You have " + score + " points over " + size + " questons";
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function verify(gess, input)
{
	if (gess === input)
		return (true);
	else
		return (false);
}

function gameLoop(gess)
{
	let score = 0;
	for (let i = 0; i < gess.length; i++)
	{
		document.getElementById("prompt").textContent = gess[i];
		if (input === gess[i])
		{
			score++;
			console.log("Nice");
		}
		else
			console.log("Absolute donkey");
	}
	return (score);
}

function validName(name)
{
	let regex = new RegExp("^[a-zA-Z]{2,}$");
	return (regex.test(name));
}

function validEmail(email)
{
	let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
	return (regex.test(email));
}

function gameRun()
{
	let score = 0;
	let i = 0;

	let input = document.getElementById("writingInput");
	let but = document.getElementById("buttonVerify");
	let test = document.querySelectorAll(".ChoiseZone input");
	test.forEach((radio, index) => {
		test[index].addEventListener("change", () => {
			if (radio.checked)
			{
				gess = (index === 0 ? words[i] : sentence[i]);
				document.getElementById("prompt").textContent = gess;
			}
		});
	});
	but.addEventListener("click", () => {
		console.log(input.value)
		if (input.value === gess)
			score++;
		i++;
		printStatus(score, i);
		input.value = "";
		if ((test[0].checked ? words[i] : sentence[i]) === undefined)
		{
			document.getElementById("prompt").textContent = "GAME IS FINISHED";
			but.disabled = true;
			let div = `
				<form>
					<br><br>
					<p> Partagez votre score </p>
					<!-- champ nom -->
					<label for="nom">Nom</label>
					<input type="text" id="nom" name="nom" placeholder="Votre nom">
					<!-- champ email -->
					<label for="email">Email</label>
					<input type="email" id="email" name="email" placeholder="Votre email">
					<!-- bouton de validation -->
					<button>Envoyer</button>
				</form>`
			document.querySelector("body").innerHTML += div;
			let form = document.querySelector('form');

			form.addEventListener("submit", (event) => {
				event.preventDefault();
				if (validName(document.getElementById("nom").value) && validEmail(document.getElementById("email").value))
					afficherEmail(document.getElementById("nom").value, document.getElementById("email").value, score);
				else
					console.log("ERROR");
			});
		}
		else
		{
			gess = (test[0].checked ? words[i] : sentence[i])
			document.getElementById("prompt").textContent = gess;
		}
	});
	printStatus(score, i);
}

gameRun();

// let choiseZone = document.querySelectorAll(".ChoiseZone input");
// console.log(choiseZone);

// let promptZone = document.querySelectorAll(".promptZone span");
// console.log(promptZone);

// let inputZone = document.querySelectorAll(".inputZone input, .inputZone button");
// console.log(inputZone);

// let imageZone = document.getElementById("premiereImage")
// console.log(imageZone)

// let title = "AzerType";
// let desciption = "L'application pour apprendre à taper plus vite !";

// let div = `
//     <div>
//         <h1>${title}</h1>
//         <p>${desciption}</p>
//     </div>
//     `;

// let body = document.querySelector("body");
// body.innerHTML += div;

// function askPrompt()
// {
// 	while (true)
// 	{
// 		let input = prompt("Do you want play with words or sentence ?");
// 		if (input === "words")
// 			return (true);
// 		else if (input === "sentence")
// 			return (false);
// 		else
// 			console.log("vas te faire foutre")
// 	}
// }

const sentence = ["hello how are you?", "My name is djanusz!", "i'm learning JavaScript"];
const words = ["hello", "name", "learning", "djanusz", "JavaScript"];

function printStatus(score, size)
{
	document.getElementById("score").textContent = "You have " + score + " points over " + size + " questons";
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
		if ((wordsChoise.checked ? words[i] : sentence[i]) === undefined)
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
			const form = document.querySelector('form');

			form.addEventListener("submit", (event) => { event.preventDefault(); });
		}
		else
		{
			gess = (wordsChoise.checked ? words[i] : sentence[i])
			document.getElementById("prompt").textContent = gess;
		}
	});
	printStatus(score, i);
}

gameRun();



// document.addEventListener('keypress', (event) => {
//     console.log(event.key);
// });

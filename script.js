const playerCard = [...document.querySelectorAll("div.player_card img")];
let computerCard = document.querySelector("div.computer_card img");
const btnCheck = document.querySelector("button.check");
const result = document.querySelector("div.results");
const win = document.querySelector("div.win span");
const defeat = document.querySelector("div.defeat span");

let valueOfCard = -1;
let computerCardSrc = computerCard.src;

const chooseCard = () => {
	//Adding Listener to all cards
	playerCard.forEach((card) => {
		card.addEventListener("click", (e) => {
			if (valueOfCard == -1) {
				//function that removes the class selection from all elements, and then adds that class to the selected element
				playerCard.forEach((card) => {
					card.classList.remove("choice");
				});
				e.target.classList.add("choice");
				valueOfCard = playerCard.findIndex((card) =>
					card.classList.contains("choice")
				);
			}
		});
	});
};

const showResult = () => {
	// function updating state score and shows result
	if (valueOfCard.toString() == computerCardSrc.id) {
		result.textContent = "You Win :)";
		result.classList.remove("hidden");
		win.textContent++;
	} else {
		result.textContent = "You Lost :(";
		result.classList.remove("hidden");
		defeat.textContent++;
	}
};

const resetGame = () => {
	if (btnCheck.textContent === "reset") {
		computerCardSrc.remove();
		playerCard.forEach((card) => {
			card.classList.remove("choice");
		});
		// reset valueOfCard to begining
		valueOfCard = -1;
		result.classList.add("hidden");
		result.textContent = "";
		btnCheck.textContent = "check";
	}
};

const startGame = () => {
	if (valueOfCard == -1) alert("Please chose Card :)");
	resetGame();
	//Draw card
	const drawComputerCard = Math.floor(Math.random() * playerCard.length);
	//Assigning the drawn card to the src computer card
	computerCardSrc = playerCard[drawComputerCard].cloneNode();
	//Removing the current computer card img
	if (valueOfCard != -1) {
		computerCard.remove();
		document
			.querySelector("div.computer_card")
			.appendChild(computerCardSrc);
		btnCheck.textContent = "reset";
		showResult();
	}
	if (document.querySelector("div.computer_card").childElementCount === 0) {
		document.querySelector("div.computer_card").appendChild(computerCard);
	}
};

chooseCard();
btnCheck.addEventListener("click", startGame);

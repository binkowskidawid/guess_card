const playerCard = [...document.querySelectorAll('div.player_card img')];
let computerCard = document.querySelector('div.computer_card img');
const btnCheck = document.querySelector('button.check');
const result = document.querySelector('div.results');
const win = document.querySelector('div.win span');
const defeat = document.querySelector('div.defeat span');

let valueOfCard = -1;
let computerCardSrc = computerCard.src

const chooseCard = () => {
    //dodanie nasłuchiwania na wszystkie karty
    playerCard.forEach(card => {
        card.addEventListener('click', (e) => {
            if (valueOfCard == -1) {
                //funkcja która najpierw usuwa wszystkim elementom klase choice a potem dodaje jednemu
                playerCard.forEach(card => {
                    card.classList.remove('choice');
                });
                e.target.classList.add('choice');
                valueOfCard = playerCard.findIndex(card =>
                    card.classList.contains('choice'));
            }
        })
    })
};

const showResult = () => {
    // funkcja aktualizująca stan wyników i pokazująca wynik
    if (valueOfCard.toString() == computerCardSrc.id) {
        result.classList.remove('hidden');
        win.textContent++;
    } else {
        result.textContent = 'You Lost :('
        result.classList.remove('hidden');
        defeat.textContent++;
    }
}

const resetGame = () => {
    if (btnCheck.textContent === 'reset') {
        computerCardSrc.remove();
        playerCard.forEach(card => {
            card.classList.remove('choice');
        });
        // reset valueOfCard to begin 
        valueOfCard = -1;
        // if (valueOfCard == -1) alert("Play again :)")
        result.classList.add('hidden');
        btnCheck.textContent = 'check';
    }
}

const startGame = () => {
    if (valueOfCard == -1) alert("Please chose Card :)")
    resetGame();
    //losowanie karty
    const drawComputerCard = Math.floor(Math.random() * playerCard.length);
    //przypisanie wylosowanej karty do src karty komputera
    computerCardSrc = playerCard[drawComputerCard].cloneNode();
    //usunuęcie obecnego img computera
    if (valueOfCard != -1) {
        computerCard.remove();
        document.querySelector('div.computer_card').appendChild(computerCardSrc);
        btnCheck.textContent = 'reset';
        showResult()
    }
    if (document.querySelector('div.computer_card').childElementCount === 0) {
        document.querySelector('div.computer_card').appendChild(computerCard);
    }
}

chooseCard();
btnCheck.addEventListener('click', startGame);
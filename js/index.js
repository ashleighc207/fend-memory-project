/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
let cardDeck = [...cards];
let clickedCards = [];
let gameBoard = document.querySelector('.deck');
let moves = 0;
let matches = 0;
let starOne = document.querySelector('.star-one');
let starTwo = document.querySelector('.star-two');
let starThree = document.querySelector('.star-three');	
let movesCounter = document.querySelector('.moves');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// reset game board when reset icon is clicked

function resetBoard(){
	let resetBtn = document.querySelector('.restart');
	moves = 0;
	resetBtn.addEventListener('click', newGame());
	movesCounter.innerHTML = `<span class="moves">${moves} Moves</span>`;

}

// check for match/no match when a card is clicked
// style accordingly

function cardClick(){
	this.classList.add('show', 'open');
	clickedCards.push(event.target);
	if(clickedCards.length === 2){
		moves++;
		if(moves === 1){
			movesCounter.innerHTML = `<span class="moves green">${moves} Move</span>`;
		} else if(moves >= 2 && moves <= 25) {
			movesCounter.innerHTML = `<span class="moves green">${moves} Moves</span>`;
		} else if(moves >= 26 && moves <= 35){
			movesCounter.innerHTML = `<span class="moves gold">${moves} Moves</span>`;
		} else {
			movesCounter.innerHTML = `<span class="moves red">${moves} Moves</span>`;
		}
		if(clickedCards[0].innerHTML === clickedCards[1].innerHTML){
			matching();
		} else {
			notMatching();
		}
	}
}

// reset and randomize cards for new game

function newGame() {
	const randomCards = shuffle(cardDeck);
	for(randomCard of randomCards){
		gameBoard.appendChild(randomCard);
		randomCard.classList.remove('open','show','match');
		randomCard.addEventListener('click', cardClick);
	}
	moves = 0;
	matches = 0;
}

newGame();

// determine how many stars should be visible

function addRating(num){
	if(num >= 7 && num <= 25){
		starOne.classList.remove('display-none');
		starTwo.classList.remove('display-none');
		starThree.classList.remove('display-none');
	} else if(num >= 26 && num <= 35){
		starOne.classList.remove('display-none');
		starTwo.classList.remove('display-none');
	} else if(num >= 36){
		starOne.classList.remove('display-none');
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// change styles to matching pair

function matching() {
	matches++;
	clickedCards[0].classList.remove('open', 'show');
	clickedCards[0].classList.add('match');
	event.target.classList.remove('open', 'show');
	event.target.classList.add('match');
	clickedCards = [];
}

// remove styles if not a matching pair

function notMatching() {
	setTimeout(function(){
		clickedCards[0].classList.remove('open', 'show');
		clickedCards[1].classList.remove('open', 'show');
		clickedCards = [];
	}, 500);
}

function winCheck() {
	addRating(moves);
}

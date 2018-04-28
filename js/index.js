/*
 * Create a list that holds all of your cards
 */
let cards = document.getElementsByClassName('card');
let cardDeck = [...cards];
let clickedCards = [];
let gameBoard = document.querySelector('.deck');
let moves = 0;
let matches = 0;
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
	resetBtn.addEventListener('click', newGame());
}

// check for match/no match when a card is clicked
// style accordingly

function cardClick(){
	this.classList.add('show', 'open');
	clickedCards.push(event.target);
	if(clickedCards.length === 2){
		moves++;
		if(clickedCards[0].innerHTML === clickedCards[1].innerHTML){
			matching();
		} else {
			notMatching();
		}
	}
}

// reset and randomize cards for new game

function newGame() {
	const randomCards = shuffle(cards);
	for(randomCard of randomCards){
		randomCard.classList.remove('open','show','match');
		randomCard.addEventListener('click', cardClick);
	}
	moves = 0;
	matches = 0;
}

newGame();

function matching() {
	matches++;
	clickedCards[0].classList.remove('open', 'show');
	clickedCards[0].classList.add('match');
	event.target.classList.remove('open', 'show');
	event.target.classList.add('match');
	clickedCards = [];
}

function notMatching() {
	setTimeout(function(){
		clickedCards[0].classList.remove('open', 'show');
		clickedCards[1].classList.remove('open', 'show');
		clickedCards = [];
	}, 500);
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




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
let popUp = document.querySelector('.pop-up-modal');
let timerContent = document.querySelector('.time');
let stars = [];
let time = 0;
let minutes = 0;
let seconds = 0;


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
	timerEnd();
	resetBtn.addEventListener('click', newGame());
	movesCounter.innerHTML = `<span class="moves">${moves} Moves</span>`;
	popUp.classList.add('display-none');

}

// check for match/no match when a card is clicked
// style accordingly

function cardClick(){
	this.classList.add('show', 'open');
	clickedCards.push(event.target);
	if(clickedCards.length === 2){
		moves++;
		if(moves === 1){
			timerStart();
			movesCounter.innerHTML = `<span class="moves green">${moves} Move</span>`;
		} else if(moves >= 2 && moves <= 20) {
			movesCounter.innerHTML = `<span class="moves green">${moves} Moves</span>`;
		} else if(moves >= 21 && moves <= 29){
			movesCounter.innerHTML = `<span class="moves gold">${moves} Moves</span>`;
		} else {
			movesCounter.innerHTML = `<span class="moves red">${moves} Moves</span>`;
		}
		if(clickedCards[0].innerHTML === clickedCards[1].innerHTML){
			matching();
			winCheck();
		} else {
			notMatching();
		}
	}
	checkRating(moves);
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
	stars.push(starOne.outerHTML + starTwo.outerHTML + starThree.outerHTML);
}

function checkRating(num){
	if(num >= 21 && num <= 25){
		starOne.classList.remove('fas', 'fa-star');
		starOne.classList.add('far', 'fa-star');
	} else if(num >= 26 && num <= 30){
		starTwo.classList.remove('fas', 'fa-star');
		starTwo.classList.add('far', 'fa-star');
	} else if(num >= 31){
		starThree.classList.remove('fas', 'fa-star');
		starThree.classList.add('far', 'fa-star');
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
	clickedCards[0].classList.add('match', 'pulse');
	event.target.classList.remove('open', 'show');
	event.target.classList.add('match', 'pulse');
	clickedCards = [];
}

// remove styles if not a matching pair

function notMatching() {
	setTimeout(function(){
		clickedCards[0].classList.remove('open', 'show');
		clickedCards[1].classList.remove('open', 'show');
		clickedCards = [];
	}, 600);

}

function popUpModal() {
	popUp.innerHTML = 
	`<h1 class="heading-one">Congratulations!</h1>
	<h4 class="heading-four">Your stats</h4>
	<p class="subhead">Moves:</p><p class="text-white">${moves}</p>
	<p class="subhead">Time:</p><p class="text-white">${minutes}&nbsp;:&nbsp;${seconds}</p>
	<p class="subhead">Rating:</p><p class="stars-modal text-white">${stars}</p>
	<p class="text-white">Would you like to play again?</p>
	<div class="restart" onclick="resetBoard()">
    <i class="fas fa-redo text-white"></i>
  </div>
	 `;
}


function timer() {
	seconds++;
	if(seconds === 60){
		minutes++;
		seconds = 0;
	}
	timerContent.innerHTML = `<span class="time">Time: ${minutes}&nbsp;:&nbsp;${seconds}</span>`;
}


function timerStart() {
	clearInterval(time);
	seconds = 0;
	minutes = 0;
	time = setInterval(timer, 1000);
}

function timerEnd() {
	clearInterval(time);
}


function winCheck() {
	if(matches === 8){
		timerEnd();
		addRating(moves);
		popUpModal();
		popUp.classList.remove('display-none');
	}
}

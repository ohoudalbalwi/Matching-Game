/* card array of elements to store the game cards */
let card = document.getElementsByClassName("card");
const cards = [...card];

/* moveCounter of game moves for player's performance */
let moveCounter = document.querySelector(".moves");

/* stars and starsList to store the player's stars */
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");

/* variable matchedCards for cards had been matched */
let matchedCards = document.getElementsByClassName("match");

var openedCards = [];

/**
* Shuffle function from http://stackoverflow.com/a/2450976
* It takes an array of elements and it randomly shuffles them
* giving back a new array with the same lenght of elements
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/* once the browser window loaded the start Of Game function is strat active */

document.body.onload = startOfGame();

function startOfGame() {

    suffelCard();
    closeDialog();

    // moves is set to 0
    moves = 0;
    moveCounter.innerHTML = moves;

    //timer is set to 0
    second = 0;
    minute = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins : 0 secs";
    stopTimer();

    // show all stars
    starsList.forEach(s => {
        s.style = "";
    });

}

function suffelCard() {
    //cards are shuffling for every game
    var Card = shuffle(cards);
    for (var i = 0; i < 16; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}

/*  moveCounting function is counting the number of moves until complet the game */
function moveCounting() {

    moves++;
    moveCounter.innerHTML = moves;
    if (moves > 14) {
        hideStar(starsList[2]);
        //starsGained = 3;
    }
    if (moves > 20) {
        hideStar(starsList[1]);
        //starsGained = 2;
    }

    function hideStar(starElement) {
        starElement.style.visibility = "hidden";
    }

}

/* Initialization of timer */
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

function setTimer() {
    second++;
    if (second == 60) {
        minute += 1;
        second = 0;
    }
    if (minute == 60) {
        hour += 1;
        minute = 0;
    }
    timer.innerHTML = minute + 'mins : ' + second + 'secs';
}

/* Start timer */
function startTimer() {

    interval = setInterval(setTimer, 1000);
}

/* Stop timer */
function stopTimer() {
    clearInterval(interval);
    interval = null;
}

/* Toggle for cards to display open Cards */
var showCards = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/*  Add the selected cards to open cards array by cardFlipped funcation , then check the cards if match or not match */
function cardFlipped() {
    if (interval == null) {
        startTimer();
    }
    openedCards.push(this);
    if (openedCards.length === 2) {
        moveCounting();
        const cardsMatch =
            openedCards[0].firstElementChild.classList[1] ===
            openedCards[1].firstElementChild.classList[1];
        cardsMatch ? matched() : notMathched();
    }
}


/* Matched function created when 2 cards are a match */
function matched() {

    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
    openedCards = [];

    const remainingUnOpenedCards = document.querySelectorAll(".card:not(.match)");
    if (remainingUnOpenedCards.length == 0) {

        openDialog();
    }
}


/* notMathched function created when 2 cards don't match */
function notMathched() {
    disabled();
    setTimeout(() => {
        openedCards[0].classList.remove('open', 'show', 'notMathched');
        openedCards[1].classList.remove('open', 'show', 'notMathched');
        openedCards = [];
        enable();
    }, 1000);
    openedCards[0].classList.add('notMathched');
    openedCards[1].classList.add('notMathched');
}


//cards are disabled temporarily
function disabled() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add("disabled");
    });
}


//cards are enabled and matched cards are disabled
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove("disabled");
        for (var i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add("disabled");
        }
    });
}


/* Popup  messages when all cards are opened and matched*/
function openDialog() {
    //let dialog = document.getElementById("dialogBox");

    let dialog = document.querySelector("#dialogBox");

    // update the score first
    document.querySelector("#move-record").innerText = moves;
    document.querySelector("#time-record").innerText = `${minute} mins : ${second} secs`;
    document.querySelector("#star-record").innerHTML = document.querySelector(".stars").innerHTML;
    dialog.showModal();

    stopTimer();
}


/* Close Dialog */
function closeDialog() {
    document.querySelector("#dialogBox").close();
}


/* Event listener is atached to cards to each card to interact with the player, the game rules */
document.querySelector("#playAgin").addEventListener("click", startOfGame);
document.querySelector("#cancel").addEventListener("click", closeDialog);

for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", showCards);
    card.addEventListener("click", cardFlipped);
};


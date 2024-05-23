const buttons = document.querySelectorAll(".memory-card");
let lockBoard = false;

var winning = 0;

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    
    checkForMatch();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkForMatch() {
    
    if (firstCard.dataset.check === secondCard.dataset.check) {
        disableCards();
        return;
    }
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    winning+=2;
    if(winning===24){
        setTimeout(()=>{
            document.location.href="../page4/page4win.html";
        }, 1000);
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
        resetBoard();
    }, 350);
}
buttons.forEach(buttons => {
    buttons.addEventListener("click", flipCard);
});


document.addEventListener("DOMContentLoaded", function() {
    shuffleImages();
});


function shuffleImages() {
    var grid = document.querySelector(".main-game"); // Select the grid container
    var images = Array.from(grid.getElementsByClassName("memory-card")); // Select all memory cards within the grid

    // Shuffle the array of images
    var shuffledImages = shuffleArray(images);

    // Remove all existing images from the grid
    images.forEach(function(image) {
        grid.removeChild(image);
    });

    // Append the shuffled images back to the grid in their new order
    shuffledImages.forEach(function(image) {
        grid.appendChild(image);
    });
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let hasFlippedCard = false;
let firstCard, secondCard;


//timer

var myVar = setInterval(function () { myTimer() }, 1000);
var secondlimit = 45;

function myTimer() {
    if (secondlimit == 0) {
        myStopFunction();
        redirectToDifferentPage(); 
    }

    document.getElementById("time").innerHTML = '<span class="text06">TIMER: 00:' + zeroPad(secondlimit, 2) + '</span>';
    secondlimit = secondlimit - 1;
}

function myStopFunction() {
    clearInterval(myVar);
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

function redirectToDifferentPage() {
  document.location.href = '../page4/page4lost.html'; 
}
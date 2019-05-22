// GAME Function
// Player must guess a num between min and max Number
// Player gets a certain amount of guesses
// Notify player of guesses remaining
// Notify the player of the correct answer if loose
// Let plyaer play again

// Get winning Number
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max-min+1) + min);
}

// Game values
let min = 1,
    max = 10,
    wininngNum = getRandomNum(min, max),
    guessesLeft = 3;



// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', (e) => {
  if (e.target.className === 'play-again'){
    window.location.reload();
  }
});

//guessGame
const guessGame = () => {
  let guess = parseInt(guessInput.value);
  
  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }

  //Check if guess is correct
  if (guess === wininngNum) {
    // Game over - won
    gameOver(true, `${wininngNum} is correct, YOU WIN!!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over lost
      gameOver(false, `GAME OVER!!, The correct number was ${wininngNum}`)
      
    } else {
      // Game continues - answer is wrong
      
      //change border color 
      guessInput.style.borderColor = 'red';

      // clear Input
      guessInput.value = '';
      setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, 'red');
    }
  }
}

// Game Over
const gameOver = (won, msg) => {
  let color;
  color = won === true ? 'green' : 'red';
  // Disable input
  guessInput.disable = true;

  // Change border color
  guessInput.style.borderColor = color;

  // Notify winner
  setMessage(msg, color);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// set message
const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
}

// Listen for guess
guessBtn.addEventListener('click', guessGame);

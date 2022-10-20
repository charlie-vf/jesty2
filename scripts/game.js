// JavaScript structure:
    // game { object }
    // newGame()
    // addTurn()
    // showTurns()
    // lightsOn()
    // playerTurn()
    // showScore()


// 3.
// Red, Green refactor process:
// we only want to add enough code to get test (2. in game.test.js) passing
// so add 0 for scores integer
// and add empty arrays for the other 3
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    // 5. 
    // add values to empty choices array so test passes
    // this is the game.choices key
    choices: ["button1", "button2", "button3", "button4"],
}

// remember to export & import new function
// 7.
function newGame() {
    game.score = 0;
    // 8. 
    // add matching code from tests in step 8
    game.currentGame = [];
    game.playerMoves = [];
    // ^^ at this stage, newGame resets everything, but doesn't start a new game
    // need to call showScore function - reset the score to zero on the DOM
    // and addTurn function - add a turn to our currently empty sequence
    // 11.
    showScore();
    // 13. 
    // add addTurn() call to newGame()
    addTurn();
}

// 10.
// gets the element with the ID of score and sets its inner text to game.score
function showScore() {
    document.getElementById("score").innerText = game.score;
}
// 11. 
// ^^ remember to add call to showScore at the end of the newGame function

// 14.
// addTurn needs to:
    // a) clear the playerMoves array because it's the start of a new turn
    // b) randomly select one of the choices from game.choices key & push that
    // into the computer sequence array
    // c) call showTurns function to display the sequence
function addTurn() {
    // a)
    game.playerMoves = [];
    // b)
    // use the math.random library to generate a random number between 
    // zero and three. 
    // We're going to use that as the index of our choices array and then the 
    // resulting choice is pushed onto the current game array.
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    // c)
    // showTurns();
}
// 14. 
// ^^ currentGame.length test now passes because newGame is clearing out
// our fake data from the currentGame array and then addTurn is pushing 
// a random choice. 




// at the end of game.js we'll add our module.exports = { }
// curly braces because we'll be exporting more than  
// one object and function from this file, so we need to put them in curly braces.
// and in game.test.js we'll import it at the top
module.exports = { game, newGame, showScore, addTurn };
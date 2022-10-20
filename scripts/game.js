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
}

// 10.
// gets the element with the ID of score and sets its inner text to game.score
function showScore() {
    document.getElementById("score").innerText = game.score;
}
// 11. 
// ^^ remember to add call to showScore at the end of the newGame function



// at the end of game.js we'll add our module.exports = { }
// curly braces because we'll be exporting more than  
// one object and function from this file, so we need to put them in curly braces.
// and in game.test.js we'll import it at the top
module.exports = { game, newGame, showScore };
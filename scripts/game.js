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
// test still won't pass because we haven't exported game 
// and imported it into our test file
// at the end of game.js we'll add our module.exports = { }
// curly braces because we'll be exporting more than  
// one object and function from this file, so we need to put them in curly braces.
// and in game.test.js we'll import it at the top



module.exports = { game };
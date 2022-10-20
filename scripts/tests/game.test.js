/**
* @jest-environment jsdom
*/
// install command needs to be:
// npm install --save-dev jest-environment-jsdom
// not just npm install --save-dev

const { game, newGame, showScore } = require("../game");

// 1.
// load the index.html file into Jests mock DOM
// this sets up the DOM before all other test are run
// it is important to set this up first in tests
beforeAll(() => {
    // install the fs library, which is part of node's default standard library
    let fs = require("fs");
    // read the index.html file with the utf-8 character set
    let fileContents = fs.readFileSync("index.html", "utf-8");
    // open document
    document.open();
    // write file contents to it
    document.write(fileContents);
    // close document
    document.close();
})
// ^^ this code will be the same for every HTML file you want to load into the DOM
// ^^ you just might need to change the file name

// Game structure plan:
// - create an object that will hold the game state:
        // the score,  
        // current game sequence,
        // player moves, 
        // choices
// right now, we just want it to contain the score, which will be an integer
// The current game sequence will be an array. The turns that the player has taken  
// will be an array and an array of available IDs for the circles.

// 2.
// First failing test to check if score key exists
// test if the game object contains a key called score, so expect score to be in game.
// at first, this fails as game is no defined in our game.js file
// then add rest of tests to start building main code
describe("game object contains correct key", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    // 4.
    // choices array should contain the IDs of the four buttons
    // this fails initially as we expected an array with four values but
    // receieved an empty array as we haven't added them to the game.js file
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

// 6.
    // newGame function should:
    // reset the score to zero,  
    // empty the computer sequence
    // empty the player's moves array
// new describe as separate from the game object
describe("newGame works correctly", () => {
    // use another beforeAll function, because we want to set up the game state 
    // with some fake values to see if the new game function resets the score.
    // it will fail at first as newGame is not defined
    beforeAll(() => {
        game.score = 42;
        // 9.
        // add some fake data to see if newGame clears it for tests in 8.
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        // 10.
        // add tests for showScore & addTurn functions
        // set  the score on the DOM to fake number 
        // so that we can see if it gets reset to zero by newGame. 
        document.getElementById("score").innerText = "42"
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    // 8.
    // test newGame resets currentGame & playerMoves arrays
    // check if the length of the arrays after newGame runs is 0
    // could use toEqual here, too
    test("should reset currentGame array", () => {
        expect(game.currentGame.length).toBe(0);
    });
    test("should reset playerMoves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    // 10.
    // this will fail at first, so we need to build the showScore function
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

/**
* @jest-environment jsdom
*/
// install command needs to be:
// npm install --save-dev jest-environment-jsdom
// not just npm install --save-dev

 const { game } = require("../game");

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

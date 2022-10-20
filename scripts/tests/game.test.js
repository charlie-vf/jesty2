/**
* @jest-environment jsdom
*/
// install command needs to be:
// npm install --save-dev jest-environment-jsdom
// not just npm install --save-dev

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

// 21.
// want to display an alert if the player gets it wrong
// the first argument to spyOn is the window and the second is the name of 
// the method, in this case "alert".
// The reason we're doing this is because alert is actually a method 
// of the window object. 
// So we're going to catch it when an alert happens and divert it 
// harmlessly into an empty function. 
jest.spyOn(window, "alert").mockImplementation(() => { })


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
    // 18.
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
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
        // 12.
        // remove this test as we are now building the addTurn function
        // which we expect to add a randomly selected button ID to the sequence
        // test("should clear the computer sequence array", () => {
        //     expect(game.currentGame.length).toBe(0);
        // });
        // 13. 
        // Instead of testing to  see if the currentGame sequence is empty,  
        // we need to check if it contains one element - which will be the 
        // new turn that we've just added.
        // this will fail at first because the array is empty
        // so we need to build the addTurn function
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear the playerMoves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    // 10.
    // this will fail at first, so we need to build the showScore function
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    // 19.
    // this test will fail until we attach the event listeners
    test("expect data-listener in index.html to be true", () => {
        // get all of the elements which have the class of circle,  
        // and that will be stored in the elements constant 
        const elements = document.getElementsByClassName("circle");
        // do a loop that will loop through each of these elements
        // as this is better than doing a test for each div
        for (let element of elements) {
            // expect that the attribute of that element, 
            // the data-listener attribute, is set to true.
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

// 15. 
// showTurns function and player clicks should cause the circle 
// to change colour or to light up. 
describe("gameplay works correctly", () => {
    // beforeAll runs before all tests
    // beforeEach runs before each test
    // so, we'll reset the state each time
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        // run addTurn function to add turn to currentGame array
        addTurn();
    });
    // afterEach:
    // Our tests are going to modify the game state, but we know that, 
    // following the RITE  principle our test should be isolated. That is,  
    // they should be able to be run in any order, so let's reset the state 
    // again after each test.
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    // since this is testing the gameplay, not just the new game function. Let's 
    // add in a test to make sure that addTurn works correctly
    // as we've reset the state and called addTurn in beforeEach, there should
    // be one element in the currentGame array
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    // this test fails at first because we haven't defined the lightsOn function
    test("should add correct class to light up buttons", () => {
        // get one of the IDs from my currentGame array,
        // and assign it to this variable called button.
        // we'll go for the first  element in the currentGame array,  
        // because we know there'll always be at least one element in there
        let button = document.getElementById(game.currentGame[0]);
        // then we'll call the lightsOn function, with that same ID. 
        lightsOn(game.currentGame[0]);
        // And now we can expect that our buttons class list 
        // should contain the light class
        expect(button.classList).toContain("light");
    });
    // 17. 
    // showTurns should:
        // a) step through the currentGame array
        // b) turn the light on
        // c) turn the light off
    // extend the game object and give it a turnNumber property 
    // that's updated as showTurns steps through the sequence.
    test("showTurns should update game.turnNumber", () => {
        // set game.turnNumber to 42 in the state
        game.turnNumber = 42;
        // call showTurns, which should reset the turnNumber
        showTurns();
        // check to see if turnNumber is now 0
        expect(game.turnNumber).toBe(0);
    });
    // 20.
    // playerTurn() should:
        // a) check if the player move matches the computer move
        // b) if we are at the end of the sequence then increment the score
        // and add another turn
        // c) if the moves do not match then display an alert and start a new game
    test("should increment the score if the turn is correct", () => {
        // in the beforeEach function for our gameplay, we're adding one turn.
        // So we're going to take that turn and we're going to push it into 
        // the playerMoves array before calling playerTurn. 
        // That way we know that we have a correct answer because the playerTurn  
        // and the computersTurn match each other.
        game.playerMoves.push(game.currentGame[0]);
        // call function
        playerTurn();
        // After calling playerTurn, we would then expect the score to have increased
        expect(game.score).toBe(1);
    });
    // 22. 
    // test for spy
    test("should call an alert if the move is wrong", () => {
        // instead of pushing the correct move into our playerMoves array,  
        // we're going to push a string that says "wrong".
        game.playerMoves.push("wrong");
        playerTurn();
        // When we call playerTurn we can then expect that our alert is going 
        // to be called.
        // Now notice here we're using a  new matcher to be called with,  
        // so because we're spying on our alert function, we can see when it's called  
        // and what parameters it's called with. So we're expecting an alert box to  
        // be called with the text "wrong move!" and an exclamation mark.
        expect(window.alert).toBeCalledWith("Wrong move!")
    });
});

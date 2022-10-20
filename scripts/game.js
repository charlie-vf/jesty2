// JavaScript structure:
    // game { object }
    // newGame()
    // addTurn()
    // showTurns()
    // lightsOn()
    // playerTurn()
    // showScore()
    // some way of detecting clicks


// 3.
// Red, Green refactor process:
// we only want to add enough code to get test (2. in game.test.js) passing
// so add 0 for scores integer
// and add empty arrays for the other 3
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    // 18.
    turnNumber: 0,
    // 28.
    lastButton: "",
    turnInProgress: false,
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

    // 19.
    // get all of our elements that have the class name of circle.
    for (let circle of document.getElementsByClassName("circle")) {
        // As we step through then, we're going to check the attribute of each 
        // circle and if the attribute is set to false, (aka not true) 
        // then we can go ahead and add our event listener.
        if (circle.getAttribute("data-listener") !== "true") {
            // this is a click event listener, & we're going to pass in the event 
            // object (e) as well
            circle.addEventListener("click", (e) => {
                // 23.
                // would be good to store the last button pressed in the game
                // state so that we can disable clicks during the computer's turn.
                // To do this, we're going to check if a circle is clicked
                // by setting a value that we're going to call lastButton.
                // And this will always store the ID of the last circle 
                // that was clicked.
                // if the currentGame array is greater than 0 we have a game in progress
                // 27. -- and not game in progress
                    // if game is in progress, click is disabled
                    // if game not in progress, click is allowed
                if (game.currentGame.length > 0 /* 27. */ && !game.turnInProgress) {
                    // 23. moved let move, lightsOn, game.player & playerTurn into
                    // new if statement
                    // 19. (e) allows us to get our click target's ID. 
                    // So depending on which circle, we click on the ID will be button1,  
                    // button2, button3, or button4.
                    // Store click target's ID in move
                    let move = e.target.getAttribute("id");
                    // 23.
                    // basically, this remembers the player's last move before the
                    // computer's current move, so if the player clicks again
                    // it doesn't change their previous move
                    game.lastButton = move;
                    // call function with parameter
                    lightsOn(move);
                    // push move into game.playerMoves array
                    game.playerMoves.push(move);
                    // then call playerTurn function
                    playerTurn();
                }
            });
            // after adding the event listener we can set the  
            // data listener attribute on our circle to true
            circle.setAttribute("data-listener", "true");
            // when you click New Game in the actual game
            // all the data-listeners in the html will change to true
        };
    };
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
    // this was commented out until step 17 was finished in game & game.test
    showTurns();
}
// 14. 
// ^^ currentGame.length test now passes because newGame is clearing out
// our fake data from the currentGame array and then addTurn is pushing 
// a random choice. 

// 16.
// call the lightsOn function with the ID of one of our circles,  
// so we're going to refer to this inside of the function as "circ".
function lightsOn(circ) {
    // get the element with the ID of the circle that we passed in 
    // and add the light class
    document.getElementById(circ).classList.add("light");
    // use JavaScript's set timeout function to remove this class after 400  
    // milliseconds
    // reversal  of what we did before. We're going to get our same element, 
    // the class list, but this time we'll remove the light class and then   
    // before the closing bracket we can add in our 400 milliseconds.
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
};

// 17.
function showTurns() {
    // 25. set to true as our turns have started
    game.turnInProgress = true;
    // set turnNumber to 0
    game.turnNumber = 0;
    // use that as the index number for our game.currentGame array
    // why are we setting this on the state? Why don't we just use a simple  
    // local variable here? 
    // Sometimes it's helpful to set this as state so that we can test it.  
    // it's good to think about what happens in our function as being kind of like a 
    // black box.  
    // We can test what goes in, we can test what comes out, but we don't have many 
    // ways of testing what's inside unless they're doing something to change or 
    // set the global state. 
    // So we're starting our global state in the game object, which is why we're 
    // using this as a counter.
    let turns = setInterval(() => {
        // calling the lightsOn function, inside a JavaScript set interval.  
        // Which just makes sure that we have a little pause between the 
        // lights being shown and the next step in the sequence.
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        // added an if statement inside here: if our turnNumber  
        // is equal or over the length of our current game array then, obviously,  
        // the sequence is finished so we can clear our interval.  
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            // 25. turn is now finished, so set to false
            game.turnInProgress = false;
        };
    }, 800);
};
// ^^ in summary, showTurns is:
    // setting this interval 
    // turning the lights on with lightsOn function,  
    // incrementing the game.turnNumber,
    // and then turning the lights off again.

// 18.
// so, we added a new key & value to our global state by creating turnNumber 
// in the showTurns function. 
// So really we should add it to the global state too, 
// as a default key with the value of zero
// and add a test to see if the turnNumber key exists

// 20.
function playerTurn() {
    // is get the index  of the last element from our playerMoves array.  
    // Because what we're going to do is compare that with the same index 
    // in the current game array
    let i = game.playerMoves.length - 1;
    // if our player gets the answers correct then these two should match.
    if (game.currentGame[i] === game.playerMoves[i]) {
        // if the length of  our current game array is equal to the length  
        // of our player moves, then we must be at the end of the sequence 
        // and the player got them all correct.
        if (game.currentGame.length == game.playerMoves.length) {
            // so we can increment the score and add a new turn.
            game.score++;
            showScore();
            addTurn();
        }
    } // 22.
        else {
            alert("Wrong move!");
            newGame();
        }
}


// at the end of game.js we'll add our module.exports = { }
// curly braces because we'll be exporting more than  
// one object and function from this file, so we need to put them in curly braces.
// and in game.test.js we'll import it at the top
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };
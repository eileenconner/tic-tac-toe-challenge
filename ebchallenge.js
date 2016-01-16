
// initialize board and player
var gameBoard = [null, null, null, null, null, null, null, null, null];
var player = "X";

// winning combinations by index of gameBoard
var winConditions = [[0, 1, 2],
                     [3, 4, 5],
                     [6, 7, 8],
                     [0, 3, 6],
                     [1, 4, 7],
                     [2, 5, 8],
                     [0, 4, 8],
                     [6, 4, 2]];

// keep track of state of game
var gameOver = false;


function initializeGame() {
    // reset board and start new game
    for (var i = 0; i < gameBoard.length; i++) {
        // set values of all squares on board to null
        gameBoard[i] = null;
        // give each table cell text value of space
        $('#square' + i).text(' ');
        // make every square on board clickable
        $('#square' + i).on('click', clickBoard);
    }

    // set gameOver to false
    gameOver = false;
    
    // set player variable to default 
    player = "X";

    // set turn notification message
    $("#turn-message").text("Your move, player " + player);

    // set win game text notification
    $("#end-game-message").text(" ");

    // make start game button unclickable
    $("#start-game").text("Game in progress").off("click");

}

    
function clickBoard(event) {
    // event handler for clicks on squares

    // get element clicked and indexs of that element
    var element = $(event.target);
    var elementIndex = element.attr('id').slice(-1);

    // assign value of ganeBoard at this index to player variable value
    gameBoard[elementIndex] = player;
    // display newly assigned value in appropriate square
    element.text(player);
    // make square unclickable
    element.off('click');

    // determine whether game is over
    isGameOver();

    // call switchPlayer() to switch value of player variable 
    if (gameOver === false) {
        switchPlayer();
    }

}


function switchPlayer() {
    // switch player. To be called at end of turn
    if (player === "X") {
        player = "O";
    } else {
        player = "X";
    }
    // set turn notification message
    $("#turn-message").text("Your move, player " + player);
}


function isGameOver() {
    // check if game is over, declare winner or tie if so, and continue game if not

    // check if gameBoard at index of each item in each combo in winConditions === player
    for (var k = 0; k < 8; k++) {
        if (gameBoard[winConditions[k][0]] === player &&
            gameBoard[winConditions[k][1]] === player &&
            gameBoard[winConditions[k][2]] === player) {
            // if so, player wins
            $("#end-game-message").text(player + " wins!");
            endGame();
        }
    }
      
    // check if board is full & declare tie/end game if so
    var boardCount = 0;
    for (var j = 0; j < 9; j++) {
        if (gameBoard[j] !== null) {
            boardCount++;
            continue;
        }
    }
    if (boardCount > 8) {
        //if no square on board is null, call game over with tie
        $("#end-game-message").text("It's a tie!");
        endGame();
    }

}


function endGame() {
    // end game and set up for potential next game

    // set gameOver to true
    gameOver = true;

    // reset turn notification to nothing
    $("#turn-message").text(" ");

    // make entire board unclickable
    $(".board").off("click");

    // add play again button -> calls initializeGame() 
    $("#start-game").text("Play again").on("click", initializeGame);

}


// start game button
$("#start-game").on("click", initializeGame);




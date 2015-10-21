var userPoint = 0;
var aiPoint = 0;

// This function returns the selection of the computer
function getAISelection() {
    //TODO: randomly choose between 'rock', 'paper', or 'scissors'
    var options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random()*3)];
}

// This function picks the winner
function pickWinner(userValue, aiValue) {
    //TODO: pick the correct winner: user or ai
    //TODO: Add one point for the winner
    var counters = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (userValue === aiValue) {
        return 'draw';
    } else if (counters[userValue] === aiValue) {
        userPoint++;
        return 'user';
    } else if (counters[aiValue] === userValue) {
        aiPoint++;
        return 'ai';
    }
}

// This function sets the scoreboard with the correct points
function setScore() {
    $('#userPoint').text(userPoint);
    $('#aiPoint').text(aiPoint);
}

// This function captures the click and picks the winner
function evaluate(evt) {
    var userValue = evt.target.getAttribute('id');
    var aiValue = getAISelection();

    var winner = pickWinner(userValue, aiValue);
    setScore();

    if ( 'user' === winner ) {
        $('#message').delay(50).text('You have won!, Click a box to play again');
    } else if ( winner === 'draw' ) {
        $('#message').delay(50).text('Draw! Click a box to play again');
    } else {
        $('#message').delay(50).text('You have lost!, Click a box to play again');
    }
}

// This function runs on page load
$(document).ready(function(){
    setScore();
    $('.token').click(evaluate);
});

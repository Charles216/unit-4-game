// Define the variables of the game (create an object to reference)...
var gamePlay = {
    target: 0,
    blingValues: [],
    minTargetValue: 19,
    maxTargetValue: 120,
    minBlingValue: 0,
    maxBlingValue: 13,
    numBling: 4,
    currentScore: 0,
    isPlayerWon: false,
    wins: 0,
    losses: 0,
    isGameEnded: false,


    //create the game reset...   
    reset: function () {

        //generates a random number between the min-max we assigned above...
        this.target = Math.floor(Math.random() * (this.maxTargetValue - this.minTargetValue) + 1) + this.minTargetValue;
        this.createBlingValues();
        this.currentScore = 0;
        this.isPlayerWon = false;
    },

    // Choose a random number between the min and max we established...
    createBlingValues() {

        //create a variable name for the array
        var blingWorth = [];

        //create a for loop loops through our min and max values - established in gameplay. 
        for (var index = this.minBlingValue; index < this.maxBlingValue + 1; index++) {
            blingWorth[index - 1] = index;
        }

        // Create a value for each bling...
        for (var index = 0; index < this.numBling; index++) {

            //pick a random number between the min and max we set up...
            var i = Math.floor(Math.random() * blingWorth.length);

            //Assign this value to the bling...
            this.blingValues[index] = blingWorth[i];

            //Now we need to pull this number out of the array so that it doesnt get implmented twice,                   we use the splice method to accomplish this...
            blingWorth.splice(i, 1);
            console.log(this.blingValues);
        }
    },

    //___________Game Play functions__________________
    //return a true if the game has ended if not, then false should be the returned value...
    clickBling: function (blingIndex) {


        //add bling value to score...
        this.currentScore += this.blingValues[blingIndex];
        console.log(this.currentScore);

        //if the score is greater than the target value...
        if (this.currentScore > this.target) {


            //set the player flag to false...
            this.isPlayerWon = false;
            this.losses++;


            //return a true flag to acknowledge the game is over...
            return true; //game over...


        } else if (this.currentScore === this.target) {

            //set the player flag to true...
            this.isPlayerWon = true;
            this.wins++;


            //return true to indicate the game has ended...
            return true; //game has ended...


        } else {//the score is less than the target...


            return false; //game hasn't reached an end point yet...
        }
    }

}

//__________________________________________________________
// Set variables for scoring and flag for end game...


//Make the buttons click and score...
$(document).ready(function () {

    //Smurf button...
    gamePlay.reset();
    $("#smurf1").click(function () {
        gamePlay.clickBling(0);
        updateScoreBox();
        //Check your work...
        console.log("Smurf was clicked");
    });

    //pikachu button...
    $("#pikachu2").click(function () {
        gamePlay.clickBling(1);
        updateScoreBox();
        //Check your work...
        console.log("Pikachu was clicked");
    });

    //Snoopy button...
    $("#snoopy3").click(function () {
        gamePlay.clickBling(2);
        updateScoreBox();
        //Check your work...
        console.log("Snoopy was clicked");
    });


    $("#goku4").click(function () {
        gamePlay.clickBling(3);
        updateScoreBox();
        //check your work...
        console.log("Goku goes Super Sayian!");
    });

    updateScoreBox();
});

function clickBling(blingCount) {
    gamePlay.isGameEnded = gamePlay.clickBling(blingCount);
    if (gamePlay.isGameEnded) {
        updateScoreBox();//update the score box
        gamePlay.reset();//Start a new game
        gamePlay.isGameEnded = false;
    }
    updateScoreBox();
}

function updateScoreBox() {
    if (gamePlay.isGameEnded) {
        if (gamePlay.isPlayerWon) {
            $('#Result').text("Nice Job Player 1 - You Won!!!");
        } else {
            $('#Result').text("Sorry Player 1 - You Lost!!!");
        }
    }


    //Write to html using jQuery
    $('#score').text(gamePlay.target);
    $('#wins').text(gamePlay.wins);
    $('#losses').text(gamePlay.losses);
    $('#currentScore').text(gamePlay.currentScore);

}
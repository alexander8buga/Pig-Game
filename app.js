/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, dice, activePlayer, gamePlaying, previousValueOfDice;

init();


// event listener using anonymous function for the Roll-Dice Button 
document.querySelector('.btn-roll').addEventListener('click',function() {
    if (gamePlaying){
        console.log('roll btn got pressed!');
        
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        console.log("previousValueOfDice: " + previousValueOfDice);
        console.log("dice is : " + dice);
        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //3. Update the round score If the rolled was not 1
        if (dice !== 1 && (dice !== 6 || previousValueOfDice !== 6)){
            // Add score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
             // set the previousValueOfDice to the current value
            if (previousValueOfDice  == 0 && dice == 6)
                previousValueOfDice = dice;
            
        } else {
            //Next player
            previousValueOfDice = 0;
            nextPlayer();
        } 
    }

})

//event listener for the Hold Button
document.querySelector('.btn-hold').addEventListener('click', function(){

    if (gamePlaying){
        console.log('btn hold on got pressed');
        // 1. add CURRENT SCORE to global
        activePlayer === 0 ? scores[0] += roundScore : scores[1] += roundScore;
    
    
        // 2. update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //3. Check if the player won
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';  
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); 
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
            gamePlaying = false;
        } else {
            nextPlayer();
    
        }
    }    
});

function nextPlayer() {
    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
    // Use of turnary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';  
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);



function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dice = Math.floor(Math.random() * 6) + 1;
    gamePlaying = true;
    previousValueOfDice = 0;

    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';

    document.querySelector('.player-0-panel').classList.remove('winner'); 
    document.querySelector('.player-1-panel').classList.remove('winner'); 
    document.querySelector('.player-0-panel').classList.remove('active'); 
    document.querySelector('.player-1-panel').classList.remove('active'); 

    document.querySelector('.player-0-panel').classList.add('active'); 
    
}
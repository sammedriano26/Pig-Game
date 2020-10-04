let globalScore, currentScore, previousRoll, diceRoll, activePlayer, inGame;

init();


// Event Listeners
// Roll button event listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(inGame) {
        // Dice 1
        let dice1 = Math.floor(Math.random() * 6) + 1;
        const diceImg = document.querySelector('.dice1');
        diceImg.style.display = 'block';
        diceImg.src = 'img/dice-' + dice1 + '.png';


        // Dice 2
        let dice2 = Math.floor(Math.random() * 6) + 1;
        const diceImgTwo = document.querySelector('.dice2');
        diceImgTwo.style.display = 'block';
        diceImgTwo.src = 'img/dice-' + dice2 + '.png';

        diceRoll = dice1 + dice2;

        document.getElementById('winning-score').style.display = 'none';


        if (diceRoll === 6 && previousRoll === 6) {

            globalScore[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = globalScore[activePlayer];

            alert('You rolled 6 twice.');

            switchPlayer();
        } else if(diceRoll === 12) {
            alert('You hit the jackpot!  You rolled 6 on both dice.');
            globalScore[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = globalScore[activePlayer];

            switchPlayer();
        } else if(dice1 !== 1 && dice2 !== 1) {

                currentScore += diceRoll;
                document.getElementById('current-' + activePlayer).textContent = currentScore;

                console.log(`The Active player: ${activePlayer}`);
                console.log(`Previous Roll: ${previousRoll}`);
                console.log(`Dice Roll: ${diceRoll}`);

            } else {
            switchPlayer(); 
        };

        // Each time the active player rolls the dice, the dice value shall be saved to the previousRoll variable.
        previousRoll = diceRoll;
    };
});


// Button hold event listener
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(inGame) {
        globalScore[activePlayer] += currentScore;
    
        document.getElementById('score-' + activePlayer).textContent = globalScore[activePlayer];

        let input = document.getElementById('winning-score').value;
        let setNewScore;

        if(input) {
            setNewScore = input;
        }  else {
            setNewScore = 100;
        }
    
        if (globalScore[activePlayer] >= setNewScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
    
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
    
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    
            inGame = false;

            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
    
            } else {
                switchPlayer();

                document.querySelector('.dice1').style.display = 'none';
                document.querySelector('.dice2').style.display = 'none';
        };
    }
});

// New game event listener
document.querySelector('.btn-new').addEventListener('click', init);

// Modal Event listener
document.querySelector('.btn-close').addEventListener('click', function() {
    document.querySelector('.modal').style.transform = 'scale(0)';
});

document.querySelector('.btn-rules').addEventListener('click', function() {
    document.querySelector('.modal').style.transform = 'scale(1)';
    document.querySelector('.modal').style.display = 'block';
});


//function
function init() {
    globalScore = [0,0];
    previousRoll = [0,0];
    currentScore = 0;
    activePlayer = 0;
    inGame = true;

    document.getElementById('winning-score').style.display = 'block';
    document.getElementById('winning-score').value = '';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.modal').style.transform = 'scale(0)';
};

function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
};
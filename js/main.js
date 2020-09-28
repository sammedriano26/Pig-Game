let globalScore, currentScore, activePlayer, inGame;

init();


// Event Listeners
// Roll button event listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(inGame) {
        let diceValue = Math.floor(Math.random() * 6) + 1;
    
        const diceImg = document.querySelector('.dice');
        diceImg.style.display = 'block';
        diceImg.src = 'img/dice-' + diceValue + '.png';

        if(diceValue !== 1) {
            currentScore += diceValue;
            document.getElementById('current-' + activePlayer).textContent = currentScore;
    
        } else {
            switchPlayer();
        };
    };
});


// Button hold event listener
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(inGame) {
        globalScore[activePlayer] += currentScore;
    
        document.getElementById('score-' + activePlayer).textContent = globalScore[activePlayer];
    
        if (globalScore[activePlayer] >= 10) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
    
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
    
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    
            inGame = false;

            document.querySelector('.dice').style.display = 'none';
    
            } else {
                switchPlayer();
        };
    }
});

// New game event listener
document.querySelector('.btn-new').addEventListener('click', init);

// Modal Event listener
document.querySelector('.btn-close').addEventListener('click', function() {
    document.querySelector('.modal').style.transform = 'scale(0)';
});


//function
function init() {
    globalScore = [0,0];
    currentScore = 0;
    activePlayer = 0;
    inGame = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.modal').style.transform = 'scale(1)';
};

function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
};

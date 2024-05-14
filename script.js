'use strict';
//Selecting elements
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

let scores=[0, 0],currentScore,activePlayer,playing;
  
const init= function() {
//starting condition
    activePlayer = 0;
    currentScore = 0;
    scores=[0, 0];
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    
    current0.textContent = 0;
    current1.textContent = 0;
    
    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

     init();

const switchPLayer = function(){
    document.getElementById(`current--${activePlayer}`)
    .textContent = 0;
    currentScore = 0;
    activePlayer= activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//Rolling dice
        btnRoll.addEventListener('click', function(){
                if(playing)
        {
            //1.Generate a random dice roll
                const dice = Math.trunc(Math.random() * 6) + 1
            //2.Display dice
                diceEl.classList.remove('hidden');
                diceEl.src = `dice-${dice}.png`;
            //3.Check if the dice was 1

            if(dice !== 1) 
            {
                    //add dice to current score
                currentScore += dice ;
                document.getElementById(`current--${activePlayer}`)
                .textContent = currentScore;
            }
                else
                 {
                    //switch to next player
                    switchPLayer();
                }
            }
 });
 btnHold.addEventListener('click', function() {
    //1.Add Current score to active player
        if(playing)
        {
            scores[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent 
            = scores[activePlayer];

            //2.check if player score is 100?

         if(scores[activePlayer] >= 100){

            //3.finish game

            playing=false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');

            }else {
                    //4.switch player
                    switchPLayer();
                }
        }
 });


 btnNew.addEventListener('click', init);


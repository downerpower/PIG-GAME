'use strict';

const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const currentScoreOneEl = document.querySelector('#current--0');
const currentScoreTwoEl = document.querySelector('#current--1');

const scoreZeroEl = document.querySelector('#score--0');
const scoreOneEl = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const buttonList = document.querySelector('.buttons');
const buttonClose = document.querySelector('.btn--close');

let scores, currentScore, activePlayer, playing;

const switchPlayer = () => {
   document.querySelector(`#current--${activePlayer}`).textContent = 0;
   currentScore = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   playerOne.classList.toggle('player--active');
   playerTwo.classList.toggle('player--active');
}

const initNewGame = () => {
   scores = [0, 0];
   currentScore = 0; 
   activePlayer = 0;
   playing = true;

   currentScoreOneEl.textContent = 0;
   currentScoreTwoEl.textContent = 0;
   scoreZeroEl.textContent = 0;
   scoreOneEl.textContent = 0;

   playerOne.classList.remove('player--winner');
   playerTwo.classList.remove('player--winner');
   playerOne.classList.add('player--active');
   playerTwo.classList.remove('player--active');
   diceEl.classList.add('hidden');
}

const rollDice = () => {
   if(playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;
      diceEl.classList.remove('hidden');
      diceEl.src = `img/dice-${dice}.png`
    
      if(dice === 1) {
       switchPlayer();
      } else {
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    
      }
   }
}

const holdScore = () => {
   if (playing) {
      scores[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    
      if (scores[activePlayer] >= 100) {
       playing = false;
       diceEl.classList.add('hidden');
       document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
       document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      }
          switchPlayer();
   }
}

initNewGame();

const closeGameRules = () => {
   buttonClose.addEventListener('click', () => {
      document.querySelector('.game-rules').classList.add('hidden');
   })
}

const bindButtonClicks = () => {
   buttonList.addEventListener('click', (evt) => {
      const button = evt.target.closest('.btn');
      if (button) {
         switch (button.id) {
            case 'btn--new':
               initNewGame();
               break;
            case 'btn--roll':
               rollDice();
               break;
            case 'btn--hold':
               holdScore();
               break;
         }
      }
   })
}

bindButtonClicks();
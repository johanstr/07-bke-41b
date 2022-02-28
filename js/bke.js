/***************************************************
 *  Boter-Kaas-Eieren
 *  ------------------------------------------------
 *  Versie:     2022
 **************************************************/

/*
    CONSTANTEN
*/


/*
    VARIABELEN
*/
let play_fields = document.querySelectorAll('.game-board img');
let game_button = document.querySelector('.game-button');
let element_timer = document.querySelector('.timer');
let element_turn_image = document.querySelector('.player-info__identifier img');
let element_turn_playernumber = document.querySelector('.player-info__number');
let element_score_player1 = document.querySelector('#player1-score');
let element_score_player2 = document.querySelector('#player2-score');
let element_round = document.querySelector('.round-info__number');

/*
    INITIALISATIE
*/
window.onload = function () {
    game_button.addEventListener('click', buttonClickHandler);
    play_fields.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    } )
};

/*
    MAIN FUNCTIONS
*/
function buttonClickHandler(event)
{
    console.log(event);
}


function cellClickHandler(event)
{
    console.log('Cell clicked');
}
/*
    HELPER FUNCTIONS
*/

/***************************************************
 *  MODULE 07 - JavaScript & Games
 *  
 *  Boter-Kaas-Eieren
 *  ------------------------------------------------
 *  Versie:     2022
 **************************************************/

/*=====================================================================================
    CONSTANTEN
    ----------
    Hieronder plaatsen we variabelen waarvan we de waarde in ons programma niet zullen
    veranderen. Constanten gebruiken we ook om met duidelijke variabele namen onze code
    meer leesbaar te houden.
=====================================================================================*/



/*=====================================================================================
    VARIABELEN
    ----------
    De globale variabelen van ons programma. Ze zijn globaal gemaakt omdat we ze overal
    in onze code willen kunnen gebruiken
=====================================================================================*/
let play_fields = document.querySelectorAll('.game-board img');
let game_button = document.querySelector('.game-button');
let element_timer = document.querySelector('.timer');                               // 1s, 2s
let element_turn_image = document.querySelector('.player-info__identifier img');
let element_turn_playernumber = document.querySelector('.player-info__number');
let element_score_player1 = document.querySelector('#player1-score');
let element_score_player2 = document.querySelector('#player2-score');
let element_round = document.querySelector('.round-info__number');

let round = 0;                              // Hulpvariabele
let current_player = 0;                     // Spelernummer die aan de beurt is
let round_time_in_seconds = 0;
let timerID = 0;


/*====================================================================================
    INITIALISATIE
    -------------
    Initialiseren betekent zoveel als het uitvoeren van acties om je programma
    klaar te maken voor gebruik. Sommige dingen moeten we eerst uitvoeren omdat
    anders ons programma niet of niet goed gaat werken namelijk.
====================================================================================*/
window.onload = function () {
    game_button.addEventListener('click', buttonClickHandler);
    play_fields.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    } )
};


/*===================================================================================
    MAIN FUNCTIONS
    --------------
    Main Functions zijn in ons geval en voor dit project de functies waarmee in feite
    het spel gespeeld gaat worden.
===================================================================================*/

/**
 * buttonClickHandler
 * ------------------
 * 
 * De main function die op twee manieren kan reageren op het klikken op de button in 
 * de game.
 * 
 * @param {object} event    event is een parameter van de functie die gevuld wordt
 *                          door de browser met alle informatie omtrent het event.
 */
function buttonClickHandler(event)
{
    if(event.target.innerHTML === 'Start ronde') {

        round++;
        element_round.innerHTML = round;

        event.target.innerHTML = 'Stop ronde';

        current_player = Math.floor((Math.random() * 2) + 1);
        element_turn_playernumber.innerHTML = current_player;
        if(current_player === 1)
            element_turn_image.src = 'img/circle.png';
        else
            element_turn_image.src = 'img/cross.png';

        timerID = setInterval(gameTimer, 1000);

    
        // 5. Alle cellen klikbaar maken
    
        // 6. Speelveld leegmaken

    } else {
        // Onderstaande alleen uitvoeren wanneer de tekst 'Stop ronde' op de knop staat
        // 1. Speelveld leegmaken
    
        // 2. Timer stoppen
        clearInterval(timerID);

        // 3. Cellen onklikbaar maken
    
        // 4. Knoptekst veranderen in 'Start ronde'

    }

}


/**
 * cellClickHandler
 * ----------------
 * 
 * Dit is de functie die reageert op een klik op een cel op ons speelbord. In deze
 * functie plaatsen we alle specifiek uit te voeren acties bij zo'n event.
 * We hebben voor 9 cellen op ons speelbord echter slechts 1 functie. Deze functie
 * moet dus zelf nog wel achterhalen op welke van de 9 cellen is geklikt.
 * 
 * @param {object} event    event is een parameter van de functie die gevuld wordt
 *                          door de browser met alle informatie omtrent het event.
 */
function cellClickHandler(event)
{
    console.log('Cell clicked');
}



/*==================================================================================
    HELPER FUNCTIONS
    ----------------
    Helper functions zijn functies die de main functions ondersteunen in het
    uitvoeren van hun taak. Helper functions worden zo geprogrammeerd dat ze zich
    altijd en uitsluitend op 1 taak richten. Maar door die taak in een helper
    function te plaatsen hebben we de code voor die taak op 1 plaats staan en 
    kunnen we deze code op meerdere plaatsen in ons programma hergebruiken.
===================================================================================*/

function gameTimer()
{
    round_time_in_seconds++;
    element_timer.innerHTML = round_time_in_seconds + 's';
}

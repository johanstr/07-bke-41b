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

        // Rondenummer ophogen met 1
        round++;
        // Rondenummer tonen in de UI
        element_round.innerHTML = round;

        // Tekst op de button aanpassen
        event.target.innerHTML = 'Stop ronde';

        current_player = Math.floor((Math.random() * 2) + 1);
        element_turn_playernumber.innerHTML = current_player;
        if(current_player === 1)
            element_turn_image.src = 'img/circle.png';
        else
            element_turn_image.src = 'img/cross.png';

        timerID = setInterval(gameTimer, 1000);

        play_fields.forEach(cell => {
            cell.addEventListener('click', cellClickHandler);
            cell.src = 'img/empty.jpg';
        });

    } else {
        // Onderstaande alleen uitvoeren wanneer de tekst 'Stop ronde' op de knop staat
        // 1. Speelveld leegmaken
        play_fields.forEach(cell => {
            cell.src = 'img/empty.jpg';
        });

        // 2. Timer stoppen
        clearInterval(timerID);

        // 3. Cellen onklikbaar maken
        play_fields.forEach(cell => {
            cell.removeEventListener('click', cellClickHandler);  
        });
    
        // 4. Knoptekst veranderen in 'Start ronde'
        event.target.innerHTML = 'Start ronde';
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
    // 1. Symbool van de speler in de cel tonen
    if (current_player === 1)
        event.target.src = 'img/circle.png';
    else
        event.target.src = 'img/cross.png';
    
    // 2. De cel onklikbaar maken
    event.target.removeEventListener('click', cellClickHandler);

    // 3. Beurt wisselen
    // if (current_player === 1)
    //     current_player = 2;
    // else
    //     current_player = 1;
    
    // De onderstaande constructie is hetzelfde als de IF-statement hierboven
    current_player = (current_player === 1 ? 2 : 1);

    // 4. Beurt tonen
    element_turn_playernumber.innerHTML = current_player;
    if(current_player === 1)
        element_turn_image.src = 'img/circle.png';
    else
        element_turn_image.src = 'img/cross.png';

    // 5a. Controleren of een speler gewonnen heeft
    // console.log(event.target.src.includes('circle.png'));
    if ( checkIfPlayerWon('circle.png') ) {
            console.log('Speler 1 heeft gewonnen');
            // 1. Score toekennen aan speler 1
            // 2. Score tonen
            // 3. Dialoogvenster tonen met de winnaar
            // 4. Ronde stoppen
    } else if ( checkIfPlayerWon('cross.png') ) {
        console.log('Speler 2 heeft gewonnen');
        // 1. Score toekennen aan speler 2
        // 2. Score tonen
        // 3. Dialoogvenster tonen met de winnaar
        // 4. Ronde stoppen
    } else if(checkForDraw()) {
            console.log('Gelijk spel');
            // 1. Score aan beide spelers toekennen
            // 2. Score tonen
            // 3. Dialoogvenster tonen m.b.t. gelijkspel
            // 4. Ronde stoppen
    }

    // 5b. Daarna controleren of er een gelijk spel is
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


function checkWinner(index1, index2, index3, image)
{
    // EN = AND = &&
    return (
        play_fields[index1].src.includes(image) &&                // Rij 1
        play_fields[index2].src.includes(image) &&
        play_fields[index3].src.includes(image)
    );
    /*
        Stel: 0 = cross, 1 = circle, 2 = cross
        play_fields[0].src.includes('cross')        Ja cross zit in cel 0, dus resultaat van deze voorwaarde is true
        play_fields[1].src.includes('cross')        resultaat is false
        play_fields[2].src.includes('cross')        resultaat is true

        true EN false EN true => false              Bij EN moeten alle onderdelen in de voorwaarde true opleveren om het geheel een true te laten opleveren

        Stel: 0 = cross, 1 = circle, 2 = circle
        play_fields[0].src.includes('cross')        true
        play_fields[1].src.includes('cross')        false
        play_fields[2].src.includes('cross')        false

        true OF false OF false => true              Bij OF hoeft er maar eentje true te zijn om het geheel als resultaat true op te laten leveren
    */
}

function checkIfPlayerWon(image)
{
    // OF = OF = ||
    return (
        checkWinner(0, 1, 2, image) ||
        checkWinner(3, 4, 5, image) ||
        checkWinner(6, 7, 8, image) ||
        checkWinner(0, 3, 6, image) ||
        checkWinner(1, 4, 7, image) ||
        checkWinner(2, 5, 8, image) ||
        checkWinner(2, 4, 6, image) ||
        checkWinner(0, 4, 8, image)
    );
}

function checkForDraw()
{
    return (!play_fields[0].src.includes('empty.jpg') &&          // Controle op gelijk spel
        !play_fields[1].src.includes('empty.jpg') && 
        !play_fields[2].src.includes('empty.jpg') &&
        !play_fields[3].src.includes('empty.jpg') && 
        !play_fields[4].src.includes('empty.jpg') &&
        !play_fields[5].src.includes('empty.jpg') && 
        !play_fields[6].src.includes('empty.jpg') &&
        !play_fields[7].src.includes('empty.jpg') && 
        !play_fields[8].src.includes('empty.jpg'));
}
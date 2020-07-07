/*----- constants -----*/

const players = {
    '1': 'X',
    '-1': 'O',
    'null': '',
};

const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


/*----- app's state (variables) -----*/

let turn, winner, gameboard;





/*----- cached element references -----*/

const h3El = document.querySelector('h3');
const gameboardEl = document.getElementById('gameboard');
const squareEls = document.querySelectorAll('.square');
const buttonEl = document.querySelector('button');



/*----- event listeners -----*/

buttonEl.addEventListener('click', handleInit);

gameboardEl.addEventListener('click', handleMove);



/*----- functions -----*/


// call handleInit to run the game as soon as the game loads

handleInit();


function handleInit() {
    gameboard = [null, null, null,
        null, null, null,
        null, null, null
    ];
    winner = false;
    turn = 1;
    render();
}

// visulize the data



function handleMove(event) {
    const selected = event.target.dataset.index;

    // protect a position if already selected

    if (winner || gameboard[selected]) return;

    gameboard[selected] = turn;

    //toggle the turn using math

    turn *= -1;

    // do we have a winner ? ?

    winner = checkWinner();

    //revisualize the game based on the new state

    render();

}

function checkWinner() {
    // loop over the combos array and the gameboard simultaneously to see if a winning combo is present

    // 1) winner = found matching combo in gameboard, winner = true

    for (let i = 0; i < combos.length; i++) {
        if (Math.abs(gameboard[combos[i][0]] + gameboard[combos[i][1]] + gameboard[combos[i][2]]) === 3) return gameboard[combos[i][0]];
    }

    // 2) cat gets it = no winning combos and all spots filled winner = false

    if (gameboard.includes(null)) return false;

    // 3) no combos no cat = keep playing, winner = false

    return 'T';



}

function render() {
    // visualize the gameboard
    gameboard.forEach(function(value, idx) {
        squareEls[idx].textContent = players[value];
    });

    // visualze who's turn it is or the winner, based on the game

    if (!winner) {
        h3El.textContent = `Player ${players[turn]}'s turn`;
    } else if (winner === 'T') {
        h3El.textContent = 'The Cat Got It!!';
    } else {
        h3El.textContent = `${players[winner]} WINS!`;
    };
}
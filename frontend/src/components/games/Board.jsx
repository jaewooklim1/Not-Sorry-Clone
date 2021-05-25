import React, { useState } from 'react';
import './board.css';
import Piece from './piece';

const dummyArr = new Array(60).fill(1);

const Board = (props) => {

    const startingPos = { red: 0, blue: 3 }
    const [pos, setPos] = useState(-1);
    const [pieces, setPiece] = useState([]);
    const [activePieces, setActivePieces] = useState([]);
    const [players, setPlayers] = useState([{ team: "red" }, { team: 'blue' }]);
    const [currentPlayer, setCurrentPlayer] = useState(0);


    const rollDice = (players) => {
        const dieOne = Math.floor(Math.random() * (7 - 1) + 1);
        const dieTwo = Math.floor(Math.random() * (7 - 1) + 1);

        console.log("dice roll", (dieTwo + dieOne));

        if ((dieTwo + dieOne) === 7 || ((dieTwo + dieOne) === 11)) {
            activePieces.forEach(piece => {
                if (players[currentPlayer].team === piece.color) {
                    console.log("players", players);
                    checkMove(players[currentPlayer], (dieOne + dieTwo));
                    setCurrentPlayer((currentPlayer + 1) % 2);
                    return
                }
            })
            initializePiece(players[currentPlayer])
            return
        }

        checkMove(players[currentPlayer], (dieOne + dieTwo));
        console.log("players", players);
        setCurrentPlayer((currentPlayer + 1) % 2);
        return [dieOne, dieTwo];
    }

    const movePiece = (player, diceRoll) => {
        for (let i = 0; i < player.pieces.length; i++) {
            if (player.pieces[i].pos >= 0) {
                return player.pieces[i].pos += diceRoll;
            }
            // else {
            //     return player.pieces[i].pos = startingPos[player.pieces[i].color];
            // }
        }
    }

    const checkMove = (currentPlayer, diceRoll) => {
        // console.log("YOYOYOYOYYO");
        players.forEach(player => {
            // console.log("player", player);
            for (let i = 0; i < player.pieces.length; i++) {
                // console.log("players piece", player.pieces[i]);
                // console.log("current player piece", currentPlayer.pieces[i]);
                if ((player.pieces[i].color !== currentPlayer.pieces[i].color) && (player.pieces[i].pos === (currentPlayer.pieces[i].pos + diceRoll))) {
                    // console.log("players piece", player.pieces[i])
                    
                    console.log("BACK TO AFRICA");
                    player.pieces[i].pos = -1;
                }
            }
        })
        movePiece(currentPlayer, diceRoll);
    }

    const isValidMove = () => {

    }

    const homeTracker = () => {

    }

    const gameOver = (counter) => {
        if (counter === 3) {
            return true;
        } else {
            return false;
        }
    }

    const turnTracker = () => {

    }

    const nextTurn = (players) => {

    }

    const startGame = (players) => {
        const newPlayers = players.map(player => {
            player.pieces = [
                {
                    pos: -1,
                    color: player.team
                },
                {
                    pos: -1,
                    color: player.team
                },
                {
                    pos: -1,
                    color: player.team
                }
            ]
            return player;
        })

        setPlayers(newPlayers);
        console.log("players", players);
    }

    const initializePiece = (player) => {

        for (let i = 0; i < player.pieces.length; i++) {
            if (player.pieces[i].pos >= 0) {
                break;
            } else {
                activePieces.push(player.pieces[i]);
                console.log("active pieces", activePieces);
                player.pieces[i].pos = startingPos[player.pieces[i].color];
                // player.pieces[i].pos = 1;
                break;
            }
        } 
    }

    console.log(players[currentPlayer]);
    // console.log(rollDice());
    // console.log(rollDice());
    // console.log(rollDice());

    return (
        <div className="board-container">
            <div className="tiles-container">
                {
                    dummyArr.map(tile => (
                        <div className="board-tile">
                            X
                        </div>
                    ))
                }
            </div>
            <button onClick={() => startGame(players)} className="start-game-button">
                Start Game
            </button>
            <button onClick={() => rollDice(players)} className="roll-dice-button">
                🎲
            </button>
        </div>
    )
}

export default Board;
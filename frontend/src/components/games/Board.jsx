import React, { useEffect, useState } from 'react';
import './board.css';
import Piece from './piece';

const dummyArr = new Array(60).fill(1);

const Board = (props) => {



    const startingPos = { red: 4, blue: 19, green: 49, yellow: 34 }
    const [pos, setPos] = useState(-1);
    const [pieces, setPiece] = useState([]);
    const [safeZonePieces, setSafeZonePieces] = useState([]);
    // const [redCounter, setRedCounter] = useState(0);
    // const [blueCounter, setBlueCounter] = useState(0);
    // const [greenCounter, setGreenCounter] = useState(0);
    // const [yellowCounter, setYellowCounter] = useState(0);
    // let [activePieces, setActivePieces] = useState([]);
    const [players, setPlayers] = useState([{ team: "red" }, { team: "blue" }, { team: "green" }, { team: "yellow" }]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [pointCounter, setPointCounter] = useState(0);


    useEffect(() => {
        if (gameOver()) {
            startGame();
        }
    }, [redCounter, blueCounter, greenCounter, yellowCounter])

    const rollDice = (players) => {
        const dieOne = Math.floor(Math.random() * (13 - 1) + 1);
        // const dieTwo = Math.floor(Math.random() * (7 - 1) + 1);
        //change die to roll from 1-12
        // console.log("dice roll", (dieTwo + dieOne));
        console.log("dice roll", (dieOne));


        if ((dieOne) === 7 || ((dieOne) === 11)) {
            activePieces.forEach(piece => {
                if (players[currentPlayer].team === piece.color) {
                    console.log("players - in if", players);
                    checkMove(players[currentPlayer], (dieOne));
                    setCurrentPlayer((currentPlayer + 1) % 4);
                    return;
                }
            })
            initializePiece(players[currentPlayer])
            return;
        }

        checkMove(players[currentPlayer], (dieOne));
        console.log("players - out if", players);
        setCurrentPlayer((currentPlayer + 1) % 4);
        return [dieOne];
    }

    const movePiece = (player, diceRoll) => {
        for (let i = 0; i < player.pieces.length; i++) {
            if (player.pieces[i].pos >= 0 && player.pieces[i].safeZonePos === -1) {
                if ((player.pieces[i].color === "red") && ((player.pieces[i].pos + diceRoll)) > 62) {
                    return checkSafeZone(player, player.pieces[i], diceRoll);
                } else if ((player.pieces[i].color === "blue") && (player.pieces[i].pos + diceRoll) > 77) {
                    return checkSafeZone(player, player.pieces[i], diceRoll);
                } else if ((player.pieces[i].color === "yellow") && (player.pieces[i].pos + diceRoll) > 92) {
                    return checkSafeZone(player, player.pieces[i], diceRoll);
                } else if ((player.pieces[i].color === "yellow") && (player.pieces[i].pos + diceRoll) > 108) {
                    return checkSafeZone(player, player.pieces[i], diceRoll);
                }
                if (checkSlide(player.pieces[i], diceRoll) === 3) {
                    return player.pieces[i].pos = (player.pieces[i].pos + (diceRoll + 3));
                } else if (checkSlide(player.pieces[i], diceRoll) === 4) {
                    return player.pieces[i].pos = (player.pieces[i].pos + (diceRoll + 4));
                } else {
                    return player.pieces[i].pos = (player.pieces[i].pos + diceRoll);
                }
            } else if (player.pieces[i].pos === -1 && player.pieces[i].safeZonePos > -1) {
                // return player.pieces[i].pos = startingPos[player.pieces[i].color];
                return checkSafeMove(player, player.pieces[i], diceRoll);
            }
        }
    }

    const checkSafeMove = (currentPlayer, piece, diceRoll) => {
        //check to see if piece are the same if so dont move piece
        if ((piece.safeZonePos + diceRoll) < 6) {
            let activePiecesFilter = activePieces.filter(activePiece => {
                console.log("active piece", activePiece);
                console.log("piece to filter out", piece);
                return activePiece.pos !== piece.pos
            });
            activePieces = activePiecesFilter;
            piece.safeZonePos += diceRoll;
            piece.pos = -1;
        } else if ((piece.safeZonePos + diceRoll) === 6) {
            let safeZonePiecesFilter = safeZonePieces.filter(safeZonePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
                return safeZonePiece.pos !== piece.pos
            });
            setSafeZonePieces(safeZonePiecesFilter);
            // switch(piece.color) {
            //     case "red":
            //         setRedCounter(redCounter+1);
            //         break;
            //     case "blue": 
            //         setBlueCounter(blueCounter+1);
            //         break;
            //     case "green":
            //         setGreenCounter(greenCounter+1);
            //         break;
            //     case "yellow":
            //         setYellowCounter(yellowCounter+1);
            //         break;
            //     default:
            //         break;
            // }
            if (piece.color === "red") {
                setRedCounter(redCounter + 1)
                // redCounter += 1;
            } else if (piece.color === "blue") {
                setBlueCounter(blueCounter + 1)
                // blueCounter+=1;
            } else if (piece.color === "yellow") {
                setYellowCounter(yellowCounter + 1);
            } else if (piece.color === "green") {
                setGreenCounter(greenCounter + 1);
            }

            console.log("RED COUNTER", redCounter);
            console.log("BLUE COUNTER", blueCounter);
            // if (gameOver()) {
            //     return startGame();
            // }
            currentPlayer.pieces.shift();
            console.log("WE MADE IT");

        }
    }

    const checkMove = (currentPlayer, diceRoll) => {
        // console.log("YOYOYOYOYYO");
        players.forEach(player => {
            // console.log("player", player);
            for (let i = 0; i < currentPlayer.pieces.length; i++) {
                // console.log("players piece", player.pieces[i]);
                // console.log("current player piece", currentPlayer.pieces[i]);
                if ((player.pieces[i].color !== currentPlayer.pieces[i].color) && (player.pieces[i].pos === (currentPlayer.pieces[i].pos + diceRoll))) {
                    // console.log("players piece", player.pieces[i])
                    player.pieces[i].pos = -1;
                }
                break;
            }
        })
        movePiece(currentPlayer, diceRoll);
    }

    const checkSlide = (piece, diceRoll) => {
        // for (let i=0; i < currentPlayer.pieces.length; i++) {
        if ((piece.pos + diceRoll) === 9) {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 4);
            return 4;
        } else if ((piece.pos + diceRoll) === 16 && piece.color !== "blue") {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 3);
            return 3;
        } else if ((piece.pos + diceRoll) === 24) {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 4);
            return 4;
        } else if ((piece.pos + diceRoll) === 31 && piece.color !== "yellow") {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 3);
            return 3;
        } else if ((piece.pos + diceRoll) === 39) {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 4);
            return 4;
        } else if ((piece.pos + diceRoll) === 46 && piece.color !== "green") {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 3);
            return 3;
        } else if ((piece.pos + diceRoll) === 54) {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 4);
            return 4;
        } else if ((piece.pos + diceRoll) === 1 && piece.color !== "red") {
            console.log("SLIIIIIIIIIIIIIIIIIIIDE");
            // currentPlayer.pieces[i].pos += (diceRoll + 3);
            return 3;
        } else {
            console.log("nah");
            return;
        }
        // }
    }

    const isValidMove = () => {

    }

    const checkSafeZone = (player, piece, diceRoll) => {
        // if (piece.color === "red" && ((piece.pos + diceRoll) % 60) >= 2) {
        if (piece.color === "red" && ((piece.pos + diceRoll) % 60) > 2) {
            console.log(`RED SAFE`);

            if ((piece.pos + diceRoll - 62) === 6) {
                console.log("WE MADE IT");
                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });
                setRedCounter(redCounter + 1);
                // console("RED COUNTER", redCounter);
                if (gameOver()) {
                    return startGame();
                }

                //add 1 to red team home counter
                player.pieces.shift();
                // setActivePieces(activePiecesFilter);
                activePieces = activePiecesFilter;
                console.log("current player", player.pieces);
                console.log("new active pieces", activePieces);
                setCurrentPlayer((currentPlayer + 1) % 4);
                // delete players.pieces["piece"];
            } else if ((piece.pos + diceRoll - 62) < 6) {

                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });

                if (safeZonePieces.length === 0) {
                    safeZonePieces.push(piece);

                } else {
                    for (let i = 0; i < safeZonePieces.length; i++) {
                        if (safeZonePieces[i].pos !== piece.pos) {
                            safeZonePieces.push(piece);
                        }
                    }
                }

                piece.safeZonePos = (piece.pos + diceRoll - 62);
                piece.pos = -1;
                activePieces = activePiecesFilter;
                console.log("new active pieces", activePieces);
                console.log("safe zone", safeZonePieces);
            }

            return true;
        } else if (piece.color === "blue" && ((piece.pos + diceRoll) % 60) > 17) {
            // } else if (piece.color === "blue" && (piece.pos % 60) >= 17) {
            console.log("BLUE SAFE");
            if ((piece.pos + diceRoll - 77) === 6) {
                console.log("WE MADE IT");
                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });

                //add 1 to red team home counter
                setBlueCounter(blueCounter + 1);
                if (gameOver()) {
                    return startGame();
                }
                console.log("RED COUNTER", redCounter);
                console.log("BLUE COUNTER", blueCounter);
                player.pieces.shift();
                // setActivePieces(activePiecesFilter);
                activePieces = activePiecesFilter;
                console.log("current player", player.pieces);
                console.log("new active pieces", activePieces);
                // delete players.pieces["piece"];
            } else if ((piece.pos + diceRoll - 77) < 6) {

                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });

                if (safeZonePieces.length === 0) {
                    safeZonePieces.push(piece);

                } else {
                    for (let i = 0; i < safeZonePieces.length; i++) {
                        if (safeZonePieces[i].pos !== piece.pos) {
                            safeZonePieces.push(piece);
                        }
                    }
                }

                piece.safeZonePos = (piece.pos + diceRoll - 77);
                piece.pos = -1;
                activePieces = activePiecesFilter;
                console.log("new active pieces", activePieces);
                console.log("safe zone", safeZonePieces);
            }
        } else if (piece.color === "yellow" && ((piece.pos + diceRoll) % 60) > 32) {
            console.log(`YELLOW SAFE`);

            if ((piece.pos + diceRoll - 92) === 6) {
                console.log("WE MADE IT");
                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });
                setYellowCounter(yellowCounter + 1);
                // console("RED COUNTER", redCounter);
                if (gameOver()) {
                    return startGame();
                }

                //add 1 to red team home counter
                player.pieces.shift();
                // setActivePieces(activePiecesFilter);
                activePieces = activePiecesFilter;
                console.log("current player", player.pieces);
                console.log("new active pieces", activePieces);
                setCurrentPlayer((currentPlayer + 1) % 4);
                // delete players.pieces["piece"];
            } else if ((piece.pos + diceRoll - 92) < 6) {

                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });

                if (safeZonePieces.length === 0) {
                    safeZonePieces.push(piece);

                } else {
                    for (let i = 0; i < safeZonePieces.length; i++) {
                        if (safeZonePieces[i].pos !== piece.pos) {
                            safeZonePieces.push(piece);
                        }
                    }
                }

                piece.safeZonePos = (piece.pos + diceRoll - 92);
                piece.pos = -1;
                activePieces = activePiecesFilter;
                console.log("new active pieces", activePieces);
                console.log("safe zone", safeZonePieces);
            }
            return true;
        } else if (piece.color === "green" && ((piece.pos + diceRoll) % 60) > 32) {
            console.log(`GREEN SAFE`);

            if ((piece.pos + diceRoll - 108) === 6) {
                console.log("WE MADE IT");
                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });
                setYellowCounter(yellowCounter + 1);
                // console("RED COUNTER", redCounter);
               
                //add 1 to red team home counter
                player.pieces.shift();
                // setActivePieces(activePiecesFilter);
                activePieces = activePiecesFilter;
                console.log("current player", player.pieces);
                console.log("new active pieces", activePieces);
                setCurrentPlayer((currentPlayer + 1) % 4);
                // delete players.pieces["piece"];
            } else if ((piece.pos + diceRoll - 108) < 6) {

                let activePiecesFilter = activePieces.filter(activePiece => {
                    console.log("active piece", activePiece);
                    console.log("piece to filter out", piece);
                    return activePiece.pos !== piece.pos
                });

                if (safeZonePieces.length === 0) {
                    safeZonePieces.push(piece);

                } else {
                    for (let i = 0; i < safeZonePieces.length; i++) {
                        if (safeZonePieces[i].pos !== piece.pos) {
                            safeZonePieces.push(piece);
                        }
                    }
                }

                piece.safeZonePos = (piece.pos + diceRoll - 108);
                piece.pos = -1;
                activePieces = activePiecesFilter;
                console.log("new active pieces", activePieces);
                console.log("safe zone", safeZonePieces);
            }
            return true;
        }
    }

    const homeTracker = () => {
        pointCounter += 1;

    }

    const gameOver = () => {
        if (redCounter === 3) {
            alert("RED WINS");
            return true;
        } else if (blueCounter === 3) {
            alert("BLUE WINS");
            return true;
        } else if (greenCounter === 3) {
            alert("GREEN WINS");
            return true;
        } else if (yellowCounter === 3) {
            alert("YELLOW WINS");
            return true;
        } else {
            return false;
        }
    }

    const turnTracker = () => {

    }

    const nextTurn = (players) => {

    }

    
    const initializePiece = (player) => {

        for (let i = 0; i < player.pieces.length; i++) {
            if (player.pieces[i].pos >= 0 || player.pieces[i].safeZonePos >= 0) {
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

    // const startGame = () => {
    //     const newPlayers = room.gameState.players.map(player, idx => {
    //         player.id.push(player._id);
    //         player.pieces.push( [
    //             {
    //                 safeZonePos: -1,
    //                 pos: -1,
    //                 color: playerTeams[idx]
    //             },
    //             {
    //                 safeZonePos: -1,
    //                 pos: -1,
    //                 color: playerTeams[idx]
    //             },
    //             {
    //                 safeZonePos: -1,
    //                 pos: -1,
    //                 color: playerTeams[idx]
    //             }
    //         ]);
    //         return player;
    //     })
    //     // setActivePieces([]);
    //     // setSafeZonePieces([]);
    //     setCurrentPlayer(0);
    //     setBlueCounter(0);
    //     setRedCounter(0);
    //     setGreenCounter(0);
    //     setYellowCounter(0);
    //     currentPlayer = 0;
    //     // setPlayers(newPlayers);
    //     room.gameState.players = newPlayers;
    //     console.log("new players protocol", newPlayers);
    //     return io.emit("started_game", room.gameState);
    // }


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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <button onClick={() => rollDice(players)} className="roll-dice-button">
                🎲
            </button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <button onClick={() => startGame(players)} className="reset">
                RESET 
            </button>
        </div>
    )
}

export default Board;
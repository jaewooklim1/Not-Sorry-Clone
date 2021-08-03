import React, { useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
// import { fetchUsers } from '../../actions/session_actions';
import { socket } from "../app";
import "./board.css";
import Tile from "./tile";
import EndGameModal from "./end_game_modal";

const boardArr = new Array(256).fill(1);
const rowArr = new Array(16).fill(1);

const Board = (props) => {
  const history = useHistory();
  // const dispatch = useDispatch();
  const playerId = useSelector((state) => state.session.user.id);
  const liveRoom = useSelector((state) => state.entities.liveRoom.liveRoom);

  const maxPoint = () => {
    return liveRoom.gameState.redCounter === 1 ||
      liveRoom.gameState.redCounter === 1 ||
      liveRoom.gameState.redCounter === 1 ||
      liveRoom.gameState.redCounter === 1
      ? true
      : false;
  };

  const rollDice = () => {
    if (
      playerId ===
        liveRoom.gameState.players[liveRoom.gameState.currentPlayer].id &&
      !maxPoint()
    ) {
      console.log("dice is rolling");
      socket.emit("roll_dice", { playerId, liveRoom });
    }
  };

  const renderModal = () => {
    return liveRoom.gameState.redCounter === 1 ||
      liveRoom.gameState.redCounter === 1 ||
      liveRoom.gameState.redCounter === 1 ||
      liveRoom.gameState.redCounter === 1 ? (
      <EndGameModal
        redCount={liveRoom.gameState.redCounter}
        blueCount={liveRoom.gameState.blueCounter}
        greenCount={liveRoom.gameState.greenCounter}
        yellowCount={liveRoom.gameState.yellowCounter}
      />
    ) : (
      ""
    );
  };

  const exitGame = () => {
    socket.emit("exit_game", { playerId, liveRoom });
    history.push("/rooms");
  };

  return (
    <>
      {renderModal()}

      <div className="board-page-container">
        <div className="board-page-section">
          <div className="each-play-details">
            <div className="counter-container">
              <div className="red-counter-container">
                <div className="red-counter">
                  <div className="team-name">
                    <h3>Red Team</h3>
                  </div>
                  <div className="player-name">
                    <p>
                      {liveRoom.players[0]
                        ? liveRoom.players[0].username
                        : "N/A"}
                    </p>
                  </div>
                  <div className="each-player-count">
                    <h3 className="counter-title">Counter </h3>
                    <p className="counter-number">
                      {liveRoom.gameState.redCounter}
                    </p>
                  </div>
                </div>
              </div>
              <div className="red-counter-container">
                <div className="red-counter">
                  <div className="team-name">
                    <h3>Blue Team</h3>
                  </div>
                  <div className="player-name">
                    <p>
                      {liveRoom.players[1] &&
                      liveRoom.gameState.players[1].active === true
                        ? liveRoom.players[1].username
                        : "N/A"}
                    </p>
                  </div>
                  <div className="each-player-count">
                    <h3 className="counter-title">Counter </h3>
                    <p className="counter-number">
                      {liveRoom.gameState.blueCounter}
                    </p>
                  </div>
                </div>
              </div>
              <div className="red-counter-container">
                <div className="red-counter">
                  <div className="team-name">
                    <h3>Yellow Team</h3>
                  </div>
                  <div className="player-name">
                    <p>
                      {liveRoom.players[2]
                        ? liveRoom.players[2].username
                        : "N/A"}
                    </p>
                  </div>
                  <div className="each-player-count">
                    <h3 className="counter-title">Counter </h3>
                    <p className="counter-number">
                      {liveRoom.gameState.yellowCounter}
                    </p>
                  </div>
                </div>
              </div>
              <div className="red-counter-container">
                <div className="red-counter">
                  <div className="team-name">
                    <h3>Green Team</h3>
                  </div>
                  <div className="player-name">
                    <p>
                      {liveRoom.players[3]
                        ? liveRoom.players[3].useranme
                        : "N/A"}
                    </p>
                  </div>
                  <div className="each-player-count">
                    <h3 className="counter-title">Counter </h3>
                    <p className="counter-number">
                      {liveRoom.gameState.greenCounter}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="board-container">
          <div className="tiles-container">
            {rowArr.map((tile, idx) => {
              return <Tile key={idx} idx={idx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 59;
              } else if (idx === 15) {
                boardIdx = 16;
              } else if (idx === 4) {
                boardIdx = "red";
              } else if (idx === 2) {
                boardIdx = JSON.stringify({ color: "red", pos: 0 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 58;
              } else if (idx === 15) {
                boardIdx = 17;
              } else if (idx >= 9 && idx <= 14) {
                boardIdx = JSON.stringify({ color: "blue", pos: 14 - idx });
              } else if (idx === 2) {
                boardIdx = JSON.stringify({ color: "red", pos: 1 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 57;
              } else if (idx === 15) {
                boardIdx = 18;
              } else if (idx === 2) {
                boardIdx = JSON.stringify({ color: "red", pos: 2 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 56;
              } else if (idx === 15) {
                boardIdx = 19;
              } else if (idx === 14) {
                boardIdx = "blue";
              } else if (idx === 2) {
                boardIdx = JSON.stringify({ color: "red", pos: 3 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 55;
              } else if (idx === 15) {
                boardIdx = 20;
              } else if (idx === 2) {
                boardIdx = JSON.stringify({ color: "red", pos: 4 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 54;
              } else if (idx === 15) {
                boardIdx = 21;
              } else if (idx === 2) {
                boardIdx = JSON.stringify({ color: "red", pos: 5 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}

            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 53;
              } else if (idx === 15) {
                boardIdx = 22;
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 52;
              } else if (idx === 15) {
                boardIdx = 23;
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 51;
              } else if (idx === 15) {
                boardIdx = 24;
              } else if (idx === 13) {
                boardIdx = JSON.stringify({ color: "yellow", pos: 5 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 50;
              } else if (idx === 15) {
                boardIdx = 25;
              } else if (idx === 13) {
                boardIdx = JSON.stringify({ color: "yellow", pos: 4 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 49;
              } else if (idx === 15) {
                boardIdx = 26;
              } else if (idx === 1) {
                boardIdx = "green";
              } else if (idx === 13) {
                boardIdx = JSON.stringify({ color: "yellow", pos: 3 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 48;
              } else if (idx === 15) {
                boardIdx = 27;
              } else if (idx === 13) {
                boardIdx = JSON.stringify({ color: "yellow", pos: 2 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 47;
              } else if (idx === 15) {
                boardIdx = 28;
              } else if (idx >= 1 && idx <= 6) {
                boardIdx = JSON.stringify({ color: "green", pos: idx - 1 });
              } else if (idx === 13) {
                boardIdx = JSON.stringify({ color: "yellow", pos: 1 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx;
              if (idx === 0) {
                boardIdx = 46;
              } else if (idx === 15) {
                boardIdx = 29;
              } else if (idx === 11) {
                boardIdx = "yellow";
              } else if (idx === 13) {
                boardIdx = JSON.stringify({ color: "yellow", pos: 0 });
              }

              return <Tile key={idx} idx={boardIdx} />;
            })}
            {rowArr.map((tile, idx) => {
              let boardIdx = 45;
              boardIdx -= idx;
              return <Tile key={idx} idx={boardIdx} />;
            })}
          </div>
        </div>
        <div className="dice-roll">
          <div className="curr-prev-cont">
            <div className="current-player-container">
              <h3 className="current-player-title">Current Player </h3>
              <p className="current-player-name">
                {liveRoom.players[liveRoom.gameState.currentPlayer].username}
              </p>
            </div>
          </div>
          <div className="prev-roll-cont">
            <h3 className="dice-roll-title">Previous Roll</h3>
            <p className="dice-roll-number">
              {liveRoom.gameState.prevDiceRoll}
            </p>
          </div>
          <div className="dice-roll-exit-cont">
            <div className="die-info-cont">
              <button className="dice" onClick={() => rollDice()}>
                🎲
              </button>
              <p className="die-info">(click to roll)</p>
            </div>
          </div>
          <div className="exit-game-button" onClick={() => exitGame()}>
            Exit Game
          </div>
        </div>

        {/* <button onClick={() => socket.emit("start_game", liveRoom)}>
                start game
            </button> */}
        {/* <div className="dice-counter-container">

                <div className="each-turn-container">

                </div>
            </div> */}
      </div>
    </>
  );
};

export default Board;

// const startingPos = { red: 4, blue: 19, green: 49, yellow: 34 }

// useEffect(() => {
//     if (gameOver()) {
//         startGame();
//     }
// }, [redCounter, blueCounter, greenCounter, yellowCounter])

// const rollDice = (players) => {
//     const dieOne = Math.floor(Math.random() * (13 - 1) + 1);
//     // const dieTwo = Math.floor(Math.random() * (7 - 1) + 1);
//     //change die to roll from 1-12
//     // console.log("dice roll", (dieTwo + dieOne));
//     console.log("dice roll", (dieOne));

//     if ((dieOne) === 7 || ((dieOne) === 11)) {
//         activePieces.forEach(piece => {
//             if (players[currentPlayer].team === piece.color) {
//                 console.log("players - in if", players);
//                 checkMove(players[currentPlayer], (dieOne));
//                 setCurrentPlayer((currentPlayer + 1) % 4);
//                 return;
//             }
//         })
//         initializePiece(players[currentPlayer])
//         return;
//     }

//     // checkMove(players[currentPlayer], (dieOne));
//     // console.log("players - out if", players);
//     // setCurrentPlayer((currentPlayer + 1) % 4);
//     return [dieOne];
// }

// const movePiece = (player, diceRoll) => {
//     for (let i = 0; i < player.pieces.length; i++) {
//         if (player.pieces[i].pos >= 0 && player.pieces[i].safeZonePos === -1) {
//             if ((player.pieces[i].color === "red") && ((player.pieces[i].pos + diceRoll)) > 62) {
//                 return checkSafeZone(player, player.pieces[i], diceRoll);
//             } else if ((player.pieces[i].color === "blue") && (player.pieces[i].pos + diceRoll) > 77) {
//                 return checkSafeZone(player, player.pieces[i], diceRoll);
//             } else if ((player.pieces[i].color === "yellow") && (player.pieces[i].pos + diceRoll) > 92) {
//                 return checkSafeZone(player, player.pieces[i], diceRoll);
//             } else if ((player.pieces[i].color === "yellow") && (player.pieces[i].pos + diceRoll) > 108) {
//                 return checkSafeZone(player, player.pieces[i], diceRoll);
//             }
//             if (checkSlide(player.pieces[i], diceRoll) === 3) {
//                 return player.pieces[i].pos = (player.pieces[i].pos + (diceRoll + 3));
//             } else if (checkSlide(player.pieces[i], diceRoll) === 4) {
//                 return player.pieces[i].pos = (player.pieces[i].pos + (diceRoll + 4));
//             } else {
//                 return player.pieces[i].pos = (player.pieces[i].pos + diceRoll);
//             }
//         } else if (player.pieces[i].pos === -1 && player.pieces[i].safeZonePos > -1) {
//             // return player.pieces[i].pos = startingPos[player.pieces[i].color];
//             return checkSafeMove(player, player.pieces[i], diceRoll);
//         }
//     }
// }

// const checkSafeMove = (currentPlayer, piece, diceRoll) => {
//     //check to see if piece are the same if so dont move piece
//     if ((piece.safeZonePos + diceRoll) < 6) {
//         let activePiecesFilter = activePieces.filter(activePiece => {
//             console.log("active piece", activePiece);
//             console.log("piece to filter out", piece);
//             return activePiece.pos !== piece.pos
//         });
//         activePieces = activePiecesFilter;
//         piece.safeZonePos += diceRoll;
//         piece.pos = -1;
//     } else if ((piece.safeZonePos + diceRoll) === 6) {
//         let safeZonePiecesFilter = safeZonePieces.filter(safeZonePiece => {
//             return safeZonePiece.pos !== piece.pos
//         });
//         setSafeZonePieces(safeZonePiecesFilter);

//         if (piece.color === "red") {
//             setRedCounter(redCounter + 1)
//             // redCounter += 1;
//         } else if (piece.color === "blue") {
//             setBlueCounter(blueCounter + 1)
//             // blueCounter+=1;
//         } else if (piece.color === "yellow") {
//             setYellowCounter(yellowCounter + 1);
//         } else if (piece.color === "green") {
//             setGreenCounter(greenCounter + 1);
//         }

//         console.log("RED COUNTER", redCounter);
//         console.log("BLUE COUNTER", blueCounter);
//         currentPlayer.pieces.shift();
//         console.log("WE MADE IT");

//     }
// }

// const checkMove = (currentPlayer, diceRoll) => {
//     // console.log("YOYOYOYOYYO");
//     players.forEach(player => {
//         // console.log("player", player);
//         for (let i = 0; i < currentPlayer.pieces.length; i++) {
//             // console.log("players piece", player.pieces[i]);
//             // console.log("current player piece", currentPlayer.pieces[i]);
//             if ((player.pieces[i].color !== currentPlayer.pieces[i].color) && (player.pieces[i].pos === (currentPlayer.pieces[i].pos + diceRoll))) {
//                 // console.log("players piece", player.pieces[i])
//                 player.pieces[i].pos = -1;
//             }
//             break;
//         }
//     })
//     movePiece(currentPlayer, diceRoll);
// }

// const checkSlide = (piece, diceRoll) => {
//     // for (let i=0; i < currentPlayer.pieces.length; i++) {
//     if ((piece.pos + diceRoll) === 9) {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 4);
//         return 4;
//     } else if ((piece.pos + diceRoll) === 16 && piece.color !== "blue") {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 3);
//         return 3;
//     } else if ((piece.pos + diceRoll) === 24) {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 4);
//         return 4;
//     } else if ((piece.pos + diceRoll) === 31 && piece.color !== "yellow") {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 3);
//         return 3;
//     } else if ((piece.pos + diceRoll) === 39) {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 4);
//         return 4;
//     } else if ((piece.pos + diceRoll) === 46 && piece.color !== "green") {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 3);
//         return 3;
//     } else if ((piece.pos + diceRoll) === 54) {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 4);
//         return 4;
//     } else if ((piece.pos + diceRoll) === 1 && piece.color !== "red") {
//         console.log("SLIIIIIIIIIIIIIIIIIIIDE");
//         // currentPlayer.pieces[i].pos += (diceRoll + 3);
//         return 3;
//     } else {
//         console.log("nah");
//         return;
//     }
//     // }
// }

// const checkSafeZone = (player, piece, diceRoll) => {
//     // if (piece.color === "red" && ((piece.pos + diceRoll) % 60) >= 2) {
//     if (piece.color === "red" && ((piece.pos + diceRoll) % 60) > 2) {
//         console.log(`RED SAFE`);

//         if ((piece.pos + diceRoll - 62) === 6) {
//             console.log("WE MADE IT");
//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });
//             setRedCounter(redCounter + 1);
//             // console("RED COUNTER", redCounter);
//             if (gameOver()) {
//                 return startGame();
//             }

//             //add 1 to red team home counter
//             player.pieces.shift();
//             // setActivePieces(activePiecesFilter);
//             activePieces = activePiecesFilter;
//             console.log("current player", player.pieces);
//             console.log("new active pieces", activePieces);
//             setCurrentPlayer((currentPlayer + 1) % 4);
//             // delete players.pieces["piece"];
//         } else if ((piece.pos + diceRoll - 62) < 6) {

//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });

//             if (safeZonePieces.length === 0) {
//                 safeZonePieces.push(piece);

//             } else {
//                 for (let i = 0; i < safeZonePieces.length; i++) {
//                     if (safeZonePieces[i].pos !== piece.pos) {
//                         safeZonePieces.push(piece);
//                     }
//                 }
//             }

//             piece.safeZonePos = (piece.pos + diceRoll - 62);
//             piece.pos = -1;
//             activePieces = activePiecesFilter;
//             console.log("new active pieces", activePieces);
//             console.log("safe zone", safeZonePieces);
//         }

//         return true;
//     } else if (piece.color === "blue" && ((piece.pos + diceRoll) % 60) > 17) {
//         // } else if (piece.color === "blue" && (piece.pos % 60) >= 17) {
//         console.log("BLUE SAFE");
//         if ((piece.pos + diceRoll - 77) === 6) {
//             console.log("WE MADE IT");
//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });

//             //add 1 to red team home counter
//             setBlueCounter(blueCounter + 1);
//             if (gameOver()) {
//                 return startGame();
//             }
//             console.log("RED COUNTER", redCounter);
//             console.log("BLUE COUNTER", blueCounter);
//             player.pieces.shift();
//             // setActivePieces(activePiecesFilter);
//             activePieces = activePiecesFilter;
//             console.log("current player", player.pieces);
//             console.log("new active pieces", activePieces);
//             // delete players.pieces["piece"];
//         } else if ((piece.pos + diceRoll - 77) < 6) {

//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });

//             if (safeZonePieces.length === 0) {
//                 safeZonePieces.push(piece);

//             } else {
//                 for (let i = 0; i < safeZonePieces.length; i++) {
//                     if (safeZonePieces[i].pos !== piece.pos) {
//                         safeZonePieces.push(piece);
//                     }
//                 }
//             }

//             piece.safeZonePos = (piece.pos + diceRoll - 77);
//             piece.pos = -1;
//             activePieces = activePiecesFilter;
//             console.log("new active pieces", activePieces);
//             console.log("safe zone", safeZonePieces);
//         }
//     } else if (piece.color === "yellow" && ((piece.pos + diceRoll) % 60) > 32) {
//         console.log(`YELLOW SAFE`);

//         if ((piece.pos + diceRoll - 92) === 6) {
//             console.log("WE MADE IT");
//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });
//             setYellowCounter(yellowCounter + 1);
//             // console("RED COUNTER", redCounter);
//             if (gameOver()) {
//                 return startGame();
//             }

//             //add 1 to red team home counter
//             player.pieces.shift();
//             // setActivePieces(activePiecesFilter);
//             activePieces = activePiecesFilter;
//             console.log("current player", player.pieces);
//             console.log("new active pieces", activePieces);
//             setCurrentPlayer((currentPlayer + 1) % 4);
//             // delete players.pieces["piece"];
//         } else if ((piece.pos + diceRoll - 92) < 6) {

//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });

//             if (safeZonePieces.length === 0) {
//                 safeZonePieces.push(piece);

//             } else {
//                 for (let i = 0; i < safeZonePieces.length; i++) {
//                     if (safeZonePieces[i].pos !== piece.pos) {
//                         safeZonePieces.push(piece);
//                     }
//                 }
//             }

//             piece.safeZonePos = (piece.pos + diceRoll - 92);
//             piece.pos = -1;
//             activePieces = activePiecesFilter;
//             console.log("new active pieces", activePieces);
//             console.log("safe zone", safeZonePieces);
//         }
//         return true;
//     } else if (piece.color === "green" && ((piece.pos + diceRoll) % 60) > 32) {
//         console.log(`GREEN SAFE`);

//         if ((piece.pos + diceRoll - 108) === 6) {
//             console.log("WE MADE IT");
//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });
//             setYellowCounter(yellowCounter + 1);
//             // console("RED COUNTER", redCounter);

//             //add 1 to red team home counter
//             player.pieces.shift();
//             // setActivePieces(activePiecesFilter);
//             activePieces = activePiecesFilter;
//             console.log("current player", player.pieces);
//             console.log("new active pieces", activePieces);
//             setCurrentPlayer((currentPlayer + 1) % 4);
//             // delete players.pieces["piece"];
//         } else if ((piece.pos + diceRoll - 108) < 6) {

//             let activePiecesFilter = activePieces.filter(activePiece => {
//                 console.log("active piece", activePiece);
//                 console.log("piece to filter out", piece);
//                 return activePiece.pos !== piece.pos
//             });

//             if (safeZonePieces.length === 0) {
//                 safeZonePieces.push(piece);

//             } else {
//                 for (let i = 0; i < safeZonePieces.length; i++) {
//                     if (safeZonePieces[i].pos !== piece.pos) {
//                         safeZonePieces.push(piece);
//                     }
//                 }
//             }

//             piece.safeZonePos = (piece.pos + diceRoll - 108);
//             piece.pos = -1;
//             activePieces = activePiecesFilter;
//             console.log("new active pieces", activePieces);
//             console.log("safe zone", safeZonePieces);
//         }
//         return true;
//     }
// }

// const homeTracker = () => {
//     pointCounter += 1;

// }

// const gameOver = () => {
//     if (redCounter === 3) {
//         alert("RED WINS");
//         return true;
//     } else if (blueCounter === 3) {
//         alert("BLUE WINS");
//         return true;
//     } else if (greenCounter === 3) {
//         alert("GREEN WINS");
//         return true;
//     } else if (yellowCounter === 3) {
//         alert("YELLOW WINS");
//         return true;
//     } else {
//         return false;
//     }
// }

// const initializePiece = (player) => {

//     for (let i = 0; i < player.pieces.length; i++) {
//         if (player.pieces[i].pos >= 0 || player.pieces[i].safeZonePos >= 0) {
//             break;
//         } else {
//             activePieces.push(player.pieces[i]);
//             console.log("active pieces", activePieces);
//             player.pieces[i].pos = startingPos[player.pieces[i].color];
//             // player.pieces[i].pos = 1;
//             break;
//         }
//     }
// }

// const startGame = () => {
//     const newPlayers = players.map(player => {
//         player.pieces = [
//             {
//                 safeZonePos: -1,
//                 pos: -1,
//                 color: player.team
//             },
//             {
//                 safeZonePos: -1,
//                 pos: -1,
//                 color: player.team
//             },
//             {
//                 safeZonePos: -1,
//                 pos: -1,
//                 color: player.team
//             }
//         ]
//         return player;
//     })
//     setActivePieces([]);
//     setSafeZonePieces([]);
//     setCurrentPlayer(0);
//     setBlueCounter(0);
//     setRedCounter(0);
//     setGreenCounter(0);
//     setYellowCounter(0);
//     setPlayers(newPlayers);
//     console.log("players", players);
// }

// console.log(players[currentPlayer]);
// // console.log(rollDice());
// // console.log(rollDice());
// // console.log(rollDice());

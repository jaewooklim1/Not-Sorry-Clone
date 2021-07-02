// const io = require('../../app');
const mongoose = require('mongoose');
const passport = require('passport');
const io = require('../../app');
const { update } = require('../../models/Room');
// const { socket } = require('../../frontend/src/components/app');
const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/rooms');
// const { default: Rooms } = require('../../frontend/src/components/main/rooms');


const onConnect = (socket, io) => {
    socket.on('create_new_room', async (room) => {
        const { errors, isValid } = validateRoomInput(room);

        if (!isValid) {

        }

        const newRoom = new Room({
            roomname: room.roomname,
            user: room.user_id,
            players: [room.user_id]
        });

        //should redirect user to /room/:room_id
        await newRoom.save()
        newRoom.populate("players");
        socket.join(newRoom._id);
        socket.emit("push_new_room", (newRoom));
        socket.broadcast.emit("add_new_room", (newRoom));

    })

    //socket on delete_room, room 

    socket.on('remove_room', async ({ room, currentUser }) => {

        if (room.user === currentUser.id) {
            await Room.findByIdAndDelete(room._id);
        }

        io.emit("update_rooms");
        socket.broadcast.emit("update_rooms");
    })

    socket.on("join_room", async ({ room, user_id }) => {
        let foundRoom = await Room.findById(room._id)
        if (!foundRoom.players.includes(user_id) && foundRoom.players.length <= 3) {
            // console.log("IO", io);
            // socket.join(foundRoom._id);
            socket.join(foundRoom._id.toString());
            foundRoom.players.push(user_id);
            // console.log("foundRoom", foundRoom);
            await foundRoom.save();
            // return io.to(foundRoom._id).emit("joined_room", (room));
            return io.to(foundRoom._id.toString()).emit("joined_room", (room));
            // console.log("backend join room");
        } else if (foundRoom.players.includes(user_id)) {
            socket.join(foundRoom._id.toString());
            return io.to(foundRoom._id.toString()).emit("joined_room", (room));
        }
        socket.emit("join_room_error", { error: "The room is full or you have already joined" });
    })

    socket.on("get_room", async room_id => {

        let foundRoom = await Room.findById(room_id).populate("players");
        socket.join(foundRoom._id.toString());
        // console.log("room from socket", foundRoom);
        socket.emit("got_room", foundRoom);
    })

    socket.on("start_game", async liveRoom => {
        // console.log("room in start game", liveRoom);
        const playerTeams = ["red", "blue", "yellow", "green"];

        // if (room.players.length === 4) {
        let foundRoom = await Room.findById(liveRoom._id).populate("players");
        // const endGame = () => {

        for (let i = 0; i <= 3; i++) {
            if (foundRoom.players[i]) {
                foundRoom.gameState.players.push(
                    {
                        id: liveRoom.players[i],
                        team: playerTeams[i],
                        active: true,
                        pieces: [
                            {
                                safeZonePos: -1,
                                pos: -1,
                                color: playerTeams[i]
                            },
                            {
                                safeZonePos: -1,
                                pos: -1,
                                color: playerTeams[i]
                            },
                            {
                                safeZonePos: -1,
                                pos: -1,
                                color: playerTeams[i]
                            }
                        ]
                    }
                );
            } else {
                foundRoom.gameState.players.push(
                    {
                        id: null,
                        team: playerTeams[i],
                        active: false,
                        pieces: [
                            {
                                safeZonePos: -1,
                                pos: -1,
                                color: playerTeams[i]
                            },
                            {
                                safeZonePos: -1,
                                pos: -1,
                                color: playerTeams[i]
                            },
                            {
                                safeZonePos: -1,
                                pos: -1,
                                color: playerTeams[i]
                            }
                        ]
                    }
                )
            }
        }

        foundRoom.gameState.activePieces = [];
        foundRoom.gameState.safeZonePieces = [];
        // room.gameState.players = newPlayers;
        foundRoom.gameState.blueCounter = 0;
        foundRoom.gameState.redCounter = 0;
        foundRoom.gameState.yellowCounter = 0;
        foundRoom.gameState.greenCounter = 0;
        foundRoom.gameState.currentPlayer = 0;

        foundRoom.gameActive = true;

        await foundRoom.save();
        // console.log("found room in backend", foundRoom.gameState);

        // setPlayers(newPlayers);
        // console.log("new gamestate after start game", foundRoom.gameState);
        // console.log("Game has started", foundRoom.gameState.players);
        return io.to(foundRoom._id.toString()).emit("started_game", foundRoom);
    })

    socket.on("tester", async ({liveRoom}, msg) => {
        let foundRoom = Room.findById(liveRoom._id);

        io.to(foundRoom._id.toString()).emit("tester_msg", msg);
        socket.broadcast.emit("tester_msg", msg);
    }) 

    socket.on("exit_game", async ({ playerId, liveRoom }) => {

        // console.log("in the backend!");
        // console.log("live room in backend", liveRoom);

        let foundRoom = await Room.findById(liveRoom._id).populate("players");

        foundRoom.gameState.players.filter(player => {
            // console.log("player.id in newPLayers", player.id);
            // console.log("player to kick out", playerId);
            if (playerId == player.id) {
                // console.log("in if statement");
                player.pieces.map(piece => {
                    piece.pos = -1;
                    piece.safeZonePos = -1;
                });

                player.id = null;
                player.active = false;
                // console.log("player to change", player);
                // console.log("player in if statement", player);
                return player;
            } else {
                return player;
            }
        });
        await foundRoom.save();
        io.to(foundRoom._id.toString()).emit("updated_game_state", foundRoom);

        if (checkActivePlayers(foundRoom) === false) {
            await Room.findByIdAndDelete(foundRoom._id);
            io.emit("update_rooms");
            socket.broadcast.emit("update_rooms");
        }

        // console.log("new players", foundRoom.gameState.players);
    })

    const checkActivePlayers = (liveRoom) => {
        let isActive = false;

        liveRoom.gameState.players.forEach(player => {
            if (player.active === true) {
                isActive = true;
            }
        });

        return isActive;
    }

    socket.on("roll_dice", async ({ playerId, liveRoom }) => {
        // console.log("live room from roll dice", liveRoom);
        let foundRoom = await Room.findById(liveRoom._id).populate("players");

        const diceRoll = await rollDice(playerId, foundRoom);
        // console.log("DICE ROLL", diceRoll);
        foundRoom.gameState.prevDiceRoll = diceRoll;
        // console.log("updated game state backend", foundRoom);
        const gameOver = (liveRoom) => {
            if (liveRoom.gameState.redCounter === 3) {
                return true
            } else if (liveRoom.gameState.blueCounter === 3) {
                return true;
            } else if (liveRoom.gameState.yellowCounter === 3) {
                return true;
            } else if (liveRoom.gameState.greenCounter === 3) {
                return true;
            } else {
                return false;
            }
        }

        const endGame = (liveRoom) => {
            io.to(liveRoom._id.toString()).emit("end_game", liveRoom);
        }

        if (gameOver(foundRoom)) {
            return endGame(foundRoom);
        }

        // foundRoom.gameState.players = correctPlayers;
        // console.log("newPlayers", correctPlayers);
        // foundRoom.gameState.players.forEach(player => {
        //     player.pieces = player.pieces.map(piece => {
        //         console.log("new piece pos", piece.pos % 60)
        //         return { ...piece, pos: piece.pos % 60 };
        //     })
        // })
        // console.log("new found room", foundRoom);
        io.to(foundRoom._id.toString()).emit("updated_game_state", foundRoom);
    })


    // socket.on("update_game_state", liveRoom => {

    // })

    // socket.on("reset_game_state", room => {

    // })

}


const rollDice = async (playerId, liveRoom) => {

    const currentPlayerId = liveRoom.gameState.players[liveRoom.gameState.currentPlayer]._id;
    // const currentPlayer = liveRoom.gameState.players[liveRoom.gameState.currentPlayer];
    const players = liveRoom.gameState.players;
    // if (playerId === currentPlayerId) {
    const dieOne = Math.floor(Math.random() * (13 - 1) + 1);
    // console.log("dice roll", (dieOne));
    if ((dieOne) === 7 || ((dieOne) === 11)) {
        liveRoom.gameState.activePieces.forEach(async (piece) => {
            if (liveRoom.gameState.players[liveRoom.gameState.currentPlayer].team === piece.color) {
                // console.log("players - in if", players);
                checkMove(liveRoom, liveRoom.gameState.players[liveRoom.gameState.currentPlayer], (dieOne));
                // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;
                liveRoom.gameState.currentPlayer = setCurrentPlayer(liveRoom);
            }
        })

        initializePiece(liveRoom)
        await liveRoom.save();
        return dieOne;
    }
    // }

    checkMove(liveRoom, liveRoom.gameState.players[liveRoom.gameState.currentPlayer], (dieOne));
    liveRoom.gameState.currentPlayer = setCurrentPlayer(liveRoom);
    // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;
    await liveRoom.save();

    // console.log("players - out if", players);
    return dieOne;
}

const setCurrentPlayer = (liveRoom) => {
    for (let i = 0; i < 4; i++) {
        if (liveRoom.gameState.players[(liveRoom.gameState.currentPlayer + 1) % 4].active === false) {
            liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;
        } else {
            // console.log("gamestate.players", liveRoom.gameState)
            liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;
            break;
        }
    }
    return liveRoom.gameState.currentPlayer;
}

const movePiece = (liveRoom, diceRoll) => {
    const player = liveRoom.gameState.players[liveRoom.gameState.currentPlayer];

    for (let i = 0; i < player.pieces.length; i++) {
        if (player.pieces[i].pos >= 0 && player.pieces[i].safeZonePos === -1) {
            if ((player.pieces[i].color === "red") && ((player.pieces[i].pos + diceRoll)) > 62) {
                return checkSafeZone(liveRoom, i, diceRoll);
            } else if ((player.pieces[i].color === "blue") && (player.pieces[i].pos + diceRoll) > 77) {
                return checkSafeZone(liveRoom, i, diceRoll);
            } else if ((player.pieces[i].color === "yellow") && (player.pieces[i].pos + diceRoll) > 92) {
                return checkSafeZone(liveRoom, i, diceRoll);
            } else if ((player.pieces[i].color === "green") && (player.pieces[i].pos + diceRoll) > 108) {
                return checkSafeZone(liveRoom, i, diceRoll);
            }
            if (checkSlide(player.pieces[i], diceRoll) === 3) {
                return player.pieces[i].pos = (player.pieces[i].pos + (diceRoll + 3));
            } else if (checkSlide(player.pieces[i], diceRoll) === 4) {
                return player.pieces[i].pos = (player.pieces[i].pos + (diceRoll + 4));
            } else {
                return player.pieces[i].pos = (player.pieces[i].pos + diceRoll);
            }
        }
        else if (player.pieces[i].pos === -1 && player.pieces[i].safeZonePos > -1) {
            // return player.pieces[i].pos = startingPos[player.pieces[i].color];
            return checkSafeMove(liveRoom, i, diceRoll);
        }
    }
}

const checkSafeMove = (liveRoom, i, diceRoll) => {
    const player = liveRoom.gameState.players[liveRoom.gameState.currentPlayer];
    const piece = player.pieces[i];
    //check to see if piece are the same if so dont move piece
    if ((piece.safeZonePos + diceRoll) < 6) {
        let activePiecesFilter = liveRoom.gameState.activePieces.filter(activePiece => {
            // console.log("active piece", activePiece);
            // console.log("piece to filter out", piece);
            return activePiece.pos !== piece.pos
        });
        liveRoom.gameState.activePieces = activePiecesFilter;
        piece.safeZonePos += diceRoll;
        piece.pos = -1;
    } else if ((piece.safeZonePos + diceRoll) === 6) {
        let safeZonePiecesFilter = liveRoom.gameState.safeZonePieces.filter(safeZonePiece => {
            return safeZonePiece.pos !== piece.pos
        });
        liveRoom.gameState.safeZonePieces = safeZonePiecesFilter;

        if (piece.color === "red") {
            liveRoom.gameState.redCounter += 1;
            // redCounter += 1;
        } else if (piece.color === "blue") {
            liveRoom.gameState.blueCounter += 1;
            // blueCounter+=1;
        } else if (piece.color === "yellow") {
            liveRoom.gameState.yellowCounter += 1;
        } else if (piece.color === "green") {
            liveRoom.gameState.greenCounter += 1;
        }

        // if (gameOver(liveRoom)) {
        //     return endGame(liveRoom);
        // }
        // console.log("RED COUNTER", redCounter);
        // console.log("BLUE COUNTER", blueCounter);
        player.pieces.shift();

        // console.log("WE MADE IT");

    }
}

const checkMove = (liveRoom, currentPlayer, diceRoll) => {
    // console.log("YOYOYOYOYYO");
    liveRoom.gameState.players.forEach((player, idx) => {
        // console.log("player", player);
        for (let i = 0; i < currentPlayer.pieces.length; i++) {
            // console.log("players piece", player.pieces[i]);
            // console.log("current player piece", currentPlayer.pieces[i]);
            if ((player.pieces[i].color !== currentPlayer.pieces[i].color) && (player.pieces[i].pos === (currentPlayer.pieces[i].pos + diceRoll))) {
                // console.log("players piece", player.pieces[i])
                liveRoom.gameState.players[idx].pieces[i].pos = -1;
            }
            break;
        }
    })
    movePiece(liveRoom, diceRoll);
}

const checkSlide = (piece, diceRoll) => {
    if ((piece.pos + diceRoll) === 9) {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 4;
    } else if ((piece.pos + diceRoll) === 16 && piece.color !== "blue") {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 3;
    } else if ((piece.pos + diceRoll) === 24) {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 4;
    } else if ((piece.pos + diceRoll) === 31 && piece.color !== "yellow") {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 3;
    } else if ((piece.pos + diceRoll) === 39) {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 4;
    } else if ((piece.pos + diceRoll) === 46 && piece.color !== "green") {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 3;
    } else if ((piece.pos + diceRoll) === 54) {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 4;
    } else if ((piece.pos + diceRoll) === 1 && piece.color !== "red") {
        // console.log("SLIIIIIIIIIIIIIIIIIIIDE");
        return 3;
    } else {
        // console.log("nah");
        return;
    }
    // }
}

const checkSafeZone = (liveRoom, i, diceRoll) => {
    const player = liveRoom.gameState.players[liveRoom.gameState.currentPlayer];
    const piece = player.pieces[i];
    let activePieces = liveRoom.gameState.activePieces;
    let safeZonePieces = liveRoom.gameState.safeZonePieces;
    // if (piece.color === "red" && ((piece.pos + diceRoll) % 60) >= 2) {
    if (piece.color === "red" && ((piece.pos + diceRoll) % 60) > 2) {
        // console.log(`RED SAFE`);

        if ((piece.pos + diceRoll - 62) === 6) {
            // console.log("WE MADE IT");
            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
                return activePiece.pos !== piece.pos
            });
            liveRoom.gameState.redCounter += 1;
            // console("RED COUNTER", redCounter);
            // if (gameOver(liveRoom)) {
            //     return endGame(liveRoom);
            // }

            //add 1 to red team home counter
            player.pieces.shift();
            // setActivePieces(activePiecesFilter);
            activePieces = activePiecesFilter;
            // console.log("current player", player.pieces);
            // console.log("new active pieces", activePieces);
            // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;
            // delete players.pieces["piece"];
        } else if ((piece.pos + diceRoll - 62) < 6) {

            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
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
            // console.log("new active pieces", activePieces);
            // console.log("safe zone", safeZonePieces);
            // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;

        }

        return true;
    } else if (piece.color === "blue" && ((piece.pos + diceRoll) % 60) > 17) {
        // } else if (piece.color === "blue" && (piece.pos % 60) >= 17) {
        // console.log("BLUE SAFE");
        if ((piece.pos + diceRoll - 77) === 6) {
            // console.log("WE MADE IT");
            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
                return activePiece.pos !== piece.pos
            });

            //add 1 to red team home counter
            liveRoom.gameState.blueCounter += 1;
            // if (gameOver(liveRoom)) {
            //     return endGame(liveRoom);
            // }
            // console.log("RED COUNTER", redCounter);
            // console.log("BLUE COUNTER", blueCounter);
            player.pieces.shift();
            // setActivePieces(activePiecesFilter);
            activePieces = activePiecesFilter;
            // console.log("current player", player.pieces);
            // console.log("new active pieces", activePieces);
            // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;

            // delete players.pieces["piece"];
        } else if ((piece.pos + diceRoll - 77) < 6) {

            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
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
            // console.log("new active pieces", activePieces);
            // console.log("safe zone", safeZonePieces);
            // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;

        }
    } else if (piece.color === "yellow" && ((piece.pos + diceRoll) % 60) > 32) {
        // console.log(`YELLOW SAFE`);

        if ((piece.pos + diceRoll - 92) === 6) {
            // console.log("WE MADE IT");
            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
                return activePiece.pos !== piece.pos
            });
            liveRoom.gameState.yellowCounter += 1;
            // console("RED COUNTER", redCounter);
            // if (gameOver(liveRoom)) {
            //     return endGame(liveRoom);
            // }

            //add 1 to red team home counter
            player.pieces.shift();
            // setActivePieces(activePiecesFilter);
            activePieces = activePiecesFilter;
            // console.log("current player", player.pieces);
            // console.log("new active pieces", activePieces);
            // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer + 1) % 4;

            // delete players.pieces["piece"];
        } else if ((piece.pos + diceRoll - 92) < 6) {

            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
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
            // console.log("new active pieces", activePieces);
            // console.log("safe zone", safeZonePieces);
        }
        return true;
    } else if (piece.color === "green" && ((piece.pos + diceRoll) % 60) > 32) {
        // console.log(`GREEN SAFE`);

        if ((piece.pos + diceRoll - 108) === 6) {
            // console.log("WE MADE IT");
            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
                return activePiece.pos !== piece.pos
            });
            liveRoom.gameState.greenCounter += 1;
            // console("RED COUNTER", redCounter);
            // if (gameOver(liveRoom)) {
            //     return endGame(liveRoom);
            // }
            //add 1 to red team home counter
            player.pieces.shift();
            // setActivePieces(activePiecesFilter);
            activePieces = activePiecesFilter;
            // console.log("current player", player.pieces);
            // console.log("new active pieces", activePieces);
            // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer  + 1) % 4;
            // delete players.pieces["piece"];
        } else if ((piece.pos + diceRoll - 108) < 6) {

            let activePiecesFilter = activePieces.filter(activePiece => {
                // console.log("active piece", activePiece);
                // console.log("piece to filter out", piece);
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
            // console.log("new active pieces", activePieces);
            // console.log("safe zone", safeZonePieces);
            // liveRoom.gameState.currentPlayer = (liveRoom.gameState.currentPlayer  + 1) % 4;

        }
        return true;
    }
}

const initializePiece = (liveRoom) => {
    const startingPos = { red: 4, blue: 19, green: 49, yellow: 34 }
    const { players, activePieces, currentPlayer } = liveRoom.gameState;
    const player = players[currentPlayer];
    for (let i = 0; i < player.pieces.length; i++) {
        if (player.pieces[i].pos >= 0 || player.pieces[i].safeZonePos >= 0) {
            break;
        } else {
            liveRoom.gameState.activePieces.push(player.pieces[i]);
            // console.log("active pieces", activePieces);
            liveRoom.gameState.players[currentPlayer].pieces[i].pos = startingPos[player.pieces[i].color];
            // player.pieces[i].pos = 1;
            break;
        }
    }
}


module.exports = { onConnect };
// const io = require('../../app');
const mongoose = require('mongoose');
const passport = require('passport');
const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/rooms');
// const { default: Rooms } = require('../../frontend/src/components/main/rooms');


const onConnect = (socket, io) => {
    socket.on('create_new_room', (room) => {
        const { errors, isValid } = validateRoomInput(room);

        if (!isValid) {

        }

        const newRoom = new Room({
            roomname: room.roomname,
            user: room.user_id,
            players: [room.user_id]
        });

        //should redirect user to /room/:room_id
        newRoom.save()
        socket.join(newRoom._id);
        socket.emit("push_new_room", (newRoom));
    })

    socket.on("join_room", async ({ room, user_id }) => {
        let foundRoom = await Room.findById(room._id)
        if (!foundRoom.players.includes(user_id) && foundRoom.players.length <= 4) {
            // console.log("IO", io);
            // socket.join(foundRoom._id);
            socket.join(foundRoom._id.toString());
            foundRoom.players.push(user_id);
            console.log("foundRoom", foundRoom);
            await foundRoom.save();
            // return io.to(foundRoom._id).emit("joined_room", (room));
            return io.to(foundRoom._id.toString()).emit("joined_room", (room));
            // console.log("backend join room");
        }
        socket.emit("join_room_error", { error: "The room is full or you have already joined" });
    })

    socket.on("start_game", room => {
        const playerTeams = [{team: "red"}, {team: "blue"}, {team:  "yellow"}, {team: "green"}];
        const currentPlayer = 0;
        const redCounter = 0;
        const blueCounter = 0;
        const greenCounter = 0;
        const yellowCounter = 0;
        const setBlueCounter = (blueCounter) => {
            return blueCounter+=1;
        }
        const setGreenCounter = (greenCounter) => {
            return greenCounter+=1;
        }
        const setYellowCounter = (yellowCounter) => {
            return yellowCounter+=1;
        }
        const setRedCounter = (redCounter) => {
            return redCounter += 1;
        }
        const setCurrentPlayer = (currentPlayer) => {
           return currentPlayer = (currentPlayer + 1) % 4;
        }

        if (room.players.length === 4) {

            const startGame = () => {
                const newPlayers = room.gameState.players.map(player, idx => {
                    player.id.push(player._id);
                    player.pieces.push( [
                        {
                            safeZonePos: -1,
                            pos: -1,
                            color: playerTeams[idx]
                        },
                        {
                            safeZonePos: -1,
                            pos: -1,
                            color: playerTeams[idx]
                        },
                        {
                            safeZonePos: -1,
                            pos: -1,
                            color: playerTeams[idx]
                        }
                    ]);
                    return player;
                })
                // setActivePieces([]);
                // setSafeZonePieces([]);
                setCurrentPlayer(0);
                setBlueCounter(0);
                setRedCounter(0);
                setGreenCounter(0);
                setYellowCounter(0);
                currentPlayer = 0;
                // setPlayers(newPlayers);
                room.gameState.players = newPlayers;
                console.log("new players protocol", newPlayers);
                return io.emit("started_game", room.gameState);
            }

        }

    })

    socket.on("update_game_state", room => {

    })

    socket.on("reset_game_state", room => {

    })
}


module.exports = { onConnect };
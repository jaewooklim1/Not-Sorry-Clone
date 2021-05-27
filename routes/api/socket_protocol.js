// const io = require('../../app');
const mongoose = require('mongoose');
const passport = require('passport');
const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/rooms');
const Piece = require('../../models/Piece');
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
        if (!foundRoom.players.includes(user_id) && foundRoom.players.length < 4) {
            // console.log("IO", io);
            console.log("foundRoom", foundRoom);
            // socket.join(foundRoom._id);
            socket.join(foundRoom._id.toString());
            foundRoom.players.push(user_id);
            await foundRoom.save();
            // return io.to(foundRoom._id).emit("joined_room", (room));
            return io.to(foundRoom._id.toString()).emit("joined_room", (room));
            // console.log("backend join room");
        } 
        socket.emit("join_room_error", { error: "The room is full or you have already joined"});
    })

    socket.on("start_game", piece => {
        
    })
}


module.exports = { onConnect };
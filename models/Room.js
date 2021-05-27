const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roomname: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    headcount: {
        type: Number,
        max: [4, "Max is 4"],
        default: 1
    },
    players: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
        required: true
    },
    date: {
        type: String,
        default: Date.now,
    },
    gameState: {
        players: [{
            id: [{
                type: Schema.Types.ObjectId,
                ref: 'User'
            }],
            pieces: {
                type: [],
                default: []
            },
        }],
        activePieces: [],
        safeZonePieces: []
    }
})

module.exports = Room = mongoose.model('room', RoomSchema);
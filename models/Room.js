const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
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
        default: Date.now(),
    },
    gameActive: {
        type: Boolean,
        default: false
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now(),
    //     require: true
    // },
    gameState: {
        players: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            active: {
                type: Boolean,
                default: false
            },
            team: {
                type: String,
                default: ' ',
                required: true
            },
            pieces: [{
                pos: {
                    type: Number,
                    default: -1
                },
                safeZonePos: {
                    type: Number,
                    default: -1
                },
                color: {
                    type: String,
                },
            }]
        }],
        currentPlayer: {
            type: Number,
            default: 0
        },
        activePieces: [],
        safeZonePieces: [],
        redCounter: {
            type: Number,
            default: 0
        },
        blueCounter: {
            type: Number,
            default: 0
        },
        greenCounter: {
            type: Number,
            default: 0
        },
        yellowCounter: {
            type: Number,
            default: 0
        },
        prevDiceRoll: {
            type: Number,
            default: 0
        }
       
    }
})

module.exports = Room = mongoose.model('room', RoomSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
    date: {
        type: String,
        default: Date.now,
    }
})

module.exports = Room = mongoose.model('room', RoomSchema);
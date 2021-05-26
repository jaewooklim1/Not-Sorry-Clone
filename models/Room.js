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
        default: 1
    }

}, {
    timestamps: true
})

module.exports = Room = mongoose.model('room', RoomSchema);
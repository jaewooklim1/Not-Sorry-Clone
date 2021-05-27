const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PieceSchema = new Schema ({
    // owner: {
    //     type:  Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    safeZonePos: {
        type: Number,
        default: -1,
        required: true
    },
    pos: {
        type: Number,
        default: -1,
        required: true
    },
    color: {
        type: String,
        inclusion: ['red', 'blue', 'green', 'yellow'],
        required: true
    }
})

module.exports = Piece = mongoose.model('Piece', PieceSchema);
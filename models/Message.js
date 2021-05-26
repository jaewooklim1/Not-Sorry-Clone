const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },    
    content:  {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now,
    }
});

module.exports = Message = mongoose.model('Message', messageSchema);
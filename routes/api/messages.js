const { response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../models/Message');


router.get("/", (req, res) => {
    Message.find()
    .sort({date: -1})
    .then(message => res.send(message))
    .catch(err => console.log(err))
});

router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
    let message = new Message({
        from: req.user.id,
        content: req.body.content,
    });

    // req.io.sockets.emit('messages', req.body.content);

    message.save().then(res.send(JSON.stringify({ message: 'Success' })))
        
});

module.exports = router;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport')
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io')
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});
const { onConnect } = require('./routes/api/socket_protocol');



mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// io.on('connection', (socket) => {

//   // Get the last 10 messages from the database.
//   Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
//     if (err) return console.error(err);

//     // Send the last messages to the user.
//     socket.emit('init', messages);
//   });

//   // Listen to connected users for a new message.
//   socket.on('message', (msg) => {
//     // Create a message with the content and the name of the user.
//     const message = new Message({
//       content: msg.content,
//       name: msg.name,
//     });

//     // Save the message to the database.
//     message.save((err) => {
//       if (err) return console.error(err);
//     });

//     // Notify all other users about a new message.
//     socket.broadcast.emit('push', msg);
//   });
// });

io.on('connection',  (socket) => onConnect(socket, io));


// app.get("/", (req, res) => {

//   res.send("Hello mern sweet hahahah")
// });

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/users", users);
app.use("/api/rooms", rooms);
// app.use("/api/messages", messages);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

server.listen(port, () => console.log(`Server is running on port ${port}`));
// server.listen(port);
  
// app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = io; 
// export default io; 
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport =require('passport')
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

io
  .of("/games")
  .on("connection", (socket) => {
      socket.emit("welcome", "You are connected to games area.");
  socket.on("joinRoom", (data) => {
      let msg = JSON.parse(data);
      socket.join(msg.code);
      io.of("/games").in(msg.code)
          .emit("newUser", JSON.stringify({
              msg: `${msg.username} joined ${msg.code}`,
              username: msg.username,
              id: msg.id
          }));
  });
  socket.on("message", (data) => {
      let msg = JSON.parse(data);
      io.of("games").in(msg.room).emit("message", msg);
  });
});
  
app.get("/", (req, res) => {
    
  res.send("Hello mern sweet hahahah")
});
  
app.use(passport.initialize());
require('./config/passport')(passport);

app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json());

app.use("/api/users", users);
app.use("/api/rooms", rooms);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

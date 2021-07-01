import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../app";
import "../../styling/rooms.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { fetchRooms } from "../../actions/room_actions";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 15,
        backgroundColor: "black",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 25,
        color: "white",
        height: 50,
    },
    pos: {
        marginBottom: 12,
    },
    cardContent: {
        textAlign: "center",
        fontSize: 150,
    },
});

const RoomIndexItem = ({ room, currentUser }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user_id = useSelector((store) => store.session.user.id);

    // console.log("room from room index item", room);
    // console.log("currentUser", currentUser);
    const renderDelete = () => {
        return (
            <button className="delete-rooms-button"
                onClick={() => {
                    // console.log("Click")
                    // console.log("room to remove", { room, currentUser });
                    socket.emit("remove_room", { room, currentUser });
                    // dispatch(fetchRooms());
                }}> 
                Delete Room
            </button>
        )
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <div className="card-background-image">
                    <div
                        className="individual-rooms"
                        onClick={() => {
                            // console.log("ON CLICK");
                            if (Object.values(room.players).includes(currentUser.id) || room.players.length < 4) {
                                socket.emit("join_room", { room, user_id });
                            } else {
                                alert("Room is full");
                            }
                        }}
                    >
                        <li>
                            <Typography className={classes.title} color="textSecondary">
                                {room.roomname}
                                <br></br>
                                {`Players ${room.players.length}/4`}
                            </Typography>
                        </li>

                    </div>
                      {/* {room.players[0] === currentUser.id ? renderDelete() : ""} */}
                      {renderDelete()}
                </div>
            </CardContent>
        </Card>
    );
};

export default RoomIndexItem;

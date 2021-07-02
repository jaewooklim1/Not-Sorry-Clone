import React from "react";
import RoomIndexItem from "./room_index_item";
import Splash from "./splash";
import NavBarContainer from "../nav/navbar_container";
import "../../styling/rooms.scss";
import { Link, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import equal from 'fast-deep-equal';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
// }));

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: this.props.rooms
    }
  }

  componentDidMount() {
    this.props.fetchRooms();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.rooms !== this.props.rooms;
  }

  render() {
    // console.log(this.props.rooms)
    let { rooms, currentUser } = this.props;
    if (!rooms) {
      return null;
    }
    // const classes = useStyles();
    return (
      
      <div className="whole-page">
        <div className="sorry-banner" style={{ position: "relative" }}>
          <div className="sorry-logo-container">
            
          </div>
          

          <NavBarContainer />
        </div>
        <div className="rooms-page-text"> Not Sorry Lobby</div>
        <br></br>
        <div className="button-add-room">
          <button
            onClick={() => {
              // console.log("on click");
              this.props.openModal({ modal: "addRoom" });
            }}
            className="btn third"
          >
            Add Room
          </button>
        </div>
        <div className="rooms-window">
          <ul>
            <Grid container style={{ justifyContent: "center" }}>
              {rooms.map((room) => (
                <Grid item>
                  <RoomIndexItem key={room._id} room={room} currentUser={currentUser} deleteRoom={this.props.deleteRoom}/>{" "}
                </Grid>
              ))}
            </Grid>
          </ul>
        </div>
      </div>
      
    );
  }
}

export default Rooms;

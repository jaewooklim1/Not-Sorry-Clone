import React from "react";
import RoomIndexItem from "./room_index_item";
import Splash from "./splash";
import NavBarContainer from "../nav/navbar_container";
import "../../styling/rooms.scss";
import { Link, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
  }

  componentDidMount() {
    this.props.fetchRooms();
  }

  // componentDidUpdate(prevProps){
  //   if(this.props.rooms !== prevProps.rooms){
  //     this.props.fetchRooms();
  //   }
  // }

  render() {
    // console.log(this.props.rooms)
    let { rooms, currentUser } = this.props;
    if (!rooms) {
      return null;
    }
    // const classes = useStyles();
    return (
      // <Splash>
      <div className="whole-page">
        <div className="sorry-banner" style={{ position: "relative" }}>
          <div className="sorry-logo-container">
            {/* <img
              className="sorry-logo-transparent"
              src="https://i.imgur.com/DlHwK47.png"
            /> */}
          </div>
          {/* <Link exact to="/" className='"Home-button'>
            Home
          </Link> */}

          <NavBarContainer />
        </div>
        <div className="rooms-page-text">Sorry Lobby</div>
        <br></br>
        <div className="button-add-room">
          <Button
            variant="contained"
            onClick={() => {
              console.log("on click");
              this.props.openModal({ modal: "addRoom" });
            }}
          >
            Add Room
          </Button>
        </div>
        <div className="rooms-window">
          <ul>
            <Grid container style={{ justifyContent: "center" }}>
              {rooms.map((room) => (
                <Grid item>
                  <RoomIndexItem key={room._id} room={room} currentUser={currentUser} />{" "}
                </Grid>
              ))}
            </Grid>
          </ul>
        </div>
      </div>
      // </Splash>
    );
  }
}

export default Rooms;

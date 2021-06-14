import React from "react";
import "../../styling/rooms.scss";

class AddRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.room;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const room = Object.assign({}, this.state);
    this.props.createRoom(room);
    this.props.closeModal();
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  render() {
    return (
      <div className="add-room-modal">
        <h2>Create New Room</h2>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label>
            Room Name:
            <input
              type="text"
              value={this.state.roomname}
              onChange={this.update("roomname")}
            />
          </label>
          <br></br>
          <input className="create-room-btn" type="submit" value="Create Room" />
        </form>
      </div>
    );
  }
}
export default AddRoom;

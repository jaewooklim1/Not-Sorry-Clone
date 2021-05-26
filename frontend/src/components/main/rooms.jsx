import React from 'react';
import RoomIndexItem from './room_index_item'; 

class Rooms extends React.Component {
  constructor(props){ 
    super(props);
  }

  componentDidMount(){ 
    this.props.fetchRooms(); 
  }

  // componentDidUpdate(prevProps){ 
  //   console.log(this.props.rooms);
  //   console.log(prevProps.rooms);
  //   debugger

  //   if(this.props.rooms !== prevProps.rooms){ 
  //    this.props.fetchRooms(); 
  //   }
  // }

  render() {
    // console.log(this.props.rooms)
    let {rooms}= this.props
    if (!rooms){ 
      return null;
    }
    return (
      <div>
        <h1>This is the rooms page</h1>
        <button onClick={() => this.props.openModal({modal: 'addRoom'})}>Add Room</button>
        <ul>
          { 
          rooms.map(room => <RoomIndexItem room={room}  key={room._id}/>)
          }
        </ul>
      </div>
    );
  }
}

export default Rooms;
import React from 'react'; 
import {Link} from 'react-router-dom';
import '../../styling/room_show_page.scss';  

class RoomShowPage extends React.Component{ 
    constructor(props){ 
        super(props);
        // this.state = {
        //     players: this.props.rooms.data.players
        // };  
        this.exitRoom = this.exitRoom.bind(this); 
        // this.idToName = this.idToName.bind(this);
    }

    componentDidMount(){ 
        this.props.fetchRoom(this.props.roomId);
        this.props.fetchUsers();
        
    }

    exitRoom(e){ 
        // e.preventDefault(); 
        const index = this.props.rooms.data.players.indexOf(this.props.userId);
        if (index > -1) {
        this.props.rooms.data.players.splice(index, 1);
        }
    }

    render(){ 
        // console.log(this.props); 
        // console.log(this.state); 
        let {rooms, roomId, userId, users} = this.props;

        if(!rooms.data){
            return null;
        }
        // console.log(Object.values(rooms.data.players));
        // console.log(roomId);
        // console.log(userId);
        // // console.log(userId);
        // console.log(rooms.data.players);
        console.log(users.data);

        function idToName(id) {

            if(!users.data) {
                return null;
            }

            let username = "";
            let i = 0;
            while (i <= users.data.length) {
                let user = users.data[i];
                if (user._id === id ) {
                    username = user.username;
                    break;
                }
                i++
            }
    
            return username;
    
        }
    
        return( 
            <div>
                <header className="back">
                    <Link to='/rooms' onClick={() => this.exitRoom()} >
                        Back to Lobby
                    </Link>
                </header>
                <div className="game-box">
                    <div className="players">    
                    </div>
                    <ul>
                        {
                            rooms.data.players.map(playerId => {
                                return (
                                    <div>
                                        <p key ={playerId.id} >
                                            {
                                            idToName(playerId)
                                            }
                                        </p>
                                    </div>
                                )
                            } )
                        }
                    </ul>
                    <div className="gameboard">
                    </div>
                </div>
                <p>This is the show page of a Room</p>
                <p>Should have a board in here</p>
            </div>
        )
    }
}

export default RoomShowPage; 
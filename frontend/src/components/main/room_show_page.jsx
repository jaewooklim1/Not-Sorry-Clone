import React from 'react'; 
import {Link} from 'react-router-dom';
import '../../styling/room_show_page.scss';  

class RoomShowPage extends React.Component{ 
    constructor(props){ 
        super(props);
        this.state= {
            rooms: this.props.rooms
        };  
        // this.exitRoom= this.exitRoom.bind(this); 
    }

    componentDidMount(){ 
        this.props.fetchRoom(this.props.roomId)
    }

    // exitRoom(e){ 
    //     e.preventDefault(); 
    //     const index = this.state.players.indexOf(this.props.userId);
    //     if (index > -1) {
    //     this.state.players.splice(index, 1);
    //     }
    // }

    render(){ 
        console.log(this.props); 
        console.log(this.state.players); 
        return( 
            <div>
                <header className="back">
                    <Link to='/rooms' >
                        Back to Lobby
                    </Link>
                </header>
                <div className="game-box">
                    <div className="players">    
                    </div>
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
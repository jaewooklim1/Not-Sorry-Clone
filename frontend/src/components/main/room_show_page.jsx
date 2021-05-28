<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styling/room_show_page.scss';
import { socket } from '../app';
import Game from '../games/Game';
=======
import React from 'react'; 
import {Link, NavLink} from 'react-router-dom';
import '../../styling/room_show_page.scss';  
>>>>>>> 2403541a8a269c486d905e2cfd7caaa2885ed598

class RoomShowPage extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = {
            room: this.props.liveRoom
        };

        console.log("From constructor",this.props.rooms);
        // this.exitRoom= this.exitRoom.bind(this); 
    }

    componentDidMount() {
        socket.emit("get_room", this.props.roomId);
        this.props.fetchRoom(this.props.roomId)
=======
        // this.state = {
        //     players: this.props.rooms.data
        // };  
        this.exitRoom = this.exitRoom.bind(this); 
        // this.idToName = this.idToName.bind(this);
    }

    componentDidMount(){ 
        this.props.fetchRoom(this.props.roomId);
        this.props.fetchUsers();
        
>>>>>>> 2403541a8a269c486d905e2cfd7caaa2885ed598
    }

    exitRoom(e){ 
        // e.preventDefault(); 
        const index = this.props.rooms.data.players.indexOf(this.props.userId);
        if (index > -1) {
        this.props.rooms.data.players.splice(index, 1);
        }
    }

<<<<<<< HEAD

    render() {
        const { rooms } = this.props;
        if (!this.props.liveRoom) return null;
        console.log("room", rooms);
        if (!this.props.rooms) return null;
        console.log("props from show room", this.props);
        console.log(this.state.players);

        const renderBoard = () => {
            this.props.liveRoom.gameState.players.length === 0 ? socket.emit("start_game", this.props.liveRoom) : console.log("game in progress");
            return <Game/>;
        }

        const renderShow = () => {
            return (
                <>
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
                    <button onClick={() => {
                        // console.log("ON CLICK", this.props.rooms); 
                        socket.emit("start_game", this.props.liveRoom)
                        }}>
                        start the game
                    </button> 
                </>
            )
        }
        // console.log("live room from render", this.props.liveRoom.players);
        return (
            <div>
                {this.props.liveRoom.players.length === 4 ? renderBoard() : renderShow()}
                {/* <header className="back">
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

                    <button onClick={() => {
                        // console.log("ON CLICK", this.props.rooms); 
                        socket.emit("start_game", this.props.liveRoom)
                        }}>
                        start the game
                    </button> */}
           </div>
=======
    render(){ 
        // console.log(this.props); 
        console.log(this.state); 
        let {rooms, roomId, userId, users} = this.props;

        if(!rooms.data){
            return null;
        }
        // console.log(Object.values(rooms.data.players));
        // console.log(roomId);
        // console.log(userId);
        // // console.log(userId);
        // console.log(rooms.data.players);
        // console.log(users.data);

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
        const startbtn= ()=> { 
            if(rooms.data.players.length=== 4){ 
                return (
                    <NavLink to="/game" className="btn third game-btn">Start Game</NavLink>
                )
            }
        }
        return( 
            <div>
                <header className="back">
                    <NavLink className="btn third" to='/rooms' onClick={() => this.exitRoom()} >
                        Back to Lobby
                    </NavLink>
                </header>
                <div className="game-box">
                       
                    <ul className="players">
                        {
                            rooms.data.players.map(playerId => {
                                return (
                                    <div className="player-ctn">
                                        <p className="player-name" key ={playerId.id} >
                                            {
                                            idToName(playerId)
                                            }
                                        </p>
                                    </div>
                                )
                            } )
                        }
                    </ul>
                    {startbtn()}
                </div>
            </div>
>>>>>>> 2403541a8a269c486d905e2cfd7caaa2885ed598
        )
    }
}

export default RoomShowPage;
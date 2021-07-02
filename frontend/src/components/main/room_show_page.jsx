import '../../styling/room_show_page.scss';
import { socket } from '../app';
import Game from '../games/Game';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styling/room_show_page.scss';

class RoomShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: this.props.liveRoom,

        };

        // console.log("From constructor", this.props.rooms);
        this.exitRoom = this.exitRoom.bind(this);
    }

    componentDidMount() {
        socket.emit("get_room", this.props.roomId);
        // this.props.fetchRoom(this.props.roomId)
        this.props.fetchUsers();

        // this.exitRoom = this.exitRoom.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("currState", room);
        // console.log("prevProps", prevProps);
        // console.log("prevState", prevState);
        // console.log("currProps", this.props);
        // if (!this.props.liveRoom) {
        //     return;
        // }
        // if(!prevState) {
        //     return null;
        // }
        // if (this.props.liveRoom.players !== prevState.players) {
        //     this.props.fetchUsers();
        // }
    }

    exitRoom(e) {
        // e.preventDefault(); 
        const index = this.props.rooms.data.players.indexOf(this.props.userId);
        if (index > -1) {
            this.props.rooms.data.players.splice(index, 1);
        }
    }


    render() {

        const { rooms } = this.props;
        let { roomId, userId, users } = this.props;

        if (!this.props.liveRoom) return null;

        // if (!rooms.data) {
        //     return null;
        // }
        // console.log("room", rooms);
        if (!this.props.rooms) return null;
        // console.log("props from show room", this.props);
        // console.log(this.state.players);

        function idToName(id) {

            if (!users) {
                return null;
            }

            let username = "";
            let i = 0;
            while (i <= users.length) {
                let user = users[i];
                if (user._id === id) {
                    username = user.username;
                    break;
                }
                i++
            }

            return username;

        }


        const renderBoard = () => {
            if (!this.props.liveRoom.gameState.players.length) {
                return (
                    <button className="start-game-btn btn third" onClick={() => socket.emit("start_game", this.props.liveRoom)}>
                        Start Game
                    </button>
                )
            }
            // this.props.liveRoom.gameState.players.length === 4 ? socket.emit("start_game", this.props.liveRoom) : console.log("game in progress");
            return <Game users={this.props.users}/>;
        }

        const renderShow = () => {
            return (
                <>
                    <header className="back">
                        <NavLink className="btn third" to='/rooms' >
                            Back to Lobby
                        </NavLink>
                    </header>
                    <div className="game-box">

                        <div className="game-colors">
                            <div className="red">
                                <h3>Red Team</h3>
                            </div> 
                            <div className="blue">
                                <h3>Blue Team</h3>
                            </div> 
                            <div className="yellow">
                                <h3>Yellow Team</h3>
                            </div> 
                            <div className="green">
                                <h3>Green Team</h3>
                            </div> 
                        </div>

                        <ul className="players">

                            {
                                this.props.liveRoom.players.map((playerId, index) => {
                                    return (
                                        <div key={playerId} className={`player-ctn pos-${index}`}>
                                            <p className="player-name" key={playerId.id} >
                                                {
                                                    idToName(playerId)
                                                }
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                        {/* {startbtn()} */}
                    </div>

                </>
            )
        }
        // const startbtn = () => {
        //     if (rooms.data.players.length === 4) {
        //         return (
        //             <button onClick={() => socket.emit("start_game", this.props.liveRoom)}>
        //                 Start Game
        //             </button>
        //         )
        //     }
        //     // }


        // }    // console.log("live room from render", this.props.liveRoom.players);
        return (
            <div>
                {this.props.liveRoom.players.length === 4 ? renderBoard() : renderShow()}
            </div>
        )

    }
}
export default RoomShowPage;


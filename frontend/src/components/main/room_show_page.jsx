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

            if (!users.data) {
                return null;
            }

            let username = "";
            let i = 0;
            while (i <= users.data.length) {
                let user = users.data[i];
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
                    <button onClick={() => socket.emit("start_game", this.props.liveRoom)}>
                        Start Game
                    </button>
                )
            }
            // this.props.liveRoom.gameState.players.length === 4 ? socket.emit("start_game", this.props.liveRoom) : console.log("game in progress");
            return <Game users={this.props.users} />;
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

                        <ul className="players">

                            <h3> Current Players: </h3>
                            {
                                this.props.liveRoom.players.map((playerId, index) => {
                                    return (
                                        <div className={`player-ctn pos-${index}`}>
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
                        <div className="start-game-button-cont">
                            {startbtn()}
                        </div>
                    </div>

                </>
            )
        }
        const startbtn = () => {
            return (
                <button onClick={() => socket.emit("start_game", this.props.liveRoom)}>
                    Start Game
                </button>
            )
        }


        // }    // console.log("live room from render", this.props.liveRoom.players);
        return (
            <div>
                {this.props.liveRoom.gameActive === true ? renderBoard() : renderShow()}
                {/* {renderShow()} */}
            </div>
        )

    }
}
export default RoomShowPage;


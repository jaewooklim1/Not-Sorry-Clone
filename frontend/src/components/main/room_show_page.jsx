import React from 'react';
import { Link } from 'react-router-dom';
import '../../styling/room_show_page.scss';
import { socket } from '../app';
import Game from '../games/Game';

class RoomShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: this.props.liveRoom
        };

        console.log("From constructor",this.props.rooms);
        // this.exitRoom= this.exitRoom.bind(this); 
    }

    componentDidMount() {
        socket.emit("get_room", this.props.roomId);
        this.props.fetchRoom(this.props.roomId)
    }

    // exitRoom(e){ 
    //     e.preventDefault(); 
    //     const index = this.state.players.indexOf(this.props.userId);
    //     if (index > -1) {
    //     this.state.players.splice(index, 1);
    //     }
    // }


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
        )
    }
}

export default RoomShowPage;
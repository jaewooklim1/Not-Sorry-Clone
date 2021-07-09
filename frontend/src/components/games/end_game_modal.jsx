import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import { openModal } from '../../actions/modal_actions';
import { socket } from '../app';
import './end_game_modals.css';


const EndModal = (props) => {

    const playerId = useSelector(state => (state.session.user.id))
    const liveRoom = useSelector(state => (state.entities.liveRoom.liveRoom));
    const history = useHistory();

    const showWinner = () => {
        if (props.redCount === 1) {
            return (
                <div className="winner">
                    <p>
                        Red Team Wins!
                    </p>
                </div>
            )
        } else if (props.blueCount === 1) {
            return (
                <div className="winner">
                    <p>
                        Blue Team Wins!
                    </p>
                </div>
            )
        } else if (props.greenCount === 1) {
            return (
                <div className="winner">
                    <p>
                        Green Team Wins!
                    </p>
                </div>
            )
        } else if (props.yellowCount === 1) {
            return (
                <div className="winner">
                    <p>
                        Yellow Team Wins!
                    </p>
                </div>
            )
        }
    }

    const exitGame = () => {
        socket.emit("exit_game", { playerId, liveRoom });
        history.push('/rooms');
    }

    return (
        <div className="page-container">
            <div className="end-modal-container">
                <div className="end-modal-content">
                    {showWinner()}

                    <div className="restart-exit-container">
                        <div className="restart-game-button" onClick={() => socket.emit("start_game", liveRoom)}>
                            <p>
                                Restart Game
                            </p>
                        </div>
                        <div className="end-exit-game-button" onClick={() => exitGame()}>
                            <p>
                                Exit Game
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EndModal;
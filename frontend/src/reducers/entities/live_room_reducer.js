import {
    RECEIVE_LIVE_ROOM,
    END_OF_GAMES,
    START_GAME,
    NEW_PLAYERS
} from '../../actions/live_room_actions';

const liveRoomReducer = (state = {}, action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state); 
    switch (action.type) {
        case RECEIVE_LIVE_ROOM:
            let correctPlayers = [...action.room.gameState.players];
            correctPlayers = correctPlayers.map(player => {
                player.pieces = player.pieces.map(piece => {
                    // console.log("new piece pos", piece.pos % 60)
                    if (piece.pos > 59) {

                        return { ...piece, pos: piece.pos % 60 };
                    } else {
                        return piece;
                    }
                })
                return player;
            })
            action.room.gameState.players = correctPlayers;
            return { ...state, liveRoom: action.room, gameover: false };
        case END_OF_GAMES:
            return { ...state, liveRoom: action.liveRoom, gameover: true };
        case START_GAME:
            return { ...state, liveRoom: action.liveRoom, gameover: false };
        default:
            return state;
    }
}

export default liveRoomReducer;


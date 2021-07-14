export const RECEIVE_LIVE_ROOM = 'RECEIVE_LIVE_ROOM';
export const END_OF_GAMES = 'END_OF_GAMES';
export const START_GAME = 'START_GAME';
export const NEW_PLAYERS = 'NEW_PLAYERS';

export const receiveLiveGame = (room) => {
    return ({
        type: RECEIVE_LIVE_ROOM,
        room
    })
}

export const endGame = (liveRoom) => {
    return ({
        type: END_OF_GAMES,
        liveRoom
    })
}

export const receiveNewPlayer = (liveRoom) => {
    return ({
        type: NEW_PLAYERS,
        liveRoom
    })
}

export const startGame = liveRoom => {
    return ({
        type: START_GAME,
        liveRoom
    })
}
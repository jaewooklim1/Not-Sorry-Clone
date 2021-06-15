import React from 'react';
import Board from './Board'


const Game = (props) => {
    if(!props.users) {
        return null;
    }
    return (
       
        <div>
            <Board users={props.users}/>
        </div>
    )
}

export default Game;
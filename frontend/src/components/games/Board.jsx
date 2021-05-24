import React, { useState } from 'react';
import './board.css';

const dummyArr = new Array(60).fill(1);

const Board = (props) => {

    const [pos, setPos] = useState(-1);
    
    const rollDice = () => {
       const dieOne = Math.floor(Math.random()*(7 - 1) + 1);
       const dieTwo = Math.floor(Math.random()*(7 - 1) + 1);

       return [dieOne, dieTwo];
    }

    // console.log(rollDice());
    // console.log(rollDice());
    // console.log(rollDice());
    // console.log(rollDice());
    
    return (
        <div className="board-container">
            <div className="tiles-container">
                {
                    dummyArr.map(tile => (
                        <div className="board-tile">
                            X
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Board;
import React from 'react';
import { useSelector } from 'react-redux';
import "./board.css";

const Tile = ({ idx }) => {
    let tileStyleObj = {};
    const piece = useSelector(state => {

        if (idx === "blue") {
            const startPieces = state.entities.liveRoom.liveRoom.gameState.players[1].pieces.filter(piece => {
                if (piece.pos === -1) {
                    return true;
                }
            })
            return startPieces[0];
        } else if (idx === "red") {
            const startPieces = state.entities.liveRoom.liveRoom.gameState.players[0].pieces.filter(piece => {
                if (piece.pos === -1) {
                    return true;
                }
            })
            return startPieces[0];
        } else if (idx === "yellow") {
            const startPieces = state.entities.liveRoom.liveRoom.gameState.players[2].pieces.filter(piece => {
                if (piece.pos === -1) {
                    return true;
                }
            })
            return startPieces[0];
        } else if (idx === "green") {
            const startPieces = state.entities.liveRoom.liveRoom.gameState.players[3].pieces.filter(piece => {
                if (piece.pos === -1) {
                    return true;
                }
            })
            return startPieces[0];
        } else if (typeof idx !== Number && idx !== undefined) {
            const safeZone = JSON.parse(idx);
            if (safeZone.color) {
                if (safeZone.color === "blue") {
                    const safeZonePiece = state.entities.liveRoom.liveRoom.gameState.players[1].pieces.filter(piece => {
                        if (piece.safeZonePos === safeZone.pos) {
                            return true;
                        }
                    })
                    tileStyleObj.backgroundColor = "lightBlue"
                    return safeZonePiece[0];
                } else if (safeZone.color === "green") {
                    const safeZonePiece = state.entities.liveRoom.liveRoom.gameState.players[3].pieces.filter(piece => {
                        if (piece.safeZonePos === safeZone.pos) {
                            return true;
                        }
                    })
                    tileStyleObj.backgroundColor = "lightGreen"
                    return safeZonePiece[0];
                } else if (safeZone.color === "red") {
                    const safeZonePiece = state.entities.liveRoom.liveRoom.gameState.players[0].pieces.filter(piece => {
                        if (piece.safeZonePos === safeZone.pos) {
                            return true;
                        }
                    })
                    tileStyleObj.backgroundColor = "pink"
                    return safeZonePiece[0];
                } else if (safeZone.color === "yellow") {
                    const safeZonePiece = state.entities.liveRoom.liveRoom.gameState.players[2].pieces.filter(piece => {
                        if (piece.safeZonePos === safeZone.pos) {
                            return true;
                        }
                    })
                    tileStyleObj.backgroundColor = "gold"
                    return safeZonePiece[0];
                }
            }
        }
        let arr = [];
        state.entities.liveRoom.liveRoom.gameState.players.forEach(player => {
            player.pieces.forEach(piece => {
                if (piece.pos === idx) {
                    arr.push(piece);
                }
            })
        })
        return arr[0];
    })

    return (
        <div style={idx !== undefined ? { backgroundColor: 'orange', ...tileStyleObj } : { ...tileStyleObj }} className="board-tile">

            { piece ? <div style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: piece.color }}></div> : <></>}
        </div>
    )
}

export default Tile;
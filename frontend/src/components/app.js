import React, { useEffect } from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import RoomsContainer from './main/rooms_container';
import RoomShowPage from './main/room_show_container';
import Splash from './main/splash';
import Modal from './modal/modal';
import socketIOClient from 'socket.io-client';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { receiveNewRoom } from '../actions/room_actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Game from './games/Game';
import { receiveLiveGame, startGame, endGame } from '../actions/live_room_actions';
import { fetchRooms } from '../actions/room_actions'
import './reset.scss';
export const socket = io.connect('http://localhost:5000');
// export const socket = io.connect('https://not-sorry.herokuapp.com/');


socket.connect();

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect( () => {
        
        // socket.on("test", (test) => {
        //     console.log("message from server", test);
        // })

        socket.on("push_new_room", (room) => {
            dispatch(receiveNewRoom(room))
            history.push(`/rooms/${room._id}`)
        })

        socket.on("add_new_room", (room) => {
            dispatch(receiveNewRoom(room))
        })

        socket.on("joined_room", (room) => {
            // console.log("FRONT END WOOWWOWOWOOWOW")
            history.push(`/rooms/${room._id}`)
        })

        socket.on("join_room_error", ({error})=> {
            console.log(error);
        })

        socket.on("started_game", liveRoom => {
            // console.log("gamestate from frontend", liveRoom);
            dispatch(startGame(liveRoom));
        })

        socket.on("got_room", room => {
            // console.log("got room from frontend", room);
            dispatch(receiveLiveGame(room));
        })

        socket.on("updated_game_state", liveRoom => {
            // console.log("update_game_state liveRoom", liveRoom);
            dispatch(receiveLiveGame(liveRoom));
        })

        socket.on("end_game", liveRoom => {
            dispatch(endGame(liveRoom));
        }) 

        socket.on("update_rooms", () => {
            // console.log("updating rooms");
            dispatch(fetchRooms());
        })

        // socket.on("tester_msg", msg => {
        //     console.log(msg);
        // })

    }, []);

    return (

        <div>
            
            <Modal />
            
            <Switch>
                
                <Route exact path="/" component={Splash} />
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />
                <ProtectedRoute path="/rooms/:roomId" component={RoomShowPage} />
                <ProtectedRoute path="/rooms" component={RoomsContainer} />
                <Route exact path="/game" component={Game}/>
                
            </Switch>
        </div>
    )
};

export default App;
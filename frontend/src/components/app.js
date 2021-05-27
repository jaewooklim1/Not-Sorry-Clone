import React, { useEffect } from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import RoomsContainer from './main/rooms_container'
import Splash from './main/splash';
import Modal from './modal/modal';
import socketIOClient from 'socket.io-client';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { receiveNewRoom } from '../actions/room_actions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import Game from './games/Game';
export const socket = io.connect('http://localhost:5000');

socket.connect();

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect( () => {
        
        socket.on("test", (test) => {
            console.log("message from server", test);
        })

        socket.on("push_new_room", (room) => {
            dispatch(receiveNewRoom(room))
            history.push(`/rooms/${room._id}`)
        })

        socket.on("joined_room", (room) => {
            console.log("FRONT END WOOWWOWOWOOWOW")
            history.push(`/rooms/${room._id}`)
        })

        socket.on("join_room_error", ({error})=> {
            console.log(error);
        })

    }, []);

    return (

        <div>
            <Modal />
            <NavBarContainer />
            <Switch>
                <Route exact path="/" component={Splash} />
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />
                <ProtectedRoute path="/rooms" component={RoomsContainer} />
                {/* <Route exact path="/game" component={Game}/> */}
            </Switch>
        </div>
    )
};

export default App;
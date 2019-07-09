import React, { Fragment, useState, useEffect } from 'react';
import Register from './Register';
import Dashboard from './Dashboard';
import Snackbar, { openSnackbar } from './utils/Snackbar';

import io from 'socket.io-client';
import { USER_CONNECTED, USER_DISCONNECTED, LOGOUT } from '../Events';

const SOCKET_URL = "localhost:5001";

const Index = (props) => {

    const [socket, setSocket] = useState('');
    const [loggedIn, setLogin] = useState(false);

    const register = (username, email) => {
        if (username === '' || username === undefined || username === null) {
            openSnackbar({ message: "Please enter username", variant: "info" });
        } else if (email === '' || email === undefined || email === null) {
            openSnackbar({ message: "Please enter password", variant: "info" });
        } else {
            const user = {
                username: username,
                email: email
            }
            socket.emit(USER_CONNECTED, user);
            setLogin(true);
        }
    }

    useEffect(() => {
        initSocket();
    }, []);

    const initSocket = () => {
        const socket = io(SOCKET_URL);
        socket.on('connect', () => {
            console.log(`Connected SocketId - ${socket.id}`);
        });
        setSocket(socket);
    }

    /* const logout = () => {
        socket.emit(LOGOUT);
        setLogin(false);
    } */

    return (
        <Fragment>
            <Snackbar />
            {loggedIn ? <Dashboard socket={socket} /> : <Register register={register} socket={socket} />}
        </Fragment>
    );
}

export default Index;
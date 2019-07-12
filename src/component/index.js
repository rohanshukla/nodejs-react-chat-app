import React, { Fragment, Component } from 'react';
import Register from './Register';
import Dashboard from './Dashboard';
import Snackbar, { openSnackbar } from './utils/Snackbar';

import io from 'socket.io-client';
import { USER_CONNECTED, USER_DISCONNECTED, LOGOUT, MESSAGE_RECEIVED } from '../Events';

const SOCKET_URL = ":5001";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            loggedIn: false,
            chats: []
        }
        this.socket = io(SOCKET_URL);
    }

    register = (username, email) => {
        if (username === '' || username === undefined || username === null) {
            openSnackbar({ message: "Please enter username", variant: "info" });
        } else if (email === '' || email === undefined || email === null) {
            openSnackbar({ message: "Please enter password", variant: "info" });
        } else {
            const user = {
                username: username,
                email: email
            }
            this.socket.emit(USER_CONNECTED, user);
            this.setState({
                loggedIn: true
            });
        }
    }

    /* logout = () => {
       socket.emit(LOGOUT);
       setLogin(false);
   } */

    initSocket = () => {
        this.socket.on('connect', () => {
            console.log(`Connected SocketId - ${this.socket.id}`);
        });

        this.socket.on(MESSAGE_RECEIVED, (data) => {
            console.log(data);
            this.setState((prevState) => {
                return {
                    chats: [...prevState.chats, data]
                }
            });
        });
    }

    componentDidMount() {
        this.initSocket();
    }

    render() {
        return (
            <Fragment>
                <Snackbar />
                {this.state.loggedIn ? <Dashboard socket={this.socket} chats={this.state.chats} updateMessages={this.updateMessages} /> : <Register register={this.register} socket={this.state.socket} />}
            </Fragment>
        );
    }
}

export default Index;
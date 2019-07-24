import React, { Fragment, Component } from 'react';
import Register from './Register';
import Dashboard from './Dashboard';
import Snackbar, { openSnackbar } from './utils/Snackbar';

import io from 'socket.io-client';
import { USER_CONNECTED, USER_DISCONNECTED, LOGOUT, MESSAGE_RECEIVED, ALL_USER, ALIVE } from '../Events';

// const SOCKET_URL = ":5001";
const SOCKET_URL = "socket-nodejs-chat.herokuapp.com";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            loggedIn: false,
            chats: [],
            users: []
        }
        this.socket = io(SOCKET_URL);
    }

    register = (username) => {
        if (username === '' || username === undefined || username === null) {
            openSnackbar({ message: "Please enter username", variant: "info" });
        } else {
            if (this.state.users.includes(username)) {
                openSnackbar({ message: "Username not available", variant: "info" });
            } else {
                this.socket.emit(USER_CONNECTED, username);
                this.setState({
                    loggedIn: true
                });
            }
        }
    }

    /* logout = () => {
       socket.emit(LOGOUT);
       setLogin(false);
   } */

    initSocket = () => {
        this.socket.on('connect', () => {
            console.log(`Connected SocketId - ${this.socket.id}`);
            setInterval(() => {
                this.socket.emit(ALIVE, this.socket.id);
            }, 1500);
        });

        this.socket.on(MESSAGE_RECEIVED, (data) => {
            this.setState((prevState) => {
                return {
                    chats: [...prevState.chats, data]
                }
            });
        });

        this.socket.on(ALL_USER, (data) => {
            this.setState({
                users: data
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
                {this.state.loggedIn ? <Dashboard socket={this.socket} users={this.state.users} chats={this.state.chats} updateMessages={this.updateMessages} /> : <Register register={this.register} socket={this.state.socket} />}
            </Fragment>
        );
    }
}

export default Index;
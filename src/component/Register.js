import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar, { openSnackbar } from './utils/Snackbar';

import io from 'socket.io-client';
import { USER_CONNECTED, USER_DISCONNECTED, LOGOUT } from '../Events';


const styles = theme => ({
    root: {

    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: "#000000",
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            height: '50vh'
        }
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            height: '50vh'
        }
    },
    logoImage: {
        width: '300px',
        height: '300px',
        margin: '10px 0',
        [theme.breakpoints.down('sm')]: {
            width: '200px',
            height: '200px',
        }
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: '50px',
        fontWeight: '700',
        [theme.breakpoints.down('sm')]: {
            fontSize: '40px',
        },
        '&::after': {
            display: 'block',
            width: '4em',
            height: '3px',
            background: '#51e3d4',
            content: '" "',
            margin: '5px auto',
            borderRadius: '2px'
        }
    },
    headingText: {
        margin: '10px 0',
        fontSize: '30px',
        fontWeight: '400',
        [theme.breakpoints.down('sm')]: {
            fontSize: '25px',
        },
        '&::after': {
            display: 'block',
            width: '2em',
            height: '3px',
            backgroundColor: '#ff9933',
            content: '" "',
            margin: '2px auto',
            borderRadius: '2px'
        }
    },
    textField: {
        width: '40%',
        margin: '10px 0',
        [theme.breakpoints.down('sm')]: {
            width: '70%',
        }
    },
    button: {
        margin: '10px 0',
        color: '#FFFFFF',
        backgroundColor: '#ff9933',
        '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#e67300'
        }
    }
});

const SOCKET_URL = "localhost:5000";
const Register = (props) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [socket, setSocket] = useState('');
    const [user, setUser] = useState('');
    const [chat, setChat] = useState('');

    const inputChangeHandler = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value);
        } else if (event.target.name === 'email') {
            setEmail(event.target.value);
        } else {
            setChat(event.target.value);
        }
    }

    const register = () => {
        if (username === '') {
            openSnackbar({ message: "Please enter username", variant: "info" });
        } else if (email === '') {
            openSnackbar({ message: "Please enter password", variant: "info" });
        } else {
            setUser({
                username: username,
                email: email
            });
            socket.emit(USER_CONNECTED, user);
        }
    }

    useEffect(() => {
        initSocket();
    }, []);

    const initSocket = () => {
        const socket = io(SOCKET_URL);
        socket.on('connect', () => {
            console.log("Connected");
        });
        setSocket(socket);
    }

    /* const logout = () => {
        socket.emit(LOGOUT);
        setUser('');
    } */

    const { classes } = props;
    return (
        <Fragment>
            <section className={classes.root}>
                <Snackbar />
                <Grid container>
                    <Grid item xs={12} sm={12} lg={6}>
                        <div className={classes.leftContainer}>
                            <div>
                                {/* <img src={} alt="Logo" className={classes.logoImage}></img> */}
                                <Typography variant="h5">
                                    <span className={classes.logoText}>Chat App</span>
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <div className={classes.rightContainer}>
                            <Typography variant="h5" className={classes.headingText}>Register</Typography>
                            <div>
                                <TextField
                                    label="Username"
                                    name="username"
                                    type="text"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={username}
                                    onChange={inputChangeHandler}
                                />
                                <br />
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={email}
                                    onChange={inputChangeHandler}
                                />
                                <br />
                                <Button variant="outlined" color="secondary" className={classes.button}
                                    onClick={() => {
                                        register();
                                    }}>
                                    Submit</Button>
                                <br />
                                <TextField
                                    label="Message"
                                    name="chat"
                                    type="text"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={chat}
                                    onChange={inputChangeHandler}
                                />
                                <br />
                                <Button variant="outlined" color="primary" className={classes.button} onClick={() => {

                                }}>Send</Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </section>
        </Fragment>
    );
}

Register.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Register);
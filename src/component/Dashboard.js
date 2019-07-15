import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SendButton from '../images/send.svg';

import { MESSAGE_SENT, MESSAGE_RECEIVED, TYPING, USER_TYPING } from '../Events';

const styles = theme => ({
    root: {

    },
    container: {
        display: 'flex',
        margin: '0 auto'
    },
    leftContainer: {
        width: '25%',
        padding: '5px',
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    userContainer: {
        backgroundColor: '#FFF',
        border: `2px ${theme.palette.primary.dark} solid`,
        borderRadius: '5px',
        padding: '5px',
        margin: "10px",
        textAlign: 'center'
    },
    userHeader: {
        margin: '10px 0',
        fontSize: '30px',
        fontWeight: '400',
        [theme.breakpoints.down('sm')]: {
            fontSize: '25px',
        },
        '&::after': {
            display: 'block',
            width: '4em',
            height: '3px',
            backgroundColor: `${theme.palette.primary.dark}`,
            content: '" "',
            margin: '2px auto',
            borderRadius: '2px'
        }
    },
    users: {
        fontSize: '16px'
    },
    rightContainer: {
        width: '77%',
        display: 'flex',
        // flexDirection: 'row',
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    chatNavbar: {
        paddingLeft: '10px',
        alignSelf: 'flex-start',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: `${theme.palette.primary.light}`,
        height: '45px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    chatNavbarText: {
        fontSize: '16px',
        fontWeight: '700'
    },
    typing: {
        fontSize: '12px',
    },
    chatList: {
        overflowY: 'auto',
        height: 'calc(100% - 100px)'
    },
    messageForm: {
        width: '75%',
        alignSelf: 'flex-end',
        border: `${theme.palette.primary.main} 1px solid`,
        // left: '0',   
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    chatSectionSent: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    chatSectionReceived: {
        display: 'flex'
    },
    messageUser: {
        margin: '0',
        fontSize: '15px',
        fontWeight: '700',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    messageReceived: {
        display: 'inline-block',
        border: '1px solid #bcbab8',
        backgroundColor: `${theme.palette.secondary.dark}`,
        borderRadius: '4px',
        padding: '5px',
        fontSize: '15px',
        margin: '5px 60px 5px 5px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            margin: '5px 30px 5px 5px',
        },
    },
    messageSent: {
        display: 'inline-block',
        backgroundColor: `${theme.palette.secondary.light}`,
        border: '1px solid #bcbab8',
        borderRadius: '4px',
        padding: '5px',
        fontSize: '15px',
        margin: '5px 5px 5px 60px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            margin: '5px 5px 5px 30px',
        },
    },
    messageTime: {
        fontSize: '10px',
        margin: '0 5px'
    },
    messageContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '45px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    messageField: {
        flex: '1',
        padding: '5px',
        fontSize: '16px'
    },
    sendButton: {
        width: '45px',
        height: 'auto',
        padding: '0 5px',
        border: 'none',
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.down('sm')]: {
            width: '40px',
        },
    },
});

const WAIT_INTERVAL = 1000;
var typingTimeOut = null;

const Dashboard = (props) => {

    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState('');

    const messageInput = useRef(null);
    const newMessage = useRef(null);

    const onMessageSubmit = (e) => {
        e.preventDefault();
        if (message !== "") {
            props.socket.emit(MESSAGE_SENT, message);
            setMessage("");
        }
    }

    props.socket.on(MESSAGE_RECEIVED, () => {
        setTyping("");
        newMessage.current.scrollIntoView({ behavior: 'smooth' });
        messageInput.current.focus();
    });

    props.socket.on(USER_TYPING, (typing, obj) => {
        if (typing) {
            if (props.socket.id !== obj.socketId) {
                setTyping(`${obj.user} is typing...`);
            }
        } else {
            setTyping("");
        }
    });

    useEffect(() => {
        messageInput.current.focus();
    }, []);

    const onMessageTyping = (e) => {
        props.socket.emit(TYPING, true);
        setMessage(e.target.value);
        clearTimeout(typingTimeOut);
        typingTimeOut = setTimeout(() => {
            props.socket.emit(TYPING, false);
        }, WAIT_INTERVAL);
    }

    const { classes } = props;
    return (
        <section className={classes.container}>
            <div className={classes.leftContainer}>
                <div className={classes.userContainer}>
                    <Typography variant="h5" className={classes.userHeader}>{`Online Users : ${props.users.length}`}</Typography>
                    {
                        props.users.map((user, index) => {
                            return (
                                <div key={index}>
                                    <Typography variant="body1" className={classes.users}>
                                        {user}
                                    </Typography>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Grid container className={classes.rightContainer}>
                <Grid item xs={12} className={classes.chatNavbar}>
                    <div>
                        <Typography variant="body1" className={classes.chatNavbarText}>
                            Socket IO Chat
                    </Typography>
                        {typing ?
                            <span className={classes.typing}>
                                {typing}
                            </span>
                            : null}
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.chatList}>
                    {
                        props.chats.map((chat, index) => {
                            return (
                                <div key={index} className={chat.socketId === props.socket.id ? classes.chatSectionSent : classes.chatSectionReceived}>
                                    <div className={chat.socketId === props.socket.id ? classes.messageSent : classes.messageReceived}>
                                        <Typography variant="body1" className={classes.messageUser}>{chat.socketId === props.socket.id ? 'You' : chat.username}</Typography>
                                        <Typography variant="body1">
                                            {chat.message}
                                            <span className={classes.messageTime}>
                                                {`${new Date(chat.timeStamp).getHours()}:${new Date(chat.timeStamp).getMinutes()}`}
                                            </span>
                                        </Typography>
                                    </div>
                                </div>
                            );
                        })
                    }
                    <div id="newMessage" style={{ height: '1px' }} ref={newMessage}></div>
                </Grid>
                <Grid item xs={12} className={classes.messageForm}>
                    <form className={classes.messageContainer} onSubmit={onMessageSubmit}>
                        <input
                            name="message"
                            type="text"
                            variant="outlined"
                            placeholder="Type a message"
                            className={classes.messageField}
                            ref={messageInput}
                            value={message}
                            onChange={onMessageTyping}
                        />
                        <button type="submit" className={classes.sendButton}><img src={SendButton} alt="Send" /></button>
                    </form>
                </Grid>
            </Grid>
        </section >
    )
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);
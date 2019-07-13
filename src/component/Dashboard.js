import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SendButton from '../images/send.svg';

import { MESSAGE_SENT } from '../Events';

const styles = theme => ({
    root: {

    },
    container: {
        display: 'flex',
        margin: '0 auto'
    },
    leftContainer: {
        width: '25%',
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    rightContainer: {
        width: '75%',
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    chatList: {
        overflowY: 'auto',
        height: 'calc(100vh - 50px)',
    },
    messageForm: {
        width: '75%',
        // alignSelf: 'flex-end',
        position: 'fixed',
        bottom: '0',
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
        border: `${theme.palette.secondary.main} 1px solid`,
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
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            width: '40px',
        },
    },
});

const Dashboard = (props) => {

    const [message, setMessage] = useState('');

    const onMessageSubmit = (e) => {
        e.preventDefault();
        console.log(message);
        if (message !== "") {
            props.socket.emit(MESSAGE_SENT, message);
            setMessage("");
        }
    }

    const { classes } = props;
    return (
        <section className={classes.container}>
            <div className={classes.leftContainer}>
                <img src={SendButton} alt="Send" />
            </div>
            <Grid container className={classes.rightContainer}>
                <Grid item xs={12} className={classes.chatList}>
                    {
                        props.chats.map((chat, index) => {
                            return (
                                <div key={index} className={chat.socketId === props.socket.id ? classes.chatSectionSent : classes.chatSectionReceived}>
                                    <div className={chat.socketId === props.socket.id ? classes.messageSent : classes.messageReceived}>
                                        <Typography variant="body1" className={classes.messageUser}>{chat.socketId === props.socket.id ? 'You' : chat.user.username}</Typography>
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
                    <span></span>
                </Grid>
                <Grid item xs={12} className={classes.messageForm}>
                    <form className={classes.messageContainer} onSubmit={onMessageSubmit}>
                        <input
                            name="message"
                            type="text"
                            variant="outlined"
                            placeholder="Type a message"
                            className={classes.messageField}
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
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
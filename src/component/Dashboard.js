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
        margin: '0 auto',
        // height: '100vh',
        border: '1xp dashed'
    },
    leftContainer: {
        flex: '1',
        backgroundColor: "#EFEFEF",
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    rightContainer: {
        flex: '4',
        height: '100%',
        border: '1xp dashed'
    },
    chatList: {
        height: 'calc(100vh - 36px)',
        overflowY: 'auto'
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
        height: '35px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    messageField: {
        flex: '1',
        padding: '5px',
        fontSize: '16px',
        border: '1px solid red',
        borderRadius: '5px',
    },
    sendButton: {
        backgroundColor: 'transparent',
        width: '35px',
        height: 'auto',
        marginRight: '5px',
        padding: '2px',
        border: 'none',
        textAlign: 'center'
    },
});

const Dashboard = (props) => {

    const [message, setMessage] = useState('');

    const onMessageSubmit = (e) => {
        e.preventDefault();
        props.socket.emit(MESSAGE_SENT, message);
        setMessage("");
    }

    const { classes } = props;
    return (
        <section className={classes.container}>
            <div className={classes.leftContainer}>
                <img src={SendButton} alt="Send" />
            </div>
            <div className={classes.rightContainer}>
                <Grid container>
                    <Grid item xs={12} className={classes.chatList}>
                        {
                            props.chats.map((chat, index) => {
                                return (
                                    <div key={index} className={chat.socketId === props.socket.id ? classes.chatSectionSent : classes.chatSectionReceived}>
                                        <div className={chat.socketId === props.socket.id ? classes.messageSent : classes.messageReceived}>
                                            <Typography variant="body1" className={classes.messageUser}>{chat.user.username}</Typography>
                                            <Typography variant="body1">
                                                {chat.message}
                                                <span className={classes.messageTime}>
                                                    {new Date(chat.timeStamp).getMinutes()}
                                                </span>
                                            </Typography>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Grid>
                    <Grid item xs={12}>
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
            </div>
        </section >
    )
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);
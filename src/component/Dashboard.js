import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { MESSAGE_SENT } from '../Events';

const styles = theme => ({
    root: {

    },
    container: {
        display: 'flex',
        margin: '0 auto',
        height: '100vh'
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
        margin: '5px',
        border: '1px #000000 solid'
    },
    chatSection: {
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
        padding: '3px',
        fontSize: '15px',
        margin: '5px 25px 5px 5px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    messageSent: {
        display: 'inline-block',
        border: '1px solid #bcbab8',
        borderRadius: '4px',
        padding: '3px',
        fontSize: '15px',
        margin: '5px 5px 5px 25px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    messageTime: {
        fontSize: '10px',
        margin: '0 5px'
    },
    messageContainer: {
        display: 'flex',
        margin: '0',
        // alignSelf: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    messageField: {
        flex: '1',
        margin: '3px',
        padding: '5px',
        border: '2px solid red',
        borderRadius: '5px',
        fontSize: '16px'
    },
    sendButton: {
        margin: '3px',
        padding: '5px',
        border: 'none',
        fontSize: '16px'
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

            </div>
            <div className={classes.rightContainer}>
                <Grid container className={classes.chatSection}>
                    <Grid item xs={12}>
                        {
                            props.chats.map((chat, index) => {
                                return (
                                    <div key={index}>
                                        <span className={classes.messageSent}>
                                            <Typography variant="body1" className={classes.messageUser}>{chat.user.username}</Typography>
                                            <Typography variant="body1">
                                                {chat.message}
                                                <span className={classes.messageTime}>
                                                    {new Date().getDate()}
                                                </span>
                                            </Typography>
                                        </span>
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
                            <button type="submit" className={classes.sendButton}>Send</button>
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
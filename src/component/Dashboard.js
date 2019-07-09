import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar, { openSnackbar } from './utils/Snackbar';

import { MESSAGE_SENT } from '../Events';

const Dashboard = (props) => {

    const [message, setMessage] = useState('');

    const onMessageSubmit = (e) => {
        e.preventDefault();
        props.socket.emit(MESSAGE_SENT, message);
        setMessage("");
    }

    return (
        <Fragment>
            <form onSubmit={onMessageSubmit}>
                <TextField
                    label="Message"
                    name="message"
                    type="text"
                    variant="outlined"
                    // className={classes.textField}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
                <br />
                <Button type="submit" variant="outlined" color="secondary">Send</Button>
            </form>

            {
                props.chats.map((chat, index) => {
                    return (
                        <div key={index}>
                            <p>{chat.message}</p>
                            <p>{chat.user.username}</p>
                        </div>
                    )
                })
            }
        </Fragment >
    )
}

export default Dashboard;
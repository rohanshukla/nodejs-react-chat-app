import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar, { openSnackbar } from './utils/Snackbar';

import io from 'socket.io-client';
import { USER_CONNECTED, USER_DISCONNECTED, LOGOUT } from '../Events';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ""
        }
    }
    onMessageSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    onInpuFieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.onMessageSubmit}>
                    <TextField
                        label="Message"
                        name="message"
                        type="text"
                        variant="outlined"
                        // className={classes.textField}
                        value={this.state.message}
                        onChange={this.onInpuFieldChange}
                    />
                    <br />
                    <Button type="submit" variant="outlined" color="secondary">Send</Button>
                </form>
            </Fragment>
        )
    }
}

export default Dashboard;
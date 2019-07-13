import React, { Fragment, useState, useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    root: {

    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: `${theme.palette.primary.main}`,
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
        color: `${theme.palette.secondary.main}`,
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
        backgroundColor: `${theme.palette.secondary.main}`,
        '&:hover': {
            color: `${theme.palette.secondary.main}`,
            backgroundColor: `${theme.palette.secondary.dark}`
        }
    }
});


const Register = (props) => {

    const [username, setUsername] = useState('');

    const usernameInput = useRef(null);

    const inputChangeHandler = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value);
        }
    }

    useEffect(() => {
        usernameInput.current.focus();
    }, []);

    const { classes } = props;
    return (
        <Fragment>
            <section className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={12} lg={6}>
                        <div className={classes.leftContainer}>
                            <div>
                                {/* <img src={} alt="Logo" className={classes.logoImage}></img> */}
                                <Typography variant="h5">
                                    <span className={classes.logoText}>Socket IO Chat</span>
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                        <div className={classes.rightContainer}>
                            <Typography variant="h5" className={classes.headingText}>Register</Typography>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                props.register(username);
                            }}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    type="text"
                                    variant="outlined"
                                    className={classes.textField}
                                    ref={usernameInput}
                                    value={username}
                                    onChange={inputChangeHandler}
                                />
                                <br />
                                <Button type="submit" variant="outlined" color="secondary" className={classes.button}>
                                    Submit</Button>
                            </form>
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
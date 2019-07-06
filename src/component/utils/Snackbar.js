import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import classNames from 'classnames';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
  default: InfoIcon,
};

const styles1 = theme => ({
  default: {
    backgroundColor: '#333333',
  },
  success: {
    backgroundColor: green[800],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: '#07456f',
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'default']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

let openSnackbarFn;
const styles = theme => ({
  close: {
    padding: theme.spacing / 2,
  },
});

class Notifier extends React.Component {
  state = {
    open: false,
    message: '',
    variant: ''
  };

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  openSnackbar = ({ message, variant }) => {
    this.setState({
      open: true,
      message,
      variant,
    });
  };

  handleSnackbarClose = (event) => {
    this.setState({
      open: false,
      message: '',
      variant: this.state.variant
    });
  };

  render() {
    const { classes } = this.props;
    const variant = this.state.variant.toString();
    const message = (
      <span
        id="snackbar-message-id"
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    );

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={5000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
        snackbarcontentprops={{
          'aria-describedby': 'snackbar-message-id',
        }}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            className={classes.close}
            onClick={this.handleSnackbarClose}
            style={{ backgroundColor: 'transparent', color: "white" }}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <MySnackbarContentWrapper
          onClose={this.handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    );
  }
}

Notifier.propTypes = {
  classes: PropTypes.object.isRequired,
};

export function openSnackbar({ message, variant }) {
  openSnackbarFn({ message, variant });
}

export default withStyles(styles)(Notifier);
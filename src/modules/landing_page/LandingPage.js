import React from "react";
import { connect } from "react-redux";
import { authFetch, pushAlert } from "../../components/layout/ActionLayout";
import {
  Grid,
  Typography,
  Link,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Box,
  Paper,
  withStyles,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Loading from "../../components/loading/Loading";
import AlertCustom from "../../components/alert/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        VeCo
      </Link>{' '}
      2020
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LandingPage extends React.Component {
  cachedValue = JSON.parse(localStorage.getItem('session')) || { email: '', password: '' };
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.login.loggedin,
      email: '',
      password: '',
      loadingFlag: true,
      alert: {
        open: false,
        message: '',
        type: ''
      },
    }
    this.login = this.login.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.login.action === "AUTH_SUCCESS") {
      window.location.hash = '/school';
    }
    if (nextProps.login.action === "AUTH_FAILED") {
      let message;
      switch (nextProps.login.errAuth.code) {
        case 'auth/user-not-found':
          message = 'Email tidak terdaftar'
          break;

        case 'auth/wrong-password':
          message = 'Password Salah'
          break;
        
        case 'auth/too-many-requests':
          message = 'Terlalu banyak kesalahan password, silahkan coba lagi nanti'
          break;

        default:
          message = 'Akun tidak terdaftar'
          break;
      }
      prevState.loadingFlag = false;
      prevState.alert.message = message;
      prevState.alert.type = 'error';
      prevState.alert.open = true;
    }
    if (nextProps.login.action === "PUSH_ALERT") {
      prevState.alert = nextProps.login.alert;
    }
    return null;
  }

  componentDidMount() {
    if (this.props.userProfile !== null) {
      window.location.hash = '/school/home';
    } else {
      this.setState({
        email: this.cachedValue.email,
        password: this.cachedValue.password,
        loadingFlag: false,
      });
    }
  }

  inputOnChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      this.setState({ email: value });
    } else {
      this.setState({ password: value });
    }
  }

  login = (event) => {
    event.preventDefault();
    const {
      email,
      password,
      remember
    } = event.target;
    this.setState({ loadingFlag: true })
    if (remember.checked) {
      localStorage.setItem('session', JSON.stringify({
        email: email.value,
        password: password.value,
      }));
    }
    this.props.onLogin({
      email: email.value,
      password: password.value,
    });
  }

  closeAlert = async () => {
    let alertConfig = {
      open: false,
      message: '',
      type: 'success'
    }
    this.props.onCloseAlert(alertConfig);
  }

  render() {
    const { classes } = this.props;
    const { email, password, loadingFlag, alert } = this.state;

    return (
      <div>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                VeCo Sch
              </Typography>
              <form className={classes.form} onSubmit={this.login}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => { this.inputOnChange(event) }}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => { this.inputOnChange(event) }}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox name="remember" value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs={4}>
                    <Link href="#" variant="body2">
                      Lupa password?
                  </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
        {loadingFlag &&
          <Loading color='white' />
        }
        <AlertCustom
          isOpen={alert.open}
          message={alert.message}
          onClose={() => { this.closeAlert() }}
          type={alert.type}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.layout.resAuth,
    login: state.layout
  }
};

const mapDispatchToProps = dispatch => ({
  onLogin: value => dispatch(authFetch(value)),
  onCloseAlert: value => dispatch(pushAlert(value)),
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
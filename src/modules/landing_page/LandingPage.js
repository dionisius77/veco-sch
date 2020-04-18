import React from "react";
import { connect } from "react-redux";
import { pushLogin } from "../../components/layout/ActionLayout";
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
      loadingFlag: true
    }
    this.login = this.login.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.login.action === "PUSH_LOGIN") {
      window.location.hash = '/school';
    }
    return null;
  }

  componentDidMount() {
    if (this.state.loggedIn) {
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
    this.setState({ loadingFlag: true }, () => {
      setTimeout(() => {
        if (remember.checked) {
          localStorage.setItem('session', JSON.stringify({
            email: email.value,
            password: password.value,
          }));
        }
        localStorage.setItem('role', 'GURU');
        this.props.onLogin(true);
      }, 3000);
    })
  }

  render() {
    const { classes } = this.props;
    const { email, password, loadingFlag } = this.state;

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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.layout
  }
};

const mapDispatchToProps = dispatch => ({
  onLogin: value => dispatch(pushLogin(value)),
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
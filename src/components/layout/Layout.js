import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./header/header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink, red, amber, blue, lightGreen, grey } from "@material-ui/core/colors";
import { pushAlert, pushLogin, pushLoading, masterDataFetch, authDefault } from "./ActionLayout";
import AlertCustom from "../alert/Alert";
import { Beforeunload } from 'react-beforeunload';
import axios from 'axios';
import Loading from "../loading/Loading";
import { HTTP_SERVICE } from "../../services/HttpServices";

class Layout extends Component {
  globalTheme1 = createMuiTheme({
    palette: {
      primary: {
        main: pink[100]
      },
      secondary: {
        main: '#ff5b92',
        light: pink[200]
      },
      warning: {
        main: amber[500]
      },
      error: {
        main: red[500]
      },
      info: {
        main: blue[500]
      },
      success: {
        main: lightGreen[500]
      },
      common: {
        grey: grey[700]
      },
      // for dark mode
      action: {
        active: '#fff',
        disabled: 'rgba(255, 255, 255, 0.3)',
        hover: 'rgba(255, 255, 255, 0.08)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        selected: 'rgba(255, 255, 255, 0.16)',
      },
      text: {
        primary: '#fff',
        secondary: 'rgba(225, 225, 225, 0.7)',
        disabled: 'rgba(225, 225, 225, 0.5)',
      },
      background: {
        default: pink[100],
        paper: '#424242',
      },
      divider: 'rgba(255, 255, 255, 0.12)'
    },
    overrides: {
      MuiOutlinedInput: {
        notchedOutline: {
          borderColor: 'rgba(255, 255, 255, 0.23)',
        }
      },
      MuiInputLabel: {
        outlined: {
          color: 'rgba(225, 225, 225, 0.9)',
          '&$focused': {
            color: '#fff'
          },
        },
      },
      MuiStepLabel: {
        root: {
          display: 'flex',
          alignItems: 'center',
          height: 15
        }
      }
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.login,
      loadingFlag: false,
      userProfile: this.props.userProfile,
      alert: {
        open: false,
        message: '',
        type: ''
      }
    }
    this.closeAlert = this.closeAlert.bind(this);
  }

  onUnload = () => {
    axios.interceptors.request.use((config) => {
      // console.log(config);
    }, (err) => { console.log(err) });
    return '';
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.action === "PUSH_LOADING" && nextProps.loadingFlag !== prevState.loadingFlag) {
      prevState.loadingFlag = nextProps.loadingFlag
    }
    if (nextProps.action === "PUSH_ALERT") {
      prevState.alert = nextProps.alert;
    }
    if (nextProps.action === "AUTH_SUCCESS") {
      prevState.userProfile = nextProps.userProfile;
    }
    return null;
  }

  closeAlert = () => {
    let alertConfig = {
      open: false,
      message: '',
      type: 'success'
    }
    this.props.onCloseAlert(alertConfig)
  }

  componentDidMount() {
    if (this.props.userProfile === null) {
      window.location.hash = '/login_page';
    } else {
      this.verify();
    }
  }

  verify = () => {
    HTTP_SERVICE.getUserInfoLoggedIn().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        this.props.getMasterdata({ collection: 'masterdata' });
      } else {
        this.logOut();
      }
    });
  }

  logOut() {
    this.props.onPushLoading(true);
    this.setState({
      loggedIn: false,
    }, () => {
      this.props.onLogin(false);
      this.props.onDeleteProfile();
      window.location.hash = '/login_page';
    })
  }

  render() {
    return (
      <React.Fragment>
        <Beforeunload onBeforeunload={() => { this.onUnload() }}>
          <ThemeProvider theme={this.globalTheme1}>
            <Header userProfile={this.state.userProfile} onNotif={() => { this.verify() }} onLogout={() => { this.logOut() }} />
            <AlertCustom
              isOpen={this.state.alert.open}
              message={this.state.alert.message}
              onClose={this.closeAlert}
              type={this.state.alert.type}
            />
            {this.state.loadingFlag &&
              <Loading color='black' />
            }
          </ThemeProvider>
        </Beforeunload>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    // action: state.layout.action,
    userProfile: state.layout.resAuth,
    login: state.layout.loggedin,
    loadingFlag: state.layout.loadingFlag,
    action: state.layout.action,
    alert: state.layout.alert
  }
}

const mapDispatchToProps = dispatch => ({
  onCloseAlert: (value) => dispatch(pushAlert(value)),
  onDeleteProfile: () => dispatch(authDefault(null)),
  onLogin: (value) => dispatch(pushLogin(value)),
  onPushLoading: (value) => dispatch(pushLoading(value)),
  getMasterdata: value => dispatch(masterDataFetch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
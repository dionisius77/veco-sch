import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./header/header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink, red, amber, blue, lightGreen, grey } from "@material-ui/core/colors";
import { getLoading, getAlert, pushAlert, getLogin } from "./ActionLayout";
import AlertCustom from "../alert/Alert";


class Layout extends Component {
  globalTheme1 = createMuiTheme({
    palette: {
      primary: {
        main: pink[100]
      },
      secondary: {
        main: pink[400],
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
          '&$focused' : {
            color: '#fff'
          },
        },
      }
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.login,
      loadingFlag: false,
      alert: {
        open: false,
        message: '',
        type: ''
      }
    }
    this.closeAlert = this.closeAlert.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // if(nextProps.action === "AUTH_SUCCESS"){
    //   prevState.result = nextProps.res
    // }
    if (nextProps.action === "GET_LOGIN") {
      prevState.loggedIn = nextProps.login;
      if (nextProps.login) {
        window.location.hash = '/login_page';
      }
    }
    if (nextProps.action === "PUSH_LOADING" && nextProps.loadingFlag !== prevState.loadingFlag) {
      prevState.loadingFlag = nextProps.loadingFlag
    }
    if (nextProps.action === "PUSH_ALERT") {
      prevState.alert = nextProps.alert;
    }
    return null;
  }

  closeAlert = () => {
    let alertConfig = {
      open: false,
      message: '',
      type: 'success'
    }
    // this.setState({alert: alertConfig});
    this.props.onCloseAlert(alertConfig)
  }

  componentDidMount() {
    // this.props.onRequestAuth("test");
    this.props.onGetLogin();
    this.props.onGetAlert();
    this.props.onGetLoading();
    if (!this.state.loggedIn) {
      // return <Redirect to={{
      //   pathname: "/landing_page"
      // }}/>;
      window.location.hash = '/login_page';
    }
  }

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={this.globalTheme1}>
          <Header loadingFlag={this.state.loadingFlag} />
          <AlertCustom
            isOpen={this.state.alert.open}
            message={this.state.alert.message}
            onClose={this.closeAlert}
            type={this.state.alert.type}
          />
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  // action: state.layout.action,
  // res: state.layout.resAuth
  login: state.layout.loggedin,
  loadingFlag: state.layout.loadingFlag,
  action: state.layout.action,
  alert: state.layout.alert
});

const mapDispatchToProps = dispatch => ({
  // onRequestAuth: value => dispatch(authFetch(value)),
  onGetLogin: () => dispatch(getLogin()),
  onGetLoading: () => dispatch(getLoading()),
  onGetAlert: () => dispatch(getAlert()),
  onCloseAlert: (value) => dispatch(pushAlert(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
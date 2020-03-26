import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./header/header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { pink, red, amber, blue, lightGreen } from "@material-ui/core/colors";
import { getLoading } from "./ActionLayout";


class Layout extends Component {
  globalTheme1 = createMuiTheme({
    palette: {
      // primary: {
      //   main: pink[400]
      // },
      secondary: {
        main: pink[400]
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
      // background: {
      //   paper: pink[200],
      //   default: pink[50]
      // },
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.login,
      loadingFlag: true,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // if(nextProps.action === "AUTH_SUCCESS"){
    //   prevState.result = nextProps.res
    // }
    // if(nextProps.login.action === "GET_LOGIN"){
    //   prevState.loggedIn = nextProps.login.loggedin;
    // }
    if(nextProps.action === "PUSH_LOADING" && nextProps.loadingFlag !== prevState.loadingFlag){
      prevState.loadingFlag = nextProps.loadingFlag
    }
    return null;
  }

  componentDidMount() {
    // this.props.onRequestAuth("test");
    this.props.onGetLoading();
    if (!this.state.loggedIn) {
      // return <Redirect to={{
      //   pathname: "/landing_page"
      // }}/>;
      window.location.hash = '/landing_page';
    }
  }

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={this.globalTheme1}>
          <Header loadingFlag={this.state.loadingFlag}/>
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
  action: state.layout.action
});

const mapDispatchToProps = dispatch => ({
  // onRequestAuth: value => dispatch(authFetch(value)),
  // onGetLogin: value => dispatch(getLogin(value))
  onGetLoading: () => dispatch(getLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
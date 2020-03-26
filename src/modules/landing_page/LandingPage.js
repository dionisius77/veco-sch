import React from "react";
import { connect } from "react-redux";
import { pushLogin } from "../../components/layout/ActionLayout";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.login.loggedin
    }
    this.login = this.login.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.login.action === "PUSH_LOGIN"){
      window.location.hash = '/school';
    }
    return null;
  }

  componentDidMount(){
    if(this.state.loggedIn){
      window.location.hash = '/school';
    }
  }

  login = () => {
    this.props.onLogin(true);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          Login page <br/>
          <button onClick={this.login}>
            Login
          </button>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  login: state.layout
});

const mapDispatchToProps = dispatch => ({
  onLogin: value => dispatch(pushLogin(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
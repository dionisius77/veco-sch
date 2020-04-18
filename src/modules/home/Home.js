import React, { Component } from "react";
import { Fade } from 'react-reveal';
import { pushLoading } from "../../components/layout/ActionLayout";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageLoaded: false
    }
  }

  componentDidMount(){
    this.props.setLoading(false);
    this.setState({pageLoaded: true});
  }

  render() {
    return (
      <Fade right opposite when={this.state.pageLoaded} duration={500}>
        <h2>{localStorage.getItem('role')}</h2>
        <p>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.</p>

        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </Fade>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
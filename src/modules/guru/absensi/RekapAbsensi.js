import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { pushLoading } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';

class RekapAbsensi extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <Fade right duration={500}>

      </Fade>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RekapAbsensi);
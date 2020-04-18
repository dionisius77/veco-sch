import React, { Component } from 'react';
import { pushLoading } from '../../../components/layout/ActionLayout';
import { withStyles, Paper, Stepper } from '@material-ui/core';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';

class FormSiswaLanding extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageLoaded: false,
      activeStep: 0
    }
  }

  componentDidMount(){

  }

  render() {
    const {
      activeStep,
      pageLoaded
    } = this.state;
    return(
      <Fade right opposite when={pageLoaded} duration={500}>
        <Paper>
          <Stepper nonLinear activeStep={activeStep}>

          </Stepper>
        </Paper>
      </Fade>
    )
  }
}

const mapStateToProps = state => {
  return {
    steps: [
      
    ]
  }
}

const styles = theme => ({

});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FormSiswaLanding));
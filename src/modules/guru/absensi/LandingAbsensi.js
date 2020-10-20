import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, Grid } from '@material-ui/core';
import JadwalIcon from '../../../shared/automation.png';
import RekapIcon from '../../../shared/libur.png';

class LandingAbsensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
    }
  }

  componentDidMount() {
    this.setState({ pageLoaded: true });
  }

  cardOnclick = (page) => {
    if(page === 'rekap') {
      this.props.setAlert({
        open: true,
        message: 'Feature sedang dalam pengembangan',
        type: 'warning',
      });
      // window.location.hash = '#/school/rekap_absensi';
    } else {
      window.location.hash = '#/school/input_absensi';
    }
  }

  render() {
    const {
      pageLoaded
    } = this.state;
    return (
      <Fade right opposite when={pageLoaded} duration={500}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Card onClick={() => {this.cardOnclick('input')}}>
              <CardMedia
                component="img"
                image={JadwalIcon}
                title="Input Absensi"
              />
              <CardContent>
                <Typography gutterBottom variant='h6' align='center' component='h3'>Input Absensi</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2}>
            <Card onClick={() => {this.cardOnclick('rekap')}}>
              <CardMedia
                component="img"
                image={RekapIcon}
                title="Rekap Absensi"
              />
              <CardContent>
                <Typography gutterBottom variant='h6' align='center' component='h3'>Rekap Absensi</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingAbsensi);
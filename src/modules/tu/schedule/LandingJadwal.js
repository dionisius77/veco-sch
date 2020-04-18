import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../components/layout/ActionLayout';
import AutomationImage from '../../shared/automation.png';
import CalendarImage from '../../shared/calendar.png';
import MarkOffDay from '../../shared/libur.png';
import { Grid, Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core';

class LandingJadwal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false
    }
  }

  componentDidMount() {
    this.setState({ pageLoaded: true })
  }

  generateSchedule = () => {
    this.props.onPushLoading(true);
    setTimeout(() => {
      // this.props.onPushLoading(false);
      this.props.onPushAlert({
        open: true,
        message: 'Jadwal berhasil di generate',
        type: 'success'
      });
      window.location.hash = '#/school/kelas';
    }, 3000)
  }

  generateManualSchedule = () => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = '#/school/input_jadwal/empty'
      }, 300)
    })
  }
  
  goToInputLibur = () => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = '#/school/hari_libur'
      }, 300)
    })
  }

  render() {
    return (
      <Fade opposite right duration={500} when={this.state.pageLoaded}>
        <Grid
          container
          spacing={5}
          // direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs>
            <Card style={{minHeight: 280}} onClick={() => {this.generateSchedule()}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  style={{width: 200, marginLeft: '22%'}}
                  image={AutomationImage}
                  title="Otomatis generate jadwal"
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' align="center" component='h2'>Membuat Jadwal Otomatis</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card style={{minHeight: 280}} onClick={() => {this.generateManualSchedule()}}>
              <CardActionArea style={{marginTop: 20}}>
                <CardMedia
                  component="img"
                  style={{width: 180, marginLeft: '25%'}}
                  image={CalendarImage}
                  title="Manual generate jadwal"
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' align="center" component='h2'>Membuat Jadwal Manual</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card style={{minHeight: 280}} onClick={() => {this.goToInputLibur()}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  style={{width: 200, marginLeft: '26%'}}
                  image={MarkOffDay}
                  title="Mark Off Day"
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' align="center" component='h2'>Membuat Jadwal Libur</Typography>
                </CardContent>
              </CardActionArea>
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
  onPushAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingJadwal);
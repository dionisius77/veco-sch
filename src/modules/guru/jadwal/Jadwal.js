import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { Grid, Table, TableContainer, Paper, TableHead, TableBody, TableRow, withStyles, TableCell } from '@material-ui/core';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { HTTP_SERVICE } from '../../../services/HttpServices';

class Jadwal extends Component {
  newJadwal;
  constructor(props) {
    super(props);
    this.state = {
      jadwal: {},
    }
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getJadwal();
  }

  getJadwal = async () => {
    let request = {
      collection: 'datastaff',
      doc: this.props.userProfile.nik,
    }
    await HTTP_SERVICE.getFb(request)
      .then(res => {
        if (res.data().jadwal) {
          this.setState({ jadwal: res.data().jadwal });
          this.props.setLoading(false);
        } else {
          this.props.setAlert({
            open: true,
            message: 'Jadwal belum dibuat',
            type: 'warning',
          })
          this.props.setLoading(false);
        }
      })
      .catch(err => {
        this.props.setLoading(false);
        console.log(err);
      });
  }

  render() {
    const { jadwal } = this.state;
    return (
      <Fade right duration={500}>
        <Paper>
          <Grid container>
            <Grid item xs>
              <h2 style={{ textAlign: 'center' }}>Jadwal</h2>
            </Grid>
          </Grid>
          <TableContainer component={Paper} style={{ padding: 10 }}>
            <Table size='small' border={1} style={{ borderColor: '#fff' }}>
              <TableHead>
                <TableRow style={{ height: 50 }}>
                  <StyledTblCell align='center'>Senin</StyledTblCell>
                  <StyledTblCell align='center'>Selasa</StyledTblCell>
                  <StyledTblCell align='center'>Rabu</StyledTblCell>
                  <StyledTblCell align='center'>Kamis</StyledTblCell>
                  <StyledTblCell align='center'>Jumat</StyledTblCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {['1', '2', '3', 'istirahat 1', '4', '5', '6', 'istirahat 2', '7', '8', '9'].map(jam => (
                  <TableRow key={jam} style={{ height: 40 }}>
                    {['senin', 'selasa', 'rabu', 'kamis', 'jumat'].map((hari, i) => {
                      return (
                        <StyledTblCell
                          align='center'
                          style={{
                            background: jam === 'istirahat 1' || jam === 'istirahat 2' ? 'yellow' : '#424242',
                          }}
                          key={hari}
                        >
                          {
                            jadwal[hari + '-' + jam]
                              ?
                              `${jadwal[hari + '-' + jam].text}\n${jadwal[hari + '-' + jam].kelas}`
                              :
                              hari === 'senin' && jam === '1'
                                ?
                                'Upacara'
                                :
                                (<p></p>)
                          }
                        </StyledTblCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Fade>
    )
  }
}

const StyledTblCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.grey,
    fontWeight: 800,
    fontSize: 16
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const mapStateToProps = state => {
  return {
    userProfile: state.layout.resAuth,
  }
};

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jadwal);
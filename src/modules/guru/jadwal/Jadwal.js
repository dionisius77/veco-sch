import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { Grid, Table, TableContainer, Paper, TableHead, TableBody, TableRow, withStyles, TableCell } from '@material-ui/core';
import { pushLoading } from '../../../components/layout/ActionLayout';

class Jadwal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jadwal: {
        'senin-3': 'VII-A',
        'senin-4': 'VII-A',
        'selasa-4': 'VII-B',
        'selasa-5': 'VII-B',
        'rabu-4': 'IX-A',
        'rabu-5': 'IX-A',
        'jumat-1': 'IX-B',
        'jumat-2': 'IX-B',
      },
    }
  }

  componentDidMount() {

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
                <TableRow style={{height: 50}}>
                  <StyledTblCell align='center'>Senin</StyledTblCell>
                  <StyledTblCell align='center'>Selasa</StyledTblCell>
                  <StyledTblCell align='center'>Rabu</StyledTblCell>
                  <StyledTblCell align='center'>Kamis</StyledTblCell>
                  <StyledTblCell align='center'>Jumat</StyledTblCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {['1', '2', '3', 'istirahat 1', '4', '5', '6', 'istirahat 2', '7', '8', '9'].map(jam => (
                  <TableRow key={jam} style={{height: 40}}>
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
                              jadwal[hari + '-' + jam]
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

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jadwal);
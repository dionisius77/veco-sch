import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Paper, Grid, TableContainer, TableHead, TableBody, TableRow, TableCell, Table } from '@material-ui/core';
import DatePicker from '../../../components/date_picker/DatePicker';
import Selects from '../../../components/select/Select';
import { HTTP_SERVICE } from '../../../services/HttpServices';

class RekapAbsensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionKelas: [],
    }
    this.dateOnchange = this.dateOnchange.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getJadwal();
  }

  getJadwal = async () => {
    const req = {
      collection: 'datastaff',
      doc: this.props.userProfile.nik
    }
    await HTTP_SERVICE.getFb(req)
      .then(res => {
        if (res.data().jadwal) {
          const distinctSelect = this.distinctSelect(res.data().jadwal);
          this.setState({ optionKelas: distinctSelect });
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Pilih tanggal terlebih dahulu',
            type: 'warning'
          });
        } else {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Jadwal belum dibuat',
            type: 'warning'
          });
        }
      })
      .catch(err => {
        this.props.setLoading(false);
        this.props.setAlert({
          open: true,
          message: 'Terjadi kesalahan saat mengambil data',
          type: 'error'
        });
      });
  }

  distinctSelect = (array) => {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.value)) {
        map.set(item.value, true);    // set any value to Map
        result.push({
          value: item.value,
          text: item.text
        });
      }
    }
    return result;
  }

  selectOnChange = (name, value) => {

  }

  dateOnchange = (id, value) => {

  }

  render() {
    const { optionKelas } = this.state;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 10, margin: -10, minHeight: 550 }}>
          <h1 style={{ textAlign: 'center', marginTop: -5 }}>Rekap Absensi</h1>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <DatePicker id='from' label='Dari' required={false} value='' onChange={this.dateOnchange} isSubmit={true} size='small' />
            </Grid>
            <Grid item xs={2}>
              <Selects
                name='kelas'
                id='kelas'
                label='Pilih Kelas'
                variant='outlined'
                options={optionKelas}
                value=''
                onChange={(name, value) => { this.selectOnChange(name, value) }}
                isSubmit={false}
                required={false}
                size='small'
              />
            </Grid>
          </Grid>
          <TableContainer style={{ maxHeight: 400 }}>
            <Table
              stickyHeader
              aria-labelledby="tableTitle"
              size='small'
              aria-label="enhanced table"
              border={1}
              style={{ borderColor: '#fff' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#000' }} rowSpan={2} align={'center'}>Nama</TableCell>
                  <TableCell style={{ backgroundColor: '#000' }} colSpan={4} align={'center'}>Total</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ backgroundColor: '#000' }}>Masuk</TableCell>
                  <TableCell style={{ backgroundColor: '#000' }}>Izin</TableCell>
                  <TableCell style={{ backgroundColor: '#000' }}>Sakit</TableCell>
                  <TableCell style={{ backgroundColor: '#000' }}>Alpa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Dionisius Aditya Octa Nugraha</TableCell>
                  <TableCell>40</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.layout.resAuth,
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RekapAbsensi);
import React, { Component } from 'react';
import { Fade, Zoom } from 'react-reveal';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Grid, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Checkbox, Table, withStyles } from '@material-ui/core';
import Selects from '../../../components/select/Select';
import Button from '../../../components/button/Button';
import InputSimple from '../../../components/input_simple/InputSimple';
import { HTTP_SERVICE } from '../../../services/HttpServices';
import DatePicker from '../../../components/date_picker/DatePicker';

class InputAbsensi extends Component {
  newDataSiswa;
  constructor(props) {
    super(props);
    this.state = {
      selectedClass: '',
      dataSiswa: [],
      dataLoaded: false,
      jadwal: {},
      classOption: [],
    }
    this.newDataSiswa = this.state.dataSiswa;
    this.dateOnchange = this.dateOnchange.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(true)
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
          this.setState({ jadwal: res.data().jadwal });
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

  selectOnChange = (name, value) => {
    if (name === 'kelas') {
      this.props.setLoading(true);
      this.setState({
        selectedClass: value,
        dataLoaded: false
      });
      this.getDataSiswa(value);
    } else {
      this.newDataSiswa.map((data, index) => {
        if (data.id === name) {
          this.newDataSiswa[index].keterangan = value;
          this.setState({ dataSiswa: this.newDataSiswa });
        }
        return null;
      });
    }
  }

  getDataSiswa = async (selected) => {
    const splited = selected.split('__');
    const idKelas = splited[1];
    const req = {
      collection: 'datasiswa',
      params: 'kelas',
      operator: '==',
      value: idKelas,
      orderBy: 'dataPribadi.nama',
      directions: 'asc',
      lastVisible: '',
      limit: 100,
    }
    await HTTP_SERVICE.getFBFilter(req)
      .then(res => {
        if (res.docs.length > 0) {
          res.forEach(doc => {
            this.newDataSiswa.push({
              id: doc.id,
              nama: doc.data().dataPribadi.nama,
              checked: false,
              keterangan: '',
              ketTambahan: '',
            });
          });
          this.props.setLoading(false);
          this.setState({
            dataLoaded: true,
            dataSiswa: this.newDataSiswa,
          });
        } else {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Belum ada siswa yang terdaftar di kelas ini',
            type: 'error',
          });
        }
      })
      .catch(err => {
        this.props.setLoading(false);
        this.props.setAlert({
          open: true,
          message: 'Terjadi kesalahan saat mengambil data',
          type: 'error',
        });
      });
  }

  checkBoxOnChange = (id) => {
    this.newDataSiswa.map((value, index) => {
      if (value.id === id) {
        this.newDataSiswa[index].checked = !this.newDataSiswa[index].checked;
        this.newDataSiswa[index].keterangan = '';
        this.newDataSiswa[index].ketTambahan = '';
        this.setState({ dataSiswa: this.newDataSiswa });
      }
      return null;
    });
  }

  inputOnBlur = (id, value) => {
    this.newDataSiswa.map((data, index) => {
      if (data.id === id) {
        this.newDataSiswa[index].ketTambahan = value;
      }
      return null
    });
    this.setState({ dataSiswa: this.newDataSiswa });
  }

  getDayName = (index) => {
    let hari;
    switch (index) {
      case 1:
        hari = 'senin';
        break;

      case 2:
        hari = 'selasa';
        break;

      case 3:
        hari = 'rabu';
        break;

      case 4:
        hari = 'kamis';
        break;

      case 5:
        hari = 'jumat';
        break;

      default:
        break;
    }
    return hari;
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

  dateOnchange = async (id, value) => {
    const { jadwal } = this.state;
    let newSelect = [];
    let fullDate = new Date(value);
    const hari = this.getDayName(fullDate.getDay());
    for (let data in jadwal) {
      let splitJadwal = data.split('-');
      if (splitJadwal[0] === hari) {
        newSelect.push({
          value: `${jadwal[data].text}__${jadwal[data].kelas}`,
          text: `${jadwal[data].text} ${jadwal[data].kelas}`
        })
      }
    }
    const distinctSelect = this.distinctSelect(newSelect);
    this.setState({ classOption: distinctSelect });
  }

  onSave = () => {

  }

  render() {
    const {
      selectedClass,
      dataSiswa,
      dataLoaded,
      classOption
    } = this.state;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 10, margin: -10, minHeight: 550 }}>
          <Grid style={{ marginTop: -20 }} container justify='space-between' alignItems="center">
            <Grid item xs={2}>
              <DatePicker id='tgl' label='Tanggal' required={false} value='' onChange={this.dateOnchange} isSubmit={true} size='small' />
            </Grid>
            <Grid item xs={3}>
              <h1 style={{ textAlign: 'left' }}>Input Absensi</h1>
            </Grid>
            <Grid item xs={1} style={{ alignItems: 'right' }}>
              {/* <div> */}
              <Button
                type="default"
                disabled={false}
                text="Simpan"
                onClick={() => { this.onSave() }}
              />
              {/* </div> */}
            </Grid>
          </Grid>
          <Grid style={{ marginTop: -20 }} container>
            <Grid item xs={2}>
              <Selects
                name='kelas'
                id='kelas'
                label='Pilih Kelas'
                variant='outlined'
                options={classOption}
                value={selectedClass}
                onChange={(name, value) => { this.selectOnChange(name, value) }}
                isSubmit={false}
                required={false}
                size='small'
              />
            </Grid>
          </Grid>
          <Zoom duration={500} when={dataLoaded}>
            <TableContainer>
              <Table size='small' border={1} style={{ borderColor: '#fff' }}>
                <TableHead>
                  <TableRow style={{ height: 50 }}>
                    <StyledTblCell style={{ width: 400 }}>Nama</StyledTblCell>
                    <StyledTblCell style={{ width: 20 }}><div style={{ textAlign: 'center' }}>Hadir</div></StyledTblCell>
                    <StyledTblCell>Keterangan</StyledTblCell>
                    <StyledTblCell>Keterangan Tambahan</StyledTblCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSiswa.map(data =>
                    <TableRow key={data.id} style={{ height: 10 }}>
                      <StyledTblCell>{data.nama}</StyledTblCell>
                      <StyledTblCell>
                        <Checkbox
                          style={{ marginLeft: 10 }}
                          id={data.id}
                          checked={data.checked}
                          value={data.checked}
                          onChange={() => { this.checkBoxOnChange(data.id) }}
                        />
                      </StyledTblCell>
                      <StyledTblCell>
                        <Selects
                          name={data.id}
                          id={data.id}
                          disable={data.checked}
                          variant='outlined'
                          options={this.props.keteranganOption}
                          value={data.keterangan}
                          onChange={(name, value) => { this.selectOnChange(name, value) }}
                          isSubmit={false}
                          required={false}
                          size='small'
                          noMargin={true}
                        />
                      </StyledTblCell>
                      <StyledTblCell>
                        <InputSimple
                          id={data.id}
                          required={!data.checked}
                          type='text'
                          value={data.ketTambahan}
                          disabled={data.checked}
                          onBlur={(id, value) => { this.inputOnBlur(id, value) }}
                        />
                      </StyledTblCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Zoom>
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
    fontSize: 16,
    height: 20
  },
  body: {
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 0
  },
}))(TableCell);

const mapStateToProps = state => ({
  userProfile: state.layout.resAuth,
  keteranganOption: [
    { value: 'aplha', text: 'Alpha' },
    { value: 'izin', text: 'Izin' },
    { value: 'sakit', text: 'Sakit' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputAbsensi);
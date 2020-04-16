import React, { Component } from 'react';
import { Fade, Zoom } from 'react-reveal';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Grid, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Checkbox, Table, withStyles } from '@material-ui/core';
import Selects from '../../../components/select/Select';
import Button from '../../../components/button/Button';
import InputSimple from '../../../components/input_simple/InputSimple';

class InputAbsensi extends Component {
  newDataSiswa;
  constructor(props) {
    super(props);
    this.state = {
      selectedClass: '',
      dataSiswa: this.props.dataSiswa,
      dataLoaded: false
    }
    this.newDataSiswa = this.state.dataSiswa;
  }

  componentDidMount() {
    this.props.onPushAlert({
      open: true,
      message: 'Pilih kelas terlebih dahulu!',
      type: 'warning'
    });
  }

  selectOnChange = (name, value) => {
    if (name === 'kelas') {
      this.props.onPushLoading(true);
      this.setState({
        selectedClass: value,
        dataLoaded: false
      }, () => {
        setTimeout(() => {
          this.props.onPushLoading(false);
          this.setState({
            dataLoaded: true
          });
        }, 3000);
      });
    } else {
      this.newDataSiswa.map((data, index) => {
        if (data.id === name) {
          this.newDataSiswa[index].keterangan = value;
          this.setState({ dataSiswa: this.newDataSiswa });
        }
      });
      console.log(this.state.dataSiswa)
    }
  }

  checkBoxOnChange = (id) => {
    this.newDataSiswa.map((value, index) => {
      if (value.id === id) {
        this.newDataSiswa[index].checked = !this.newDataSiswa[index].checked;
        this.newDataSiswa[index].keterangan = '';
        this.newDataSiswa[index].ketTambahan = '';
        this.setState({ dataSiswa: this.newDataSiswa });
      }
    });
    console.log(this.state.dataSiswa)
  }

  inputOnBlur = (id, value) => {
    this.newDataSiswa.map((data, index) => {
      if (data.id === id) {
        this.newDataSiswa[index].ketTambahan = value;
      }
    });
    this.setState({ dataSiswa: this.newDataSiswa });
    console.log(this.state.dataSiswa)
  }

  onSave = () => {

  }

  render() {
    const {
      selectedClass,
      dataSiswa,
      dataLoaded
    } = this.state;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 10, margin: -10, minHeight: 550 }}>
          <Grid style={{ marginTop: -20 }} container justify='space-between' alignItems="center">
            <Grid item xs={2}>
              <Selects
                name='kelas'
                id='kelas'
                label='Pilih Kelas'
                variant='outlined'
                options={this.props.classOption}
                value={selectedClass}
                onChange={(name, value) => { this.selectOnChange(name, value) }}
                isSubmit={false}
                required={false}
                size='small'
              />
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
  classOption: [
    { value: '001', text: 'VII A' },
    { value: '002', text: 'VII B' },
    { value: '003', text: 'VIII' },
    { value: '004', text: 'IX' },
  ],
  keteranganOption: [
    { value: 'aplha', text: 'Alpha' },
    { value: 'izin', text: 'Izin' },
    { value: 'sakit', text: 'Sakit' },
  ],
  dataSiswa: [
    { id: '1', nama: 'Dionisius Aditya Octa Nugraha', checked: false, keterangan: '', ketTambahan: '' },
    { id: '2', nama: 'yoshi', checked: false, keterangan: '', ketTambahan: '' },
    { id: '3', nama: 'dimas', checked: false, keterangan: '', ketTambahan: '' },
  ]
});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
  onPushAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputAbsensi);
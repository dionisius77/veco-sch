import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { Paper, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import InputField from '../../../components/input_field/InputField';
import Selects from '../../../components/select/Select';
import DatePicker from '../../../components/date_picker/DatePicker';
import SelectMultiple from '../../../components/select/SelectMultiple';
import Button from '../../../components/button/Button';

class InputStaff extends Component {
  idStaff = this.props.match.params.idStaff;
  newFomGuru;
  constructor(props) {
    super(props);
    this.state = {
      formGuru: {
        nama: { value: '', isValid: false },
        bidangStudi: { value: [], isValid: false },
        tempatLahir: { value: '', isValid: false },
        tanggalLahir: { value: '', isValid: false },
        pendidikanTerakhir: { value: '', isValid: false },
        jurusan: { value: '', isValid: false },
        tahun: { value: '', isValid: false },
        jabatan: { value: '', isValid: false },
        masaKerja: { value: '', isValid: false },
        status: { value: '', isValid: false },
        tanggalSK: { value: '', isValid: false },
      },
      isSubmit: false,
      finish: false,
    }
    this.inputOnChange = this.inputOnChange.bind(this);
    this.newFomGuru = this.state.formGuru;
  }

  componentDidMount() {
  }

  inputOnChange = (id, value, isValid) => {
    this.newFomGuru[id].value = value;
    this.newFomGuru[id].isValid = isValid;
    if (id === 'jabatan') {

    }
    this.setState({ formGuru: this.newFomGuru });
    this.validate();
  }

  onSubmit = () => {
    const { formGuru } = this.state;
    console.log(formGuru)
    this.setState({ isSubmit: true });
    if (
      (formGuru.jabatan.value === 'KTU' || formGuru.jabatan.value === 'STU' || formGuru.jabatan.value === 'pembina umum')
    ) {
      this.newFomGuru.bidangStudi.isValid = true;
      this.newFomGuru.bidangStudi.value = [];
      this.setState({ formGuru: this.newFomGuru });
    } else {
      this.newFomGuru.bidangStudi.isValid = this.newFomGuru.bidangStudi.value.length !== 0;
      this.setState({ formGuru: this.newFomGuru });
    }
    if (formGuru.status.value !== 'GT') {
      this.newFomGuru.tanggalSK.isValid = true;
      this.newFomGuru.tanggalSK.value = '';
      this.setState({ formGuru: this.newFomGuru });
    } else {
      this.newFomGuru.tanggalSK.isValid = this.newFomGuru.tanggalSK.value !== '';
      this.setState({ formGuru: this.newFomGuru });
    }
    if (
      formGuru.nama.isValid && formGuru.jabatan.isValid && formGuru.tempatLahir.isValid &&
      formGuru.tanggalLahir.isValid && formGuru.pendidikanTerakhir.isValid && formGuru.jurusan.isValid &&
      formGuru.tahun.isValid && formGuru.masaKerja.isValid && formGuru.status.isValid && formGuru.bidangStudi.isValid &&
      formGuru.tanggalSK.isValid
    ) {
      console.log('mantap')
    } else {
      console.log('blm lengkap')
    }
  }

  validate = () => {
  }

  render() {
    const {
      formGuru,
      isSubmit,
      finish
    } = this.state;
    const {
      optBidangStudi,
      optPendidikanTerakhir,
      optJabatan,
      optStatus
    } = this.props;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 5 }}>
          <div>
            <h1 style={{
              textAlign: 'center',
              paddingBottom: 10
            }}>
              Form Pendaftaran Siswa
            </h1>
          </div>
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='nama' label='Nama Lengkap' required={true} type="text" value={formGuru.nama.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
              <InputField id='tempatLahir' label='Tempat Lahir' required={true} type="text" value={formGuru.tempatLahir.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
              <Selects name='pendidikanTerakhir' id='pendidikanTerakhir' label='Pendidikan Terakhir' variant='outlined' options={optPendidikanTerakhir} value={formGuru.pendidikanTerakhir.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
              {(formGuru.jabatan.value !== 'KTU' && formGuru.jabatan.value !== 'STU' && formGuru.jabatan.value !== 'pembina umum') &&
                <SelectMultiple name='bidangStudi' id='bidangStudi' label='Bidang Studi' variant='outlined' options={optBidangStudi} value={formGuru.bidangStudi.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
              }
              {
                formGuru.status.value === 'GT' &&
                <DatePicker id='tanggalSK' label='Tanggal SK' required={true} value={formGuru.tanggalSK.value} onChange={this.inputOnChange} isSubmit={isSubmit} />
              }
            </Grid>
            <Grid item xs>
              <Selects name='jabatan' id='jabatan' label='Jabatan' variant='outlined' options={optJabatan} value={formGuru.jabatan.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
              <DatePicker id='tanggalLahir' label='Tanggal Lahir' required={true} value={formGuru.tanggalLahir.value} onChange={this.inputOnChange} isSubmit={isSubmit} />
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <InputField id='jurusan' label='Jurusan' required={true} type="text" value={formGuru.jurusan.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
                </Grid>
                <Grid item xs>
                  <InputField id='tahun' label='Tahun' required={true} type="text" value={formGuru.tahun.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <InputField id='masaKerja' label='Masa Kerja' required={true} type="number" value={formGuru.masaKerja.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
                </Grid>
                <Grid item xs>
                  <Selects name='status' id='status' label='Status' variant='outlined' options={optStatus} value={formGuru.status.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ margin: 10 }}>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item xs={2}>
                <div style={{ display: 'flex', marginTop: 10 }}>
                  <div style={{ flexGrow: 1 }}></div>
                  <Button type='default' disabled={false} text='Selesai' onClick={() => { this.onSubmit() }} />
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Fade>
    )
  }
}

const mapStateToProps = state => {
  return {
    optBidangStudi: [
      { value: '220011', text: 'Matematika' },
      { value: '210011', text: 'IPA' },
    ],
    optPendidikanTerakhir: [
      { value: 5, text: 'SMA Sederajat' },
      { value: 6, text: 'D1' },
      { value: 7, text: 'D2' },
      { value: 8, text: 'D3' },
      { value: 9, text: 'D4 / S1' },
      { value: 10, text: 'S2' },
      { value: 11, text: 'S3' },
    ],
    optJabatan: [
      { value: 'none', text: 'Tidak Ada' },
      { value: 'kepsek', text: 'Kepala Sekolah' },
      { value: 'kurikulum', text: 'Sie. Kurikulum' },
      { value: 'KTU', text: 'Kepala TU' },
      { value: 'STU', text: 'Staff TU' },
      { value: 'pembina umum', text: 'Pembina Umum' },
    ],
    optStatus: [
      { value: 'GT', text: 'Tetap' },
      { value: 'GTT', text: 'Tidak Tetap' },
    ]
  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(InputStaff);